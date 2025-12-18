import { colors, spacing, typography } from '../../../tokens';
import { cn } from '../../../utils/cn';
import type { Message } from '../../../types/messages';
import FeedbackLoop from './FeedbackLoop';

interface AgentMessageProps {
  message: Message;
  isLastMessage?: boolean;
}

export default function AgentMessage({ message, isLastMessage = false }: AgentMessageProps) {
  const isThinking = message.content === 'Thinking…';
  
  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'items-start',
        'w-full'
      )}
      style={{
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: isThinking ? spacing[2] : spacing[1], // 8px for thinking, 4px for regular
        paddingBottom: isThinking ? 0 : spacing[1], // 0px for thinking, 4px for regular
      }}
    >
      {/* Content */}
      <div
        className={cn(
          'flex',
          'flex-col',
          'items-start',
          'w-full'
        )}
        style={{
          lineHeight: isThinking ? '15px' : '17px',
          fontStyle: 'normal',
          height: isThinking ? '16px' : 'auto',
        }}
      >
        {isThinking ? (
          <p
            style={{
              fontFamily: typography.fontFamily.graphik,
              fontSize: typography.fontSize.xs, // 12px
              lineHeight: '15px',
              color: colors.text.lighter, // #767676
              fontWeight: typography.fontWeight.normal,
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            <span>Thinking</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5px' }}>
              <span
                style={{
                  display: 'inline-block',
                  animation: 'bounceDot 1.4s ease-in-out infinite',
                  animationDelay: '0s',
                }}
              >
                .
              </span>
              <span
                style={{
                  display: 'inline-block',
                  animation: 'bounceDot 1.4s ease-in-out infinite',
                  animationDelay: '0.2s',
                }}
              >
                .
              </span>
              <span
                style={{
                  display: 'inline-block',
                  animation: 'bounceDot 1.4s ease-in-out infinite',
                  animationDelay: '0.4s',
                }}
              >
                .
              </span>
            </span>
          </p>
        ) : (
          <p
            style={{
              fontFamily: typography.fontFamily.graphik,
              fontSize: typography.fontSize.sm, // 14px
              lineHeight: '17px',
              color: '#2f2f2f', // secondary.main
              fontWeight: typography.fontWeight.normal,
              margin: 0,
              wordWrap: 'break-word',
            }}
          >
            {message.content}
            {message.isStreaming && (
              <span
                className="inline-block ml-1"
                style={{
                  width: '2px',
                  height: '14px',
                  backgroundColor: '#2f2f2f',
                  animation: 'blink 1s infinite',
                  verticalAlign: 'baseline',
                }}
              />
            )}
          </p>
        )}
      </div>
      {/* Feedback Loop - only show on last message and not when thinking */}
      {isLastMessage && !isThinking && (
        <FeedbackLoop messageContent={message.content} />
      )}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes bounceDot {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
}
