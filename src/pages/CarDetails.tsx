import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Clock, Shield, Award, ArrowLeft } from 'lucide-react';
import { carsData } from '../utils/data';
import Button from '../components/common/Button';
import { Parallax } from '../context/ScrollAnimationContext';

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState(carsData.find(car => car.id === id));
  const [activeImage, setActiveImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const foundCar = carsData.find(car => car.id === id);
    setCar(foundCar);
    
    if (foundCar) {
      setActiveImage(foundCar.images.main);
      setSelectedColor(foundCar.colors[0].code);
      document.title = `${foundCar.name} ${foundCar.model} | Luxury Motors`;
    }
    
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!car) {
    return (
      <div className="container mx-auto px-4 py-32 text-center bg-black text-white">
        <h2 className="text-2xl font-light mb-4 uppercase tracking-wider">Vehicle not found</h2>
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] pt-32">
        {/* Background image with parallax effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Parallax speed={0.2}>
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={car.images.main} 
                alt={car.name} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
            </div>
          </Parallax>
        </div>
        
        {/* Subtle overlays */}
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent h-40"></div>
          <div className="absolute left-0 bottom-0 w-full h-32 bg-gradient-to-t from-black/90 to-transparent"></div>
        </div>
        
        {/* Hero content */}
        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center mb-4">
              <button 
                onClick={() => navigate('/vehicles')}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                <span className="uppercase text-sm tracking-wider">Back to Vehicles</span>
              </button>
            </div>
            
            <div className="w-12 h-[2px] bg-white mb-6"></div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight mb-2 uppercase tracking-tight">
              {car.name} <span className="text-white">{car.model}</span>
            </h1>
            
            <div className="flex items-center mb-6 text-gray-400">
              <span className="mr-4">{car.year}</span>
              <span className="border border-white/20 px-3 py-1 text-sm uppercase tracking-wider">
                {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
              </span>
            </div>
            
            <p className="text-base sm:text-lg text-gray-400 max-w-xl mb-8 leading-relaxed">
              {car.description}
            </p>
            
            <div className="text-3xl font-light mb-8">
              ${car.price.toLocaleString()}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg">
                Schedule Test Drive
              </Button>
              <Button variant="outline" size="lg">
                Configure Vehicle
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Main content */}
      <div className="bg-black pb-20 relative">
        <div className="container mx-auto px-4 py-16">
          {/* Image Gallery */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl text-white font-light uppercase tracking-wider mb-2">Gallery</h2>
                <div className="w-12 h-[2px] bg-white"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative bg-gray-900 rounded-none overflow-hidden h-[500px]">
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
              </div>
              
              <div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {allImages.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(image)}
                      className={`relative overflow-hidden h-[200px] border-2 ${
                        activeImage === image 
                          ? 'border-white' 
                          : 'border-transparent hover:border-white/50'
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
                
                <div className="bg-gray-900 p-6 border border-gray-800">
                  <h3 className="text-xl font-light mb-4 uppercase tracking-wider">Available Colors</h3>
                  <div className="flex flex-wrap gap-4 mb-6">
                    {car.colors.map(color => (
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
                    Selected: {car.colors.find(color => color.code === selectedColor)?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Specifications */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl text-white font-light uppercase tracking-wider mb-2">Specifications</h2>
                <div className="w-12 h-[2px] bg-white"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-900 border border-gray-800 p-6">
                <h3 className="text-gray-400 uppercase text-sm mb-2">Engine</h3>
                <p className="text-xl font-light">{car.specifications.engine}</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-6">
                <h3 className="text-gray-400 uppercase text-sm mb-2">Power</h3>
                <p className="text-xl font-light">{car.specifications.power}</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-6">
                <h3 className="text-gray-400 uppercase text-sm mb-2">Acceleration</h3>
                <p className="text-xl font-light">{car.specifications.acceleration}</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-6">
                <h3 className="text-gray-400 uppercase text-sm mb-2">Top Speed</h3>
                <p className="text-xl font-light">{car.specifications.topSpeed}</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-6">
                <h3 className="text-gray-400 uppercase text-sm mb-2">Transmission</h3>
                <p className="text-xl font-light">{car.specifications.transmission}</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-6">
                <h3 className="text-gray-400 uppercase text-sm mb-2">Fuel Type</h3>
                <p className="text-xl font-light">{car.specifications.fuelType}</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-6">
                <h3 className="text-gray-400 uppercase text-sm mb-2">Fuel Consumption</h3>
                <p className="text-xl font-light">{car.specifications.fuelConsumption}</p>
              </div>
            </div>
          </div>
          
          {/* Features */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl text-white font-light uppercase tracking-wider mb-2">Features</h2>
                <div className="w-12 h-[2px] bg-white"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {car.features.map((feature, index) => (
                <div key={index} className="flex items-start bg-gray-900 border border-gray-800 p-6">
                  <Check className="text-white h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Call to action */}
          <div className="bg-gray-900 border border-gray-800 p-8 md:p-12">
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
                <Button variant="primary" size="lg">
                  Schedule Test Drive
                </Button>
                <Button variant="outline" size="lg">
                  Inquire About This Vehicle
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;