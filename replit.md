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
- **API Endpoints**: Contact, Blog, Calculator Tools, Chat.
- **Frontend Pages**: Home, Blog, AI Tools, Partners, Individual Blog Posts.
- **AI-Powered Features**: Calculator Builder (from natural language prompts), pre-built calculators (Tax, ROI, Cash Flow), Chatbot integration, curated technology partnerships.
- **UI/UX Decisions**: Clean, modern aesthetic with professional gray color scheme and refined typography, responsive design, enhanced navigation, trust indicators, and conversion-optimized forms.
- **Technical Implementations**: Form validation with Zod, data persistence via Drizzle, real-time updates with TanStack Query, session management for chat, analytics tracking.
- **Security & SEO**: Helmet security middleware with CSP, comprehensive SEO optimization with `react-helmet` (dynamic meta titles, descriptions, Open Graph tags), page-specific SEO, dynamic blog post SEO, secure admin login for SEO dashboard, canonical tags, Google Search Console verification.
- **Performance**: Server compression, lazy loading, performance monitoring, caching strategies, database query optimizations, React performance enhancements (Suspense, Error boundaries, skeleton loading).

## External Dependencies

- **Database**: PostgreSQL (via Neon serverless)
- **Analytics**: Google Analytics 4
- **Styling**: Tailwind CSS, PostCSS, Lucide React, React Icons
- **Development Tools**: TypeScript, ESLint/Prettier, Drizzle Kit, Vite
- **UI/UX Libraries**: shadcn/ui, Radix UI, React Hook Form, Date-fns
- **Payment Processing**: Stripe
- **Scheduling**: Calendly
- **AI Integration**: OpenAI (for AI Assistant)