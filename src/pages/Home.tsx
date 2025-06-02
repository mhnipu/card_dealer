import React, { useEffect, useRef } from 'react';
import Hero from '../components/home/Hero';
import FeaturedSlider from '../components/home/FeaturedSlider';
import CategoryGrid from '../components/home/CategoryGrid';
import FeatureShowcase from '../components/home/FeatureShowcase';
import ContactForm from '../components/common/ContactForm';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Star, ArrowRight, MousePointer, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ScrollReveal, Parallax, useScrollAnimation } from '../context/ScrollAnimationContext';
import { useRevealAnimation } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const { smoother } = useScrollAnimation();
  
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

    // Create a scroll indicator animation
    const scrollIndicator = homeRef.current.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        y: 15,
        opacity: 0.2,
        repeat: -1,
        duration: 1.5,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }, []);

  const handleSmoothScroll = () => {
    if (smoother) {
      smoother.scrollTo('#featured-section', true, 'top top');
    } else {
      // Fallback for regular scrolling
      const section = document.getElementById('featured-section');
      section?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={homeRef} className="min-h-screen">
      <Hero />

      {/* Scroll indicator below hero */}
      <div className="flex flex-col items-center justify-center h-24 relative">
        <button 
          onClick={handleSmoothScroll}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer group"
        >
          <span className="text-xs uppercase tracking-widest">Explore</span>
          <div className="scroll-indicator relative">
            <ChevronDown className="w-5 h-5 animate-pulse" />
          </div>
        </button>
      </div>

      <div id="featured-section">
        <FeaturedSlider />
      </div>
      
      {/* Transition element */}
      <div className="py-8 sm:py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-nowrap whitespace-nowrap overflow-hidden opacity-10 dark:opacity-5">
            <div className="animate-marquee flex space-x-4 ml-[-20px]">
              {Array(10).fill('LUXURY PERFORMANCE INNOVATION').map((text, i) => (
                <span key={i} className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase">{text}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CategoryGrid />
      
      {/* Divider element */}
      <div className="relative h-24 sm:h-32 md:h-40 overflow-hidden mx-auto">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-4/5 max-w-3xl">
          <div className="h-px bg-gradient-to-r from-transparent via-black dark:via-white to-transparent"></div>
        </div>
      </div>

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

  useRevealAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-[10%] w-[1px] h-[70%] bg-black dark:bg-white"></div>
          <div className="absolute bottom-0 left-[20%] w-[1px] h-[40%] bg-black dark:bg-white"></div>
          <div className="absolute top-[30%] left-[5%] w-24 h-24 border border-black dark:border-white rounded-full opacity-20"></div>
          <div className="absolute bottom-[20%] right-[15%] w-40 h-40 border border-black dark:border-white opacity-10"></div>
        </div>
        
        <ScrollReveal animation="fadeUp">
          <div className="text-left mb-16 md:mb-20">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-1 h-6 sm:h-8 bg-black dark:bg-white"></span>
              <h2 className="text-2xl sm:text-3xl font-light text-black dark:text-white uppercase tracking-wider reveal-title">
                Client Testimonials
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs sm:text-sm ml-9 reveal-text">
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
              className="testimonial-card bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-6 sm:p-8 h-full flex flex-col hover:border-gray-400 dark:hover:border-white/50 transition-colors reveal-card group"
            >
              <div className="mb-6 flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-black dark:text-white" />
                ))}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 font-light text-base leading-relaxed mb-8">"{testimonial.text}"</p>
              
              <div className="mt-auto flex items-center pt-6 border-t border-gray-200 dark:border-gray-800 group-hover:border-gray-400 dark:group-hover:border-gray-600 transition-colors">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-transparent group-hover:ring-black dark:group-hover:ring-white transition-all">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
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
  
  // Use eager loading instead of scroll-triggered animations
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Log the section to debug
    console.log("ContactSection mounted, ref:", sectionRef.current);
    
    // Pre-load form elements with no delay - use specific class names to target elements
    const formElements = sectionRef.current.querySelectorAll('.form-element');
    const titleElements = sectionRef.current.querySelectorAll('.section-title');
    const contactInfo = sectionRef.current.querySelectorAll('.contact-info');
    
    // Handle each group separately for better control
    [formElements, titleElements, contactInfo].forEach(elements => {
      if (elements && elements.length > 0) {
        gsap.to(Array.from(elements), {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.2
        });
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white dark:bg-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5 dark:opacity-10">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] border border-black dark:border-white rounded-full"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] border border-black dark:border-white"></div>
        <div className="absolute top-[40%] right-[20%] w-[200px] h-[200px] border border-black dark:border-white rotate-45"></div>
      </div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 md:mb-24">
          <div className="section-title flex flex-col items-center justify-center">
            <div className="w-[1px] h-12 bg-black dark:bg-white mb-6"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-black dark:text-white uppercase tracking-wider mb-6">
              Contact Experience
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-black/30 dark:from-white/30 via-black/80 dark:via-white/80 to-black/30 dark:to-white/30 mb-6"></div>
            <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs sm:text-sm max-w-xl mx-auto">
              Connect with our luxury vehicle specialists for a personalized consultation tailored to your preferences
            </p>
          </div>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="dealer-info">
            {/* Contact information cards with luxury styling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="contact-info p-6 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="p-3 border border-gray-200 dark:border-gray-700 group-hover:border-black dark:group-hover:border-white transition-colors">
                    <MapPin className="w-6 h-6 text-black dark:text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-black dark:text-white text-lg mb-2">Visit Our Showroom</h3>
                    <p className="text-gray-600 dark:text-gray-400">123 Luxury Lane, Beverly Hills, CA 90210</p>
                  </div>
                </div>
              </div>
              
              <div className="contact-info p-6 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="p-3 border border-gray-200 dark:border-gray-700 group-hover:border-black dark:group-hover:border-white transition-colors">
                    <Phone className="w-6 h-6 text-black dark:text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-black dark:text-white text-lg mb-2">Contact Number</h3>
                    <p className="text-gray-600 dark:text-gray-400">+1 (310) 555-1234</p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">Premium customer support</p>
                  </div>
                </div>
              </div>
              
              <div className="contact-info p-6 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="p-3 border border-gray-200 dark:border-gray-700 group-hover:border-black dark:group-hover:border-white transition-colors">
                    <Mail className="w-6 h-6 text-black dark:text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-black dark:text-white text-lg mb-2">Email Address</h3>
                    <p className="text-gray-600 dark:text-gray-400">info@prestigeauto.com</p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">24/7 online support</p>
                  </div>
                </div>
              </div>
              
              <div className="contact-info p-6 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                <div className="flex flex-col">
                  <h3 className="font-medium text-black dark:text-white text-lg mb-3">Hours of Operation</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-gray-600 dark:text-gray-400">Monday - Friday</span>
                      <span className="text-black dark:text-white font-light">9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-gray-600 dark:text-gray-400">Saturday</span>
                      <span className="text-black dark:text-white font-light">10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 dark:text-gray-400">Sunday</span>
                      <span className="text-black dark:text-white font-light">11:00 AM - 5:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map or location showcase */}
            <div className="contact-info relative h-[240px] overflow-hidden mt-10 border border-gray-100 dark:border-gray-800">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                <div className="text-center px-6">
                  <h4 className="text-lg font-light mb-4 text-black dark:text-white">Premium Showroom Location</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Visit our luxury showroom in the heart of Beverly Hills</p>
                  <button className="px-6 py-2 border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-xs tracking-wider uppercase">
                    View Map
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Decorative elements for the form */}
            <div className="absolute -top-10 -left-10 w-20 h-20 border-t border-l border-gray-200 dark:border-gray-800 hidden lg:block"></div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b border-r border-gray-200 dark:border-gray-800 hidden lg:block"></div>
            
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-8 lg:p-12 relative z-10">
              <div className="form-element">
                <ContactForm />
              </div>
            </div>
            
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[80px] border-r-[80px] border-t-transparent border-r-gray-100 dark:border-r-gray-800 -mt-1 -mr-1 hidden lg:block"></div>
          </div>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="mt-32 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="h-px bg-gradient-to-r from-transparent via-black/20 dark:via-white/20 to-transparent"></div>
        <div className="h-16 flex justify-center items-center">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 tracking-wider font-light">© {new Date().getFullYear()} Prestige Auto. Luxury Redefined.</p>
        </div>
      </div>
    </section>
  );
};

export default Home;