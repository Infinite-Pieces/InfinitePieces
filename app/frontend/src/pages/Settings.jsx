import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { User, Mail, Lock, Bell, CreditCard, Shield, ChevronRight } from 'lucide-react';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // TODO: Implement profile update
    console.log('Profile update:', formData);
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="h-10 w-10 text-gray-500" />
        </div>
        <div>
          <Button variant="outline" size="sm">Change Photo</Button>
        </div>
      </div>

      <form onSubmit={handleUpdateProfile} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <Button type="submit">Update Password</Button>
      </form>

      <div className="border-t pt-6">
        <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
        <Button variant="outline">Enable 2FA</Button>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {[
          { title: 'Order Updates', description: 'Get notified about your order status' },
          { title: 'Promotional Emails', description: 'Receive special offers and discounts' },
          { title: 'Token Alerts', description: 'Get notified when your tokens are running low' },
        ].map((notification) => (
          <div key={notification.title} className="flex items-center justify-between py-3 border-b">
            <div>
              <h4 className="font-medium">{notification.title}</h4>
              <p className="text-sm text-gray-500">{notification.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentSection = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg border">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <p className="font-medium">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-500">Expires 12/24</p>
            </div>
          </div>
          <Button variant="outline" size="sm">Edit</Button>
        </div>
      </div>

      <Button className="w-full">Add New Payment Method</Button>
    </div>
  );

  const sections = [
    { id: 'profile', title: 'Profile Settings', icon: User, component: renderProfileSection },
    { id: 'security', title: 'Security', icon: Shield, component: renderSecuritySection },
    { id: 'notifications', title: 'Notifications', icon: Bell, component: renderNotificationsSection },
    { id: 'payment', title: 'Payment Methods', icon: CreditCard, component: renderPaymentSection },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <Card className="md:col-span-1">
            <CardContent className="p-4">
              <nav className="space-y-1">
                {sections.map(({ id, title, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveSection(id)}
                    className={`w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg ${
                      activeSection === id
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="h-5 w-5 mr-3" />
                      {title}
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>{sections.find(s => s.id === activeSection)?.title}</CardTitle>
              <CardDescription>
                Manage your {activeSection} settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sections.find(s => s.id === activeSection)?.component()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
