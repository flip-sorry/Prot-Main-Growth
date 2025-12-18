import { colors } from '../../../tokens';

interface WorkspaceStarIconProps {
  className?: string;
  size?: number;
}

export default function WorkspaceStarIcon({ className = '', size = 16 }: WorkspaceStarIconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M8 2L10 6H14L11 9L12 13L8 11L4 13L5 9L2 6H6L8 2Z" fill={colors.text.dark} />
      </svg>
    </div>
  );
}

