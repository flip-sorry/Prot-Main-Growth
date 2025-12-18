import { colors } from '../../../tokens';

interface MoreOptionsIconProps {
  className?: string;
  size?: number;
}

export default function MoreOptionsIcon({ className = '', size = 20 }: MoreOptionsIconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="10" cy="4" r="1.5" fill={colors.text.lighter} />
        <circle cx="10" cy="10" r="1.5" fill={colors.text.lighter} />
        <circle cx="10" cy="16" r="1.5" fill={colors.text.lighter} />
      </svg>
    </div>
  );
}

