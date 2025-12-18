interface MascotIconProps {
  className?: string;
  size?: number;
}

export default function MascotIcon({ 
  className = '', 
  size = 36
}: MascotIconProps) {
  return (
    <div 
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
        <circle cx="10.9286" cy="18.6429" r="1.28571" fill="white"/>
        <circle cx="25.0714" cy="18.6429" r="1.28571" fill="white"/>
      </svg>
    </div>
  );
}

