import { colors } from '../../../tokens';

interface CheckmarkIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function CheckmarkIcon({ className = '', size = 16, color }: CheckmarkIconProps) {
  const fillColor = color || colors.text.lighter;
  
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path fillRule="evenodd" clipRule="evenodd" d="M13.7234 3.33337L6.47373 10.7329L2.94265 7.12813L2 8.09162L5.53108 11.6957L5.52241 11.7039L6.46572 12.6667L6.47373 12.6579L6.4824 12.6667L7.42638 11.7039L7.41771 11.6957L14.6667 4.29619L13.7234 3.33337Z" fill={fillColor}/>
      </svg>
    </div>
  );
}

