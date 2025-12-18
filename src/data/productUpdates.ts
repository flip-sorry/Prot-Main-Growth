/**
 * PandaDoc Product Updates
 * Recent product updates and features from https://www.pandadoc.com/blog/product-updates/
 */

export interface ProductUpdate {
  id: string;
  title: string;
  date: string;
  description: string;
  keyFeatures: string[];
  targetAudience: string[];
  upgradeBenefits: string[];
  category: 'feature' | 'integration' | 'ui' | 'security' | 'training';
}

export const productUpdates: ProductUpdate[] = [
  {
    id: 'dec-2025',
    title: 'December 2025 Updates',
    date: 'December 2025',
    description: 'Major updates including AI-powered workflows, enhanced security, and improved navigation experience.',
    keyFeatures: [
      'Model Context Protocol (MCP) server for AI-powered workflows',
      'Enhanced security and compliance features',
      'Stripe invoicing integration for automated invoicing',
      'Simplified navigation experience',
      'Essential Skills Course for Sales Professionals',
      'Smart Quote Design & Payment Workflows training'
    ],
    targetAudience: ['sales teams', 'enterprise users', 'power users'],
    upgradeBenefits: [
      'Automate agreement workflows with natural language',
      'Streamlined invoicing process',
      'Better security compliance',
      'Improved user experience'
    ],
    category: 'feature'
  },
  {
    id: 'oct-2025',
    title: 'October 2025 Updates',
    date: 'October 2025',
    description: 'Navigation improvements and user experience enhancements.',
    keyFeatures: [
      'New simplified navigation layout',
      'Faster access to features',
      'Cleaner interface design',
      'Improved user workflow'
    ],
    targetAudience: ['all users'],
    upgradeBenefits: [
      'More intuitive interface',
      'Faster document creation',
      'Better productivity'
    ],
    category: 'ui'
  },
  {
    id: 'cpq-pipedrive',
    title: 'Simple CPQ Onboarding with PandaDoc',
    date: '2025',
    description: 'Bi-directional CPQ solution for Pipedrive that allows sales teams to generate accurate quotes and manage product configurations directly within Pipedrive.',
    keyFeatures: [
      'Bi-directional CPQ integration with Pipedrive',
      'Generate quotes without leaving Pipedrive',
      'Manage product configurations',
      'Streamlined sales process',
      'Faster deal closure'
    ],
    targetAudience: ['sales teams', 'Pipedrive users', 'CPQ users'],
    upgradeBenefits: [
      'Close deals faster',
      'Reduce manual work',
      'Improve quote accuracy',
      'Better CRM integration'
    ],
    category: 'integration'
  },
  {
    id: 'crm-integrations',
    title: 'CRM Integration Guide: Connect to Salesforce, HubSpot, and Pipedrive without Zapier',
    date: '2025',
    description: 'Direct CRM integrations that eliminate the need for Zapier, providing seamless two-way synchronization and automation.',
    keyFeatures: [
      'Direct Salesforce integration with automations',
      'Direct HubSpot integration',
      'Direct Pipedrive integration',
      'Two-way data synchronization',
      'Automated document status updates',
      'No Zapier required',
      'Update opportunity stages automatically',
      'Attach PDFs to CRM records'
    ],
    targetAudience: ['sales teams', 'CRM users', 'enterprise customers'],
    upgradeBenefits: [
      'Eliminate Zapier costs',
      'Faster integration setup',
      'Better data synchronization',
      'Automated workflows',
      'Reduced manual work'
    ],
    category: 'integration'
  },
  {
    id: 'year-review-2025',
    title: "PandaDoc's 2025 in Review: The year we made documents work for you",
    date: '2025',
    description: 'Comprehensive review of major improvements and milestones achieved in 2025.',
    keyFeatures: [
      '$100 Million ARR milestone',
      'Enhanced document security',
      'Improved user experience',
      'Better CRM integrations',
      'AI-powered features',
      'Streamlined workflows'
    ],
    targetAudience: ['all users', 'enterprise customers'],
    upgradeBenefits: [
      'Proven track record of innovation',
      'Reliable platform growth',
      'Continuous feature improvements',
      'Enterprise-grade security'
    ],
    category: 'feature'
  }
];

/**
 * Get product updates by category
 */
export function getUpdatesByCategory(category: ProductUpdate['category']): ProductUpdate[] {
  return productUpdates.filter(update => update.category === category);
}

/**
 * Get recent product updates (most recent first)
 */
export function getRecentUpdates(limit?: number): ProductUpdate[] {
  const sorted = [...productUpdates].sort((a, b) => {
    // Simple date comparison - in real implementation, parse dates properly
    if (a.date.includes('December')) return -1;
    if (b.date.includes('December')) return 1;
    if (a.date.includes('October')) return -1;
    if (b.date.includes('October')) return 1;
    return 0;
  });
  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Search product updates by keyword
 */
export function searchProductUpdates(query: string): ProductUpdate[] {
  const lowerQuery = query.toLowerCase();
  const queryWords = lowerQuery.split(/\s+/).filter(word => word.length > 2);
  
  return productUpdates.filter(update => {
    const searchableText = [
      update.title,
      update.description,
      ...update.keyFeatures,
      ...update.targetAudience,
      ...update.upgradeBenefits
    ].join(' ').toLowerCase();
    
    return queryWords.some(word => searchableText.includes(word)) ||
           searchableText.includes(lowerQuery);
  });
}

