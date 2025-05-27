import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../../utils/data';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CarCardProps {
  car: Car;
  index: number;
}

const CarCard: React.FC<CarCardProps> = ({ car, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white dark:bg-black overflow-hidden h-full flex flex-col"
    >
      <div className="relative overflow-hidden h-[300px]">
        <img 
          src={car.images.main} 
          alt={`${car.name} ${car.model}`}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-white text-xs uppercase tracking-wider mb-2 opacity-80">{car.category}</p>
          <h3 className="text-white text-2xl font-light uppercase tracking-wide">{car.name}</h3>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <p className="text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wider">{car.model}</p>
          <p className="text-black dark:text-white text-sm">${car.price.toLocaleString()}</p>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-8 line-clamp-3 leading-relaxed">
          {car.description}
        </p>
        
        <div className="grid grid-cols-2 gap-x-8 mb-8 text-sm">
          <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
            <span className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider block mb-1">Engine</span>
            <span className="text-black dark:text-white font-light">{car.specifications.engine}</span>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
            <span className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider block mb-1">Power</span>
            <span className="text-black dark:text-white font-light">{car.specifications.power}</span>
          </div>
        </div>
        
        <div className="mt-auto pt-5 border-t border-gray-200 dark:border-gray-800">
          <Link 
            to={`/cars/${car.id}`}
            className="inline-flex items-center text-sm text-black dark:text-white hover:opacity-70 transition-opacity uppercase tracking-wider"
          >
            Explore the model
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;