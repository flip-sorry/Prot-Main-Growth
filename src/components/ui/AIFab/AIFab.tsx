import { forwardRef } from 'react';
import { colors, shadows, transitions } from '../../../tokens';
import { MascotIcon } from '../../../assets/icons';
import { cn } from '../../../utils/cn';

interface AIFabProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  isHidden?: boolean;
}

const AIFab = forwardRef<HTMLButtonElement, AIFabProps>(
  ({ onClick, className = '', isHidden = false }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    };

    if (isHidden) return null;

    return (
      <button
        ref={ref}
        onClick={(e) => {
          // Stop propagation to prevent click-outside handler from firing
          e.stopPropagation();
          onClick?.(e);
        }}
        onMouseDown={(e) => {
          // Stop propagation to prevent click-outside handler from firing
          e.stopPropagation();
        }}
        onKeyDown={handleKeyDown}
        className={cn(
        'fixed bottom-6 right-6',
        'w-14 h-14',
        'max-w-[56px] max-h-[56px]',
        'rounded-[12px]',
        'flex items-center justify-center',
        'bg-white',
        'shadow-lg',
        'transition-all duration-150',
        'hover:shadow-xl',
        'hover:scale-105',
        'active:scale-95',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-offset-2',
        'focus:ring-[#248567]',
        'z-50',
        className
      )}
      style={{
        boxShadow: '0px 4px 12px rgba(47, 47, 47, 0.15)',
        border: `1px solid ${colors.border.light}`,
      }}
      aria-label="AI Assistant"
      data-fab-button="true"
    >
        <MascotIcon size={36} />
      </button>
    );
  }
);

AIFab.displayName = 'AIFab';

export default AIFab;

