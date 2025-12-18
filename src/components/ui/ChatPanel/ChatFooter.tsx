import { useState, useRef, useEffect } from 'react';
import { colors, spacing, typography } from '../../../tokens';
import { cn } from '../../../utils/cn';
import { AtIcon, MicrophoneIcon, SendIcon } from '../../../assets/icons';

interface ChatFooterProps {
  isOpen?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onSend?: (message: string) => void;
}

export default function ChatFooter({ isOpen = true, value: controlledValue, onChange, onSend }: ChatFooterProps) {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Use controlled value if provided, otherwise use internal state
  const inputValue = controlledValue !== undefined ? controlledValue : internalValue;
  const setInputValue = onChange || setInternalValue;

  // Auto-focus input when panel opens (with delay to account for animation)
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      const timeoutId = setTimeout(() => {
        textareaRef.current?.focus();
      }, 350); // Slightly longer than animation duration (300ms)
      
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  // Handle Cmd+A / Ctrl+A to select all text
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if textarea is focused
      if (document.activeElement === textareaRef.current) {
        // Cmd+A on Mac, Ctrl+A on Windows/Linux
        if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
          e.preventDefault();
          textareaRef.current?.select();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      className={cn(
        'flex flex-col',
        'items-center justify-end',
        'shrink-0',
        'relative'
      )}
      style={{
        paddingTop: spacing[3], // 12px
        paddingBottom: spacing[4], // 16px
        paddingLeft: spacing[4], // 16px
        paddingRight: spacing[4], // 16px
        background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 9.191%)',
        gap: spacing[3], // 12px
      }}
    >
      {/* Prompt Input Container */}
      <div
        className={cn(
          'flex flex-col',
          'border border-solid',
          'overflow-clip',
          'shrink-0',
          'w-full',
          'sticky top-0',
          'rounded-[12px]',
          'cursor-text'
        )}
        style={{
          borderColor: isFocused ? colors.primary.base : '#e4e4e4',
          padding: spacing[2], // 8px
          gap: spacing[2], // 8px
          transition: 'border-color 0.15s ease',
        }}
        onClick={() => {
          textareaRef.current?.focus();
        }}
      >
        {/* Text Input */}
        <div
          className={cn(
            'flex',
            'items-end',
            'overflow-clip',
            'p-1',
            'shrink-0',
            'w-full'
          )}
          style={{
            maxHeight: '280px',
            padding: spacing[1], // 4px
          }}
        >
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask me anything..."
            className={cn(
              'w-full',
              'resize-none',
              'outline-none',
              'border-none',
              'bg-transparent',
              'min-h-[17px]',
              'placeholder:text-[#767676]'
            )}
            style={{
              fontFamily: typography.fontFamily.graphik,
              fontSize: typography.fontSize.sm, // 14px
              lineHeight: '17px',
              color: inputValue ? colors.text.dark : colors.text.lighter,
              fontStyle: 'normal',
              fontWeight: typography.fontWeight.normal,
            }}
            rows={1}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${Math.min(target.scrollHeight, 280)}px`;
            }}
            onKeyDown={(e) => {
              // Send message on Enter (but allow Shift+Enter for new line)
              if (e.key === 'Enter' && !e.shiftKey && inputValue.trim()) {
                e.preventDefault();
                if (onSend) {
                  onSend(inputValue.trim());
                }
              }
            }}
          />
        </div>

        {/* Footer Actions */}
        <div
          className={cn(
            'flex',
            'items-center',
            'justify-between',
            'shrink-0',
            'w-full',
            'pb-0',
            'pt-0',
            'px-0'
          )}
        >
          {/* Leading Actions Wrapper */}
          <div
            className={cn(
              'flex',
              'items-center',
              'shrink-0',
              'relative'
            )}
            style={{
              gap: spacing[1], // 0px (or 4px if needed)
            }}
          >
            <button
              type="button"
              className={cn(
                'flex items-center justify-center',
                'cursor-pointer',
                'rounded',
                'shrink-0',
                'relative',
                'transition-colors duration-150'
              )}
              style={{
                width: '32px',
                height: '32px',
              }}
              aria-label="Mention"
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = colors.interactive.hover;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '';
              }}
            >
              <AtIcon size={24} />
            </button>
          </div>

          {/* Actions Wrapper */}
          <div
            className={cn(
              'flex',
              'items-center',
              'shrink-0',
              'relative'
            )}
            style={{
              gap: spacing[1], // 4px
            }}
          >
            <button
              type="button"
              className={cn(
                'flex items-center justify-center',
                'cursor-pointer',
                'rounded',
                'shrink-0',
                'relative',
                'transition-colors duration-150'
              )}
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: inputValue.trim() ? colors.primary.light : '',
              }}
              aria-label={inputValue.trim() ? 'Send' : 'Microphone'}
              onClick={(e) => {
                e.stopPropagation();
                if (inputValue.trim() && onSend) {
                  onSend(inputValue.trim());
                }
              }}
              onMouseEnter={(e) => {
                if (inputValue.trim()) {
                  // Slightly darker light green on hover
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(36, 133, 103, 0.12)';
                } else {
                  (e.currentTarget as HTMLElement).style.backgroundColor = colors.interactive.hover;
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = inputValue.trim() ? colors.primary.light : '';
              }}
            >
              {inputValue.trim() ? (
                <SendIcon size={24} color={colors.primary.base} />
              ) : (
                <MicrophoneIcon size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Legal Disclaimer */}
      <div
        className={cn(
          'flex',
          'items-end',
          'justify-center',
          'shrink-0',
          'w-full',
          'p-0',
          'relative'
        )}
      >
        <p
          className={cn(
            'text-center',
            'relative',
            'shrink-0',
            'min-h-px',
            'min-w-px',
            'grow',
            'basis-0',
            'not-italic'
          )}
          style={{
            fontFamily: typography.fontFamily.graphik,
            fontSize: typography.fontSize.xs, // 12px
            lineHeight: '15px',
            color: colors.text.lighter, // #767676
            fontWeight: typography.fontWeight.normal,
          }}
        >
          AI can make mistakes, double check important details
        </p>
      </div>
    </div>
  );
}

