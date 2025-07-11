import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

interface ChatContext {
  conversationHistory: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>;
  userPreferences?: {
    businessType?: string;
    serviceInterest?: string[];
    contactPreference?: string;
  };
}

const conversationContexts = new Map<string, ChatContext>();

export async function generateAIResponse(sessionId: string, userMessage: string): Promise<string> {
  if (!openai) {
    throw new Error('OpenAI API key not configured');
  }

  // Get or create conversation context
  let context = conversationContexts.get(sessionId);
  if (!context) {
    context = {
      conversationHistory: [],
      userPreferences: {}
    };
    conversationContexts.set(sessionId, context);
  }

  // Add user message to history
  context.conversationHistory.push({
    role: 'user',
    content: userMessage,
    timestamp: new Date()
  });

  try {
    const systemPrompt = `You are a professional AI assistant for Selam CPA, a comprehensive accounting firm. You help potential clients understand our services and guide them toward scheduling consultations.

ABOUT PROBALANCE CPA:
- Full-service CPA firm serving individuals, small businesses, and enterprises
- Services: Tax preparation/planning, bookkeeping, payroll, business advisory, audit/assurance, business formation
- Specialties: AI-powered financial tools, technology integration, multi-industry expertise
- Contact: (301) 640-8549 | Virtual and in-person consultations available
- Pricing: FREE 30-minute consultation, $250 for 1-hour comprehensive consultation

KEY MESSAGING:
- Emphasize tax savings and financial optimization
- Highlight free consultation as low-risk way to get started
- Focus on practical, actionable advice
- Mention AI tools and modern technology approach
- Build trust through expertise and transparency

CONVERSATION STYLE:
- Professional but approachable
- Ask follow-up questions to understand needs
- Provide specific, actionable information
- Always offer next steps (consultation, specific services)
- Use bullet points for clarity when listing services
- Keep responses conversational and helpful

RESPONSE GUIDELINES:
- Maximum 3-4 sentences for simple questions
- Use bullet points for service lists
- Always end with a question or call-to-action
- Mention specific tax forms, business types, or financial concepts when relevant
- If unsure about complex tax questions, recommend consultation

Previous conversation context: ${context.conversationHistory.slice(-4).map(msg => `${msg.role}: ${msg.content}`).join('\n')}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      max_tokens: 300,
      temperature: 0.7
    });

    const assistantResponse = response.choices[0].message.content || "I'd be happy to help you with your accounting needs. Would you like to schedule a free consultation to discuss your specific situation?";

    // Add assistant response to history
    context.conversationHistory.push({
      role: 'assistant',
      content: assistantResponse,
      timestamp: new Date()
    });

    // Keep only last 10 messages to manage memory
    if (context.conversationHistory.length > 10) {
      context.conversationHistory = context.conversationHistory.slice(-10);
    }

    return assistantResponse;

  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate AI response');
  }
}

export function updateUserPreferences(sessionId: string, preferences: Partial<ChatContext['userPreferences']>) {
  const context = conversationContexts.get(sessionId);
  if (context) {
    context.userPreferences = { ...context.userPreferences, ...preferences };
  }
}

export function getChatContext(sessionId: string): ChatContext | undefined {
  return conversationContexts.get(sessionId);
}

// Clean up old conversations (run periodically)
export function cleanupOldConversations() {
  const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
  
  conversationContexts.forEach((context, sessionId) => {
    const lastMessage = context.conversationHistory[context.conversationHistory.length - 1];
    if (lastMessage && lastMessage.timestamp < cutoffTime) {
      conversationContexts.delete(sessionId);
    }
  });
}

// Analyze user intent and extract preferences
export function analyzeUserIntent(message: string): {
  businessType?: string;
  serviceInterest?: string[];
  urgency?: 'low' | 'medium' | 'high';
  contactPreference?: string;
} {
  const lowerMessage = message.toLowerCase();
  const intent: any = {};

  // Business type detection
  if (lowerMessage.includes('small business') || lowerMessage.includes('startup')) {
    intent.businessType = 'small_business';
  } else if (lowerMessage.includes('corporation') || lowerMessage.includes('large business')) {
    intent.businessType = 'corporation';
  } else if (lowerMessage.includes('individual') || lowerMessage.includes('personal')) {
    intent.businessType = 'individual';
  }

  // Service interest detection
  intent.serviceInterest = [];
  if (lowerMessage.includes('tax')) intent.serviceInterest.push('tax');
  if (lowerMessage.includes('bookkeeping')) intent.serviceInterest.push('bookkeeping');
  if (lowerMessage.includes('payroll')) intent.serviceInterest.push('payroll');
  if (lowerMessage.includes('audit')) intent.serviceInterest.push('audit');
  if (lowerMessage.includes('business formation')) intent.serviceInterest.push('business_formation');

  // Urgency detection
  if (lowerMessage.includes('urgent') || lowerMessage.includes('asap') || lowerMessage.includes('immediately')) {
    intent.urgency = 'high';
  } else if (lowerMessage.includes('soon') || lowerMessage.includes('quickly')) {
    intent.urgency = 'medium';
  } else {
    intent.urgency = 'low';
  }

  // Contact preference
  if (lowerMessage.includes('call') || lowerMessage.includes('phone')) {
    intent.contactPreference = 'phone';
  } else if (lowerMessage.includes('email')) {
    intent.contactPreference = 'email';
  } else if (lowerMessage.includes('meeting') || lowerMessage.includes('appointment')) {
    intent.contactPreference = 'meeting';
  }

  return intent;
}