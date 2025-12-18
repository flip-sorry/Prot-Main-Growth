import { colors } from '../../../tokens';

interface DocumentImageIconProps {
  className?: string;
  size?: number;
}

export default function DocumentImageIcon({ className = '', size = 24 }: DocumentImageIconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M4 20V4H20V20H4ZM6 18H18V15H16C15.5 15.6333 14.9042 16.125 14.2125 16.475C13.5208 16.825 12.7833 17 12 17C11.2167 17 10.4792 16.825 9.7875 16.475C9.09583 16.125 8.5 15.6333 8 15H6V18ZM12 15C12.6333 15 13.2083 14.8167 13.725 14.45C14.2417 14.0833 14.6 13.6 14.8 13H18V6H6V13H9.2C9.4 13.6 9.75833 14.0833 10.275 14.45C10.7917 14.8167 11.3667 15 12 15Z" fill={colors.text.lighter}/>
      </svg>
    </div>
  );
}

