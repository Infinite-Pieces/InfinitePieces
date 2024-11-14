require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());

// Initializes PostgreSQL connection pool. DO NOT EDIT
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

pool.on('connect', () => {
    console.log('Connected to PostgreSQL database');
});

app.get('/', (req, res) => {
    res.send('Backend test message: Hi from Infinite Pieces backend!');
});

app.get('/users', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM users');
    res.json(rows);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
