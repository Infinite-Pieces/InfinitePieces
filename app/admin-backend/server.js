require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Admin Backend!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Admin backend is running on port ${PORT}`);
});
