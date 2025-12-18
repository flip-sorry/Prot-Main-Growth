import { colors } from '../../../tokens';

interface ViewOptionsIconProps {
  className?: string;
  size?: number;
}

export default function ViewOptionsIcon({ className = '', size = 24 }: ViewOptionsIconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path fillRule="evenodd" clipRule="evenodd" d="M4 12V4H20V12H4ZM18 5.77778H6V10.2222H18V5.77778Z" fill={colors.text.lighter}/>
        <path d="M4 14V16H20V14H4Z" fill={colors.text.lighter}/>
        <path d="M4 18V20H20V18H4Z" fill={colors.text.lighter}/>
      </svg>
    </div>
  );
}

