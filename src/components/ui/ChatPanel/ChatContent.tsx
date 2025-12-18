import { colors, spacing, typography } from '../../../tokens';
import { cn } from '../../../utils/cn';
import { MascotIcon, VideoPlayIcon, SparkleOutlineIcon } from '../../../assets/icons';
import PromptSuggestion from './PromptSuggestion';
import ChatMessages from './ChatMessages';
import type { Message } from '../../../types/messages';

interface ChatContentProps {
  messages?: Message[];
  source?: 'fab' | 'header';
  onPromptClick?: (prompt: string) => void;
}

export default function ChatContent({ messages = [], source = 'fab', onPromptClick }: ChatContentProps) {
  const fabPrompts = [
    'What can you do for me?',
    'Arrange the invoices that have been completed.',
    'Organize completed invoices ',
    'Rename completed contracts',
  ];

  const headerPrompts = [
    'Book a demo',
    'Something isn\'t working',
    'Why hasn\'t my document been signed yet?',
    'I have a billing question',
  ];

  const prompts = source === 'header' ? headerPrompts : fabPrompts;
  
  const greeting = source === 'header' ? 'How can I help you today?' : 'Hello there!';
  const subtext = source === 'header' ? 'I\'ll help right away—and connect you with support if needed.' : 'How can I help you today?';

  // Show messages if any exist, otherwise show welcome state
  if (messages.length > 0) {
    return <ChatMessages messages={messages} />;
  }

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
            {greeting}
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
            {subtext}
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
        {prompts.map((prompt, index) => {
          // Use VideoPlayIcon for "Book a demo" when source is header
          const icon = source === 'header' && prompt === 'Book a demo' 
            ? <VideoPlayIcon size={16} color="#767676" className="shrink-0" />
            : undefined;
          
          // Show chevron on hover for "Book a demo" when source is header
          const showChevronOnHover = source === 'header' && prompt === 'Book a demo';
          
          return (
            <PromptSuggestion
              key={index}
              prompt={prompt}
              onClick={() => onPromptClick?.(prompt)}
              icon={icon}
              showChevronOnHover={showChevronOnHover}
            />
          );
        })}
      </div>
    </div>
  );
}

