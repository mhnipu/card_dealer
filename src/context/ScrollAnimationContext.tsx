import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface ScrollAnimationContextType {
  smoother: ScrollSmoother | null;
}

const ScrollAnimationContext = createContext<ScrollAnimationContextType>({
  smoother: null
});

export const useScrollAnimation = () => useContext(ScrollAnimationContext);

interface ScrollAnimationProviderProps {
  children: ReactNode;
}

export const ScrollAnimationProvider: React.FC<ScrollAnimationProviderProps> = ({ children }) => {
  const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create ScrollSmoother
    if (smoothWrapperRef.current && smoothContentRef.current) {
      const smootherInstance = ScrollSmoother.create({
        wrapper: smoothWrapperRef.current,
        content: smoothContentRef.current,
        smooth: 1.5, // Adjust the smooth scrolling speed (higher = slower)
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true
      });

      setSmoother(smootherInstance);

      // Refresh ScrollTrigger when all images are loaded
      window.addEventListener('load', () => {
        ScrollTrigger.refresh();
        smootherInstance.refresh();
      });

      // Refresh on resize
      window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
        smootherInstance.refresh();
      });

      // Cleanup on unmount
      return () => {
        smootherInstance.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        window.removeEventListener('load', () => ScrollTrigger.refresh());
        window.removeEventListener('resize', () => ScrollTrigger.refresh());
      };
    }
  }, []);

  return (
    <ScrollAnimationContext.Provider value={{ smoother }}>
      <div ref={smoothWrapperRef} id="smooth-wrapper" className="smooth-wrapper">
        <div ref={smoothContentRef} id="smooth-content" className="smooth-content">
          {children}
        </div>
      </div>
    </ScrollAnimationContext.Provider>
  );
};

// Wrapper component for parallax effects
interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export const Parallax: React.FC<ParallaxProps> = ({ 
  children, 
  speed = 0.5, 
  className = ''
}) => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { smoother } = useScrollAnimation();

  useEffect(() => {
    const element = parallaxRef.current;
    if (!element) return;

    // Use smoother effects if smoother is available
    if (smoother) {
      smoother.effects(element, { speed });
    } else {
      // Fallback to regular GSAP parallax
      gsap.to(element, {
        y: () => (window.innerHeight * speed * -1),
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }, [speed, smoother]);

  return (
    <div ref={parallaxRef} className={`parallax-element ${className}`} data-speed={speed}>
      {children}
    </div>
  );
};

// Wrapper component for scroll-triggered animations
interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'fadeIn' | 'scale';
  delay?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  animation = 'fadeUp', 
  delay = 0, 
  className = '' 
}) => {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = revealRef.current;
    if (!element) return;

    let from = {};
    switch (animation) {
      case 'fadeUp':
        from = { opacity: 0, y: 50 };
        break;
      case 'fadeLeft':
        from = { opacity: 0, x: -50 };
        break;
      case 'fadeRight':
        from = { opacity: 0, x: 50 };
        break;
      case 'scale':
        from = { opacity: 0, scale: 0.9 };
        break;
      default:
        from = { opacity: 0 };
    }

    gsap.fromTo(
      element,
      from,
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }, [animation, delay]);

  return (
    <div ref={revealRef} className={`scroll-reveal ${className}`} data-animation={animation}>
      {children}
    </div>
  );
};

export default ScrollAnimationProvider; 