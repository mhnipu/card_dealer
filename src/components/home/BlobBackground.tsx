import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface BlobBackgroundProps {
  color?: string;
  opacity?: number;
  className?: string;
}

const BlobBackground: React.FC<BlobBackgroundProps> = ({ 
  color = '#000000',
  opacity = 0.1,
  className = ''
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const blobRef = useRef<SVGPathElement>(null);
  
  useEffect(() => {
    if (!svgRef.current || !blobRef.current) return;
    
    // Create a timeline for continuous animation
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
      yoyo: true
    });
    
    // Store original path for reference
    const originalPath = blobRef.current.getAttribute('d') || "M47.7,-64.6C62.9,-57.5,77.2,-45.7,81.8,-30.6C86.5,-15.4,81.3,3,73.8,18.6C66.3,34.1,56.4,46.8,43.8,58.9C31.1,71,15.6,82.6,-1.1,84C-17.8,85.5,-35.6,77,-48.1,64.5C-60.5,52,-67.7,35.5,-73.3,17.6C-78.9,-0.4,-83,-19.7,-76.9,-34.5C-70.8,-49.2,-54.5,-59.5,-38.8,-66.1C-23.1,-72.7,-7.7,-75.6,6.5,-73.9C20.6,-72.3,32.5,-71.7,47.7,-64.6Z";
    
    // Define 3 different blob shapes for morphing
    const paths = [
      "M60.5,-69.3C78.1,-54.9,92.5,-34.8,97.7,-12.5C102.8,9.9,98.7,34.4,85.6,51.3C72.5,68.1,50.4,77.2,27.9,82.1C5.4,87,-17.4,87.7,-38.3,79.9C-59.2,72.1,-78.2,55.9,-87.6,35C-97,14.1,-96.8,-11.5,-87.2,-32C-77.5,-52.6,-58.4,-68.1,-38.6,-81.2C-18.7,-94.2,1.9,-104.9,20.8,-101.4C39.6,-97.9,42.9,-83.7,60.5,-69.3Z",
      "M51.4,-67.8C66.5,-56.7,78.9,-41.4,85.2,-23.1C91.5,-4.8,91.8,16.6,84.4,35C77,53.5,61.9,69.1,43.9,75.7C25.9,82.3,5,79.9,-16.2,76.5C-37.4,73.1,-58.9,68.8,-70.5,55.5C-82.1,42.2,-83.8,20.1,-82.1,0C-80.5,-20.1,-75.6,-40.3,-63.1,-52.5C-50.6,-64.7,-30.3,-68.9,-10.9,-75.5C8.5,-82.1,36.2,-78.9,51.4,-67.8Z",
      "M52.2,-67.4C64.8,-56.1,70.9,-37.1,76.8,-16.9C82.7,3.2,88.5,25.4,81.9,42.3C75.4,59.2,56.6,70.7,36.9,76.5C17.2,82.3,-3.4,82.4,-23.1,77.2C-42.8,72.1,-61.7,61.9,-73.2,45.6C-84.8,29.3,-89,7,-84.2,-11.6C-79.4,-30.2,-65.5,-45.2,-50.1,-56.4C-34.6,-67.7,-17.3,-75.3,1.7,-77.3C20.6,-79.4,39.5,-78.8,52.2,-67.4Z"
    ];
    
    // Animate the blob
    tl.to(blobRef.current, {
      duration: 8,
      ease: "sine.inOut",
      attr: { d: paths[0] }
    })
    .to(blobRef.current, {
      duration: 8,
      ease: "sine.inOut",
      attr: { d: paths[1] }
    })
    .to(blobRef.current, {
      duration: 8,
      ease: "sine.inOut",
      attr: { d: paths[2] }
    })
    .to(blobRef.current, {
      duration: 8,
      ease: "sine.inOut",
      attr: { d: originalPath }
    });
    
    // Also add a subtle rotation animation
    gsap.to(svgRef.current, {
      rotation: 360,
      transformOrigin: "center center",
      duration: 120,
      repeat: -1,
      ease: "none"
    });
    
    return () => {
      tl.kill();
    };
  }, []);
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg 
        ref={svgRef}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          ref={blobRef}
          d="M47.7,-64.6C62.9,-57.5,77.2,-45.7,81.8,-30.6C86.5,-15.4,81.3,3,73.8,18.6C66.3,34.1,56.4,46.8,43.8,58.9C31.1,71,15.6,82.6,-1.1,84C-17.8,85.5,-35.6,77,-48.1,64.5C-60.5,52,-67.7,35.5,-73.3,17.6C-78.9,-0.4,-83,-19.7,-76.9,-34.5C-70.8,-49.2,-54.5,-59.5,-38.8,-66.1C-23.1,-72.7,-7.7,-75.6,6.5,-73.9C20.6,-72.3,32.5,-71.7,47.7,-64.6Z"
          fill={color}
          fillOpacity={opacity}
        />
      </svg>
    </div>
  );
};

export default BlobBackground; 