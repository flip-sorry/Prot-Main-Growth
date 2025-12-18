import { AgentType } from '../types';
import type { AgentThought } from '../types';

export interface SalesAgentResult {
  thoughts: AgentThought[];
  response: string;
}

/**
 * Sales Agent
 * Handles sales-related queries: contract information, deal status, sales metrics, contract management
 */
export async function* processSalesAgent(
  prompt: string,
  interpretedPrompt: string
): AsyncGenerator<AgentThought, SalesAgentResult> {
  const thoughts: AgentThought[] = [];
  let thoughtId = 1;
  
  // Thought 1: Understanding sales query
  const thought1: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Understanding request',
    reasoning: `The user has a sales-related question. Analyzing: "${interpretedPrompt}"`,
    agent: AgentType.SALES_AGENT,
    timestamp: Date.now(),
  };
  thoughts.push(thought1);
  yield thought1;
  await delay(300);
  
  // Thought 2: Gathering sales data
  const thought2: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Gathering sales data',
    reasoning: 'Querying sales database for contracts, deals, and revenue information.',
    agent: AgentType.SALES_AGENT,
    timestamp: Date.now(),
  };
  thoughts.push(thought2);
  yield thought2;
  await delay(400);
  
  // Thought 3: Analyzing sales metrics
  const thought3: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Analyzing metrics',
    reasoning: 'Calculating sales metrics, contract values, and pipeline status.',
    agent: AgentType.SALES_AGENT,
    timestamp: Date.now(),
  };
  thoughts.push(thought3);
  yield thought3;
  await delay(300);
  
  // Generate response
  const response = generateSalesAgentResponse(interpretedPrompt);
  
  return {
    thoughts,
    response,
  };
}

function generateSalesAgentResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('contract') && lowerPrompt.includes('status')) {
    return "Here's your contract status overview: 4 contracts pending approval, 2 contracts waiting for signature, 3 contracts awaiting payment, and 12 completed contracts. Total pipeline value: $156,000. Would you like details on any specific contract?";
  }
  
  if (lowerPrompt.includes('deal') || lowerPrompt.includes('pipeline')) {
    return "Your sales pipeline shows strong activity: 9 active deals worth $89,500, with an average deal size of $9,944. The pipeline is weighted toward Q4 with 6 deals expected to close this month. Top opportunities include the Website Development Contract ($12,300) and Cloud Services Agreement ($16,700).";
  }
  
  if (lowerPrompt.includes('revenue') || lowerPrompt.includes('sales')) {
    return "Sales metrics: Total revenue this quarter: $156,000 from 12 completed contracts. Average contract value: $13,000. The sales cycle averages 28 days. Your top performing contract types are web development and cloud services. Would you like a breakdown by month or contract type?";
  }
  
  if (lowerPrompt.includes('contract')) {
    return "I can help you with contract information. You have 21 total contracts: 4 pending approval, 2 awaiting signature, 3 waiting for payment, and 12 completed. Total value: $156,000. What specific contract information would you like?";
  }
  
  return "I'm your sales assistant. I can help you track contracts, monitor your sales pipeline, analyze revenue metrics, and manage deals. What would you like to know about your sales?";
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

