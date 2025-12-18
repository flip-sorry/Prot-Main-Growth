import { colors } from '../../../tokens';

interface ThumbsUpIconProps {
  className?: string;
  size?: number;
  color?: string;
  isPressed?: boolean;
}

export default function ThumbsUpIcon({ className = '', size = 16, color, isPressed = false }: ThumbsUpIconProps) {
  const fillColor = color || colors.text.lighter;
  
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {isPressed ? (
          <>
            <path fillRule="evenodd" clipRule="evenodd" d="M14.6667 6.00004H9.34435L9.82525 4.87795C10.5444 3.19998 9.31355 1.33337 7.48797 1.33337C7.12747 1.33337 6.80166 1.54822 6.65965 1.87957L4.66666 6.52987V13.3334H12.7454L14.6667 9.49075V6.00004Z" fill={fillColor}/>
            <path d="M3.33333 6.66671H1.33333V13.3334H3.33333V6.66671Z" fill={fillColor}/>
          </>
        ) : (
          <>
            <path fillRule="evenodd" clipRule="evenodd" d="M14.6667 6.00004H9.34435L9.82525 4.87795C10.5444 3.19998 9.31355 1.33337 7.48797 1.33337C7.12747 1.33337 6.80166 1.54822 6.65965 1.87957L4.66666 6.52987V13.3334H12.7454L14.6667 9.49075V6.00004ZM6 6.80355L7.76 2.69686C8.47253 2.85846 8.90465 3.64124 8.59973 4.35272L8.11883 5.47481C7.74176 6.35464 8.38713 7.33337 9.34435 7.33337H13.3333V9.176L11.9213 12H6V6.80355Z" fill={fillColor}/>
            <path d="M3.33333 6.66671H1.33333V13.3334H3.33333V6.66671Z" fill={fillColor}/>
          </>
        )}
      </svg>
    </div>
  );
}
