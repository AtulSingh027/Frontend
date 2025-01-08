import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, ArrowRight, Users, Calendar, ChevronRight, Phone, Filter, Clock, Briefcase, X, Map, AlertCircle } from 'lucide-react';

const Helpers = ({ isSidebarOpen }) => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationPrompt, setShowLocationPrompt] = useState(true);
  const [viewMode, setViewMode] = useState('nearby'); // 'nearby' or 'all'

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const brokers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      image: "/api/placeholder/100/100",
      specialization: ["Harvesting", "Sowing"],
      region: "Dewas, Madhya Pradesh",
      rating: 4.8,
      reviews: 156,
      experience: "10+ years",
      distance: "2.5 km"
    },
    {
      id: 2,
      name: "Anil Kumar",
      image: "/api/placeholder/100/100",
      specialization: ["Plowing", "Irrigation"],
      region: "Ashta, Madhya Pradesh",
      rating: 4.5,
      reviews: 120,
      experience: "8+ years",
      distance: "5.2 km"
    
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      image: "/api/placeholder/100/100",
      specialization: ["Planting", "Sowing"],
      region: "Harda, Madhya Pradesh",
      rating: 4.9,
      reviews: 180,
      experience: "12+ years",
      distance: "3.5 km"

    },
    {
      id: 4,
      name: "Anil Kumar",
      image: "/api/placeholder/100/100",
      specialization: ["Harvesting", "Plowing"],
      region: "Khandwa, Madhya Pradesh",
      rating: 4.6,
      reviews: 135,
      experience: "9+ years",
      distance: "4.2 km"

    }
    // ... other brokers
  ];

  const regions = ['all', 'Punjab', 'Gujarat', 'Maharashtra', 'Uttar Pradesh'];
  const specializations = ['all', 'Harvesting', 'Sowing', 'Plowing', 'Irrigation', 'Planting'];

  const filteredBrokers = brokers.filter(broker => {
    const matchesSearch = broker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         broker.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || broker.region === selectedRegion;
    const matchesSpecialization = selectedSpecialization === 'all' || 
                                 broker.specialization.includes(selectedSpecialization);
    return matchesSearch && matchesRegion && matchesSpecialization;
  });

  return (
    <div className={`flex-1 transition-all duration-300 bg-gray-100 min-h-screen 
      ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
      
      {/* Location Prompt */}
      {showLocationPrompt && (
        <div className={`fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-200 shadow-sm mt-[64px] i  transition-all duration-300
          ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}
        `}>
          <div className="max-w-7xl mx-auto px-2 py-2 sm:px-3 lg:px-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-green-500" />
                <p className="ml-3 text-sm font-medium text-gray-900">
                  Enable location to find nearby brokers
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  className="text-sm font-medium text-green-600 hover:text-green-500"
                  onClick={() => setShowLocationPrompt(false)}
                >
                  Enable
                </button>
                <button
                  onClick={() => setShowLocationPrompt(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`pt-3 ${showLocationPrompt ? 'mt-16' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-green-500 p-8 md:p-12 lg:p-16 mb-8">
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                Find Agricultural Help<br />in Your Area
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl">
                Connect with verified brokers and skilled laborers for all your farming needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                  Post Requirements
                  <ArrowRight className="ml-2" />
                </button>
                <button className="inline-flex items-center px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-semibold">
                  Find Brokers
                  <Map className="ml-2" />
                </button>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-green-400/20 to-transparent" />
          </div>

          {/* View Toggle */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-1xl font-bold text-gray-800">Available Brokers</h2>
            <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  viewMode === 'nearby' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setViewMode('nearby')}
              >
                Nearby
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  viewMode === 'all' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setViewMode('all')}
              >
                All Locations
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search brokers by name or region..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <select
                  className="px-1 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  {regions.map(region => (
                    <option key={region} value={region}>
                      {region === 'all' ? 'All Regions' : region}
                    </option>
                  ))}
                </select>
                <select
                  className="px-1 py-1 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                >
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>
                      {spec === 'all' ? 'All Specializations' : spec}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Brokers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredBrokers.map((broker) => (
              <div key={broker.id} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <img 
                        src={broker.image} 
                        alt={broker.name} 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">{broker.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{broker.distance}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {broker.specialization.map((spec, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{broker.experience}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">{broker.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({broker.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                      Contact
                    </button>
                    <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-green-600 rounded-xl p-8 text-white text-center mb-20">
            <h2 className="text-2xl font-bold mb-4">Looking for a Job?</h2>
            <p className="text-lg mb-4">
              Join our platform and connect with farmers in your area
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
              Register Now
              <ChevronRight className="ml-2" />
            </button>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default Helpers;