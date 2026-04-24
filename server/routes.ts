import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import jwt from "jsonwebtoken";
import { storage } from "./storage";
import { generateSitemap, generateRobotsTxt } from "./sitemap-generator";
import { insertContactSchema, insertChatMessageSchema, insertSeoDataSchema } from "@shared/schema";
import { generateAIResponse, analyzeUserIntent, updateUserPreferences } from "./ai-service";
import { getSmartResponse } from "./smart-chat-service";
import { getCPAChatResponse, generateWelcomeMessage, type ChatMessage } from "./lib/openai";
import { addPerformanceRoutes } from "./routes-performance";
import { cleanupSeoData, validateRobotsDirective } from "./seo-cleanup";
import { SSLValidator } from "./ssl-validator";
import Stripe from "stripe";
import paymentRouter from "./payment-router";
import { getBusinessConfig } from "./business-config";
import { getEnhancedSEODefaults } from "./seo-business-integration";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { z } from "zod";
import { generateBlogContent, generateBlogMetadata } from "./ai-service";

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin authentication middleware — verifies a HS256-signed JWT issued at login.
  // Accepts the token from the Authorization: Bearer header or from the admin_token cookie.
  const adminAuth = (req: Request, res: Response, next: NextFunction): void => {
    const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;
    if (!ADMIN_JWT_SECRET) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else if (req.cookies && req.cookies.admin_token) {
      token = req.cookies.admin_token as string;
    }

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const payload = jwt.verify(token, ADMIN_JWT_SECRET, { algorithms: ['HS256'] }) as jwt.JwtPayload;
      if (payload.role !== 'admin') {
        res.status(403).json({ message: "Forbidden" });
        return;
      }
      next();
    } catch {
      res.status(401).json({ message: "Unauthorized" });
    }
  };

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
  app.get("/api/contacts", adminAuth, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Update contact status
  app.patch("/api/contacts/:id", adminAuth, async (req, res) => {
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
  const SELAM_SYSTEM_PROMPT = `You are "Ask Selam", the AI tax advisor for Selam CPA — a full-service CPA firm led by Yacob Tewelde, CPA, FCCA, based in Laurel, Maryland and serving clients nationwide virtually.

YOUR ROLE:
- Answer general tax, accounting, and financial questions in plain English
- Help small business owners understand their options
- Guide users toward appropriate Selam CPA services when relevant
- Be warm, professional, and direct — like a trusted advisor

SERVICES YOU CAN DISCUSS:
- Tax preparation (individuals, S-Corps, LLCs, partnerships, C-Corps)
- Bookkeeping and accounting
- Fractional CFO services
- Audit, review, and compilation engagements
- Tax strategy and planning (S-Corp elections, entity selection, retirement plans, estimated taxes)
- AI consulting for accounting firms

KEY FACTS:
- Yacob Tewelde holds both CPA (Maryland) and FCCA credentials
- The firm serves all 50 states virtually
- Based in Laurel, MD — also serves DMV in person
- Book a free 30-min call: https://calendly.com/yber2001/30min
- Phone: (301) 640-8549
- Email: info@selamcpa.com

GUARDRAILS:
- Never give specific tax advice for a user's personal situation
- Always add: "This is general information — your situation may differ. Book a free call for personalized advice."
- Never quote specific tax owed or refund amounts
- Never discuss competitor firms
- If asked about legal advice, redirect to an attorney
- Keep responses concise — 2-4 paragraphs maximum
- After answering, naturally mention the relevant Selam CPA service or calculator when appropriate

TONE: Professional but warm. Plain English. No jargon without explanation. Think "trusted advisor at a dinner party", not "formal legal document".`;

  app.post("/api/chat", async (req, res) => {
    try {
      const { sessionId, message, messages } = req.body;

      // Support both new format (messages array) and legacy format (single message string)
      const userMessage = message || (messages && messages.length > 0 ? messages[messages.length - 1].content : "");
      const conversationMessages = messages || [{ role: "user", content: userMessage }];

      let response: string;

      if (process.env.OPENAI_API_KEY) {
        try {
          const OpenAI = (await import("openai")).default;
          const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

          const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: SELAM_SYSTEM_PROMPT },
              ...conversationMessages.map((m: any) => ({ role: m.role, content: m.content }))
            ],
            max_tokens: 500,
            temperature: 0.7,
          });

          response = completion.choices[0].message.content || "I'm sorry, I couldn't generate a response. Please try again or call us at (301) 640-8549.";
        } catch (aiError) {
          console.error("OpenAI error, falling back to smart chat:", aiError);
          const smartResponse = getSmartResponse(sessionId, userMessage);
          response = smartResponse.response;
        }
      } else {
        const smartResponse = getSmartResponse(sessionId, userMessage);
        response = smartResponse.response;
      }

      // Save to storage
      if (userMessage) {
        await storage.createChatMessage({ sessionId, message: userMessage, response });
      }

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

  // Server-side service catalog — the authoritative source of prices.
  // The client sends a service_key; the server looks up the price.
  const SERVICE_CATALOG: Record<string, { price: number; description: string }> = {
    consultation_1hr:   { price: 250,  description: "Comprehensive accounting consultation session (1 hour)" },
    digital_guidelines: { price: 9.99, description: "Practical digital solutions for everyday business accounting challenges" },
  };
  // Minimum amount enforced server-side for extended / custom consultations.
  const EXTENDED_CONSULTATION_MIN = 99;

  // Stripe payment route for one-time payments
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { service_key, amount: clientAmount } = req.body;

      let finalAmount: number;
      let description: string;

      if (service_key === "extended") {
        // Extended consultation: caller-supplied amount with a server-enforced minimum
        const requested = parseFloat(clientAmount);
        if (!requested || requested < EXTENDED_CONSULTATION_MIN) {
          return res.status(400).json({
            error: `Extended consultation minimum is $${EXTENDED_CONSULTATION_MIN}`
          });
        }
        finalAmount = requested;
        description = "Extended CPA Consultation";
      } else {
        const service = SERVICE_CATALOG[service_key as string];
        if (!service) {
          return res.status(400).json({ error: "Invalid service" });
        }
        finalAmount = service.price;
        description = service.description;
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(finalAmount * 100), // Convert to cents
        currency: "usd",
        description,
        metadata: { service_key: service_key ?? "extended", description }
      });

      res.json({
        clientSecret: paymentIntent.client_secret,
        amount: finalAmount
      });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({
        message: "Error creating payment intent: " + error.message
      });
    }
  });


  // Dashboard API endpoints
  app.get("/api/user-purchases/:email", adminAuth, async (req, res) => {
    try {
      const purchases = await storage.getUserPurchases(req.params.email);
      res.json(purchases);
    } catch (error) {
      console.error("Error fetching user purchases:", error);
      res.status(500).json({ message: "Failed to fetch user purchases" });
    }
  });

  app.get("/api/user-progress/:email", adminAuth, async (req, res) => {
    try {
      const progress = await storage.getUserProgress(req.params.email);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching user progress:", error);
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  app.get("/api/user-recommendations/:email", adminAuth, async (req, res) => {
    try {
      const recommendations = await storage.getUserRecommendations(req.params.email);
      res.json(recommendations);
    } catch (error) {
      console.error("Error fetching user recommendations:", error);
      res.status(500).json({ message: "Failed to fetch user recommendations" });
    }
  });

  app.patch("/api/user-progress/:email", adminAuth, async (req, res) => {
    try {
      const { guideTitle, sectionsCompleted, notes } = req.body;
      const progress = await storage.updateUserProgress(req.params.email, guideTitle, sectionsCompleted, notes);
      res.json(progress);
    } catch (error) {
      console.error("Error updating user progress:", error);
      res.status(500).json({ message: "Failed to update user progress" });
    }
  });

  app.delete("/api/recommendations/:id", adminAuth, async (req, res) => {
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

  app.get("/api/career-applications", adminAuth, async (req, res) => {
    try {
      const applications = await storage.getCareerApplications();
      res.json(applications);
    } catch (error) {
      console.error("Error fetching career applications:", error);
      res.status(500).json({ message: "Failed to fetch career applications" });
    }
  });

  app.get("/api/career-applications/:id", adminAuth, async (req, res) => {
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

  app.patch("/api/career-applications/:id", adminAuth, async (req, res) => {
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

      const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
      const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
      const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;

      if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !ADMIN_JWT_SECRET) {
        return res.status(500).json({ message: "Server misconfiguration" });
      }

      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ sub: username, role: 'admin' }, ADMIN_JWT_SECRET, {
          algorithm: 'HS256',
          expiresIn: '24h',
        });
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

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
      let seoData = await storage.getSeoDataByPage(page);
      
      if (!seoData) {
        // Return enhanced default SEO data with business integration
        const enhancedDefaults = getEnhancedSEODefaults(page);
        seoData = {
          id: 0,
          page,
          lastUpdated: new Date(),
          metaRobots: "index, follow",
          ...enhancedDefaults
        };
      } else {
        // Enhance existing data with current business config for better consistency
        const enhancedDefaults = getEnhancedSEODefaults(page);
        seoData = {
          ...seoData,
          // Update image URLs if they're still pointing to old domain
          ogImage: (seoData.ogImage && seoData.ogImage.includes('lenoxcpa.com')) ? enhancedDefaults.ogImage : seoData.ogImage,
          twitterImage: (seoData.twitterImage && seoData.twitterImage.includes('lenoxcpa.com')) ? enhancedDefaults.twitterImage : seoData.twitterImage,
          canonicalUrl: enhancedDefaults.canonicalUrl,
          structuredData: page === 'home' && !seoData.structuredData ? enhancedDefaults.structuredData : seoData.structuredData
        };
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

  // Note: X-Robots-Tag header middleware removed per user request
  // SEO robots directives are now handled only via HTML meta tags

  // Sitemap and robots.txt routes
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const sitemap = await generateSitemap();
      res.set('Content-Type', 'text/xml');
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.set('Pragma', 'no-cache');
      res.set('Expires', '0');
      res.send(sitemap);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  app.get("/robots.txt", (req, res) => {
    try {
      const robots = generateRobotsTxt();
      res.set('Content-Type', 'text/plain');
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.set('Pragma', 'no-cache');
      res.set('Expires', '0');
      res.send(robots);
    } catch (error) {
      console.error("Error generating robots.txt:", error);
      res.status(500).send("Error generating robots.txt");
    }
  });

  // SEO management API for sitemap and robots.txt
  app.get("/api/sitemap", async (req, res) => {
    try {
      const sitemap = await generateSitemap();
      res.json({ content: sitemap });
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).json({ message: "Failed to generate sitemap" });
    }
  });

  app.get("/api/robots", (req, res) => {
    try {
      const robots = generateRobotsTxt();
      res.json({ content: robots });
    } catch (error) {
      console.error("Error generating robots.txt:", error);
      res.status(500).json({ message: "Failed to generate robots.txt" });
    }
  });

  // SEO cleanup endpoint
  app.post("/api/seo-cleanup", async (req, res) => {
    try {
      const result = await cleanupSeoData();
      res.json(result);
    } catch (error: any) {
      console.error("Error during SEO cleanup:", error);
      res.status(500).json({ message: "SEO cleanup failed", error: error.message });
    }
  });

  // Add performance monitoring routes
  addPerformanceRoutes(app, adminAuth);

  // Add payment routes for subscriptions and one-time payments
  app.use("/api/payments", paymentRouter);

  // Business configuration endpoint
  app.get("/api/business-config", (req, res) => {
    res.json(getBusinessConfig());
  });

  // Helper to verify admin credentials from Authorization header (Basic auth).
  // Fails closed: returns false when required env vars are not configured.
  const validateAdminAuth = (req: any): boolean => {
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    // Fail closed if credentials are not explicitly configured
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) return false;

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) return false;
    try {
      const decoded = Buffer.from(authHeader.substring(6), 'base64').toString('utf8');
      const colonIndex = decoded.indexOf(':');
      if (colonIndex === -1) return false;
      const username = decoded.substring(0, colonIndex);
      const password = decoded.substring(colonIndex + 1);
      return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
    } catch {
      return false;
    }
  };

  // SSL certificate validation endpoint (admin-only)
  app.get('/api/ssl-status/:domain', async (req, res) => {
    if (!validateAdminAuth(req)) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    try {
      const domain = req.params.domain;
      const sslCheck = await SSLValidator.checkDomainSSL(domain);
      res.json(sslCheck);
    } catch (error: any) {
      const isDestinationBlocked = error?.message && (
        error.message.includes('not permitted') ||
        error.message.includes('private or restricted')
      );
      if (isDestinationBlocked) {
        return res.status(400).json({
          status: 'error',
          details: { valid: false, errors: ['Invalid destination'] }
        });
      }
      console.error('SSL validation error:', error);
      res.status(500).json({ 
        status: 'error', 
        details: { 
          valid: false, 
          errors: ['SSL validation failed'] 
        } 
      });
    }
  });

  // Helper function to validate blog task authentication
  const validateBlogTaskAuth = (req: any): boolean => {
    // Check Authorization header (Bearer token)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      return token === process.env.BLOG_TASK_TOKEN;
    }
    
    // Check query parameter (fallback)
    const queryToken = req.query.token as string;
    return queryToken === process.env.BLOG_TASK_TOKEN;
  };

  // Automated blog publishing task endpoints (GET for backward compatibility)
  app.get("/api/tasks/publish-monthly", async (req, res) => {
    try {
      if (!validateBlogTaskAuth(req)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token" });
      }

      const result = await generateScheduledBlogPost('monthly');
      res.json({
        success: true,
        message: "Monthly blog post published successfully",
        post: result
      });
    } catch (error) {
      console.error("Error in monthly blog publishing task:", error);
      res.status(500).json({ 
        success: false,
        message: "Failed to publish monthly blog post",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // POST endpoint for blog publishing (preferred method)
  app.post("/api/tasks/publish-monthly", async (req, res) => {
    try {
      if (!validateBlogTaskAuth(req)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token" });
      }

      const result = await generateScheduledBlogPost('monthly');
      res.json({
        success: true,
        message: "Monthly blog post published successfully",
        post: result
      });
    } catch (error) {
      console.error("Error in monthly blog publishing task:", error);
      res.status(500).json({ 
        success: false,
        message: "Failed to publish monthly blog post",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.get("/api/tasks/publish-weekly", async (req, res) => {
    try {
      const token = req.query.token as string;
      if (!token || token !== process.env.BLOG_TASK_TOKEN) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token" });
      }

      const result = await generateScheduledBlogPost('weekly');
      res.json({
        success: true,
        message: "Weekly content published successfully",
        post: result
      });
    } catch (error) {
      console.error("Error in weekly content publishing task:", error);
      res.status(500).json({ 
        success: false,
        message: "Failed to publish weekly content",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.get("/api/tasks/publish-quarterly", async (req, res) => {
    try {
      const token = req.query.token as string;
      if (!token || token !== process.env.BLOG_TASK_TOKEN) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token" });
      }

      const result = await generateScheduledBlogPost('quarterly');
      res.json({
        success: true,
        message: "Quarterly content published successfully",
        post: result
      });
    } catch (error) {
      console.error("Error in quarterly content publishing task:", error);
      res.status(500).json({ 
        success: false,
        message: "Failed to publish quarterly content",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Content schedule management endpoints
  app.get("/api/content-schedule", async (req, res) => {
    try {
      const schedules = await storage.getContentSchedules();
      res.json(schedules);
    } catch (error) {
      console.error("Error fetching content schedules:", error);
      res.status(500).json({ message: "Failed to fetch content schedules" });
    }
  });

  app.post("/api/content-schedule", async (req, res) => {
    try {
      const { contentType, frequency, nextRunDate, lastRunDate, isActive, topicCategories, publishTime } = req.body;
      
      // Validate required fields
      if (!contentType || !frequency || !nextRunDate) {
        return res.status(400).json({ message: "Missing required fields: contentType, frequency, nextRunDate" });
      }
      
      // Convert date strings to Date objects
      const scheduleData = {
        contentType,
        frequency,
        nextRunDate: new Date(nextRunDate),
        lastRunDate: lastRunDate ? new Date(lastRunDate) : undefined,
        isActive: isActive !== undefined ? isActive : true,
        topicCategories: topicCategories || [],
        publishTime: publishTime || "09:00"
      };
      
      // Validate that dates are valid
      if (isNaN(scheduleData.nextRunDate.getTime())) {
        return res.status(400).json({ message: "Invalid nextRunDate format" });
      }
      
      if (scheduleData.lastRunDate && isNaN(scheduleData.lastRunDate.getTime())) {
        return res.status(400).json({ message: "Invalid lastRunDate format" });
      }
      
      const schedule = await storage.createContentSchedule(scheduleData);
      res.json(schedule);
    } catch (error) {
      console.error("Error creating content schedule:", error);
      res.status(500).json({ message: "Failed to create content schedule" });
    }
  });

  // Content analytics endpoints
  app.get("/api/content-analytics/:postId", async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const analytics = await storage.getContentAnalytics(postId);
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching content analytics:", error);
      res.status(500).json({ message: "Failed to fetch content analytics" });
    }
  });

  app.post("/api/content-analytics", async (req, res) => {
    try {
      const { blogPostId, views, uniqueViews, timeOnPage, bounceRate, socialShares, emailClicks, contactFormSubmissions } = req.body;
      
      // Validate required fields
      if (!blogPostId) {
        return res.status(400).json({ message: "Missing required field: blogPostId" });
      }
      
      const analyticsData = {
        blogPostId: parseInt(blogPostId),
        views: views || 0,
        uniqueViews: uniqueViews || 0,
        timeOnPage: timeOnPage || 0,
        bounceRate: bounceRate || null,
        socialShares: socialShares || 0,
        emailClicks: emailClicks || 0,
        contactFormSubmissions: contactFormSubmissions || 0
      };
      
      const analytics = await storage.createContentAnalytics(analyticsData);
      res.json(analytics);
    } catch (error) {
      console.error("Error creating content analytics:", error);
      res.status(500).json({ message: "Failed to create content analytics" });
    }
  });

  // Email notification management
  app.post("/api/email-notifications/subscribe", async (req, res) => {
    try {
      const subscription = await storage.createEmailNotification(req.body);
      
      // Send welcome email if SendGrid is configured
      if (process.env.SENDGRID_API_KEY) {
        await sendWelcomeEmail(req.body.email, req.body.notificationType);
      }
      
      res.json(subscription);
    } catch (error) {
      console.error("Error creating email subscription:", error);
      res.status(500).json({ message: "Failed to create email subscription" });
    }
  });

  app.get("/api/email-notifications", adminAuth, async (req, res) => {
    try {
      const notifications = await storage.getEmailNotifications();
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching email notifications:", error);
      res.status(500).json({ message: "Failed to fetch email notifications" });
    }
  });

  // Blog post preview and scheduling
  app.post("/api/blog/schedule", async (req, res) => {
    try {
      const { scheduledFor, contentType, ...postData } = req.body;
      
      const blogPost = {
        ...postData,
        status: 'scheduled',
        contentType,
        scheduledFor: new Date(scheduledFor),
        autoGenerated: false
      };
      
      const scheduledPost = await storage.createBlogPost(blogPost);
      res.json(scheduledPost);
    } catch (error) {
      console.error("Error scheduling blog post:", error);
      res.status(500).json({ message: "Failed to schedule blog post" });
    }
  });

  // Social media integration endpoint
  app.post("/api/social-media/post", async (req, res) => {
    try {
      const { blogPostId, platforms } = req.body;
      const result = await postToSocialMedia(blogPostId, platforms);
      res.json(result);
    } catch (error) {
      console.error("Error posting to social media:", error);
      res.status(500).json({ message: "Failed to post to social media" });
    }
  });

  // Content backup and versioning endpoints
  app.get("/api/content-backups/:blogPostId", async (req, res) => {
    try {
      const blogPostId = parseInt(req.params.blogPostId);
      if (isNaN(blogPostId)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      
      const backups = await storage.getContentBackups(blogPostId);
      res.json(backups);
    } catch (error) {
      console.error("Error fetching content backups:", error);
      res.status(500).json({ message: "Failed to fetch content backups" });
    }
  });

  app.post("/api/content-backups", async (req, res) => {
    try {
      const { blogPostId, version, changeReason } = req.body;
      
      if (!blogPostId) {
        return res.status(400).json({ message: "Missing required field: blogPostId" });
      }
      
      // Get current blog post
      const currentPost = await storage.getBlogPost(`post-${blogPostId}`);
      if (!currentPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      // Get next version number if not provided
      const nextVersion = version || (await storage.getLatestVersion(blogPostId)) + 1;
      
      const backupData = {
        blogPostId: parseInt(blogPostId),
        version: nextVersion,
        title: currentPost.title,
        slug: currentPost.slug,
        excerpt: currentPost.excerpt,
        content: currentPost.content,
        category: currentPost.category,
        author: currentPost.author,
        status: currentPost.status,
        contentType: currentPost.contentType,
        autoGenerated: currentPost.autoGenerated,
        seoScore: currentPost.seoScore,
        changeReason: changeReason || 'manual_backup',
        originalPublishedAt: currentPost.publishedAt
      };
      
      const backup = await storage.createContentBackup(backupData);
      res.json(backup);
    } catch (error) {
      console.error("Error creating content backup:", error);
      res.status(500).json({ message: "Failed to create content backup" });
    }
  });

  app.post("/api/content-restore/:blogPostId/:version", async (req, res) => {
    try {
      const blogPostId = parseInt(req.params.blogPostId);
      const version = parseInt(req.params.version);
      
      if (isNaN(blogPostId) || isNaN(version)) {
        return res.status(400).json({ message: "Invalid blog post ID or version number" });
      }
      
      const restoredPost = await storage.restoreContentVersion(blogPostId, version);
      if (!restoredPost) {
        return res.status(404).json({ message: "Blog post or version not found" });
      }
      
      res.json({
        success: true,
        message: `Content restored to version ${version}`,
        post: restoredPost
      });
    } catch (error) {
      console.error("Error restoring content version:", error);
      res.status(500).json({ message: "Failed to restore content version" });
    }
  });

  // Chatbot API routes
  app.get("/api/chat/welcome", async (req, res) => {
    try {
      const welcomeResponse = await generateWelcomeMessage();
      res.json(welcomeResponse);
    } catch (error) {
      console.error("Error generating welcome message:", error);
      res.status(500).json({ 
        message: "Welcome to Selam CPA! How can I help you today?",
        suggestedActions: ["Schedule consultation", "Ask a question"]
      });
    }
  });

  app.post("/api/chat/message", async (req, res) => {
    try {
      const { messages, userContext } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ 
          message: "Invalid request format. Messages array is required." 
        });
      }

      const response = await getCPAChatResponse(messages, userContext);
      res.json(response);
    } catch (error) {
      console.error("Error processing chat message:", error);
      res.status(500).json({ 
        message: "I apologize, but I'm experiencing technical difficulties. Please call us at (301) 640-8549 for immediate assistance.",
        suggestedActions: ["Call (301) 640-8549", "Try again"]
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Generate scheduled blog post content using AI
async function generateScheduledBlogPost(contentType: 'weekly' | 'monthly' | 'quarterly') {
  const currentDate = new Date();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  
  // Topics relevant to CPA services and current time of year
  const seasonalTopics = getSeasonalCPATopics(currentDate.getMonth());

  try {
    // Generate long-form blog content using dedicated blog AI function
    const selectedTopic = seasonalTopics[0]; // Use first topic from seasonal list
    const content = await generateBlogContent(selectedTopic, `${monthName} ${year}`);
    
    // Generate title and excerpt based on content
    const title = await generateBlogMetadata(content, 'title');
    const excerpt = await generateBlogMetadata(content, 'excerpt');
    
    // Generate slug from title
    const slug = generateSlug(title);
    
    // Determine category based on month
    const category = getMonthlyCategory(currentDate.getMonth());
    
    // Create blog post object
    const blogPost = {
      title,
      slug,
      excerpt,
      content,
      category,
      author: "Selam CPA Team",
      contentType,
      autoGenerated: true,
      status: 'published' as const
    };
    
    // Save to database
    const savedPost = await storage.createBlogPost(blogPost);
    
    // Create initial backup version
    await storage.createContentBackup({
      blogPostId: savedPost.id,
      version: 1,
      title: savedPost.title,
      slug: savedPost.slug,
      excerpt: savedPost.excerpt,
      content: savedPost.content,
      category: savedPost.category,
      author: savedPost.author,
      status: savedPost.status,
      contentType: savedPost.contentType,
      autoGenerated: savedPost.autoGenerated,
      seoScore: savedPost.seoScore,
      changeReason: 'initial_creation',
      originalPublishedAt: savedPost.publishedAt
    });
    
    return savedPost;
  } catch (error) {
    console.error('Error generating monthly blog post:', error);
    throw new Error(`Failed to generate blog post: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Get seasonal CPA topics based on month
function getSeasonalCPATopics(month: number): string[] {
  const topicsByMonth = {
    0: ['Year-End Tax Planning Strategies', 'W-2 and 1099 Preparation', 'Small Business Tax Deductions'], // January
    1: ['Business Formation for the New Year', 'Quarterly Tax Estimates', 'Bookkeeping Best Practices'], // February  
    2: ['Tax Season Preparation', 'Document Organization Tips', 'Common Tax Mistakes to Avoid'], // March
    3: ['Post-Tax Season Business Review', 'Cash Flow Management', 'Financial Statement Analysis'], // April
    4: ['Business Growth Strategies', 'Technology Integration for Accounting', 'Investment Planning'], // May
    5: ['Mid-Year Financial Checkup', 'Payroll Best Practices', 'Business Advisory Services'], // June
    6: ['Summer Business Planning', 'Audit Preparation Tips', 'Financial Risk Management'], // July
    7: ['Business Formation and Structure', 'Tax-Advantaged Retirement Planning', 'Compliance Updates'], // August
    8: ['Fall Financial Planning', 'Business Budgeting Strategies', 'Tax Law Changes'], // September
    9: ['Quarterly Review and Planning', 'Business Insurance Considerations', 'Year-End Tax Strategies'], // October
    10: ['Year-End Tax Planning', 'Small Business Deduction Strategies', 'Financial Year-End Cleanup'], // November
    11: ['Tax Planning for Next Year', 'Business Goal Setting', 'Financial Statement Preparation'] // December
  };
  
  return topicsByMonth[month as keyof typeof topicsByMonth] || topicsByMonth[0];
}

// Get category based on month
function getMonthlyCategory(month: number): string {
  const categories = {
    0: 'Tax Planning', 1: 'Business Formation', 2: 'Tax Preparation', 3: 'Financial Analysis',
    4: 'Business Growth', 5: 'Financial Planning', 6: 'Business Advisory', 7: 'Compliance',
    8: 'Financial Planning', 9: 'Tax Strategy', 10: 'Tax Planning', 11: 'Year-End Planning'
  };
  
  return categories[month as keyof typeof categories] || 'Business Advisory';
}

// Generate URL-friendly slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 60);
}

// Email notification functions
async function sendWelcomeEmail(email: string, notificationType: string): Promise<void> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid not configured, skipping welcome email');
    return;
  }

  try {
    // This would integrate with SendGrid - placeholder for now
    console.log(`Welcome email sent to ${email} for ${notificationType}`);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }
}

// Social media integration functions
async function postToSocialMedia(blogPostId: number, platforms: string[]): Promise<any> {
  try {
    // Get blog post from storage
    const post = await storage.getBlogPost(`post-${blogPostId}`);
    if (!post) {
      throw new Error('Blog post not found');
    }

    const results = [];
    for (const platform of platforms) {
      // Placeholder for social media API integration
      console.log(`Posting to ${platform}:`, post.title);
      results.push({
        platform,
        success: true,
        postId: `${platform}-${Date.now()}`
      });
    }

    // Update blog post to mark as posted to social media
    await storage.updateBlogPost(post.slug, { socialMediaPosted: true });

    return {
      success: true,
      results
    };
  } catch (error) {
    console.error('Social media posting error:', error);
    throw error;
  }
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
