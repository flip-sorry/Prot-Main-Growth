import type { ReactNode } from 'react';
import { colors, transitions } from '../../../tokens';
import { cn } from '../../../utils/cn';
import { PlusIcon } from '../../../assets/icons';
import { ChevronDownIcon } from '../../../assets/icons';

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'icon' | 'split';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

interface ButtonPrimaryProps {
  children: ReactNode;
  className?: string;
}

interface ButtonDropdownProps {
  className?: string;
}

const ButtonPrimary = ({ children, className = '' }: ButtonPrimaryProps) => {
  return (
    <span className={cn('flex items-center gap-2', className)}>
      {children}
    </span>
  );
};

const ButtonDropdown = ({ className = '' }: ButtonDropdownProps) => {
  return (
    <span className={cn('flex items-center justify-center', className)}>
      <ChevronDownIcon size={16} />
    </span>
  );
};

export default function Button({
  children,
  className = '',
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
}: ButtonProps) {
  const baseClasses = cn(
    'flex items-center justify-center font-semibold transition-colors duration-150',
    disabled && 'opacity-50 cursor-not-allowed',
    !disabled && 'cursor-pointer'
  );

  const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-9 px-4 text-sm',
    lg: 'h-10 px-5 text-base',
  };

  // Icon variant
  if (variant === 'icon') {
    const iconSizeClasses = size === 'lg' ? 'w-10 h-10' : size === 'sm' ? 'w-8 h-8' : 'w-9 h-9';
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          iconSizeClasses,
          baseClasses,
          'rounded',
          className
        )}
        onMouseEnter={!disabled ? (e) => {
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Button.tsx:75',message:'Icon button onMouseEnter',data:{backgroundColor:colors.interactive.hover,hasTransition:true},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
          // #endregion
          (e.currentTarget as HTMLElement).style.backgroundColor = colors.interactive.hover;
        } : undefined}
        onMouseLeave={!disabled ? (e) => {
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Button.tsx:79',message:'Icon button onMouseLeave',data:{backgroundColor:'cleared'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
          // #endregion
          (e.currentTarget as HTMLElement).style.backgroundColor = '';
        } : undefined}
      >
        {children}
      </button>
    );
  }

  // Split variant
  if (variant === 'split') {
    // Extract height and text size without padding for the dropdown button
    const dropdownSizeClasses = {
      sm: 'h-8 text-xs',
      md: 'h-9 text-sm',
      lg: 'h-10 text-base',
    };

    return (
      <div className={cn('flex items-stretch', className)}>
        <button
          onClick={onClick}
          disabled={disabled}
          style={{
            backgroundColor: colors.primary.base,
            ...(!disabled && { '--hover-bg': colors.primary.hover } as any),
          }}
          className={cn(
            baseClasses,
            sizeClasses[size],
            'text-white pl-2 pr-4 rounded-l',
            className
          )}
          onMouseEnter={!disabled ? (e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = colors.primary.hover;
          } : undefined}
          onMouseLeave={!disabled ? (e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = colors.primary.base;
          } : undefined}
        >
          {children}
        </button>
        <button
          disabled={disabled}
          style={{
            backgroundColor: colors.primary.base,
            borderLeftColor: colors.primary.hover,
            ...(!disabled && { '--hover-bg': colors.primary.hover } as any),
          }}
          className={cn(
            baseClasses,
            dropdownSizeClasses[size],
            'text-white px-2 rounded-r border-l',
            className
          )}
          onMouseEnter={!disabled ? (e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = colors.primary.hover;
          } : undefined}
          onMouseLeave={!disabled ? (e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = colors.primary.base;
          } : undefined}
        >
          <ChevronDownIcon size={24} color="white" />
        </button>
      </div>
    );
  }

  // Primary variant
  if (variant === 'primary') {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Button.tsx:129',message:'Primary button render',data:{variant,size,disabled,hasInlineStyle:true,hasHoverClass:!disabled},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          backgroundColor: colors.primary.base,
          ...(!disabled && { '--hover-bg': colors.primary.hover } as any),
        }}
        className={cn(
          baseClasses,
          sizeClasses[size],
          'text-white rounded',
          !disabled && 'hover:bg-[#1f6f54]',
          className
        )}
      >
        {children}
      </button>
    );
  }

  // Secondary variant
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        sizeClasses[size],
        'bg-white text-text-dark border border-border-light rounded',
        !disabled && 'hover:bg-gray-100',
        className
      )}
    >
      {children}
    </button>
  );
}

Button.Primary = ButtonPrimary;
Button.Dropdown = ButtonDropdown;

