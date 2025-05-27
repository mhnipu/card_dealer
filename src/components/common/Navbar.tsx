import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Sun, Moon, Search, User, ShoppingBag } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface SubNavItem {
  name: string;
  path: string;
}

interface NavItem {
  name: string;
  path: string;
  dropdown?: boolean;
  subItems?: SubNavItem[];
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Vehicles', path: '/vehicles', dropdown: true, subItems: [
      { name: 'All Vehicles', path: '/vehicles/all' },
      { name: 'SUVs', path: '/vehicles/suv' },
      { name: 'Sedans', path: '/vehicles/sedan' },
      { name: 'Sports Cars', path: '/vehicles/sports' },
      { name: 'Electric', path: '/vehicles/electric' },
      { name: 'Compare Models', path: '/vehicles/compare' },
    ]},
    { name: 'Design', path: '/design' },
    { name: 'Innovation', path: '/innovation' },
    { name: 'Services', path: '/services' },
    { name: 'Shop', path: '/shop' },
  ];

  const secondaryLinks = [
    { name: 'Museum & Heritage', path: '/heritage' },
    { name: 'Motorsport', path: '/motorsport' },
    { name: 'Events', path: '/events' },
    { name: 'Lifestyle', path: '/lifestyle' },
  ];

  const scrolledClasses = 'bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm';
  const topClasses = 'bg-gradient-to-b from-black/50 to-transparent';

  const logoColor = isScrolled ? (theme === 'light' ? 'text-black' : 'text-white') : 'text-white';
  const navLinkColor = isScrolled ? (theme === 'light' ? 'text-gray-800' : 'text-gray-300') : 'text-white';
  const navLinkHoverColor = isScrolled ? (theme === 'light' ? 'hover:text-black' : 'hover:text-white') : 'hover:text-gray-300';
  const activeNavLinkColor = isScrolled ? (theme === 'light' ? 'text-black font-medium' : 'text-white font-medium') : 'text-white font-medium';
  const iconColor = isScrolled ? (theme === 'light' ? 'text-black' : 'text-white') : 'text-white';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen ? scrolledClasses : topClasses
      }`}
    >
      {/* Top Secondary Navigation */}
      <div className="hidden lg:block border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center space-x-6">
              {secondaryLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-light transition-colors duration-300 ${navLinkHoverColor} ${
                    location.pathname === link.path 
                      ? 'text-white font-medium'
                      : 'text-white/80'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/my-account" className="text-xs text-white/80 hover:text-white transition-colors duration-300">
                My Account
              </Link>
              <Link to="/dealer-locator" className="text-xs text-white/80 hover:text-white transition-colors duration-300">
                Dealer Locator
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center">
            <div className={`flex items-center transition-colors duration-300 ${logoColor}`}>
              <svg 
                className="w-10 h-10 mr-2" 
                viewBox="0 0 100 100" 
                fill="currentColor"
              >
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M50 5 L50 95 M5 50 L95 50 M15 15 L85 85 M15 85 L85 15" stroke="currentColor" strokeWidth="2" />
                <circle cx="50" cy="50" r="20" />
              </svg>
              <span className="text-xl font-extralight tracking-widest">
                <span className="font-medium">LUXURY</span> MOTORS
              </span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <>
                    <div 
                      className={`flex items-center text-sm font-light transition-all duration-300 cursor-pointer ${navLinkHoverColor} ${
                        location.pathname.startsWith(link.path) 
                          ? activeNavLinkColor
                          : navLinkColor
                      }`}
                    >
                      {link.name}
                      <ChevronDown size={16} className="ml-1" />
                      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-200 ${
                        location.pathname.startsWith(link.path) ? 'w-full' : 'group-hover:w-full'
                      }`}></span>
                    </div>
                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="bg-white dark:bg-black shadow-lg overflow-hidden min-w-[220px] border border-gray-200 dark:border-gray-800">
                        {link.subItems?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className={`block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 ${
                              location.pathname === subItem.path 
                                ? 'bg-gray-100 dark:bg-gray-800 font-medium text-black dark:text-white' 
                                : 'text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className={`text-sm font-light transition-all duration-300 relative ${navLinkHoverColor} ${
                      location.pathname === link.path 
                        ? activeNavLinkColor
                        : navLinkColor
                    }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-200 ${
                      location.pathname === link.path ? 'w-full' : 'group-hover:w-full'
                    }`}></span>
                  </Link>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex items-center space-x-1 md:space-x-2">
            <button
              className={`p-2 rounded-full hover:bg-white/10 transition-colors duration-300 ${iconColor}`}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <button
              className={`p-2 rounded-full hover:bg-white/10 transition-colors duration-300 ${iconColor}`}
              aria-label="User account"
            >
              <User size={20} />
            </button>
            
            <button
              className={`p-2 rounded-full hover:bg-white/10 transition-colors duration-300 ${iconColor}`}
              aria-label="Shopping bag"
            >
              <ShoppingBag size={20} />
            </button>
            
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full hover:bg-white/10 transition-colors duration-300 ${iconColor}`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md lg:hidden transition-colors duration-300 ${iconColor}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden overflow-hidden shadow-lg ${isScrolled ? 'bg-white dark:bg-black' : 'bg-black/90'}`}
          >
            <div className="container mx-auto px-4 py-6 space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.dropdown ? (
                      <div>
                        <div 
                          className={`flex items-center justify-between py-2 text-base font-light transition-colors duration-300 border-b border-gray-800 ${navLinkHoverColor} ${
                            location.pathname.startsWith(link.path) 
                              ? activeNavLinkColor 
                              : navLinkColor
                          }`}
                        >
                          <Link to={link.path}>{link.name}</Link>
                          <ChevronDown size={18} />
                        </div>
                        <div className="pl-4 mt-2 mb-2 space-y-2">
                          {link.subItems?.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className={`block py-2 text-sm font-light transition-colors duration-300 ${navLinkHoverColor} ${
                                location.pathname === subItem.path 
                                  ? activeNavLinkColor 
                                  : navLinkColor
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        className={`block py-2 text-base font-light transition-colors duration-300 border-b border-gray-800 ${navLinkHoverColor} ${
                          location.pathname === link.path 
                            ? activeNavLinkColor 
                            : navLinkColor
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="pt-4">
                <p className="text-xs uppercase text-gray-500 mb-3">More</p>
                <div className="grid grid-cols-1 gap-2">
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`block py-1 text-sm font-light transition-colors duration-300 ${navLinkHoverColor} ${
                        location.pathname === link.path 
                          ? activeNavLinkColor 
                          : navLinkColor
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col space-y-3 pt-4">
                <Link 
                  to="/my-account" 
                  className="flex items-center text-sm font-light text-white/80 hover:text-white"
                >
                  <User size={16} className="mr-2" />
                  My Account
                </Link>
                <Link 
                  to="/dealer-locator" 
                  className="flex items-center text-sm font-light text-white/80 hover:text-white"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Find a Dealer
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;