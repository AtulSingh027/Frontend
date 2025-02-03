import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Building,
  Map,
  Camera,
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

// Sign Up Component
export const SignUp = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target["Pic"]?.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("username", e.target.username.value);
    formData.append("password", e.target.password.value);
    formData.append("email", e.target.email.value);
    formData.append("phone", e.target.phone.value);
    formData.append("address", e.target.address.value);
    formData.append("city", e.target.city.value);
    formData.append("state", e.target.state.value);

    if (profilePic) {
      formData.append("Pic", profilePic);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/User/users/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Sign up successful:", response.data);
      // Save user email and password in local storage
      localStorage.setItem("userEmail", e.target.email.value);
      localStorage.setItem("userPassword", e.target.password.value);

      navigate("/UserProfile");
    } catch (error) {
      console.error("Sign up error:", error);
      alert("Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex-1 transition-all duration-300 bg-gray-100 min-h-screen pb-20 md:pb-0 
      ${isSidebarOpen ? "md:ml-64" : "md:ml-20"}`}
    >
      <div className="pt-3">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-green-500 p-4 md:p-8 lg:p-12 mb-6">
            <div className="relative z-10">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-white">
                Create an Account
              </h1>
              <p className="text-sm md:text-lg text-white/90">
                Join our community of farmers and equipment providers
              </p>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-green-400/20 to-transparent" />
          </div>

          {/* Sign Up Form */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Profile Picture Upload */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-200 mb-4">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full cursor-pointer hover:bg-green-700 transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/*"
                      name="Pic"
                    />
                  </label>
                </div>
              </div>

              {/* Username */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="username"
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Current password"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" />
                  <textarea
                    name="address"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your address"
                    rows="3"
                  />
                </div>
              </div>

              {/* City */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="city"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your city"
                  />
                </div>
              </div>

              {/* State */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <div className="relative">
                  <Map className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="state"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your state"
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
                  "Creating Account..."
                ) : (
                  <>
                    Sign Up
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
};
