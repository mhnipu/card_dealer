import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, ArrowRight, Info, Zap, Clock, Gauge, Calendar, BarChart3 } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ScrollReveal, Parallax } from '../../context/ScrollAnimationContext';
import Button from '../common/Button';
import { vehiclesData, standardCategories } from '../../utils/data';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Filter options
const categories = standardCategories;

// Function to improve image URL quality by adding parameters
const getHighQualityImageUrl = (url: string): string => {
  // For Unsplash images, we can add quality and size parameters
  if (url.includes('unsplash.com')) {
    // Remove existing auto parameters if present
    const baseUrl = url.split('?')[0];
    // Add high quality and appropriate size parameters
    return `${baseUrl}?q=100&w=1500&fit=crop&auto=format&dpr=2`;
  }
  return url;
};

const FeaturedSlider: React.FC = () => {
  // eslint-disable-next-line
  const { ref } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [showAllModels, setShowAllModels] = useState(false);
  const navigate = useNavigate();
  
  // Use all available cars from vehiclesData
  const featured = vehiclesData;
  
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
    
    // Animate the slider as it comes into view
    const slider = sectionRef.current.querySelector('.swiper');
    if (slider) {
      gsap.fromTo(
        slider,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          scrollTrigger: {
            trigger: slider,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
    
    // Add parallax effect to the car images
    const carImages = sectionRef.current.querySelectorAll('.car-image');
    carImages.forEach((image) => {
      gsap.to(image, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: image,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5
        }
      });
    });
  }, []);
  
  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  
  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/vehicles/${category.toLowerCase()}`);
  };

  // Get counts of cars by category
  const getCategoryCount = (categoryName: string) => {
    if (categoryName === 'All') return vehiclesData.length;
    return vehiclesData.filter(car => car.category.toLowerCase() === categoryName.toLowerCase()).length;
  };

  return (
    <section id="featured-section" ref={sectionRef} className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white dark:bg-black relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-12 w-[10%] h-[1px] bg-gray-300 dark:bg-gray-700 hidden md:block"></div>
      <div className="absolute bottom-1/4 right-12 w-[1px] h-[10%] bg-gray-300 dark:bg-gray-700 hidden md:block"></div>
      <div className="absolute top-1/3 right-[15%] w-[1px] h-[15%] bg-gray-300 dark:bg-gray-700 hidden lg:block"></div>
      <div className="absolute bottom-1/3 left-[15%] w-[8%] h-[1px] bg-gray-300 dark:bg-gray-700 hidden lg:block"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <ScrollReveal animation="fadeUp" className="mb-10 sm:mb-16 md:mb-20 mx-auto text-center">
          <div className="flex flex-col items-center justify-center gap-2 mb-4">
            <span className="inline-block w-1 h-8 bg-black dark:bg-white"></span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-black dark:text-white tracking-tight uppercase reveal-title text-center">
              Luxury Car Collection
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base font-light leading-relaxed reveal-text max-w-3xl mx-auto">
            Explore our showcase of premium vehicles featuring advanced technology, exceptional performance, and elegant design. 
            Each model has been carefully selected to provide an extraordinary driving experience.
          </p>
        </ScrollReveal>
        
        {/* Category tabs */}
        <div className="mb-8 sm:mb-12 flex flex-wrap gap-2 sm:gap-3 border-b border-gray-200 dark:border-gray-800 pb-4 overflow-x-auto">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category === 'All' ? 'all' : category.toLowerCase())}
              className="px-3 sm:px-5 py-2 text-xs sm:text-sm uppercase tracking-wider transition-all border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white whitespace-nowrap"
            >
              {category} ({getCategoryCount(category)})
            </button>
          ))}
        </div>
        
        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            spaceBetween={16}
            slidesPerView={1.2}
            breakpoints={{
              480: { slidesPerView: 1.5, spaceBetween: 20 },
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
              1280: { slidesPerView: 3, spaceBetween: 32 },
            }}
            pagination={{ 
              clickable: true, 
              el: '.custom-pagination',
              bulletClass: 'inline-block w-2 h-2 mx-1 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer transition-all',
              bulletActiveClass: '!bg-black dark:!bg-white w-6'
            }}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="mb-8 sm:mb-10"
          >
            {featured.map((car, index) => (
              <SwiperSlide key={car.id}>
                <FeaturedCard car={car} isActive={index === activeIndex} />
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="flex flex-col md:flex-row items-center justify-between mt-6 sm:mt-10">
            <div className="custom-pagination flex items-center mb-6 md:mb-0"></div>
            
            <div className="flex space-x-3">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-full border border-gray-200 dark:border-gray-800"
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} className="sm:hidden" />
                <ChevronLeft size={20} className="hidden sm:block" />
              </button>
              
              <button 
                onClick={handleNext}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-full border border-gray-200 dark:border-gray-800"
                aria-label="Next slide"
              >
                <ChevronRight size={18} className="sm:hidden" />
                <ChevronRight size={20} className="hidden sm:block" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-10 sm:mt-16 text-center">
          <Link to="/vehicles/all">
            <Button
              variant="outline"
              className="px-6 sm:px-8 py-3 border-2 border-black dark:border-white text-black dark:text-white uppercase tracking-wider text-sm transition-all hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-light mx-auto"
            >
              View All Models
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

interface FeaturedCardProps {
  car: {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    features: string[];
    fuelType: string;
    year: number;
  };
  isActive: boolean;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ car, isActive }) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Card-specific animations
  useGSAP(() => {
    if (!cardRef.current) return;
    
    // Add hover effect using GSAP
    const image = cardRef.current.querySelector('.car-image');
    const card = cardRef.current;
    
    // Hover animation for card
    card.addEventListener('mouseenter', () => {
      gsap.to(image, { scale: 1.05, duration: 0.4, ease: 'power1.out' });
      gsap.to(card.querySelector('.card-overlay'), { opacity: 0.3, duration: 0.4 });
      gsap.to(card.querySelector('.card-content'), { y: -10, duration: 0.4 });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(image, { scale: 1, duration: 0.4, ease: 'power1.out' });
      gsap.to(card.querySelector('.card-overlay'), { opacity: 0.5, duration: 0.4 });
      gsap.to(card.querySelector('.card-content'), { y: 0, duration: 0.4 });
    });
  }, []);

  // Get high quality image URL
  const highQualityImage = getHighQualityImageUrl(car.image);

  const handleCardClick = () => {
    // Navigate to the specific car details page
    navigate(`/cars/${car.id}`);
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/vehicles/${car.category.toLowerCase()}`);
  };

  useEffect(() => {
    // Apply image loading and decoding optimization
    if (imageRef.current) {
      const img = imageRef.current;
      img.decoding = 'async';
      if ('loading' in HTMLImageElement.prototype) {
        img.loading = 'eager';
      }
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      className={`bg-white dark:bg-black overflow-hidden h-full flex flex-col group cursor-pointer transition-all duration-300 
        ${isActive ? 'shadow-2xl scale-100' : 'shadow-lg scale-95'} 
        border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600
        hover:translate-y-[-8px]`}
    >
      <div className="relative h-[250px] sm:h-[280px] md:h-[320px] overflow-hidden perspective">
        <div className="absolute inset-0 w-full h-full bg-gray-100 dark:bg-gray-800"></div>
        <img 
          ref={imageRef}
          src={highQualityImage} 
          alt={car.name} 
          className="car-image absolute inset-0 w-full h-full object-cover object-center will-change-transform"
          style={{ 
            imageRendering: '-webkit-optimize-contrast',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            WebkitFontSmoothing: 'antialiased'
          }}
          onLoad={(e) => {
            (e.target as HTMLImageElement).style.opacity = '1';
          }}
          width="800"
          height="600"
        />
        <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-50"></div>
        
        {/* Premium tag for expensive vehicles */}
        {car.price > 120000 && (
          <div className="absolute top-0 right-0 z-20 bg-white text-black px-4 sm:px-6 py-1 text-xs uppercase tracking-wider font-medium">
            Premium
          </div>
        )}
        
        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={handleCategoryClick}
            className="inline-block px-3 py-1 bg-white/90 text-black text-xs uppercase tracking-wider font-light hover:bg-white transition-colors"
          >
            {car.category}
          </button>
        </div>
        
        {/* Model year badge */}
        <div className="absolute top-4 right-4 transform group-hover:translate-x-1 transition-transform">
          <span className="inline-block px-3 sm:px-4 py-1 text-xs font-light bg-gray-800/80 text-white uppercase tracking-wider">
            {car.year}
          </span>
        </div>
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-[15%] h-[1px] bg-white/50"></div>
        <div className="absolute top-0 left-0 w-[1px] h-[15%] bg-white/50"></div>
        <div className="absolute bottom-0 right-0 w-[15%] h-[1px] bg-white/50"></div>
        <div className="absolute bottom-0 right-0 w-[1px] h-[15%] bg-white/50"></div>
        
        <div className="card-content absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <h3 className="text-white text-xl sm:text-2xl font-light uppercase tracking-wide">{car.name}</h3>
          <div className="h-[2px] w-12 bg-white mt-3 group-hover:w-24 transition-all duration-700"></div>
        </div>
      </div>
      
      <div className="p-4 sm:p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="flex flex-col">
            <span className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-1">Price</span>
            <p className="text-gray-900 dark:text-white text-lg sm:text-xl font-light">${car.price.toLocaleString()}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-1">Fuel</span>
            <div className="text-xs bg-gray-900 dark:bg-gray-700 text-white px-2 sm:px-3 py-1 rounded">
              {car.fuelType}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-4 sm:gap-x-8 mb-6 sm:mb-8">
          {car.features.slice(0, 2).map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              {index === 0 ? (
                <Zap size={16} className="text-gray-500 dark:text-gray-400" />
              ) : (
                <Clock size={16} className="text-gray-500 dark:text-gray-400" />
              )}
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider">
                  {index === 0 ? 'Power' : 'Acceleration'}
                </span>
                <span className="text-black dark:text-white font-light text-sm sm:text-base">{feature}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-auto pt-4 sm:pt-5 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <Link 
            to={`/cars/${car.id}`} 
            onClick={(e) => e.stopPropagation()}
            className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors px-3 sm:px-5 py-2 flex items-center group uppercase tracking-wider text-xs"
          >
            <span>Details</span>
            <ArrowRight size={14} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            to={`/vehicles/${car.category.toLowerCase()}`} 
            onClick={(e) => e.stopPropagation()}
            className="border border-black dark:border-white text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors px-3 sm:px-5 py-2 uppercase tracking-wider text-xs"
          >
            Browse Category
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSlider;