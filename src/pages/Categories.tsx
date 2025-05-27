import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { carsData, carCategories } from '../utils/data';
import CarCard from '../components/common/CarCard';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

const Categories: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [filteredCars, setFilteredCars] = useState(carsData.filter(car => car.category === category));
  const [currentCategory, setCurrentCategory] = useState(carCategories.find(cat => cat.id === category));
  const [sortOption, setSortOption] = useState('default');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    const categoryData = carCategories.find(cat => cat.id === category);
    setCurrentCategory(categoryData);
    
    if (categoryData) {
      document.title = `${categoryData.name} | Prestige Auto`;
    }
    
    // Filter cars by category and price range
    let filtered = carsData.filter(car => car.category === category && car.price >= priceRange[0] && car.price <= priceRange[1]);
    
    // Sort cars based on the selected option
    switch (sortOption) {
      case 'price-low':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Default sorting (newest)
        filtered = filtered.sort((a, b) => b.year - a.year);
    }
    
    setFilteredCars(filtered);
    window.scrollTo(0, 0);
  }, [category, sortOption, priceRange]);
  
  if (!currentCategory) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Category not found</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen">
      {/* Category Header */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={currentCategory.image} 
          alt={currentCategory.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              {currentCategory.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-200 text-lg max-w-xl"
            >
              Explore our collection of premium {currentCategory.name.toLowerCase()} designed for uncompromising performance and luxury.
            </motion.p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Filters and Sorting */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center text-gray-700 dark:text-gray-300 font-medium"
            >
              <SlidersHorizontal size={20} className="mr-2" />
              Filter & Sort
              <ChevronDown size={20} className={`ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`${showFilters ? 'block' : 'hidden'} md:flex flex-col md:flex-row md:items-center gap-6`}>
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sort By
                </label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="default">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="10000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredCars.length} {filteredCars.length === 1 ? 'vehicle' : 'vehicles'}
            </div>
          </div>
        </div>
        
        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredCars.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No vehicles found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your filters to find vehicles in our inventory.
            </p>
            <button
              onClick={() => setPriceRange([0, 200000])}
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
        
        {/* Browse Other Categories */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Browse Other Categories
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {carCategories
              .filter(cat => cat.id !== category)
              .map((cat, index) => (
                <Link
                  key={cat.id}
                  to={`/categories/${cat.id}`}
                  className="group"
                >
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white text-lg font-semibold">{cat.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;