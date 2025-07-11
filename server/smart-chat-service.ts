interface ConversationState {
  stage: 'greeting' | 'service_inquiry' | 'details' | 'pricing' | 'booking' | 'next_steps';
  lastIntent: string;
  serviceInterest?: string;
  userInfo?: {
    businessType?: string;
    urgency?: string;
    contactMethod?: string;
  };
  conversationHistory: Array<{
    userMessage: string;
    botResponse: string;
    timestamp: Date;
  }>;
}

const conversationStates = new Map<string, ConversationState>();

export function getSmartResponse(sessionId: string, userMessage: string): {
  response: string;
  quickActions?: string[];
  nextStage?: string;
} {
  let state = conversationStates.get(sessionId);
  
  if (!state) {
    state = {
      stage: 'greeting',
      lastIntent: '',
      conversationHistory: []
    };
    conversationStates.set(sessionId, state);
  }

  const intent = analyzeUserIntent(userMessage);
  state.lastIntent = intent.intent;
  
  // Add to conversation history
  const response = generateContextualResponse(state, userMessage, intent);
  state.conversationHistory.push({
    userMessage,
    botResponse: response.response,
    timestamp: new Date()
  });

  // Update conversation stage
  updateConversationStage(state, intent);
  
  return response;
}

function analyzeUserIntent(message: string): {
  intent: string;
  confidence: number;
  entities: string[];
} {
  const lowerMessage = message.toLowerCase();
  
  // Booking and scheduling intents
  if (lowerMessage.includes('book') || lowerMessage.includes('schedule') || 
      lowerMessage.includes('appointment') || lowerMessage.includes('consultation') ||
      lowerMessage.includes('call')) {
    return { intent: 'book_consultation', confidence: 0.95, entities: ['booking'] };
  }
  
  // Next steps and progression
  if (lowerMessage.includes('next step') || lowerMessage.includes('what next') || 
      lowerMessage.includes('how do i') || lowerMessage.includes('proceed') ||
      lowerMessage.includes('what now')) {
    return { intent: 'next_steps', confidence: 0.9, entities: ['progression'] };
  }
  
  // Pricing and cost inquiries
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || 
      lowerMessage.includes('fee') || lowerMessage.includes('how much') ||
      lowerMessage.includes('rate')) {
    return { intent: 'pricing_inquiry', confidence: 0.9, entities: ['pricing'] };
  }
  
  // Service-specific intents
  if (lowerMessage.includes('tax') || lowerMessage.includes('filing')) {
    return { intent: 'tax_services', confidence: 0.9, entities: ['tax'] };
  }
  if (lowerMessage.includes('bookkeeping') || lowerMessage.includes('accounting')) {
    return { intent: 'bookkeeping', confidence: 0.9, entities: ['bookkeeping'] };
  }
  if (lowerMessage.includes('audit') || lowerMessage.includes('assurance') || 
      lowerMessage.includes('financial statement')) {
    return { intent: 'audit_services', confidence: 0.9, entities: ['audit'] };
  }
  if (lowerMessage.includes('payroll')) {
    return { intent: 'payroll_services', confidence: 0.8, entities: ['payroll'] };
  }
  if (lowerMessage.includes('small business') || lowerMessage.includes('business services')) {
    return { intent: 'business_services', confidence: 0.8, entities: ['business'] };
  }
  if (lowerMessage.includes('service') || lowerMessage.includes('what do you') || 
      lowerMessage.includes('offer')) {
    return { intent: 'services_overview', confidence: 0.7, entities: ['services'] };
  }
  
  return { intent: 'general_inquiry', confidence: 0.5, entities: [] };
}

function generateContextualResponse(
  state: ConversationState, 
  userMessage: string, 
  intent: { intent: string; confidence: number; entities: string[] }
): { response: string; quickActions?: string[]; nextStage?: string } {
  
  switch (intent.intent) {
    case 'book_consultation':
      return handleBookingRequest(state, userMessage);
    
    case 'next_steps':
      return handleNextStepsInquiry(state, userMessage);
    
    case 'pricing_inquiry':
      return handlePricingInquiry(state, userMessage);
    
    case 'audit_services':
      return handleAuditInquiry(state, userMessage);
    
    case 'tax_services':
      return handleTaxInquiry(state, userMessage);
    
    case 'bookkeeping':
      return handleBookkeepingInquiry(state, userMessage);
    
    case 'business_services':
      return handleBusinessServicesInquiry(state, userMessage);
    
    case 'services_overview':
      return handleServicesOverview(state, userMessage);
    
    default:
      return handleGeneralInquiry(state, userMessage);
  }
}

