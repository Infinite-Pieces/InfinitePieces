import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Image as ImageIcon, ChevronRight, RotateCcw } from 'lucide-react';
import { fetchPrintifyProducts, getProductDetails, getPrintProviders } from '../services/printifyService';

const ProductPreview = () => {
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(location.state?.image || null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [printProviders, setPrintProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPrintifyProducts();
        console.log('API Response:', data);
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.error("Error loading products", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Fetch product details when a product is selected
  const handleProductSelect = async (product) => {
    try {
      setIsLoading(true);
      setSelectedProduct(product);

      // Get detailed product information
      const details = await getProductDetails(product.id);
      setProductDetails(details);
      console.log('Product details:', details);

      // Get available print providers
      const providers = await getPrintProviders(product.id);
      setPrintProviders(providers);
      console.log('Print providers:', providers);
    } catch (err) {
      setError('Failed to load product details');
      console.error("Error getting product details", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-red-500">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Sidebar - Product Categories */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Design</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedImage && (
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Your design"
                    className="w-full rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setSelectedImage(null)}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Products</CardTitle>
              <CardDescription>Choose a product to customize</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading products...</div>
              ) : (
                <>
                  {Array.isArray(products) && products.length > 0 ? (
                    products.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductSelect(product)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${selectedProduct?.id === product.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'hover:border-gray-300'
                          }`}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.thumbnail_url}
                            alt={product.title}
                            className="w-8 h-8 object-cover rounded"
                          />
                          <span>{product.title}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </button>
                    ))
                  ) : (
                    <p>No products available</p>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Product Preview */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Product Preview</CardTitle>
              <CardDescription>
                {selectedProduct
                  ? selectedProduct.title
                  : 'Select a product to preview your design'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-12">Loading product details...</div>
              ) : selectedProduct ? (
                <div className="space-y-6">
                  {/* Product Images */}
                  {productDetails?.images && (
                    <div className="aspect-video bg-gray-100 rounded-lg">
                      {productDetails.images.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt={`${selectedProduct.title} view ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      ))}
                    </div>
                  )}
                  {/* Product Variants */}
                  {productDetails?.variants && (
                    <div>
                      <h3 className="font-medium mb-2">Options</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {productDetails.variants.map((variant, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full"
                          >
                            {variant.title}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Print Providers */}
                  {printProviders && printProviders.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Print Providers</h3>
                      <div className="space-y-2">
                        {printProviders.map((provider) => (
                          <div
                            key={provider.id}
                            className="p-3 border rounded-lg"
                          >
                            <p className="font-medium">{provider.title}</p>
                            <p className="text-sm text-gray-500">
                              Shipping from: {provider.location}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Order Button */}
                  <Button className="w-full">
                    Continue to Customize
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">
                    Select a product from the list to see your design come to life
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;