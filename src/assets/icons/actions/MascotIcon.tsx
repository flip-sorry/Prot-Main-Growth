import { useState, useEffect, useRef } from 'react';

interface MascotIconProps {
  className?: string;
  size?: number;
}

// Original eye positions in SVG viewBox coordinates
const LEFT_EYE_CENTER = { x: 10.9286, y: 18.6429 };
const RIGHT_EYE_CENTER = { x: 25.0714, y: 18.6429 };
const MAX_EYE_MOVEMENT = 1.0; // Maximum movement radius in viewBox units (~1px)
const EYE_RADIUS = 1.28571;
const CLOSE_DISTANCE_THRESHOLD = 40; // Distance in screen pixels to return eyes to default

export default function MascotIcon({ 
  className = '', 
  size = 36
}: MascotIconProps) {
  const [mousePos, setMousePos] = useState<{ 
    svgX: number; 
    svgY: number; 
    screenX: number; 
    screenY: number;
    iconCenterX: number;
    iconCenterY: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const iconCenterScreenX = rect.left + rect.width / 2;
        const iconCenterScreenY = rect.top + rect.height / 2;
        
        // Convert screen coordinates to SVG viewBox coordinates (0-36)
        const svgX = ((e.clientX - rect.left) / rect.width) * 36;
        const svgY = ((e.clientY - rect.top) / rect.height) * 36;
        
        setMousePos({ 
          svgX, 
          svgY,
          screenX: e.clientX,
          screenY: e.clientY,
          iconCenterX: iconCenterScreenX,
          iconCenterY: iconCenterScreenY,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate eye offset from center based on cursor
  const calculateEyeOffset = (eyeCenter: { x: number; y: number }) => {
    if (!mousePos) {
      return { x: 0, y: 0 };
    }

    // Check if cursor is within 40px radius of icon center (in screen pixels)
    const distanceToIconCenter = Math.sqrt(
      Math.pow(mousePos.screenX - mousePos.iconCenterX, 2) + 
      Math.pow(mousePos.screenY - mousePos.iconCenterY, 2)
    );

    // Return eyes to default position if cursor is too close
    if (distanceToIconCenter < CLOSE_DISTANCE_THRESHOLD) {
      return { x: 0, y: 0 };
    }

    // Calculate vector from eye center to cursor (in SVG coordinates)
    const dx = mousePos.svgX - eyeCenter.x;
    const dy = mousePos.svgY - eyeCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Clamp distance to max movement radius
    if (distance <= MAX_EYE_MOVEMENT) {
      return { x: dx, y: dy };
    }

    // Calculate angle and apply max distance
    const angle = Math.atan2(dy, dx);
    return {
      x: Math.cos(angle) * MAX_EYE_MOVEMENT,
      y: Math.sin(angle) * MAX_EYE_MOVEMENT,
    };
  };

  const leftEyeOffset = calculateEyeOffset(LEFT_EYE_CENTER);
  const rightEyeOffset = calculateEyeOffset(RIGHT_EYE_CENTER);

  return (
    <div 
      ref={containerRef}
      className={`relative shrink-0 ${className}`} 
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 36 36" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full"
      >
        <path d="M14.1429 22.5H21.8571L22.8214 12.5357L30.8571 14.1429L33.4286 25.0714L26.3571 27L21.8571 22.5V25.0714L18.6429 27.6429H17.3571L14.1429 25.0714V22.5L9.64286 27L2.57143 25.0714L5.14286 14.1429L13.1786 12.5357L14.1429 22.5Z" fill="#2F2F2F"/>
        <path d="M2.25 9.32144L9.32143 2.25001L4.17857 0.964294L0.964287 4.17858L2.25 9.32144Z" fill="#2F2F2F"/>
        <path d="M31.8214 0.964294L26.6786 2.25001L33.75 9.32144L35.0357 4.17858L31.8214 0.964294Z" fill="#2F2F2F"/>
        <path d="M17.3571 25.0714H14.1429L17.3571 27.6428V25.0714Z" fill="black"/>
        <path d="M18.6429 25.0714V27.6428L21.8571 25.0714H18.6429Z" fill="black"/>
        <path d="M0.964287 4.17856L2.25 9.32142L3.53572 4.82142L0.964287 4.17856Z" fill="black"/>
        <path d="M33.75 9.32142L32.4643 4.82142L35.0357 4.17856L33.75 9.32142Z" fill="black"/>
        <circle 
          cx={LEFT_EYE_CENTER.x} 
          cy={LEFT_EYE_CENTER.y} 
          r={EYE_RADIUS} 
          fill="white"
          transform={`translate(${leftEyeOffset.x}, ${leftEyeOffset.y})`}
          style={{ transition: 'transform 0.15s ease-out' }}
        />
        <circle 
          cx={RIGHT_EYE_CENTER.x} 
          cy={RIGHT_EYE_CENTER.y} 
          r={EYE_RADIUS} 
          fill="white"
          transform={`translate(${rightEyeOffset.x}, ${rightEyeOffset.y})`}
          style={{ transition: 'transform 0.15s ease-out' }}
        />
      </svg>
    </div>
  );
}

