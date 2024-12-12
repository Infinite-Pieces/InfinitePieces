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

router.get('/products/:blueprintId', async (req, res) => {
    try {
         const fetch = await import('node-fetch').then(module => module.default);
        const { blueprintId } = req.params;
         console.log('blueprintId', blueprintId);
        const response = await fetch(`${PRINTIFY_API_URL}/catalog/blueprints/${blueprintId}.json`, {
        headers: {
            'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
            'Content-Type': 'application/json'
        }
        });

        if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to fetch product details' });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    });

    // New route for fetching print providers
    router.get('/products/:blueprintId/print_providers', async (req, res) => {
        try {
          const fetch = await import('node-fetch').then(module => module.default);
            const { blueprintId } = req.params;
          const response = await fetch(`${PRINTIFY_API_URL}/catalog/blueprints/${blueprintId}/print_providers.json`, {
            headers: {
              'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch print providers' });
          }

          const data = await response.json();
          res.json(data);
        } catch (error) {
          console.error('Error fetching print providers:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });

    module.exports = router;