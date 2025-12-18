import { AgentType } from './types';
import type { PromptUnderstanding } from './types';
import type { ConversationContext } from './conversationContext';
import { checkAgentRelevance } from './agentRelevanceChecker';

/**
 * Relevance score for an agent
 */
export interface RelevanceScore {
  agent: AgentType;
  score: number;
  reason: string;
}

/**
 * Result of finding the best agent
 */
export interface BestAgentResult {
  agent: AgentType;
  score: number;
  reason: string;
  alternatives?: RelevanceScore[];
}

/**
 * Calculates a relevance score (0-1) for a specific agent
 * Higher scores indicate better fit
 */
export function calculateRelevanceScore(
  agentType: AgentType,
  understanding: PromptUnderstanding,
  context?: ConversationContext
): RelevanceScore {
  // Base relevance check (boolean)
  const isRelevant = checkAgentRelevance(agentType, understanding);
  
  // Start with base score
  let score = isRelevant ? 0.7 : 0.2;
  
  // Boost score based on confidence in understanding
  score += understanding.confidence * 0.2;
  
  // Boost score if intent matches agent's primary domain
  const intentMatch = checkIntentMatch(agentType, understanding.intent);
  if (intentMatch) {
    score += 0.1;
  }
  
  // Boost score if entities match agent's domain
  const entityMatch = checkEntityMatch(agentType, understanding.entities);
  if (entityMatch) {
    score += 0.1;
  }
  
  // Context continuity bonus: if same agent as last, boost score
  if (context?.lastAgent === agentType && !understanding.needsClarification) {
    score += 0.15;
  }
  
  // Penalty for context switch: if different agent and context switch detected
  if (
    context?.lastAgent &&
    context.lastAgent !== agentType &&
    context.currentTopic
  ) {
    const lowerPrompt = understanding.original.toLowerCase();
    const topicKeywords = context.currentTopic.toLowerCase().split(/\s+/);
    const hasTopicKeywords = topicKeywords.some((keyword) =>
      lowerPrompt.includes(keyword)
    );
    if (!hasTopicKeywords) {
      // Likely a context switch, don't penalize too much
      score -= 0.05;
    }
  }
  
  // Cap score between 0 and 1
  score = Math.max(0, Math.min(1, score));
  
  // Generate reason
  const reason = generateReason(agentType, understanding, score, isRelevant, context);
  
  return {
    agent: agentType,
    score,
    reason,
  };
}

/**
 * Finds the best agent for a given understanding
 * Returns the agent with the highest relevance score
 */
export function findBestAgent(
  understanding: PromptUnderstanding,
  context?: ConversationContext
): BestAgentResult {
  const allAgents = Object.values(AgentType);
  
  // Score all agents
  const scores = allAgents.map((agent) =>
    calculateRelevanceScore(agent, understanding, context)
  );
  
  // Sort by score (descending)
  scores.sort((a, b) => b.score - a.score);
  
  const best = scores[0];
  const alternatives = scores.slice(1, 4); // Top 3 alternatives
  
  return {
    agent: best.agent,
    score: best.score,
    reason: best.reason,
    alternatives,
  };
}

/**
 * Checks if intent matches agent's primary domain
 */
function checkIntentMatch(agentType: AgentType, intent: string): boolean {
  const intentMap: Record<AgentType, string[]> = {
    [AgentType.FILE_ORGANIZER]: ['organize'],
    [AgentType.DOCUMENT_ANALYTIC]: ['analyze'],
    [AgentType.FILE_MANAGER]: ['search', 'manage'],
    [AgentType.SALES_AGENT]: ['sales'],
    [AgentType.KNOWLEDGE_BASE]: ['knowledge'],
    [AgentType.HELP_CENTER]: ['help', 'general'],
  };
  
  const agentIntents = intentMap[agentType] || [];
  return agentIntents.includes(intent);
}

/**
 * Checks if entities match agent's domain
 */
function checkEntityMatch(agentType: AgentType, entities: string[]): boolean {
  const entityMap: Record<AgentType, string[]> = {
    [AgentType.FILE_ORGANIZER]: ['file', 'files', 'document', 'documents', 'invoice', 'invoices'],
    [AgentType.DOCUMENT_ANALYTIC]: ['document', 'documents', 'file', 'files'],
    [AgentType.FILE_MANAGER]: ['file', 'files', 'document', 'documents'],
    [AgentType.SALES_AGENT]: ['contract', 'contracts', 'deal', 'deals', 'sales', 'revenue'],
    [AgentType.KNOWLEDGE_BASE]: ['pandadoc', 'template', 'templates', 'esignature', 'signature', 'notary', 'integration', 'integrations', 'content library', 'help center', 'support'],
    [AgentType.HELP_CENTER]: [],
  };
  
  const agentEntities = entityMap[agentType] || [];
  return entities.some((entity) => agentEntities.includes(entity));
}

/**
 * Generates a human-readable reason for the relevance score
 */
function generateReason(
  agentType: AgentType,
  understanding: PromptUnderstanding,
  score: number,
  isRelevant: boolean,
  context?: ConversationContext
): string {
  const reasons: string[] = [];
  
  if (!isRelevant) {
    reasons.push('not relevant to agent domain');
  } else {
    reasons.push('matches agent domain');
  }
  
  if (understanding.confidence > 0.8) {
    reasons.push('high confidence in understanding');
  } else if (understanding.confidence < 0.5) {
    reasons.push('low confidence in understanding');
  }
  
  if (checkIntentMatch(agentType, understanding.intent)) {
    reasons.push('intent matches');
  }
  
  if (checkEntityMatch(agentType, understanding.entities)) {
    reasons.push('entities match');
  }
  
  if (context?.lastAgent === agentType) {
    reasons.push('context continuity');
  }
  
  if (score >= 0.8) {
    reasons.push('excellent fit');
  } else if (score >= 0.6) {
    reasons.push('good fit');
  } else if (score >= 0.4) {
    reasons.push('moderate fit');
  } else {
    reasons.push('poor fit');
  }
  
  return reasons.join(', ');
}

