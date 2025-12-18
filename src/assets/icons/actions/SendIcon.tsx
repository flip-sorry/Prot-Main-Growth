import { colors } from '../../../tokens';

interface SendIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function SendIcon({ className = '', size = 24, color }: SendIconProps) {
  const fillColor = color || colors.primary.base;
  
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M3 20V4L22 12L3 20ZM5 17L16.85 12L5 7V10.5L11 12L5 13.5V17Z" fill={fillColor}/>
      </svg>
    </div>
  );
}

