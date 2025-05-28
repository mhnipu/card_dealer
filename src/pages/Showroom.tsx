import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Filter, ChevronDown } from 'lucide-react';

// Types for products
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  featured?: boolean;
  isNew?: boolean;
}

// Categories
type Category = 'all' | 'accessories' | 'apparel' | 'models' | 'merchandise';

const ShowroomPage: React.FC = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Products state
  const [products] = useState<Product[]>([
    {
      id: 'model-01',
      name: 'GT Coupe Scale Model 1:18',
      category: 'models',
      price: 350,
      image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=1000&q=80',
      description: 'Hand-crafted 1:18 scale model of our flagship GT Coupe, with incredible attention to detail.',
      featured: true
    },
    {
      id: 'apparel-01',
      name: 'Premium Racing Jacket',
      category: 'apparel',
      price: 450,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80',
      description: 'Water-resistant premium racing jacket with embroidered logos and reflective details.',
      featured: true,
      isNew: true
    },
    {
      id: 'accessory-01',
      name: 'Leather Driving Gloves',
      category: 'accessories',
      price: 180,
      image: 'https://images.unsplash.com/photo-1541497613813-17cda18e1156?auto=format&fit=crop&w=1000&q=80',
      description: 'Premium leather driving gloves with ventilation and knuckle protection for optimal grip and comfort.',
      isNew: true
    },
    {
      id: 'merchandise-01',
      name: 'Limited Edition Watch',
      category: 'merchandise',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=1000&q=80',
      description: 'Limited edition chronograph watch with carbon fiber dial and premium leather strap.',
      featured: true
    },
    {
      id: 'model-02',
      name: 'SUV Concept Model 1:24',
      category: 'models',
      price: 220,
      image: 'https://images.unsplash.com/photo-1594787318536-2d132076980e?auto=format&fit=crop&w=1000&q=80',
      description: 'Highly detailed 1:24 scale model of our concept SUV with opening doors and functional steering.',
      isNew: true
    },
    {
      id: 'apparel-02',
      name: 'Heritage Polo Shirt',
      category: 'apparel',
      price: 120,
      image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=1000&q=80',
      description: 'Premium cotton polo shirt featuring embroidered heritage logo and contrast details.'
    },
    {
      id: 'accessory-02',
      name: 'Carbon Fiber Key Case',
      category: 'accessories',
      price: 90,
      image: 'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?auto=format&fit=crop&w=1000&q=80',
      description: 'Genuine carbon fiber key case with Italian leather interior and magnetic closure.'
    },
    {
      id: 'merchandise-02',
      name: 'Leather Weekend Bag',
      category: 'merchandise',
      price: 680,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      description: 'Hand-crafted full grain leather weekend bag with custom hardware and monogram option.'
    }
  ]);
  
  // Filter states
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filtered products
  const filteredProducts = products.filter(product => 
    activeCategory === 'all' || product.category === activeCategory
  );
  
  // Featured products
  const featuredProducts = products.filter(product => product.featured);
  
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden mb-16 sm:mb-24">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1566024195452-b3e0a0ed319b?auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury showroom" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
        </div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light uppercase tracking-wide text-white mb-4 sm:mb-6">
                  Lifestyle Showroom
                </h1>
                <div className="w-24 h-[2px] bg-white mb-6 sm:mb-8"></div>
                <p className="text-base sm:text-lg md:text-xl text-white/90 font-light leading-relaxed mb-8 sm:mb-10">
                  Explore our collection of premium merchandise, scale models, and luxury accessories that embody the craftsmanship and design of our vehicles.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 sm:px-10 py-3 sm:py-4 bg-white text-black uppercase tracking-wider text-xs sm:text-sm font-light hover:bg-white/90 transition-all">
                    Shop Collection
                  </button>
                  <Link 
                    to="/vehicles" 
                    className="px-6 sm:px-10 py-3 sm:py-4 border border-white text-white uppercase tracking-wider text-xs sm:text-sm font-light hover:bg-white/10 transition-all"
                  >
                    Explore Vehicles
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-12 w-[15%] h-[1px] bg-white/40 z-10 hidden md:block"></div>
        <div className="absolute bottom-1/4 left-12 w-[1px] h-[15%] bg-white/40 z-10 hidden md:block"></div>
      </section>
      
      {/* Featured Products */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block w-10 h-[2px] bg-black dark:bg-white"></span>
              <h2 className="text-sm uppercase tracking-[0.2em] font-light text-black dark:text-white">Curated Selection</h2>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-black dark:text-white uppercase tracking-wider">
              Featured Collection
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => {
              const [ref, inView] = useInView({
                threshold: 0.1,
                triggerOnce: true,
              });
              
              return (
                <motion.div
                  key={product.id}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative h-[400px] overflow-hidden mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <button className="w-10 h-10 bg-white hover:bg-gray-100 flex items-center justify-center rounded-full shadow-lg transition-colors">
                        <Heart size={18} className="text-black" strokeWidth={1.5} />
                      </button>
                      <button className="w-10 h-10 bg-black hover:bg-gray-900 flex items-center justify-center rounded-full shadow-lg transition-colors">
                        <ShoppingBag size={18} className="text-white" strokeWidth={1.5} />
                      </button>
                    </div>
                    {product.isNew && (
                      <div className="absolute top-4 left-4 bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-xs uppercase tracking-wider font-medium">
                        New
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl text-black dark:text-white mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-black dark:text-white">${product.price}</span>
                      <Link 
                        to={`/showroom/${product.id}`}
                        className="text-black dark:text-white text-sm uppercase tracking-wider border-b border-black dark:border-white pb-[2px]"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Full Width Banner */}
      <section className="relative py-20 sm:py-28 my-16 sm:my-24 bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=80)' }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white uppercase tracking-wider mb-4">Experience Our Heritage</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Discover our collection of premium lifestyle products that celebrate our racing heritage and luxury craftsmanship.
          </p>
          <Link 
            to="/heritage" 
            className="inline-block px-8 sm:px-12 py-3 sm:py-4 bg-white text-black uppercase tracking-wider text-xs sm:text-sm font-light hover:bg-white/90 transition-all"
          >
            Explore Heritage
          </Link>
        </div>
      </section>
      
      {/* Shop Categories */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block w-10 h-[2px] bg-black dark:bg-white"></span>
              <h2 className="text-sm uppercase tracking-[0.2em] font-light text-black dark:text-white">Collections</h2>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-black dark:text-white uppercase tracking-wider mb-6 md:mb-0">
                Shop By Category
              </h2>
              
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                    activeCategory === 'all'
                      ? 'bg-black text-white dark:bg-white dark:text-black' 
                      : 'bg-white text-black border border-gray-200 hover:border-gray-400 dark:bg-black dark:text-white dark:border-gray-700 dark:hover:border-gray-500'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveCategory('models')}
                  className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                    activeCategory === 'models'
                      ? 'bg-black text-white dark:bg-white dark:text-black' 
                      : 'bg-white text-black border border-gray-200 hover:border-gray-400 dark:bg-black dark:text-white dark:border-gray-700 dark:hover:border-gray-500'
                  }`}
                >
                  Models
                </button>
                <button
                  onClick={() => setActiveCategory('apparel')}
                  className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                    activeCategory === 'apparel'
                      ? 'bg-black text-white dark:bg-white dark:text-black' 
                      : 'bg-white text-black border border-gray-200 hover:border-gray-400 dark:bg-black dark:text-white dark:border-gray-700 dark:hover:border-gray-500'
                  }`}
                >
                  Apparel
                </button>
                <button
                  onClick={() => setActiveCategory('accessories')}
                  className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                    activeCategory === 'accessories'
                      ? 'bg-black text-white dark:bg-white dark:text-black' 
                      : 'bg-white text-black border border-gray-200 hover:border-gray-400 dark:bg-black dark:text-white dark:border-gray-700 dark:hover:border-gray-500'
                  }`}
                >
                  Accessories
                </button>
                <button
                  onClick={() => setActiveCategory('merchandise')}
                  className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                    activeCategory === 'merchandise'
                      ? 'bg-black text-white dark:bg-white dark:text-black' 
                      : 'bg-white text-black border border-gray-200 hover:border-gray-400 dark:bg-black dark:text-white dark:border-gray-700 dark:hover:border-gray-500'
                  }`}
                >
                  Merchandise
                </button>
              </div>
            </div>
          </div>
          
          {/* Filter Bar - Mobile */}
          <div className="mb-8 md:hidden">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <span className="text-sm uppercase tracking-wider">Filters</span>
              </div>
              <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            {showFilters && (
              <div className="p-4 border-x border-b border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                      activeCategory === 'all'
                        ? 'bg-black text-white dark:bg-white dark:text-black' 
                        : 'bg-gray-100 text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveCategory('models')}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                      activeCategory === 'models'
                        ? 'bg-black text-white dark:bg-white dark:text-black' 
                        : 'bg-gray-100 text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
                    }`}
                  >
                    Models
                  </button>
                  <button
                    onClick={() => setActiveCategory('apparel')}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                      activeCategory === 'apparel'
                        ? 'bg-black text-white dark:bg-white dark:text-black' 
                        : 'bg-gray-100 text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
                    }`}
                  >
                    Apparel
                  </button>
                  <button
                    onClick={() => setActiveCategory('accessories')}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                      activeCategory === 'accessories'
                        ? 'bg-black text-white dark:bg-white dark:text-black' 
                        : 'bg-gray-100 text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
                    }`}
                  >
                    Accessories
                  </button>
                  <button
                    onClick={() => setActiveCategory('merchandise')}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                      activeCategory === 'merchandise'
                        ? 'bg-black text-white dark:bg-white dark:text-black' 
                        : 'bg-gray-100 text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
                    }`}
                  >
                    Merchandise
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="relative h-[300px] overflow-hidden mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button className="w-8 h-8 bg-white hover:bg-gray-100 flex items-center justify-center rounded-full shadow-lg transform opacity-0 translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <Heart size={16} className="text-black" strokeWidth={1.5} />
                    </button>
                    <button className="w-8 h-8 bg-black hover:bg-gray-900 flex items-center justify-center rounded-full shadow-lg transform opacity-0 translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75">
                      <ShoppingBag size={16} className="text-white" strokeWidth={1.5} />
                    </button>
                  </div>
                  {product.isNew && (
                    <div className="absolute top-4 left-4 bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-xs uppercase tracking-wider font-medium">
                      New
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg text-black dark:text-white mb-1">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-black dark:text-white">${product.price}</span>
                    <Link 
                      to={`/showroom/${product.id}`}
                      className="text-black dark:text-white text-xs uppercase tracking-wider border-b border-black dark:border-white pb-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 sm:py-24 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div className="md:w-1/2">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block w-10 h-[2px] bg-black dark:bg-white"></span>
                <h2 className="text-sm uppercase tracking-[0.2em] font-light text-black dark:text-white">Stay Updated</h2>
              </div>
              <h2 className="text-3xl sm:text-4xl font-light text-black dark:text-white uppercase tracking-wider mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 mb-6">
                Be the first to hear about new product releases, exclusive events, and special offers.
              </p>
            </div>
            
            <div className="md:w-1/2">
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                />
                <button className="px-6 sm:px-8 py-3 bg-black text-white dark:bg-white dark:text-black uppercase tracking-wider text-xs sm:text-sm font-light hover:bg-gray-900 dark:hover:bg-gray-100 transition-all">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Visit Showroom CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative h-[400px] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1547038577-da80abbc4f19?auto=format&fit=crop&w=1800&q=80" 
                alt="Physical showroom" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
            
            <div>
              <div className="border-l-2 border-black dark:border-white pl-6 mb-6">
                <h2 className="text-3xl sm:text-4xl font-light text-black dark:text-white uppercase tracking-wider mb-4">
                  Visit Our Showroom
                </h2>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Experience our collection in person. Our showroom features the latest merchandise, accessories, and scale models alongside our luxury vehicles.
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-xl font-light text-black dark:text-white mb-2">Location</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    123 Luxury Lane, Beverly Hills, CA 90210
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-light text-black dark:text-white mb-2">Hours</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Monday - Friday</p>
                      <p className="text-black dark:text-white">9:00 AM - 8:00 PM</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Saturday - Sunday</p>
                      <p className="text-black dark:text-white">10:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/contact" 
                className="inline-block px-6 sm:px-10 py-3 sm:py-4 bg-black text-white dark:bg-white dark:text-black uppercase tracking-wider text-xs sm:text-sm font-light hover:bg-gray-900 dark:hover:bg-gray-100 transition-all"
              >
                Schedule a Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShowroomPage; 