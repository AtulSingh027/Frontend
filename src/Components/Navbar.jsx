import React, { useState, useEffect } from "react";
import { 
  Home, 
  ShoppingCart, 
  Users, 
  PlusIcon, 
  User, 
  Search, 
  Menu,
  ChevronLeft,
  Settings,
  HelpCircle,
  LogOut,
  X,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]); // Assuming you're using React Router

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const sidebarItems = [
    { icon: <Home className="w-6 h-6" />, label: 'Home', path: '/' },
    { icon: <ShoppingCart className="w-6 h-6" />, label: 'Market', path: '/TradeMarket' },
    { icon: <Users className="w-6 h-6" />, label: 'Helpers', path: '/Helpers' },
    { icon: <PlusIcon className="w-6 h-6" />, label: 'Create Post', path: '/PostResource' },
    
    // User Profile
    { icon: <User className="w-6 h-6" />, label: 'User Profile', path: '/UserProfile' },
  ];

  const bottomSidebarItems = [
    { icon: <Settings className="w-6 h-6" />, label: 'Settings', path: '/settings' },
    { icon: <HelpCircle className="w-6 h-6" />, label: 'Help', path: '/help' },
    { icon: <LogOut className="w-6 h-6" />, label: 'Logout', path: '/logout' },
    { icon: <UserPlus className="w-6 h-6" />, label: 'Sign Up', path: '/SignUp' },
    { icon: <User className="w-6 h-6" />, label: 'Login', path: '/Login' },
    // Sign Up
    { icon: <UserPlus className="w-6 h-6" />, label: 'Sign Up', path: '/SignUp' },
  ];

  return (
    <>
      <div className="flex flex-1">
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleMobileMenu}
          />
        )}

        {/* Sidebar - Now includes mobile version */}
        <aside 
          className={`fixed h-full bg-white border-r border-gray-300 z-50 transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? 'left-0' : '-left-full'} 
            md:left-0 
            ${isSidebarOpen ? 'w-64' : 'w-20'}
          `}
        >
          {/* Top Section */}
          <div className="flex flex-col h-full">
            {/* Header with Logo and Toggle */}
            <div className={`p-3 pr-[22px] border-b border-gray-200 flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
              <div className="flex items-center space-x-3 overflow-hidden">
                <img
                  src="https://www.svgrepo.com/show/325811/agriculture.svg"
                  alt="KisanTrack Logo"
                  className="w-10 h-10 min-w-[2.5rem]"
                />
                {isSidebarOpen && (
                  <h1 className="text-xl font-bold text-green-700 whitespace-nowrap">Kisan-Track</h1>
                )}
              </div>
              <div className="flex items-center">
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 hidden md:block"
                >
                  {isSidebarOpen ? (
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                  ) : (
                    <Menu className="w-6 h-6 text-gray-600" />
                  )}
                </button>
                {/* Mobile close button */}
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 md:hidden"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="p-4 flex-grow overflow-y-auto">
              {/* Search Bar - Only visible when sidebar is open */}
              {isSidebarOpen && (
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all duration-300 outline-none"
                  />
                  <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer"/>
                </div>
              )}

              {/* Main Navigation Links */}
              <nav className="space-y-2">
                {sidebarItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center ${
                      isSidebarOpen ? 'px-4' : 'justify-center px-2'
                    } py-3 rounded-lg text-gray-600 hover:bg-green-100 hover:text-green-600 transition-all duration-200`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    {isSidebarOpen && (
                      <span className="ml-3 whitespace-nowrap">{item.label}</span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom Section */}
            <div className="p-4 border-t border-gray-200">
              {bottomSidebarItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center ${
                    isSidebarOpen ? 'px-4' : 'justify-center px-2'
                  } py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-all duration-200 rounded-lg`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  {isSidebarOpen && (
                    <span className="ml-3 whitespace-nowrap">{item.label}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-64' : 'md:ml-20'
        }`}>
          {/* Top Navbar */}
          <nav className={`bg-white border-b border-gray-200 fixed w-full transition-all duration-300 shadow-sm ${
            isSidebarOpen ? 'md:w-[calc(100%-16rem)]' : 'md:w-[calc(100%-5rem)]'
          } z-30`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Mobile Left Section */}
                <div className="flex items-center space-x-4 md:hidden">
                  <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Menu className="w-6 h-6 text-gray-600" />
                  </button>
                  <img
                    src="https://www.svgrepo.com/show/325811/agriculture.svg"
                    alt="KisanTrack Logo"
                    className="w-8 h-8"
                  />
                </div>

                {/* Mobile Search Toggle */}
                <button
                  onClick={toggleSearch}
                  className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
                >
                  <Search className="w-6 h-6 text-gray-600" />
                </button>

                {/* Desktop Search Bar */}
                <div className="hidden md:block relative flex-1 max-w-md">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all duration-300 outline-none"
                  />
                  <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center space-x-8">
                  {sidebarItems.map((item, index) => (
                    <li key={index}>
                      <Link 
                        to={item.path}
                        className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-300"
                      >
                        {React.cloneElement(item.icon, { className: "w-5 h-5" })}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile Search Bar - Expandable */}
              <div className={`${
                isSearchVisible ? 'max-h-16 opacity-100 mb-4' : 'max-h-0 opacity-0'
              } transition-all duration-300 overflow-hidden md:hidden`}>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="pt-16">
            {/* Route content will be rendered here */}
          </main>
        </div>
      </div>

      {/* Mobile Footer Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-between h-16">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path}
                  className="flex flex-col items-center space-y-1 text-gray-600 hover:text-green-600 transition-colors duration-300"
                >
                  {React.cloneElement(item.icon, { className: "w-6 h-6" })}
                  <span className="text-xs">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}