import { colors } from '../../../tokens';

interface SearchIconProps {
  className?: string;
  size?: number;
}

export default function SearchIcon({ className = '', size = 20 }: SearchIconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="9" cy="9" r="6" stroke={colors.text.lighter} strokeWidth="1.5" fill="none" />
        <path d="M13 13L17 17" stroke={colors.text.lighter} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

