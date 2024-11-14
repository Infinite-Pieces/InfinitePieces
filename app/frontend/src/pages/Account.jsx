import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { User, Package, Coins, Settings, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Account = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const orders = [
    {
      id: '1234',
      date: '2024-03-15',
      status: 'Delivered',
      pieces: 1000,
      image: '/api/placeholder/100/100',
    },
    {
      id: '1235',
      date: '2024-03-10',
      status: 'In Transit',
      pieces: 500,
      image: '/api/placeholder/100/100',
    },
  ];

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Section */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium">{user?.name || 'John Doe'}</h3>
                  <p className="text-sm text-gray-500">{user?.email || 'john.doe@example.com'}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Coins className="h-5 w-5 text-indigo-600" />
                    <span className="font-medium">{user?.tokens || 0} Tokens</span>
                  </div>
                  <Button variant="outline" size="sm">Buy More</Button>
                </div>

                <button
                  onClick={handleSettingsClick}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5 text-gray-600" />
                    <span>Account Settings</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Orders Section */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Order History</span>
              </CardTitle>
              <CardDescription>Track and review your puzzle orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <img
                      src={order.image}
                      alt={`Puzzle ${order.id}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Order #{order.id}</h3>
                        <span className="text-sm text-gray-500">{order.date}</span>
                      </div>
                      <p className="text-sm text-gray-500">{order.pieces} pieces</p>
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;