import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect, useState } from 'react';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 3D Tilt Effect Hook
export const use3DTilt = (ref: React.RefObject<HTMLElement>, intensity: number = 20) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top; // y position within the element
      
      const xPercent = x / rect.width;
      const yPercent = y / rect.height;
      
      // Calculate rotation values
      const rotateY = (xPercent - 0.5) * intensity; // -10 to 10 degrees
      const rotateX = (0.5 - yPercent) * intensity; // -10 to 10 degrees
      
      // Apply rotation and add slight scale effect
      gsap.to(element, {
        rotationY: rotateY,
        rotationX: rotateX,
        scale: 1.03,
        ease: 'power2.out',
        duration: 0.5,
        transformPerspective: 1000,
        transformOrigin: 'center'
      });
    };
    
    const handleMouseLeave = () => {
      // Reset to original position
      gsap.to(element, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        ease: 'power2.out',
        duration: 0.7
      });
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, intensity]);
};

// Magnetic Button Effect
export const useMagneticEffect = (ref: React.RefObject<HTMLElement>, intensity: number = 0.5) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const magneticArea = 100; // The area in px around the element that will trigger the magnetic effect
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Apply magnetic effect only if mouse is within the magnetic area
      if (distance < magneticArea) {
        // Calculate move distance with a decreasing effect as it gets closer to the edge
        const moveX = distanceX * intensity * (1 - distance / magneticArea);
        const moveY = distanceY * intensity * (1 - distance / magneticArea);
        
        gsap.to(element, {
          x: moveX,
          y: moveY,
          ease: 'power2.out',
          duration: 0.3
        });
      } else {
        // Return to original position
        gsap.to(element, {
          x: 0,
          y: 0,
          ease: 'power2.out',
          duration: 0.5
        });
      }
    };
    
    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        ease: 'elastic.out(1, 0.3)',
        duration: 1
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, intensity]);
};

// Liquid Button Effect
export const useLiquidEffect = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    // Add liquid effect on hover
    element.addEventListener('mouseenter', () => {
      // Create a timeline for liquid animation
      const tl = gsap.timeline();
      
      tl.to(element, {
        borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
        duration: 0.5,
        ease: 'sine.out'
      })
      .to(element, {
        borderRadius: '70% 30% 30% 70% / 60% 40% 70% 40%',
        duration: 0.5,
        ease: 'sine.out'
      })
      .to(element, {
        borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
        duration: 0.5,
        ease: 'sine.out'
      })
      .to(element, {
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        duration: 0.5,
        ease: 'sine.out'
      });
    });
    
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        borderRadius: '0%',
        duration: 0.7,
        ease: 'power2.out'
      });
    });
  }, [ref]);
};

