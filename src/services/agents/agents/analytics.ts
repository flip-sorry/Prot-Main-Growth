import { AgentType } from '../types';
import type { AgentThought } from '../types';

export interface AnalyticsAgentResult {
  thoughts: AgentThought[];
  response: string;
}

/**
 * Analytics Agent
 * Handles business analytics queries: metrics, KPIs, dashboards, performance data (separate from document analytics)
 */
export async function* processAnalyticsAgent(
  prompt: string,
  interpretedPrompt: string
): AsyncGenerator<AgentThought, AnalyticsAgentResult> {
  const thoughts: AgentThought[] = [];
  let thoughtId = 1;
  
  // Thought 1: Understanding analytics request
  const thought1: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Understanding request',
    reasoning: `The user has an analytics question. Analyzing: "${interpretedPrompt}"`,
    agent: AgentType.ANALYTICS_AGENT,
    timestamp: Date.now(),
  };
  thoughts.push(thought1);
  yield thought1;
  await delay(300);
  
  // Thought 2: Gathering metrics data
  const thought2: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Gathering metrics',
    reasoning: 'Querying analytics database for KPIs, performance metrics, and business data.',
    agent: AgentType.ANALYTICS_AGENT,
    timestamp: Date.now(),
  };
  thoughts.push(thought2);
  yield thought2;
  await delay(400);
  
  // Thought 3: Analyzing performance
  const thought3: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Analyzing performance',
    reasoning: 'Calculating trends, comparing periods, and identifying key performance indicators.',
    agent: AgentType.ANALYTICS_AGENT,
    timestamp: Date.now(),
  };
  thoughts.push(thought3);
  yield thought3;
  await delay(400);
  
  // Thought 4: Preparing insights
  const thought4: AgentThought = {
    id: `thought-${thoughtId++}`,
    step: 'Preparing insights',
    reasoning: 'Compiling analytics dashboard data and actionable insights.',
    agent: AgentType.ANALYTICS_AGENT,
    timestamp: Date.now(),
  };
  thoughts.push(thought4);
  yield thought4;
  await delay(300);
  
  // Generate response
  const response = generateAnalyticsResponse(interpretedPrompt);
  
  return {
    thoughts,
    response,
  };
}

function generateAnalyticsResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('dashboard') || lowerPrompt.includes('overview')) {
    return "Here's your analytics dashboard overview:\n\n**Key Metrics**:\n• Total Revenue: $156,000 (Q4)\n• Active Deals: 9 ($89,500 pipeline)\n• Contract Completion Rate: 85%\n• Average Deal Size: $9,944\n• Sales Cycle: 28 days average\n\n**Performance Trends**:\n• Revenue up 40% vs Q3\n• Contract completion time improved by 15%\n• Pipeline value increased by 25%\n\nWould you like to dive deeper into any specific metric or see a comparison over time?";
  }
  
  if (lowerPrompt.includes('kpi') || lowerPrompt.includes('key performance') || lowerPrompt.includes('metrics')) {
    return "Here are your key performance indicators:\n\n**Sales KPIs**:\n• Monthly Recurring Revenue (MRR): $52,000\n• Customer Acquisition Cost: $1,200\n• Lifetime Value: $45,000\n• Conversion Rate: 32%\n\n**Operational KPIs**:\n• Contract Processing Time: 28 days\n• Document Processing Efficiency: 92%\n• Customer Satisfaction: 4.6/5\n\n**Growth KPIs**:\n• Quarter-over-Quarter Growth: 40%\n• Pipeline Growth: 25%\n• Customer Retention: 88%\n\nWhich KPI would you like to explore in more detail?";
  }
  
  if (lowerPrompt.includes('performance') || lowerPrompt.includes('trend')) {
    return "Here's your performance analysis:\n\n**This Quarter**:\n• Revenue: $156,000 (↑ 40% vs Q3)\n• Deals Closed: 12 (↑ 33% vs Q3)\n• Average Deal Size: $13,000 (↑ 8% vs Q3)\n\n**Trends**:\n• Strong growth in Q4 with consistent month-over-month increases\n• Contract completion time decreased by 15%\n• Customer satisfaction improved to 4.6/5\n• Pipeline value at all-time high\n\n**Insights**:\nYour sales performance is trending upward, with particularly strong performance in web development and cloud services contracts. Would you like to see a breakdown by product category or time period?";
  }
  
  if (lowerPrompt.includes('report') || lowerPrompt.includes('summary')) {
    return "Here's your analytics report:\n\n**Executive Summary**:\nStrong Q4 performance with significant growth across all key metrics. Revenue increased 40% quarter-over-quarter, driven by increased deal volume and improved conversion rates.\n\n**Highlights**:\n• 12 contracts completed totaling $156,000\n• 9 active deals in pipeline worth $89,500\n• Average sales cycle reduced to 28 days\n• Top performing categories: Web Development, Cloud Services\n\n**Recommendations**:\n1. Continue focusing on high-value web development contracts\n2. Leverage improved conversion rates to expand pipeline\n3. Maintain current customer satisfaction levels\n\nWould you like a detailed breakdown of any specific area?";
  }
  
  if (lowerPrompt.includes('visualization') || lowerPrompt.includes('chart') || lowerPrompt.includes('graph')) {
    return "I can help you visualize your analytics data. Available visualizations:\n\n**Sales Charts**:\n• Revenue trends over time\n• Deal pipeline funnel\n• Contract status distribution\n• Performance by category\n\n**Performance Dashboards**:\n• KPI overview dashboard\n• Comparative analysis charts\n• Trend analysis graphs\n• Geographic distribution (if applicable)\n\nWhat type of visualization would you like to see? I can generate charts for revenue trends, pipeline analysis, or performance comparisons.";
  }
  
  return "I'm your analytics assistant. I can help you with:\n\n• **Business Metrics**: Revenue, growth, performance KPIs\n• **Dashboards**: Overview of key business indicators\n• **Trends**: Performance over time and comparisons\n• **Reports**: Comprehensive analytics summaries\n• **Visualizations**: Charts and graphs for data analysis\n\nWhat analytics would you like to explore? Try asking about your dashboard, KPIs, performance trends, or specific metrics.";
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

