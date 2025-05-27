import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '../../utils/cn';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, className, index = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: index * 0.1,
      scrollTrigger: {
        trigger: card,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
      }
    });

    // Hover animation
    const hoverAnimation = gsap.to(card, {
      y: -10,
      scale: 1.02,
      duration: 0.3,
      paused: true
    });

    card.addEventListener('mouseenter', () => hoverAnimation.play());
    card.addEventListener('mouseleave', () => hoverAnimation.reverse());

    return () => {
      card.removeEventListener('mouseenter', () => hoverAnimation.play());
      card.removeEventListener('mouseleave', () => hoverAnimation.reverse());
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={cn(
        'transform transition-shadow duration-300 hover:shadow-xl',
        className
      )}
    >
      {children}
    </div>
  );
};