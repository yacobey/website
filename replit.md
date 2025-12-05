# Selam CPA - Full-Stack Web Application

## Overview

Selam CPA is a comprehensive full-stack web application for a CPA firm, serving individuals, businesses, and specialized sectors. It integrates traditional accounting with AI-powered financial tools, secure file sharing, and strategic technology partnerships. The application aims to enhance client engagement and lead generation through a modern, conversion-optimized design, offering services like tax preparation, financial statements, and advisory. Its business vision includes providing remote accounting solutions and leveraging AI for efficient client services and affiliate marketing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **State Management**: TanStack Query
- **Styling**: Tailwind CSS with shadcn/ui and Radix UI
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (Neon serverless)
- **Session Management**: Express sessions with PostgreSQL store
- **Build System**: esbuild

### Monorepo Structure
- **Client**: React frontend
- **Server**: Express backend API
- **Shared**: Common TypeScript schemas and types

### Key Features and Components
- **Database Schema**: Users, Contacts, Blog Posts, Calculators, Chat Messages.
- **API Endpoints**: Contact, Blog, Calculator Tools, Chat, Payment (Stripe).
- **Frontend Pages**: Home, Blog, AI Tools, Partners, Agent, Individual Blog Posts, Testimonials.
- **AI-Powered Features**: 
  - Calculator Builder (from natural language prompts)
  - Pre-built calculators (Tax, ROI, Cash Flow, Break-Even, Loan, Depreciation)
  - AI Agent with lifetime access model ($29.99 one-time payment)
  - Chatbot integration
  - Curated technology partnerships
- **Payment Integration**:
  - Stripe integration for one-time payments
  - Agent page: $29.99 one-time payment for lifetime full access
  - Cookie-based access verification (scpa cookie)
  - Payment status tracking via Stripe checkout sessions
- **Homepage Enhancements**:
  - Clickable industry cards (Healthcare, Real Estate, Retail, Professional Services, Technology, Construction) linking to contact page
  - Featured testimonials section with 3 client testimonials
  - Link to full testimonials page
- **Agent Page Features**:
  - Comprehensive content about AI agent capabilities
  - Target audience descriptions (Entrepreneurs, CFOs, Controllers, Accountants, Auditors)
  - What the agent provides (Expert Guidance, Audit Procedures, Risk Assessment Templates, Financial Analysis)
  - 7+ example questions users can ask
  - Free vs. Paid access modes with clear UI distinction
  - Embedded agent iframe with fallback link
- **UI/UX Decisions**: Clean, modern aesthetic with professional gray color scheme and refined typography, responsive design, enhanced navigation, trust indicators, and conversion-optimized forms.
- **Technical Implementations**: Form validation with Zod, data persistence via Drizzle, real-time updates with TanStack Query, session management for chat, analytics tracking, Stripe payment processing.
- **Security & SEO**: Helmet security middleware with CSP, comprehensive SEO optimization with `react-helmet` (dynamic meta titles, descriptions, Open Graph tags), page-specific SEO, dynamic blog post SEO, secure admin login for SEO dashboard, canonical tags, Google Search Console verification.
- **Performance**: Server compression, lazy loading, performance monitoring, caching strategies, database query optimizations, React performance enhancements (Suspense, Error boundaries, skeleton loading).

## External Dependencies

- **Database**: PostgreSQL (via Neon serverless)
- **Analytics**: Google Analytics 4
- **Styling**: Tailwind CSS, PostCSS, Lucide React, React Icons
- **Development Tools**: TypeScript, ESLint/Prettier, Drizzle Kit, Vite
- **UI/UX Libraries**: shadcn/ui, Radix UI, React Hook Form, Date-fns
- **Payment Processing**: Stripe (for one-time payments and access control)
- **Scheduling**: Calendly (consultation booking)
- **AI Integration**: OpenAI (for AI Assistant)

## Recent Changes (November 2025)

### Contact Information Update (November 2025)
- **Phone Number Change**: Updated primary contact number from (301) 640-8549 to (240) 473-2623
- **Updated Locations**:
  - Business configuration (server/business-config.ts)
  - All AI system prompts (OpenAI, chatbot services)
  - Client-facing pages (Contact, Payment, Careers, Privacy Policy)
  - Structured data and SEO metadata
  - Error messages and fallback responses
- **Format**: Both E.164 (+12404732623) and display format (240) 473-2623

### Agent Page Redesign
- **Payment Model Change**: Converted from subscription to one-time payment ($29.99 for lifetime access)
- **Enhanced Content**: Added comprehensive sections explaining:
  - Who benefits from the agent (Business Owners, Finance Professionals, Auditors)
  - What the agent provides (Guidance, Audit Procedures, Risk Assessments, Financial Analysis)
  - 7+ example questions demonstrating capabilities
- **Backend Updates**: Modified `server/payment-router.ts` to handle one-time payments instead of subscriptions
- **Access Control**: Payment verification checks completed Stripe checkout sessions with metadata
- **UI Improvements**: Redesigned free vs. paid mode banners with clear pricing display

### Homepage Improvements
- **Interactive Industry Cards**: All 6 industry cards now clickable, linking to contact page for industry-specific inquiries
- **Testimonials Section**: Added featured testimonials section with 3 client testimonials
- **Social Proof**: Includes ratings, business names, industries, and link to full testimonials page

### External Service Configuration
All external service links configured in `server/business-config.ts`:
- Calendly URL for scheduling (default: https://calendly.com/yber2001/30min)
- Intake form URL (configurable via INTAKE_FORM_URL env var)
- Secure upload portal URL (configurable via SECURE_UPLOAD_URL env var)
- Agent public URL (configurable via AGENT_PUBLIC_URL env var)

### Blog Content Updates (November 2025)
- **New Blog Posts**: Added 6 comprehensive, SEO-optimized blog posts (2000+ words each):
  1. AI-Powered Financial Planning: Transform Your Business Budget in 2025
  2. Cybersecurity for Small Businesses: Protect Your Financial Data in 2025
  3. Zero-Based Budgeting: The Ultimate Guide for Small Business Success
  4. Cash Flow Forecasting: Predict and Prevent Financial Crisis
  5. Cloud Accounting Revolution: Why Modern Businesses Are Ditching Desktop Software
  6. Small Business Tax Credits You're Missing in 2025
- **Content Strategy**: Posts focus on financial planning, budgeting, security, technology, and tax planning
- **SEO Optimization**: All posts include strategic keywords, practical examples, case studies, and clear CTAs
- **Target Audience**: Small business owners, finance professionals, entrepreneurs seeking accounting expertise

### Automatic Blog Generation System
The application includes an automated blog post generation system:
- **AI-Powered Content**: Uses OpenAI to generate high-quality blog posts based on seasonal CPA topics
- **Scheduling Endpoints**:
  - `/api/tasks/publish-monthly` - Generates monthly blog content
  - `/api/tasks/publish-weekly` - Generates weekly content updates
  - `/api/tasks/publish-quarterly` - Generates quarterly industry insights
- **Authentication**: Requires `BLOG_TASK_TOKEN` environment variable for secure access
- **Seasonal Topics**: Automatically selects relevant topics based on current month (tax season, year-end planning, etc.)
- **Content Features**:
  - Auto-generates title, excerpt, and full content
  - Assigns appropriate category based on topic
  - Creates SEO-friendly slugs
  - Maintains content backup versions
  - Tracks auto-generated status in database
- **Integration**: Can be triggered by external schedulers (cron jobs, Replit scheduled tasks) for regular content updates