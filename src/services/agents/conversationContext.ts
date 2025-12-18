// #region agent log
fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'conversationContext.ts:1',message:'conversationContext module loading',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion
import { AgentType } from './types';
// #region agent log
fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'conversationContext.ts:3',message:'conversationContext types import successful',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

/**
 * Conversation context tracks the state of the ongoing conversation
 * to help with intent understanding and agent routing
 */
export interface ConversationContext {
  lastAgent: AgentType | null;
  currentTopic: string | null;
  messageCount: number;
}

/**
 * Creates a new conversation context
 */
export function createContext(): ConversationContext {
  return {
    lastAgent: null,
    currentTopic: null,
    messageCount: 0,
  };
}

/**
 * Updates the conversation context after processing a message
 */
export function updateContext(
  context: ConversationContext,
  agent: AgentType,
  topic: string | null
): ConversationContext {
  return {
    lastAgent: agent,
    currentTopic: topic,
    messageCount: context.messageCount + 1,
  };
}

/**
 * Enhances a prompt with conversation context to improve understanding
 */
export function getContextualPrompt(
  prompt: string,
  context: ConversationContext
): string {
  if (context.messageCount === 0) {
    return prompt;
  }

  const contextParts: string[] = [];

  if (context.currentTopic) {
    contextParts.push(`Previous topic: ${context.currentTopic}`);
  }

  if (context.lastAgent) {
    const agentName = getAgentName(context.lastAgent);
    contextParts.push(`Last agent used: ${agentName}`);
  }

  if (contextParts.length > 0) {
    return `${prompt}\n\n[Context: ${contextParts.join(', ')}]`;
  }

  return prompt;
}

/**
 * Detects if the user is switching context/topic
 */
export function detectContextSwitch(
  prompt: string,
  context: ConversationContext
): boolean {
  if (!context.currentTopic || context.messageCount === 0) {
    return false;
  }

  const lowerPrompt = prompt.toLowerCase();
  const lowerTopic = context.currentTopic.toLowerCase();

  // Check for explicit topic change indicators
  const topicChangeIndicators = [
    'actually',
    'wait',
    'instead',
    'never mind',
    'change',
    'different',
    'new',
    'switch',
  ];

  const hasChangeIndicator = topicChangeIndicators.some((indicator) =>
    lowerPrompt.includes(indicator)
  );

  // Check if prompt is about a completely different topic
  const topicKeywords = lowerTopic.split(/\s+/).filter((w) => w.length > 3);
  const hasTopicKeywords = topicKeywords.some((keyword) =>
    lowerPrompt.includes(keyword)
  );

  // If there's a change indicator and no topic keywords, likely a switch
  return hasChangeIndicator && !hasTopicKeywords;
}

/**
 * Extracts the main topic from a prompt
 */
export function extractTopic(prompt: string, intent: string, entities: string[]): string | null {
  if (entities.length > 0) {
    // Use the first significant entity as the topic
    const significantEntities = entities.filter(
      (e) => !['file', 'files', 'document', 'documents'].includes(e)
    );
    if (significantEntities.length > 0) {
      return significantEntities[0];
    }
    return entities[0];
  }

  // Fallback to intent if no entities
  if (intent && intent !== 'general') {
    return intent;
  }

  // Extract a short topic from the prompt (first few words)
  const words = prompt.trim().split(/\s+/).slice(0, 3);
  if (words.length > 0) {
    return words.join(' ');
  }

  return null;
}

function getAgentName(agent: AgentType): string {
  const names: Record<AgentType, string> = {
    [AgentType.FILE_ORGANIZER]: 'File Organizer',
    [AgentType.DOCUMENT_ANALYTIC]: 'Document Analytic',
    [AgentType.FILE_MANAGER]: 'File Manager',
    [AgentType.SALES_AGENT]: 'Sales',
    [AgentType.KNOWLEDGE_BASE]: 'Knowledge Base',
    [AgentType.HELP_CENTER]: 'Help Center',
  };
  return names[agent];
}

