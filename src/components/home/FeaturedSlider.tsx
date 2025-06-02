import React, { useRef, useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Zap, Clock } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { vehiclesData, standardCategories } from '../../utils/data';

// Filter options
const categories = standardCategories;

// Optimized image loading function
const getOptimizedImageUrl = (url: string): string => {
  if (url.includes('unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?q=85&w=800&auto=format`;
  }
  return url;
};

const FeaturedSlider: React.FC = () => {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  
  // Memoize the filtered vehicles data - limit to 10 for better performance
  const featured = useMemo(() => vehiclesData.slice(0, 10), []);
  
  // Initialize section on load
  useEffect(() => {
    if (sectionRef.current) {
      // Make elements visible with staggered timing for elegant reveal
      const elements = sectionRef.current.querySelectorAll('.animate-on-load');
      elements.forEach((el, index) => {
        const delay = 100 + (index * 100);
        setTimeout(() => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'translateY(0)';
        }, delay);
      });
    }
  }, []);
  
  const handlePrev = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  
  const handleNext = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === 'All' ? 'All' : category);
    navigate(`/vehicles/${category.toLowerCase()}`);
  };

  // Memoized category counts
  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(category => {
      if (category === 'All') {
        counts[category] = vehiclesData.length;
      } else {
        counts[category] = vehiclesData.filter(car => 
          car.category.toLowerCase() === category.toLowerCase()
        ).length;
      }
    });
    return counts;
  }, []);

  return (
    <section 
      id="featured-section" 
      ref={sectionRef} 
      className="py-24 md:py-32 bg-white dark:bg-black relative overflow-hidden"
    >
      {/* Premium decorative elements */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-0 left-0 w-40 h-40 border-l border-t border-gray-100 dark:border-gray-800 opacity-50 hidden xl:block"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 border-r border-b border-gray-100 dark:border-gray-800 opacity-50 hidden xl:block"></div>
        <div className="absolute top-[15%] left-[8%] w-[1px] h-[200px] bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent hidden lg:block"></div>
        <div className="absolute bottom-[15%] right-[8%] w-[200px] h-[1px] bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent hidden lg:block"></div>
        <div className="absolute top-[30%] right-[15%] w-28 h-28 rounded-full border border-black/5 dark:border-white/5 opacity-50 hidden lg:block"></div>
      </div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Premium section header */}
        <div className="mb-20 text-center">
          <div className="flex flex-col items-center animate-on-load opacity-0 transform translate-y-4 transition-all duration-700">
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-black dark:via-white to-transparent mb-8"></div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-black dark:text-white tracking-tight uppercase">
              Luxury Car Collection
            </h2>
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-black dark:via-white to-transparent mt-5 mb-8"></div>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
              Experience our curated selection of exceptional vehicles, where engineering mastery
              meets the pinnacle of luxury and design excellence.
            </p>
          </div>
        </div>
        
        {/* Elegant category selection */}
        <div className="animate-on-load opacity-0 transform translate-y-4 transition-all duration-700 delay-100 mb-12 sm:mb-16">
          <div className="flex flex-wrap justify-center gap-x-1 gap-y-3 pb-1 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category === 'All' ? 'All' : category)}
                className={`group px-8 py-3 text-xs uppercase tracking-wider transition-all 
                  ${selectedCategory === category 
                    ? 'text-black dark:text-white border-b-2 border-black dark:border-white' 
                    : 'text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white'}`}
              >
                <span className="block group-hover:transform group-hover:translate-y-[-1px] transition-transform">
                  {category} 
                  <span className={`ml-1 ${selectedCategory === category 
                    ? 'text-black dark:text-white' 
                    : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-800 dark:group-hover:text-gray-300'}`}>
                    ({categoryCount[category] || 0})
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Refined slider layout */}
        <div className="animate-on-load opacity-0 transform translate-y-4 transition-all duration-700 delay-200 mb-16">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1.15}
            breakpoints={{
              480: { slidesPerView: 1.5 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 2.5 },
              1280: { slidesPerView: 3 },
            }}
            pagination={{ 
              clickable: true, 
              el: '.custom-pagination',
              bulletClass: 'swiper-pagination-bullet inline-block w-2 h-2 mx-1 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer transition-all',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-black dark:!bg-white w-8'
            }}
            loop={true}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            watchSlidesProgress={true}
            speed={600}
            className="featured-slider"
            grabCursor={true}
          >
            {featured.map((car, index) => (
              <SwiperSlide key={car.id}>
                <FeaturedCard car={car} isActive={index === activeIndex} />
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="flex flex-col md:flex-row items-center justify-between mt-10">
            <div className="custom-pagination flex items-center justify-center mb-8 md:mb-0"></div>
            
            <div className="flex items-center gap-6">
              <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
                <span className="hidden sm:inline">Navigate</span> 
                <span className="inline sm:hidden">Slide</span>
                <span className="mx-2">—</span> 
                {activeIndex + 1}/{featured.length}
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={handlePrev}
                  className="w-12 h-12 flex items-center justify-center text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white group"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={18} className="group-hover:transform group-hover:translate-x-[-2px] transition-transform" />
                </button>
                
                <button 
                  onClick={handleNext}
                  className="w-12 h-12 flex items-center justify-center text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white group"
                  aria-label="Next slide"
                >
                  <ChevronRight size={18} className="group-hover:transform group-hover:translate-x-[2px] transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 text-center animate-on-load opacity-0 transform translate-y-4 transition-all duration-700 delay-300">
          <Link to="/vehicles/all">
            <Button
              variant="outline"
              className="px-12 py-4 border border-black dark:border-white text-black dark:text-white uppercase tracking-wider text-sm transition-all hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-light mx-auto group"
            >
              <span className="inline-flex items-center gap-3">
                View Entire Collection
                <ArrowRight size={16} className="group-hover:transform group-hover:translate-x-1 transition-transform" />
              </span>
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
  
  // Optimized image URL
  const optimizedImage = useMemo(() => getOptimizedImageUrl(car.image), [car.image]);
  
  const handleCardClick = () => {
    navigate(`/cars/${car.id}`);
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/vehicles/${car.category.toLowerCase()}`);
  };

  // Preload image
  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.loading = 'eager';
    }
  }, []);

  // Format price with commas
  const formattedPrice = useMemo(() => {
    return car.price.toLocaleString();
  }, [car.price]);

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      className={`bg-white dark:bg-black h-full flex flex-col cursor-pointer transition-all duration-300 hover:translate-y-[-6px]
        ${isActive 
          ? 'shadow-sm border border-black/20 dark:border-white/20' 
          : 'border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600'} 
        hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_15px_30px_-10px_rgba(255,255,255,0.05)]`}
    >
      {/* Premium image container with subtle hover effect */}
      <div className="relative overflow-hidden">
        <div className="aspect-[3/2] bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
          <img 
            ref={imageRef}
            src={optimizedImage} 
            alt={car.name} 
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            loading="eager"
            width="800"
            height="500"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 opacity-60"></div>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={handleCategoryClick}
            className="px-3 py-1 bg-black/70 backdrop-blur-sm border border-white/10 text-white text-[10px] font-light uppercase tracking-wider hover:bg-black transition-colors"
          >
            {car.category}
          </button>
        </div>
        
        {/* Premium tag */}
        {car.price > 120000 && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-black text-[10px] uppercase tracking-wider font-medium">
              Premium
            </span>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white text-xl font-light uppercase tracking-wider leading-tight">{car.name}</h3>
          <div className="h-[1px] w-10 bg-white/70 mt-3"></div>
        </div>
      </div>
      
      {/* Card content with refined typography */}
      <div className="p-6 flex-grow flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider block">Starting from</span>
            <p className="text-xl font-light text-black dark:text-white">${formattedPrice}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">Year</span>
            <span className="px-2 py-1 bg-black/5 dark:bg-white/5 text-xs text-black dark:text-white">{car.year}</span>
          </div>
        </div>
        
        <div className="h-[1px] w-full bg-gray-100 dark:bg-gray-800 my-1"></div>
        
        {/* Car specifications */}
        <div className="grid grid-cols-2 gap-5">
          {car.features.slice(0, 2).map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              {index === 0 ? (
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5">
                  <Zap size={14} className="text-black dark:text-white" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5">
                  <Clock size={14} className="text-black dark:text-white" />
                </div>
              )}
              <div>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                  {index === 0 ? 'Power' : 'Acceleration'}
                </span>
                <span className="text-sm text-black dark:text-white">{feature}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Action button */}
        <div className="mt-auto pt-4 text-center">
          <Link 
            to={`/cars/${car.id}`} 
            onClick={(e) => e.stopPropagation()}
            className="inline-block w-full border border-black dark:border-white py-2 px-4 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-xs uppercase tracking-wider group font-light"
          >
            <span className="inline-flex items-center justify-center gap-2">
              Explore Details
              <ArrowRight size={12} className="transform transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSlider;