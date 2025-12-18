import { useState } from 'react';
import { colors, spacing, typography } from '../../../tokens';
import { cn } from '../../../utils/cn';
import { SparkleOutlineIcon, ChevronRightIcon } from '../../../assets/icons';
import type { ReactNode } from 'react';

interface PromptSuggestionProps {
  prompt: string;
  onClick?: () => void;
  icon?: ReactNode;
  showChevronOnHover?: boolean;
}

export default function PromptSuggestion({ prompt, onClick, icon, showChevronOnHover = false }: PromptSuggestionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex',
        'items-start',
        'w-full',
        'cursor-pointer',
        'transition-colors duration-150'
      )}
      style={{
        paddingLeft: spacing[3], // 12px
        paddingRight: spacing[3], // 12px
        paddingTop: spacing[2], // 8px
        paddingBottom: spacing[2], // 8px
        gap: spacing[2], // 8px
        borderRadius: '8px',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = colors.interactive.hover;
        setIsHovered(true);
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = '';
        setIsHovered(false);
      }}
    >
      {/* Icon - XS size (16px) */}
      {icon || (
        <SparkleOutlineIcon 
          size={16} 
          color="#767676" 
          className="shrink-0"
        />
      )}
      
      {/* Prompt Text */}
      <p
        className={cn(
          'grow',
          'basis-0',
          'min-h-px',
          'min-w-px',
          'text-left',
          'not-italic'
        )}
        style={{
          fontFamily: typography.fontFamily.graphik,
          fontSize: typography.fontSize.sm, // 14px
          lineHeight: '17px',
          color: colors.text.dark, // #2f2f2f
          fontWeight: typography.fontWeight.normal,
          margin: 0,
        }}
      >
        {prompt}
      </p>

      {/* Chevron Right Icon - shown on hover if showChevronOnHover is true */}
      {showChevronOnHover && isHovered && (
        <ChevronRightIcon 
          size={16} 
          color="#767676" 
          className="shrink-0"
        />
      )}
    </button>
  );
}

