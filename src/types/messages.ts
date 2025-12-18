export type MessageType = 'user' | 'agent';

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

