/**
 * PandaDoc Knowledge Base
 * Structured knowledge organized by support categories from https://support.pandadoc.com/en/
 */

export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  keywords: string[];
  category: string;
  relatedTopics?: string[];
}

export interface KnowledgeCategory {
  id: string;
  name: string;
  description: string;
  articles: KnowledgeArticle[];
}

export const pandadocKnowledge: KnowledgeCategory[] = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Onboarding, account setup, and basic platform navigation',
    articles: [
      {
        id: 'gs-1',
        title: 'Creating Your PandaDoc Account',
        content: 'To get started with PandaDoc, sign up for an account using your email address. Once registered, you can access the dashboard where you can create documents, manage templates, and track your document activity. The platform offers a free trial to explore features before committing to a plan.',
        keywords: ['account', 'sign up', 'register', 'signup', 'create account', 'onboarding', 'getting started'],
        category: 'Getting Started',
        relatedTopics: ['dashboard', 'templates', 'documents'],
      },
      {
        id: 'gs-2',
        title: 'Navigating the Dashboard',
        content: 'The PandaDoc dashboard is your central hub for managing documents. From here, you can create new documents, access templates, view recent activity, and manage your content library. The sidebar provides quick access to Documents, Templates, Content Library, and Settings.',
        keywords: ['dashboard', 'navigation', 'interface', 'sidebar', 'home'],
        category: 'Getting Started',
        relatedTopics: ['documents', 'templates', 'content library'],
      },
      {
        id: 'gs-3',
        title: 'Understanding Document Status',
        content: 'Documents in PandaDoc have different statuses: Draft (being created), Sent (delivered to recipients), Viewed (recipients opened), Completed (signed/approved), and Declined. You can track these statuses in real-time from the dashboard.',
        keywords: ['status', 'document status', 'draft', 'sent', 'viewed', 'completed', 'declined', 'tracking'],
        category: 'Getting Started',
        relatedTopics: ['sending documents', 'tracking'],
      },
    ],
  },
  {
    id: 'creating-documents',
    name: 'Creating Documents & Templates',
    description: 'Document creation, templates, content library, and forms',
    articles: [
      {
        id: 'cd-1',
        title: 'Creating a New Document',
        content: 'To create a new document, click the "Create" button and choose from a blank document, template, or upload an existing file. You can use the drag-and-drop editor to add content blocks, fields, and interactive elements. Documents support rich text formatting, images, tables, and custom branding.',
        keywords: ['create document', 'new document', 'document creation', 'editor', 'drag and drop', 'content blocks'],
        category: 'Creating Documents & Templates',
        relatedTopics: ['templates', 'content library', 'fields'],
      },
      {
        id: 'cd-2',
        title: 'Working with Templates',
        content: 'Templates allow you to create reusable document structures. Save frequently used documents as templates to speed up your workflow. Templates can include pre-filled content, fields, and conditional logic. You can share templates with your team and organize them in folders.',
        keywords: ['template', 'templates', 'reusable', 'save template', 'template folder', 'pre-filled'],
        category: 'Creating Documents & Templates',
        relatedTopics: ['content library', 'sharing', 'team collaboration'],
      },
      {
        id: 'cd-3',
        title: 'Content Library Management',
        content: 'The Content Library stores reusable content blocks like clauses, terms, images, and text snippets. Create content blocks once and reuse them across multiple documents. This ensures consistency and saves time. You can organize content by categories and search for specific items.',
        keywords: ['content library', 'content blocks', 'clauses', 'snippets', 'reusable content', 'library'],
        category: 'Creating Documents & Templates',
        relatedTopics: ['templates', 'documents'],
      },
      {
        id: 'cd-4',
        title: 'Adding Fields and Signatures',
        content: 'Add signature fields, text fields, date fields, and checkboxes to your documents. Drag fields onto the document where recipients need to sign or fill information. You can assign fields to specific recipients and set them as required or optional. Signature fields support eSignature workflows.',
        keywords: ['fields', 'signature field', 'text field', 'date field', 'checkbox', 'assign recipient', 'esignature'],
        category: 'Creating Documents & Templates',
        relatedTopics: ['esignature', 'sending documents'],
      },
      {
        id: 'cd-5',
        title: 'Document Branding and Customization',
        content: 'Customize your documents with your company branding. Upload your logo, set brand colors, and choose fonts. You can create custom themes that apply to all your documents. Branding helps maintain a professional appearance and reinforces your company identity.',
        keywords: ['branding', 'logo', 'customize', 'theme', 'brand colors', 'fonts', 'company identity'],
        category: 'Creating Documents & Templates',
        relatedTopics: ['templates', 'settings'],
      },
    ],
  },
  {
    id: 'sending-documents',
    name: 'Sending Documents',
    description: 'Sending workflows, recipients, and delivery options',
    articles: [
      {
        id: 'sd-1',
        title: 'Sending Documents to Recipients',
        content: 'To send a document, click "Send" and add recipient email addresses. You can set the signing order if multiple signatures are required. Add a message to personalize the email notification. Choose delivery options like email, SMS, or embedded link. Documents can be sent immediately or scheduled for later.',
        keywords: ['send', 'sending', 'recipients', 'email', 'signing order', 'delivery', 'sms', 'schedule'],
        category: 'Sending Documents',
        relatedTopics: ['esignature', 'tracking'],
      },
      {
        id: 'sd-2',
        title: 'Recipient Roles and Permissions',
        content: 'Assign roles to recipients: Signer (must sign), Approver (must approve), CC (receives copy), or Viewer (view only). You can set different permissions for each recipient and control who can see which parts of the document. This ensures proper workflow and security.',
        keywords: ['recipient roles', 'signer', 'approver', 'cc', 'viewer', 'permissions', 'workflow'],
        category: 'Sending Documents',
        relatedTopics: ['fields', 'security'],
      },
      {
        id: 'sd-3',
        title: 'Document Delivery Options',
        content: 'PandaDoc offers multiple delivery methods: email (standard), SMS (for mobile recipients), embedded links (for websites), and API integration. You can customize email templates and notifications. Set reminders for pending signatures and configure auto-reminders.',
        keywords: ['delivery', 'email', 'sms', 'embedded link', 'api', 'notifications', 'reminders', 'auto-reminder'],
        category: 'Sending Documents',
        relatedTopics: ['integrations', 'tracking'],
      },
      {
        id: 'sd-4',
        title: 'Bulk Sending and Automation',
        content: 'Send multiple documents at once using bulk sending features. Upload a CSV with recipient information to send personalized documents to many recipients simultaneously. Set up automation workflows to trigger document sending based on events or schedules.',
        keywords: ['bulk send', 'bulk sending', 'csv', 'automation', 'workflow', 'trigger', 'schedule'],
        category: 'Sending Documents',
        relatedTopics: ['integrations', 'automations'],
      },
    ],
  },
  {
    id: 'esignature',
    name: 'eSignature & Notary',
    description: 'Electronic signatures, notarization, and legal compliance',
    articles: [
      {
        id: 'es-1',
        title: 'How eSignature Works',
        content: 'PandaDoc eSignature is legally binding and compliant with eIDAS, ESIGN Act, and UETA. Recipients receive an email with a secure link to sign the document. They can sign using a mouse, touchpad, or upload an image of their signature. Each signature includes a digital certificate with timestamp and IP address for legal validity.',
        keywords: ['esignature', 'electronic signature', 'legal', 'compliant', 'eidas', 'esign act', 'ueta', 'digital certificate'],
        category: 'eSignature & Notary',
        relatedTopics: ['sending documents', 'security'],
      },
      {
        id: 'es-2',
        title: 'Remote Online Notarization (RON)',
        content: 'PandaDoc supports Remote Online Notarization for documents requiring notarization. Connect with a licensed notary via video call to complete notarization remotely. The notary verifies identity, witnesses the signing, and applies their electronic seal. RON is legally recognized in most states.',
        keywords: ['notary', 'ron', 'remote online notarization', 'notarization', 'notary seal', 'video call'],
        category: 'eSignature & Notary',
        relatedTopics: ['esignature', 'legal'],
      },
      {
        id: 'es-3',
        title: 'Signature Field Types',
        content: 'PandaDoc supports multiple signature field types: Standard signature (draw or type), Initial fields (for initials), Date signed, and Company signature. You can require multiple signatures in a specific order. Each signature field can be assigned to a specific recipient.',
        keywords: ['signature field', 'signature types', 'initial', 'date signed', 'company signature', 'signing order'],
        category: 'eSignature & Notary',
        relatedTopics: ['creating documents', 'fields'],
      },
      {
        id: 'es-4',
        title: 'Document Completion and Storage',
        content: 'Once all recipients have signed, the document is automatically marked as completed. All parties receive a copy of the fully executed document via email. Completed documents are stored securely in your PandaDoc account with a complete audit trail showing who signed, when, and from where.',
        keywords: ['completed', 'executed', 'audit trail', 'storage', 'secure', 'copy', 'signed document'],
        category: 'eSignature & Notary',
        relatedTopics: ['tracking', 'security'],
      },
    ],
  },
  {
    id: 'integrations',
    name: 'Integrations',
    description: 'Connecting PandaDoc with other business tools',
    articles: [
      {
        id: 'int-1',
        title: 'Salesforce Integration',
        content: 'Connect PandaDoc with Salesforce to create documents directly from opportunities, quotes, and accounts. Automatically sync document status back to Salesforce records. Use Salesforce data to populate document fields dynamically. Track document activity within Salesforce for complete visibility.',
        keywords: ['salesforce', 'integration', 'opportunities', 'quotes', 'accounts', 'sync', 'populate fields'],
        category: 'Integrations',
        relatedTopics: ['automations', 'crm'],
      },
      {
        id: 'int-2',
        title: 'HubSpot Integration',
        content: 'Integrate PandaDoc with HubSpot to generate documents from deals and contacts. Automatically create documents when deals reach certain stages. Sync document status and completion data back to HubSpot. Use HubSpot properties to pre-fill document content.',
        keywords: ['hubspot', 'integration', 'deals', 'contacts', 'properties', 'sync', 'stages'],
        category: 'Integrations',
        relatedTopics: ['automations', 'crm'],
      },
      {
        id: 'int-3',
        title: 'Zapier and API Integration',
        content: 'Use Zapier to connect PandaDoc with 5000+ apps without coding. Create Zaps that trigger document creation, sending, or status updates based on events in other apps. For custom integrations, use the PandaDoc API to build workflows that fit your specific needs.',
        keywords: ['zapier', 'api', 'integration', 'zaps', 'workflow', 'custom', 'webhook'],
        category: 'Integrations',
        relatedTopics: ['automations', 'workflow'],
      },
      {
        id: 'int-4',
        title: 'Google Workspace and Microsoft 365',
        content: 'Connect PandaDoc with Google Workspace or Microsoft 365 to access files from Google Drive or OneDrive. Import documents directly from these cloud storage services. Sync contacts and use Google/Microsoft authentication for single sign-on.',
        keywords: ['google workspace', 'microsoft 365', 'google drive', 'onedrive', 'cloud storage', 'sso', 'single sign-on'],
        category: 'Integrations',
        relatedTopics: ['documents', 'authentication'],
      },
    ],
  },
  {
    id: 'troubleshooting',
    name: 'Troubleshooting',
    description: 'Common issues and solutions',
    articles: [
      {
        id: 'ts-1',
        title: 'Recipients Not Receiving Documents',
        content: 'If recipients are not receiving documents, check: spam/junk folders, correct email addresses, email delivery settings, and account email limits. Verify the document was actually sent (check status). Try resending or use an alternative delivery method like SMS or embedded link.',
        keywords: ['not receiving', 'email', 'spam', 'delivery', 'resend', 'sms', 'embedded link'],
        category: 'Troubleshooting',
        relatedTopics: ['sending documents', 'delivery'],
      },
      {
        id: 'ts-2',
        title: 'Signature Fields Not Appearing',
        content: 'If signature fields are not visible to recipients, ensure: fields are assigned to the correct recipient, fields are not hidden or conditional, document is in "Send" status (not draft), and recipient has proper permissions. Check field visibility settings and recipient role assignments.',
        keywords: ['signature fields', 'not appearing', 'visible', 'assigned', 'permissions', 'visibility', 'role'],
        category: 'Troubleshooting',
        relatedTopics: ['fields', 'esignature', 'sending documents'],
      },
      {
        id: 'ts-3',
        title: 'Document Formatting Issues',
        content: 'If document formatting looks incorrect, try: checking browser compatibility (use Chrome/Firefox), clearing browser cache, checking document editor settings, verifying uploaded file format, and ensuring content blocks are properly aligned. Some formatting may differ between editor view and recipient view.',
        keywords: ['formatting', 'layout', 'browser', 'cache', 'editor', 'alignment', 'view'],
        category: 'Troubleshooting',
        relatedTopics: ['creating documents', 'templates'],
      },
      {
        id: 'ts-4',
        title: 'Integration Sync Problems',
        content: 'If integrations are not syncing properly, verify: API credentials are correct and not expired, webhook URLs are accessible, rate limits are not exceeded, and integration settings match your workflow. Check integration logs for error messages and ensure required fields are mapped correctly.',
        keywords: ['integration', 'sync', 'api', 'credentials', 'webhook', 'rate limit', 'mapping'],
        category: 'Troubleshooting',
        relatedTopics: ['integrations', 'api'],
      },
      {
        id: 'ts-5',
        title: 'Account Access and Login Issues',
        content: 'If you cannot log in, try: password reset, checking email for account verification, clearing browser cookies, using incognito/private mode, or contacting support. For SSO users, verify your identity provider settings. Check if your account is active and not suspended.',
        keywords: ['login', 'access', 'password', 'sso', 'authentication', 'account', 'support'],
        category: 'Troubleshooting',
        relatedTopics: ['getting started', 'account'],
      },
    ],
  },
];

