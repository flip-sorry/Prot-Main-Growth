import { colors } from '../../../tokens';

interface ThumbsDownIconProps {
  className?: string;
  size?: number;
  color?: string;
  isPressed?: boolean;
}

export default function ThumbsDownIcon({ className = '', size = 16, color, isPressed = false }: ThumbsDownIconProps) {
  const fillColor = color || colors.text.lighter;
  
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {isPressed ? (
          <>
            <path fillRule="evenodd" clipRule="evenodd" d="M1.33333 9.99996H6.65564L6.17474 11.1221C5.45561 12.8 6.68644 14.6666 8.51202 14.6666C8.87252 14.6666 9.19834 14.4518 9.34035 14.1204L11.3333 9.47013V2.66663H3.25464L1.33333 6.50925V9.99996Z" fill={fillColor}/>
            <path d="M12.6667 9.33329H14.6667V2.66663H12.6667V9.33329Z" fill={fillColor}/>
          </>
        ) : (
          <>
            <path fillRule="evenodd" clipRule="evenodd" d="M1.33333 9.99996H6.65564L6.17474 11.1221C5.45561 12.8 6.68644 14.6666 8.51202 14.6666C8.87252 14.6666 9.19834 14.4518 9.34035 14.1204L11.3333 9.47013V2.66663H3.25464L1.33333 6.50925V9.99996ZM10 9.19645L8.23999 13.3031C7.52746 13.1415 7.09535 12.3588 7.40027 11.6473L7.88116 10.5252C8.25823 9.64536 7.61286 8.66663 6.65564 8.66663H2.66666V6.824L4.07869 3.99996H10V9.19645Z" fill={fillColor}/>
            <path d="M12.6667 9.33329H14.6667V2.66663H12.6667V9.33329Z" fill={fillColor}/>
          </>
        )}
      </svg>
    </div>
  );
}
