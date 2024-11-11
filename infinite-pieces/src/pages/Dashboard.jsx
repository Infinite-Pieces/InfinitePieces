import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Upload, Image, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import CommunityGallery from '../components/CommunityGallery';

const Dashboard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGenerateClick = () => {
    navigate('/generate');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target?.result);
      reader.readAsDataURL(file);
    }
  };

  const puzzleSizes = [
    { pieces: 100, price: 19.99 },
    { pieces: 500, price: 24.99 },
    { pieces: 1000, price: 29.99 },
    { pieces: 2000, price: 39.99 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Generation Section */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Create Your Puzzle</CardTitle>
              <CardDescription>Generate an image or upload your own</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={handleGenerateClick}
                >
                  <Image className="h-4 w-4 mr-2" />
                  Generate New Image with AI
                </Button>
                <div className="relative">
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Your Own Image
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileUpload}
                  />
                </div>

                {user.tokens <= 0 && (
                  <p className="text-sm text-red-500">
                    You need more tokens to generate images
                  </p>
                )}
              </div>

              {selectedImage && (
                <div className="mt-4">
                  <img
                    src={selectedImage}
                    alt="Selected puzzle image"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Puzzle Customization Section */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Customize Your Puzzle</CardTitle>
              <CardDescription>Choose size and preview your puzzle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {puzzleSizes.map(({ pieces, price }) => (
                    <Button
                      key={pieces}
                      variant={selectedSize === pieces ? "default" : "outline"}
                      className="h-24 flex flex-col items-center justify-center"
                      onClick={() => setSelectedSize(pieces)}
                    >
                      <Package className="h-8 w-8 mb-2" />
                      <span>{pieces} Pieces</span>
                      <span className="text-sm mt-1">${price}</span>
                    </Button>
                  ))}
                </div>

                <Button 
                  className="w-full" 
                  disabled={!selectedImage || !selectedSize}
                  variant="default"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>

                {!selectedImage && !selectedSize && (
                  <p className="text-sm text-center text-gray-500">
                    Select an image and puzzle size to continue
                  </p>
                )}
                {!selectedImage && selectedSize && (
                  <p className="text-sm text-center text-gray-500">
                    Select an image to continue
                  </p>
                )}
                {selectedImage && !selectedSize && (
                  <p className="text-sm text-center text-gray-500">
                    Select a puzzle size to continue
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Community Gallery Section */}
        <CommunityGallery />
      </main>
    </div>
  );
};

export default Dashboard;