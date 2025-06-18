# ProBalance CPA - Full-Stack Web Application

## Overview

ProBalance CPA is a modern full-stack web application designed for a CPA firm serving small businesses. The application combines traditional accounting service offerings with innovative AI-powered financial tools, providing both client engagement and lead generation capabilities.

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
- **Home**: Landing page with service showcase and lead capture
- **Blog**: Content marketing hub with pagination
- **AI Tools**: Interactive financial calculators and AI builder
- **Individual Blog Posts**: SEO-optimized content pages

### AI-Powered Features
- **Calculator Builder**: Generates custom financial calculators from natural language prompts
- **Pre-built Calculators**: Tax, ROI, and cash flow analysis tools
- **Chatbot Integration**: Customer service automation

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
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```