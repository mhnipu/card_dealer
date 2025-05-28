import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Clock, Shield, Award, ArrowLeft, Star, Zap, Gauge } from 'lucide-react';
import { carsData, vehiclesData } from '../utils/data';
import Button from '../components/common/Button';
import { Parallax } from '../context/ScrollAnimationContext';
import VehicleBackground from '../components/vehicles/VehicleBackground';

// Define interfaces for type safety
interface Color {
  name: string;
  code: string;
}

interface Car {
  id: string;
  name: string;
  model: string;
  category: string;
  price: number;
  year: number;
  description: string;
  features: string[];
  specifications: {
    engine: string;
    power: string;
    acceleration: string;
    topSpeed: string;
    transmission: string;
    fuelType: string;
    fuelConsumption: string;
  };
  images: {
    main: string;
    gallery: string[];
  };
  colors: Color[];
}

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [activeImage, setActiveImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isSimpleVehicle, setIsSimpleVehicle] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specifications' | 'features'>('overview');
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("Looking for car with id:", id);
    
    let foundCar = carsData.find(car => car.id === id);
    
    if (!foundCar) {
      const foundVehicle = vehiclesData.find(vehicle => vehicle.id === id);
      console.log("Found in vehiclesData:", foundVehicle);
      
      if (foundVehicle) {
        setIsSimpleVehicle(true);
        foundCar = {
          id: foundVehicle.id,
          name: foundVehicle.name,
          model: '',
          category: foundVehicle.category,
          price: foundVehicle.price,
          year: foundVehicle.year,
          description: `A premium ${foundVehicle.category} vehicle with exceptional performance and elegant design.`,
          features: foundVehicle.features || [],
          specifications: {
            engine: foundVehicle.features?.[0] || 'N/A',
            power: foundVehicle.features?.[0] || 'N/A',
            acceleration: foundVehicle.features?.[1] || 'N/A',
            topSpeed: foundVehicle.features?.[2] || 'N/A',
            transmission: 'Automatic',
            fuelType: foundVehicle.fuelType || 'N/A',
            fuelConsumption: 'N/A'
          },
          images: {
            main: foundVehicle.image,
            gallery: [foundVehicle.image]
          },
          colors: [
            { name: 'Default', code: '#000000' },
            { name: 'White', code: '#FFFFFF' },
            { name: 'Silver', code: '#C0C0C0' }
          ]
        } as Car;
      }
    }
    
    setCar(foundCar || null);
    
    if (foundCar) {
      setActiveImage(foundCar.images.main);
      setSelectedColor(foundCar.colors[0].code);
      document.title = `${foundCar.name} ${foundCar.model || ''} | Luxury Motors`;
    }
    
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!car) {
    return (
      <div className="container mx-auto px-4 py-32 text-center bg-black text-white">
        <div className="w-16 h-16 border border-white/30 flex items-center justify-center mx-auto mb-6">
          <ChevronLeft size={24} className="text-white" />
        </div>
        <h2 className="text-3xl font-light mb-6 uppercase tracking-wider">Vehicle not found</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          The vehicle you're looking for might have been moved or is no longer available.
        </p>
        <Button variant="outline" onClick={() => navigate('/vehicles')}>
          Browse All Vehicles
        </Button>
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

  // Format category name for display
  const formatCategoryName = (categoryName: string): string => {
    if (categoryName === 'all') return 'All';
    if (categoryName === 'suv') return 'SUV';
    return categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero section with vehicle background - identical to Vehicles page */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden mb-6 sm:mb-10">
        {/* Dynamic background with vehicle - only visible on right side */}
        <div className="absolute inset-0 w-full h-full">
          <div className="md:clip-right-half absolute inset-0">
            <VehicleBackground 
              vehicleImage={car.images.main}
              category={car.category.toLowerCase()}
            />
          </div>
        </div>
        
        {/* Clean vertical split line */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/10 z-30"></div>
        
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
                      <div className="flex items-center mb-6">
                        <button 
                          onClick={() => navigate('/vehicles')}
                          className="flex items-center text-gray-400 hover:text-white transition-colors group"
                        >
                          <ArrowLeft size={20} className="mr-2 group-hover:translate-x-[-3px] transition-transform" />
                          <span className="uppercase text-sm tracking-wider">Back to Vehicles</span>
                        </button>
                      </div>
                      
                      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light uppercase tracking-wide text-white mb-4 sm:mb-6">
                        {car.name} <span className="text-white/90">{car.model}</span>
                      </h1>
                      <div className="w-16 sm:w-24 h-[2px] bg-white mb-4 sm:mb-8"></div>
                      <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed mb-6 sm:mb-8">
                        {car.description}
                      </p>
                      
                      <div className="flex items-center mb-6 text-gray-400">
                        <span className="mr-4">{car.year}</span>
                        <span className="border border-white/20 px-3 py-1 text-sm uppercase tracking-wider">
                          {formatCategoryName(car.category)}
                        </span>
                        {car.price > 150000 && (
                          <span className="ml-4 bg-white text-black px-3 py-1 text-xs uppercase tracking-wider">
                            Premium
                          </span>
                        )}
                      </div>
                      
                      <div className="text-3xl sm:text-4xl font-light mb-8">
                        ${car.price.toLocaleString()}
                      </div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex gap-3 sm:gap-4 flex-wrap"
                      >
                        <button className="px-4 sm:px-8 py-2 sm:py-3 border border-white text-white uppercase tracking-wider text-xs sm:text-sm transition-all hover:bg-white hover:text-black font-light">
                          Schedule Test Drive
                        </button>
                        <button className="px-4 sm:px-8 py-2 sm:py-3 bg-white text-black uppercase tracking-wider text-xs sm:text-sm transition-all hover:bg-white/90 font-light">
                          Configure Vehicle
                        </button>
                      </motion.div>
                    </motion.div>
                  </Parallax>
                </div>
              </div>
            </div>
            
            {/* Right side - Only showing background */}
            <div className="hidden md:block w-1/2 h-full relative">
              {/* Left edge shadow */}
              <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-black/40 to-transparent z-10"></div>
              
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
        <div className="w-full h-px bg-gray-800"></div>
      </div>

      {/* Main content */}
      <div className="bg-black pb-20 relative">
        {/* Subtle overlays */}
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="absolute top-0 right-[10%] w-[1px] h-[70%] bg-white"></div>
          <div className="absolute bottom-0 left-[10%] w-[1px] h-[40%] bg-white"></div>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Tab navigation */}
          <div className="mb-12 border-b border-gray-800">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 text-sm uppercase tracking-wider whitespace-nowrap ${
                  activeTab === 'overview' 
                    ? 'text-white border-b-2 border-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('specifications')}
                className={`px-6 py-4 text-sm uppercase tracking-wider whitespace-nowrap ${
                  activeTab === 'specifications' 
                    ? 'text-white border-b-2 border-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Specifications
              </button>
              <button 
                onClick={() => setActiveTab('features')}
                className={`px-6 py-4 text-sm uppercase tracking-wider whitespace-nowrap ${
                  activeTab === 'features' 
                    ? 'text-white border-b-2 border-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Features
              </button>
            </div>
          </div>
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Key highlights */}
              <div className="mb-20">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block w-1 h-6 sm:h-8 bg-white"></span>
                      <h2 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-wider">
                        Key Highlights
                      </h2>
                    </div>
                    <p className="text-gray-400 uppercase tracking-wider text-xs sm:text-sm ml-9">
                      Experience premium performance
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  <div className="bg-black border border-gray-800 p-6 hover:border-white/50 transition-colors group">
                    <div className="w-12 h-12 border border-white/30 flex items-center justify-center mb-4 group-hover:border-white/50 transition-colors">
                      <Zap className="text-white" size={20} />
                    </div>
                    <h3 className="text-xl font-light mb-2 uppercase tracking-wider">Performance</h3>
                    <p className="text-gray-400">{car.specifications.power} with {car.specifications.acceleration}</p>
                  </div>
                  <div className="bg-black border border-gray-800 p-6 hover:border-white/50 transition-colors group">
                    <div className="w-12 h-12 border border-white/30 flex items-center justify-center mb-4 group-hover:border-white/50 transition-colors">
                      <Gauge className="text-white" size={20} />
                    </div>
                    <h3 className="text-xl font-light mb-2 uppercase tracking-wider">Speed</h3>
                    <p className="text-gray-400">Top speed of {car.specifications.topSpeed}</p>
                  </div>
                  <div className="bg-black border border-gray-800 p-6 hover:border-white/50 transition-colors group">
                    <div className="w-12 h-12 border border-white/30 flex items-center justify-center mb-4 group-hover:border-white/50 transition-colors">
                      <Star className="text-white" size={20} />
                    </div>
                    <h3 className="text-xl font-light mb-2 uppercase tracking-wider">Luxury</h3>
                    <p className="text-gray-400">Premium {car.category} with exclusive features</p>
                  </div>
                </div>
              </div>
            
              {/* Image Gallery */}
              <div className="mb-20">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block w-1 h-6 sm:h-8 bg-white"></span>
                      <h2 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-wider">
                        Gallery
                      </h2>
                    </div>
                    <p className="text-gray-400 uppercase tracking-wider text-xs sm:text-sm ml-9">
                      {allImages.length} images
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="relative bg-black rounded-none overflow-hidden h-[500px] border border-gray-800">
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
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 rounded-full p-2 text-white transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 rounded-full p-2 text-white transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                    
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-[10%] h-[1px] bg-white/50"></div>
                    <div className="absolute top-0 left-0 w-[1px] h-[10%] bg-white/50"></div>
                    <div className="absolute bottom-0 right-0 w-[10%] h-[1px] bg-white/50"></div>
                    <div className="absolute bottom-0 right-0 w-[1px] h-[10%] bg-white/50"></div>
                  </div>
                  
                  <div>
                    <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
                      {allImages.slice(0, 4).map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImage(image)}
                          className={`relative overflow-hidden h-[200px] border ${
                            activeImage === image 
                              ? 'border-white' 
                              : 'border-gray-800 hover:border-white/50'
                          } transition-all`}
                        >
                          <img 
                            src={image} 
                            alt={`${car.name} view ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                    
                    <div className="bg-black p-6 border border-gray-800">
                      <h3 className="text-xl font-light mb-4 uppercase tracking-wider">Available Colors</h3>
                      <div className="flex flex-wrap gap-4 mb-6">
                        {car.colors.map((color: Color) => (
                          <button
                            key={color.code}
                            onClick={() => setSelectedColor(color.code)}
                            className={`w-12 h-12 rounded-full border-2 transition-all ${
                              selectedColor === color.code 
                                ? 'border-white scale-110' 
                                : 'border-transparent hover:border-white/50'
                            }`}
                            style={{ backgroundColor: color.code }}
                            title={color.name}
                            aria-label={`Select ${color.name} color`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-400 uppercase tracking-wider text-sm">
                        Selected: {car.colors.find((color: Color) => color.code === selectedColor)?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Specifications Tab */}
          {activeTab === 'specifications' && (
            <div className="mb-20">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block w-1 h-6 sm:h-8 bg-white"></span>
                    <h2 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-wider">
                      Technical Specifications
                    </h2>
                  </div>
                  <p className="text-gray-400 uppercase tracking-wider text-xs sm:text-sm ml-9">
                    Performance details
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-black border border-gray-800 p-6 hover:border-white/50 transition-colors">
                  <h3 className="text-gray-400 uppercase text-sm mb-2">Engine</h3>
                  <p className="text-xl font-light">{car.specifications.engine}</p>
                </div>
                <div className="bg-black border border-gray-800 p-6 hover:border-white/50 transition-colors">
                  <h3 className="text-gray-400 uppercase text-sm mb-2">Power</h3>
                  <p className="text-xl font-light">{car.specifications.power}</p>
                </div>
                <div className="bg-black border border-gray-800 p-6 hover:border-white/50 transition-colors">
                  <h3 className="text-gray-400 uppercase text-sm mb-2">Acceleration</h3>
                  <p className="text-xl font-light">{car.specifications.acceleration}</p>
                </div>
                <div className="bg-black border border-gray-800 p-6 hover:border-white/50 transition-colors">
                  <h3 className="text-gray-400 uppercase text-sm mb-2">Top Speed</h3>
                  <p className="text-xl font-light">{car.specifications.topSpeed}</p>
                </div>
                <div className="bg-black border border-gray-800 p-6 hover:border-white/50 transition-colors">
                  <h3 className="text-gray-400 uppercase text-sm mb-2">Transmission</h3>
                  <p className="text-xl font-light">{car.specifications.transmission}</p>
                </div>
                <div className="bg-black border border-gray-800 p-6 hover:border-white/50 transition-colors">
                  <h3 className="text-gray-400 uppercase text-sm mb-2">Fuel Type</h3>
                  <p className="text-xl font-light">{car.specifications.fuelType}</p>
                </div>
                <div className="bg-black border border-gray-800 p-6 hover:border-white/50 transition-colors">
                  <h3 className="text-gray-400 uppercase text-sm mb-2">Fuel Consumption</h3>
                  <p className="text-xl font-light">{car.specifications.fuelConsumption}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="mb-20">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block w-1 h-6 sm:h-8 bg-white"></span>
                    <h2 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-wider">
                      Features & Amenities
                    </h2>
                  </div>
                  <p className="text-gray-400 uppercase tracking-wider text-xs sm:text-sm ml-9">
                    {car.features.length} features included
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {car.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start bg-black border border-gray-800 p-6 hover:border-white/50 transition-colors">
                    <Check className="text-white h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Similar models - only show for non-simple vehicles */}
          {!isSimpleVehicle && (
            <div className="mb-20">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block w-1 h-6 sm:h-8 bg-white"></span>
                    <h2 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-wider">
                      Similar Models
                    </h2>
                  </div>
                  <p className="text-gray-400 uppercase tracking-wider text-xs sm:text-sm ml-9">
                    Explore related vehicles
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {carsData
                  .filter(c => c.id !== car.id && c.category === car.category)
                  .slice(0, 3)
                  .map((similarCar) => (
                    <div 
                      key={similarCar.id}
                      onClick={() => navigate(`/cars/${similarCar.id}`)}
                      className="bg-black overflow-hidden border border-gray-800 hover:border-white/50 hover:translate-y-[-8px] cursor-pointer transition-all duration-500"
                    >
                      <div className="h-48 overflow-hidden relative">
                        <img 
                          src={similarCar.images.main} 
                          alt={similarCar.name} 
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                          <span className="inline-block px-3 py-1 text-xs font-light bg-white text-black uppercase tracking-wider">
                            {similarCar.year}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-light uppercase tracking-wider mb-2">
                          {similarCar.name} <span className="text-gray-400">{similarCar.model}</span>
                        </h3>
                        <div className="text-lg font-light mb-4">${similarCar.price.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          
          {/* Call to action */}
          <div className="bg-black border border-gray-800 p-8 md:p-12 hover:border-white/50 transition-colors">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-light uppercase tracking-wider mb-4">
                  Experience the {car.name} {car.model}
                </h2>
                <p className="text-gray-400 mb-6 md:mb-0">
                  Schedule a test drive today and discover the perfect blend of luxury and performance.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 border border-white text-white uppercase tracking-wider text-sm transition-all hover:bg-white hover:text-black font-light">
                  Schedule Test Drive
                </button>
                <button className="px-6 py-3 bg-white text-black uppercase tracking-wider text-sm transition-all hover:bg-white/90 font-light">
                  Configure Vehicle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;