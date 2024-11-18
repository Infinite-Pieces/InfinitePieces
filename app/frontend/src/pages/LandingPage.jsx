import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { 
    ChevronDown, 
    ArrowRight, 
    Heart, 
    Image as ImageIcon,
    MessageSquare,
    Puzzle,
    Shirt,
    BookOpen,
    Coffee,
    Smartphone,
    Home
} from 'lucide-react';

const LandingPage = () => {
  const galleryRef = useRef(null);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const products = [
    { 
      title: "Custom Puzzles",
      icon: <Puzzle className="h-8 w-8" />,
      description: "Transform your images into engaging jigsaw puzzles"
    },
    { 
      title: "Custom Apparel",
      icon: <Shirt className="h-8 w-8" />,
      description: "Design unique t-shirts, hoodies, and more"
    },
    { 
      title: "Photo Books",
      icon: <BookOpen className="h-8 w-8" />,
      description: "Create personalized photo albums and books"
    },
    { 
      title: "Drinkware",
      icon: <Coffee className="h-8 w-8" />,
      description: "Custom mugs, water bottles, and tumblers"
    },
    { 
      title: "Phone Cases",
      icon: <Smartphone className="h-8 w-8" />,
      description: "Unique cases for all phone models"
    },
    { 
      title: "Home Decor",
      icon: <Home className="h-8 w-8" />,
      description: "Personalized canvas prints, pillows, and more"
    }
];

  // Example gallery items
  const galleryItems = [
    {
      id: 1,
      title: "Cosmic Dreams Puzzle",
      creator: "Sarah Chen",
      type: "Puzzle",
      image: "/api/placeholder/400/300",
      likes: 245
    },
    {
      id: 2,
      title: "Abstract Nature Shirt",
      creator: "Mike Wilson",
      type: "T-Shirt",
      image: "/api/placeholder/400/300", //placeholder images that would be taken from the printify api 
      likes: 189
    },
    {
        id: 3,
        title: "Cartoon Panda Mug",
        creator: "John Armel",
        type: "Mug",
        image: "/api/placeholder/400/300", //placeholder images that would be taken from the printify api 
        likes: 312
      },
    // Add more gallery items...
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center space-x-2">
                <svg 
                  className="h-8 w-8 text-indigo-600" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  <path d="M12 22V7" />
                </svg>
                <span className="text-2xl font-bold text-indigo-600">Infinite Pieces</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Custom{' '}
            <span 
            className="inline-block bg-gradient-to-r from-indigo-600 via-purple-400 to-indigo-600 
            bg-[length:200%_auto] animate-[shimmer_2s_infinite] bg-clip-text text-transparent"
            >
            Products
            </span>
        </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Create unique, personalized products using AI-generated designs. 
              From puzzles to apparel, bring your ideas to life with our creative platform.
            </p>
            <div className="space-y-4">
              <button 
                onClick={scrollToGallery}
                className="flex items-center justify-center space-x-2 text-lg text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                <span>Explore Products</span>
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Products</h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose from our wide range of customizable products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg border hover:border-indigo-500 transition-colors"
              >
                <div className="text-indigo-600 mb-4">
                  {product.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div ref={galleryRef} className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Designs</h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover amazing creations from our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
              >
                <div className="relative group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                    <Button 
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      variant="secondary"
                    >
                      Create Similar
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">by {item.creator}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{item.likes}</span>
                    </div>
                    <Link 
                      to="/signup" 
                      className="flex items-center text-indigo-600 hover:text-indigo-500"
                    >
                      <span className="text-sm">Try it</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;


