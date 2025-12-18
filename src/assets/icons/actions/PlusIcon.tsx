import { colors } from '../../../tokens';

interface PlusIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function PlusIcon({ className = '', size = 24, color = 'white' }: PlusIconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path fillRule="evenodd" clipRule="evenodd" d="M11 5V11H5V13H11V19H13V13H19V11H13V5H11Z" fill={color}/>
      </svg>
    </div>
  );
}

