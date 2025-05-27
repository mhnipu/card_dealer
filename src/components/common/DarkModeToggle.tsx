import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const DarkModeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`relative rounded-full w-12 h-6 flex items-center transition duration-300 focus:outline-none shadow ${
        theme === 'dark' ? 'bg-blue-900' : 'bg-amber-600'
      }`}
    >
      <motion.div
        className="absolute left-0.5 bg-white w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-500"
        animate={{ translateX: theme === 'dark' ? 24 : 0 }}
      >
        {theme === 'dark' ? (
          <Moon size={12} className="text-blue-900" />
        ) : (
          <Sun size={12} className="text-amber-600" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;