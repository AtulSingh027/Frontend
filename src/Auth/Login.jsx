import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/User/login/', {
        email: e.target.email.value,
        password: e.target.password.value,
      });

      // Store user data in localStorage
      localStorage.setItem('userData', JSON.stringify(response.data));
      localStorage.setItem('isLoggedIn', 'true');
      
      navigate('/UserProfile');
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 transition-all duration-300 bg-gray-100 min-h-screen pb-20 md:pb-0">
      <div className="pt-3">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-green-500 p-4 md:p-8 lg:p-12 mb-6">
            <div className="relative z-10">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-white">
                Welcome Back
              </h1>
              <p className="text-sm md:text-lg text-white/90">
                Login to access your account
              </p>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-green-400/20 to-transparent" />
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter email</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="email"
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                {loading ? (
                  'Logging in...'
                ) : (
                  <>
                    Login
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
