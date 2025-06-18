import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertChatMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid contact data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create contact" });
      }
    }
  });

  // Get all contacts (admin endpoint)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Individual blog post
  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Calculators
  app.get("/api/calculators", async (req, res) => {
    try {
      const calculators = await storage.getCalculators();
      res.json(calculators);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch calculators" });
    }
  });

  // Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { sessionId, message } = req.body;
      
      if (!sessionId || !message) {
        return res.status(400).json({ error: "Session ID and message are required" });
      }

      // Simple chatbot responses
      const response = generateChatResponse(message.toLowerCase());
      
      await storage.createChatMessage({
        sessionId,
        message,
        response
      });

      res.json({ response });
    } catch (error) {
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // Chat history
  app.get("/api/chat/:sessionId", async (req, res) => {
    try {
      const history = await storage.getChatHistory(req.params.sessionId);
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chat history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function generateChatResponse(message: string): string {
  // Simple keyword-based responses
  if (message.includes('service') || message.includes('what do you do')) {
    return "We offer comprehensive CPA services including tax preparation, bookkeeping, payroll services, business formation, financial planning, and audit services. Would you like to know more about any specific service?";
  }
  
  if (message.includes('price') || message.includes('cost') || message.includes('fee')) {
    return "Our pricing varies based on the services you need. We offer competitive rates and free consultations. Would you like to schedule a consultation to discuss your specific needs and get a custom quote?";
  }
  
  if (message.includes('tax') || message.includes('taxes')) {
    return "We provide expert tax preparation and planning services for individuals and businesses. Our team stays up-to-date with the latest tax laws to maximize your savings. We can help with tax returns, quarterly filings, and year-round tax planning.";
  }
  
  if (message.includes('bookkeeping') || message.includes('accounting')) {
    return "Our bookkeeping and accounting services ensure your financial records are accurate and up-to-date. We handle daily transactions, reconciliations, financial statements, and compliance reporting so you can focus on growing your business.";
  }
  
  if (message.includes('consultation') || message.includes('meeting') || message.includes('appointment')) {
    return "I'd be happy to help you schedule a free consultation! You can use the 'Schedule Consultation' button on our website, or provide your contact information and we'll reach out to you within 24 hours.";
  }
  
  if (message.includes('ai') || message.includes('calculator') || message.includes('tool')) {
    return "Our AI-powered tools include a custom calculator builder and pre-built calculators for taxes, ROI analysis, and cash flow tracking. These tools help you make informed financial decisions. Would you like to try our calculator builder?";
  }
  
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! Welcome to ProBalance CPA. I'm here to help answer your questions about our accounting services. How can I assist you today?";
  }
  
  if (message.includes('help')) {
    return "I'm here to help! I can answer questions about our CPA services, pricing, AI tools, or help you schedule a consultation. What would you like to know more about?";
  }
  
  // Default response
  return "Thank you for your question! For detailed information about our services, I'd recommend scheduling a free consultation with one of our CPAs. They can provide personalized advice based on your specific needs. You can schedule online or call us at (555) 123-4567.";
}
