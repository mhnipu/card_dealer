import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Filter, Search, SlidersHorizontal, Star } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Parallax } from '../context/ScrollAnimationContext';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import VehicleBackground from '../components/vehicles/VehicleBackground';
import CategoryCard from '../components/vehicles/CategoryCard';
import { vehiclesData, standardCategories } from '../utils/data';

// Filter options
const categories = standardCategories;
const fuelTypes = ['All', 'Gas', 'Electric', 'Hybrid'];
const years = ['All', '2024', '2023', '2022'];
const priceRanges = [
  { label: 'All', value: [0, 1000000] },
  { label: 'Under $50,000', value: [0, 50000] },
  { label: '$50,000 - $100,000', value: [50000, 100000] },
  { label: '$100,000 - $200,000', value: [100000, 200000] },
  { label: 'Over $200,000', value: [200000, 1000000] },
];

const VehiclesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFuelType, setSelectedFuelType] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [showFilters, setShowFilters] = useState(false);
  
  // New state for background image
  const [backgroundImage, setBackgroundImage] = useState('');
  
  // Get category from URL parameter
  const { category } = useParams<{ category?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Handle vehicle card click to navigate to details
  const handleVehicleClick = (vehicleId: string) => {
    console.log("Navigating to vehicle details:", vehicleId);
    // Use setTimeout to ensure the navigation happens after the current event loop
    setTimeout(() => {
      navigate(`/cars/${vehicleId}`);
    }, 0);
  };
  
  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  // Helper function to capitalize category names for display
  const formatCategoryName = (categoryName: string): string => {
    if (categoryName === 'all') return 'All';
    if (categoryName === 'suv') return 'SUV';
    return categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  };
  
  // Set the selected category based on the URL parameter
  useEffect(() => {
    if (category) {
      // Convert URL parameter to lowercase for comparison
      const lowercaseCategory = category.toLowerCase();
      
      // Debug the category from URL
      console.log('Category from URL:', category);
      console.log('Lowercase category:', lowercaseCategory);
      
      // Set the selected category directly to lowercase value
      setSelectedCategory(lowercaseCategory);
    } else {
      setSelectedCategory('all');
    }
  }, [category]);
  
  // Filter vehicles based on selected filters
  const filteredVehicles = useMemo(() => {
    console.log('Filtering vehicles with category:', selectedCategory);
    console.log('Available vehicles:', vehiclesData);
    
    const filtered = vehiclesData.filter(vehicle => {
      // Category filter - ensure case-insensitive comparison
      if (selectedCategory !== 'all' && vehicle.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        console.log(`Vehicle ${vehicle.name} category ${vehicle.category.toLowerCase()} doesn't match ${selectedCategory.toLowerCase()}`);
        return false;
      }
      
      // Fuel type filter - ensure case-insensitive comparison
      if (selectedFuelType !== 'All' && vehicle.fuelType.toLowerCase() !== selectedFuelType.toLowerCase()) {
        return false;
      }
      
      // Year filter
      if (selectedYear !== 'All' && vehicle.year.toString() !== selectedYear) {
        return false;
      }
      
      // Price range filter
      if (
        selectedPriceRange.value[0] !== undefined && 
        selectedPriceRange.value[1] !== undefined &&
        (vehicle.price < selectedPriceRange.value[0] || vehicle.price > selectedPriceRange.value[1])
      ) {
        return false;
      }
      
      // Search term - ensure case-insensitive comparison
      if (
        searchTerm &&
        !vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !vehicle.category.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      
      console.log(`Vehicle ${vehicle.name} matches category ${selectedCategory}`);
      return true;
    });
    
    console.log('Filtered vehicles:', filtered);
    return filtered;
  }, [selectedCategory, selectedFuelType, selectedYear, selectedPriceRange, searchTerm]);
  
  // Update background image when category changes
  useEffect(() => {
    // Find a representative vehicle for the selected category
    let bgImage = '';
    
    if (selectedCategory === 'All') {
      // Use the first vehicle's image for "All" category
      bgImage = vehiclesData[0]?.image || '';
    } else {
      // Find a vehicle from the selected category
      const categoryVehicle = vehiclesData.find(
        vehicle => vehicle.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      bgImage = categoryVehicle?.image || '';
    }
    
    setBackgroundImage(bgImage);
  }, [selectedCategory]);
  
  // Calculate category counts
  const getCategoryCount = (categoryName: string) => {
    if (categoryName === 'All') return vehiclesData.length;
    return vehiclesData.filter(
      vehicle => vehicle.category.toLowerCase() === categoryName.toLowerCase()
    ).length;
  };
  
  // Get category image
  const getCategoryImage = (categoryName: string) => {
    if (categoryName === 'All') return vehiclesData[0]?.image || '';
    
    const categoryVehicle = vehiclesData.find(
      vehicle => vehicle.category.toLowerCase() === categoryName.toLowerCase()
    );
    return categoryVehicle?.image || '';
  };
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      {/* Hero section with vehicle background */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden mb-6 sm:mb-10 bg-black">
        {/* Dynamic background with selected category's vehicle - only visible on right side */}
        <div className="absolute inset-0 w-full h-full">
          <div className="md:clip-right-half absolute inset-0">
            <VehicleBackground 
              vehicleImage={backgroundImage} 
              category={selectedCategory.toLowerCase()}
            />
          </div>
        </div>
        
        {/* Dark overlay for the right side */}
        <div className="hidden md:block absolute inset-0 right-0 left-1/2 bg-black/15 z-20"></div>
        
        <div className="max-w-[1400px] mx-auto h-full relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row h-full">
            {/* Left side - Text content with full black background */}
            <div className="w-full md:w-1/2 h-full bg-black relative z-20">
              {/* Shadow at the split */}
              <div className="hidden md:block absolute top-0 right-0 h-full w-16 z-10">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
                
                {/* Blob-like shadows at the edge */}
                <div className="absolute top-0 right-0 h-full w-full overflow-hidden">
                  <div className="absolute -right-12 top-1/3 w-36 h-36 rounded-full bg-black opacity-80 blur-lg"></div>
                  <div className="absolute -right-8 top-2/3 w-28 h-28 rounded-full bg-black opacity-80 blur-lg"></div>
                  <div className="absolute -right-10 bottom-1/3 w-32 h-32 rounded-full bg-black opacity-80 blur-lg"></div>
                </div>
              </div>
              
              <div className="flex items-center h-full">
                <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-12 md:py-0 w-full">
                  <Parallax speed={-0.2}>
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light uppercase tracking-wide text-white mb-4 sm:mb-6">
                        {formatCategoryName(selectedCategory)}
                      </h1>
                      <div className="w-16 sm:w-24 h-[2px] bg-white mb-4 sm:mb-8"></div>
                      <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed mb-6 sm:mb-8">
                        {selectedCategory === 'all' 
                          ? 'Discover our full range of luxury vehicles. From powerful sports cars to elegant sedans and versatile SUVs, find the perfect match for your driving desires.'
                          : `Explore our collection of luxury ${formatCategoryName(selectedCategory)} vehicles, crafted with precision engineering and exquisite design.`
                        }
                      </p>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex gap-3 sm:gap-4 flex-wrap"
                      >
                        <button className="px-4 sm:px-8 py-2 sm:py-3 border border-white text-white uppercase tracking-wider text-xs sm:text-sm transition-all hover:bg-white hover:text-black font-light">
                          Explore Models
                        </button>
                        <button className="px-4 sm:px-8 py-2 sm:py-3 bg-white text-black uppercase tracking-wider text-xs sm:text-sm transition-all hover:bg-white/90 font-light">
                          Build Your Own
                        </button>
                      </motion.div>
                    </motion.div>
                  </Parallax>
                </div>
              </div>
            </div>
            
            {/* Right side - Dark overlay on background */}
            <div className="hidden md:block w-1/2 h-full relative">
              {/* Left edge shadow */}
              <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-1/4 left-16 w-[15%] h-[1px] bg-white/40 z-10"></div>
              <div className="absolute bottom-1/4 right-12 w-[1px] h-[15%] bg-white/40 z-10"></div>
              
              {/* Corner accents */}
              <div className="absolute top-12 right-12 w-[8%] h-[1px] bg-white/30 z-10"></div>
              <div className="absolute top-12 right-12 w-[1px] h-[8%] bg-white/30 z-10"></div>
              <div className="absolute bottom-12 left-16 w-[8%] h-[1px] bg-white/30 z-10"></div>
              <div className="absolute bottom-12 left-16 w-[1px] h-[8%] bg-white/30 z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Divider - reduced margin */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="w-full h-px bg-gray-200 dark:bg-gray-800"></div>
      </div>

      {/* Main content */}
      <div className="bg-white dark:bg-black pb-20 relative">
        {/* Subtle overlays */}
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="absolute top-0 right-[10%] w-[1px] h-[70%] bg-black dark:bg-white"></div>
          <div className="absolute bottom-0 left-[10%] w-[1px] h-[40%] bg-black dark:bg-white"></div>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Category Browser */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block w-1 h-6 sm:h-8 bg-black dark:bg-white"></span>
                  <h2 className="text-2xl sm:text-3xl font-light text-black dark:text-white uppercase tracking-wider">
                    Models
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs sm:text-sm ml-9">
                  {filteredVehicles.length} vehicles
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {/* Category cards using our new component */}
              {categories.map((category) => (
                <CategoryCard
                  key={category}
                  id={category.toLowerCase()}
                  name={category}
                  image={getCategoryImage(category)}
                  count={getCategoryCount(category)}
                  isActive={selectedCategory === category}
                  onClick={() => {
                    // Update URL to reflect the selected category
                    if (category === 'All') {
                      navigate('/vehicles/all');
                    } else {
                      navigate(`/vehicles/${category.toLowerCase()}`);
                    }
                    setSelectedCategory(category);
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Search and advanced filters */}
          <div className="mb-10 sm:mb-20 bg-white dark:bg-black p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="relative flex-1 w-full">
                <h2 className="text-lg sm:text-xl text-black dark:text-white uppercase tracking-wider mb-4 sm:mb-5 flex items-center">
                  <span className="w-8 sm:w-10 h-8 sm:h-10 border border-gray-300 dark:border-white/30 flex items-center justify-center mr-3">
                    <Search className="text-black dark:text-white" size={16} />
                  </span>
                  Find Your Perfect Vehicle
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-black/70 dark:text-white/70" size={18} />
                  <input
                    type="text"
                    placeholder="Search by model, feature or keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 sm:pl-14 pr-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-black dark:text-white text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors uppercase tracking-wider text-xs sm:text-sm font-light flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 mt-2 md:mt-8 w-full md:w-auto justify-center"
              >
                <SlidersHorizontal size={16} className="sm:hidden" />
                <SlidersHorizontal size={18} className="hidden sm:block" />
                <span>Filters</span>
                <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {/* Advanced Filters - Mercedes style */}
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Fuel Type Filter */}
                  <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-6 sm:w-8 h-6 sm:h-8 border border-gray-300 dark:border-white/30 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 sm:h-4 w-3 sm:w-4 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <label className="text-sm sm:text-base font-light text-black dark:text-white uppercase tracking-wider">Fuel Type</label>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {fuelTypes.map(type => (
                        <button
                          key={type}
                          onClick={() => setSelectedFuelType(type)}
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs uppercase tracking-wider transition-all ${
                            selectedFuelType === type
                              ? 'bg-black text-white dark:bg-white dark:text-black font-medium'
                              : 'bg-gray-100 text-black dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Year Filter */}
                  <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-6 sm:w-8 h-6 sm:h-8 border border-gray-300 dark:border-white/30 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 sm:h-4 w-3 sm:w-4 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <label className="text-sm sm:text-base font-light text-black dark:text-white uppercase tracking-wider">Model Year</label>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {years.map(year => (
                        <button
                          key={year}
                          onClick={() => setSelectedYear(year)}
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs uppercase tracking-wider transition-all ${
                            selectedYear === year
                              ? 'bg-black text-white dark:bg-white dark:text-black font-medium'
                              : 'bg-gray-100 text-black dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range Filter */}
                  <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-6 sm:w-8 h-6 sm:h-8 border border-gray-300 dark:border-white/30 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 sm:h-4 w-3 sm:w-4 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <label className="text-sm sm:text-base font-light text-black dark:text-white uppercase tracking-wider">Price Range</label>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {priceRanges.map(range => (
                        <button
                          key={range.label}
                          onClick={() => setSelectedPriceRange(range)}
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs uppercase tracking-wider transition-all ${
                            selectedPriceRange.label === range.label
                              ? 'bg-black text-white dark:bg-white dark:text-black font-medium'
                              : 'bg-gray-100 text-black dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 sm:mt-8 flex justify-end">
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                      setSelectedFuelType('All');
                      setSelectedYear('All');
                      setSelectedPriceRange(priceRanges[0]);
                    }}
                    className="border border-black dark:border-white text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors px-4 sm:px-6 py-2 uppercase text-xs tracking-wider mr-3"
                  >
                    Reset All
                  </button>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors px-4 sm:px-6 py-2 uppercase text-xs tracking-wider"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Results summary - Dark Mercedes style */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 sm:mb-14 border-b border-gray-200 dark:border-gray-700 pb-6 sm:pb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-1 h-6 sm:h-8 bg-black dark:bg-white"></span>
                <h2 className="text-2xl sm:text-3xl font-light text-black dark:text-white uppercase tracking-wider">
                  {selectedCategory !== 'all' ? formatCategoryName(selectedCategory) : 'All'}{' '}
                  <span className="text-black dark:text-white">Models</span>
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs sm:text-sm ml-9">
                {filteredVehicles.length} {filteredVehicles.length === 1 ? 'model' : 'models'} available
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Sort by:
              </span>
              <select className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 text-black dark:text-white px-3 sm:px-4 py-1.5 sm:py-2 uppercase text-xs tracking-wider focus:border-black dark:focus:border-white focus:outline-none">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Models</option>
                <option>Popular</option>
              </select>
            </div>
          </div>
          
          {/* Vehicle grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  ref={index === 0 ? ref : undefined}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => handleVehicleClick(vehicle.id)}
                  className="bg-white dark:bg-black overflow-hidden transition-all duration-500 group border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-white/50 hover:translate-y-[-8px] cursor-pointer"
                >
                  {/* Premium tag for expensive vehicles */}
                  {vehicle.price > 150000 && (
                    <div className="absolute top-0 right-0 z-20 bg-black dark:bg-white text-white dark:text-black px-3 sm:px-6 py-1 text-xs uppercase tracking-wider font-medium">
                      Premium
                    </div>
                  )}
                  
                  {/* Card Effect with perspective */}
                  <div className="relative h-48 sm:h-60 md:h-72 overflow-hidden perspective">
                    <div className="absolute inset-0 w-full h-full transform group-hover:rotate-y-3 group-hover:rotate-x-2 transition-transform duration-700">
                      <img 
                        src={vehicle.image} 
                        alt={vehicle.name} 
                        className="w-full h-full object-cover object-center transition-all duration-1000 group-hover:scale-110"
                        loading="lazy"
                        width="400"
                        height="300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                      
                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-[15%] h-[1px] bg-white/50"></div>
                      <div className="absolute top-0 left-0 w-[1px] h-[15%] bg-white/50"></div>
                      <div className="absolute bottom-0 right-0 w-[15%] h-[1px] bg-white/50"></div>
                      <div className="absolute bottom-0 right-0 w-[1px] h-[15%] bg-white/50"></div>
                      
                      {/* Brand logo */}
                      {vehicle.logo && (
                        <div className="absolute top-4 left-4 w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center">
                          <img 
                            src={vehicle.logo} 
                            alt={`${vehicle.name} logo`}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      )}
                      
                      {/* Subtle light effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-2000"></div>
                      </div>
                      
                      {/* Category badge */}
                      <div className="absolute top-4 right-4 transform group-hover:scale-110 transition-transform">
                        <span className="inline-block px-3 py-1 text-xs font-light bg-white/90 text-gray-800 uppercase tracking-wider">
                          {vehicle.category}
                        </span>
                      </div>
                      
                      {/* Model year badge */}
                      <div className="absolute bottom-4 left-4 transform group-hover:translate-x-1 transition-transform">
                        <span className="inline-block px-3 sm:px-4 py-1 text-xs font-light bg-white text-black uppercase tracking-wider">
                          {vehicle.year}
                        </span>
                      </div>
                      
                      {/* Vehicle name overlay */}
                      <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full transform group-hover:translate-y-[-5px] transition-transform">
                        <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-light uppercase tracking-wider group-hover:text-white transition-colors">
                          {vehicle.name}
                        </h3>
                        <div className="h-[2px] w-12 bg-white mt-3 group-hover:w-24 transition-all duration-700"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    {/* Price and fuel type */}
                    <div className="flex justify-between items-center mb-4 sm:mb-6 border-b border-gray-200 dark:border-gray-700 pb-4 sm:pb-6">
                      <div className="flex flex-col">
                        <span className="text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider mb-1">Price</span>
                        <div className="text-black dark:text-white text-lg sm:text-2xl font-light">
                          ${vehicle.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider mb-1">Powertrain</span>
                        <div className="text-xs text-white dark:text-black px-2 sm:px-4 py-1 sm:py-1.5 bg-black dark:bg-white font-light uppercase tracking-wider">
                          {vehicle.fuelType}
                        </div>
                      </div>
                    </div>
                    
                    {/* Key features */}
                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-gray-700 dark:text-gray-300 text-xs font-light mb-2 sm:mb-3 uppercase tracking-wider flex items-center">
                        <span className="inline-block w-4 h-[1px] bg-black dark:bg-white mr-2"></span>
                        Technical Specifications
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {vehicle.features.map((feature, i) => (
                          <span 
                            key={i} 
                            className="inline-block px-2 sm:px-3 py-1 sm:py-1.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVehicleClick(vehicle.id);
                        }} 
                        className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors px-3 sm:px-5 py-2 flex items-center group uppercase tracking-wider text-xs"
                      >
                        <span>Details</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVehicleClick(vehicle.id);
                        }} 
                        className="border border-black dark:border-white text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors px-3 sm:px-5 py-2 uppercase tracking-wider text-xs"
                      >
                        Configure
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 sm:py-24 text-center bg-white dark:bg-black border border-gray-200 dark:border-gray-700">
                <div className="w-12 sm:w-16 h-12 sm:h-16 border border-gray-300 dark:border-white/30 flex items-center justify-center mb-6 sm:mb-8">
                  <Filter size={20} className="text-black dark:text-white sm:hidden" />
                  <Filter size={24} className="text-black dark:text-white hidden sm:block" />
                </div>
                <h3 className="text-2xl sm:text-3xl text-black dark:text-white mb-3 sm:mb-4 font-light uppercase tracking-wider">No Models Found</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6 sm:mb-8 px-4 text-sm sm:text-base">
                  We couldn't find any vehicles matching your current filters. Try adjusting your search criteria or browse our complete collection.
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedFuelType('All');
                    setSelectedYear('All');
                    setSelectedPriceRange(priceRanges[0]);
                  }}
                  className="bg-black text-white hover:bg-gray-800 transition-colors px-6 sm:px-8 py-2 sm:py-3 uppercase tracking-wider text-xs flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 sm:h-4 w-3 sm:w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesPage; 