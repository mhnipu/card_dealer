import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Button from '../common/Button';
import { ChevronDown, Gauge, Zap, Clock, Battery, Wind, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Parallax } from '../../context/ScrollAnimationContext';
import HeroCanvasBackground from './HeroCanvasBackground';
import { use3DTilt, useMagneticEffect, useMouseParallax } from '../../utils/creative-animations';
import { vehiclesData } from '../../utils/data';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Convert vehiclesData to the format needed for the hero section
const carImages = vehiclesData.map(vehicle => ({
  url: vehicle.image,
  alt: `${vehicle.name} ${vehicle.category}`,
  description: vehicle.category === 'electric' 
    ? "Embrace the future of sustainable driving"
    : vehicle.category === 'sports'
    ? "Experience the thrill of precision engineering"
    : vehicle.category === 'suv'
    ? "Conquer every terrain with confidence"
    : vehicle.category === 'sedan'
    ? "Where luxury meets cutting-edge technology"
    : vehicle.category === 'concept'
    ? "A glimpse into the future of automotive design"
    : "Luxury that knows no boundaries",
  model: vehicle.name,
  specs: {
    power: vehicle.features && vehicle.features[0] ? vehicle.features[0] : 'N/A',
    acceleration: vehicle.features && vehicle.features[1] ? vehicle.features[1] : 'N/A',
    topSpeed: vehicle.features && vehicle.features[2] ? vehicle.features[2] : 'N/A'
  },
  logo: vehicle.logo || '',
  category: vehicle.category // Add category to easily identify
}));

// Add a special "All" category entry at the beginning
const allCategoryEntry = {
  url: '',
  alt: 'All vehicle categories',
  description: 'Discover our full range of luxury vehicles. From powerful sports cars to elegant sedans and versatile SUVs, find the perfect match for your driving desires.',
  model: 'All Categories',
  specs: {
    power: 'Various',
    acceleration: 'Various',
    topSpeed: 'Various'
  },
  logo: '',
  category: 'all'
};

// Insert the "All" category at the beginning of carImages array
carImages.unshift(allCategoryEntry);

