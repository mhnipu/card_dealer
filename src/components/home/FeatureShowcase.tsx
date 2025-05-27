import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Award, Zap, Settings, Star, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Shield className="h-8 w-8 text-black dark:text-white" />,
    title: 'Exceptional Safety',
    description: 'Cutting-edge safety systems and intelligent technologies to protect what matters most.'
  },
  {
    icon: <Award className="h-8 w-8 text-black dark:text-white" />,
    title: 'Unmatched Luxury',
    description: 'Exquisite materials and meticulous craftsmanship for an atmosphere of refinement.'
  },
  {
    icon: <Zap className="h-8 w-8 text-black dark:text-white" />,
    title: 'Dynamic Performance',
    description: 'Powerful engines and precise handling delivering an exhilarating driving experience.'
  },
  {
    icon: <Settings className="h-8 w-8 text-black dark:text-white" />,
    title: 'German Engineering',
    description: 'Precision-engineered with attention to every detail for superior quality and reliability.'
  },
  {
    icon: <Star className="h-8 w-8 text-black dark:text-white" />,
    title: 'Personalized Service',
    description: 'Tailored solutions and dedicated support throughout your ownership journey.'
  },
  {
    icon: <Sparkles className="h-8 w-8 text-black dark:text-white" />,
    title: 'Innovative Technology',
    description: 'Pioneering advancements that enhance connectivity, comfort, and convenience.'
  }
];

const FeatureShowcase: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white dark:bg-black">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="text-left mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-black dark:text-white mb-6">
            The Mercedes-Benz Experience
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl font-light">
            Discover what sets Mercedes-Benz apart – a legacy of innovation, craftsmanship, and a commitment to excellence that has defined luxury mobility for generations.
          </p>
        </div>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="border-t border-gray-200 dark:border-gray-800 pt-6"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-light text-black dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 font-light">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureShowcase;