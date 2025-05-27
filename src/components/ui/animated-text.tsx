import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '../../utils/cn';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className, once = true }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (once && hasAnimated.current) return;

    const words = textRef.current?.querySelectorAll('.word');
    if (!words) return;

    gsap.from(words, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top bottom-=100',
        toggleActions: once ? 'play none none none' : 'play none none reverse'
      }
    });

    hasAnimated.current = true;
  }, [once]);

  return (
    <div ref={textRef} className={cn('overflow-hidden', className)}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="word inline-block mr-[0.25em]">
          {word}
        </span>
      ))}
    </div>
  );
};