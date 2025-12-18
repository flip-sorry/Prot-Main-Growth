import { AgentType } from './types';
import type { PromptUnderstanding } from './types';

/**
 * Routes prompts to the appropriate specialized agent based on understanding
 */
export function routeToAgent(understanding: PromptUnderstanding): AgentType {
  const { intent, entities, interpreted } = understanding;
  const lowerInterpreted = interpreted.toLowerCase();
  
  // File Organizer: organize, arrange, group, rename files/documents
  if (
    intent === 'organize' ||
    lowerInterpreted.includes('organize') ||
    lowerInterpreted.includes('arrange') ||
    lowerInterpreted.includes('group') ||
    (lowerInterpreted.includes('rename') && (lowerInterpreted.includes('file') || lowerInterpreted.includes('document'))) ||
    (lowerInterpreted.includes('move') && (lowerInterpreted.includes('file') || lowerInterpreted.includes('folder')))
  ) {
    return AgentType.FILE_ORGANIZER;
  }
  
  // Document Analytic: analyze, insights, summary, patterns
  if (
    intent === 'analyze' ||
    lowerInterpreted.includes('analyze') ||
    lowerInterpreted.includes('insight') ||
    lowerInterpreted.includes('summary') ||
    lowerInterpreted.includes('pattern') ||
    lowerInterpreted.includes('trend') ||
    lowerInterpreted.includes('statistic')
  ) {
    return AgentType.DOCUMENT_ANALYTIC;
  }
  
  // File Manager: list, search, find, delete files
  if (
    intent === 'search' ||
    intent === 'manage' ||
    lowerInterpreted.includes('list') ||
    lowerInterpreted.includes('find') ||
    lowerInterpreted.includes('search') ||
    (lowerInterpreted.includes('delete') && lowerInterpreted.includes('file')) ||
    lowerInterpreted.includes('show me')
  ) {
    return AgentType.FILE_MANAGER;
  }
  
  // Sales Agent: contracts, deals, sales, invoices (business context)
  if (
    intent === 'sales' ||
    lowerInterpreted.includes('contract') ||
    lowerInterpreted.includes('deal') ||
    lowerInterpreted.includes('sales') ||
    (lowerInterpreted.includes('invoice') && (lowerInterpreted.includes('contract') || lowerInterpreted.includes('deal'))) ||
    lowerInterpreted.includes('revenue') ||
    lowerInterpreted.includes('pipeline')
  ) {
    return AgentType.SALES_AGENT;
  }
  
  // Knowledge Base: questions, explain, knowledge, documentation
  if (
    intent === 'knowledge' ||
    lowerInterpreted.includes('question') ||
    lowerInterpreted.includes('explain') ||
    lowerInterpreted.includes('knowledge') ||
    lowerInterpreted.includes('documentation') ||
    lowerInterpreted.includes('how does') ||
    lowerInterpreted.includes('what is')
  ) {
    return AgentType.KNOWLEDGE_BASE;
  }
  
  // Help Center: help, how to, what can, support
  if (
    intent === 'help' ||
    lowerInterpreted.includes('help') ||
    lowerInterpreted.includes('how to') ||
    lowerInterpreted.includes('what can') ||
    lowerInterpreted.includes('support') ||
    lowerInterpreted.includes('troubleshoot') ||
    lowerInterpreted.startsWith('?')
  ) {
    return AgentType.HELP_CENTER;
  }
  
  // Default fallback: if it's about files/documents but unclear, use file organizer
  if (entities.some(e => ['file', 'files', 'document', 'documents', 'invoice', 'invoices'].includes(e))) {
    return AgentType.FILE_ORGANIZER;
  }
  
  // Ultimate fallback: help center for general queries
  return AgentType.HELP_CENTER;
}

