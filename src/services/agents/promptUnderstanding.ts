import type { PromptUnderstanding } from './types';

/**
 * Analyzes and interprets user prompts to understand intent and extract key information
 */
export function understandPrompt(prompt: string): PromptUnderstanding {
  const lowerPrompt = prompt.toLowerCase().trim();
  
  // Extract entities (common document/file-related terms)
  const entities: string[] = [];
  const entityPatterns = [
    /\b(invoice|invoices)\b/gi,
    /\b(contract|contracts)\b/gi,
    /\b(document|documents)\b/gi,
    /\b(file|files)\b/gi,
    /\b(folder|folders)\b/gi,
    /\b(completed|finished|done)\b/gi,
    /\b(pending|waiting|awaiting)\b/gi,
    /\b(organize|organizing|arrange|arranging)\b/gi,
    /\b(rename|renaming|rename)\b/gi,
    /\b(analyze|analysis|analyzing)\b/gi,
  ];
  
  entityPatterns.forEach(pattern => {
    const matches = lowerPrompt.match(pattern);
    if (matches) {
      entities.push(...matches.map(m => m.toLowerCase()));
    }
  });
  
  // Determine intent
  let intent = 'general';
  if (lowerPrompt.includes('organize') || lowerPrompt.includes('arrange') || lowerPrompt.includes('group')) {
    intent = 'organize';
  } else if (lowerPrompt.includes('analyze') || lowerPrompt.includes('insight') || lowerPrompt.includes('summary')) {
    intent = 'analyze';
  } else if (lowerPrompt.includes('find') || lowerPrompt.includes('search') || lowerPrompt.includes('list')) {
    intent = 'search';
  } else if (lowerPrompt.includes('rename') || lowerPrompt.includes('move') || lowerPrompt.includes('delete')) {
    intent = 'manage';
  } else if (lowerPrompt.includes('contract') || lowerPrompt.includes('deal') || lowerPrompt.includes('sales')) {
    intent = 'sales';
  } else if (lowerPrompt.includes('help') || lowerPrompt.includes('how') || lowerPrompt.includes('what can')) {
    intent = 'help';
  } else if (lowerPrompt.includes('question') || lowerPrompt.includes('explain') || lowerPrompt.includes('knowledge')) {
    intent = 'knowledge';
  }
  
  // Interpret the prompt (normalize and clarify)
  let interpreted = prompt.trim();
  
  // Add context if needed
  if (lowerPrompt.includes('invoices') && !lowerPrompt.includes('completed')) {
    interpreted = `Organize ${lowerPrompt.includes('the') ? 'the' : ''} invoices`;
  }
  
  // Check if clarification is needed
  const needsClarification = 
    lowerPrompt.length < 5 ||
    (lowerPrompt.includes('what') && !lowerPrompt.includes('can')) ||
    lowerPrompt === 'help' ||
    lowerPrompt === '?';
  
  // Calculate confidence based on prompt clarity
  let confidence = 0.8;
  if (needsClarification) {
    confidence = 0.3;
  } else if (entities.length > 0 && intent !== 'general') {
    confidence = 0.9;
  } else if (lowerPrompt.length < 10) {
    confidence = 0.6;
  }
  
  return {
    original: prompt,
    interpreted,
    needsClarification,
    intent,
    entities: [...new Set(entities)], // Remove duplicates
    confidence,
  };
}

