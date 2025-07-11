import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertChatMessageSchema, insertSeoDataSchema } from "@shared/schema";
import { generateAIResponse, analyzeUserIntent, updateUserPreferences } from "./ai-service";
import { getSmartResponse } from "./smart-chat-service";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contact = await storage.createContact(req.body);
      res.json(contact);
    } catch (error) {
      console.error("Error creating contact:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Get all contacts (for admin)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Update contact status
  app.patch("/api/contacts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      const contact = await storage.updateContactStatus(id, status);
      res.json(contact);
    } catch (error) {
      console.error("Error updating contact:", error);
      res.status(500).json({ message: "Failed to update contact" });
    }
  });

  // Blog routes
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog", async (req, res) => {
    try {
      const post = await storage.createBlogPost(req.body);
      res.json(post);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  // Calculator routes
  app.get("/api/calculators", async (req, res) => {
    try {
      const calculators = await storage.getCalculators();
      res.json(calculators);
    } catch (error) {
      console.error("Error fetching calculators:", error);
      res.status(500).json({ message: "Failed to fetch calculators" });
    }
  });

  app.post("/api/calculators", async (req, res) => {
    try {
      const calculator = await storage.createCalculator(req.body);
      res.json(calculator);
    } catch (error) {
      console.error("Error creating calculator:", error);
      res.status(500).json({ message: "Failed to create calculator" });
    }
  });

  // Chat routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { sessionId, message } = req.body;
      
      let response: string;
      
      // Try to use AI service first, fallback to rule-based responses
      if (process.env.OPENAI_API_KEY) {
        try {
          // Analyze user intent and update preferences
          const intent = analyzeUserIntent(message);
          if (Object.keys(intent).length > 0) {
            updateUserPreferences(sessionId, intent);
          }
          
          response = await generateAIResponse(sessionId, message);
        } catch (aiError) {
          console.error("AI service error, falling back to smart chat service:", aiError);
          const smartResponse = getSmartResponse(sessionId, message);
          response = smartResponse.response;
        }
      } else {
        // Use smart chat service as primary fallback
        const smartResponse = getSmartResponse(sessionId, message);
        response = smartResponse.response;
      }
      
      // Save both user message and bot response
      await storage.createChatMessage({
        sessionId,
        message,
        response
      });
      
      res.json({ response });
    } catch (error) {
      console.error("Error processing chat message:", error);
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });

  app.get("/api/chat/:sessionId/history", async (req, res) => {
    try {
      const messages = await storage.getChatHistory(req.params.sessionId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ message: "Failed to fetch chat history" });
    }
  });

  // Stripe payment route for one-time payments
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, description = "CPA Services" } = req.body;
      
      if (!amount || amount < 0.50) {
        return res.status(400).json({ error: "Amount must be at least $0.50" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        description,
        metadata: {
          description: description
        }
      });
      
      res.json({ 
        clientSecret: paymentIntent.client_secret,
        amount: amount
      });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ 
        message: "Error creating payment intent: " + error.message 
      });
    }
  });


  // Dashboard API endpoints
  app.get("/api/user-purchases/:email", async (req, res) => {
    try {
      const purchases = await storage.getUserPurchases(req.params.email);
      res.json(purchases);
    } catch (error) {
      console.error("Error fetching user purchases:", error);
      res.status(500).json({ message: "Failed to fetch user purchases" });
    }
  });

  app.get("/api/user-progress/:email", async (req, res) => {
    try {
      const progress = await storage.getUserProgress(req.params.email);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching user progress:", error);
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  app.get("/api/user-recommendations/:email", async (req, res) => {
    try {
      const recommendations = await storage.getUserRecommendations(req.params.email);
      res.json(recommendations);
    } catch (error) {
      console.error("Error fetching user recommendations:", error);
      res.status(500).json({ message: "Failed to fetch user recommendations" });
    }
  });

  app.patch("/api/user-progress/:email", async (req, res) => {
    try {
      const { guideTitle, sectionsCompleted, notes } = req.body;
      const progress = await storage.updateUserProgress(req.params.email, guideTitle, sectionsCompleted, notes);
      res.json(progress);
    } catch (error) {
      console.error("Error updating user progress:", error);
      res.status(500).json({ message: "Failed to update user progress" });
    }
  });

  app.delete("/api/recommendations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.dismissRecommendation(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error dismissing recommendation:", error);
      res.status(500).json({ message: "Failed to dismiss recommendation" });
    }
  });

  // Career application endpoints
  app.post("/api/career-applications", async (req, res) => {
    try {
      const application = await storage.createCareerApplication(req.body);
      res.json(application);
    } catch (error) {
      console.error("Error creating career application:", error);
      res.status(500).json({ message: "Failed to submit career application" });
    }
  });

  app.get("/api/career-applications", async (req, res) => {
    try {
      const applications = await storage.getCareerApplications();
      res.json(applications);
    } catch (error) {
      console.error("Error fetching career applications:", error);
      res.status(500).json({ message: "Failed to fetch career applications" });
    }
  });

  app.get("/api/career-applications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const application = await storage.getCareerApplication(id);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      res.json(application);
    } catch (error) {
      console.error("Error fetching career application:", error);
      res.status(500).json({ message: "Failed to fetch career application" });
    }
  });

  app.patch("/api/career-applications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status, notes } = req.body;
      const application = await storage.updateCareerApplicationStatus(id, status, notes);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      res.json(application);
    } catch (error) {
      console.error("Error updating career application:", error);
      res.status(500).json({ message: "Failed to update career application" });
    }
  });

  // Admin authentication routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Simple authentication - in production, use proper password hashing
      const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
      const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lenoxcpa2025';
      
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        
        res.json({
          success: true,
          token,
          expires: expires.toISOString(),
          message: "Login successful"
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid username or password"
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });



  // SEO Data routes
  app.get("/api/seo-data", async (req, res) => {
    try {
      const seoData = await storage.getSeoData();
      res.json(seoData);
    } catch (error) {
      console.error("Error fetching SEO data:", error);
      res.status(500).json({ message: "Failed to fetch SEO data" });
    }
  });

  app.get("/api/seo-data/:page", async (req, res) => {
    try {
      const page = req.params.page;
      const seoData = await storage.getSeoDataByPage(page);
      if (!seoData) {
        return res.status(404).json({ message: "SEO data not found for this page" });
      }
      res.json(seoData);
    } catch (error) {
      console.error("Error fetching SEO data:", error);
      res.status(500).json({ message: "Failed to fetch SEO data" });
    }
  });

  app.post("/api/seo-data", async (req, res) => {
    try {
      const validatedData = insertSeoDataSchema.parse(req.body);
      const seoData = await storage.createSeoData(validatedData);
      res.json(seoData);
    } catch (error) {
      console.error("Error creating SEO data:", error);
      res.status(500).json({ message: "Failed to create SEO data" });
    }
  });

  app.put("/api/seo-data/:page", async (req, res) => {
    try {
      const page = req.params.page;
      const updateData = req.body;
      const seoData = await storage.updateSeoData(page, updateData);
      if (!seoData) {
        return res.status(404).json({ message: "SEO data not found for this page" });
      }
      res.json(seoData);
    } catch (error) {
      console.error("Error updating SEO data:", error);
      res.status(500).json({ message: "Failed to update SEO data" });
    }
  });

  // Middleware to set dynamic X-Robots-Tag header for all page requests
  app.use(async (req, res, next) => {
    // Skip API routes and static assets
    if (req.path.startsWith('/api/') || req.path.includes('.') || req.path.startsWith('/assets')) {
      return next();
    }

    try {
      // Extract page name from URL
      const pageName = req.path === '/' ? 'home' : req.path.slice(1).split('/')[0];
      
      // Try to get SEO data for this page
      const seoData = await storage.getSeoDataByPage(pageName);
      
      if (seoData && seoData.metaRobots && seoData.metaRobots.trim()) {
        // Set X-Robots-Tag header based on database
        res.set('X-Robots-Tag', seoData.metaRobots);
      } else {
        // Set default robots tag for pages without specific SEO data
        res.set('X-Robots-Tag', 'index, follow');
      }
    } catch (error) {
      // If SEO data lookup fails, set default header
      res.set('X-Robots-Tag', 'index, follow');
    }
    
    next();
  });

  const httpServer = createServer(app);
  return httpServer;
}

function generateChatResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! Welcome to Selam CPA. I'm here to help with your accounting and tax questions. What can I assist you with today?";
  }
  
  // Services overview
  if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('what services')) {
    return "Selam CPA offers comprehensive financial services:\n\n• Tax Preparation & Planning (Individual & Business)\n• Bookkeeping & Financial Statements\n• Business Advisory & Consulting\n• Audit & Assurance Services\n• Payroll Processing\n• Business Formation & Structure\n• Financial Planning & Analysis\n• AI-Powered Financial Tools\n\nWhich service interests you most?";
  }
  
  // Tax-related questions
  if (lowerMessage.includes('tax') && (lowerMessage.includes('help') || lowerMessage.includes('preparation') || lowerMessage.includes('filing'))) {
    return "Our tax specialists can help you with:\n\n• Individual tax returns (1040, schedules)\n• Business tax returns (1120, 1065, 1120S)\n• Quarterly estimated tax payments\n• Tax planning strategies\n• IRS representation and audit support\n• State and local tax compliance\n\nWe stay current with all tax law changes to maximize your savings. Would you like to schedule a free consultation?";
  }
  
  // Bookkeeping specific
  if (lowerMessage.includes('bookkeeping') || lowerMessage.includes('books') || lowerMessage.includes('financial statements')) {
    return "Our bookkeeping services include:\n\n• Daily transaction recording\n• Bank & credit card reconciliation\n• Accounts payable/receivable management\n• Monthly financial statements\n• Cash flow analysis\n• QuickBooks setup and training\n• Payroll processing\n\nWe ensure accuracy and compliance so you can focus on growing your business. Need help getting started?";
  }
  
  // Business advisory
  if (lowerMessage.includes('business advisory') || lowerMessage.includes('consulting') || lowerMessage.includes('business advice')) {
    return "Our business advisory services help you make informed decisions:\n\n• Financial analysis and KPI tracking\n• Business valuation and planning\n• Cash flow forecasting\n• Growth strategy development\n• Risk management assessment\n• Technology integration planning\n\nWe work with businesses across all industries. What specific challenges are you facing?";
  }
  
  // Small business focus
  if (lowerMessage.includes('small business') || lowerMessage.includes('startup') || lowerMessage.includes('entrepreneur')) {
    return "We specialize in helping small businesses succeed:\n\n• Business formation (LLC, Corp, Partnership)\n• Initial bookkeeping setup\n• Tax structure optimization\n• Cash flow management\n• Financial planning for growth\n• Technology recommendations\n\nMany small business owners save 15-30% on taxes with proper planning. Ready to optimize your business finances?";
  }
  
  // Individual tax services
  if (lowerMessage.includes('individual') || lowerMessage.includes('personal') || lowerMessage.includes('1040')) {
    return "Our individual tax services cover:\n\n• Standard and itemized deductions\n• Self-employment income (Schedule C)\n• Rental property income (Schedule E)\n• Investment income and capital gains\n• Retirement planning strategies\n• Multi-state tax situations\n\nFree consultation to review your situation and identify tax-saving opportunities. When would you like to meet?";
  }
  
  // Pricing and consultation
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee') || lowerMessage.includes('consultation')) {
    return "Our pricing is transparent and competitive:\n\n• FREE 30-minute consultation\n• $250 for 1-hour comprehensive consultation\n• Custom pricing for ongoing services\n• No hidden fees or surprises\n\nMany clients save more in taxes than they pay in fees. The free consultation helps us understand your needs and provide accurate pricing. Schedule yours today!";
  }
  
  // AI and tools
  if (lowerMessage.includes('ai') || lowerMessage.includes('calculator') || lowerMessage.includes('tool') || lowerMessage.includes('technology')) {
    return "Our AI-powered tools give you instant financial insights:\n\n• Custom Calculator Builder (create any financial calculator)\n• Tax Planning Calculators\n• ROI and Investment Analysis\n• Cash Flow Projections\n• Break-even Analysis\n\nPlus, we recommend the best accounting software and AI tools for your business. Want to try our calculator builder?";
  }
  
  // Audit services
  if (lowerMessage.includes('audit') || lowerMessage.includes('assurance') || lowerMessage.includes('review')) {
    return "Our audit and assurance services provide credibility:\n\n• Financial statement audits\n• Reviews and compilations\n• Internal control assessments\n• Compliance audits\n• Due diligence for acquisitions\n\nRequired for loans, investors, or regulatory compliance. What type of assurance service do you need?";
  }
  
  // Payroll questions
  if (lowerMessage.includes('payroll') || lowerMessage.includes('employees') || lowerMessage.includes('wages')) {
    return "Our payroll services handle everything:\n\n• Bi-weekly, monthly, or custom pay schedules\n• Tax withholdings and deposits\n• W-2 and 1099 preparation\n• State unemployment and workers' comp\n• Direct deposit and pay stubs\n• Compliance with labor laws\n\nAutomate your payroll and avoid costly penalties. How many employees do you have?";
  }
  
  // Contact and scheduling
  if (lowerMessage.includes('schedule') || lowerMessage.includes('appointment') || lowerMessage.includes('meeting') || lowerMessage.includes('contact')) {
    return "Ready to get started? Here's how to connect:\n\n• Book a FREE consultation online\n• Call us at (301) 640-8549\n• Email through our contact form\n• Same-day response guaranteed\n\nOur CPAs are available for virtual or in-person meetings. What works best for your schedule?";
  }
  
  // Help and general questions
  if (lowerMessage.includes('help') || lowerMessage.includes('question') || lowerMessage.includes('more info')) {
    return "I'm here to help! I can provide information about:\n\n• Our CPA services and expertise\n• Pricing and consultation options\n• Tax planning strategies\n• Business advisory services\n• AI tools and calculators\n• Scheduling appointments\n\nWhat specific question can I answer for you?";
  }
  
  // Default response with helpful options
  return "Thanks for reaching out! I can help you with information about our CPA services, pricing, or schedule a consultation.\n\nPopular topics:\n• Tax preparation and planning\n• Bookkeeping and financial statements\n• Business advisory services\n• Free consultation scheduling\n\nWhat would you like to know more about?";
}