// Text Scramble Effect (Matrix-like)
export const useTextScramble = () => {
  // Characters to use in scramble effect
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
  
  return (element: HTMLElement, newText: string) => {
    let oldText = element.innerText;
    let frame = 0;
    const totalFrames = 20; // More frames = longer animation
    const frameRate = 30; // ms
    
    const update = () => {
      let newTextArray = [];
      let completed = 0;
      
      for (let i = 0; i < newText.length; i++) {
        // If the current character matches the final character and we're past the frame threshold
        if (i < oldText.length && frame / totalFrames > i / newText.length) {
          newTextArray[i] = newText[i];
          completed++;
        } else {
          newTextArray[i] = chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      element.innerText = newTextArray.join('');
      
      if (completed < newText.length) {
        frame++;
        setTimeout(update, frameRate);
      }
    };
    
    update();
  };
};

// Parallax Mouse Movement for Hero Section
export const useMouseParallax = (containerRef: React.RefObject<HTMLElement>, layers: string[] = []) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // Get viewport dimensions
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Calculate movement values normalized from -1 to 1
      const moveX = (x - width / 2) / (width / 2);
      const moveY = (y - height / 2) / (height / 2);
      
      // Apply parallax to each layer with different intensities
      layers.forEach((layerClass, index) => {
        const layer = container.querySelector(layerClass);
        if (!layer) return;
        
        // Increase intensity for deeper layers
        const intensity = (index + 1) * 15;
        
        gsap.to(layer, {
          x: moveX * intensity,
          y: moveY * intensity,
          duration: 1,
          ease: 'power2.out'
        });
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [containerRef, layers]);
};

// Scroll Speed Controller
export const useScrollSpeedController = (sections: string[]) => {
  useEffect(() => {
    // Create different scroll speeds for different sections
    sections.forEach((sectionSelector, index) => {
      const section = document.querySelector(sectionSelector);
      if (!section) return;
      
      // Calculate scroll speed factor (1 = normal, >1 = slower, <1 = faster)
      // Alternate between fast and slow for dramatic effect
      const speedFactor = index % 2 === 0 ? 0.5 : 1.5;
      
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          // Apply custom scroll speed by modifying the default scrollTop
          if (self.direction === 1) { // Scrolling down
            window.scrollBy(0, (1 - speedFactor) * 0.5);
          } else { // Scrolling up
            window.scrollBy(0, (1 - speedFactor) * -0.5);
          }
        }
      });
    });
  }, [sections]);
};

// Reveal Text Letter by Letter
export const useLetterReveal = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    // Split text into spans for each letter
    const text = element.innerText;
    element.innerHTML = '';
    
    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.innerText = char;
      span.style.opacity = '0';
      span.style.display = 'inline-block';
      element.appendChild(span);
    });
    
    // Create scroll trigger animation
    gsap.fromTo(
      element.children,
      { opacity: 0, y: 20, rotationY: 90 },
      {
        opacity: 1, 
        y: 0,
        rotationY: 0,
        stagger: 0.03,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, [ref]);
};

// Car engine sound effect that increases on scroll
export const useEngineSound = (containerRef: React.RefObject<HTMLElement>) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Create audio element for engine sound
    const audio = new Audio('/engine-sound.mp3'); // You need to add this audio file to your public folder
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    
    // Create scroll trigger to control engine volume
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        // Increase volume based on scroll progress
        if (audioRef.current) {
          audioRef.current.volume = Math.min(self.progress * 0.2, 0.2); // Cap at 0.2 volume
        }
      },
      onEnter: () => {
        audio.play().catch(() => {
          // Handle autoplay restrictions
          console.log('Audio autoplay prevented');
        });
      },
      onLeave: () => {
        if (audioRef.current) {
          audioRef.current.volume = 0;
        }
      }
    });
    
    // Clean up
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [containerRef]);
};

// Progressive image loading with blur effect
export const useProgressiveImage = (lowQualitySrc: string, highQualitySrc: string) => {
  const [src, setSrc] = useState(lowQualitySrc);
  
  useEffect(() => {
    const img = new Image();
    img.src = highQualitySrc;
    img.onload = () => {
      setSrc(highQualitySrc);
    };
  }, [highQualitySrc]);
  
  return { src, blur: src === lowQualitySrc };
};

// Create canvas particles animation
export const useParticleAnimation = (canvasRef: React.RefObject<HTMLCanvasElement>, particleCount: number = 100) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX *= -1;
        }
        
        if (this.y > canvas.height || this.y < 0) {
          this.speedY *= -1;
        }
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      // Clear canvas with semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, [canvasRef, particleCount]);
};

// SVG path animation based on scroll
export const useSvgPathAnimation = (svgRef: React.RefObject<SVGElement>, duration: number = 2) => {
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    
    const paths = svg.querySelectorAll('path');
    
    paths.forEach(path => {
      // Get the total length of the path
      const length = path.getTotalLength();
      
      // Set up initial styles
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1
      });
      
      // Animate the path when it enters the viewport
      gsap.to(path, {
        strokeDashoffset: 0,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: svg,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
  }, [svgRef, duration]);
};

export { useRef, useEffect }; 