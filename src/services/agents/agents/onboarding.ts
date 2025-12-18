import { AgentType } from '../types';
import type { AgentThought } from '../types';

export interface OnboardingAgentResult {
  thoughts: AgentThought[];
  response: string;
}

/**
 * Onboarding Agent
 * Handles onboarding queries: guide new users, provide step-by-step instructions, answer "how do I get started" questions
 */
export async function* processOnboardingAgent(
  prompt: string,
  interpretedPrompt: string
): AsyncGenerator<AgentThought, OnboardingAgentResult> {
  const thoughts: AgentThought[] = [];
  let thoughtId = 1;
  
  // Thought 1: Understanding onboarding request
  const thought1: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Understanding request',
    reasoning: `The user needs onboarding help. Analyzing: "${interpretedPrompt}"`,
    agent: AgentType.ONBOARDING_AGENT,
    timestamp: Date.now(),
  };
  thoughts.push(thought1);
  yield thought1;
  await delay(300);
  
  // Thought 2: Identifying user needs
  const thought2: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Identifying needs',
    reasoning: 'Determining what the user wants to learn or accomplish. Checking for specific features or workflows.',
    agent: AgentType.ONBOARDING_AGENT,
    timestamp: Date.now(),
  };
  thoughts.push(thought2);
  yield thought2;
  await delay(400);
  
  // Thought 3: Preparing guidance
  const thought3: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Preparing guidance',
    reasoning: 'Compiling step-by-step instructions and helpful resources tailored to the user\'s needs.',
    agent: AgentType.ONBOARDING_AGENT,
    timestamp: Date.now(),
  };
  thoughts.push(thought3);
  yield thought3;
  await delay(300);
  
  // Generate response
  const response = generateOnboardingResponse(interpretedPrompt);
  
  return {
    thoughts,
    response,
  };
}

function generateOnboardingResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('get started') || lowerPrompt.includes('getting started') || lowerPrompt.includes('begin')) {
    return "Welcome! Let's get you started. Here's a quick guide:\n\n1. **Explore your documents**: Use the File Manager to browse your files\n2. **Organize your workspace**: Ask me to organize files by type, date, or status\n3. **Track your sales**: The Sales Agent can help with contracts and deals\n4. **Get insights**: Use Document Analytics to analyze your documents\n\nWhat would you like to do first? I can guide you through any of these features step by step.";
  }
  
  if (lowerPrompt.includes('how to') || lowerPrompt.includes('how do i')) {
    if (lowerPrompt.includes('organize') || lowerPrompt.includes('file')) {
      return "Here's how to organize files:\n\n1. Tell me what you want to organize (e.g., 'organize completed invoices')\n2. I'll identify matching files\n3. I'll suggest an organization method\n4. You can approve or customize it\n\nTry saying: 'Organize the completed invoices' or 'Arrange contracts by date'";
    }
    if (lowerPrompt.includes('contract') || lowerPrompt.includes('deal')) {
      return "Here's how to work with contracts:\n\n1. Ask me about contract status: 'What's the status of my contracts?'\n2. Track deals: 'Show me my sales pipeline'\n3. Get metrics: 'What's my revenue this quarter?'\n\nI can help you track contracts, monitor deals, and analyze sales metrics. What would you like to know?";
    }
    return "I can help you learn how to use different features. What specifically would you like to learn? I can guide you through:\n\n• Organizing files and documents\n• Tracking contracts and sales\n• Analyzing documents\n• Managing your workspace\n\nWhat would you like to explore?";
  }
  
  if (lowerPrompt.includes('tutorial') || lowerPrompt.includes('guide') || lowerPrompt.includes('walkthrough')) {
    return "I'd be happy to guide you! Here's what I can help you learn:\n\n**File Management**:\n• Organizing documents by type, date, or status\n• Searching and finding files\n• Renaming and managing files\n\n**Sales & Contracts**:\n• Tracking contract status\n• Monitoring sales pipeline\n• Viewing revenue metrics\n\n**Document Analysis**:\n• Getting insights from your documents\n• Analyzing patterns and trends\n• Generating summaries\n\nWhich area would you like to explore? I'll walk you through it step by step.";
  }
  
  if (lowerPrompt.includes('first') || lowerPrompt.includes('begin') || lowerPrompt.includes('start')) {
    return "Great! Let's start with the basics. Here are some things you can try:\n\n**Quick Start Options**:\n1. **'What can you do?'** - Learn about all my capabilities\n2. **'Organize completed invoices'** - Try organizing files\n3. **'Show me my contracts'** - Explore your sales data\n4. **'Help me get started'** - Get personalized guidance\n\nWhat sounds most interesting to you? I'm here to help every step of the way!";
  }
  
  return "I'm here to help you get started! I can guide you through:\n\n• **File Organization**: Learn how to organize and manage your documents\n• **Sales Tracking**: Understand how to track contracts and deals\n• **Document Analysis**: Discover insights from your files\n• **General Navigation**: Learn how to use different features\n\nWhat would you like to learn about first? Just ask and I'll provide step-by-step guidance!";
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

