interface SparkleOutlineIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function SparkleOutlineIcon({ 
  className = '', 
  size = 24, 
  color = '#767676' 
}: SparkleOutlineIconProps) {
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
        <path 
          d="M9.66699 6.33301L14 8L9.66699 9.66699L8 14L6.33301 9.66699L2 8L6.33301 6.33301L8 2L9.66699 6.33301ZM7.26172 7.26172L5.3418 8L7.26172 8.73828L8 10.6572L8.73828 8.73828L10.6572 8L8.73828 7.26172L8 5.3418L7.26172 7.26172Z" 
          fill={color}
        />
      </svg>
    </div>
  );
}

