import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/RouteProtection/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

//pages 
import Navigation from './components/Navigation';
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import GenerateImage from './pages/GenerateImage';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import ProductPreview from './pages/productPreview';
import Settings from './pages/Settings';
import Signup from './pages/Signup';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';


function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        
          
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <>
                  <Navigation />
                  <Dashboard />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <>
                  <Navigation />
                  <Checkout />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <>
                  <Navigation />
                  <Account />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <>
                  <Navigation />
                  <Settings />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/generate"
            element={
              <ProtectedRoute>
                <>
                  <Navigation />
                  <GenerateImage />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/product-preview"
            element={
              <ProtectedRoute>
                <>
                  <Navigation />
                  <ProductPreview />
                </>
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <>
                  <AdminDashboard />
                </>
              </ProtectedRoute>
            }
          /> */}
           
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;