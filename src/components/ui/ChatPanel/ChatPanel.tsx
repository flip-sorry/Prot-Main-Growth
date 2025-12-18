import { useEffect, useRef, useState } from 'react';
import { colors } from '../../../tokens';
import { cn } from '../../../utils/cn';
import { CloseIcon } from '../../../assets/icons';

interface ChatPanelProps {
  isOpen: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  fabPosition: { bottom: number; right: number } | null;
}

export default function ChatPanel({ isOpen, isMinimized, onClose, onMinimize, fabPosition }: ChatPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Close if clicking outside the panel
      if (
        panelRef.current &&
        !panelRef.current.contains(target)
      ) {
        onClose();
      }
    };

    if (isOpen && !isMinimized) {
      // Add event listener after a brief delay to avoid immediate close when opening
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside, true);
      }, 100);
      
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside, true);
      };
    }
  }, [isOpen, isMinimized, onClose]);

  // Handle minimize animation
  useEffect(() => {
    if (isMinimized && isOpen) {
      setIsAnimating(true);
      // After animation completes, close the panel
      const timeoutId = setTimeout(() => {
        setIsAnimating(false);
        onClose();
      }, 300); // Match animation duration
      
      return () => clearTimeout(timeoutId);
    } else {
      setIsAnimating(false);
    }
  }, [isMinimized, isOpen, onClose]);

  // Final position: 16px from bottom and 16px from right
  const finalBottom = 16;
  const finalRight = 16;
  
  // Starting position: where the FAB button was (or default)
  const startBottom = fabPosition ? fabPosition.bottom : 96;
  const startRight = fabPosition ? fabPosition.right : 24;
  
  // Final dimensions: fixed width 348px, height = viewport height - 168px
  const finalWidth = 348;
  const finalHeight = 'calc(100vh - 168px)';
  
  // Starting dimensions (button size)
  const startSize = 56;

  if (!isOpen) return null;

  const handleMinimize = () => {
    onMinimize();
  };

  return (
    <div
      ref={panelRef}
      className={cn(
        'fixed z-50',
        'bg-white',
        'border border-[#e4e4e4]',
        'rounded-[12px]',
        'overflow-hidden',
        'flex flex-col',
        isMinimized ? 'chat-panel-minimize' : 'chat-panel-morph'
      )}
      style={{
        '--start-bottom': `${startBottom}px`,
        '--start-right': `${startRight}px`,
        '--final-bottom': `${finalBottom}px`,
        '--final-right': `${finalRight}px`,
        '--start-size': `${startSize}px`,
        '--final-width': `${finalWidth}px`,
        '--final-height': finalHeight,
        boxShadow: '0px 2px 8px 0px rgba(47,47,47,0.04), 0px 8px 24px 0px rgba(47,47,47,0.12)',
      } as React.CSSProperties & {
        '--start-bottom': string;
        '--start-right': string;
        '--final-bottom': string;
        '--final-right': string;
        '--start-size': string;
        '--final-width': string;
        '--final-height': string;
      }}
      data-name="chat-panel"
    >
      {/* Header with minimize button */}
      <div className="flex items-center justify-end p-3 border-b border-[#e4e4e4] shrink-0">
        <button
          onClick={handleMinimize}
          className={cn(
            'w-8 h-8',
            'flex items-center justify-center',
            'rounded-[6px]',
            'hover:bg-gray-100',
            'transition-colors duration-150',
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-offset-1',
            'focus:ring-[#248567]'
          )}
          aria-label="Minimize"
        >
          <CloseIcon size={20} />
        </button>
      </div>
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
        {/* Chat panel content will go here */}
        <div className="h-full flex items-center justify-center text-gray-400 p-4">
          Chat panel content
        </div>
      </div>
      <style>{`
        .chat-panel-morph {
          bottom: var(--start-bottom);
          right: var(--start-right);
          width: var(--start-size);
          height: var(--start-size);
          opacity: 0;
          transform: scale(0.9);
          animation: chatPanelMorph 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes chatPanelMorph {
          to {
            bottom: var(--final-bottom);
            right: var(--final-right);
            width: var(--final-width);
            height: var(--final-height);
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .chat-panel-minimize {
          bottom: var(--final-bottom);
          right: var(--final-right);
          width: var(--final-width);
          height: var(--final-height);
          opacity: 1;
          transform: scale(1);
          animation: chatPanelMinimize 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes chatPanelMinimize {
          to {
            bottom: var(--start-bottom);
            right: var(--start-right);
            width: var(--start-size);
            height: var(--start-size);
            opacity: 0;
            transform: scale(0.9);
          }
        }
      `}</style>
    </div>
  );
}
