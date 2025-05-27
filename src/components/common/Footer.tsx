import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const mainCategories = [
    {
      title: 'Discover more',
      links: [
        { name: 'Electromobility', path: '/electromobility' },
        { name: 'Innovation', path: '/innovation' },
        { name: 'Design', path: '/design' },
        { name: 'Exhibitions', path: '/exhibitions' },
        { name: 'Museum & History', path: '/museum' },
        { name: 'Sports', path: '/sports' },
        { name: 'Driving Events', path: '/events' },
      ]
    },
    {
      title: 'Shopping',
      links: [
        { name: 'Dealers near you', path: '/dealers' },
        { name: 'Mercedes-Benz Accessories', path: '/accessories' },
        { name: 'Mercedes-Benz Collection', path: '/collection' },
        { name: 'Service & Parts', path: '/service' },
        { name: 'Configurator', path: '/configure' },
        { name: 'Test Drive', path: '/test-drive' },
      ]
    },
    {
      title: 'All about cars',
      links: [
        { name: 'Model Overview', path: '/models' },
        { name: 'Mercedes-AMG', path: '/amg' },
        { name: 'Mercedes-Maybach', path: '/maybach' },
        { name: 'Fleet Sales', path: '/fleet' },
        { name: 'New Vehicles', path: '/new' },
        { name: 'Pre-Owned Vehicles', path: '/pre-owned' },
      ]
    },
  ];

  return (
    <footer className="bg-white dark:bg-black text-gray-800 dark:text-gray-200">
      <div className="max-w-[1400px] mx-auto pt-16 pb-8 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mainCategories.map((category, index) => (
            <div key={index}>
              <h3 className="text-lg font-light mb-6 text-black dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">{category.title}</h3>
              <ul className="space-y-3">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.path} 
                      className="text-sm font-light text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 pb-4">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm font-light">Stay connected with us</p>
              <div className="flex space-x-4 mt-3">
                <a href="#" className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">
                  <Youtube size={20} />
                </a>
                <a href="#" className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="flex flex-wrap justify-center md:justify-end space-x-4 mb-4">
                <Link to="/privacy" className="text-sm font-light text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  Privacy Statement
                </Link>
                <Link to="/legal" className="text-sm font-light text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  Legal Notice
                </Link>
                <Link to="/cookies" className="text-sm font-light text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  Cookies
                </Link>
                <Link to="/contact" className="text-sm font-light text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  Contact
                </Link>
              </div>
              <p className="text-xs font-light text-gray-600 dark:text-gray-400">
                © {currentYear} Mercedes-Benz Group AG
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;