import { colors } from '../../../tokens';

interface MoreIconProps {
  className?: string;
  size?: number;
}

export default function MoreIcon({ className = '', size = 20 }: MoreIconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path fillRule="evenodd" clipRule="evenodd" d="M4.99998 11.6667C4.07748 11.6667 3.33331 10.9208 3.33331 10C3.33331 9.07834 4.07748 8.33334 4.99998 8.33334C5.92081 8.33334 6.66665 9.07834 6.66665 10C6.66665 10.9208 5.92081 11.6667 4.99998 11.6667ZM8.33331 10C8.33331 10.9208 9.07998 11.6667 9.99998 11.6667C10.9216 11.6667 11.6666 10.9208 11.6666 10C11.6666 9.07834 10.9216 8.33334 9.99998 8.33334C9.07998 8.33334 8.33331 9.07834 8.33331 10ZM13.3333 10C13.3333 10.9208 14.0791 11.6667 15 11.6667C15.9208 11.6667 16.6666 10.9208 16.6666 10C16.6666 9.07834 15.9208 8.33334 15 8.33334C14.0791 8.33334 13.3333 9.07834 13.3333 10Z" fill={colors.text.light}/>
      </svg>
    </div>
  );
}

