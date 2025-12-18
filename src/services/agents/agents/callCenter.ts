import { AgentType } from '../types';
import type { AgentThought } from '../types';

export interface CallCenterAgentResult {
  thoughts: AgentThought[];
  response: string;
}

/**
 * Call Center Agent
 * Handles requests to connect with human agents: escalates complex issues, simulates connecting to specialists
 */
export async function* processCallCenterAgent(
  prompt: string,
  interpretedPrompt: string
): AsyncGenerator<AgentThought, CallCenterAgentResult> {
  const thoughts: AgentThought[] = [];
  let thoughtId = 1;
  
  // Thought 1: Understanding transfer request
  const thought1: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Understanding request',
    reasoning: `The user wants to speak with a human agent. Analyzing: "${interpretedPrompt}"`,
    agent: AgentType.CALL_CENTER_AGENT,
    timestamp: Date.now(),
  };
  thoughts.push(thought1);
  yield thought1;
  await delay(300);
  
  // Thought 2: Identifying specialist needs
  const thought2: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Identifying specialist',
    reasoning: 'Determining which type of specialist would best help with the user\'s request. Checking for specific needs or issues.',
    agent: AgentType.CALL_CENTER_AGENT,
    timestamp: Date.now(),
  };
  thoughts.push(thought2);
  yield thought2;
  await delay(400);
  
  // Thought 3: Initiating transfer
  const thought3: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Initiating transfer',
    reasoning: 'Connecting to the appropriate human agent. Preparing context and summary for seamless handoff.',
    agent: AgentType.CALL_CENTER_AGENT,
    timestamp: Date.now(),
  };
  thoughts.push(thought3);
  yield thought3;
  await delay(500);
  
  // Generate response
  const response = generateCallCenterResponse(interpretedPrompt);
  
  return {
    thoughts,
    response,
  };
}

function generateCallCenterResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('human') || lowerPrompt.includes('person') || lowerPrompt.includes('agent') || lowerPrompt.includes('representative')) {
    if (lowerPrompt.includes('sales') || lowerPrompt.includes('contract') || lowerPrompt.includes('deal')) {
      return "I'm connecting you with a sales specialist who can help with contracts, deals, and sales-related questions. One moment please...\n\n**Connecting to Sales Specialist**\n\nA sales representative will be with you shortly. They'll have access to your contract history and can assist with:\n• Contract negotiations\n• Deal structuring\n• Sales strategy\n• Account management\n\nPlease hold while I transfer you...";
    }
    if (lowerPrompt.includes('technical') || lowerPrompt.includes('support') || lowerPrompt.includes('issue') || lowerPrompt.includes('problem')) {
      return "I'm connecting you with a technical support specialist who can help resolve your issue. One moment please...\n\n**Connecting to Technical Support**\n\nA technical support agent will be with you shortly. They can help with:\n• Technical issues\n• System troubleshooting\n• Feature questions\n• Account setup\n\nPlease hold while I transfer you...";
    }
    return "I'm connecting you with a human agent who can provide personalized assistance. One moment please...\n\n**Connecting to Support Agent**\n\nA support representative will be with you shortly. They'll have full context of our conversation and can help with any questions or issues you have.\n\nPlease hold while I transfer you...";
  }
  
  if (lowerPrompt.includes('speak to') || lowerPrompt.includes('talk to') || lowerPrompt.includes('connect')) {
    return "I'd be happy to connect you with a human agent! Let me transfer you to our support team.\n\n**Transferring to Support**\n\nA support representative will be available shortly. They can provide:\n• Personalized assistance\n• Complex issue resolution\n• Detailed explanations\n• Account-specific help\n\nPlease hold while I connect you...";
  }
  
  if (lowerPrompt.includes('escalate') || lowerPrompt.includes('manager') || lowerPrompt.includes('supervisor')) {
    return "I understand you'd like to escalate this. Let me connect you with a supervisor or specialist.\n\n**Escalating Request**\n\nA supervisor will review your request and connect with you shortly. They can help with:\n• Complex issues\n• Account concerns\n• Policy questions\n• Special requests\n\nPlease hold while I escalate your request...";
  }
  
  if (lowerPrompt.includes('help') && (lowerPrompt.includes('complex') || lowerPrompt.includes('difficult') || lowerPrompt.includes('can\'t'))) {
    return "I see you need additional help with this. Let me connect you with a specialist who can provide more detailed assistance.\n\n**Connecting to Specialist**\n\nBased on your request, I'm transferring you to a specialist who can:\n• Provide detailed guidance\n• Handle complex scenarios\n• Offer personalized solutions\n• Answer advanced questions\n\nPlease hold while I connect you...";
  }
  
  return "I'm here to connect you with a human agent when needed. I can transfer you to:\n\n• **Sales Specialist**: For contracts, deals, and sales questions\n• **Technical Support**: For technical issues and troubleshooting\n• **General Support**: For account and general questions\n• **Supervisor**: For escalations and complex issues\n\nWould you like me to connect you with a specific type of specialist, or would you prefer general support?";
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

