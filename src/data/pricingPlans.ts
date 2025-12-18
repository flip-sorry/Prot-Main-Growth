/**
 * PandaDoc Pricing Plans
 * Plan tiers, features, and upgrade paths for sales recommendations
 */

export interface PlanFeature {
  id: string;
  name: string;
  description: string;
}

export interface PricingPlan {
  planId: string;
  name: string;
  description: string;
  features: PlanFeature[];
  upgradeBenefits: string[];
  targetUseCase: string[];
  idealFor: string[];
  limitations?: string[];
}

export const pricingPlans: PricingPlan[] = [
  {
    planId: 'essentials',
    name: 'Essentials',
    description: 'Perfect for individuals and small teams getting started with document management.',
    features: [
      { id: 'doc-creation', name: 'Document Creation', description: 'Create unlimited documents' },
      { id: 'templates', name: 'Templates', description: 'Access to template library' },
      { id: 'esignature', name: 'eSignature', description: 'Basic eSignature functionality' },
      { id: 'tracking', name: 'Document Tracking', description: 'Track document views and opens' },
      { id: 'branding', name: 'Basic Branding', description: 'Add your logo and colors' }
    ],
    upgradeBenefits: [
      'Advanced automation workflows',
      'CRM integrations',
      'Advanced analytics',
      'Team collaboration features',
      'API access',
      'Priority support'
    ],
    targetUseCase: ['individual users', 'small teams', 'basic document needs'],
    idealFor: ['freelancers', 'small businesses', 'startups'],
    limitations: ['Limited integrations', 'Basic analytics', 'No API access']
  },
  {
    planId: 'business',
    name: 'Business',
    description: 'Ideal for growing teams that need automation and CRM integrations.',
    features: [
      { id: 'all-essentials', name: 'All Essentials Features', description: 'Everything in Essentials plan' },
      { id: 'crm-integration', name: 'CRM Integrations', description: 'Connect with Salesforce, HubSpot, Pipedrive' },
      { id: 'automation', name: 'Workflow Automation', description: 'Automate document workflows' },
      { id: 'analytics', name: 'Advanced Analytics', description: 'Detailed document analytics and insights' },
      { id: 'content-library', name: 'Content Library', description: 'Reusable content blocks and clauses' },
      { id: 'team-collab', name: 'Team Collaboration', description: 'Team workspaces and sharing' },
      { id: 'api-access', name: 'API Access', description: 'Integrate with your own applications' }
    ],
    upgradeBenefits: [
      'Enterprise security features',
      'Advanced CPQ capabilities',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantees',
      'Advanced compliance features'
    ],
    targetUseCase: ['growing teams', 'CRM users', 'automation needs'],
    idealFor: ['sales teams', 'mid-size businesses', 'teams needing CRM sync']
  },
  {
    planId: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations requiring advanced security, compliance, and custom solutions.',
    features: [
      { id: 'all-business', name: 'All Business Features', description: 'Everything in Business plan' },
      { id: 'cpq', name: 'CPQ (Configure, Price, Quote)', description: 'Advanced CPQ capabilities' },
      { id: 'security', name: 'Enterprise Security', description: 'Advanced security and compliance' },
      { id: 'sso', name: 'SSO & Advanced Auth', description: 'Single sign-on and advanced authentication' },
      { id: 'custom-integrations', name: 'Custom Integrations', description: 'Custom integration development' },
      { id: 'dedicated-support', name: 'Dedicated Support', description: 'Dedicated account manager and priority support' },
      { id: 'sla', name: 'SLA Guarantees', description: 'Service level agreements' },
      { id: 'audit-trail', name: 'Advanced Audit Trail', description: 'Comprehensive audit logging' },
      { id: 'white-label', name: 'White-Label Options', description: 'Custom branding options' }
    ],
    upgradeBenefits: [],
    targetUseCase: ['large organizations', 'enterprise security needs', 'compliance requirements'],
    idealFor: ['enterprise companies', 'regulated industries', 'large sales teams']
  }
];

/**
 * Get plan by ID
 */
export function getPlanById(planId: string): PricingPlan | undefined {
  return pricingPlans.find(plan => plan.planId === planId);
}

/**
 * Get upgrade path from current plan
 */
export function getUpgradePath(currentPlanId: string): PricingPlan | null {
  const planIndex = pricingPlans.findIndex(plan => plan.planId === currentPlanId);
  if (planIndex === -1 || planIndex === pricingPlans.length - 1) {
    return null; // Plan not found or already on highest tier
  }
  return pricingPlans[planIndex + 1];
}

/**
 * Find recommended plan based on use case keywords
 */
export function recommendPlan(useCaseKeywords: string[]): PricingPlan {
  const lowerKeywords = useCaseKeywords.map(k => k.toLowerCase());
  
  // Enterprise indicators
  if (lowerKeywords.some(k => 
    k.includes('enterprise') || 
    k.includes('large') || 
    k.includes('compliance') || 
    k.includes('security') ||
    k.includes('sso') ||
    k.includes('audit')
  )) {
    return pricingPlans[2]; // Enterprise
  }
  
  // Business indicators
  if (lowerKeywords.some(k => 
    k.includes('crm') || 
    k.includes('integration') || 
    k.includes('automation') || 
    k.includes('team') ||
    k.includes('salesforce') ||
    k.includes('hubspot') ||
    k.includes('pipedrive') ||
    k.includes('analytics') ||
    k.includes('api')
  )) {
    return pricingPlans[1]; // Business
  }
  
  // Default to Essentials
  return pricingPlans[0];
}

/**
 * Compare plans and highlight differences
 */
export function comparePlans(plan1Id: string, plan2Id: string): {
  plan1: PricingPlan;
  plan2: PricingPlan;
  differences: {
    onlyInPlan1: PlanFeature[];
    onlyInPlan2: PlanFeature[];
  };
} | null {
  const plan1 = getPlanById(plan1Id);
  const plan2 = getPlanById(plan2Id);
  
  if (!plan1 || !plan2) return null;
  
  const plan1FeatureIds = new Set(plan1.features.map(f => f.id));
  const plan2FeatureIds = new Set(plan2.features.map(f => f.id));
  
  const onlyInPlan1 = plan1.features.filter(f => !plan2FeatureIds.has(f.id));
  const onlyInPlan2 = plan2.features.filter(f => !plan1FeatureIds.has(f.id));
  
  return {
    plan1,
    plan2,
    differences: {
      onlyInPlan1,
      onlyInPlan2
    }
  };
}

