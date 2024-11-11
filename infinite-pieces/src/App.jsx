import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Settings from './pages/Settings';
import Navigation from './components/Navigation';
import GenerateImage from './pages/GenerateImage';



function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/"
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
           
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;