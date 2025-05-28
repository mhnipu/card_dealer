import React, { useEffect, useRef } from 'react';
import Hero from '../components/home/Hero';
import FeaturedSlider from '../components/home/FeaturedSlider';
import CategoryGrid from '../components/home/CategoryGrid';
import FeatureShowcase from '../components/home/FeatureShowcase';
import ContactForm from '../components/common/ContactForm';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Star, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ScrollReveal, Parallax } from '../context/ScrollAnimationContext';
import { useScrollAnimation } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    document.title = 'Prestige Auto | Luxury Car Dealership';
    window.scrollTo(0, 0);
  }, []);

  // Apply scroll animations to the entire home page
  useGSAP(() => {
    if (!homeRef.current) return;
    
    // Animate sections as they enter the viewport
    const sections = homeRef.current.querySelectorAll('section');
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

  return (
    <div ref={homeRef} className="min-h-screen">
      <Hero />
      <FeaturedSlider />
      <CategoryGrid />
      <FeatureShowcase />
      <TestimonialSection />
      <ContactSection />
    </div>
  );
};

const TestimonialSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const testimonials = [
    {
      name: 'Alex Johnson',
      position: 'CEO, TechVentures',
      text: 'The attention to detail and personalized service exceeded my expectations. My new S-Class is a dream come true.',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      name: 'Sophia Martinez',
      position: 'Marketing Director',
      text: 'From the first consultation to delivery, the team made the process seamless. The AMG GT delivers performance beyond my imagination.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      name: 'Michael Chen',
      position: 'Finance Executive',
      text: "The dealership's knowledge and professionalism made selecting my EQS a joy. I'm thrilled with both the car and the service.",
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;
    
    // Animate the heading with a special effect
    const heading = sectionRef.current.querySelector('h2');
    if (heading) {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
    
    // Animate testimonial cards with stagger
    const cards = sectionRef.current.querySelectorAll('.testimonial-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cards[0],
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white dark:bg-black text-black dark:text-white">
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
                Client Testimonials
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs sm:text-sm ml-9">
              Discover what our clients have to say about us
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal
              key={index}
              animation="fadeUp"
              delay={index * 0.1}
              className="testimonial-card bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-6 sm:p-8 h-full flex flex-col hover:border-gray-400 dark:hover:border-white/50 transition-colors"
            >
              <div className="mb-6 flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-black dark:text-white" />
                ))}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 font-light text-base leading-relaxed mb-8">"{testimonial.text}"</p>
              
              <div className="mt-auto flex items-center pt-6 border-t border-gray-200 dark:border-gray-800">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-base font-light text-black dark:text-white">{testimonial.name}</h3>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">{testimonial.position}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    if (!sectionRef.current) return;
    
    // Animate the contact form with a slide-in effect
    const form = sectionRef.current.querySelector('form');
    if (form) {
      gsap.fromTo(
        form,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: form,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
    
    // Animate the dealership info
    const dealerInfo = sectionRef.current.querySelector('.dealer-info');
    if (dealerInfo) {
      gsap.fromTo(
        dealerInfo,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: dealerInfo,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
    
    // Animate form fields with stagger
    const fields = form?.querySelectorAll('input, select, textarea');
    if (fields) {
      gsap.fromTo(
        fields,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: {
            trigger: form,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-gray-50 dark:bg-black text-black dark:text-white relative">
      {/* Subtle overlays */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute top-0 right-[20%] w-[1px] h-[60%] bg-black dark:bg-white"></div>
        <div className="absolute bottom-0 left-[15%] w-[1px] h-[50%] bg-black dark:bg-white"></div>
      </div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fadeUp">
          <div className="text-left mb-16 md:mb-20">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-1 h-6 sm:h-8 bg-black dark:bg-white"></span>
              <h2 className="text-2xl sm:text-3xl font-light text-black dark:text-white uppercase tracking-wider">
                Contact Us
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs sm:text-sm ml-9">
              Our specialists are ready to assist you
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <ScrollReveal 
            animation="fadeLeft"
            className="dealer-info flex flex-col space-y-10"
          >
            <div>
              <h3 className="text-xl font-light text-black dark:text-white mb-6 uppercase tracking-wide">Dealership information</h3>
              
              <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-10 hover:border-gray-400 dark:hover:border-white/50 transition-colors">
                <h4 className="text-base font-light text-black dark:text-white mb-6 uppercase tracking-wide">Hours of operation</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Monday - Friday</span>
                    <span className="text-black dark:text-white">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Saturday</span>
                    <span className="text-black dark:text-white">10:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Sunday</span>
                    <span className="text-black dark:text-white">11:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-6 sm:p-8 flex flex-col space-y-8 hover:border-gray-400 dark:hover:border-white/50 transition-colors">
              <div className="flex items-start">
                <div className="w-10 h-10 border border-gray-300 dark:border-white/30 flex items-center justify-center mr-4">
                  <Phone className="w-4 h-4 text-black dark:text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Telephone</p>
                  <p className="text-black dark:text-white">+1 (800) 555-0123</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 border border-gray-300 dark:border-white/30 flex items-center justify-center mr-4">
                  <Mail className="w-4 h-4 text-black dark:text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-black dark:text-white">info@prestigeauto.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 border border-gray-300 dark:border-white/30 flex items-center justify-center mr-4">
                  <MapPin className="w-4 h-4 text-black dark:text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-black dark:text-white">123 Luxury Lane, Beverly Hills, CA 90210</p>
                </div>
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-black dark:text-white hover:opacity-70 transition-opacity uppercase tracking-wider"
                >
                  View on map
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal
            animation="fadeRight"
            className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-6 sm:p-8 hover:border-gray-400 dark:hover:border-white/50 transition-colors"
          >
            <h3 className="text-xl font-light text-black dark:text-white mb-8 uppercase tracking-wide">Send a message</h3>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-0 py-2 bg-transparent border-0 border-b border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-black dark:focus:border-white text-black dark:text-white"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-0 py-2 bg-transparent border-0 border-b border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-black dark:focus:border-white text-black dark:text-white"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-0 py-2 bg-transparent border-0 border-b border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-black dark:focus:border-white text-black dark:text-white"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-0 py-2 bg-transparent border-0 border-b border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-black dark:focus:border-white text-black dark:text-white"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="interest" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  I'm interested in
                </label>
                <select
                  id="interest"
                  className="w-full px-0 py-2 bg-transparent border-0 border-b border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-black dark:focus:border-white text-black dark:text-white"
                >
                  <option value="">Select an option</option>
                  <option value="new">New Vehicle Purchase</option>
                  <option value="certified">Certified Pre-Owned</option>
                  <option value="test-drive">Schedule a Test Drive</option>
                  <option value="service">Service & Maintenance</option>
                  <option value="other">Other Inquiries</option>
                </select>
              </div>
              
              <div className="mb-8">
                <label htmlFor="message" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-0 py-2 bg-transparent border-0 border-b border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-black dark:focus:border-white text-black dark:text-white"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="px-6 sm:px-8 py-2 sm:py-3 border border-black dark:border-white text-black dark:text-white uppercase tracking-wider text-xs sm:text-sm transition-all hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-light"
              >
                Submit
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Home;