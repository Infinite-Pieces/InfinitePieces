import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Image as ImageIcon, RotateCcw, ChevronLeft, ChevronRight, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { fetchPrintifyProducts, getProductDetails } from '../services/printifyService';

const ProductPreview = () => {
    const location = useLocation();
    const [selectedImage, setSelectedImage] = useState(location.state?.image || null);
    const [products, setProducts] = useState([]);
    const [categorizedProducts, setCategorizedProducts] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productDetails, setProductDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

   const categories = {
        'Clothing': {
            subcategories: [
                'T-Shirt',
                'Tee',
                'Hoodie',
                 'Sweatshirt',
                 'Tank Top',
                 'Long Sleeve',
                 'Shirt'
            ]
        },
        'Accessories': {
            subcategories: [
                'Bag',
                 'Hat',
                'Phone Case',
                 'Case'
             ]
         },
         'Home Goods': {
          subcategories: [
            'Mug',
             'Poster',
             'Pillow',
              'Blanket'
           ]
         },
         'Uncategorized' : {
            subcategories: []
          }
    };


    // Fetch products on component mount
    useEffect(() => {
        const loadProducts = async () => {
            try {
                setIsLoading(true);
                const data = await fetchPrintifyProducts();
                console.log('API Response:', data);
                setProducts(data);
                const categorized = categorizeProducts(data, categories);
                setCategorizedProducts(categorized);
            } catch (err) {
                setError('Failed to load products');
                console.error("Error loading products", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, []);

    const categorizeProducts = (products, categories) => {
      const categorized = {};

        Object.keys(categories).forEach((category) => {
              categorized[category] = {};
              categories[category].subcategories.forEach((subcategory) => {
                categorized[category][subcategory] = [];
            });
        });

        products.forEach(product => {
            let categoryMatched = false;
           for (const category in categories) {
                if (category === 'Uncategorized') continue;
                for (const subcategory of categories[category].subcategories) {
                     if (product.title.toLowerCase().includes(subcategory.toLowerCase())) {
                         categorized[category][subcategory].push(product);
                         categoryMatched = true;
                        break;
                    }
                }
                 if(categoryMatched){
                  break;
                }
           }
           if(!categoryMatched){
             categorized['Uncategorized'][''] = categorized['Uncategorized'][''] || [];
            categorized['Uncategorized'][''].push(product)
           }
        });
        return categorized;
    }
      
        // Fetch product details when a product is selected
    const handleProductSelect = async (product) => {
        try {
            setIsLoading(true);
            setSelectedProduct(product);
              setSelectedVariant(null);
             setCurrentImageIndex(0);
            // Get detailed product information
            const details = await getProductDetails(product.id);
            setProductDetails(details);
            console.log('Product details:', details);

        } catch (err) {
            setError('Failed to load product details');
            console.error("Error getting product details", err);
        } finally {
            setIsLoading(false);
        }
    };
    
        const handleVariantSelect = (variant) => {
            setSelectedVariant(variant);
        }
        const handleCategorySelect = (category) => {
            setSelectedCategory(category);
            setSelectedSubcategory(null);
            setSelectedProduct(null);
            setProductDetails(null);
        }
        const handleSubcategorySelect = (subcategory) => {
            setSelectedSubcategory(subcategory);
             setSelectedProduct(null);
             setProductDetails(null);
        }
        const handlePrevImage = () => {
            setCurrentImageIndex((prevIndex) =>
              prevIndex > 0 ? prevIndex - 1 : productDetails.images.length - 1
            );
          };
        
        const handleNextImage = () => {
            setCurrentImageIndex((prevIndex) =>
              prevIndex < productDetails.images.length - 1 ? prevIndex + 1 : 0
            );
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
                  {/* Left Sidebar - Product List */}
                    <div className="space-y-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Product Categories</CardTitle>
                             <CardDescription>Choose a category</CardDescription>
                         </CardHeader>
                           <CardContent>
                            {isLoading ? (
                                <div className="text-center py-4">Loading categories...</div>
                            ) : (
                                <>
                                {Object.keys(categories).map((category) => (
                                    <div key={category}>
                                        <button
                                            onClick={() => handleCategorySelect(category)}
                                            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${selectedCategory === category
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'hover:border-gray-300'
                                                }`}
                                        >
                                            <span>{category}</span>
                                             <ChevronRight className="h-4 w-4 text-gray-400" />
                                        </button>
                                           {selectedCategory === category && (
                                                <div className="ml-4 mt-2 space-y-1">
                                                    {categories[category].subcategories.map(subcategory => (
                                                        <button
                                                            key={subcategory}
                                                            onClick={() => handleSubcategorySelect(subcategory)}
                                                            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors  ${selectedSubcategory === subcategory
                                                                ? 'border-indigo-500 bg-indigo-50'
                                                                : 'hover:border-gray-300'}`}
                                                        >
                                                            <span>{subcategory}</span>
                                                            <ChevronRight className="h-4 w-4 text-gray-400" />
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                    
                                    </div>
                                    ))}
                                </>
                               )}
                                 </CardContent>
                         </Card>
                          <Card>
                             <CardHeader>
                                  <CardTitle>Available Products</CardTitle>
                                   <CardDescription>Select a Product</CardDescription>
                               </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <div className="text-center py-4">Loading products...</div>
                                ) : (
                                   <>
                                      { selectedSubcategory && selectedCategory && categorizedProducts[selectedCategory] && categorizedProducts[selectedCategory][selectedSubcategory].map((product) => (
                                          <button
                                                key={product.id}
                                                 onClick={(e) => {e.preventDefault(); handleProductSelect(product)}}
                                                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${selectedProduct?.id === product.id
                                                    ? 'border-indigo-500 bg-indigo-50'
                                                   : 'hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <span>{product.title}</span>
                                                </div>
                                                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                                            </button>
                                        ))
                                        }
                                       {selectedCategory === "Uncategorized" && categorizedProducts[selectedCategory] && Object.values(categorizedProducts[selectedCategory]).flatMap(subCategory => subCategory).map((product) => (
                                          <button
                                                key={product.id}
                                                onClick={(e) => {e.preventDefault(); handleProductSelect(product)}}
                                                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${selectedProduct?.id === product.id
                                                    ? 'border-indigo-500 bg-indigo-50'
                                                    : 'hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <span>{product.title}</span>
                                                </div>
                                                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                                            </button>
                                         ))
                                        }
                                   </>
                                )}
                            </CardContent>
                            </Card>
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
                </div>

                {/* Main Content - Product Preview */}
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Preview</CardTitle>
                            <CardDescription>
                                {selectedProduct
                                    ? selectedProduct.title
                                    : 'Select a product to preview'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="text-center py-12">Loading product details...</div>
                            ) : selectedProduct ? (
                                <div className="space-y-6">
                                    {/* Product Image Carousel */}
                                    {productDetails?.images && productDetails.images.length > 0 ? (
                                        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                          
                                                {productDetails.images.length > 1 && (
                                                    <div className="absolute top-1/2 transform -translate-y-1/2 left-2 z-10">
                                                        <Button size="icon" variant="ghost"  onClick={handlePrevImage}>
                                                           <ChevronLeft className="h-6 w-6"/>
                                                        </Button>
                                                    </div>
                                                )}
                                                  {productDetails.variants && selectedVariant ? (
                                                      <img
                                                           src={selectedVariant.image_url}
                                                            alt={`${selectedProduct.title} view`}
                                                          className="w-full h-full object-contain"
                                                        />
                                                ) : (

                                                    <img
                                                        src={productDetails.images[currentImageIndex]}
                                                        alt={`${selectedProduct.title} view`}
                                                        className="w-full h-full object-contain transition-opacity duration-300"
                                                        />
                                                        )}
                                               
                                                  {productDetails.images.length > 1 && (
                                                    <div className="absolute top-1/2 transform -translate-y-1/2 right-2 z-10">
                                                    <Button size="icon" variant="ghost" onClick={handleNextImage}>
                                                          <ChevronRightIcon className="h-6 w-6"/>
                                                    </Button>
                                                    </div>
                                                 )}
                                              {selectedImage && (
                                                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                     <img
                                                       src={selectedImage}
                                                       alt="Selected Design Overlay"
                                                        style={{maxWidth: '70%', maxHeight: '70%', objectFit: 'contain'}}
                                                     />
                                                   </div>
                                                 )}
                                         
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full text-gray-500">
                                            No product image available.
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
                                                        className={`w-full ${selectedVariant?.id === variant.id ? "bg-indigo-100 border-indigo-500" : ""}`}
                                                        onClick={() => handleVariantSelect(variant)}
                                                    >
                                                        {variant.title}
                                                    </Button>
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
                                      Select a product from the list to see a preview.
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