import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wrench, Car, Clock, Shield, Award, Phone, Users, Settings, CircleDollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

// Service type definition
interface Service {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  image: string;
  features: string[];
}

const ServicesPage: React.FC = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // List of services offered
  const services: Service[] = [
    {
      id: 'maintenance',
      title: 'Premium Maintenance',
      description: 'Factory-trained technicians using genuine parts ensure your luxury vehicle maintains its performance and value.',
      icon: <Wrench size={28} strokeWidth={1.5} />,
      image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1800&q=80',
      features: [
        'Comprehensive vehicle inspection',
        'Fluid checks and top-offs',
        'Filter replacements',
        'Software updates',
        'Complimentary car wash'
      ]
    },
    {
      id: 'detailing',
      title: 'Exquisite Detailing',
      description: 'Our meticulous detailing services restore your vehicle\'s appearance to showroom condition, inside and out.',
      icon: <Car size={28} strokeWidth={1.5} />,
      image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1800&q=80',
      features: [
        'Hand wash and wax',
        'Paint correction',
        'Ceramic coating',
        'Interior deep clean',
        'Leather conditioning'
      ]
    },
    {
      id: 'express',
      title: 'Express Services',
      description: 'Quick services completed while you wait in our luxury lounge with complimentary refreshments.',
      icon: <Clock size={28} strokeWidth={1.5} />,
      image: 'https://images.unsplash.com/photo-1567610701553-6dc6a73251ff?auto=format&fit=crop&w=1800&q=80',
      features: [
        'Oil and filter change',
        'Tire rotation',
        'Battery check and replacement',
        'Wiper blade replacement',
        'Brake inspection'
      ]
    },
    {
      id: 'warranty',
      title: 'Warranty Services',
      description: 'Comprehensive warranty coverage and extensions to provide peace of mind for your luxury investment.',
      icon: <Shield size={28} strokeWidth={1.5} />,
      image: 'https://images.unsplash.com/photo-1581092921461-d2a08e97d7c7?auto=format&fit=crop&w=1800&q=80',
      features: [
        'Factory warranty service',
        'Extended warranty options',
        'Certified pre-owned inspections',
        'Warranty transfers',
        'Digital warranty management'
      ]
    },
    {
      id: 'customization',
      title: 'Bespoke Customization',
      description: 'Personalize your vehicle with premium upgrades and custom modifications to reflect your unique style.',
      icon: <Settings size={28} strokeWidth={1.5} />,
      image: 'https://images.unsplash.com/photo-1611566026373-c7c8712baf14?auto=format&fit=crop&w=1800&q=80',
      features: [
        'Performance upgrades',
        'Interior customization',
        'Exterior styling',
        'Audio/visual enhancements',
        'Wheel and tire packages'
      ]
    },
    {
      id: 'concierge',
      title: 'Concierge Services',
      description: 'Experience unparalleled convenience with our premium concierge services designed for busy professionals.',
      icon: <Users size={28} strokeWidth={1.5} />,
      image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1800&q=80',
      features: [
        'Vehicle pickup and delivery',
        'Loaner vehicles',
        'Airport services',
        'At-home consultations',
        'Event transportation'
      ]
    }
  ];
  
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden mb-12 sm:mb-20">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1597766325363-fc44387cd3c0?auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury car service" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
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
                  Premium Services
                </h1>
                <div className="w-24 h-[2px] bg-white mb-6 sm:mb-8"></div>
                <p className="text-base sm:text-lg md:text-xl text-white/90 font-light leading-relaxed mb-8 sm:mb-10">
                  Experience exceptional care for your luxury vehicle with our comprehensive range of premium services designed to maintain perfection.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="px-6 sm:px-10 py-3 sm:py-4 bg-white text-black uppercase tracking-wider text-xs sm:text-sm font-light hover:bg-white/90 transition-all">
                    Schedule Service
                  </Link>
                  <button className="px-6 sm:px-10 py-3 sm:py-4 border border-white text-white uppercase tracking-wider text-xs sm:text-sm font-light hover:bg-white/10 transition-all">
                    Explore Services
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-12 w-[15%] h-[1px] bg-white/40 z-10 hidden md:block"></div>
        <div className="absolute bottom-1/4 left-12 w-[1px] h-[15%] bg-white/40 z-10 hidden md:block"></div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-24 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-[1px] bg-black dark:bg-white"></div>
              <h2 className="text-sm uppercase tracking-[0.2em] font-light text-black dark:text-white">Exceptional Service</h2>
              <div className="w-8 h-[1px] bg-black dark:bg-white"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-black dark:text-white uppercase tracking-wider mb-6">
              Why Choose Our Services
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our dedication to excellence and attention to detail sets our service department apart, ensuring your vehicle receives the premium care it deserves.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            <div className="bg-white dark:bg-black p-8 border border-gray-200 dark:border-gray-800 flex flex-col items-center text-center group hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300">
              <div className="w-16 h-16 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-full mb-6 group-hover:border-black dark:group-hover:border-white transition-all">
                <Award size={28} className="text-black dark:text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-black dark:text-white mb-4">Certified Expertise</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our factory-trained technicians undergo rigorous certification and continuous education to maintain the highest standards of service.
              </p>
            </div>
            
            <div className="bg-white dark:bg-black p-8 border border-gray-200 dark:border-gray-800 flex flex-col items-center text-center group hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300">
              <div className="w-16 h-16 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-full mb-6 group-hover:border-black dark:group-hover:border-white transition-all">
                <CircleDollarSign size={28} className="text-black dark:text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-black dark:text-white mb-4">Transparent Pricing</h3>
              <p className="text-gray-600 dark:text-gray-400">
                No hidden fees or surprises. We provide detailed quotes upfront and keep you informed throughout the service process.
              </p>
            </div>
            
            <div className="bg-white dark:bg-black p-8 border border-gray-200 dark:border-gray-800 flex flex-col items-center text-center group hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300">
              <div className="w-16 h-16 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-full mb-6 group-hover:border-black dark:group-hover:border-white transition-all">
                <Phone size={28} className="text-black dark:text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-black dark:text-white mb-4">Dedicated Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our service advisors provide personalized attention and are available to assist you with all your vehicle maintenance needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Offerings */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block w-10 h-[2px] bg-black dark:bg-white"></span>
              <h2 className="text-sm uppercase tracking-[0.2em] font-light text-black dark:text-white">Our Offerings</h2>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-black dark:text-white uppercase tracking-wider">
              Premium Services
            </h2>
          </div>
          
          <div className="space-y-24">
            {services.map((service, index) => {
              const [ref, inView] = useInView({
                threshold: 0.1,
                triggerOnce: true,
              });
              
              return (
                <div 
                  key={service.id} 
                  ref={ref}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className={`relative h-[400px] overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                  >
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-0 left-0 p-6 bg-black/70">
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                  >
                    <div className="border-l-2 border-black dark:border-white pl-6 mb-6">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-black dark:text-white mb-4">{service.title}</h3>
                      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6">
                        {service.description}
                      </p>
                    </div>
                    
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-1 h-1 rounded-full bg-black dark:bg-white"></div>
                          <span className="text-black dark:text-white">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-8">
                      <Link 
                        to={`/services/${service.id}`} 
                        className="inline-flex items-center gap-2 text-black dark:text-white border-b border-black dark:border-white pb-1 hover:gap-4 transition-all"
                      >
                        Learn more
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-black text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-wider mb-6">
                Schedule Your Service
              </h2>
              <p className="text-base sm:text-lg text-gray-300 mb-8">
                Experience the difference of premium service for your luxury vehicle. Our team of experts is ready to assist you with any maintenance or customization needs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/contact" 
                  className="px-6 sm:px-10 py-3 sm:py-4 bg-white text-black uppercase tracking-wider text-xs sm:text-sm font-light hover:bg-white/90 transition-all"
                >
                  Book Appointment
                </Link>
                <a 
                  href="tel:+1234567890" 
                  className="px-6 sm:px-10 py-3 sm:py-4 border border-white text-white uppercase tracking-wider text-xs sm:text-sm font-light hover:bg-white/10 transition-all inline-flex items-center gap-2"
                >
                  <Phone size={16} />
                  Call Us
                </a>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559519529-0936e4058364?auto=format&fit=crop&w=1800&q=80" 
                alt="Service center" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Opening hours overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-6">
                <h3 className="text-xl font-light mb-4">Service Center Hours</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-gray-300 text-sm">Monday - Friday</p>
                    <p className="text-white">8:00 AM - 6:00 PM</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Saturday</p>
                    <p className="text-white">9:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage; 