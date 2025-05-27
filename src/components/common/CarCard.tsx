import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../../utils/data';
import { motion } from 'framer-motion';
import Button from './Button';

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
      className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="relative overflow-hidden h-56">
        <img 
          src={car.images.main} 
          alt={`${car.name} ${car.model}`}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-xl font-bold">{car.name}</h3>
          <p className="text-gray-200 text-sm">{car.model}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <p className="text-gray-600 dark:text-gray-400 text-sm">{car.category.charAt(0).toUpperCase() + car.category.slice(1)}</p>
          <p className="font-semibold text-gray-900 dark:text-white">${car.price.toLocaleString()}</p>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
          {car.description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
            <p className="text-xs text-gray-500 dark:text-gray-400">Engine</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{car.specifications.engine}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
            <p className="text-xs text-gray-500 dark:text-gray-400">Power</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{car.specifications.power}</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="primary" fullWidth>
            <Link to={`/cars/${car.id}`} className="block w-full">
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;