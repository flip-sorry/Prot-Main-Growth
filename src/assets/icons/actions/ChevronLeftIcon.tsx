interface ChevronLeftIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function ChevronLeftIcon({ 
  className = '', 
  size = 16, 
  color = '#767676' 
}: ChevronLeftIconProps) {
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
        <path fillRule="evenodd" clipRule="evenodd" d="M10 4.24901L6.46 7.99967L10 11.7503L9.10333 12.6657L4.66733 7.99967L9.10333 3.33301L10 4.24901Z" fill={color}/>
      </svg>
    </div>
  );
}

