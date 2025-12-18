import { useEffect, useRef } from 'react';
import { spacing } from '../../../tokens';
import { cn } from '../../../utils/cn';
import type { Message } from '../../../types/messages';
import UserMessage from './UserMessage';
import AgentMessage from './AgentMessage';

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive or content changes (for streaming)
  useEffect(() => {
    // Use 'auto' for instant scroll during streaming, 'smooth' for new messages
    const hasStreaming = messages.some(msg => msg.isStreaming);
    messagesEndRef.current?.scrollIntoView({ behavior: hasStreaming ? 'auto' : 'smooth' });
  }, [messages]);

  return (
    <div
      className={cn(
        'flex',
        'flex-col',
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
      {messages.map((message) => (
        message.type === 'user' ? (
          <UserMessage key={message.id} message={message} />
        ) : (
          <AgentMessage key={message.id} message={message} />
        )
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
