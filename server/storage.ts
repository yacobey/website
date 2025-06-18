import { contacts, blogPosts, calculators, chatMessages, users, type Contact, type BlogPost, type Calculator, type ChatMessage, type User, type InsertContact, type InsertBlogPost, type InsertCalculator, type InsertChatMessage, type InsertUser } from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private blogPosts: Map<number, BlogPost>;
  private calculators: Map<number, Calculator>;
  private chatMessages: Map<number, ChatMessage>;
  private currentId: number;
  private currentContactId: number;
  private currentBlogId: number;
  private currentCalculatorId: number;
  private currentChatId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.blogPosts = new Map();
    this.calculators = new Map();
    this.chatMessages = new Map();
    this.currentId = 1;
    this.currentContactId = 1;
    this.currentBlogId = 1;
    this.currentCalculatorId = 1;
    this.currentChatId = 1;
    
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
        author: "ProBalance CPA Team",
        status: "published"
      },
      {
        title: "Cash Flow Management: 5 Strategies for Small Business Success",
        slug: "cash-flow-management-5-strategies-small-business-success",
        excerpt: "Master your cash flow with these proven strategies that have helped hundreds of small businesses thrive in any economic climate...",
        content: "Cash flow is the lifeblood of any business. Here are five proven strategies to master your cash flow management...",
        category: "Financial Planning",
        author: "ProBalance CPA Team",
        status: "published"
      },
      {
        title: "Digital Transformation: How AI is Revolutionizing Accounting",
        slug: "digital-transformation-ai-revolutionizing-accounting",
        excerpt: "Discover how artificial intelligence and automation are changing the accounting landscape and what it means for your business...",
        content: "The accounting industry is experiencing a digital transformation like never before. AI and automation are changing how we work...",
        category: "Technology",
        author: "ProBalance CPA Team",
        status: "published"
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
      ...insertContact,
      id,
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
      ...insertPost,
      id,
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
}

export const storage = new MemStorage();
