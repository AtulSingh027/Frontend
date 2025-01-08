import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight, Tractor, Leaf, TrendingUp, Star, Calendar, ChevronRight, Phone } from 'lucide-react';

const TradeMarket = ({ isSidebarOpen }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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

  const featuredEquipment = [
    {
      image: "https://i.pinimg.com/736x/cc/0b/11/cc0b11209231a85ada8883c9edb5f45b.jpg",
      title: "John Deere 5310",
      rate: "₹1200/day",
      location: "Indore, India",
      rating: 4.8,
      reviews: 156,
      category: "tractors"
    },
    {
      image: "https://s.alicdn.com/@sc04/kf/A48902890a9b14289b59ba8d6e00eeeb8A.jpg",
      title: "Modern Cultivator",
      rate: "₹800/day",
      location: "Ashta, India",
      rating: 4.6,
      reviews: 98,
      category: "tools"
    },
    {
      image: "https://s.alicdn.com/@sc04/kf/Udf0928729c6f40d1a76548a3598635270.jpg",
      title: "Rotavator",
      rate: "₹600/day",
      location: "Dewas, India",
      rating: 4.7,
      reviews: 124,
      category: "tools"
    }
  ];

  const popularProducts = [
    {
      image: "https://5.imimg.com/data5/EL/YO/MY-16279308/wheat.jpeg",
      title: "Premium Wheat Seeds",
      price: "₹2000/quintal",
      location: "Haryana, India",
      category: "seeds"
    },
    {
      image: "https://www.agriplexindia.com/cdn/shop/products/Coragen_3_-08.png?v=1679921600",
      title: "Organic Fertilizer",
      price: "₹800/bag",
      location: "UP, India",
      category: "fertilizers"
    },
    {
      image: "https://images.jdmagicbox.com/quickquotes/images_main/hydraulic-tractor-trolley-372124854-xhmsx.jpg",
      title: "Modern Trolly",
      price: "₹700/day",
      location: "MP, India",
      category: "tools"
    }
  ];

  // Filter function
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredEquipment(featuredEquipment);
      setFilteredProducts(popularProducts);
    } else {
      setFilteredEquipment(featuredEquipment.filter(item => item.category === selectedCategory));
      setFilteredProducts(popularProducts.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory]);

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

          {/* Featured Equipment */}
          {filteredEquipment.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                  Featured Equipment
                </h2>
                <button className="text-green-600 hover:text-green-700 flex items-center text-sm md:text-base">
                  View All <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredEquipment.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                    <img src={item.image} alt={item.title} className="w-full h-40 md:h-48 object-cover" />
                    <div className="p-3 md:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base md:text-lg font-semibold">{item.title}</h3>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm">{item.rating}</span>
                        </div>
                      </div>
                      <p className="text-green-600 font-bold text-base md:text-lg">{item.rate}</p>
                      <div className="flex items-center text-gray-600 text-xs md:text-sm mt-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {item.location}
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs md:text-sm text-gray-500">{item.reviews} reviews</span>
                        <button className="px-3 py-1.5 md:px-4 md:py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                          Rent Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Popular Products */}
          {filteredProducts.length > 0 && (
            <div className="mt-8 md:mt-12">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                  Popular Products
                </h2>
                <button className="text-green-600 hover:text-green-700 flex items-center text-sm md:text-base">
                  View All <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                    <img src={item.image} alt={item.title} className="w-full h-40 md:h-48 object-cover" />
                    <div className="p-3 md:p-4">
                      <h3 className="text-base md:text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-green-600 font-bold text-base md:text-lg">{item.price}</p>
                      <div className="flex items-center text-gray-600 text-xs md:text-sm mt-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {item.location}
                      </div>
                      <button className="w-full mt-4 px-3 py-1.5 md:px-4 md:py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                        Contact Seller
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Show message when no results found */}
          {filteredEquipment.length === 0 && filteredProducts.length === 0 && (
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