/**
 * Search the knowledge base for articles matching the query
 */
export function searchKnowledgeBase(query: string): KnowledgeArticle[] {
  const lowerQuery = query.toLowerCase();
  const queryWords = lowerQuery.split(/\s+/).filter(word => word.length > 2);
  
  const results: Array<{ article: KnowledgeArticle; score: number }> = [];
  
  for (const category of pandadocKnowledge) {
    for (const article of category.articles) {
      let score = 0;
      
      // Check title match (highest weight)
      const titleLower = article.title.toLowerCase();
      if (titleLower.includes(lowerQuery)) {
        score += 10;
      }
      queryWords.forEach(word => {
        if (titleLower.includes(word)) {
          score += 5;
        }
      });
      
      // Check keyword match
      article.keywords.forEach(keyword => {
        const keywordLower = keyword.toLowerCase();
        if (keywordLower === lowerQuery) {
          score += 8;
        } else if (keywordLower.includes(lowerQuery) || lowerQuery.includes(keywordLower)) {
          score += 4;
        }
        queryWords.forEach(word => {
          if (keywordLower.includes(word) || word.includes(keywordLower)) {
            score += 2;
          }
        });
      });
      
      // Check content match
      const contentLower = article.content.toLowerCase();
      queryWords.forEach(word => {
        const matches = (contentLower.match(new RegExp(word, 'g')) || []).length;
        score += Math.min(matches, 3); // Cap at 3 points per word
      });
      
      if (score > 0) {
        results.push({ article, score });
      }
    }
  }
  
  // Sort by score (descending) and return top results
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 5).map(r => r.article);
}

/**
 * Get articles by category
 */
export function getArticlesByCategory(categoryId: string): KnowledgeArticle[] {
  const category = pandadocKnowledge.find(cat => cat.id === categoryId);
  return category ? category.articles : [];
}

/**
 * Get article by ID
 */
export function getArticleById(articleId: string): KnowledgeArticle | undefined {
  for (const category of pandadocKnowledge) {
    const article = category.articles.find(a => a.id === articleId);
    if (article) return article;
  }
  return undefined;
}

