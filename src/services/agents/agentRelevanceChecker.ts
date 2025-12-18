import { AgentType } from './types';
import type { PromptUnderstanding } from './types';

/**
 * Checks if a question is relevant to a specific agent's domain
 * Returns true if the question matches the agent's capabilities, false otherwise
 */
export function checkAgentRelevance(
  agentType: AgentType,
  understanding: PromptUnderstanding
): boolean {
  // #region debug log
  const logData = {location:'agentRelevanceChecker.ts:8',message:'Checking agent relevance',data:{agentType,interpreted:understanding.interpreted,intent:understanding.intent,entities:understanding.entities},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'};
  console.log('[DEBUG]', logData);
  fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(logData)}).catch((e)=>console.error('[DEBUG] Fetch failed:',e));
  // #endregion
  const { intent, entities, interpreted } = understanding;
  const lowerInterpreted = interpreted.toLowerCase();

  let relevant = false;

  switch (agentType) {
    case AgentType.FILE_ORGANIZER:
      relevant = (
        intent === 'organize' ||
        lowerInterpreted.includes('organize') ||
        lowerInterpreted.includes('arrange') ||
        lowerInterpreted.includes('group') ||
        (lowerInterpreted.includes('rename') && (lowerInterpreted.includes('file') || lowerInterpreted.includes('document'))) ||
        (lowerInterpreted.includes('move') && (lowerInterpreted.includes('file') || lowerInterpreted.includes('folder'))) ||
        // Fallback: if it's about files/documents but unclear, file organizer is relevant
        entities.some(e => ['file', 'files', 'document', 'documents', 'invoice', 'invoices'].includes(e))
      );
      break;

    case AgentType.DOCUMENT_ANALYTIC:
      relevant = (
        intent === 'analyze' ||
        lowerInterpreted.includes('analyze') ||
        lowerInterpreted.includes('insight') ||
        lowerInterpreted.includes('summary') ||
        lowerInterpreted.includes('pattern') ||
        lowerInterpreted.includes('trend') ||
        lowerInterpreted.includes('statistic')
      );
      break;

    case AgentType.FILE_MANAGER:
      // Check for domain-specific signals that would override generic FILE_MANAGER matches
      const hasSalesSignals = lowerInterpreted.includes('sales') || 
                             lowerInterpreted.includes('pipeline') || 
                             lowerInterpreted.includes('revenue') ||
                             lowerInterpreted.includes('contract') ||
                             lowerInterpreted.includes('deal');
      const hasAnalyticsSignals = lowerInterpreted.includes('dashboard') ||
                                  lowerInterpreted.includes('kpi') ||
                                  lowerInterpreted.includes('metrics') ||
                                  lowerInterpreted.includes('analytics');
      const hasDocumentAnalyticSignals = lowerInterpreted.includes('analyze') ||
                                         lowerInterpreted.includes('insight') ||
                                         lowerInterpreted.includes('summary') ||
                                         lowerInterpreted.includes('pattern') ||
                                         lowerInterpreted.includes('trend');
      
      // FILE_MANAGER is relevant for file operations, but not if there are stronger domain signals
      relevant = (
        (intent === 'search' ||
         intent === 'manage' ||
         lowerInterpreted.includes('list') ||
         lowerInterpreted.includes('find') ||
         lowerInterpreted.includes('search') ||
         (lowerInterpreted.includes('delete') && lowerInterpreted.includes('file'))) &&
        !hasSalesSignals &&
        !hasAnalyticsSignals &&
        !hasDocumentAnalyticSignals
      ) || (
        // "show me" is only relevant if there are no stronger domain signals
        lowerInterpreted.includes('show me') &&
        !hasSalesSignals &&
        !hasAnalyticsSignals &&
        !hasDocumentAnalyticSignals &&
        !lowerInterpreted.includes('contract') &&
        !lowerInterpreted.includes('deal')
      );
      break;

    case AgentType.SALES_AGENT:
      relevant = (
        intent === 'sales' ||
        lowerInterpreted.includes('contract') ||
        lowerInterpreted.includes('deal') ||
        lowerInterpreted.includes('sales') ||
        (lowerInterpreted.includes('invoice') && (lowerInterpreted.includes('contract') || lowerInterpreted.includes('deal'))) ||
        lowerInterpreted.includes('revenue') ||
        lowerInterpreted.includes('pipeline') ||
        // Pricing and plan queries
        lowerInterpreted.includes('pricing') ||
        lowerInterpreted.includes('price') ||
        lowerInterpreted.includes('cost') ||
        lowerInterpreted.includes('plan') ||
        lowerInterpreted.includes('tier') ||
        lowerInterpreted.includes('subscription') ||
        // Upgrade queries
        lowerInterpreted.includes('upgrade') ||
        lowerInterpreted.includes('should i upgrade') ||
        lowerInterpreted.includes('why upgrade') ||
        lowerInterpreted.includes('which plan') ||
        lowerInterpreted.includes('what plan') ||
        lowerInterpreted.includes('plan comparison') ||
        lowerInterpreted.includes('compare plans') ||
        // Sales/persuasion queries
        lowerInterpreted.includes('convince') ||
        lowerInterpreted.includes('should i use') ||
        lowerInterpreted.includes('why should') ||
        lowerInterpreted.includes('benefit') ||
        // CRM integration queries (sales context)
        (lowerInterpreted.includes('integration') && (lowerInterpreted.includes('salesforce') || lowerInterpreted.includes('hubspot') || lowerInterpreted.includes('pipedrive') || lowerInterpreted.includes('crm'))) ||
        // CPQ queries
        lowerInterpreted.includes('cpq') ||
        (lowerInterpreted.includes('configure') && lowerInterpreted.includes('price') && lowerInterpreted.includes('quote'))
      );
      break;

    case AgentType.ONBOARDING_AGENT:
      relevant = (
        intent === 'onboarding' ||
        lowerInterpreted.includes('onboard') ||
        lowerInterpreted.includes('getting started') ||
        lowerInterpreted.includes('tutorial') ||
        lowerInterpreted.includes('guide') ||
        lowerInterpreted.includes('walkthrough') ||
        (lowerInterpreted.includes('how') && lowerInterpreted.includes('start'))
      );
      break;

    case AgentType.CALL_CENTER_AGENT:
      relevant = (
        intent === 'call-center' ||
        lowerInterpreted.includes('human') ||
        lowerInterpreted.includes('agent') ||
        lowerInterpreted.includes('representative') ||
        lowerInterpreted.includes('speak to') ||
        lowerInterpreted.includes('talk to') ||
        lowerInterpreted.includes('connect') ||
        lowerInterpreted.includes('escalate') ||
        lowerInterpreted.includes('supervisor') ||
        lowerInterpreted.includes('manager')
      );
      break;

    case AgentType.ANALYTICS_AGENT:
      relevant = (
        intent === 'analytics' ||
        lowerInterpreted.includes('dashboard') ||
        lowerInterpreted.includes('kpi') ||
        lowerInterpreted.includes('key performance') ||
        (lowerInterpreted.includes('metrics') && !lowerInterpreted.includes('document')) ||
        (lowerInterpreted.includes('analytics') && !lowerInterpreted.includes('document')) ||
        (lowerInterpreted.includes('performance') && !lowerInterpreted.includes('document')) ||
        lowerInterpreted.includes('visualization') ||
        lowerInterpreted.includes('report')
      );
      break;

    case AgentType.KNOWLEDGE_BASE:
      relevant = (
        intent === 'knowledge' ||
        lowerInterpreted.includes('question') ||
        lowerInterpreted.includes('explain') ||
        lowerInterpreted.includes('knowledge') ||
        lowerInterpreted.includes('documentation') ||
        lowerInterpreted.includes('how does') ||
        lowerInterpreted.includes('what is') ||
        // PandaDoc-specific keywords
        lowerInterpreted.includes('pandadoc') ||
        (lowerInterpreted.includes('template') && (lowerInterpreted.includes('how') || lowerInterpreted.includes('what') || lowerInterpreted.includes('create'))) ||
        (lowerInterpreted.includes('esignature') || lowerInterpreted.includes('e-signature')) ||
        (lowerInterpreted.includes('signature') && (lowerInterpreted.includes('how') || lowerInterpreted.includes('what') || lowerInterpreted.includes('work'))) ||
        lowerInterpreted.includes('notary') ||
        lowerInterpreted.includes('notarization') ||
        (lowerInterpreted.includes('integration') && (lowerInterpreted.includes('how') || lowerInterpreted.includes('what') || lowerInterpreted.includes('setup'))) ||
        (lowerInterpreted.includes('content library') && (lowerInterpreted.includes('how') || lowerInterpreted.includes('what'))) ||
        (lowerInterpreted.includes('send document') && (lowerInterpreted.includes('how') || lowerInterpreted.includes('what')))
      );
      break;

    case AgentType.HELP_CENTER:
      // Help Center is the fallback, so it's always relevant
      // This prevents infinite rerouting loops when Help Center is selected as the fallback
      relevant = true;
      break;

    default:
      relevant = false;
      break;
  }
  
  // #region debug log
  const logData2 = {location:'agentRelevanceChecker.ts:137',message:'Relevance check result',data:{agentType,relevant},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'};
  console.log('[DEBUG]', logData2);
  fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(logData2)}).catch((e)=>console.error('[DEBUG] Fetch failed:',e));
  // #endregion
  return relevant;
}

