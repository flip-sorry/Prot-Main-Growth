interface VideoPlayIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function VideoPlayIcon({ 
  className = '', 
  size = 24, 
  color = '#767676' 
}: VideoPlayIconProps) {
  return (
    <div 
      className={`relative shrink-0 ${className}`} 
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full"
      >
        <path d="M16 12L10 16V8L16 12Z" fill={color}/>
        <path fillRule="evenodd" clipRule="evenodd" d="M3 12C3 7.029 7.029 3 12 3C16.971 3 21 7.029 21 12C21 16.971 16.971 21 12 21C7.029 21 3 16.971 3 12ZM5 12C5 15.86 8.141 19 12 19C15.859 19 19 15.86 19 12C19 8.14 15.859 5 12 5C8.141 5 5 8.14 5 12Z" fill={color}/>
      </svg>
    </div>
  );
}

