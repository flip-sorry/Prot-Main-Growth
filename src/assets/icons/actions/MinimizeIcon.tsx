import { colors } from '../../../tokens';

interface MinimizeIconProps {
  className?: string;
  size?: number;
  color?: 'default' | 'white';
}

export default function MinimizeIcon({ className = '', size = 24, color = 'default' }: MinimizeIconProps) {
  const fillColor = color === 'white' ? '#ffffff' : colors.text.dark;
  
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M5 12H19" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}


