import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  LogOut, 
  Settings, 
  CreditCard, 
  Gift 
} from 'lucide-react';

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const storedUserData = localStorage.getItem('userData');

      if (!isLoggedIn || !storedUserData) {
        navigate('/Login');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://127.0.0.1:8000/User/users/');
        const parsedUser = JSON.parse(storedUserData);
        
        const foundUser = res.data.find(
          (u) => u.email === parsedUser.email && u.password === parsedUser.password
        );

        if (foundUser) {
          setUser(foundUser);
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error('User verification error:', error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
    setUser(null);
    navigate('/Login');
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-green-500 p-6 text-white flex items-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mr-6">
            <User size={48} className="text-blue-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-blue-100">{user.email}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6 grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User className="mr-2 text-blue-500" /> Personal Information
            </h2>
            <div className="space-y-2">
              <p className="flex items-center">
                <MapPin className="mr-2 text-gray-500" /> 
                {user.address}, {user.city}, {user.state}
              </p>
              <p className="flex items-center">
                <Phone className="mr-2 text-gray-500" /> 
                {user.phone}
              </p>
              <p className="flex items-center">
                <Mail className="mr-2 text-gray-500" /> 
                {user.email}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => {/* Profile Settings */}}
                className="bg-blue-100 text-blue-600 p-3 rounded-lg flex items-center justify-center hover:bg-blue-200"
              >
                <Settings className="mr-2" /> Settings
              </button>
              <button 
                onClick={() => {/* Payments */}}
                className="bg-green-100 text-green-600 p-3 rounded-lg flex items-center justify-center hover:bg-green-200"
              >
                <CreditCard className="mr-2" /> Payments
              </button>
              <button 
                onClick={() => {/* Rewards */}}
                className="bg-purple-100 text-purple-600 p-3 rounded-lg flex items-center justify-center hover:bg-purple-200"
              >
                <Gift className="mr-2" /> Rewards
              </button>
              <button 
                onClick={handleLogout}
                className="bg-red-100 text-red-600 p-3 rounded-lg flex items-center justify-center hover:bg-red-200"
              >
                <LogOut className="mr-2" /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}