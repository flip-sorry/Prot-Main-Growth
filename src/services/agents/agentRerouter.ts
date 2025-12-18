import { AgentType } from './types';
import type { PromptUnderstanding } from './types';
import type { ConversationContext } from './conversationContext';
import { calculateRelevanceScore, findBestAgent } from './agentRelevanceScorer';

/**
 * Configuration for rerouting behavior
 */
const REROUTE_THRESHOLD = 0.6; // Minimum relevance score to avoid rerouting
const REROUTE_SCORE_DIFFERENCE = 0.15; // Minimum score difference to trigger reroute

/**
 * Determines if rerouting is needed based on relevance score
 */
export function shouldReroute(
  currentAgent: AgentType,
  understanding: PromptUnderstanding,
  context?: ConversationContext
): boolean {
  const score = calculateRelevanceScore(currentAgent, understanding, context);
  
  // Reroute if score is below threshold
  if (score.score < REROUTE_THRESHOLD) {
    return true;
  }
  
  // Check if there's a significantly better agent
  const bestAgent = findBestAgent(understanding, context);
  if (
    bestAgent.agent !== currentAgent &&
    bestAgent.score > score.score + REROUTE_SCORE_DIFFERENCE
  ) {
    return true;
  }
  
  return false;
}

/**
 * Finds a better agent when the current one is not relevant
 */
export function findBetterAgent(
  currentAgent: AgentType,
  understanding: PromptUnderstanding,
  context?: ConversationContext
): { agent: AgentType; reason: string; score: number } | null {
  const bestAgent = findBestAgent(understanding, context);
  const currentScore = calculateRelevanceScore(currentAgent, understanding, context);
  
  // Only suggest reroute if the best agent is significantly better
  if (
    bestAgent.agent !== currentAgent &&
    bestAgent.score > currentScore.score + REROUTE_SCORE_DIFFERENCE
  ) {
    return {
      agent: bestAgent.agent,
      reason: bestAgent.reason,
      score: bestAgent.score,
    };
  }
  
  return null;
}

/**
 * Creates a user-friendly reroute notification message
 */
export function createRerouteNotification(
  fromAgent: AgentType,
  toAgent: AgentType,
  reason: string
): string {
  const fromName = getAgentName(fromAgent);
  const toName = getAgentName(toAgent);
  
  return `I've determined that ${toName} is better suited to handle this request. ${reason} Transferring your request now.`;
}

/**
 * Handles the rerouting process
 * Returns the new agent to route to, or null if no reroute is needed
 */
export function handleReroute(
  currentAgent: AgentType,
  understanding: PromptUnderstanding,
  context?: ConversationContext
): {
  shouldReroute: boolean;
  newAgent?: AgentType;
  reason?: string;
  notification?: string;
} {
  if (!shouldReroute(currentAgent, understanding, context)) {
    return { shouldReroute: false };
  }
  
  const betterAgent = findBetterAgent(currentAgent, understanding, context);
  
  if (!betterAgent) {
    // No better agent found, keep current
    return { shouldReroute: false };
  }
  
  const notification = createRerouteNotification(
    currentAgent,
    betterAgent.agent,
    betterAgent.reason
  );
  
  return {
    shouldReroute: true,
    newAgent: betterAgent.agent,
    reason: betterAgent.reason,
    notification,
  };
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

