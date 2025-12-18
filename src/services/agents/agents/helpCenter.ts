import { AgentType } from '../types';
import type { AgentThought } from '../types';

export interface HelpCenterResult {
  thoughts: AgentThought[];
  response: string;
}

/**
 * Help Center Agent
 * Handles help/support: provide help information, troubleshooting guidance, feature explanations
 */
export async function* processHelpCenter(
  prompt: string,
  interpretedPrompt: string
): AsyncGenerator<AgentThought, HelpCenterResult> {
  const thoughts: AgentThought[] = [];
  let thoughtId = 1;
  
  // Thought 1: Understanding help request
  const thought1: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Understanding request',
    reasoning: `The user needs help. Analyzing: "${interpretedPrompt}"`,
    agent: AgentType.HELP_CENTER,
    timestamp: Date.now(),
  };
  thoughts.push(thought1);
  yield thought1;
  await delay(300);
  
  // Thought 2: Finding relevant help content
  const thought2: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Finding help content',
    reasoning: 'Searching help center for relevant articles and guidance.',
    agent: AgentType.HELP_CENTER,
    timestamp: Date.now(),
  };
  thoughts.push(thought2);
  yield thought2;
  await delay(400);
  
  // Thought 3: Preparing response
  const thought3: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Preparing response',
    reasoning: 'Compiling helpful information and actionable guidance.',
    agent: AgentType.HELP_CENTER,
    timestamp: Date.now(),
  };
  thoughts.push(thought3);
  yield thought3;
  await delay(300);
  
  // Generate response
  const response = generateHelpCenterResponse(interpretedPrompt);
  
  return {
    thoughts,
    response,
  };
}

function generateHelpCenterResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('what can') || lowerPrompt.includes('what do')) {
    return "I can help you with many tasks! Here's what I can do:\n\n• **File Organizer**: Organize, rename, and group your files and documents\n• **Document Analytic**: Analyze documents and provide insights\n• **File Manager**: List, search, and manage your files\n• **Sales Agent**: Track contracts, deals, and sales metrics\n• **Knowledge Base**: Answer questions from documentation\n• **Help Center**: Provide support and troubleshooting\n\nWhat would you like help with?";
  }
  
  if (lowerPrompt.includes('help') && lowerPrompt.includes('organize')) {
    return "I can help you organize files! Here's how:\n\n1. Tell me what you want to organize (e.g., 'organize completed invoices')\n2. I'll identify the files matching your criteria\n3. I'll suggest an organization method\n4. You can approve or customize the organization\n\nTry saying: 'Arrange the invoices that have been completed' or 'Organize completed contracts'";
  }
  
  if (lowerPrompt.includes('troubleshoot') || lowerPrompt.includes('problem')) {
    return "I'm here to help troubleshoot! Common issues and solutions:\n\n• **Can't find files**: Use the File Manager agent to search\n• **Need to analyze documents**: Ask the Document Analytic agent\n• **Contract questions**: The Sales Agent can help\n• **General questions**: The Knowledge Base agent has answers\n\nWhat specific issue are you experiencing?";
  }
  
  if (lowerPrompt === 'help' || lowerPrompt === '?') {
    return "Hello! I'm here to help. I can assist you with:\n\n• Organizing and managing files\n• Analyzing documents\n• Tracking sales and contracts\n• Answering questions\n• Providing support\n\nWhat would you like to do? Try asking me to organize files, analyze documents, or help with contracts!";
  }
  
  return "I'm here to help! I can assist you with file organization, document analysis, sales tracking, and more. What specific task would you like help with? You can ask me to organize files, analyze documents, or answer questions about how things work.";
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

