import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { vehiclesData } from '../../utils/data';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  count: number;
  isActive?: boolean;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  image,
  count,
  isActive = false,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Get 4 random car images for the "all" category collage
  const getCollageImages = () => {
    if (id.toLowerCase() !== 'all') return [];
    
    // Shuffle the vehiclesData array and get 4 different images
    const shuffled = [...vehiclesData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4).map(car => car.image);
  };
  
  const collageImages = getCollageImages();
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    // Card hover animations
    const card = cardRef.current;
    const imageElements = card.querySelectorAll('.category-image');
    const overlay = card.querySelector('.category-overlay');
    const content = card.querySelector('.category-content');
    
    // Hover effects
    card.addEventListener('mouseenter', () => {
      gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
      gsap.to(imageElements, { scale: 1.1, duration: 0.5 });
      gsap.to(content, { y: -10, duration: 0.3 });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(overlay, { opacity: 0.5, duration: 0.3 });
      gsap.to(imageElements, { scale: 1.05, duration: 0.5 });
      gsap.to(content, { y: 0, duration: 0.3 });
    });
    
    // Initialize with scaled image
    gsap.set(imageElements, { scale: 1.05 });
    
    return () => {
      // Clean up event listeners
      card.removeEventListener('mouseenter', () => {});
      card.removeEventListener('mouseleave', () => {});
    };
  }, []);
  
  // Handle view all click
  const handleViewAllClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    console.log('Navigating to vehicles with category:', id.toLowerCase());
    navigate(`/vehicles/${id.toLowerCase()}`);
  };
  
  return (
    <div 
      ref={cardRef}
      className={`relative overflow-hidden cursor-pointer h-full min-h-[180px] sm:min-h-[200px] rounded-sm
                 ${isActive ? 'ring-2 ring-white/60' : 'ring-0'}
                 transition-all duration-300`}
      onClick={onClick}
    >
      <div className="absolute inset-0 w-full h-full">
        {id.toLowerCase() === 'all' && collageImages.length === 4 ? (
          // Collage for "All" category
          <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
            {collageImages.map((img, index) => (
              <div key={index} className="relative overflow-hidden">
                <img 
                  src={img} 
                  alt={`Car ${index + 1}`} 
                  className="category-image absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700"
                  loading={index === 0 ? "eager" : "lazy"}
                  width="400"
                  height="300"
                />
              </div>
            ))}
          </div>
        ) : (
          // Single image for other categories
          <img 
            src={image} 
            alt={name} 
            className="category-image absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700"
            loading="lazy"
            width="400"
            height="300"
          />
        )}
        <div className="category-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-50 transition-opacity duration-300"></div>
      </div>
      
      <div className="category-content absolute inset-0 flex flex-col justify-end p-4 sm:p-6 transition-all duration-300">
        <h3 className="text-xl sm:text-2xl font-light mb-1 uppercase tracking-wide text-white">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-white/70 text-xs sm:text-sm font-light">{count} {count === 1 ? 'model' : 'models'}</span>
          
          <div className="inline-block">
            <button 
              onClick={handleViewAllClick}
              className="text-white/80 text-xs uppercase tracking-wider font-light group bg-transparent border-0"
            >
              View All
              <div className="h-[1px] bg-white/40 w-full mt-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Active indicator */}
      {isActive && (
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></div>
      )}
    </div>
  );
};

export default CategoryCard; 