function handleBookingRequest(state: ConversationState, userMessage: string): {
  response: string;
  quickActions?: string[];
  nextStage?: string;
} {
  return {
    response: `Perfect! I'd be happy to help you schedule a free consultation. 

To book your consultation:
📞 **Call us directly**: (301) 640-8549
💻 **Online booking**: Visit our payment portal at /payment and select "Consultation"
📧 **Email**: Send details to info@selamcpa.com

Our consultations are:
• Completely FREE for 30 minutes
• Available via phone, video, or in-person
• Focused on understanding your specific needs
• No obligation - just expert guidance

**What to expect:**
We'll discuss your financial goals, current challenges, and how our CPA services can help you succeed.

Would you prefer to call now or should I direct you to our online booking system?`,
    quickActions: ['Call Now', 'Online Booking', 'Email Us'],
    nextStage: 'booking'
  };
}

function handleNextStepsInquiry(state: ConversationState, userMessage: string): {
  response: string;
  quickActions?: string[];
  nextStage?: string;
} {
  const serviceContext = state.serviceInterest || state.lastIntent;
  
  if (serviceContext.includes('audit')) {
    return {
      response: `Great question! For audit services, here are your next steps:

**1. Free Consultation** (Recommended first step)
   • We assess your audit needs
   • Discuss timeline and scope
   • Provide transparent pricing

**2. Engagement Planning**
   • Sign engagement letter
   • Schedule fieldwork dates
   • Prepare document requests

**3. Audit Execution**
   • Professional fieldwork
   • Regular progress updates
   • Draft review process

**Ready to start?** Let's schedule your free consultation to discuss your specific audit requirements and timeline.`,
      quickActions: ['Book Consultation', 'Call (301) 640-8549', 'Learn More'],
      nextStage: 'next_steps'
    };
  }
  
  return {
    response: `Here's what happens next:

**1. Free Consultation** 📞
   • 30-minute discussion about your needs
   • No obligation, just expert guidance
   • Available phone, video, or in-person

**2. Customized Proposal** 📋
   • Tailored service recommendations
   • Transparent pricing
   • Clear timeline and expectations

**3. Get Started** 🚀
   • Sign service agreement
   • Begin working together
   • Regular updates and communication

**Ready for step 1?** Book your free consultation now!`,
    quickActions: ['Book Consultation', 'Call Now', 'Email Questions'],
    nextStage: 'next_steps'
  };
}

function handlePricingInquiry(state: ConversationState, userMessage: string): {
  response: string;
  quickActions?: string[];
  nextStage?: string;
} {
  if (userMessage.toLowerCase().includes('audit')) {
    return {
      response: `Audit pricing depends on several factors:

**Financial Statement Audit:**
• Small business (under $5M revenue): $8,000 - $15,000
• Medium business ($5M-$50M): $15,000 - $35,000
• Larger entities: Custom pricing

**Review Services:**
• Compilation: $2,500 - $5,000
• Review: $4,000 - $8,000

**Factors affecting cost:**
• Company size and complexity
• Number of locations
• Industry-specific requirements
• Internal controls assessment needs

**Our pricing includes:**
✓ Professional fieldwork
✓ Management letter
✓ Ongoing support during process

Want an exact quote? Let's discuss your specific situation in a free consultation.`,
      quickActions: ['Free Quote', 'Book Consultation', 'Compare Services'],
      nextStage: 'pricing'
    };
  }
  
  return {
    response: `Our pricing is transparent and competitive:

**Tax Services:**
• Individual returns: $200 - $800
• Business returns: $500 - $2,500+
• Tax planning: $150/hour

**Bookkeeping:**
• Small business: $300 - $800/month
• Medium business: $800 - $2,000/month
• Custom packages available

**Business Advisory:**
• Hourly consultation: $200/hour
• Monthly retainer: $500 - $2,000
• Project-based pricing available

**Why choose us:**
✓ No hidden fees
✓ Free initial consultation
✓ Competitive rates
✓ Expert CPA & ACCA credentials

Ready for a personalized quote? Let's schedule your free consultation!`,
    quickActions: ['Free Quote', 'Book Consultation', 'Call for Pricing'],
    nextStage: 'pricing'
  };
}

