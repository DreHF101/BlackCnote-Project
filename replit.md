# Investment Platform - replit.md

## Overview

This is a modern investment platform application built with a full-stack TypeScript architecture. The application provides users with investment tracking, portfolio management, and transaction history functionality. It features a dark-themed, professional interface designed for financial data visualization and user interaction.

## User Preferences

```
Preferred communication style: Simple, everyday language.
```

## System Architecture

The application follows a monorepo structure with clear separation of concerns:

- **Frontend**: React-based SPA with TypeScript, using Vite for development and build tooling
- **Backend**: Express.js REST API server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, accessible UI components
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing

## Key Components

### Frontend Architecture
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Custom CSS variables for theming with dark mode support
- **Charts**: Chart.js integration for portfolio visualization
- **Forms**: React Hook Form with Zod validation
- **Toast Notifications**: Built-in toast system for user feedback

### Backend Architecture
- **API Layer**: RESTful endpoints organized in routes module
- **Data Layer**: PostgreSQL database with Drizzle ORM and DatabaseStorage implementation
- **Middleware**: Express middleware for request logging and error handling
- **Development**: Hot reload with Vite integration
- **Database**: Automated seeding with sample data for development

### Database Schema
The application uses a comprehensive financial data model:
- **Users**: User accounts with balance and investment tracking
- **Investment Plans**: Predefined investment products with APY rates and duration
- **Investments**: User's active investments linked to plans
- **Transactions**: Financial transaction history
- **Portfolio History**: Time-series data for portfolio performance tracking

## Data Flow

1. **User Interactions**: React components trigger API calls through TanStack Query
2. **API Processing**: Express routes handle requests, validate data with Zod schemas
3. **Data Operations**: Storage layer abstracts database operations (currently in-memory)
4. **Response Handling**: JSON responses with proper error handling and logging
5. **UI Updates**: TanStack Query manages cache invalidation and UI state updates

## External Dependencies

### UI & Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Chart.js**: Data visualization

### Data & State Management
- **TanStack Query**: Server state management
- **React Hook Form**: Form handling
- **Zod**: Runtime type validation
- **Drizzle ORM**: Type-safe database toolkit

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the stack
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite middleware integrated with Express server
- **Type Checking**: TypeScript compilation without emit for fast feedback
- **Asset Serving**: Vite handles static assets and HMR in development

### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: ESBuild bundles Express server to `dist/index.js`
- **Database**: Drizzle migrations support schema evolution
- **Environment**: Expects `DATABASE_URL` for PostgreSQL connection

### Key Features
- **Complete Platform**: Full BlackCnote HYIP investment platform with all major features
- **About & Company Info**: Professional company presentation with team, mission, and history
- **Contact & Support**: Multi-department contact system with comprehensive FAQ and help center
- **Investment Calculator**: Advanced ROI calculator with duration bonuses and projections
- **User Authentication**: Complete login/register system with social authentication options
- **Referral Program**: Multi-level commission system with marketing materials and tracking
- **News & Blog**: Categorized news system with newsletter subscription and social integration
- **Investment Management**: Create and track investments with different plans and real-time updates
- **Portfolio Analytics**: Visual representation of investment performance with interactive charts
- **Transaction History**: Complete audit trail of financial activities with filtering
- **Responsive Design**: Mobile-first approach with glassmorphism and dark theme design
- **Real-time Updates**: TanStack Query provides optimistic updates and cache management

## Recent Major Updates (January 2025)

### Feature Implementation (BlackCnote Repository Integration)
- ✅ **About Page**: Company information, team profiles, mission/vision, timeline
- ✅ **Contact Page**: Department contacts, support forms, FAQ, interactive elements
- ✅ **Investment Calculator**: Real-time calculations, duration bonuses, projections
- ✅ **Authentication System**: Login/register with social options and security features
- ✅ **Help Center**: Comprehensive FAQ system with search and categorization
- ✅ **Referral System**: Multi-level commissions, marketing materials, earnings tracking
- ✅ **News System**: Article management, categories, newsletter, social sharing

### Technical Achievements
- ✅ **PostgreSQL Integration**: Complete database setup with Drizzle ORM
- ✅ **Navigation Enhancement**: Updated header with all new pages and authentication
- ✅ **Responsive Design**: Professional glassmorphism UI across all components
- ✅ **Type Safety**: Full TypeScript implementation with Zod validation
- ✅ **Performance**: Optimized routing and component architecture

The platform now provides complete investment management functionality matching the original BlackCnote repository while maintaining modern TypeScript architecture and professional user experience design.