import { AgentType } from '../types';
import type { AgentThought } from '../types';

export interface KnowledgeBaseResult {
  thoughts: AgentThought[];
  response: string;
}

/**
 * Knowledge Base Agent
 * Handles knowledge base queries: answer questions from KB, search documentation, provide explanations
 */
export async function* processKnowledgeBase(
  prompt: string,
  interpretedPrompt: string
): AsyncGenerator<AgentThought, KnowledgeBaseResult> {
  const thoughts: AgentThought[] = [];
  let thoughtId = 1;
  
  // Thought 1: Understanding question
  const thought1: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Understanding question',
    reasoning: `The user has a knowledge question. Analyzing: "${interpretedPrompt}"`,
    agent: AgentType.KNOWLEDGE_BASE,
    timestamp: Date.now(),
  };
  thoughts.push(thought1);
  yield thought1;
  await delay(300);
  
  // Thought 2: Searching knowledge base
  const thought2: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Searching knowledge base',
    reasoning: 'Querying the knowledge base for relevant information and documentation.',
    agent: AgentType.KNOWLEDGE_BASE,
    timestamp: Date.now(),
  };
  thoughts.push(thought2);
  yield thought2;
  await delay(400);
  
  // Thought 3: Compiling answer
  const thought3: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Compiling answer',
    reasoning: 'Gathering relevant information from multiple sources and preparing a comprehensive answer.',
    agent: AgentType.KNOWLEDGE_BASE,
    timestamp: Date.now(),
  };
  thoughts.push(thought3);
  yield thought3;
  await delay(300);
  
  // Generate response
  const response = generateKnowledgeBaseResponse(interpretedPrompt);
  
  return {
    thoughts,
    response,
  };
}

function generateKnowledgeBaseResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('what is') || lowerPrompt.includes('explain')) {
    return "Based on the knowledge base, here's what I found: This feature helps you manage documents and contracts efficiently. It allows you to organize files, track contract statuses, and analyze your business documents. The system supports multiple document types including contracts, invoices, and agreements. Would you like more details on any specific aspect?";
  }
  
  if (lowerPrompt.includes('how does') || lowerPrompt.includes('how to')) {
    return "According to the documentation, here's how it works: You can organize documents by using the file organizer agent, track sales with the sales agent, and analyze documents with the document analytic agent. Each agent specializes in different tasks to help you manage your workflow efficiently. Would you like step-by-step instructions for a specific task?";
  }
  
  if (lowerPrompt.includes('documentation') || lowerPrompt.includes('knowledge')) {
    return "I found relevant documentation on this topic. The knowledge base contains information about file management, contract processing, document analysis, and sales tracking. The system uses specialized agents to handle different types of requests. What specific topic would you like to learn more about?";
  }
  
  return "I can answer questions from the knowledge base and help you understand how things work. I have access to documentation on file management, contracts, document analysis, and sales tracking. What would you like to know?";
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

