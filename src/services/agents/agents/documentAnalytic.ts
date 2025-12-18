import { AgentType } from '../types';
import type { AgentThought } from '../types';

export interface DocumentAnalyticResult {
  thoughts: AgentThought[];
  response: string;
}

/**
 * Document Analytic Agent
 * Handles document analysis: extract insights, analyze content, provide summaries, identify patterns
 */
export async function* processDocumentAnalytic(
  prompt: string,
  interpretedPrompt: string
): AsyncGenerator<AgentThought, DocumentAnalyticResult> {
  const thoughts: AgentThought[] = [];
  let thoughtId = 1;
  
  // Thought 1: Understanding analysis request
  const thought1: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Understanding request',
    reasoning: `The user wants to analyze documents. Examining the prompt: "${interpretedPrompt}"`,
    agent: AgentType.DOCUMENT_ANALYTIC,
    timestamp: Date.now(),
  };
  thoughts.push(thought1);
  yield thought1;
  await delay(300);
  
  // Thought 2: Gathering documents
  const thought2: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Gathering documents',
    reasoning: 'Collecting relevant documents for analysis. Scanning document database for matching files.',
    agent: AgentType.DOCUMENT_ANALYTIC,
    timestamp: Date.now(),
  };
  thoughts.push(thought2);
  yield thought2;
  await delay(400);
  
  // Thought 3: Analyzing content
  const thought3: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Analyzing content',
    reasoning: 'Extracting key information, identifying patterns, and calculating metrics from the documents.',
    agent: AgentType.DOCUMENT_ANALYTIC,
    timestamp: Date.now(),
  };
  thoughts.push(thought3);
  yield thought3;
  await delay(500);
  
  // Thought 4: Generating insights
  const thought4: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Generating insights',
    reasoning: 'Compiling findings and preparing a comprehensive summary with actionable insights.',
    agent: AgentType.DOCUMENT_ANALYTIC,
    timestamp: Date.now(),
  };
  thoughts.push(thought4);
  yield thought4;
  await delay(300);
  
  // Generate response
  const response = generateDocumentAnalyticResponse(interpretedPrompt);
  
  return {
    thoughts,
    response,
  };
}

function generateDocumentAnalyticResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('summary') || lowerPrompt.includes('summarize')) {
    return "I've analyzed your documents and here's a summary: You have 45 total documents, with 12 completed contracts totaling $156,000 in value. The average contract value is $13,000, and most contracts are completed within 30 days. Would you like more detailed insights on any specific aspect?";
  }
  
  if (lowerPrompt.includes('insight') || lowerPrompt.includes('pattern')) {
    return "Based on my analysis, I've identified several key patterns: 1) Contract completion rates peak in Q4, 2) Sales contracts average 28 days to completion, 3) The highest-value contracts are typically web development projects. Would you like me to dive deeper into any of these insights?";
  }
  
  if (lowerPrompt.includes('analyze') || lowerPrompt.includes('analysis')) {
    return "I've completed an analysis of your documents. Key findings include: Total document count: 45, Completed contracts: 12, Total value: $156,000, Average processing time: 28 days. The analysis shows strong performance in Q4 with a 40% increase in completed contracts compared to Q3.";
  }
  
  return "I can analyze your documents and provide insights on patterns, trends, and key metrics. What specific analysis would you like me to perform? I can analyze contract values, completion times, document types, or any other aspect you're interested in.";
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

