import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Button from '../common/Button';
import { ChevronDown, Gauge, Zap, Clock, Battery, Wind, ChevronLeft, ChevronRight } from 'lucide-react';

// Array of high-quality car images with descriptions (at least 10)
const carImages = [
  {
    url: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1500&q=80",
    alt: "Luxury sports car on mountain road",
    description: "Experience the thrill of precision engineering",
    model: "GT Turismo",
    specs: {
      power: "580 HP",
      acceleration: "0-60 in 3.2s",
      topSpeed: "205 mph"
    }
  },
  {
    url: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=1500&q=80",
    alt: "Modern electric car in urban setting",
    description: "Embrace the future of sustainable driving",
    model: "E-Motion",
    specs: {
      power: "450 HP",
      acceleration: "0-60 in 3.8s",
      topSpeed: "175 mph"
    }
  },
  {
    url: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1500&q=80",
    alt: "Classic vintage car with timeless design",
    description: "Timeless elegance meets modern performance",
    model: "Classica 65",
    specs: {
      power: "410 HP",
      acceleration: "0-60 in 4.5s",
      topSpeed: "160 mph"
    }
  },
  {
    url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1500&q=80",
    alt: "Premium SUV on off-road adventure",
    description: "Conquer every terrain with confidence",
    model: "Terrain X9",
    specs: {
      power: "520 HP",
      acceleration: "0-60 in 4.0s",
      topSpeed: "155 mph"
    }
  },
  {
    url: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1500&q=80",
    alt: "Sleek convertible sports car",
    description: "Feel the freedom of open-air luxury",
    model: "Spyder RS",
    specs: {
      power: "610 HP",
      acceleration: "0-60 in 2.9s",
      topSpeed: "210 mph"
    }
  },
  {
    url: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1500&q=80",
    alt: "High-performance track car",
    description: "Engineered for the track, designed for the soul",
    model: "Track Demon",
    specs: {
      power: "720 HP",
      acceleration: "0-60 in 2.7s",
      topSpeed: "215 mph"
    }
  },
  {
    url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1500&q=80",
    alt: "Luxury sedan with elegant design",
    description: "Where luxury meets cutting-edge technology",
    model: "S-Class Elite",
    specs: {
      power: "490 HP",
      acceleration: "0-60 in 4.1s",
      topSpeed: "180 mph"
    }
  },
  {
    url: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1500&q=80",
    alt: "Futuristic concept car",
    description: "A glimpse into the future of automotive design",
    model: "Vision Concept",
    specs: {
      power: "800 HP",
      acceleration: "0-60 in 2.4s",
      topSpeed: "220 mph"
    }
  },
  {
    url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1500&q=80",
    alt: "Compact electric city car",
    description: "Smart, sustainable urban mobility",
    model: "Urban EV",
    specs: {
      power: "250 HP",
      acceleration: "0-60 in 5.8s",
      topSpeed: "130 mph"
    }
  },
  {
    url: "https://images.unsplash.com/photo-1605515298946-d0573f9fb7ca?auto=format&fit=crop&w=1500&q=80",
    alt: "Luxury off-road SUV",
    description: "Luxury that knows no boundaries",
    model: "G-Force Pro",
    specs: {
      power: "550 HP",
      acceleration: "0-60 in 4.3s",
      topSpeed: "150 mph"
    }
  }
];

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Cycle images every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const scrollToContent = () => {
    const featuredSection = document.getElementById('featured-section');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentImage = carImages[currentImageIndex];
  const nextImageIndex = (currentImageIndex + 1) % carImages.length;
  const nextImage = carImages[nextImageIndex];
  
  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carImages.length) % carImages.length);
  };
  
  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carImages.length);
  };

  return (
    <section ref={ref} className="relative h-screen bg-black">
      {/* Dynamic Car Image Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {carImages.map((img, idx) => (
          <img
            key={img.url}
            src={img.url}
            alt={img.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{ zIndex: 0 }}
          />
        ))}
        {/* Strong dark gradient for text/navbar contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
      </div>
      
      {/* Car Model Number Indicator */}
      <div className="absolute top-1/4 right-8 z-30 hidden md:block">
        <div className="text-white text-opacity-20 text-[120px] md:text-[180px] font-bold leading-none">
          {(currentImageIndex + 1).toString().padStart(2, '0')}
        </div>
      </div>
      
      {/* Foreground Content - Z-index 30 */}
      <div className="relative z-30 container mx-auto px-4 h-full flex flex-col justify-end pb-24 md:pb-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-2"
          >
            <span className="text-white/70 uppercase text-sm tracking-widest font-light">Premium Model</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-2 drop-shadow-xl"
          >
            {currentImage.model}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 font-light drop-shadow-md max-w-xl"
          >
            {currentImage.description}
          </motion.p>
          
          {/* Car Specs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 gap-4 mb-8 max-w-md"
          >
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-white/70" />
              <div>
                <p className="text-white/70 text-xs">POWER</p>
                <p className="text-white font-medium">{currentImage.specs.power}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-white/70" />
              <div>
                <p className="text-white/70 text-xs">0-60 MPH</p>
                <p className="text-white font-medium">{currentImage.specs.acceleration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Gauge size={18} className="text-white/70" />
              <div>
                <p className="text-white/70 text-xs">TOP SPEED</p>
                <p className="text-white font-medium">{currentImage.specs.topSpeed}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="primary" size="lg" className="bg-white text-black hover:bg-gray-200 border-0 shadow-lg">
              Explore Models
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white border-2 hover:bg-white/10 active:bg-white/20 shadow-lg">
              Design Yours
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Next Car Preview */}
      <div className="absolute bottom-24 right-8 z-30 hidden lg:flex items-center space-x-6">
        <div className="flex flex-col items-end">
          <p className="text-white/50 text-xs mb-1">NEXT MODEL</p>
          <p className="text-white text-lg font-medium">{nextImage.model}</p>
        </div>
        <div className="relative w-24 h-16 overflow-hidden rounded-md border border-white/20">
          <img 
            src={nextImage.url} 
            alt={nextImage.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      </div>
      
      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-6">
        <button 
          onClick={goToPrevImage}
          className="p-2 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors"
          aria-label="Previous car"
        >
          <ChevronLeft size={20} />
        </button>
        
        {/* Image Counter */}
        <div className="flex items-center space-x-2">
          {carImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
              }`}
              aria-label={`View image ${idx + 1}`}
            />
          ))}
        </div>
        
        <button 
          onClick={goToNextImage}
          className="p-2 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors"
          aria-label="Next car"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      {/* Scroll Down Indicator - Z-index 30 */}
      <motion.div 
        className="absolute bottom-24 left-8 flex justify-center z-30 hidden md:flex"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <motion.button
          onClick={scrollToContent}
          className="text-white flex flex-col items-center group"
          aria-label="Scroll to next section"
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        >
          <span className="mb-1 text-xs font-light tracking-wider group-hover:opacity-80 transition-opacity">EXPLORE</span>
          <ChevronDown size={20} className="group-hover:opacity-80 transition-opacity" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;