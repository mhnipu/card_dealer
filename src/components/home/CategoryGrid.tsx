import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { carCategories } from '../../utils/data';
import CategoryCard from '../common/CategoryCard';

const CategoryGrid: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-20 md:py-32 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-[1400px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-left mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light text-black dark:text-white mb-6">Vehicle Categories</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl font-light">
            From elegant sedans to versatile SUVs, explore our range of vehicles designed to meet your unique requirements.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {carCategories.map((category, index) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              image={category.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;