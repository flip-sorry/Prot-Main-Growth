interface CalendarIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function CalendarIcon({ 
  className = '', 
  size = 16, 
  color = '#767676' 
}: CalendarIconProps) {
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
        <path d="M11 14V12H13V14H11ZM7 14V12H9V14H7ZM15 14V12H17V14H15ZM11 18V16H13V18H11ZM7 18V16H9V18H7ZM15 18V16H17V18H15ZM3 22V4H6V2H8V4H16V2H18V4H21V22H3ZM5 20H19V10H5V20ZM5 8H19V6H5V8Z" fill={color}/>
      </svg>
    </div>
  );
}

