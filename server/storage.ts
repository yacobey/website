import {
  contacts,
  blogPosts,
  calculators,
  chatMessages,
  users,
  userPurchases,
  userProgress,
  personalizedRecommendations,
  careerApplications,
  type Contact,
  type BlogPost,
  type Calculator,
  type ChatMessage,
  type User,
  type UserPurchase,
  type UserProgress,
  type PersonalizedRecommendation,
  type CareerApplication,
  type InsertContact,
  type InsertBlogPost,
  type InsertCalculator,
  type InsertChatMessage,
  type InsertUser,
  type InsertUserPurchase,
  type InsertUserProgress,
  type InsertPersonalizedRecommendation,
  type InsertCareerApplication,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, isNull } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  updateContactStatus(id: number, status: string): Promise<Contact | undefined>;
  
  // Blog methods
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Calculator methods
  getCalculators(): Promise<Calculator[]>;
  getCalculator(id: number): Promise<Calculator | undefined>;
  createCalculator(calculator: InsertCalculator): Promise<Calculator>;
  
  // Chat methods
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatHistory(sessionId: string): Promise<ChatMessage[]>;
  
  // Dashboard methods
  createUserPurchase(purchase: InsertUserPurchase): Promise<UserPurchase>;
  getUserPurchases(email: string): Promise<UserPurchase[]>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserProgress(email: string, guideTitle: string, sectionsCompleted: number, notes?: string): Promise<UserProgress | undefined>;
  getUserProgress(email: string): Promise<UserProgress[]>;
  createPersonalizedRecommendation(recommendation: InsertPersonalizedRecommendation): Promise<PersonalizedRecommendation>;
  getUserRecommendations(email: string): Promise<PersonalizedRecommendation[]>;
  dismissRecommendation(id: number): Promise<void>;
  
  // Career methods
  createCareerApplication(application: InsertCareerApplication): Promise<CareerApplication>;
  getCareerApplications(): Promise<CareerApplication[]>;
  getCareerApplication(id: number): Promise<CareerApplication | undefined>;
  updateCareerApplicationStatus(id: number, status: string, notes?: string): Promise<CareerApplication | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private blogPosts: Map<number, BlogPost>;
  private calculators: Map<number, Calculator>;
  private chatMessages: Map<number, ChatMessage>;
  private userPurchases: Map<number, UserPurchase>;
  private userProgress: Map<number, UserProgress>;
  private personalizedRecommendations: Map<number, PersonalizedRecommendation>;
  private careerApplications: Map<number, CareerApplication>;
  private currentId: number;
  private currentContactId: number;
  private currentBlogId: number;
  private currentCalculatorId: number;
  private currentChatId: number;
  private currentPurchaseId: number;
  private currentProgressId: number;
  private currentRecommendationId: number;
  private currentCareerApplicationId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.blogPosts = new Map();
    this.calculators = new Map();
    this.chatMessages = new Map();
    this.userPurchases = new Map();
    this.userProgress = new Map();
    this.personalizedRecommendations = new Map();
    this.careerApplications = new Map();
    this.currentId = 1;
    this.currentContactId = 1;
    this.currentBlogId = 1;
    this.currentCalculatorId = 1;
    this.currentChatId = 1;
    this.currentPurchaseId = 1;
    this.currentProgressId = 1;
    this.currentRecommendationId = 1;
    this.currentCareerApplicationId = 1;
    
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample blog posts
    const samplePosts: InsertBlogPost[] = [
      {
        title: "2024 Tax Season: Key Changes Small Businesses Need to Know",
        slug: "2024-tax-season-key-changes-small-businesses",
        excerpt: "Understanding the latest tax law changes can save your business thousands. Here's what you need to prepare for this tax season...",
        content: "Tax season is upon us, and 2024 brings several important changes that small business owners need to understand...",
        category: "Tax Planning",
        author: "ProBalance CPA Team"
      },
      {
        title: "Cash Flow Management: 5 Strategies for Small Business Success",
        slug: "cash-flow-management-5-strategies-small-business-success",
        excerpt: "Master your cash flow with these proven strategies that have helped hundreds of small businesses thrive in any economic climate...",
        content: "Cash flow is the lifeblood of any business. Here are five proven strategies to master your cash flow management...",
        category: "Financial Planning",
        author: "ProBalance CPA Team"
      },
      {
        title: "Digital Transformation: How AI is Revolutionizing Accounting",
        slug: "digital-transformation-ai-revolutionizing-accounting",
        excerpt: "Discover how artificial intelligence and automation are changing the accounting landscape and what it means for your business...",
        content: "The accounting industry is experiencing a digital transformation like never before. AI and automation are changing how we work...",
        category: "Technology",
        author: "ProBalance CPA Team"
      }
    ];

    samplePosts.forEach(post => this.createBlogPost(post));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = {
      id,
      firstName: insertContact.firstName,
      lastName: insertContact.lastName,
      email: insertContact.email,
      phone: insertContact.phone || null,
      businessType: insertContact.businessType || null,
      message: insertContact.message || null,
      createdAt: new Date(),
      status: "new"
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async updateContactStatus(id: number, status: string): Promise<Contact | undefined> {
    const contact = this.contacts.get(id);
    if (contact) {
      contact.status = status;
      this.contacts.set(id, contact);
      return contact;
    }
    return undefined;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.status === "published")
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      post => post.slug === slug && post.status === "published"
    );
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogId++;
    const post: BlogPost = {
      id,
      title: insertPost.title,
      slug: insertPost.slug,
      content: insertPost.content,
      status: "published",
      excerpt: insertPost.excerpt,
      category: insertPost.category,
      author: insertPost.author,
      publishedAt: new Date()
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async getCalculators(): Promise<Calculator[]> {
    return Array.from(this.calculators.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getCalculator(id: number): Promise<Calculator | undefined> {
    return this.calculators.get(id);
  }

  async createCalculator(insertCalculator: InsertCalculator): Promise<Calculator> {
    const id = this.currentCalculatorId++;
    const calculator: Calculator = {
      ...insertCalculator,
      id,
      createdAt: new Date()
    };
    this.calculators.set(id, calculator);
    return calculator;
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatId++;
    const message: ChatMessage = {
      ...insertMessage,
      id,
      createdAt: new Date()
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async getChatHistory(sessionId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(msg => msg.sessionId === sessionId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createUserPurchase(insertPurchase: InsertUserPurchase): Promise<UserPurchase> {
    const id = this.currentPurchaseId++;
    const purchase: UserPurchase = {
      id,
      email: insertPurchase.email,
      productType: insertPurchase.productType,
      productName: insertPurchase.productName,
      amount: insertPurchase.amount,
      stripePaymentIntentId: insertPurchase.stripePaymentIntentId ?? null,
      status: insertPurchase.status || "completed",
      purchaseDate: new Date(),
      accessExpiresAt: insertPurchase.accessExpiresAt ?? null,
    };
    this.userPurchases.set(id, purchase);
    return purchase;
  }

  async getUserPurchases(email: string): Promise<UserPurchase[]> {
    return Array.from(this.userPurchases.values())
      .filter(purchase => purchase.email === email)
      .sort((a, b) => (b.purchaseDate?.getTime() || 0) - (a.purchaseDate?.getTime() || 0));
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = this.currentProgressId++;
    const progress: UserProgress = {
      ...insertProgress,
      id,
      lastAccessedAt: new Date(),
      sectionsCompleted: insertProgress.sectionsCompleted ?? null,
      completedAt: insertProgress.completedAt ?? null,
      notes: insertProgress.notes ?? null,
    };
    this.userProgress.set(id, progress);
    return progress;
  }

  async updateUserProgress(email: string, guideTitle: string, sectionsCompleted: number, notes?: string): Promise<UserProgress | undefined> {
    const existingProgress = Array.from(this.userProgress.values())
      .find(p => p.email === email && p.guideTitle === guideTitle);
    
    if (existingProgress) {
      existingProgress.sectionsCompleted = sectionsCompleted;
      existingProgress.lastAccessedAt = new Date();
      if (notes) existingProgress.notes = notes;
      if (sectionsCompleted >= existingProgress.totalSections) {
        existingProgress.completedAt = new Date();
      }
      this.userProgress.set(existingProgress.id, existingProgress);
      return existingProgress;
    }
    return undefined;
  }

  async getUserProgress(email: string): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values())
      .filter(progress => progress.email === email)
      .sort((a, b) => (b.lastAccessedAt?.getTime() || 0) - (a.lastAccessedAt?.getTime() || 0));
  }

  async createPersonalizedRecommendation(insertRecommendation: InsertPersonalizedRecommendation): Promise<PersonalizedRecommendation> {
    const id = this.currentRecommendationId++;
    const recommendation: PersonalizedRecommendation = {
      ...insertRecommendation,
      id,
      createdAt: new Date(),
      priority: insertRecommendation.priority ?? null,
      isActive: insertRecommendation.isActive ?? null,
      dismissedAt: insertRecommendation.dismissedAt ?? null,
    };
    this.personalizedRecommendations.set(id, recommendation);
    return recommendation;
  }

  async getUserRecommendations(email: string): Promise<PersonalizedRecommendation[]> {
    return Array.from(this.personalizedRecommendations.values())
      .filter(rec => rec.email === email && rec.isActive && !rec.dismissedAt)
      .sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }

  async dismissRecommendation(id: number): Promise<void> {
    const recommendation = this.personalizedRecommendations.get(id);
    if (recommendation) {
      recommendation.dismissedAt = new Date();
      this.personalizedRecommendations.set(id, recommendation);
    }
  }

  async createCareerApplication(insertApplication: InsertCareerApplication): Promise<CareerApplication> {
    const id = this.currentCareerApplicationId++;
    const application: CareerApplication = {
      ...insertApplication,
      id,
      submittedAt: new Date(),
      updatedAt: new Date(),
      status: insertApplication.status || "new",
      notes: insertApplication.notes || null,
      coverLetter: insertApplication.coverLetter || null,
      resumeUrl: insertApplication.resumeUrl || null,
      linkedinUrl: insertApplication.linkedinUrl || null,
      portfolioUrl: insertApplication.portfolioUrl || null,
    };
    this.careerApplications.set(id, application);
    return application;
  }

  async getCareerApplications(): Promise<CareerApplication[]> {
    return Array.from(this.careerApplications.values())
      .sort((a, b) => (b.submittedAt?.getTime() || 0) - (a.submittedAt?.getTime() || 0));
  }

  async getCareerApplication(id: number): Promise<CareerApplication | undefined> {
    return this.careerApplications.get(id);
  }

  async updateCareerApplicationStatus(id: number, status: string, notes?: string): Promise<CareerApplication | undefined> {
    const application = this.careerApplications.get(id);
    if (application) {
      application.status = status;
      application.updatedAt = new Date();
      if (notes !== undefined) {
        application.notes = notes;
      }
      this.careerApplications.set(id, application);
      return application;
    }
    return undefined;
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values({
        ...insertContact,
        status: "new"
      })
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(contacts.createdAt);
  }

  async getContact(id: number): Promise<Contact | undefined> {
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
    return contact || undefined;
  }

  async updateContactStatus(id: number, status: string): Promise<Contact | undefined> {
    const [contact] = await db
      .update(contacts)
      .set({ status })
      .where(eq(contacts.id, id))
      .returning();
    return contact || undefined;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(blogPosts.publishedAt);
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db
      .insert(blogPosts)
      .values({
        ...insertPost,
        status: "published"
      })
      .returning();
    return post;
  }

  async getCalculators(): Promise<Calculator[]> {
    return await db.select().from(calculators).orderBy(calculators.createdAt);
  }

  async getCalculator(id: number): Promise<Calculator | undefined> {
    const [calculator] = await db.select().from(calculators).where(eq(calculators.id, id));
    return calculator || undefined;
  }

  async createCalculator(insertCalculator: InsertCalculator): Promise<Calculator> {
    const [calculator] = await db
      .insert(calculators)
      .values(insertCalculator)
      .returning();
    return calculator;
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db
      .insert(chatMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getChatHistory(sessionId: string): Promise<ChatMessage[]> {
    return await db.select().from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(chatMessages.createdAt);
  }

  async createUserPurchase(insertPurchase: InsertUserPurchase): Promise<UserPurchase> {
    const [purchase] = await db
      .insert(userPurchases)
      .values(insertPurchase)
      .returning();
    return purchase;
  }

  async getUserPurchases(email: string): Promise<UserPurchase[]> {
    return await db.select().from(userPurchases)
      .where(eq(userPurchases.email, email))
      .orderBy(desc(userPurchases.purchaseDate));
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const [progress] = await db
      .insert(userProgress)
      .values(insertProgress)
      .returning();
    return progress;
  }

  async updateUserProgress(email: string, guideTitle: string, sectionsCompleted: number, notes?: string): Promise<UserProgress | undefined> {
    const [existing] = await db.select().from(userProgress)
      .where(and(eq(userProgress.email, email), eq(userProgress.guideTitle, guideTitle)));
    
    if (existing) {
      const updateData: any = {
        sectionsCompleted,
        lastAccessedAt: new Date(),
      };
      
      if (notes) updateData.notes = notes;
      if (sectionsCompleted >= existing.totalSections) {
        updateData.completedAt = new Date();
      }
      
      const [updated] = await db
        .update(userProgress)
        .set(updateData)
        .where(eq(userProgress.id, existing.id))
        .returning();
      return updated;
    }
    return undefined;
  }

  async getUserProgress(email: string): Promise<UserProgress[]> {
    return await db.select().from(userProgress)
      .where(eq(userProgress.email, email))
      .orderBy(desc(userProgress.lastAccessedAt));
  }

  async createPersonalizedRecommendation(insertRecommendation: InsertPersonalizedRecommendation): Promise<PersonalizedRecommendation> {
    const [recommendation] = await db
      .insert(personalizedRecommendations)
      .values(insertRecommendation)
      .returning();
    return recommendation;
  }

  async getUserRecommendations(email: string): Promise<PersonalizedRecommendation[]> {
    return await db.select().from(personalizedRecommendations)
      .where(and(
        eq(personalizedRecommendations.email, email),
        eq(personalizedRecommendations.isActive, true),
        isNull(personalizedRecommendations.dismissedAt)
      ))
      .orderBy(desc(personalizedRecommendations.priority));
  }

  async dismissRecommendation(id: number): Promise<void> {
    await db
      .update(personalizedRecommendations)
      .set({ dismissedAt: new Date() })
      .where(eq(personalizedRecommendations.id, id));
  }

  async createCareerApplication(insertApplication: InsertCareerApplication): Promise<CareerApplication> {
    const [application] = await db
      .insert(careerApplications)
      .values(insertApplication)
      .returning();
    return application;
  }

  async getCareerApplications(): Promise<CareerApplication[]> {
    return await db.select().from(careerApplications)
      .orderBy(desc(careerApplications.submittedAt));
  }

  async getCareerApplication(id: number): Promise<CareerApplication | undefined> {
    const [application] = await db.select().from(careerApplications)
      .where(eq(careerApplications.id, id));
    return application;
  }

  async updateCareerApplicationStatus(id: number, status: string, notes?: string): Promise<CareerApplication | undefined> {
    const updateData: any = { status, updatedAt: new Date() };
    if (notes !== undefined) {
      updateData.notes = notes;
    }
    
    const [application] = await db
      .update(careerApplications)
      .set(updateData)
      .where(eq(careerApplications.id, id))
      .returning();
    return application;
  }
}

export const storage = new DatabaseStorage();
