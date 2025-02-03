import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Users, Tractor, Calendar, Leaf, TrendingUp, ArrowRight , Facebook, Twitter, Instagram, Mail, Phone, MapPin} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = ({ isSidebarOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const images = [
    {
      url: 'https://assets.weforum.org/article/image/large_pt5s540LUheppAt7oYIrch_Co9Y275oo6OltZlLQJg0.jpg',
      text: 'Modern Solutions for Traditional Farming ',
      subtext: 'Join our community to share and rent farming equipment'
    },
    {
      url: 'https://betafeld.cabaretti.com/storage/blogs/medias/1717601538.webp',
      text: 'Rent out your farming equipment',
      subtext: 'Access our network of experienced farm workers'
    },
    {
      url: 'https://tracextech.com/wp-content/uploads/2022/12/rice-value-chain.jpg',
      text: 'Find skilled laborers for your farm',
      subtext: 'Streamline your farming operations with KisanTrack'
    },
  ];

  const features = [
    {
      icon: <Tractor className="w-6 h-6 md:w-8 md:h-8 text-green-600" />,
      title: "Equipment Rental",
      description: "Rent out your farming equipment or find machinery for your needs",
      path: "/TradeMarket"
    },
    {
      icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-green-600" />,
      title: "Labor Hiring",
      description: "Connect with skilled agricultural workers in your area",
      path: "/Helpers"
    },
    {
      icon: <Calendar className="w-6 h-6 md:w-8 md:h-8 text-green-600" />,
      title: "Seasonal Planning",
      description: "Track farming seasons and plan your activities efficiently",
      path: "/seasonal-planning"
    }
  ];

  const marketplaceItems = [
    {
      image: "https://i.pinimg.com/736x/cc/0b/11/cc0b11209231a85ada8883c9edb5f45b.jpg",
      title: "Tractor",
      rate: "₹1000/day",
      location: "Mumbai, Maharashtra",
    },
    {
      image: "https://s.alicdn.com/@sc04/kf/A48902890a9b14289b59ba8d6e00eeeb8A.jpg",
      title: "Plough",
      rate: "₹1500/day",
      location: "Delhi, NCR",
    },
    {
      image: "https://s.alicdn.com/@sc04/kf/Udf0928729c6f40d1a76548a3598635270.jpg",
      title: "Cultivator",
      rate: "₹800/day",
      location: "Pune, Maharashtra",
    }
  ];

  const stats = [
    { value: "10,000+", label: "Registered Farmers" },
    { value: "5,000+", label: "Equipment Listed" },
    { value: "15,000+", label: "Successful Rentals" },
    { value: "8,000+", label: "Available Workers" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`flex-1 transition-all duration-300 bg-gray-100 min-h-screen pb-20 md:pb-0 
      ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
      
      {/* Main Content Container */}
      <div className="pt-3"> {/* Adjusted for fixed navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="relative w-full h-[18rem] sm:h-[24rem] md:h-[32rem] rounded-xl overflow-hidden shadow-lg ">
            <div className="absolute inset-0">
              <img
                src={images[currentIndex].url}
                alt={images[currentIndex].text}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12">
              <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4">
                {images[currentIndex].text}
              </h1>
              <p className="text-sm sm:text-base md:text-xl text-white/90 mb-4 md:mb-6 hidden sm:block">
                {images[currentIndex].subtext}
              </p>
              <Link
                to="/TradeMarket"
                className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-green-600 text-white text-sm md:text-base rounded-lg hover:bg-green-700 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </div>

            {/* Navigation Buttons - Hidden on very small screens */}
            <div className="absolute top-1/2 left-2 right-2 md:left-4 md:right-4 flex justify-between items-center -translate-y-1/2 hidden sm:flex">
              <button
                onClick={() => setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                className="p-1 md:p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </button>
              <button
                onClick={() => setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                className="p-1 md:p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
              >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors ${
                    currentIndex === idx ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 my-6 md:my-8 ">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-3 md:p-6 rounded-xl shadow-sm text-center">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-600">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="my-8 md:my-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
              Our Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 hover:cursor-pointer">
              {features.map((feature, idx) => (
                <Link
                  to={feature.path}
                  key={idx}
                  className="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-3 md:mb-4">{feature.icon}</div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Equipment Section */}
          <div className="my-8 md:my-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                Featured Equipment
              </h2>
              <Link 
                to="/TradeMarket"
                className="text-green-600 hover:text-green-700 flex items-center text-sm md:text-base"
              >
                View All <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {marketplaceItems.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg cursor-pointer">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 md:h-48 object-cover"
                  />
                  <div className="p-3 md:p-4">
                    <h3 className="text-base md:text-lg font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-green-600 font-medium mt-1">{item.rate}</p>
                    <div className="flex items-center text-gray-600 text-xs md:text-sm mt-2">
                      <Leaf className="w-4 h-4 mr-1" />
                      {item.location}
                    </div>
                     <div className='postion-absoulte text-right mt-[-20px]'>
                      <button className='p-2 bg-green-500 text-white rounded-md'>Book Now</button>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="my-8 md:my-12 bg-green-600 rounded-xl p-6 md:p-8 lg:p-12 text-center text-white">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-sm md:text-lg text-white/90 mb-4 md:mb-6">
              Join thousands of farmers who are already benefiting from KisanTrack
            </p>
            <Link
              to="/PostResource"
              className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-white text-green-600 text-sm md:text-base rounded-lg hover:bg-gray-100 transition-colors"
            >
              List Your Equipment
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>
        </div>

      </div>
      {/* Footer Section */}
      <footer className="bg-green-600 text-white py-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wrapper for Content */}
        <div className="flex flex-col items-center md:flex-row md:justify-between space-y-4 md:space-y-0">
          {/* Brand Info */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold">KisanTrack</h2>
            <p className="text-sm text-white/90">
              Revolutionizing agriculture in India, one step at a time.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="hover:text-gray-200 transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="hover:text-gray-200 transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="hover:text-gray-200 transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Home;