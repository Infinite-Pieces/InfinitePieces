import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CreditCard, Package, MapPin, Truck } from 'lucide-react';

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Summary */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your puzzle order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <img
                  src="/api/placeholder/200/200"
                  alt="Puzzle Preview"
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium">Custom Puzzle</h3>
                  <p className="text-sm text-gray-500">1000 pieces</p>
                  <p className="text-sm text-gray-500">Size: 19" x 27"</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$29.99</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>$29.99</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span>Shipping</span>
                  <span>$4.99</span>
                </div>
                <div className="flex justify-between font-medium text-lg mt-4">
                  <span>Total</span>
                  <span>$34.98</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment and Shipping */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Complete your purchase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Shipping Address */}
              <div className="space-y-4">
                <h3 className="font-medium flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Shipping Address
                </h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-2 border rounded-md"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full p-2 border rounded-md"
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full p-2 border rounded-md"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="State"
                      className="w-full p-2 border rounded-md"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    className="w-full p-2 border rounded-md"
                    value={shippingAddress.zipCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="font-medium flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payment Method
                </h3>
                <div className="p-4 border rounded-md bg-gray-50">
                  <p className="text-sm text-gray-500">
                    Payment will be processed securely via Stripe
                  </p>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="space-y-4">
                <h3 className="font-medium flex items-center">
                  <Truck className="h-4 w-4 mr-2" />
                  Shipping Method
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-md bg-indigo-50 border-indigo-200">
                    <div className="flex items-center">
                      <input type="radio" checked className="mr-2" readOnly />
                      <span>Standard Shipping</span>
                    </div>
                    <span>$4.99</span>
                  </div>
                </div>
              </div>

              <Button className="w-full">Place Order</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
