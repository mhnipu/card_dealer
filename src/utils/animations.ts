import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Reusable animation variants for Framer Motion
export const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.1, 0.25, 1] 
    }
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.1, 0.25, 1] 
    }
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.1, 0.25, 1] 
    }
  }
};

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.1, 0.25, 1] 
    }
  }
};

export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Hook for creating parallax effect
export const useParallax = (selector: string, speed: number = 0.2) => {
  useGSAP(() => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element) => {
      gsap.to(element, {
        y: () => `-${window.innerHeight * speed}`,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }, []);
};

// Hook for scroll-triggered animations
export const useScrollAnimation = (selector: string, animation: object) => {
  useGSAP(() => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          ...animation
        }
      );
    });
  }, []);
};

// Hook for scroll-triggered reveal animations
export const useRevealAnimation = (containerRef: React.RefObject<HTMLElement>) => {
  useGSAP(() => {
    if (!containerRef.current) return;
    
    const titles = containerRef.current.querySelectorAll('.reveal-title');
    const texts = containerRef.current.querySelectorAll('.reveal-text');
    const images = containerRef.current.querySelectorAll('.reveal-image');
    const cards = containerRef.current.querySelectorAll('.reveal-card');
    const buttons = containerRef.current.querySelectorAll('.reveal-button');
    
    // Animate titles
    titles.forEach((title) => {
      gsap.fromTo(
        title,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
    
    // Animate texts
    texts.forEach((text) => {
      gsap.fromTo(
        text,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: text,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
    
    // Animate images with a slight parallax effect
    images.forEach((image) => {
      gsap.fromTo(
        image,
        { opacity: 0, y: 30, scale: 1.05 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          scrollTrigger: {
            trigger: image,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
    
    // Animate cards with stagger
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: cards[0],
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Animate buttons
    buttons.forEach((button) => {
      gsap.fromTo(
        button,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.4,
          scrollTrigger: {
            trigger: button,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, []);
  
  return containerRef;
};

// Component wrapper for scroll animations
export const useComponentAnimation = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!componentRef.current) return;
    
    // Create a timeline for this component
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: componentRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
    
    // Select elements within the component
    const elements = componentRef.current.querySelectorAll('[data-animate]');
    
    // Add animations to timeline
    tl.fromTo(
      elements,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.7, 
        stagger: 0.1,
        ease: 'power2.out'
      }
    );
  }, []);
  
  return componentRef;
}; 