// Ensure we have at least one car image
const hasValidCarImages = carImages.length > 0;

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [collageImages, setCollageImages] = useState<string[]>([]);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const scrollDownRef = useRef<HTMLDivElement>(null);
  const modelNameRef = useRef<HTMLHeadingElement>(null);
  const exploreButtonRef = useRef<HTMLDivElement>(null);
  const designButtonRef = useRef<HTMLDivElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  // Apply 3D tilt effect to the car spec cards
  const carSpecsRef = useRef<HTMLDivElement>(null);
  use3DTilt(carSpecsRef, 10);
  
  // Apply magnetic effect to buttons
  useMagneticEffect(exploreButtonRef, 1);
  useMagneticEffect(designButtonRef, 1);
  
  // Apply mouse parallax effect to hero section layers
  useMouseParallax(heroRef, ['.hero-layer-1', '.hero-layer-2', '.hero-layer-3']);

  // Apply parallax effects
  useGSAP(() => {
    if (!heroRef.current) return;
    
    // Parallax effect for background images
    gsap.to('.hero-image', {
      y: () => window.innerHeight * 0.2,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
    
    // Parallax effect for content - moves slower than background
    gsap.to(contentRef.current, {
      y: () => window.innerHeight * 0.1,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
    
    // Fade out the model number as you scroll
    gsap.to(indicatorRef.current, {
      opacity: 0,
      y: -50,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: heroRef.current,
        start: '5% top',
        end: '15% top',
        scrub: true
      }
    });
    
    // Animate the scroll down button with bounce effect
    gsap.to(scrollDownRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'power1.inOut'
    });
    
    // Add floating effect to model name
    if (modelNameRef.current) {
      gsap.to(modelNameRef.current, {
        y: -5,
        duration: 2.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
    }
    
    // Add floating effect to main title
    if (mainTitleRef.current) {
      gsap.to(mainTitleRef.current, {
        y: -8,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
    }
    
    // Add shimmer effect to tagline
    if (taglineRef.current) {
      gsap.to(taglineRef.current, {
        backgroundPosition: '200% center',
        duration: 4,
        repeat: -1,
        ease: 'linear'
      });
    }
     
    // Add glow pulse effect to buttons
    const buttons = [exploreButtonRef.current, designButtonRef.current];
    buttons.forEach(button => {
      if (button) {
        gsap.to(button, {
          boxShadow: '0 0 20px rgba(255,255,255,0.4)',
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    });
  }, []);

  // Cycle images every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Get 4 random car images for collage
  useEffect(() => {
    // Only when "All" category is selected (index 0)
    if (currentImageIndex === 0) {
      const shuffled = [...vehiclesData]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
        .map(vehicle => vehicle.image);
      
      setCollageImages(shuffled);
    }
  }, [currentImageIndex]);

  const scrollToContent = () => {
    const featuredSection = document.getElementById('featured-section');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Ensure we have valid data to display
  if (!hasValidCarImages) {
    console.warn("No valid car images available for Hero section");
  }

  const currentImage = carImages[currentImageIndex] || {
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    alt: 'Default luxury car',
    description: 'Discover our premium collection of luxury vehicles',
    model: 'Premium Vehicle',
    specs: {
      power: 'N/A',
      acceleration: 'N/A',
      topSpeed: 'N/A'
    },
    logo: '',
    category: ''
  };
  
  const isAllCategory = currentImageIndex === 0;
  
  const nextImageIndex = (currentImageIndex + 1) % carImages.length;
  const nextImage = carImages[nextImageIndex] || currentImage;
  
  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carImages.length) % carImages.length);
  };
  
  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carImages.length);
  };

  return (
    <section ref={heroRef} className="relative h-screen bg-black overflow-hidden w-full max-w-[100vw]">
      {/* Interactive Canvas Background */}
      <HeroCanvasBackground />

      {/* Diagonal guide lines for luxury aesthetic */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/5 transform -rotate-45"></div>
          <div className="absolute top-0 left-2/4 w-[1px] h-full bg-white/5 transform -rotate-45"></div>
          <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white/5 transform -rotate-45"></div>
        </div>
      </div>
      
      {/* Dynamic Car Image Background */}
      <div ref={imageRef} className="absolute inset-0 z-10 overflow-hidden">
        {carImages.map((img, idx) => (
          <motion.div
            key={img.url || `all-category-${idx}`}
            className="hero-image hero-layer-1 absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: idx === currentImageIndex ? 1 : 0,
              scale: idx === currentImageIndex ? 1 : 1.05
            }}
            transition={{ 
              opacity: { duration: 1.2, ease: "easeInOut" },
              scale: { duration: 1.4, ease: "easeOut" }
            }}
          >
            {idx === 0 && isAllCategory ? (
              // 2x2 collage for "All Categories"
              <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
                {collageImages.map((imgSrc, colIdx) => (
                  <div key={`collage-${colIdx}`} className="relative overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={`Featured car ${colIdx + 1}`}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000"
                      loading={colIdx === 0 ? "eager" : "lazy"}
                      width="960"
                      height="540"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent"></div>
                  </div>
                ))}
              </div>
            ) : (
              // Single image for specific categories
              <img
                src={img.url}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover"
                loading={idx === 0 ? "eager" : "lazy"}
                width="1920"
                height="1080"
              />
            )}
            
            {/* Individual image overlay for depth - stronger left-to-right gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent"></div>
          </motion.div>
        ))}
        
        {/* Enhanced uniform gradient overlay - with stronger left-to-right visibility gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 hero-layer-2"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10 hero-layer-2"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-transparent to-transparent z-10 hero-layer-2"></div>

        {/* Premium grid overlay pattern */}
        <div className="absolute inset-0 grid grid-cols-12 z-10 opacity-10">
          {Array(12).fill(0).map((_, index) => (
            <div key={index} className="border-l border-white/10 h-full"></div>
          ))}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-[15%] right-16 w-[25%] h-[1px] bg-gradient-to-r from-white/50 to-transparent z-10 hidden md:block"></div>
        <div className="absolute bottom-[15%] left-12 w-[1px] h-[25%] bg-gradient-to-b from-white/50 to-transparent z-10 hidden md:block"></div>
        
        {/* Asymmetric corner accents */}
        <div className="absolute top-20 left-24 w-[15%] h-[2px] bg-gradient-to-r from-white/40 to-transparent z-10 hidden md:block"></div>
        <div className="absolute top-20 left-24 w-[2px] h-[15%] bg-gradient-to-b from-white/40 to-transparent z-10 hidden md:block"></div>
        <div className="absolute bottom-20 right-24 w-[15%] h-[2px] bg-gradient-to-l from-white/40 to-transparent z-10 hidden md:block"></div>
        <div className="absolute bottom-20 right-24 w-[2px] h-[15%] bg-gradient-to-t from-white/40 to-transparent z-10 hidden md:block"></div>
        
        {/* Additional creative design elements */}
        <div className="absolute top-40 right-[30%] w-[100px] h-[100px] border border-white/10 rounded-full z-10 hidden lg:block"></div>
        <div className="absolute bottom-60 left-[20%] w-[70px] h-[70px] border border-white/5 rounded-full z-10 hidden lg:block"></div>
        <div className="absolute bottom-[40%] right-[15%] w-[150px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 hidden lg:block"></div>
        <div className="absolute top-[35%] left-[10%] flex flex-col gap-1 z-10 hidden lg:block">
          <div className="w-[40px] h-[1px] bg-white/30"></div>
          <div className="w-[20px] h-[1px] bg-white/20"></div>
          <div className="w-[60px] h-[1px] bg-white/10"></div>
        </div>
      </div>
      
      {/* Dynamic semi-transparent vertical bar */}
      <div className="absolute left-0 top-0 h-full w-[5px] bg-gradient-to-b from-white/0 via-white/10 to-white/0 z-20 hidden md:block"></div>
      
      {/* Car Model Number Indicator - now with parallax effect */}
      <motion.div 
        ref={indicatorRef} 
        className="absolute top-[15%] right-8 z-30 hidden md:block hero-layer-3"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="text-white text-opacity-5 text-[180px] md:text-[320px] font-extralight leading-none tracking-tighter">
          {(currentImageIndex + 1).toString().padStart(2, '0')}
        </div>
      </motion.div>
      
      
      
      {/* Foreground Content - Z-index 30 */}
      <div ref={contentRef} className="relative z-30 max-w-[1400px] mx-auto px-4 md:px-6 lg:px-0 h-full flex flex-col justify-end pb-28 md:pb-36">
        {/* Main content with asymmetric layout */}
        <div className="grid grid-cols-12 relative z-50">
          {/* Left empty space for asymmetric design */}
          <div className="hidden lg:block lg:col-span-1"></div>
          
          {/* Main content area */}
          <div className="col-span-12 lg:col-span-8 px-6 md:px-10 lg:px-0">
            <div className="relative">
              {/* Vertical accent line */}
              <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/30 to-transparent translate-x-[-20px] hidden lg:block"></div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="relative z-10"
              >
                {/* Car Logo with enhanced presentation - moved above car name */}
                {currentImage.logo && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-8 relative z-10 flex flex-col items-start"
                  >
                    <div className="w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 flex items-center justify-center backdrop-blur-sm bg-gradient-to-r from-black/70 to-transparent p-4 relative">
                      <img 
                        src={currentImage.logo} 
                        alt={`${currentImage.model} logo`}
                        className="w-full h-full object-contain"
                        loading="eager"
                      />
                      <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(255,255,255,0.1)]"></div>
                    </div>
                    
                    {/* Car name directly with logo */}
                    <motion.h2
                      className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-white mt-4 tracking-wide uppercase relative z-10"
                      style={{ textShadow: '0 4px 8px rgba(0,0,0,0.5)' }}
                    >
                      {currentImage.model}
                    </motion.h2>
                    <div className="w-16 md:w-24 h-[2px] bg-gradient-to-r from-white to-white/0 mt-2"></div>
                  </motion.div>
                )}
                
                {/* Featured model indicator */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mb-4 relative z-10"
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-block w-8 h-[1px] bg-white/70"></span>
                    <span 
                      className="text-white uppercase text-xs sm:text-sm tracking-[0.3em] font-light drop-shadow-xl"
                      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                    >
                      Featured Model
                    </span>
                  </div>
                </motion.div>
                
                {/* Description with enhanced styling */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-base sm:text-lg md:text-xl text-white mb-8 sm:mb-10 font-light leading-relaxed max-w-2xl drop-shadow-xl relative z-10 pl-0 md:pl-12 border-l-0 md:border-l md:border-white/20"
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                >
                  {currentImage.description}
                </motion.p>
                
                {/* Car Specs with modern design */}
                <motion.div
                  ref={carSpecsRef}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className={`grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 relative z-10 ${isAllCategory ? 'opacity-80' : ''}`}
                >
                  <div className="flex flex-col backdrop-blur-sm bg-white/5 p-5 border-b-2 border-white/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Zap size={18} className="text-white/90" strokeWidth={1.5} />
                      <p className="text-white/80 text-xs uppercase tracking-widest">{isAllCategory ? 'RANGE' : 'POWER'}</p>
                    </div>
                    <p className="text-white font-light text-2xl">{currentImage.specs.power}</p>
                  </div>
                  
                  <div className="flex flex-col backdrop-blur-sm bg-white/5 p-5 border-b-2 border-white/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Clock size={18} className="text-white/90" strokeWidth={1.5} />
                      <p className="text-white/80 text-xs uppercase tracking-widest">{isAllCategory ? 'PERFORMANCE' : '0-60 MPH'}</p>
                    </div>
                    <p className="text-white font-light text-2xl">{currentImage.specs.acceleration}</p>
                  </div>
                  
                  <div className="flex flex-col backdrop-blur-sm bg-white/5 p-5 border-b-2 border-white/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Gauge size={18} className="text-white/90" strokeWidth={1.5} />
                      <p className="text-white/80 text-xs uppercase tracking-widest">{isAllCategory ? 'MODELS' : 'TOP SPEED'}</p>
                    </div>
                    <p className="text-white font-light text-2xl">{isAllCategory ? vehiclesData.length.toString() : currentImage.specs.topSpeed}</p>
                  </div>
                </motion.div>
                
                {/* Call to action buttons with modern design */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-6 relative z-10"
                >
                  <div ref={exploreButtonRef} className="relative overflow-hidden group">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="px-12 py-4 border border-white text-white uppercase tracking-[0.2em] text-sm transition-all hover:bg-white hover:text-black font-light shadow-lg"
                    >
                      <span className="relative z-10">Explore Models</span>
                    </Button>
                    <div className="absolute inset-0 bg-white/10 transform translate-x-[-100%] skew-x-12 transition-transform duration-700 group-hover:translate-x-0"></div>
                  </div>
                  
                  <div ref={designButtonRef} className="relative overflow-hidden group">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="px-12 py-4 bg-white text-black uppercase tracking-[0.2em] text-sm transition-all hover:bg-white/90 font-light shadow-lg"
                    >
                      <span className="relative z-10">Design Yours</span>
                    </Button>
                    <div className="absolute inset-0 bg-black/10 transform translate-x-[-100%] skew-x-12 transition-transform duration-700 group-hover:translate-x-0"></div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* Right decorative elements for asymmetric design */}
          <div className="hidden lg:flex lg:col-span-3 flex-col items-end justify-center gap-4">
            <div className="h-[200px] w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
            <div className="w-[30px] h-[30px] border border-white/30 flex items-center justify-center">
              <div className="w-[15px] h-[15px] bg-white/30"></div>
            </div>
            <div className="h-[100px] w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>
      </div>
      
      {/* Horizontal bar design element */}
      <div className="absolute left-0 right-0 bottom-[120px] z-30 hidden lg:flex px-24">
        <div className="w-full h-[1px] bg-gradient-to-r from-white/0 via-white/20 to-white/0"></div>
      </div>
      
      {/* Image Navigation with refined design */}
      <div className="absolute left-0 right-0 bottom-0 z-40">
        <div className="max-w-[1400px] mx-auto py-8 grid grid-cols-12 backdrop-blur-sm bg-black/20">
          {/* Left navigation buttons */}
          <div className="col-span-4 px-6 md:px-10 lg:px-16 flex items-center gap-6">
            <button 
              onClick={goToPrevImage} 
              className="w-12 h-12 flex items-center justify-center text-white/70 hover:text-white border border-white/20 rounded-full hover:bg-white/10 transition-all group"
            >
              <ChevronLeft size={24} strokeWidth={1.5} className="transition-transform duration-300 transform group-hover:translate-x-[-3px]" />
            </button>
            <button 
              onClick={goToNextImage} 
              className="w-12 h-12 flex items-center justify-center text-white/70 hover:text-white border border-white/20 rounded-full hover:bg-white/10 transition-all group"
            >
              <ChevronRight size={24} strokeWidth={1.5} className="transition-transform duration-300 transform group-hover:translate-x-[3px]" />
            </button>
            <div className="hidden md:flex items-center gap-3">
              <span className="w-6 h-[1px] bg-white/40"></span>
              <div className="uppercase text-xs text-white/70 tracking-wider">
                {isAllCategory ? "ALL" : `${currentImageIndex}/${carImages.length - 1}`}
              </div>
            </div>
          </div>
          
          {/* Center scroll indicator */}
          <div className="col-span-4 flex justify-center">
            <div ref={scrollDownRef} className="cursor-pointer text-white/70 hover:text-white group" onClick={scrollToContent}>
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-[0.2em] mb-2">Discover</span>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-all">
                  <ChevronDown size={16} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-y-[2px]" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Right next model preview */}
          <div className="col-span-4 hidden md:flex justify-end items-center pr-6 md:pr-10 lg:pr-16">
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white/70 text-xs uppercase tracking-[0.15em] mb-1">Next Model</p>
                <p className="text-white text-sm font-medium tracking-wider">{nextImage.model}</p>
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden border border-white/30">
                {nextImage.logo ? (
                  <img 
                    src={nextImage.logo}
                    alt={nextImage.model}
                    className="w-full h-full object-contain p-2"
                  />
                ) : nextImageIndex === 0 ? (
                  <div className="w-full h-full bg-white/10 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">ALL</span>
                  </div>
                ) : (
                  <div className="w-full h-full bg-white/10"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;