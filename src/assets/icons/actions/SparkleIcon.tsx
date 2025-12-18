interface SparkleIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function SparkleIcon({ className = '', size = 24, color = '#2F2F2F' }: SparkleIconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M9.5 9.5L12 3L14.5 9.5L21 12L14.5 14.5L12 21L9.5 14.5L3 12L9.5 9.5Z" fill={color}/>
      </svg>
    </div>
  );
}

