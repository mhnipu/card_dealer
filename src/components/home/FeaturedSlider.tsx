import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { carsData, Car } from '../../utils/data';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const FeaturedSlider: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const featured = carsData.slice(0, 4);
  
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

  return (
    <section id="featured-section" ref={ref} className="py-20 md:py-32 bg-white dark:bg-black">
      <div className="max-w-[1400px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-left mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light text-black dark:text-white mb-6">Featured Models</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl font-light">
            Discover our latest vehicles that embody the perfect fusion of luxury, innovation, and performance.
          </p>
        </motion.div>
        
        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ 
              clickable: true, 
              el: '.custom-pagination',
              bulletClass: 'inline-block w-3 h-3 mx-1 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer transition-all',
              bulletActiveClass: '!bg-black dark:!bg-white w-6'
            }}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="mb-10"
          >
            {featured.map((car, index) => (
              <SwiperSlide key={car.id}>
                <FeaturedCard car={car} isActive={index === activeIndex} />
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="flex items-center justify-between mt-8">
            <div className="custom-pagination flex items-center"></div>
            
            <div className="flex space-x-2">
              <button 
                onClick={handlePrev}
                className="bg-gray-200 dark:bg-gray-700 p-3 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button 
                onClick={handleNext}
                className="bg-gray-200 dark:bg-gray-700 p-3 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeaturedCardProps {
  car: Car;
  isActive: boolean;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ car, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 overflow-hidden h-full flex flex-col group"
    >
      <div className="relative h-[300px] overflow-hidden">
        <img 
          src={car.images.main} 
          alt={car.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-light text-black dark:text-white mb-1">{car.name}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{car.model}</p>
        
        <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-6 text-sm">
          <div className="flex flex-col">
            <span className="text-gray-600 dark:text-gray-400 text-xs font-light">Engine</span>
            <span className="text-black dark:text-white font-light">{car.specifications.engine}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 dark:text-gray-400 text-xs font-light">Power</span>
            <span className="text-black dark:text-white font-light">{car.specifications.power}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 dark:text-gray-400 text-xs font-light">Acceleration</span>
            <span className="text-black dark:text-white font-light">{car.specifications.acceleration}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 dark:text-gray-400 text-xs font-light">Transmission</span>
            <span className="text-black dark:text-white font-light">{car.specifications.transmission}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-light text-xl text-black dark:text-white">${car.price.toLocaleString()}</span>
          <Link to={`/cars/${car.id}`} className="text-sm font-light text-black dark:text-white border-b border-current pb-0.5 hover:opacity-70 transition-opacity">
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedSlider;