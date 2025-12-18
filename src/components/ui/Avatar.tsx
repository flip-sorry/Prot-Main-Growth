import { forwardRef } from 'react';
import { colors, transitions } from '../../tokens';
import { cn } from '../../utils/cn';

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
          className={cn(
            'w-10 h-10 flex items-center justify-center rounded',
            transitions.default,
            className
          )}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = colors.interactive.hover;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = '';
          }}
        >
          <div className={cn(
            defaultSizeClasses,
            'rounded-full flex items-center justify-center',
            defaultTextSizeClasses,
            'font-semibold'
          )}
          style={{
            backgroundColor: colors.avatar.bg,
            borderColor: colors.avatar.border,
            color: colors.avatar.text,
          }}
          >
            {text}
          </div>
        </button>
      );
    }

    // Otherwise, render just the avatar circle directly without wrapper (non-interactive, inline)
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(
          defaultSizeClasses,
          'rounded-full flex items-center justify-center',
          defaultTextSizeClasses,
          'font-semibold border',
          className
        )}
        style={{
          backgroundColor: colors.avatar.bg,
          borderColor: colors.avatar.border,
          color: colors.avatar.text,
        }}
      >
        {text}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;