function handleAuditInquiry(state: ConversationState, userMessage: string): {
  response: string;
  quickActions?: string[];
  nextStage?: string;
} {
  state.serviceInterest = 'audit';
  
  return {
    response: `Excellent! Our audit and assurance services provide independent verification of your financial statements.

**Our Audit Services:**
🔍 **Financial Statement Audits**
   • Independent opinion on financial statements
   • Required for loans, investors, bonding
   • Enhance credibility with stakeholders

📊 **Review & Compilation Services**
   • Lower-cost alternative to full audit
   • Still provides professional assurance
   • Suitable for smaller businesses

🛡️ **Internal Control Assessment**
   • Identify weaknesses and risks
   • Improve operational efficiency
   • Strengthen financial reporting

**Why businesses need audits:**
• Bank loan requirements
• Investor confidence
• Insurance requirements
• Regulatory compliance
• Board of directors oversight

**Our credentials:** CPA licensed with ACCA international expertise ensures thorough, professional service.

What type of audit or assurance service are you considering?`,
    quickActions: ['Financial Statement Audit', 'Review Services', 'Get Quote'],
    nextStage: 'details'
  };
}

function handleTaxInquiry(state: ConversationState, userMessage: string): {
  response: string;
  quickActions?: string[];
  nextStage?: string;
} {
  state.serviceInterest = 'tax';
  
  return {
    response: `Great choice! Our tax services cover all your needs:

**Individual Tax Services:**
• Personal income tax preparation
• Tax planning and optimization
• Amended returns and prior year fixes
• Multi-state tax situations
• International tax compliance

**Business Tax Services:**
• Corporate tax returns (1120, 1120S)
• Partnership returns (1065)
• LLC tax elections and filings
• Quarterly estimated payments
• Tax planning strategies

**Specialized Services:**
• Estate and trust tax returns
• Non-profit organization taxes
• International tax compliance
• Tax representation (IRS/State)

**Year-round support:**
• Not just tax season - we're here 365 days
• Proactive tax planning
• Quick responses to tax questions

Ready to minimize your tax burden legally and efficiently?`,
    quickActions: ['Individual Taxes', 'Business Taxes', 'Tax Planning'],
    nextStage: 'details'
  };
}

function handleBookkeepingInquiry(state: ConversationState, userMessage: string): {
  response: string;
  quickActions?: string[];
  nextStage?: string;
} {
  state.serviceInterest = 'bookkeeping';
  
  return {
    response: `Perfect! Our bookkeeping services keep your finances organized and compliant:

**Monthly Bookkeeping:**
• Transaction categorization and entry
• Bank and credit card reconciliation
• Accounts payable/receivable management
• Financial statement preparation
• Sales tax preparation and filing

**Catch-up Bookkeeping:**
• Clean up months or years of records
• Reconstruct missing financial data
• Prepare for tax season or audits
• Get your books current quickly

**Advanced Services:**
• Cash flow management and forecasting
• Budget vs actual analysis
• Key performance indicator tracking
• Integration with business systems

**Technology we use:**
• QuickBooks Online/Desktop (Certified ProAdvisor)
• Xero, FreshBooks integration
• Receipt management apps
• Secure cloud-based systems

**Why professional bookkeeping matters:**
✓ Accurate financial reporting
✓ Tax-ready records
✓ Better business decisions
✓ Time savings for you

What's your current bookkeeping situation?`,
    quickActions: ['Monthly Service', 'Catch-up Work', 'Get Quote'],
    nextStage: 'details'
  };
}

