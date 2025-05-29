import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wrench, Car, Clock, Shield, Award, Phone, Users, Settings, CircleDollarSign, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ScrollReveal, Parallax } from '../context/ScrollAnimationContext';

gsap.registerPlugin(ScrollTrigger);

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
  const servicesRef = useRef<HTMLDivElement>(null);
  
  // Scroll to top on page load
  useEffect(() => {
    document.title = 'Prestige Auto | Luxury Car Services';
    window.scrollTo(0, 0);
  }, []);

  // Apply scroll animations to the entire services page
  useGSAP(() => {
    if (!servicesRef.current) return;
    
    // Animate sections as they enter the viewport
    const sections = servicesRef.current.querySelectorAll('section');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, []);
  
  // List of services offered with direct Unsplash URLs
  const services: Service[] = [
    {
      id: 'maintenance',
      title: 'Premium Maintenance',
      description: 'Factory-trained technicians using genuine parts ensure your luxury vehicle maintains its performance and value.',
      icon: <Wrench size={28} strokeWidth={1.5} />,
      image: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=1600',
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
      image: 'https://images.pexels.com/photos/372810/pexels-photo-372810.jpeg?auto=compress&cs=tinysrgb&w=1600',
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
      image: 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1600',
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
      image: 'https://images.pexels.com/photos/4481944/pexels-photo-4481944.jpeg?auto=compress&cs=tinysrgb&w=1600',
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
      image: 'https://images.pexels.com/photos/2684219/pexels-photo-2684219.jpeg?auto=compress&cs=tinysrgb&w=1600',
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
      image: 'https://images.pexels.com/photos/2829532/pexels-photo-2829532.jpeg?auto=compress&cs=tinysrgb&w=1600',
      features: [
        'Vehicle pickup and delivery',
        'Loaner vehicles',
        'Airport services',
        'At-home consultations',
        'Event transportation'
      ]
    }
  ];

  // Service highlights for the Services Preview section
  const serviceHighlights = [
    {
      icon: <Wrench size={24} strokeWidth={1.5} />,
      title: 'Premium Maintenance',
      description: 'Factory-trained technicians using genuine parts to ensure your luxury vehicle maintains peak performance.',
      image: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: <Car size={24} strokeWidth={1.5} />,
      title: 'Exquisite Detailing',
      description: 'Meticulous cleaning and restoration services that bring your vehicle back to showroom condition.',
      image: 'https://images.pexels.com/photos/372810/pexels-photo-372810.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: <Settings size={24} strokeWidth={1.5} />,
      title: 'Bespoke Customization',
      description: 'Tailor your luxury vehicle with premium upgrades and modifications to reflect your unique style.',
      image: 'https://images.pexels.com/photos/2684219/pexels-photo-2684219.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];
  
  return (
    <div ref={servicesRef} className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      {/* Hero Section with Image Collage */}
      <section className="relative h-[75vh] sm:h-[80vh] md:h-[90vh] overflow-hidden mb-12 sm:mb-20">
        {/* Main Background */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=2000" 
            alt="Luxury car service" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>
        
        {/* Image Collage - Absolute positioned on top of the hero */}
        <div className="absolute right-0 top-0 bottom-0 w-3/4 lg:w-1/2 hidden md:block">
          {/* Overlay gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-black/20 z-20"></div>
          
          {/* Service images grid */}
          <div className="absolute inset-0 grid grid-cols-2 gap-4 p-8 z-10">
            <div className="relative h-[45%]">
              <img 
                src="https://images.pexels.com/photos/6873088/pexels-photo-6873088.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Mechanic working on engine" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
            <div className="relative h-[45%] mt-16">
              <img 
                src="https://images.pexels.com/photos/6870332/pexels-photo-6870332.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Car polishing" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
            <div className="relative h-[45%]">
              <img 
                src="https://images.pexels.com/photos/9741654/pexels-photo-9741654.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Car diagnostics" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
            <div className="relative h-[45%] mt-[-16%]">
              <img 
                src="https://img.freepik.com/free-photo/cleaning-car-seats-car-service_1303-27237.jpg?w=800&t=st=1715899175~exp=1715899775~hmac=63ae56fc9b818a93ddf9523fa2288b37b112c347b13c636b728560ee0f19a21f" 
                alt="Luxury car interior cleaning" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <Parallax speed={-0.2}>
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
              </Parallax>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-12 w-[15%] h-[1px] bg-white/40 z-10 hidden md:block"></div>
        <div className="absolute bottom-1/4 left-12 w-[1px] h-[15%] bg-white/40 z-10 hidden md:block"></div>
        
        {/* Corner accents - matching the Vehicles page */}
        <div className="absolute top-12 right-12 w-[8%] h-[1px] bg-white/30 z-10 hidden md:block"></div>
        <div className="absolute top-12 right-12 w-[1px] h-[8%] bg-white/30 z-10 hidden md:block"></div>
        <div className="absolute bottom-12 left-16 w-[8%] h-[1px] bg-white/30 z-10 hidden md:block"></div>
        <div className="absolute bottom-12 left-16 w-[1px] h-[8%] bg-white/30 z-10 hidden md:block"></div>
      </section>
      
      {/* Visual Divider - reduced margin */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="w-full h-px bg-gray-200 dark:bg-gray-800"></div>
      </div>
      
      {/* Our Services Section - Using the visual style of Client Testimonials */}
      <section className="py-24 md:py-32 bg-white dark:bg-black text-black dark:text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Subtle overlays */}
          <div className="absolute inset-0 opacity-10 overflow-hidden">
            <div className="absolute top-0 right-[10%] w-[1px] h-[70%] bg-black dark:bg-white"></div>
            <div className="absolute bottom-0 left-[20%] w-[1px] h-[40%] bg-black dark:bg-white"></div>
          </div>
          
          <ScrollReveal animation="fadeUp">
            <div className="text-left mb-16 md:mb-20">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-1 h-6 sm:h-8 bg-black dark:bg-white"></span>
                <h2 className="text-2xl sm:text-3xl font-light text-black dark:text-white uppercase tracking-wider">
                  Our Services
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs sm:text-sm ml-9">
                Luxury automotive care at its finest
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {serviceHighlights.map((service, index) => (
              <ScrollReveal
                key={index}
                animation="fadeUp"
                delay={index * 0.1}
                className="service-card relative bg-white dark:bg-black border border-gray-200 dark:border-gray-800 h-full flex flex-col hover:border-gray-400 dark:hover:border-white/50 transition-colors overflow-hidden group"
              >
                {/* Service image */}
                <div className="relative h-48">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  
                  {/* Title overlay on image */}
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-lg font-light text-white mb-1">{service.title}</h3>
                  </div>
                </div>
                
                {/* Service content */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-4 flex items-center">
                    <div className="w-10 h-10 border border-gray-300 dark:border-white/30 flex items-center justify-center mr-3">
                      {service.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-light text-black dark:text-white">{service.title}</h3>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 font-light text-base leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
                    <Link 
                      to={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="inline-flex items-center text-sm text-black dark:text-white hover:opacity-70 transition-opacity uppercase tracking-wider"
                    >
                      Learn more
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                        <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          {/* View all services button */}
          <div className="flex justify-center mt-12">
            <Link 
              to="/services/all" 
              className="px-6 sm:px-10 py-3 sm:py-4 bg-black dark:bg-white text-white dark:text-black uppercase tracking-wider text-xs sm:text-sm font-light hover:bg-black/90 dark:hover:bg-white/90 transition-all"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
      
      {/* Service Offerings */}
      <section className="py-16 sm:py-24 relative">
        {/* Subtle overlays */}
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="absolute top-0 right-[10%] w-[1px] h-[70%] bg-black dark:bg-white"></div>
          <div className="absolute bottom-0 left-[10%] w-[1px] h-[40%] bg-black dark:bg-white"></div>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal animation="fadeUp">
            <div className="mb-16">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-1 h-6 sm:h-8 bg-black dark:bg-white"></span>
                <h2 className="text-2xl sm:text-3xl font-light text-black dark:text-white uppercase tracking-wider">
                  Premium Services
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs sm:text-sm ml-9">
                Comprehensive care for your luxury vehicle
              </p>
            </div>
          </ScrollReveal>
          
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
                    
                    {/* Corner accents - matching the Vehicles page */}
                    <div className="absolute top-0 left-0 w-[15%] h-[1px] bg-white/50"></div>
                    <div className="absolute top-0 left-0 w-[1px] h-[15%] bg-white/50"></div>
                    <div className="absolute bottom-0 right-0 w-[15%] h-[1px] bg-white/50"></div>
                    <div className="absolute bottom-0 right-0 w-[1px] h-[15%] bg-white/50"></div>
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
      <section className="py-16 sm:py-24 bg-black text-white relative">
        {/* Subtle overlays */}
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="absolute top-0 right-[20%] w-[1px] h-[60%] bg-white"></div>
          <div className="absolute bottom-0 left-[15%] w-[1px] h-[50%] bg-white"></div>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <ScrollReveal animation="fadeLeft">
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
            </ScrollReveal>
            
            <ScrollReveal animation="fadeRight">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                  alt="Service center" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-[15%] h-[1px] bg-white/50"></div>
                <div className="absolute top-0 left-0 w-[1px] h-[15%] bg-white/50"></div>
                <div className="absolute bottom-0 right-0 w-[15%] h-[1px] bg-white/50"></div>
                <div className="absolute bottom-0 right-0 w-[1px] h-[15%] bg-white/50"></div>
                
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
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage; 