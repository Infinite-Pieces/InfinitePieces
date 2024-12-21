// printifyService.js
const API_BASE_URL = 'http://localhost:3001/api/printify'; // Corrected base URL

export const fetchPrintifyProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      console.log(response);
      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Data from fetchPrintifyProducts:', data);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get detailed product information
export const getProductDetails = async (blueprintId) => {
  try {
    console.log("getProductDetails: blueprintId", blueprintId);
    const response = await fetch(`${API_BASE_URL}/products/${blueprintId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("getProductDetails: Response", response);

    if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }

    const data = await response.json();
    console.log("getProductDetails: Response Data", data);
    return data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

// Get print providers for a specific product
export const getPrintProviders = async (blueprintId) => {
  try {
    console.log("getPrintProviders: blueprintId", blueprintId);
    const response = await fetch(`${API_BASE_URL}/products/${blueprintId}/print_providers`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("getPrintProviders: Response", response);

    if (!response.ok) {
      throw new Error('Failed to fetch print providers');
    }

    const data = await response.json();
    console.log("getPrintProviders: Response Data", data)
    return data;
  } catch (error) {
    console.error('Error fetching print providers:', error);
    throw error;
  }
};

// Get full image url by image id
export const fetchPrintifyImage = async (imageId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/images/${imageId}`, {
          headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch image URL: ${response.status}`);
      }
       return await response.json();
    } catch (error) {
      console.error('Error fetching image URL:', error);
      throw error;
    }
  };