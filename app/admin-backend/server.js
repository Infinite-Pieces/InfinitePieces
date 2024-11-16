require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Admin Backend!');
});

app.listen(PORT, () => {
  console.log(`Admin backend is running on port ${PORT}`);
});
