import { colors } from '../../../tokens';

interface DocumentPortraitIconProps {
  className?: string;
  size?: number;
}

export default function DocumentPortraitIcon({ className = '', size = 24 }: DocumentPortraitIconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.33331 1.66666V18.3333H16.6666V5.83249L12.5 1.66666H3.33331ZM4.99998 3.33332H10.8333V7.49999H15V16.6667H4.99998V3.33332Z" fill={colors.text.lighter}/>
      </svg>
    </div>
  );
}

