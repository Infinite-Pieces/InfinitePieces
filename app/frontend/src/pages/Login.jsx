import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Mail, Lock, Store } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      login(email, password);
    } catch (err) {
      setError('Failed to sign in');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="flex items-center space-x-2">
            <Store className="h-6 w-6 text-indigo-600" />
            <CardTitle className="text-2xl text-indigo-600">Infinite Pieces</CardTitle>
          </div>
          <CardDescription>
            Sign in to create your custom puzzles
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button className="w-full" type="submit">
              Sign In
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button">
                <img src="/api/placeholder/20/20" alt="Google" className="mr-2 h-5 w-5" />
                Google
              </Button>
              <Button variant="outline" type="button">
                <img src="/api/placeholder/20/20" alt="Apple" className="mr-2 h-5 w-5" />
                Apple
              </Button>
            </div>
          </CardContent>
        </form>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-500">
            Don't have an account?{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Sign up
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
