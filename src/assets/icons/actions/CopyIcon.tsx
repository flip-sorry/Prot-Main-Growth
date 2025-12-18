import { colors } from '../../../tokens';

interface CopyIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function CopyIcon({ className = '', size = 16, color }: CopyIconProps) {
  const fillColor = color || colors.text.lighter;
  
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M2.66634 13.3334H12.0003V14.6664H1.33333V4.00037H2.66634V13.3334ZM14.6663 12.0004H4.00032V1.33337H14.6663V12.0004ZM5.33333 10.6664H13.3333V2.66638H5.33333V10.6664Z" fill={fillColor}/>
      </svg>
    </div>
  );
}
