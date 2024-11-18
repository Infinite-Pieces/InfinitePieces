const express = require('express');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const crypto = require('crypto');

const router = express.Router();
const pool = new Pool(); // Ensure this is configured to connect to your database

// Helper to generate a random session token
const generateSessionToken = () => crypto.randomBytes(32).toString('hex');

// Route: Create a new user
router.post('/signup', async (req, res) => {
    const { email, password, ip_address, user_agent } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Check if the email is already registered
        const userExists = await pool.query('SELECT * FROM Users WHERE email = $1 AND is_deleted = FALSE', [email]);
        if (userExists.rowCount > 0) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await pool.query(
            `INSERT INTO Users (email, password_hash, created_at) 
             VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING user_id`,
            [email, passwordHash]
        );

        const userId = newUser.rows[0].user_id;

        // Create a session for the user
        const sessionToken = generateSessionToken();
        await pool.query(
            `INSERT INTO User_Sessions (user_id, session_token, ip_address, user_agent, created_at, last_active_at) 
             VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
            [userId, sessionToken, ip_address || 'unknown', user_agent || 'unknown']
        );

        return res.status(201).json({ message: 'User created successfully', user_id: userId, session_token: sessionToken });
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ error: 'An error occurred while creating the user' });
    }
});

// Route: Log in a user
router.post('/login', async (req, res) => {
    const { email, password, ip_address, user_agent } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Check if the user exists
        const user = await pool.query('SELECT * FROM Users WHERE email = $1 AND is_deleted = FALSE', [email]);
        if (user.rowCount === 0) {
            return res.status(404).json({ error: 'Invalid email or password' });
        }

        const { user_id, password_hash } = user.rows[0];

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Create a session for the user
        const sessionToken = generateSessionToken();
        await pool.query(
            `INSERT INTO User_Sessions (user_id, session_token, ip_address, user_agent, created_at, last_active_at) 
             VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
            [user_id, sessionToken, ip_address || 'unknown', user_agent || 'unknown']
        );

        return res.status(200).json({ message: 'Login successful', user_id, session_token: sessionToken });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'An error occurred while logging in' });
    }
});

// Route: Get user info by user ID
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Get user details
        const user = await pool.query(
            `SELECT user_id, email, email_verified, created_at, updated_at 
             FROM Users WHERE user_id = $1 AND is_deleted = FALSE`,
            [userId]
        );

        if (user.rowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(user.rows[0]);
    } catch (error) {
        console.error('Error fetching user info:', error);
        return res.status(500).json({ error: 'An error occurred while fetching user information' });
    }
});

module.exports = router;
