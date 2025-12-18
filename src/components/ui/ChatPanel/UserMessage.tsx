import { colors, spacing, typography } from '../../../tokens';
import { cn } from '../../../utils/cn';
import type { Message } from '../../../types/messages';

interface UserMessageProps {
  message: Message;
}

export default function UserMessage({ message }: UserMessageProps) {
  return (
    <div
      className={cn(
        'flex',
        'items-end',
        'justify-end',
        'w-full'
      )}
      style={{
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: spacing[1], // 4px
        paddingBottom: spacing[1], // 4px
      }}
    >
      <div
        className={cn(
          'flex',
          'flex-col',
          'items-start',
          'max-w-[280px]',
          'overflow-clip',
          'rounded-[12px]'
        )}
        style={{
          backgroundColor: '#f4f0ed', // background.lighter
          padding: spacing[3], // 12px
        }}
      >
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
        </p>
      </div>
    </div>
  );
}
