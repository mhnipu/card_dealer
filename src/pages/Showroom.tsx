import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Filter, ChevronDown, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Parallax } from '../context/ScrollAnimationContext';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Types for products
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  featured?: boolean;
  isNew?: boolean;
}

// Categories
type Category = 'all' | 'accessories' | 'apparel' | 'models' | 'merchandise';

const ShowroomPage: React.FC = () => {
  // Page refs for animations
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Luxury Showroom | Prestige Auto';
  }, []);
  
  // Products state
  const [products] = useState<Product[]>([
    {
      id: 'model-01',
      name: 'GT Coupe Scale Model 1:18',
      category: 'models',
      price: 350,
      image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
      description: 'Hand-crafted 1:18 scale model of our flagship GT Coupe, with incredible attention to detail.',
      featured: true
    },
    {
      id: 'apparel-01',
      name: 'Premium Racing Jacket',
      category: 'apparel',
      price: 450,
      image: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg',
      description: 'Water-resistant premium racing jacket with embroidered logos and reflective details.',
      featured: true,
      isNew: true
    },
    {
      id: 'accessory-01',
      name: 'Leather Driving Gloves',
      category: 'accessories',
      price: 180,
      image: 'https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg',
      description: 'Premium leather driving gloves with ventilation and knuckle protection for optimal grip and comfort.',
      isNew: true
    },
    {
      id: 'merchandise-01',
      name: 'Limited Edition Watch',
      category: 'merchandise',
      price: 1200,
      image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
      description: 'Limited edition chronograph watch with carbon fiber dial and premium leather strap.',
      featured: true
    },
    {
      id: 'model-02',
      name: 'SUV Concept Model 1:24',
      category: 'models',
      price: 220,
      image: 'https://images.pexels.com/photos/97353/pexels-photo-97353.jpeg',
      description: 'Highly detailed 1:24 scale model of our concept SUV with opening doors and functional steering.',
      isNew: true
    },
    {
      id: 'apparel-02',
      name: 'Heritage Polo Shirt',
      category: 'apparel',
      price: 120,
      image: 'https://images.pexels.com/photos/3690570/pexels-photo-3690570.jpeg',
      description: 'Premium cotton polo shirt featuring embroidered heritage logo and contrast details.'
    },
    {
      id: 'accessory-02',
      name: 'Carbon Fiber Key Case',
      category: 'accessories',
      price: 90,
      image: 'https://images.pexels.com/photos/260367/pexels-photo-260367.jpeg',
      description: 'Genuine carbon fiber key case with Italian leather interior and magnetic closure.'
    },
    {
      id: 'merchandise-02',
      name: 'Leather Weekend Bag',
      category: 'merchandise',
      price: 680,
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
      description: 'Hand-crafted full grain leather weekend bag with custom hardware and monogram option.'
    }
  ]);
  
  // Filter states
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filtered products
  const filteredProducts = products.filter(product => 
    activeCategory === 'all' || product.category === activeCategory
  );
  
  // Featured products
  const featuredProducts = products.filter(product => product.featured);
  
  // Hero images for slider
  const heroImages = [
    {
      url: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
      title: "Luxury Lifestyle Collection",
      subtitle: "Discover premium products inspired by automotive excellence"
    },
    {
      url: "https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg",
      title: "Heritage Collection",
      subtitle: "Celebrate our racing legacy with exclusive merchandise"
    },
    {
      url: "https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg",
      title: "Premium Scale Models",
      subtitle: "Handcrafted replicas with extraordinary attention to detail"
    }
  ];
  
  // Apply animations
  useGSAP(() => {
    if (!pageRef.current) return;
    
    // Animate sections as they enter viewport
    const sections = pageRef.current.querySelectorAll('section');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
    
    // Hero section parallax effect
    if (heroRef.current) {
      gsap.to('.hero-bg', {
        y: () => window.innerHeight * 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
      
      // Hero content fade effect
      gsap.to(heroContentRef.current, {
        y: () => window.innerHeight * 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }, []);
  
  // Handle hero slider navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };
  
  // Auto advance hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div ref={pageRef} className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] sm:h-[80vh] md:h-[90vh] overflow-hidden mb-16 sm:mb-24">
        {/* Hero Background Slider */}
        <div className="absolute inset-0 w-full h-full">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              className={`absolute inset-0 w-full h-full hero-bg transition-opacity duration-1000 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSlide === index ? 1 : 0 }}
              transition={{ duration: 1 }}
            >
              <img 
                src={image.url}
                alt={image.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
            </motion.div>
          ))}
          
          {/* Decorative Grid */}
          <div className="absolute inset-0 grid grid-cols-4 h-full w-full pointer-events-none z-[1]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-full border-l border-white/10"></div>
            ))}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="absolute w-full border-t border-white/10" style={{ top: `${25 * (i + 1)}%` }}></div>
            ))}
          </div>
          
          {/* Hero Slider Controls */}
          <div className="absolute bottom-12 right-12 flex items-center gap-4 z-20">
            <div className="text-white/60 text-xs tracking-widest uppercase mr-4">
              <span className="text-white font-light">{currentSlide + 1}</span>
              <span className="mx-2">/</span>
              <span>{heroImages.length}</span>
            </div>
            <button 
              onClick={prevSlide}
              className="w-12 h-12 flex items-center justify-center border border-white/50 text-white hover:bg-white/10 transition-colors group"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 flex items-center justify-center border border-white/50 text-white hover:bg-white/10 transition-colors group"
              aria-label="Next slide"
            >
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-12 left-12 flex items-center gap-2 z-20">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-[2px] transition-all ${
                  currentSlide === index 
                    ? 'bg-white w-12' 
                    : 'bg-white/40 w-6 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center z-10">
          <div ref={heroContentRef} className="max-w-[1400px] mx-auto px-12 sm:px-16 lg:px-20 w-full">
            <div className="max-w-3xl relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <span className="inline-block w-12 h-[1px] bg-white"></span>
                  <h2 className="text-sm uppercase tracking-[0.3em] font-light text-white/90">Premium Collection</h2>
                </div>
                
                {heroImages.map((image, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-700 ${
                      currentSlide === index 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8 absolute'
                    }`}
                  >
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight uppercase tracking-wide text-white mb-6 sm:mb-8">
                      {image.title}
                </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/80 font-light leading-relaxed mb-10 sm:mb-12 max-w-2xl">
                      {image.subtitle}
                    </p>
                  </div>
                ))}
                
                <div className="flex flex-wrap gap-5">
                  <button className="group px-8 sm:px-12 py-4 sm:py-5 bg-white text-black uppercase tracking-wider text-xs sm:text-sm font-light hover:bg-white/90 transition-all flex items-center gap-3 relative overflow-hidden">
                    <span className="relative z-10">Shop Collection</span>
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform relative z-10" />
                    <div className="absolute bottom-0 left-0 w-0 h-full bg-black/10 group-hover:w-full transition-all duration-300"></div>
                  </button>
                  <Link 
                    to="/vehicles" 
                    className="group px-8 sm:px-12 py-4 sm:py-5 border border-white text-white uppercase tracking-wider text-xs sm:text-sm font-light hover:bg-white/10 transition-all relative overflow-hidden"
                  >
                    <span className="relative z-10">Explore Vehicles</span>
                    <div className="absolute bottom-0 left-0 w-0 h-full bg-white/10 group-hover:w-full transition-all duration-300"></div>
                  </Link>
                </div>
              </motion.div>
              
              {/* Side decorative element */}
              <div className="absolute -right-20 top-1/2 -translate-y-1/2 hidden xl:block">
                <div className="w-[1px] h-40 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-12 left-12 w-[1px] h-20 bg-white/30 z-10 hidden md:block"></div>
        <div className="absolute top-12 left-12 w-20 h-[1px] bg-white/30 z-10 hidden md:block"></div>
        <div className="absolute bottom-12 right-12 w-[1px] h-20 bg-white/30 z-10 hidden md:block"></div>
        <div className="absolute bottom-12 right-12 w-20 h-[1px] bg-white/30 z-10 hidden md:block"></div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center z-20 animate-bounce-slow">
          <div className="text-white/70 text-xs uppercase tracking-widest mb-2">Scroll</div>
          <ChevronDown size={16} className="text-white/70" />
        </div>
      </section>
      
      {/* About Showroom Section */}
      <section className="py-20 sm:py-28 bg-white dark:bg-black relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")', backgroundSize: '200px' }}></div>
          </div>
          
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 lg:sticky lg:top-8 self-start">
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-block w-10 h-[1px] bg-black dark:bg-white"></span>
                  <h2 className="text-sm uppercase tracking-[0.3em] font-light text-black dark:text-white">Our Showroom</h2>
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-black dark:text-white uppercase tracking-wide mb-8">
                  Experience <br className="hidden md:block" />Luxury
                </h2>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
                  Welcome to our premium automotive lifestyle showroom, where the essence of luxury motoring extends beyond the vehicle itself. Situated in the heart of Beverly Hills, our 15,000 sq. ft. showroom offers a curated collection of exclusive merchandise, accessories, and scale models that embody the craftsmanship and design philosophy of our vehicles.
                </p>
              </div>
              
              <Link 
                to="/contact" 
                className="group inline-flex items-center gap-3 px-8 py-4 bg-black text-white dark:bg-white dark:text-black uppercase tracking-wider text-xs sm:text-sm font-light hover:bg-gray-900 dark:hover:bg-gray-100 transition-all relative overflow-hidden"
              >
                <span className="relative z-10">Schedule a Private Tour</span> 
                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute bottom-0 left-0 w-0 h-full bg-white/10 dark:bg-black/10 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </div>
            
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Feature 1 */}
                <div className="group">
                  <div className="overflow-hidden mb-6">
                    <img 
                      src="https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg" 
                      alt="Exclusive Collections" 
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="border-l-2 border-black dark:border-white pl-6 py-2">
                    <h3 className="text-xl font-light text-black dark:text-white mb-3">Exclusive Collections</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Discover limited-edition merchandise, apparel, and accessories designed in collaboration with world-renowned artists and designers.
                    </p>
                    <div className="flex items-center text-black dark:text-white text-sm uppercase tracking-wider">
                      <span className="mr-2">Explore</span>
                      <div className="w-5 h-[1px] bg-black dark:bg-white transition-all group-hover:w-8"></div>
                    </div>
                  </div>
                      </div>
                
                {/* Feature 2 */}
                <div className="group">
                  <div className="overflow-hidden mb-6">
                    <img 
                      src="https://images.pexels.com/photos/97353/pexels-photo-97353.jpeg" 
                      alt="Handcrafted Models" 
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="border-l-2 border-black dark:border-white pl-6 py-2">
                    <h3 className="text-xl font-light text-black dark:text-white mb-3">Handcrafted Models</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Explore our collection of meticulously crafted scale models, each capturing the essence and detail of our iconic vehicles.
                    </p>
                    <div className="flex items-center text-black dark:text-white text-sm uppercase tracking-wider">
                      <span className="mr-2">Explore</span>
                      <div className="w-5 h-[1px] bg-black dark:bg-white transition-all group-hover:w-8"></div>
                    </div>
                  </div>
          </div>
                
                {/* Feature 3 */}
                <div className="group">
                  <div className="overflow-hidden mb-6">
                    <img 
                      src="https://images.pexels.com/photos/3689532/pexels-photo-3689532.jpeg" 
                      alt="Personalization Studio" 
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
        </div>
                  <div className="border-l-2 border-black dark:border-white pl-6 py-2">
                    <h3 className="text-xl font-light text-black dark:text-white mb-3">Personalization Studio</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Work with our design consultants to customize merchandise with monograms, bespoke colors, and unique materials.
                    </p>
                    <div className="flex items-center text-black dark:text-white text-sm uppercase tracking-wider">
                      <span className="mr-2">Explore</span>
                      <div className="w-5 h-[1px] bg-black dark:bg-white transition-all group-hover:w-8"></div>
              </div>
            </div>
          </div>
          
                {/* Feature 4 */}
                <div className="group">
                  <div className="overflow-hidden mb-6">
                    <img 
                      src="https://images.pexels.com/photos/9607290/pexels-photo-9607290.jpeg" 
                      alt="Heritage Gallery" 
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="border-l-2 border-black dark:border-white pl-6 py-2">
                    <h3 className="text-xl font-light text-black dark:text-white mb-3">Heritage Gallery</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Immerse yourself in our rich motorsport history through rotating exhibits featuring rare photographs and memorabilia.
                    </p>
                    <div className="flex items-center text-black dark:text-white text-sm uppercase tracking-wider">
                      <span className="mr-2">Explore</span>
                      <div className="w-5 h-[1px] bg-black dark:bg-white transition-all group-hover:w-8"></div>
                    </div>
              </div>
                </div>
          </div>
          
              {/* Quote */}
              <div className="mt-16 bg-gray-100 dark:bg-gray-800 p-8 relative">
                <div className="absolute -top-5 -left-5 text-6xl text-black/10 dark:text-white/10 font-serif">"</div>
                <p className="italic text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  Our showroom is designed to be an immersive extension of our vehicles—a space where luxury, craftsmanship, and attention to detail converge to create an unforgettable experience for our clients.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" 
                      alt="Design Director" 
                      className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <p className="text-black dark:text-white font-medium">James Richardson</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Design Director</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Full Width Banner */}
      <section className="relative py-32 sm:py-40 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.pexels.com/photos/119435/pexels-photo-119435.jpeg" 
            alt="Heritage racing" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60"></div>
        </div>
        
        {/* Decorative grid */}
        <div className="absolute inset-0 grid grid-cols-6 h-full w-full pointer-events-none z-[1]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-full border-l border-white/10"></div>
          ))}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="absolute w-full border-t border-white/10" style={{ top: `${25 * (i + 1)}%` }}></div>
          ))}
              </div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <Parallax speed={0.2}>
            <div className="overflow-hidden inline-block mb-6">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="text-white text-sm uppercase tracking-[0.3em] mb-4">Our Legacy</div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white uppercase tracking-wide">
                  Experience <br className="hidden md:block" />Our Heritage
              </h2>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-white/80 max-w-xl mb-10 leading-relaxed">
                Discover our collection of premium lifestyle products that celebrate our racing heritage and luxury craftsmanship. From iconic race-inspired timepieces to handcrafted leather goods, each piece tells a story of excellence.
              </p>
              
              <Link 
                to="/heritage" 
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black uppercase tracking-wider text-xs sm:text-sm font-light hover:bg-white/90 transition-all relative overflow-hidden"
              >
                <span className="relative z-10">Explore Heritage</span>
                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute bottom-0 left-0 w-0 h-full bg-black/10 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </motion.div>
          </Parallax>
          
          <div className="hidden lg:block">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.pexels.com/photos/9607167/pexels-photo-9607167.jpeg" 
                alt="Heritage watch" 
                className="w-3/4 ml-auto object-cover border-8 border-white/10"
              />
              <div className="absolute bottom-8 -left-12 w-1/2 aspect-square">
                <img 
                  src="https://images.pexels.com/photos/12801330/pexels-photo-12801330.jpeg" 
                  alt="Heritage racing gear" 
                  className="w-full h-full object-cover border-8 border-white/10"
                />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -left-20 w-16 h-40 border border-white/20"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Visit Showroom CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative h-[400px] overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/241316/pexels-photo-241316.jpeg" 
                alt="Physical showroom" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
            
            <div>
              <div className="border-l-2 border-black dark:border-white pl-6 mb-6">
                <h2 className="text-3xl sm:text-4xl font-light text-black dark:text-white uppercase tracking-wider mb-4">
                  Visit Our Showroom
                </h2>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Experience our collection in person. Our showroom features the latest merchandise, accessories, and scale models alongside our luxury vehicles.
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-xl font-light text-black dark:text-white mb-2">Location</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    123 Luxury Lane, Beverly Hills, CA 90210
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-light text-black dark:text-white mb-2">Hours</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Monday - Friday</p>
                      <p className="text-black dark:text-white">9:00 AM - 8:00 PM</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Saturday - Sunday</p>
                      <p className="text-black dark:text-white">10:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/contact" 
                className="inline-block px-6 sm:px-10 py-3 sm:py-4 bg-black text-white dark:bg-white dark:text-black uppercase tracking-wider text-xs sm:text-sm font-light hover:bg-gray-900 dark:hover:bg-gray-100 transition-all"
              >
                Schedule a Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShowroomPage; 