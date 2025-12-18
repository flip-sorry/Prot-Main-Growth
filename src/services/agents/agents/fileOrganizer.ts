import { AgentType } from '../types';
import type { AgentThought } from '../types';

export interface FileOrganizerResult {
  thoughts: AgentThought[];
  response: string;
}

/**
 * File Organizer Agent
 * Handles file organization tasks: organize, rename, move, group files/documents
 */
export async function* processFileOrganizer(
  prompt: string,
  interpretedPrompt: string
): AsyncGenerator<AgentThought, FileOrganizerResult> {
  const thoughts: AgentThought[] = [];
  let thoughtId = 1;
  
  // Thought 1: Understanding the request
  const thought1: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Understanding request',
    reasoning: `The user wants to organize files. Analyzing the prompt: "${interpretedPrompt}"`,
    agent: AgentType.FILE_ORGANIZER,
    timestamp: Date.now(),
  };
  thoughts.push(thought1);
  yield thought1;
  await delay(300);
  
  // Thought 2: Identifying files to organize
  const thought2: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Identifying files',
    reasoning: 'Looking for files that match the criteria. Checking for completed invoices, contracts, or documents.',
    agent: AgentType.FILE_ORGANIZER,
    timestamp: Date.now(),
  };
  thoughts.push(thought2);
  yield thought2;
  await delay(400);
  
  // Thought 3: Determining organization strategy
  const thought3: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Planning organization',
    reasoning: 'Determining the best way to organize these files. Will group by status, date, or type as appropriate.',
    agent: AgentType.FILE_ORGANIZER,
    timestamp: Date.now(),
  };
  thoughts.push(thought3);
  yield thought3;
  await delay(300);
  
  // Generate response
  const response = generateFileOrganizerResponse(interpretedPrompt);
  
  return {
    thoughts,
    response,
  };
}

function generateFileOrganizerResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('invoice') && lowerPrompt.includes('completed')) {
    return "I'll organize the completed invoices for you. I found 12 completed invoices that I can group by date and client. Would you like me to create folders for each month, or organize them by client name?";
  }
  
  if (lowerPrompt.includes('rename')) {
    return "I can help rename your files. I found several files that could benefit from better naming. Would you like me to rename them using a consistent format, or do you have a specific naming pattern in mind?";
  }
  
  if (lowerPrompt.includes('organize') || lowerPrompt.includes('arrange')) {
    return "I'll organize your files based on their type and status. I can group them by document type, date, or status. Which organization method would you prefer?";
  }
  
  return "I'm ready to help organize your files. I can group them by type, date, status, or client. What would you like me to organize?";
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

