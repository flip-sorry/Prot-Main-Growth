import { AgentType } from '../types';
import type { AgentThought } from '../types';

export interface FileManagerResult {
  thoughts: AgentThought[];
  response: string;
}

/**
 * File Manager Agent
 * Handles general file operations: list, search, find, delete files, file metadata operations
 */
export async function* processFileManager(
  prompt: string,
  interpretedPrompt: string
): AsyncGenerator<AgentThought, FileManagerResult> {
  const thoughts: AgentThought[] = [];
  let thoughtId = 1;
  
  // Thought 1: Understanding file operation
  const thought1: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Understanding request',
    reasoning: `The user wants to perform a file operation. Analyzing: "${interpretedPrompt}"`,
    agent: AgentType.FILE_MANAGER,
    timestamp: Date.now(),
  };
  thoughts.push(thought1);
  yield thought1;
  await delay(300);
  
  // Thought 2: Searching files
  const thought2: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Searching files',
    reasoning: 'Querying the file system to find matching files based on the criteria.',
    agent: AgentType.FILE_MANAGER,
    timestamp: Date.now(),
  };
  thoughts.push(thought2);
  yield thought2;
  await delay(400);
  
  // Thought 3: Processing results
  const thought3: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Processing results',
    reasoning: 'Filtering and organizing the search results to present the most relevant files.',
    agent: AgentType.FILE_MANAGER,
    timestamp: Date.now(),
  };
  thoughts.push(thought3);
  yield thought3;
  await delay(300);
  
  // Generate response
  const response = generateFileManagerResponse(interpretedPrompt);
  
  return {
    thoughts,
    response,
  };
}

function generateFileManagerResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('list') || lowerPrompt.includes('show')) {
    return "I found 45 files in your workspace. Here are the most recent ones: Website Development Contract, Cloud Services Agreement, Consulting Agreement, Web Design Agreement, and 41 more. Would you like me to filter these by type, date, or status?";
  }
  
  if (lowerPrompt.includes('find') || lowerPrompt.includes('search')) {
    return "I've searched your files and found 8 matches. The most relevant results include: Website Development Contract (To approve), Cloud Services Agreement (To approve), and Consulting Agreement (To sign). Would you like to see more details about any of these?";
  }
  
  if (lowerPrompt.includes('delete')) {
    return "I can help you delete files. For safety, I'll need confirmation before deleting. Which files would you like to remove? Please specify the file names or IDs.";
  }
  
  return "I can help you manage your files. I can list files, search for specific documents, show file details, or help with file operations. What would you like to do?";
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

