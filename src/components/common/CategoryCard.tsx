import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="overflow-hidden group bg-white dark:bg-black h-full flex flex-col"
    >
      <Link to={`/categories/${id}`} className="block h-full flex flex-col">
        <div className="relative h-[350px] overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-50"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-white text-3xl font-light uppercase tracking-wide">{name}</h3>
          </div>
        </div>
        
        <div className="p-6 flex-grow flex flex-col">
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8">
            Explore our {name.toLowerCase()} collection designed with the perfect blend of performance and luxury.
          </p>
          
          <div className="mt-auto pt-5 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <span className="text-sm text-black dark:text-white uppercase tracking-wider">Explore the models</span>
            <ArrowRight size={16} className="text-black dark:text-white transform group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;