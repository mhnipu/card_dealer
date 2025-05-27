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

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

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
    url:'https://images.unsplash.com/photo-1554744512-d6c603f27c54?auto=format&fit=crop&w=1500&q=80',
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
          <div
            key={img.url}
            className={`hero-image hero-layer-1 absolute inset-0 w-full h-full transition-opacity duration-1000 ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={img.url}
              alt={img.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
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
              <h1 
                ref={mainTitleRef}
                className="text-5xl md:text-7xl font-light uppercase tracking-wide text-white mb-6 drop-shadow-xl text-shadow-lg"
                style={{ textShadow: '0 4px 8px rgba(0,0,0,0.5)' }}
              >
                Luxury Vehicles
              </h1>
              <div className="w-24 h-[2px] bg-white mb-8"></div>
              <div 
                ref={taglineRef}
                className="text-lg text-white font-light leading-relaxed mb-8 max-w-xl drop-shadow-xl"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
              >
                Experience the extraordinary in automotive excellence with our premium collection of luxury vehicles.
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-2 mt-12 relative z-10"
            >
              <span 
                className="text-white uppercase text-sm tracking-widest font-light drop-shadow-xl"
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
              className="text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight mb-2 tracking-wide uppercase drop-shadow-xl relative z-10"
              style={{ textShadow: '0 4px 8px rgba(0,0,0,0.5)' }}
            >
              {currentImage.model}
            </motion.h2>
            <div className="w-16 h-[2px] bg-white mb-4 relative z-10"></div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg text-white mb-6 font-light leading-relaxed max-w-xl drop-shadow-xl relative z-10"
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