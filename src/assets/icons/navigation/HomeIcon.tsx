import { colors } from '../../../tokens';

interface HomeIconProps {
  className?: string;
  size?: number;
}

export default function HomeIcon({ className = '', size = 20 }: HomeIconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path fillRule="evenodd" clipRule="evenodd" d="M10 1.66669L2.5 7.50002V17.5H12.5L17.5 12.5V7.50002L10 1.66669ZM15.8333 11.6667H11.6667V15.8334L15.8333 11.6667Z" fill={colors.primary.base}/>
      </svg>
    </div>
  );
}

