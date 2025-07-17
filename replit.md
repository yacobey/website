# Selam CPA - Full-Stack Web Application

## Overview

Selam CPA is a comprehensive full-stack web application designed for a CPA firm serving individuals, businesses across all industries, and specialized sectors. The application combines traditional accounting services with innovative AI-powered financial tools, secure file sharing solutions, and strategic technology partnerships for complete client engagement and lead generation capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: Radix UI primitives with custom theming

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Session Management**: Express sessions with PostgreSQL store
- **Build System**: esbuild for production bundling

### Monorepo Structure
- **Client**: React frontend application (`/client`)
- **Server**: Express backend API (`/server`)
- **Shared**: Common TypeScript schemas and types (`/shared`)

## Key Components

### Database Schema
The application uses five main entities:
- **Users**: Authentication and user management
- **Contacts**: Lead capture and client inquiries
- **Blog Posts**: Content marketing with slug-based routing
- **Calculators**: AI-generated financial calculation tools
- **Chat Messages**: Customer support chatbot interactions

### API Endpoints
- **Contact Management**: Form submission and admin retrieval
- **Blog System**: Content delivery with individual post access
- **Calculator Tools**: Custom financial calculator management
- **Chat Integration**: Real-time customer support functionality

### Frontend Pages
- **Home**: Landing page with expanded service showcase and lead capture
- **Blog**: Content marketing hub with pagination
- **AI Tools**: Interactive financial calculators and AI builder
- **Partners**: Technology partnerships and affiliate solutions showcase
- **Individual Blog Posts**: SEO-optimized content pages

### AI-Powered Features
- **Calculator Builder**: Generates custom financial calculators from natural language prompts
- **Pre-built Calculators**: Tax, ROI, and cash flow analysis tools
- **Chatbot Integration**: Customer service automation
- **Technology Partnerships**: Curated affiliate links for financial, AI, and SaaS solutions

## Data Flow

### Client Interaction Flow
1. User visits landing page with service information
2. Interactive elements track user engagement via Google Analytics
3. Contact form captures leads with validation
4. Blog content provides value and improves SEO
5. AI tools demonstrate firm capabilities and capture usage data

### Data Processing Flow
1. Form submissions validated using Zod schemas
2. Data persisted through Drizzle ORM to PostgreSQL
3. Real-time updates via TanStack Query mutations
4. Session management for chat continuity
5. Analytics tracking for business intelligence

## External Dependencies

### Core Infrastructure
- **Database**: PostgreSQL via Neon serverless platform
- **Analytics**: Google Analytics 4 integration
- **Styling**: Tailwind CSS with PostCSS processing
- **Icons**: Lucide React and React Icons libraries

### Development Tools
- **TypeScript**: Full-stack type safety
- **ESLint/Prettier**: Code quality and formatting
- **Drizzle Kit**: Database migration management
- **Vite**: Development server and build optimization

### UI/UX Libraries
- **shadcn/ui**: Comprehensive component library
- **Radix UI**: Accessible primitive components
- **React Hook Form**: Form management with validation
- **Date-fns**: Date manipulation utilities

## Deployment Strategy

### Development Environment
- **Platform**: Replit with auto-deployment
- **Database**: Automatic PostgreSQL provisioning
- **Hot Reload**: Vite development server with HMR
- **Port Configuration**: Frontend (5000) with proxy setup

### Production Build
- **Frontend**: Static asset generation via Vite
- **Backend**: esbuild bundling for Node.js deployment
- **Environment**: Production-ready Express server
- **Asset Serving**: Static file serving with caching headers

### Configuration Management
- **Environment Variables**: Database URL and analytics keys
- **Build Scripts**: Separate development and production commands
- **Database Migrations**: Drizzle Kit for schema management

## Changelog

