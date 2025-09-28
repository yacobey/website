import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface CPAChatResponse {
  message: string;
  suggestedActions?: string[];
  requiresFollowUp?: boolean;
  leadData?: {
    intent: string;
    urgency: "low" | "medium" | "high";
    serviceNeeded?: string;
  };
}

// CPA-specific system prompt for professional responses
const CPA_SYSTEM_PROMPT = `You are a professional AI assistant for Selam CPA, a certified public accounting firm. You provide expert accounting, tax, and financial advice while maintaining the highest professional standards.

CORE EXPERTISE:
- Tax preparation and planning (individual, business, estate)
- Business formation and compliance
- Bookkeeping and financial statements
- Audit and assurance services
- Business advisory and consulting
- QuickBooks and accounting software setup

COMMUNICATION STYLE:
- Professional, warm, and approachable
- Use clear, jargon-free language
- Always prioritize client confidentiality
- Provide actionable advice
- Encourage scheduling consultations for complex matters

CLIENT INTAKE GOALS:
- Qualify leads based on service needs
- Identify urgency level
- Collect basic contact information when appropriate
- Direct to scheduling consultation when ready

SERVICES TO PROMOTE:
- Tax preparation and planning
- Bookkeeping services
- Business formation
- Financial statement preparation
- SelamTax CPA Agent (AI-powered tax assistance)

CONTACT INFO:
- Phone: (301) 640-8549
- Service areas: MD, VA, DC Metro Area
- Consultation scheduling available

Always end complex tax or business questions with a suggestion to schedule a consultation for personalized advice.`;

export async function getCPAChatResponse(
  messages: ChatMessage[],
  userContext?: any
): Promise<CPAChatResponse> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        { role: "system", content: CPA_SYSTEM_PROMPT },
        ...messages
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    return {
      message: result.message || "I'm here to help with your accounting and tax questions. How can I assist you today?",
      suggestedActions: result.suggestedActions || [],
      requiresFollowUp: result.requiresFollowUp || false,
      leadData: result.leadData
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      message: "I apologize, but I'm experiencing technical difficulties. Please call us at (301) 640-8549 for immediate assistance, or try again in a moment.",
      suggestedActions: ["Call (301) 640-8549", "Schedule a consultation"],
      requiresFollowUp: false
    };
  }
}

export async function generateWelcomeMessage(): Promise<CPAChatResponse> {
  const welcomePrompt = `Generate a welcoming introduction message for new visitors to Selam CPA's website. 
  
  Include:
  - Brief introduction to services
  - Invitation to ask questions
  - Suggest common services
  
  Respond in JSON format with:
  {
    "message": "welcome message",
    "suggestedActions": ["array of 2-3 quick action buttons"]
  }`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        { role: "system", content: CPA_SYSTEM_PROMPT },
        { role: "user", content: welcomePrompt }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      message: result.message || "👋 Welcome to Selam CPA! I'm here to help with your accounting and tax questions. How can I assist you today?",
      suggestedActions: result.suggestedActions || ["Schedule a consultation", "Tax questions", "Business services"],
      requiresFollowUp: false
    };
  } catch (error) {
    console.error("Error generating welcome message:", error);
    return {
      message: "👋 Welcome to Selam CPA! I'm here to help with your accounting and tax questions. How can I assist you today?",
      suggestedActions: ["Schedule a consultation", "Tax questions", "Business services"],
      requiresFollowUp: false
    };
  }
}