import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ScrollReveal, Parallax } from '../../context/ScrollAnimationContext';
import BlobBackground from './BlobBackground';
import { use3DTilt, useMagneticEffect } from '../../utils/creative-animations';
import { ArrowRight, Car, ShieldCheck, Zap, Star, BadgeCheck, BarChart3, Activity } from 'lucide-react';
import Button from '../common/Button';
import { vehiclesData, standardCategories } from '../../utils/data';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const CategoryGrid: React.FC = () => {
  // eslint-disable-next-line
  const sectionInViewRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Initialize card refs array
  React.useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, 5); // Only using 5 categories
  }, []);
  
  // Get count of vehicles in each category using the vehiclesData array
  const getCategoryCount = (categoryId: string) => {
    return vehiclesData.filter(car => car.category.toLowerCase() === categoryId.toLowerCase()).length;
  };
  
  // Get a sample car from each category for "featured model" using vehiclesData
  const getFeaturedModelFromCategory = (categoryId: string) => {
    const categoryCars = vehiclesData.filter(car => car.category.toLowerCase() === categoryId.toLowerCase());
    return categoryCars.length > 0 ? categoryCars[0] : null;
  };
  
  // Apply scroll animations
  useGSAP(() => {
    if (!sectionRef.current) return;
    
    // Animate the heading with a staggered reveal
    const heading = sectionRef.current.querySelector('h2');
    const paragraph = sectionRef.current.querySelector('p');
    
    if (heading && paragraph) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
      
      tl.fromTo(
        heading,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 }
      ).fromTo(
        paragraph,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 }, 
        '-=0.4' // Start slightly before the heading animation finishes
      );
    }
    
    // Animate the cards with stagger
    const cards = sectionRef.current.querySelectorAll('.category-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cards[0],
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Add hover effects to each card
    cards.forEach((card) => {
      // Get elements
      const imageElement = card.querySelector('.category-image');
      const overlay = card.querySelector('.category-overlay');
      const content = card.querySelector('.absolute.inset-0.flex');
      
      // Hover effects
      card.addEventListener('mouseenter', () => {
        gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
        gsap.to(imageElement, { scale: 1.1, duration: 0.5 });
        gsap.to(content, { y: -10, duration: 0.3 });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(overlay, { opacity: 0.5, duration: 0.3 });
        gsap.to(imageElement, { scale: 1, duration: 0.5 });
        gsap.to(content, { y: 0, duration: 0.3 });
      });
      
      // Initialize with scaled image
      gsap.set(imageElement, { scale: 1.05 });
    });
  }, []);

  // Filter buttons update active category locally
  const handleFilterCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId === activeCategory ? null : categoryId);
  };
  
  // Navigate to the Vehicles page with the selected category
  const navigateToCategoryPage = (categoryId: string) => {
    // Debug the category
    console.log('Navigating with category:', categoryId);
    
    // Make sure the category matches exactly what's expected in the Vehicles component
    if (categoryId.toLowerCase() === 'suv') {
      navigate('/vehicles/suv');
    } else if (categoryId.toLowerCase() === 'sedan') {
      navigate('/vehicles/sedan');
    } else if (categoryId.toLowerCase() === 'sports') {
      navigate('/vehicles/sports');
    } else if (categoryId.toLowerCase() === 'electric') {
      navigate('/vehicles/electric');
    } else if (categoryId.toLowerCase() === 'concept') {
      navigate('/vehicles/concept');
    } else if (categoryId.toLowerCase() === 'all') {
      navigate('/vehicles/all');
    } else {
      navigate(`/vehicles/${categoryId.toLowerCase()}`);
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    switch(categoryId.toLowerCase()) {
      case 'sedan': return <Car className="text-gray-400" size={18} />;
      case 'suv': return <ShieldCheck className="text-gray-400" size={18} />;
      case 'sports': return <Activity className="text-gray-400" size={18} />;
      case 'convertible': return <Star className="text-gray-400" size={18} />;
      case 'electric': return <Zap className="text-gray-400" size={18} />;
      case 'concept': return <BarChart3 className="text-gray-400" size={18} />;
      default: return <BadgeCheck className="text-gray-400" size={18} />;
    }
  };

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Animated blob backgrounds */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        <BlobBackground color="#2563eb" opacity={0.15} className="left-0 top-0 transform scale-150 translate-x-[-30%] translate-y-[-20%]" />
        <BlobBackground color="#3b82f6" opacity={0.1} className="right-0 bottom-0 transform scale-150 translate-x-[30%] translate-y-[20%]" />
      </div>
      
      {/* Decorative elements - like in Luxury Car Collection */}
      <div className="absolute top-1/4 left-12 w-[10%] h-[1px] bg-gray-700 hidden md:block"></div>
      <div className="absolute bottom-1/4 right-12 w-[1px] h-[10%] bg-gray-700 hidden md:block"></div>
      <div className="absolute top-1/3 right-[15%] w-[1px] h-[15%] bg-gray-700 hidden lg:block"></div>
      <div className="absolute bottom-1/3 left-[15%] w-[8%] h-[1px] bg-gray-700 hidden lg:block"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <ScrollReveal animation="fadeUp" className="mb-10 sm:mb-16 md:mb-20 mx-auto text-center">
          <div className="flex flex-col items-center justify-center gap-2 mb-4">
            <span className="inline-block w-1 h-8 bg-white"></span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight uppercase reveal-title text-center">
              Browse by Category
            </h2>
          </div>
          <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed reveal-text max-w-3xl mx-auto">
            Explore our selection of premium vehicles by category and discover the perfect match for your driving desires.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {/* Display categories */}
          {['sports', 'suv', 'sedan', 'electric', 'concept'].map((categoryId, index) => {
            // Get all vehicles for this category
            const categoryVehicles = vehiclesData.filter(
              vehicle => vehicle.category.toLowerCase() === categoryId.toLowerCase()
            );
            
            // Get first vehicle as featured
            const featuredVehicle = categoryVehicles.length > 0 ? categoryVehicles[0] : null;
            
            // Get category name (capitalized for display)
            const categoryName = categoryId === 'suv' ? 'SUV' : 
                                categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
            
            // Get a representative image
            const categoryImage = featuredVehicle ? featuredVehicle.image : '';
            
            return (
              <motion.div 
                key={categoryId}
                ref={el => cardRefs.current[index] = el}
                className="category-card group"
                onMouseEnter={() => setHoveredCategory(categoryId)}
                onMouseLeave={() => setHoveredCategory(null)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div 
                  className="relative overflow-hidden cursor-pointer h-full min-h-[200px] sm:min-h-[250px] md:min-h-[280px] rounded-sm
                  border border-gray-800 hover:border-white/60 transition-all duration-300 hover:translate-y-[-8px]"
                  onClick={() => navigateToCategoryPage(categoryId)}
                >
                  <div className="absolute inset-0 w-full h-full">
                    <img 
                      src={categoryImage} 
                      alt={categoryName} 
                      className="category-image absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700"
                      style={{ 
                        imageRendering: '-webkit-optimize-contrast',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                        WebkitFontSmoothing: 'antialiased'
                      }}
                    />
                    <div className="category-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-50 transition-opacity duration-300"></div>
                    
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-[15%] h-[1px] bg-white/50"></div>
                    <div className="absolute top-0 left-0 w-[1px] h-[15%] bg-white/50"></div>
                    <div className="absolute bottom-0 right-0 w-[15%] h-[1px] bg-white/50"></div>
                    <div className="absolute bottom-0 right-0 w-[1px] h-[15%] bg-white/50"></div>
                  </div>
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 transition-all duration-300">
                    <h3 className="text-white text-xl sm:text-2xl font-light mb-1 uppercase tracking-wide">{categoryName}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-xs sm:text-sm font-light">{categoryVehicles.length} {categoryVehicles.length === 1 ? 'model' : 'models'}</span>
                      
                      <div className="inline-block">
                        <span className="text-white/80 text-xs uppercase tracking-wider font-light group-hover:text-white transition-colors">
                          View All
                          <div className="h-[1px] bg-white/40 w-full mt-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Active indicator */}
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;