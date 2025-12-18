import { colors } from '../../../tokens';

interface SignOutIconProps {
  className?: string;
  size?: number;
}

export default function SignOutIcon({ className = '', size = 20 }: SignOutIconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M4.16667 17.5H10.8333V15.8333H4.16667V4.16667H10.8333V2.5H4.16667C3.25 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.25 17.5 4.16667 17.5ZM13.3333 13.75L12.1583 12.575L13.8083 10.8333H7.5V9.16667H13.8083L12.1583 7.425L13.3333 6.25L17.0833 10L13.3333 13.75Z" fill={colors.text.lighter}/>
      </svg>
    </div>
  );
}

