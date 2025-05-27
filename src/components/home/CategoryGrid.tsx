import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link, useNavigate } from 'react-router-dom';
import { carCategories, carsData } from '../../utils/data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ScrollReveal, Parallax } from '../../context/ScrollAnimationContext';
import BlobBackground from './BlobBackground';
import { use3DTilt, useMagneticEffect } from '../../utils/creative-animations';
import { ArrowRight, Car, ShieldCheck, Zap } from 'lucide-react';
import Button from '../common/Button';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const CategoryGrid: React.FC = () => {
  // eslint-disable-next-line
  const sectionInViewRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
  // Initialize card refs array
  React.useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, carCategories.length);
  }, []);
  
  // Get count of vehicles in each category
  const getCategoryCount = (categoryId: string) => {
    return carsData.filter(car => car.category === categoryId).length;
  };
  
  // Get a sample car from each category for "featured model"
  const getFeaturedModelFromCategory = (categoryId: string) => {
    const categoryCars = carsData.filter(car => car.category === categoryId);
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
    
    // Add hover effects and parallax to the card images
    cards.forEach((card) => {
      // Parallax effect on scroll
      const image = card.querySelector('.category-image');
      if (image) {
        gsap.to(image, {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5
          }
        });
      }
    });
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/vehicles/${categoryId}`);
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      {/* Animated blob backgrounds */}
      <div className="absolute inset-0 opacity-50">
        <BlobBackground color="#2563eb" opacity={0.05} className="left-0 top-0 transform scale-150 translate-x-[-30%] translate-y-[-20%]" />
        <BlobBackground color="#7c3aed" opacity={0.05} className="right-0 bottom-0 transform scale-150 translate-x-[30%] translate-y-[20%]" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-12 w-[10%] h-[1px] bg-gray-300 dark:bg-gray-700 hidden md:block"></div>
      <div className="absolute bottom-1/4 left-12 w-[1px] h-[10%] bg-gray-300 dark:bg-gray-700 hidden md:block"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <ScrollReveal animation="fadeUp" className="mb-16 md:mb-20 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-1 h-8 bg-black dark:bg-white"></span>
            <h2 className="text-5xl md:text-6xl font-light text-black dark:text-white tracking-tight uppercase reveal-title">
              Browse by Category
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-base font-light leading-relaxed reveal-text">
            Explore our selection of vehicles by category and discover the perfect match for your driving desires.
            Each category represents the pinnacle of automotive engineering and design.
          </p>
          
          {/* Category tabs for smaller screens */}
          <div className="mt-8 flex flex-wrap gap-3 md:hidden">
            {carCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="px-4 py-2 text-sm uppercase tracking-wider transition-all border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                {category.name} ({getCategoryCount(category.id)})
              </button>
            ))}
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {carCategories.map((category, index) => {
            const featuredModel = getFeaturedModelFromCategory(category.id);
            return (
              <div 
                key={category.id}
                ref={el => cardRefs.current[index] = el}
                className="category-card group"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="relative overflow-hidden h-[400px] border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:translate-y-[-8px]">
                  {/* Main image */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="category-image absolute inset-0 w-full h-full object-cover transform scale-105 transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="category-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-50 transition-opacity duration-300"></div>
                  
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-[15%] h-[1px] bg-white/50"></div>
                    <div className="absolute top-0 left-0 w-[1px] h-[15%] bg-white/50"></div>
                    <div className="absolute bottom-0 right-0 w-[15%] h-[1px] bg-white/50"></div>
                    <div className="absolute bottom-0 right-0 w-[1px] h-[15%] bg-white/50"></div>
                  </div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-4 py-1.5 bg-white/90 text-black text-xs uppercase tracking-wider font-light">
                      {category.name}
                    </span>
                  </div>
                  
                  {/* Stats badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-block px-4 py-1.5 bg-black/70 text-white text-xs uppercase tracking-wider font-light">
                      {getCategoryCount(category.id)} Models
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                    <h3 className="text-white text-3xl font-light uppercase tracking-wide mb-2">{category.name}</h3>
                    <div className="h-[2px] w-12 bg-white mb-4 group-hover:w-24 transition-all duration-700"></div>
                    
                    {featuredModel && hoveredCategory === category.id && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4"
                      >
                        <p className="text-white text-sm mb-2">Featured Model:</p>
                        <p className="text-white/90 font-light text-sm">
                          {featuredModel.name} {featuredModel.model} - ${featuredModel.price.toLocaleString()}
                        </p>
                      </motion.div>
                    )}
                    
                    <div className="flex gap-3 mt-4">
                      <Link 
                        to={`/vehicles/${category.id}`}
                        className="bg-white text-black hover:bg-gray-100 transition-colors px-5 py-2 flex items-center group-hover:pl-6 group-hover:pr-4 uppercase tracking-wider text-xs group"
                      >
                        <span>Browse Models</span>
                        <ArrowRight size={14} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                      
                      {featuredModel && (
                        <Link 
                          to={`/cars/${featuredModel.id}`}
                          className="border border-white text-white hover:bg-white/10 transition-colors px-5 py-2 uppercase tracking-wider text-xs"
                        >
                          View Featured
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Category description and icons - only visible on desktop */}
                <div className="hidden md:block p-6 bg-white dark:bg-black border border-t-0 border-gray-200 dark:border-gray-800 group-hover:border-gray-400 dark:group-hover:border-gray-600 transition-all duration-300">
                  <div className="flex gap-4 mb-4">
                    {category.id === 'sedan' && <Car size={20} className="text-gray-500 dark:text-gray-400" />}
                    {category.id === 'suv' && <ShieldCheck size={20} className="text-gray-500 dark:text-gray-400" />}
                    {category.id === 'coupe' && <Zap size={20} className="text-gray-500 dark:text-gray-400" />}
                    {category.id === 'convertible' && <Car size={20} className="text-gray-500 dark:text-gray-400" />}
                    {category.id === 'electric' && <Zap size={20} className="text-gray-500 dark:text-gray-400" />}
                    {category.id === 'amg' && <Zap size={20} className="text-gray-500 dark:text-gray-400" />}
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {getCategoryCount(category.id)} vehicles in collection
                    </p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    Explore our {category.name.toLowerCase()} collection designed with the perfect blend of performance, luxury, and innovation.
                  </p>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <Link 
                      to={`/vehicles/${category.id}`}
                      className="text-sm text-black dark:text-white uppercase tracking-wider flex items-center group"
                    >
                      <span>View All {category.name}</span>
                      <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Call to action */}
        <div className="mt-16 text-center">
          <Button
            variant="primary"
            onClick={() => navigate('/vehicles/all')}
            className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black uppercase tracking-wider text-sm transition-all hover:bg-gray-800 dark:hover:bg-gray-100 font-light mx-auto"
          >
            View All Vehicles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;