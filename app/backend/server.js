require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cors = require('cors');
const PgSession = require('connect-pg-simple')(session);

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection pool
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        store: new PgSession({
            pool,
            tableName: 'User_Sessions',
        }),
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Set to true only when we end up using HTTPS
    })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const userResult = await pool.query('SELECT * FROM Users WHERE email = $1 AND is_deleted = FALSE', [email]);
            if (userResult.rowCount === 0) {
                return done(null, false, { message: 'Incorrect email or password.' });
            }

            const user = userResult.rows[0];

            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user.password_hash);
            if (!isPasswordValid) {
                return done(null, false, { message: 'Incorrect email or password.' });
            }

            return done(null, user); // Pass user object to the next middleware
        } catch (error) {
            console.error('Error in LocalStrategy:', error);
            return done(error);
        }
    })
);

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const userResult = await pool.query('SELECT * FROM Users WHERE user_id = $1', [id]);
        if (userResult.rowCount === 0) {
            return done(null, false);
        }
        done(null, userResult.rows[0]);
    } catch (error) {
        done(error);
    }
});

app.get('/', (req, res) => {
    res.send('Backend test message: Hi from Infinite Pieces backend!');
});

app.post('/api/auth/signup', async (req, res) => {
    const { email, password, firstName, lastName} = req.body;
    try {
        const userExists = await pool.query('SELECT * FROM Users WHERE email = $1 AND is_deleted = FALSE', [email]);
        if (userExists.rowCount > 0) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            `INSERT INTO Users (email, password_hash, firstName, lastName) VALUES ($1, $2) RETURNING user_id`,
            [email, passwordHash, firstName, lastName]
        );

        res.status(201).json({ message: 'User created successfully', user_id: newUser.rows[0].user_id });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
});


app.post('/api/auth/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Login successful', user: req.user });
});


app.get('/api/auth/user', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    res.json(req.user);
});


app.post('/api/auth/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error during logout' });
        }
        res.json({ message: 'Logout successful' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
