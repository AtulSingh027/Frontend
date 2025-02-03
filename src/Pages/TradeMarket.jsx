import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight, Tractor, Leaf, TrendingUp, Star, Calendar, ChevronRight, Phone } from 'lucide-react';
import axios from 'axios';

const TradeMarket = ({ isSidebarOpen }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [marketData, setMarketData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/posts/");
        setMarketData(response.data);
        setFilteredData(response.data); // Initially show all data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Filter data when category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredData(marketData);
    } else {
      setFilteredData(marketData.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory, marketData]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { id: 'all', name: 'All Items', icon: <Tractor className="w-4 h-4 md:w-5 md:h-5" /> },
    { id: 'tractors', name: 'Tractors', icon: <Tractor className="w-4 h-4 md:w-5 md:h-5" /> },
    { id: 'tools', name: 'Farm Tools', icon: <Leaf className="w-4 h-4 md:w-5 md:h-5" /> },
    { id: 'seeds', name: 'Seeds', icon: <Leaf className="w-4 h-4 md:w-5 md:h-5" /> },
    { id: 'fertilizers', name: 'Fertilizers', icon: <Leaf className="w-4 h-4 md:w-5 md:h-5" /> }
  ];

  return (
    <div className={`flex-1 transition-all duration-300 bg-gray-100 min-h-screen pb-20 md:pb-0 
      ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
      
      <div className="pt-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="mt-4 md:mt-6">
            <div className="flex overflow-x-auto gap-3 md:gap-4 pb-4 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-3 py-2 md:px-4 md:py-2 rounded-full whitespace-nowrap text-sm md:text-base shadow-sm ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Market Items Grid */}
          {filteredData.length > 0 ? (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                  Available Items
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredData.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src={`http://127.0.0.1:8000${item.Poster}`} 
                      alt={item.title} 
                      className="w-full h-40 md:h-48 object-cover"
                    />
                    <div className="p-3 md:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base md:text-lg font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.Description}</p>
                      <p className="text-green-600 font-bold text-base md:text-lg">₹{item.RentPrice.toLocaleString()}</p>
                      <div className="flex items-center text-gray-600 text-xs md:text-sm mt-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {item.category}
                      </div>
                      <button className="w-full mt-4 px-3 py-1.5 md:px-4 md:py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                        Contact Seller
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8 text-center">
              <h3 className="text-lg md:text-xl text-gray-600">No items found for the selected category</h3>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-8 md:mt-12 mb-8">
            <div className="bg-green-600 rounded-xl p-6 md:p-8 lg:p-12 text-center text-white">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
                Have Equipment to Rent?
              </h2>
              <p className="text-sm md:text-lg text-white/90 mb-4 md:mb-6">
                List your agricultural equipment and reach thousands of farmers
              </p>
              <button className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-white text-green-600 text-sm md:text-base rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                Post Your Equipment
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="my-5 md:my-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 text-center">
              Why Choose Our Platform
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  icon: <Calendar className="w-6 h-6 md:w-8 md:h-8 text-green-600" />,
                  title: "Flexible Rental Duration",
                  description: "Rent equipment for a day, week, or month based on your needs"
                },
                {
                  icon: <Star className="w-6 h-6 md:w-8 md:h-8 text-green-600" />,
                  title: "Verified Sellers",
                  description: "All equipment providers are verified for quality assurance"
                },
                {
                  icon: <Phone className="w-6 h-6 md:w-8 md:h-8 text-green-600" />,
                  title: "Direct Communication",
                  description: "Connect directly with equipment owners for better deals"
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-4 md:p-4 rounded-xl text-center">
                  <div className="flex justify-center mb-3 md:mb-4">{feature.icon}</div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeMarket;