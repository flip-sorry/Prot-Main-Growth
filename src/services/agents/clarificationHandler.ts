import type { PromptUnderstanding } from './types';

/**
 * Checks if prompt understanding requires clarification
 */
export function needsClarification(understanding: PromptUnderstanding): boolean {
  // Check explicit needsClarification flag
  if (understanding.needsClarification) {
    return true;
  }
  
  // Check confidence threshold
  if (understanding.confidence < 0.3) {
    return true;
  }
  
  // Check if intent is too general and no entities
  if (understanding.intent === 'general' && understanding.entities.length === 0) {
    return true;
  }
  
  // Check if prompt is too short
  if (understanding.original.trim().length < 5) {
    return true;
  }
  
  return false;
}

/**
 * Generates a clarification question based on the understanding
 */
export function generateClarificationPrompt(
  understanding: PromptUnderstanding
): string {
  const { original, intent, entities, confidence } = understanding;
  
  // Very low confidence or very short prompt
  if (confidence < 0.3 || original.trim().length < 5) {
    return "I'd like to help you, but I need a bit more information. Could you please provide more details about what you'd like me to do?";
  }
  
  // General intent with no entities
  if (intent === 'general' && entities.length === 0) {
    return "I understand you need help, but could you be more specific? For example, are you looking to:\n• Organize files or documents\n• Analyze documents\n• Search for files\n• Get help with contracts or sales\n• Answer a question\n\nWhat would you like to do?";
  }
  
  // Has entities but unclear intent
  if (entities.length > 0 && intent === 'general') {
    const entityList = entities.slice(0, 3).join(', ');
    return `I see you mentioned ${entityList}, but I'm not sure what you'd like me to do with them. Would you like me to:\n• Organize them\n• Analyze them\n• Search for them\n• Something else?\n\nPlease let me know what action you'd like me to take.`;
  }
  
  // Default clarification
  return "I want to make sure I understand correctly. Could you provide a bit more detail about what you're looking for?";
}

/**
 * Processes user's clarification response
 * Enhances the original understanding with clarification context
 */
export function handleClarificationResponse(
  originalUnderstanding: PromptUnderstanding,
  clarification: string
): PromptUnderstanding {
  // Combine original prompt with clarification
  const enhancedPrompt = `${originalUnderstanding.original} ${clarification}`.trim();
  
  // Return enhanced understanding (will be re-processed by understandPrompt)
  return {
    ...originalUnderstanding,
    original: enhancedPrompt,
    interpreted: enhancedPrompt,
    needsClarification: false,
    confidence: Math.min(0.95, originalUnderstanding.confidence + 0.2), // Boost confidence
  };
}

