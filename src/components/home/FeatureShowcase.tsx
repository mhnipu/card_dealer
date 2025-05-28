import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ScrollReveal } from '../../context/ScrollAnimationContext';
import BlobBackground from './BlobBackground';
import { Shield, Award, Zap, Settings, Star, Sparkles } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);

  // Apply scroll animations
  useGSAP(() => {
    if (!sectionRef.current) return;
    
    // Animate the heading with a staggered reveal
    const heading = sectionRef.current.querySelector('h2');
    const paragraph = sectionRef.current.querySelector('p');
    
    if (heading && paragraph) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
      
      tl.fromTo(
        heading,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 }
      ).fromTo(
        paragraph,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 }, 
        '-=0.4' // Start slightly before the heading animation finishes
      );
    }
    
    // Animate the feature cards
    const featureCards = sectionRef.current.querySelectorAll('.feature-card');
    gsap.fromTo(
      featureCards,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: featureCards[0],
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white dark:bg-black text-black dark:text-white relative overflow-hidden">
      {/* Animated blob backgrounds */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        <BlobBackground color="#2563eb" opacity={0.15} className="left-0 top-0 transform scale-150 translate-x-[-30%] translate-y-[-20%]" />
        <BlobBackground color="#3b82f6" opacity={0.1} className="right-0 bottom-0 transform scale-150 translate-x-[30%] translate-y-[20%]" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-12 w-[10%] h-[1px] bg-gray-300 dark:bg-gray-700 hidden md:block"></div>
      <div className="absolute bottom-1/4 right-12 w-[1px] h-[10%] bg-gray-300 dark:bg-gray-700 hidden md:block"></div>
      <div className="absolute top-1/3 right-[15%] w-[1px] h-[15%] bg-gray-300 dark:bg-gray-700 hidden lg:block"></div>
      <div className="absolute bottom-1/3 left-[15%] w-[8%] h-[1px] bg-gray-300 dark:bg-gray-700 hidden lg:block"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <ScrollReveal animation="fadeUp" className="mb-16 md:mb-20 mx-auto text-center">
          <div className="flex flex-col items-center justify-center gap-2 mb-4">
            <span className="inline-block w-1 h-8 bg-black dark:bg-white"></span>
            <h2 className="text-5xl md:text-6xl font-light text-black dark:text-white tracking-tight uppercase reveal-title text-center">
              The Mercedes-Benz Experience
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-base font-light leading-relaxed reveal-text max-w-3xl mx-auto">
            Discover what sets Mercedes-Benz apart – a legacy of innovation, craftsmanship, and a commitment to excellence.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 p-8 hover:translate-y-[-8px] bg-white dark:bg-black"
            >
              <div className="mb-6 w-16 h-16 border border-gray-300 dark:border-gray-700 flex items-center justify-center group-hover:border-gray-400 dark:group-hover:border-white/50 transition-colors">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-light text-black dark:text-white mb-4 uppercase tracking-wide">{feature.title}</h3>
              <div className="h-[2px] w-12 bg-blue-600 mb-4 group-hover:w-24 transition-all duration-700"></div>
              <p className="text-gray-600 dark:text-gray-400 font-light text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;