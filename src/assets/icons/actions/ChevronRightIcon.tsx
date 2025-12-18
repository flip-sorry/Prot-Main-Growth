interface ChevronRightIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function ChevronRightIcon({ 
  className = '', 
  size = 16, 
  color = '#767676' 
}: ChevronRightIconProps) {
  return (
    <div 
      className={`relative shrink-0 ${className}`} 
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 16 16" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full"
      >
        <path fillRule="evenodd" clipRule="evenodd" d="M6 4.24901L9.54 7.99967L6 11.7503L6.89667 12.6657L11.3327 7.99967L6.89667 3.33301L6 4.24901Z" fill={color}/>
      </svg>
    </div>
  );
}

