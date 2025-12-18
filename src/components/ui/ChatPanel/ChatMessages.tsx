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

  // Find the last agent message
  const lastAgentMessageId = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].type === 'agent') {
        return messages[i].id;
      }
    }
    return null;
  })();

  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'items-start',
        'w-full',
        'min-h-full',
        'justify-end'
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
          <AgentMessage 
            key={message.id} 
            message={message} 
            isLastMessage={message.id === lastAgentMessageId}
          />
        )
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
