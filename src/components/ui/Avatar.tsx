import { forwardRef } from 'react';

interface AvatarProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

const Avatar = forwardRef<HTMLButtonElement | HTMLDivElement, AvatarProps>(
  ({ text, className = '', onClick }, ref) => {
    // Check if className contains size overrides
    const hasSizeOverride = className.includes('w-') || className.includes('h-');
    const hasTextSizeOverride = className.includes('text-');
    
    // Default size classes (only if no override provided)
    const defaultSizeClasses = hasSizeOverride ? '' : 'w-6 h-6';
    const defaultTextSizeClasses = hasTextSizeOverride ? '' : 'text-[9px]';
    
    // If onClick is provided, render as button (interactive)
    if (onClick) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          onClick={onClick}
          className={`w-10 h-10 flex items-center justify-center hover:bg-[rgba(118,118,118,0.08)] rounded transition-colors duration-150 ${className}`}
        >
          <div className={`${defaultSizeClasses} rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center ${defaultTextSizeClasses} font-semibold text-[#4262E0]`}>
            {text}
          </div>
        </button>
      );
    }

    // Otherwise, render just the avatar circle directly without wrapper (non-interactive, inline)
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={`${defaultSizeClasses} rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center ${defaultTextSizeClasses} font-semibold text-[#4262E0] ${className}`}
      >
        {text}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;

