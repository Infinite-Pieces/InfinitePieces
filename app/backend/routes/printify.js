const express = require('express');
const router = express.Router();

const PRINTIFY_API_URL = 'https://api.printify.com/v1';
const PRINTIFY_TOKEN = process.env.PRINTIFY_TOKEN; 

router.get('/products', async (req, res) => {
  try {
    const fetch = await import('node-fetch').then(module => module.default);
    const response = await fetch(`${PRINTIFY_API_URL}/catalog/blueprints.json`, {
      headers: {
        'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch products' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;