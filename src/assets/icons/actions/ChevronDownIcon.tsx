import { colors } from '../../../tokens';

interface ChevronDownIconProps {
  className?: string;
  size?: number;
  color?: 'default' | 'white';
}

export default function ChevronDownIcon({ className = '', size = 24, color = 'default' }: ChevronDownIconProps) {
  const fillColor = color === 'white' ? '#ffffff' : colors.text.lighter;
  
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path fillRule="evenodd" clipRule="evenodd" d="M7 10H17L12 15L7 10Z" fill={fillColor}/>
      </svg>
    </div>
  );
}

