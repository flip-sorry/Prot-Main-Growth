import { colors, spacing, typography } from '../../../tokens';
import { cn } from '../../../utils/cn';
import { MascotIcon } from '../../../assets/icons';
import PromptSuggestion from './PromptSuggestion';

interface ChatContentProps {
  onPromptClick?: (prompt: string) => void;
}

export default function ChatContent({ onPromptClick }: ChatContentProps) {
  const prompts = [
    'What can you do for me?',
    'Arrange the invoices that have been completed.',
    'Organize completed invoices ',
    'Rename completed contracts',
  ];
  return (
    <div
      className={cn(
        'flex flex-col',
        'items-start',
        'justify-end',
        'h-full',
        'w-full'
      )}
      style={{
        paddingTop: spacing[2], // 8px
        paddingBottom: spacing[2], // 8px
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      {/* Greetings Section */}
      <div
        className={cn(
          'flex flex-col',
          'items-start',
          'justify-end',
          'w-full'
        )}
        style={{
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingTop: 0,
          paddingBottom: 0,
          gap: spacing[3], // 12px
        }}
      >
        {/* Mascot Icon */}
        <MascotIcon size={48} />

        {/* Content */}
        <div
          className={cn(
            'flex flex-col',
            'items-start',
            'w-full'
          )}
          style={{
            lineHeight: '24px',
            fontStyle: 'normal',
          }}
        >
          <p
            style={{
              fontFamily: typography.fontFamily.graphik,
              fontSize: '18px', // 18px (lg)
              lineHeight: '24px',
              color: '#2f2f2f', // secondary.main
              fontWeight: typography.fontWeight.semibold,
              margin: 0,
              marginBottom: 0,
            }}
          >
            Hello there!
          </p>
          <p
            style={{
              fontFamily: typography.fontFamily.graphik,
              fontSize: '18px', // 18px (lg)
              lineHeight: '24px',
              color: colors.text.lighter, // #767676 (secondary.lighter)
              fontWeight: typography.fontWeight.normal,
              margin: 0,
            }}
          >
            How can I help you today?
          </p>
        </div>
      </div>

      {/* Quick Prompts Section */}
      <div
        className={cn(
          'flex flex-col',
          'items-start',
          'justify-center',
          'w-full'
        )}
        style={{
          paddingLeft: spacing[2], // 8px
          paddingRight: spacing[2], // 8px
          paddingTop: spacing[2], // 8px
          paddingBottom: 0,
          gap: spacing[1], // 4px
        }}
      >
        {prompts.map((prompt, index) => (
          <PromptSuggestion
            key={index}
            prompt={prompt}
            onClick={() => onPromptClick?.(prompt)}
          />
        ))}
      </div>
    </div>
  );
}

