import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const mMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const mDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 150);
    };

    const mUp = () => {
      setClicked(false);
    };

    const mLeave = () => {
      setVisible(false);
    };

    const hoverCheck = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer');
      
      setLinkHovered(isLink);
    };

    // Add event listeners
    window.addEventListener('mousemove', mMove);
    window.addEventListener('mousedown', mDown);
    window.addEventListener('mouseup', mUp);
    window.addEventListener('mouseleave', mLeave);
    window.addEventListener('mouseover', hoverCheck);

    // Clean up event listeners
    return () => {
      window.removeEventListener('mousemove', mMove);
      window.removeEventListener('mousedown', mDown);
      window.removeEventListener('mouseup', mUp);
      window.removeEventListener('mouseleave', mLeave);
      window.removeEventListener('mouseover', hoverCheck);
    };
  }, []);

  // Only show on large screens
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    return null;
  }

  return (
    <>
      <div 
        className={`custom-cursor ${!visible ? 'opacity-0' : 'opacity-100'} ${clicked ? 'scale-50' : ''} ${linkHovered ? 'cursor-hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
      <div 
        className={`cursor-dot ${!visible ? 'opacity-0' : 'opacity-100'} ${clicked ? 'scale-75' : ''} ${linkHovered ? 'dot-hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
    </>
  );
};

export default CustomCursor; 