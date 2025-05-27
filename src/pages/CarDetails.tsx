import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Clock, Shield, Award } from 'lucide-react';
import { carsData } from '../utils/data';
import Button from '../components/common/Button';

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState(carsData.find(car => car.id === id));
  const [activeImage, setActiveImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  
  useEffect(() => {
    const foundCar = carsData.find(car => car.id === id);
    setCar(foundCar);
    
    if (foundCar) {
      setActiveImage(foundCar.images.main);
      setSelectedColor(foundCar.colors[0].code);
      document.title = `${foundCar.name} ${foundCar.model} | Prestige Auto`;
    }
    
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!car) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Car not found</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to home
        </Link>
      </div>
    );
  }
  
  const allImages = [car.images.main, ...car.images.gallery];
  
  const nextImage = () => {
    const currentIndex = allImages.indexOf(activeImage);
    const nextIndex = (currentIndex + 1) % allImages.length;
    setActiveImage(allImages[nextIndex]);
  };
  
  const prevImage = () => {
    const currentIndex = allImages.indexOf(activeImage);
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setActiveImage(allImages[prevIndex]);
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="bg-gray-100 dark:bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to={`/categories/${car.category}`} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {car.name} {car.model}
            </span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Image Gallery */}
          <div className="lg:w-3/5">
            <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4 h-96 md:h-[500px]">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={activeImage}
                alt={car.name}
                className="w-full h-full object-cover"
              />
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-900"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-900"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(image)}
                  className={`rounded-md overflow-hidden h-20 ${
                    activeImage === image 
                      ? 'ring-2 ring-blue-600' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${car.name} view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Car Details */}
          <div className="lg:w-2/5">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {car.name} {car.model}
            </h1>
            
            <div className="flex items-center mb-6">
              <span className="text-gray-600 dark:text-gray-400 mr-4">{car.year}</span>
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
              </span>
            </div>
            
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              ${car.price.toLocaleString()}
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {car.description}
            </p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Key Specifications
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Engine</p>
                  <p className="font-medium text-gray-900 dark:text-white">{car.specifications.engine}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Power</p>
                  <p className="font-medium text-gray-900 dark:text-white">{car.specifications.power}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Acceleration</p>
                  <p className="font-medium text-gray-900 dark:text-white">{car.specifications.acceleration}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Top Speed</p>
                  <p className="font-medium text-gray-900 dark:text-white">{car.specifications.topSpeed}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Available Colors
              </h3>
              <div className="flex space-x-3">
                {car.colors.map(color => (
                  <button
                    key={color.code}
                    onClick={() => setSelectedColor(color.code)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color.code 
                        ? 'border-blue-600 dark:border-blue-400' 
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {car.colors.find(color => color.code === selectedColor)?.name}
              </p>
            </div>
            
            <div className="space-y-3 mb-8">
              <Button variant="primary" size="lg" fullWidth>
                Schedule Test Drive
              </Button>
              <Button variant="outline" size="lg" fullWidth>
                Inquire About This Vehicle
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <Clock size={18} className="mr-1" />
                <span className="text-sm">24-Hour Test Drives</span>
              </div>
              <div className="flex items-center">
                <Shield size={18} className="mr-1" />
                <span className="text-sm">5-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Features & Highlights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full inline-block mb-4">
                <Award className="text-blue-600 dark:text-blue-400 h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Premium Features</h3>
              <ul className="space-y-2">
                {car.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-green-500 h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full inline-block mb-4">
                <svg className="text-blue-600 dark:text-blue-400 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Performance</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="text-green-500 h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {car.specifications.engine}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {car.specifications.power}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {car.specifications.acceleration}
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full inline-block mb-4">
                <svg className="text-blue-600 dark:text-blue-400 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Technology & Safety</h3>
              <ul className="space-y-2">
                {car.features.slice(3, 6).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-green-500 h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Specifications */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Detailed Specifications
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Performance & Drivetrain
                </h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-gray-600 dark:text-gray-400">Engine</dt>
                    <dd className="font-medium text-gray-900 dark:text-white">{car.specifications.engine}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600 dark:text-gray-400">Power</dt>
                    <dd className="font-medium text-gray-900 dark:text-white">{car.specifications.power}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600 dark:text-gray-400">Acceleration</dt>
                    <dd className="font-medium text-gray-900 dark:text-white">{car.specifications.acceleration}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600 dark:text-gray-400">Top Speed</dt>
                    <dd className="font-medium text-gray-900 dark:text-white">{car.specifications.topSpeed}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600 dark:text-gray-400">Transmission</dt>
                    <dd className="font-medium text-gray-900 dark:text-white">{car.specifications.transmission}</dd>
                  </div>
                </dl>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Fuel & Efficiency
                </h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-gray-600 dark:text-gray-400">Fuel Type</dt>
                    <dd className="font-medium text-gray-900 dark:text-white">{car.specifications.fuelType}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600 dark:text-gray-400">Fuel Consumption</dt>
                    <dd className="font-medium text-gray-900 dark:text-white">{car.specifications.fuelConsumption}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600 dark:text-gray-400">Model Year</dt>
                    <dd className="font-medium text-gray-900 dark:text-white">{car.year}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600 dark:text-gray-400">Warranty</dt>
                    <dd className="font-medium text-gray-900 dark:text-white">5 Years / 60,000 Miles</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        {/* Book Test Drive Form */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 md:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Schedule a Test Drive
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Experience the exceptional performance and luxury of the {car.name} {car.model} firsthand. 
                Fill out the form to schedule a test drive at your convenience.
              </p>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <Clock size={20} className="text-blue-600 dark:text-blue-400 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">24-Hour Test Drives Available</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Vehicle Summary
                </h3>
                <div className="flex items-center">
                  <img 
                    src={car.images.main} 
                    alt={car.name} 
                    className="w-20 h-14 object-cover rounded mr-4"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {car.year} {car.name} {car.model}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      ${car.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <form className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Preferred Time
                    </label>
                    <select
                      id="time"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      required
                    >
                      <option value="">Select a time</option>
                      <option value="morning">Morning (9am - 12pm)</option>
                      <option value="afternoon">Afternoon (12pm - 3pm)</option>
                      <option value="evening">Evening (3pm - 6pm)</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                    placeholder="Any specific questions or requests?"
                  ></textarea>
                </div>
                
                <Button variant="primary" type="submit" fullWidth>
                  Submit Request
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;