function handleBusinessServicesInquiry(state: ConversationState, userMessage: string): {
  response: string;
  quickActions?: string[];
  nextStage?: string;
} {
  state.serviceInterest = 'business';
  
  return {
    response: `Excellent! We specialize in helping small businesses succeed:

**Small Business Services:**
📋 **Business Formation**
   • LLC, Corporation, Partnership setup
   • EIN registration
   • State registration and compliance
   • Operating agreements

💰 **Financial Management**
   • Monthly bookkeeping
   • Cash flow management
   • Financial statement preparation
   • Budget and forecast development

📊 **Business Advisory**
   • Strategic planning sessions
   • Performance analysis
   • Growth planning
   • Exit strategy planning

🏦 **Operational Support**
   • Payroll processing
   • Sales tax management
   • Business insurance guidance
   • Banking relationship support

**Startup-friendly approach:**
• Affordable packages for new businesses
• Scalable services as you grow
• Educational approach - we teach as we work
• Technology-focused solutions

**Industry experience:**
Professional services, retail, restaurants, real estate, healthcare, technology, and more.

What stage is your business in?`,
    quickActions: ['New Business', 'Growing Business', 'Established Business'],
    nextStage: 'details'
  };
}

function handleServicesOverview(state: ConversationState, userMessage: string): {
  response: string;
  quickActions?: string[];
  nextStage?: string;
} {
  return {
    response: `Welcome! Selam CPA offers comprehensive financial services:

**Core Services:**
🏢 **Tax Services** - Individual & business tax preparation, planning, and representation
📊 **Bookkeeping** - Monthly accounting, financial statements, and catch-up services  
🔍 **Audit & Assurance** - Financial statement audits, reviews, and compilations
💼 **Business Advisory** - Strategic planning, financial analysis, and growth consulting
💰 **Payroll Services** - Full-service payroll processing and tax filings
🏗️ **Business Formation** - Entity setup, EIN registration, and compliance

**What makes us different:**
✓ **Dual Credentials**: US CPA + ACCA Fellow for international expertise
✓ **Technology-Forward**: AI-powered tools and secure digital platforms
✓ **Year-Round Support**: Not just tax season - we're here 365 days
✓ **All Industries**: Healthcare, retail, real estate, professional services, and more

**Free Consultation Available** - 30 minutes to discuss your specific needs with no obligation.

Which service interests you most?`,
    quickActions: ['Tax Services', 'Bookkeeping', 'Audit Services', 'Business Advisory'],
    nextStage: 'service_inquiry'
  };
}

function handleGeneralInquiry(state: ConversationState, userMessage: string): {
  response: string;
  quickActions?: string[];
  nextStage?: string;
} {
  return {
    response: `Hi! I'm here to help you with all your CPA and accounting needs.

**I can help you with:**
• Information about our services and pricing
• Scheduling a free consultation  
• Connecting you with the right solutions
• Answering questions about tax, bookkeeping, audits, and business advisory

**Popular topics:**
• Tax preparation and planning
• Monthly bookkeeping services
• Business formation and startup advice
• Audit and financial statement services

**Quick options:**
📞 Call us: (301) 640-8549
📧 Email: info@selamcpa.com
💻 Online payment: Visit /payment

What would you like to know about?`,
    quickActions: ['Our Services', 'Pricing Info', 'Book Consultation', 'Contact Info'],
    nextStage: 'greeting'
  };
}

function updateConversationStage(state: ConversationState, intent: { intent: string }) {
  switch (intent.intent) {
    case 'book_consultation':
      state.stage = 'booking';
      break;
    case 'pricing_inquiry':
      state.stage = 'pricing';
      break;
    case 'next_steps':
      state.stage = 'next_steps';
      break;
    case 'audit_services':
    case 'tax_services':
    case 'bookkeeping':
    case 'business_services':
      state.stage = 'details';
      break;
    case 'services_overview':
      state.stage = 'service_inquiry';
      break;
    default:
      // Keep current stage or set to greeting if new
      if (!state.stage || state.stage === 'greeting') {
        state.stage = 'greeting';
      }
  }
}

// Cleanup function
export function cleanupOldConversations() {
  const cutoffTime = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
  
  conversationStates.forEach((state, sessionId) => {
    const lastMessage = state.conversationHistory[state.conversationHistory.length - 1];
    if (lastMessage && lastMessage.timestamp < cutoffTime) {
      conversationStates.delete(sessionId);
    }
  });
}