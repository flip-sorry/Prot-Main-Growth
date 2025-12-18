import { colors } from '../../../tokens';

interface WorkspaceChevronIconProps {
  className?: string;
  size?: number;
}

export default function WorkspaceChevronIcon({ className = '', size = 20 }: WorkspaceChevronIconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M10 16.6667L6.25 12.9167L7.45833 11.7084L10 14.25L12.5417 11.7084L13.75 12.9167L10 16.6667ZM7.45833 8.37502L6.25 7.16669L10 3.41669L13.75 7.16669L12.5417 8.37502L10 5.83335L7.45833 8.37502Z" fill="#ADADAD"/>
      </svg>
    </div>
  );
}

