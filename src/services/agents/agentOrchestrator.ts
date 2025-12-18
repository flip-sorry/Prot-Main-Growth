import { understandPrompt } from './promptUnderstanding';
import { routeToAgent } from './agentRouter';
import { agentRegistry } from './agents';
import type { AgentThought, AgentResponse, AgentType } from './types';

/**
 * Agent Orchestrator
 * Coordinates prompt understanding, routing, and streaming thoughts
 */
export async function* processPrompt(
  prompt: string
): AsyncGenerator<AgentThought, AgentResponse> {
  const thoughts: AgentThought[] = [];
  let thoughtId = 1;
  
  // Step 1: Understand the prompt
  const understandingThought: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Understanding prompt',
    reasoning: `Analyzing user prompt: "${prompt}"`,
    agent: AgentType.HELP_CENTER, // Default for orchestration thoughts
    timestamp: Date.now(),
  };
  thoughts.push(understandingThought);
  yield understandingThought;
  await delay(400);
  
  const understanding = understandPrompt(prompt);
  
  // Step 2: Explain prompt to self (internal explanation)
  const explanationThought: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Interpreting request',
    reasoning: `User wants: "${understanding.interpreted}". Intent: ${understanding.intent}. Entities: ${understanding.entities.join(', ') || 'none'}. Confidence: ${Math.round(understanding.confidence * 100)}%`,
    agent: AgentType.HELP_CENTER,
    timestamp: Date.now(),
  };
  thoughts.push(explanationThought);
  yield explanationThought;
  await delay(300);
  
  // Step 3: Route to appropriate agent
  const selectedAgent = routeToAgent(understanding);
  
  const routingThought: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Routing to agent',
    reasoning: `Routing request to ${getAgentName(selectedAgent)} agent based on intent and entities.`,
    agent: selectedAgent,
    timestamp: Date.now(),
  };
  thoughts.push(routingThought);
  yield routingThought;
  await delay(300);
  
  // Step 4: Process with selected agent
  const agentProcessor = agentRegistry[selectedAgent];
  const agentGenerator = agentProcessor(prompt, understanding.interpreted);
  
  let agentResult: Awaited<ReturnType<typeof agentProcessor>> | undefined;
  let result = await agentGenerator.next();
  
  while (!result.done) {
    const thought = result.value;
    thoughts.push(thought);
    yield thought;
    result = await agentGenerator.next();
  }
  
  // Get final result from agent (the return value when generator completes)
  if (result.done && result.value) {
    agentResult = result.value;
  }
  
  if (!agentResult) {
    throw new Error('Failed to get result from agent');
  }
  
  // Step 5: Compile final response
  const finalResponse: AgentResponse = {
    id: `response-${Date.now()}`,
    thoughts: [...thoughts, ...agentResult.thoughts],
    response: agentResult.response,
    agent: selectedAgent,
    timestamp: Date.now(),
  };
  
  return finalResponse;
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

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

