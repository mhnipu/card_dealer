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
    power: vehicle.features[0],
    acceleration: vehicle.features[1],
    topSpeed: vehicle.features[2]
  },
  logo: vehicle.logo
}));

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
    <section ref={heroRef} className="relative h-screen bg-black overflow-hidden">
      {/* Interactive Canvas Background */}
      <HeroCanvasBackground />
      
      {/* Dynamic Car Image Background */}
      <div ref={imageRef} className="absolute inset-0 z-10 overflow-hidden">
        {carImages.map((img, idx) => (
          <motion.div
            key={img.url}
            className="hero-image hero-layer-1 absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: idx === currentImageIndex ? 1 : 0,
              scale: idx === currentImageIndex ? 1 : 1.05
            }}
            transition={{ 
              opacity: { duration: 0.8, ease: "easeInOut" },
              scale: { duration: 1, ease: "easeOut" }
            }}
          >
            <img
              src={img.url}
              alt={img.alt}
              className="absolute inset-0 w-full h-full object-cover"
              loading={idx === 0 ? "eager" : "lazy"}
              width="1920"
              height="1080"
            />
          </motion.div>
        ))}
        {/* Enhanced gradient overlay for better text readability with split design */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 z-10 hero-layer-2"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10 hero-layer-2"></div>
        
        {/* Decorative elements like in Vehicles page */}
        <div className="absolute top-1/4 right-16 w-[15%] h-[1px] bg-white/40 z-10 hidden md:block"></div>
        <div className="absolute bottom-1/4 left-12 w-[1px] h-[15%] bg-white/40 z-10 hidden md:block"></div>
        
        {/* Corner accents */}
        <div className="absolute top-12 left-12 w-[8%] h-[1px] bg-white/30 z-10 hidden md:block"></div>
        <div className="absolute top-12 left-12 w-[1px] h-[8%] bg-white/30 z-10 hidden md:block"></div>
        <div className="absolute bottom-12 right-16 w-[8%] h-[1px] bg-white/30 z-10 hidden md:block"></div>
        <div className="absolute bottom-12 right-16 w-[1px] h-[8%] bg-white/30 z-10 hidden md:block"></div>
      </div>
      
      {/* Car Model Number Indicator - now matches vehicles page style */}
      <div ref={indicatorRef} className="absolute top-1/4 right-8 z-30 hidden md:block hero-layer-3">
        <div className="text-white text-opacity-20 text-[140px] md:text-[240px] font-light leading-none">
          {(currentImageIndex + 1).toString().padStart(2, '0')}
        </div>
      </div>
      
      {/* Foreground Content - Z-index 30 - Matches vehicles page style */}
      <div ref={contentRef} className="relative z-30 max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 h-full flex flex-col justify-end pb-24 md:pb-32">
        <div className="px-6 md:px-10 lg:px-16 max-w-3xl relative z-50">
          {/* Main Title moved to bottom left with enhanced visibility */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative z-10"
            >
              {/* Car Logo */}
              {currentImage.logo && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-2 relative z-10 w-16 sm:w-24 h-16 sm:h-24 flex items-center justify-center"
                >
                  <img 
                    src={currentImage.logo} 
                    alt={`${currentImage.model} logo`}
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                </motion.div>
              )}
              
              {/* Moving title section to the end */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-2 relative z-10"
              >
                <span 
                  className="text-white uppercase text-xs sm:text-sm tracking-widest font-light drop-shadow-xl"
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                >
                  Featured Model
                </span>
              </motion.div>
              <motion.h2
                ref={modelNameRef}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-2 tracking-wide uppercase drop-shadow-xl relative z-10"
                style={{ textShadow: '0 4px 8px rgba(0,0,0,0.5)' }}
              >
                {currentImage.model}
              </motion.h2>
              <div className="w-16 h-[2px] bg-white mb-4 relative z-10"></div>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-sm sm:text-base md:text-lg text-white mb-4 sm:mb-6 font-light leading-relaxed max-w-xl drop-shadow-xl relative z-10"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
              >
                {currentImage.description}
              </motion.p>
              
              {/* Enhanced gradient overlay only behind text */}
              <div className="absolute left-0 bottom-0 w-full h-3/4 bg-gradient-to-t from-black/80 via-black/40 to-transparent -z-10"></div>
              
              {/* Car Specs - Matches vehicles page style */}
              <motion.div
                ref={carSpecsRef}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-8 mb-8 max-w-md border-t border-white/30 pt-6 relative z-10"
              >
                <div className="flex items-center gap-3">
                  <Zap size={18} className="text-white" />
                  <div>
                    <p className="text-white/90 text-xs uppercase tracking-wider">POWER</p>
                    <p className="text-white font-light">{currentImage.specs.power}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-white" />
                  <div>
                    <p className="text-white/90 text-xs uppercase tracking-wider">0-60 MPH</p>
                    <p className="text-white font-light">{currentImage.specs.acceleration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge size={18} className="text-white" />
                  <div>
                    <p className="text-white/90 text-xs uppercase tracking-wider">TOP SPEED</p>
                    <p className="text-white font-light">{currentImage.specs.topSpeed}</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 relative z-10"
              >
                <div ref={exploreButtonRef}>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="px-8 py-3 border border-white text-white uppercase tracking-wider text-sm transition-all hover:bg-white hover:text-black font-light shadow-lg"
                  >
                    <span className="relative z-10">Explore Models</span>
                  </Button>
                </div>
                <div ref={designButtonRef}>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="px-8 py-3 bg-white text-black uppercase tracking-wider text-sm transition-all hover:bg-white/90 font-light shadow-lg"
                  >
                    <span className="relative z-10">Design Yours</span>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Title Section at Bottom */}
      <div className="absolute left-0 right-0 bottom-20 z-40">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="px-6 md:px-10 lg:px-16">
            <div className="flex items-start gap-2 mb-4">
              <span className="inline-block w-1 h-8 bg-white"></span>
              <h1 
                className="text-3xl md:text-5xl font-light uppercase tracking-wide text-white mb-2 drop-shadow-xl"
                style={{ textShadow: '0 4px 8px rgba(0,0,0,0.5)' }}
              >
                {currentImage.model}
              </h1>
            </div>
            <div className="w-24 h-[1px] bg-white/40 mb-4"></div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-sm uppercase tracking-wider">Type:</span>
                <span className="text-white text-sm font-light">{currentImage.alt.split(" ")[1]}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-sm uppercase tracking-wider">Power:</span>
                <span className="text-white text-sm font-light">{currentImage.specs.power}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-sm uppercase tracking-wider">Top Speed:</span>
                <span className="text-white text-sm font-light">{currentImage.specs.topSpeed}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-sm uppercase tracking-wider">0-60 MPH:</span>
                <span className="text-white text-sm font-light">{currentImage.specs.acceleration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image Navigation - Now matches vehicles page style */}
      <div className="absolute left-0 right-0 bottom-0 z-40 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 py-6 flex justify-between items-center">
          <div className="px-6 md:px-10 lg:px-16 flex items-center space-x-4">
            <button 
              onClick={goToPrevImage} 
              className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white border border-white/20 rounded-full hover:bg-white/10 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={goToNextImage} 
              className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white border border-white/20 rounded-full hover:bg-white/10 transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          <div ref={scrollDownRef} className="cursor-pointer text-white/70 hover:text-white" onClick={scrollToContent}>
            <div className="flex flex-col items-center">
              <span className="text-xs uppercase tracking-wider mb-2">Scroll</span>
              <ChevronDown size={18} />
            </div>
          </div>
          
          <div className="hidden md:block text-right pr-6 md:pr-10 lg:pr-16">
            <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Next Model</p>
            <p className="text-white text-sm font-medium">{nextImage.model}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;