```
Changelog:
- June 18, 2025. Initial setup
- June 18, 2025. Fixed app startup issues (analytics integration, import paths, type mismatches)
- June 18, 2025. Expanded service offerings to include individuals and all industries
- June 18, 2025. Added compilation and financial statement preparation services
- June 18, 2025. Integrated secure file sharing and document management features
- June 18, 2025. Created Partners page with affiliate technology solutions
- June 18, 2025. Updated contact information with cell phone (301-640-8549)
- June 18, 2025. Configured for virtual office/remote service model
- June 18, 2025. Removed IRS Enrolled Agent credential references
- June 21, 2025. Integrated PostgreSQL database with comprehensive blog content
- June 21, 2025. Added Stripe payment processing for online service payments
- June 21, 2025. Created secure payment portal with predefined and custom service options
- June 21, 2025. Enhanced website with prominent "Pay Online" functionality throughout
- June 21, 2025. Completed personalized digital guidelines dashboard with user progress tracking
- June 21, 2025. Added comprehensive careers page with application tracking system
- June 21, 2025. Implemented career application management for HR team to track and manage candidates
- June 21, 2025. Transformed website into modern, conversion-optimized CPA & Advisory firm design
- June 21, 2025. Updated navigation with Advisory and Loan Help sections, enhanced CTAs
- June 21, 2025. Redesigned hero section with trust indicators and improved messaging
- June 21, 2025. Revamped services section with 8 comprehensive service offerings
- June 21, 2025. Added testimonials slider with client success stories
- June 21, 2025. Enhanced contact form and footer with modern design and improved conversion elements
- June 21, 2025. Created comprehensive AI Tools affiliate page with CPA-approved recommendations
- June 21, 2025. Added affiliate marketing infrastructure for AI tools and software recommendations
- June 21, 2025. Integrated AI Resources section into navigation and site architecture
- June 21, 2025. Built monetization-ready affiliate page with download lead magnets
- June 21, 2025. Enhanced AI Assistant with sophisticated conversation management, contextual responses, and OpenAI integration
- June 21, 2025. Added intelligent quick actions, conversation stage tracking, and dynamic typing indicators
- June 21, 2025. Implemented comprehensive CPA-specific knowledge base with detailed service information and tax guidance
- June 21, 2025. Removed Digital Guidelines package completely from website and navigation
- June 21, 2025. Updated professional credentials to correctly show ACCA qualification with Fellow status (FCCA)
- June 21, 2025. Added comprehensive ACCA Services section showcasing international financial expertise
- June 21, 2025. Updated website design to clean, modern aesthetic with improved color scheme and spacing
- June 21, 2025. Enhanced chat button visibility with larger size and white border for better user engagement
- June 21, 2025. Implemented advanced smart chat service with contextual conversation flow and booking capabilities
- June 21, 2025. Added intelligent response system that handles follow-up questions, pricing inquiries, and consultation booking
- June 21, 2025. Removed ACCA Services section from homepage for cleaner design focus
- June 21, 2025. Updated header branding to use primary color in navigation
- June 21, 2025. Removed business type field from consultation form to streamline user experience
- June 21, 2025. Eliminated $250/hour consultation pricing, focusing only on free consultation offering
- June 21, 2025. Integrated Calendly scheduling for all "Schedule Free Consultation" buttons across the site
- June 21, 2025. Updated footer branding from "ProBalance CPA & ACCA" to "ProBalance CPA" for simplified messaging
- January 18, 2025. Changed business name from ProBalance CPA to Lenox CPA throughout website and all branding
- January 11, 2025. Updated business name from Lenox CPA to Selam CPA throughout website and all branding
- January 11, 2025. Changed email address from info@probalancecpa.com to info@selamcpa.com across all pages and components
- January 11, 2025. Updated all team references from "ProBalance CPA Team" to "Selam CPA Team" in testimonials and content
- January 11, 2025. Created About Us page featuring founder Yacob Tewelde (licensed CPA with 20+ years experience, ACCA Fellow) and added to footer navigation
- June 21, 2025. Transformed website design to match taxchecklist.com aesthetic with cleaner, more minimal styling
- June 21, 2025. Updated color scheme to use softer, more professional grays and refined typography
- June 21, 2025. Simplified hero section with reduced padding, smaller buttons, and cleaner trust indicators
- June 21, 2025. Redesigned services section with smaller cards, subtle borders, and improved spacing
- June 21, 2025. Updated header navigation with border styling instead of shadow and refined button designs
- June 21, 2025. Modernized contact form and footer with cleaner layouts and improved visual hierarchy
- January 11, 2025. Installed and configured Helmet security middleware with CSP for Stripe, Calendly, and Google Analytics
- January 11, 2025. Implemented comprehensive SEO optimization with react-helmet across all pages
- January 11, 2025. Added dynamic meta titles, descriptions, and Open Graph tags for better search engine ranking
- January 11, 2025. Configured page-specific SEO for Home, Blog, AI Tools, Advisory, Bookkeeping, and Tax pages
- January 11, 2025. Implemented dynamic blog post SEO with article-specific meta data and social sharing optimization
- January 11, 2025. Added secure admin login system for SEO dashboard access with username/password authentication
- January 11, 2025. Created protected SEO management dashboard with session-based authentication and logout functionality
- January 11, 2025. Implemented comprehensive SEO data persistence with PostgreSQL database integration and real-time updates
- January 11, 2025. Implemented comprehensive website speed optimization including server compression, lazy loading, performance monitoring, caching strategies, and database query optimizations
- January 11, 2025. Added React performance enhancements with Suspense boundaries, Error boundaries, skeleton loading states, and performance monitoring hooks
- January 11, 2025. Optimized frontend with lazy loading of non-critical components, optimized images, critical CSS improvements, and Web Vitals tracking
- January 11, 2025. Removed X-Robots-Tag HTTP headers completely per user request, SEO handled via HTML meta tags only
- January 11, 2025. Fixed critical indexing issue: Updated sitemap.xml and robots.txt to use correct domain (was pointing to non-existent selamcpa.com)
- January 11, 2025. Set all meta robots directives to "index, follow" for maximum search visibility
- January 11, 2025. Removed character limits on meta titles and descriptions in SEO dashboard
- January 11, 2025. Prepared domain configuration for connecting custom domain selamcpa.com
- January 11, 2025. Confirmed user already owns selamcpa.com domain and needs Core plan upgrade for deployment and custom domain connection
- January 11, 2025. User can see deployments interface but gets permission error when trying to connect custom domain - confirms need for Core plan upgrade
- January 11, 2025. User already has Core plan but still cannot add custom domain - investigating deployment requirements
- January 11, 2025. User successfully deployed website using Autoscale deployment
- January 11, 2025. User connected selamcpa.com domain through deployment settings
- January 11, 2025. Domain currently in "verifying" status awaiting DNS propagation (5 minutes to 48 hours)
- January 11, 2025. Domain verification failed - investigating DNS configuration issues
- January 11, 2025. User reports permission issues adding domain despite having administrative access and Core plan
- January 11, 2025. User resolved domain connection issue and requesting verification of current status
- January 11, 2025. Domain verification successful: selamcpa.com responding with SSL but showing 404 error - deployment routing issue
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```