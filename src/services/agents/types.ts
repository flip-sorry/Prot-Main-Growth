export enum AgentType {
  FILE_ORGANIZER = 'file-organizer',
  DOCUMENT_ANALYTIC = 'document-analytic',
  FILE_MANAGER = 'file-manager',
  SALES_AGENT = 'sales-agent',
  KNOWLEDGE_BASE = 'knowledge-base',
  HELP_CENTER = 'help-center',
}

export interface AgentThought {
  id: string;
  step: string;
  reasoning: string;
  agent: AgentType;
  timestamp: number;
}

export interface AgentResponse {
  id: string;
  thoughts: AgentThought[];
  response: string;
  agent: AgentType;
  timestamp: number;
}

export interface PromptUnderstanding {
  original: string;
  interpreted: string;
  needsClarification: boolean;
  intent: string;
  entities: string[];
  confidence: number;
}

export interface AgentCapabilities {
  type: AgentType;
  name: string;
  description: string;
  keywords: string[];
  examples: string[];
}

