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
      className="overflow-hidden group"
    >
      <Link to={`/categories/${id}`} className="block">
        <div className="relative h-[350px] overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-light text-white drop-shadow-md">{name}</h3>
          </div>
        </div>
        
        <div className="py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-light text-black dark:text-white">{name}</h3>
            <span className="text-black dark:text-white opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <ArrowRight size={20} />
            </span>
          </div>
          <div className="w-0 h-0.5 bg-black dark:bg-white group-hover:w-full transition-all duration-300 mt-2"></div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;