import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Coins, User, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true }); // Add replace: true to force navigation
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link to="/home" className="flex-shrink-0 flex items-center space-x-2">
              <svg 
                className="h-8 w-8 text-indigo-600" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <h1 className="text-2xl font-bold text-indigo-600">Infinite Pieces</h1>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link
                to="/generate"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/generate'
                    ? 'text-indigo-700 bg-indigo-50 ring-2 ring-indigo-100'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Package className="h-4 w-4 inline mr-1" />
                Create Your Image
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-indigo-100 px-3 py-1 rounded-full">
              <Coins className="h-4 w-4 text-indigo-600 mr-2" />
              <span className="text-indigo-600 font-medium">{user?.tokens} tokens</span>
            </div>

            <Link to="/account">
              <Button variant="outline" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>
            </Link>

            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;