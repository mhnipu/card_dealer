import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface VehicleBackgroundProps {
  vehicleImage: string;
  category?: string;
  className?: string;
  collageImages?: string[];
}

const VehicleBackground: React.FC<VehicleBackgroundProps> = ({ 
  vehicleImage,
  category = 'all',
  className = '',
  collageImages = []
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const blobRef = useRef<SVGPathElement>(null);
  const blobRef2 = useRef<SVGPathElement>(null);
  
  // Check if we should show collage (when category is 'all' and we have collage images)
  const showCollage = category.toLowerCase() === 'all' && collageImages.length === 4;
  
  useEffect(() => {
    if (!svgRef.current || !blobRef.current || !blobRef2.current || !containerRef.current) return;
    
    // Get random paths for morphing
    const getRandomPath = () => {
      const paths = [
        "M60.5,-69.3C78.1,-54.9,92.5,-34.8,97.7,-12.5C102.8,9.9,98.7,34.4,85.6,51.3C72.5,68.1,50.4,77.2,27.9,82.1C5.4,87,-17.4,87.7,-38.3,79.9C-59.2,72.1,-78.2,55.9,-87.6,35C-97,14.1,-96.8,-11.5,-87.2,-32C-77.5,-52.6,-58.4,-68.1,-38.6,-81.2C-18.7,-94.2,1.9,-104.9,20.8,-101.4C39.6,-97.9,42.9,-83.7,60.5,-69.3Z",
        "M51.4,-67.8C66.5,-56.7,78.9,-41.4,85.2,-23.1C91.5,-4.8,91.8,16.6,84.4,35C77,53.5,61.9,69.1,43.9,75.7C25.9,82.3,5,79.9,-16.2,76.5C-37.4,73.1,-58.9,68.8,-70.5,55.5C-82.1,42.2,-83.8,20.1,-82.1,0C-80.5,-20.1,-75.6,-40.3,-63.1,-52.5C-50.6,-64.7,-30.3,-68.9,-10.9,-75.5C8.5,-82.1,36.2,-78.9,51.4,-67.8Z",
        "M52.2,-67.4C64.8,-56.1,70.9,-37.1,76.8,-16.9C82.7,3.2,88.5,25.4,81.9,42.3C75.4,59.2,56.6,70.7,36.9,76.5C17.2,82.3,-3.4,82.4,-23.1,77.2C-42.8,72.1,-61.7,61.9,-73.2,45.6C-84.8,29.3,-89,7,-84.2,-11.6C-79.4,-30.2,-65.5,-45.2,-50.1,-56.4C-34.6,-67.7,-17.3,-75.3,1.7,-77.3C20.6,-79.4,39.5,-78.8,52.2,-67.4Z",
        "M47.7,-64.6C62.9,-57.5,77.2,-45.7,81.8,-30.6C86.5,-15.4,81.3,3,73.8,18.6C66.3,34.1,56.4,46.8,43.8,58.9C31.1,71,15.6,82.6,-1.1,84C-17.8,85.5,-35.6,77,-48.1,64.5C-60.5,52,-67.7,35.5,-73.3,17.6C-78.9,-0.4,-83,-19.7,-76.9,-34.5C-70.8,-49.2,-54.5,-59.5,-38.8,-66.1C-23.1,-72.7,-7.7,-75.6,6.5,-73.9C20.6,-72.3,32.5,-71.7,47.7,-64.6Z"
      ];
      return paths[Math.floor(Math.random() * paths.length)];
    };
    
    // Create a timeline for continuous animation for first blob
    const tl1 = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
      yoyo: true
    });
    
    // Store original path for reference
    const originalPath1 = blobRef.current.getAttribute('d') || getRandomPath();
    
    // Animate the blob 1
    tl1.to(blobRef.current, {
      duration: 15,
      ease: "sine.inOut",
      attr: { d: getRandomPath() }
    })
    .to(blobRef.current, {
      duration: 15,
      ease: "sine.inOut",
      attr: { d: getRandomPath() }
    })
    .to(blobRef.current, {
      duration: 15, 
      ease: "sine.inOut",
      attr: { d: originalPath1 }
    });
    
    // Create a timeline for continuous animation for second blob
    const tl2 = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
      yoyo: true
    });
    
    // Store original path for reference
    const originalPath2 = blobRef2.current.getAttribute('d') || getRandomPath();
    
    // Animate the blob 2 with different timing
    tl2.to(blobRef2.current, {
      duration: 18,
      ease: "sine.inOut",
      attr: { d: getRandomPath() }
    })
    .to(blobRef2.current, {
      duration: 18,
      ease: "sine.inOut",
      attr: { d: getRandomPath() }
    })
    .to(blobRef2.current, {
      duration: 18,
      ease: "sine.inOut",
      attr: { d: originalPath2 }
    });
    
    // Add rotation animations with different speeds
    gsap.to(svgRef.current.querySelector('.blob1'), {
      rotation: 360,
      transformOrigin: "center center",
      duration: 180,
      repeat: -1,
      ease: "none"
    });
    
    gsap.to(svgRef.current.querySelector('.blob2'), {
      rotation: -360,
      transformOrigin: "center center",
      duration: 240,
      repeat: -1,
      ease: "none"
    });
    
    // Add image parallax effect
    const imageParallax = gsap.to(containerRef.current.querySelector('.vehicle-bg-image'), {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    return () => {
      tl1.kill();
      tl2.kill();
      imageParallax.kill();
    };
  }, [vehicleImage]);
  
  // Set blob colors based on category
  const getBlobColors = () => {
    switch(category.toLowerCase()) {
      case 'suv': 
        return { primary: '#2f4f4f', secondary: '#708090' };
      case 'sports': 
      case 'coupe': 
        return { primary: '#8b0000', secondary: '#a52a2a' };
      case 'sedan': 
        return { primary: '#2c3e50', secondary: '#34495e' };
      case 'electric': 
        return { primary: '#2980b9', secondary: '#3498db' };
      case 'convertible': 
        return { primary: '#8e44ad', secondary: '#9b59b6' };
      default: 
        return { primary: '#2c3e50', secondary: '#34495e' };
    }
  };
  
  const { primary, secondary } = getBlobColors();
  
  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Vehicle image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="vehicle-bg-image absolute inset-0 w-full h-full">
          {showCollage ? (
            // 4 cars side by side for "All" category
            <div className="flex flex-row h-full w-full relative">
              {collageImages.map((img, index) => (
                <div key={`collage-${index}`} className="relative overflow-hidden w-1/4 h-full">
                  <img
                    src={img}
                    alt={`Vehicle category ${index + 1}`}
                    className="w-full h-full object-cover object-center transition-transform duration-10000 hover:scale-110"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30"></div>
                  
                  {/* Category label */}
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <span className="px-2 py-1 bg-black/40 text-white text-xs uppercase tracking-wider">
                      {index === 0 ? "Sports" : index === 1 ? "Sedan" : index === 2 ? "SUV" : "Electric"}
                    </span>
                  </div>
                  
                  {/* Divider line (except for last item) */}
                  {index < collageImages.length - 1 && (
                    <div className="absolute top-[15%] bottom-[15%] right-0 w-[1px] bg-white/20"></div>
                  )}
                </div>
              ))}
              
              {/* Overlay caption */}
              <div className="absolute top-4 left-0 right-0 text-center z-10">
                <span className="px-4 py-2 bg-black/50 text-white text-sm uppercase tracking-wider">
                  All Vehicle Categories
                </span>
              </div>
            </div>
          ) : (
            // Single image for specific category
            <img 
              src={vehicleImage}
              alt="Vehicle background"
              className="absolute inset-0 w-full h-full object-cover md:object-contain"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40"></div>
        </div>
      </div>
      
      {/* Animated blobs */}
      <svg 
        ref={svgRef}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-full h-full"
        preserveAspectRatio="none"
      >
        <g className="blob1">
          <path
            ref={blobRef}
            d="M47.7,-64.6C62.9,-57.5,77.2,-45.7,81.8,-30.6C86.5,-15.4,81.3,3,73.8,18.6C66.3,34.1,56.4,46.8,43.8,58.9C31.1,71,15.6,82.6,-1.1,84C-17.8,85.5,-35.6,77,-48.1,64.5C-60.5,52,-67.7,35.5,-73.3,17.6C-78.9,-0.4,-83,-19.7,-76.9,-34.5C-70.8,-49.2,-54.5,-59.5,-38.8,-66.1C-23.1,-72.7,-7.7,-75.6,6.5,-73.9C20.6,-72.3,32.5,-71.7,47.7,-64.6Z"
            fill={primary}
            fillOpacity={0.1}
            style={{ transformOrigin: 'center' }}
          />
        </g>
        <g className="blob2">
          <path
            ref={blobRef2}
            d="M52.2,-67.4C64.8,-56.1,70.9,-37.1,76.8,-16.9C82.7,3.2,88.5,25.4,81.9,42.3C75.4,59.2,56.6,70.7,36.9,76.5C17.2,82.3,-3.4,82.4,-23.1,77.2C-42.8,72.1,-61.7,61.9,-73.2,45.6C-84.8,29.3,-89,7,-84.2,-11.6C-79.4,-30.2,-65.5,-45.2,-50.1,-56.4C-34.6,-67.7,-17.3,-75.3,1.7,-77.3C20.6,-79.4,39.5,-78.8,52.2,-67.4Z"
            fill={secondary}
            fillOpacity={0.15}
            style={{ transformOrigin: 'center' }}
          />
        </g>
      </svg>
    </div>
  );
};

export default VehicleBackground; 