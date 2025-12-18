import { colors } from '../../../tokens';

interface CloseIconProps {
  className?: string;
  size?: number;
  color?: 'default' | 'white';
}

export default function CloseIcon({ className = '', size = 24, color = 'default' }: CloseIconProps) {
  const fillColor = color === 'white' ? '#ffffff' : '#767676';
  
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path fillRule="evenodd" clipRule="evenodd" d="M17.4444 5L12.0005 10.444L6.55556 5L5 6.55556L10.444 12.0005L5 17.4444L6.55556 19L12.0005 13.5551L17.4444 19L19 17.4444L13.556 12.0005L19 6.55556L17.4444 5Z" fill={fillColor}/>
      </svg>
    </div>
  );
}


