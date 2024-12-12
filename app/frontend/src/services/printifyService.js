export const fetchPrintifyProducts = async () => {
  try {
    const response = await fetch('/api/printify/products', {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get detailed product information
export const getProductDetails = async (blueprintId) => {
  try {
    const response = await fetch(`${PRINTIFY_API_URL}/catalog/blueprints/${blueprintId}.json`, {
      headers: {
        'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

// Get print providers for a specific product
export const getPrintProviders = async (blueprintId) => {
  try {
    const response = await fetch(`${PRINTIFY_API_URL}/catalog/blueprints/${blueprintId}/print_providers.json`, {
      headers: {
        'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch print providers');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching print providers:', error);
    throw error;
  }
};