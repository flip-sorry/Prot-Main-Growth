import { AgentType } from '../types';
import type { AgentThought } from '../types';
import { processFileOrganizer, type FileOrganizerResult } from './fileOrganizer';
import { processDocumentAnalytic, type DocumentAnalyticResult } from './documentAnalytic';
import { processFileManager, type FileManagerResult } from './fileManager';
import { processSalesAgent, type SalesAgentResult } from './salesAgent';
import { processKnowledgeBase, type KnowledgeBaseResult } from './knowledgeBase';
import { processHelpCenter, type HelpCenterResult } from './helpCenter';

export type AgentResult = 
  | FileOrganizerResult 
  | DocumentAnalyticResult 
  | FileManagerResult 
  | SalesAgentResult 
  | KnowledgeBaseResult 
  | HelpCenterResult;

export type AgentProcessor = (
  prompt: string,
  interpretedPrompt: string
) => AsyncGenerator<AgentThought, AgentResult>;

export const agentRegistry: Record<AgentType, AgentProcessor> = {
  [AgentType.FILE_ORGANIZER]: processFileOrganizer,
  [AgentType.DOCUMENT_ANALYTIC]: processDocumentAnalytic,
  [AgentType.FILE_MANAGER]: processFileManager,
  [AgentType.SALES_AGENT]: processSalesAgent,
  [AgentType.KNOWLEDGE_BASE]: processKnowledgeBase,
  [AgentType.HELP_CENTER]: processHelpCenter,
};

export {
  processFileOrganizer,
  processDocumentAnalytic,
  processFileManager,
  processSalesAgent,
  processKnowledgeBase,
  processHelpCenter,
};

