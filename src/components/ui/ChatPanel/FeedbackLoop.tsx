import { useState, useEffect } from 'react';
import { colors, spacing } from '../../../tokens';
import { cn } from '../../../utils/cn';
import { CopyIcon, ThumbsUpIcon, ThumbsDownIcon, CheckmarkIcon } from '../../../assets/icons';

interface FeedbackLoopProps {
  messageContent: string;
}

export default function FeedbackLoop({ messageContent }: FeedbackLoopProps) {
  const [selectedFeedback, setSelectedFeedback] = useState<'up' | 'down' | null>(null);
  const [showCheckmark, setShowCheckmark] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageContent);
      setShowCheckmark(true);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  useEffect(() => {
    if (showCheckmark) {
      const timer = setTimeout(() => {
        setShowCheckmark(false);
      }, 1000); // Show checkmark for 1 second

      return () => clearTimeout(timer);
    }
  }, [showCheckmark]);

  const handleThumbsUp = () => {
    setSelectedFeedback(selectedFeedback === 'up' ? null : 'up');
  };

  const handleThumbsDown = () => {
    setSelectedFeedback(selectedFeedback === 'down' ? null : 'down');
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[1], // 4px
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
  };

  return (
    <div
      className={cn('flex', 'items-center', 'w-full')}
      style={{
        gap: spacing[1], // 4px
        paddingTop: spacing[2], // 8px
      }}
    >
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.interactive.hover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        aria-label="Copy message"
      >
        {showCheckmark ? <CheckmarkIcon size={16} /> : <CopyIcon size={16} />}
      </button>

      {/* Thumbs Up Button - hidden when thumbs down is selected */}
      {selectedFeedback !== 'down' && (
        <button
          onClick={handleThumbsUp}
          style={{
            ...buttonStyle,
            backgroundColor: selectedFeedback === 'up' ? colors.interactive.hover : 'transparent',
          }}
          onMouseEnter={(e) => {
            if (selectedFeedback !== 'up') {
              e.currentTarget.style.backgroundColor = colors.interactive.hover;
            }
          }}
          onMouseLeave={(e) => {
            if (selectedFeedback !== 'up') {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
          aria-label="Thumbs up"
        >
          <ThumbsUpIcon size={16} isPressed={selectedFeedback === 'up'} />
        </button>
      )}

      {/* Thumbs Down Button - hidden when thumbs up is selected */}
      {selectedFeedback !== 'up' && (
        <button
          onClick={handleThumbsDown}
          style={{
            ...buttonStyle,
            backgroundColor: selectedFeedback === 'down' ? colors.interactive.hover : 'transparent',
          }}
          onMouseEnter={(e) => {
            if (selectedFeedback !== 'down') {
              e.currentTarget.style.backgroundColor = colors.interactive.hover;
            }
          }}
          onMouseLeave={(e) => {
            if (selectedFeedback !== 'down') {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
          aria-label="Thumbs down"
        >
          <ThumbsDownIcon size={16} isPressed={selectedFeedback === 'down'} />
        </button>
      )}
    </div>
  );
}

