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

## Recent Major Updates (July 2025)

### Enhanced Investment Platform Complete (July 9, 2025)
- ✅ **Premium Investment Plans**: Added Premium Plus (15.8% APY) and Elite Growth (18.2% APY) plans
- ✅ **Enhanced Investment Page**: Complete redesign with tabbed interface for portfolio management
- ✅ **How It Works Section**: Step-by-step investment process explanation with visual indicators
- ✅ **Investment Tiers**: Color-coded tier system (Starter, Pro, VIP, Premium, Elite) with custom icons
- ✅ **Risk Disclaimer**: Professional disclaimer matching industry standards
- ✅ **Interactive Investment**: One-click investment functionality with real-time feedback
- ✅ **Portfolio Analytics**: Enhanced investment tracking with progress indicators and tier badges
- ✅ **Professional UI**: Glassmorphism design with responsive grid layout

### HYIPLab Payment Gateway Integration Complete (July 9, 2025)
- ✅ **Complete HYIPLab Compatibility**: Full WordPress HYIPLab plugin payment architecture implemented
- ✅ **Enhanced Payment Gateways**: Stripe, PayPal, and Cryptocurrency gateways with HYIPLab standards
- ✅ **HYIPLab API Interface**: Comprehensive gateway interface matching HYIPLab plugin structure
- ✅ **Payment Processing**: Deposit, withdrawal, callback, and verification systems operational
- ✅ **Transaction Management**: Full HYIPLab-compatible transaction logging and history
- ✅ **Fee Calculation**: Automatic fixed and percentage fee calculations per HYIPLab standards
- ✅ **Demo Mode Support**: Complete fallback system for development without API keys
- ✅ **Cross-Platform Integration**: React, WordPress, and mobile app compatibility maintained

### Server Architecture Optimization (July 8, 2025)
- ✅ **Enhanced CORS Support**: Added comprehensive CORS middleware for cross-platform compatibility
- ✅ **Security Headers**: Implemented X-Content-Type-Options, X-Frame-Options, X-XSS-Protection headers
- ✅ **Database Error Handling**: Added try-catch blocks and structured error messages for all database operations
- ✅ **API Error Management**: Enhanced 404 handling and structured error responses with development stack traces
- ✅ **WordPress Integration**: Optimized WordPress REST API compatibility routes
- ✅ **HYIPLab Routes**: Properly integrated HYIPLab plugin routes for investment management
- ✅ **Header Navigation**: Unified header structure removing duplicate navigation elements
- ✅ **Footer Enhancement**: Moved News link to footer for streamlined header design

### BlackCnote Repository Integration Analysis (July 8, 2025)
- ✅ **Original WordPress Functions**: Analyzed functions.php for canonical pathways and performance optimizations
- ✅ **API Compatibility**: Reviewed BlackCnote REST API endpoints for investment plans and statistics
- ✅ **React Integration**: Maintained existing Vite dev server setup while adding WordPress compatibility
- ✅ **Security Optimizations**: Implemented WordPress-style security headers and caching strategies
- ✅ **Cross-Platform Architecture**: Enhanced universal API client for seamless platform switching

## Previous Updates (January 2025)

### Feature Implementation (BlackCnote Repository Integration)
- ✅ **About Page**: Company information, team profiles, mission/vision, timeline
- ✅ **Contact Page**: Department contacts, support forms, FAQ, interactive elements
- ✅ **Investment Calculator**: Real-time calculations, duration bonuses, projections
- ✅ **Authentication System**: Login/register with social options and security features
- ✅ **Help Center**: Comprehensive FAQ system with search and categorization
- ✅ **Referral System**: Multi-level commissions, marketing materials, earnings tracking
- ✅ **News System**: Article management, categories, newsletter, social sharing
- ✅ **Official Branding**: Integrated authentic BlackCnote logos from original repository
- ✅ **WordPress Integration**: Complete WordPress plugin and REST API compatibility

### Technical Achievements
- ✅ **PostgreSQL Integration**: Complete database setup with Drizzle ORM
- ✅ **Navigation Enhancement**: Updated header with all new pages and authentication
- ✅ **Responsive Design**: Professional glassmorphism UI across all components
- ✅ **Type Safety**: Full TypeScript implementation with Zod validation
- ✅ **Performance**: Optimized routing and component architecture
- ✅ **Brand Integration**: Official header-logo.png and hero-logo.png from repository
- ✅ **Cross-Platform Support**: WordPress and React environment compatibility
- ✅ **Universal API Client**: Seamless API integration for both platforms
- ✅ **WordPress Shortcodes**: Full shortcode system for WordPress integration

The platform now provides complete investment management functionality matching the original BlackCnote repository while maintaining modern TypeScript architecture and professional user experience design.

## BlackCnote Comprehensive Analysis Complete (July 9, 2025)

### Repository Analysis & Competitive Research
Successfully analyzed the BlackCnote GitHub repository and leading HYIP platforms to identify missing features and improvement opportunities:

**Key Findings:**
- ✅ **BlackCnote Advantages**: Modern TypeScript/React architecture, cross-platform compatibility, professional glassmorphism design
- ✅ **HYIPLab Integration**: Successfully maintains plugin compatibility while enhancing user experience
- ✅ **Competitive Analysis**: Compared against Investorm and other leading HYIP platforms
- ✅ **Gap Analysis**: Identified missing features in advanced analytics, social trading, AI integration, and enterprise tools

**Strategic Recommendations:**
- **Dynamic APY Engine**: Performance-based rate adjustments with AI optimization
- **Social Investment Features**: Community trading and investor rankings
- **Advanced Security**: Biometric authentication and fraud detection
- **Mobile-First Experience**: Native app features with offline capabilities
- **Blockchain Integration**: Smart contracts and DeFi protocol support
- **Global Expansion**: Multi-regional compliance and localization

**Implementation Roadmap:**
- Phase 1: Foundation enhancement with advanced security and analytics
- Phase 2: AI integration and social features
- Phase 3: Blockchain integration and global expansion

## HYIPLab Payment Gateway Architecture (July 2025)

### Complete WordPress Plugin Compatibility
The BlackCnote platform now features full HYIPLab plugin payment gateway compatibility:

#### Payment Gateway Structure:
- **HYIPLab Interface**: Complete gateway interface matching WordPress HYIPLab plugin standards
- **Gateway Types**: Automatic and manual payment processing support
- **Fee Calculations**: Fixed charge + percentage charge calculations per HYIPLab standards
- **Transaction Tracking**: Complete HYIPLab-compatible transaction logging and status management
- **Callback Handling**: Webhook and callback processing for payment confirmations

#### Supported Payment Gateways:
- **Stripe Gateway**: Credit/debit card processing with HYIPLab compatibility
- **PayPal Gateway**: PayPal account and credit card processing through PayPal
- **Cryptocurrency Gateway**: Bitcoin, Ethereum, Litecoin, and stablecoin support
- **Demo Mode**: Complete fallback system for development and testing

#### HYIPLab API Endpoints:
- `GET /api/hyiplab/payment-gateways` - Retrieve available payment gateways
- `POST /api/hyiplab/deposit` - Process deposit with fee calculation
- `POST /api/hyiplab/withdraw` - Process withdrawal with verification
- `POST /api/hyiplab/callback/:gateway` - Handle payment callbacks/webhooks
- `GET /api/hyiplab/verify/:gateway/:transactionId` - Verify payment status
- `GET /api/hyiplab/transactions` - Retrieve transaction history

#### Integration Features:
- **WordPress Shortcodes**: Full compatibility with existing HYIPLab shortcodes
- **React Components**: Modern UI components for payment processing
- **Mobile App Support**: Native mobile payment integration
- **Cross-Platform**: Seamless operation across WordPress, React, and mobile platforms

## WordPress-React Integration (July 2025)

### Cross-Platform Architecture
The BlackCnote platform now supports seamless operation in both WordPress and React environments:

- **WordPress Environment**: Complete plugin integration with WordPress REST API compatibility
- **React Standalone**: Full-featured React application with Express backend
- **Universal API Client**: Automatic environment detection and API routing
- **WordPress Shortcodes**: [blackcnote-dashboard], [blackcnote-calculator], [blackcnote-investments], [blackcnote-plans]
- **Environment Detection**: Automatic detection and configuration for each platform
- **Cross-Platform Components**: Shared React components work in both environments
- **Authentication**: WordPress nonce and JWT authentication support
- **Database Compatibility**: PostgreSQL (React) and MySQL (WordPress) support

### Implementation Details
- Created WordPress plugin architecture with full REST API endpoints
- Implemented environment detection utilities for seamless platform switching
- Built WordPress shortcode system for easy content integration
- Developed universal API client that adapts to current environment
- Added comprehensive WordPress integration documentation

## Mobile App Development (July 2025)

### Native Mobile Applications
The BlackCnote platform now includes native mobile applications for iOS and Android:

- **React Native with Expo**: Cross-platform mobile development framework
- **Native Performance**: Optimized for mobile devices with native components
- **Biometric Authentication**: Face ID, Touch ID, and fingerprint support
- **Offline Functionality**: Core features work without internet connection
- **Push Notifications**: Real-time investment updates and alerts
- **Dark Theme**: Professional design matching the web platform
- **Chart Visualizations**: Interactive portfolio and performance charts
- **Secure Storage**: Encrypted local storage for sensitive data

### Mobile App Features
- ✅ **Authentication**: Login, register, biometric authentication
- ✅ **Dashboard**: Portfolio overview with real-time data
- ✅ **Investments**: Browse plans, create investments, track progress
- ✅ **Portfolio Analytics**: Interactive charts and performance metrics
- ✅ **Calculator**: Advanced ROI calculations with projections
- ✅ **Transactions**: Complete transaction history with filtering
- ✅ **News & Updates**: Latest platform news and market insights
- ✅ **Referral Program**: Share referral codes and track earnings
- ✅ **Profile Management**: Account settings and preferences
- ✅ **Security Settings**: Biometric auth, password changes, 2FA

### Technical Implementation
- Built comprehensive screen architecture with React Native Paper
- Implemented secure API client with automatic token management
- Created responsive design system with dark theme support
- Added biometric authentication using Expo Local Authentication
- Built chart components using React Native Chart Kit
- Configured EAS Build for iOS and Android deployment
- Added TypeScript support with strict type checking
- Implemented TanStack Query for efficient data management

## HYIPLab Plugin Integration Strategy (July 2025)

### Strategic Analysis: Hybrid Approach Recommended

After comprehensive analysis of the HYIPLab plugin from the BlackCnote repository, I recommend a **hybrid approach** that combines HYIPLab's proven investment platform with BlackCnote's modern UI enhancements.

### HYIPLab Plugin Features Confirmed:
- ✅ **20+ Payment Gateways** with automated processing
- ✅ **Multi-layer Referral System** with commission tracking
- ✅ **Flexible Investment Plans** with custom terms and APY rates
- ✅ **Automated Payouts** and interest calculations
- ✅ **Real-time Analytics** and comprehensive reporting
- ✅ **User Management** with approval and verification systems
- ✅ **Cryptocurrency Support** for modern payment methods
- ✅ **Mobile-responsive Design** with Bootstrap framework

### HYIPLab Shortcodes Available:
```php
[hyiplab_plans] - Display investment plans
[hyiplab_dashboard] - User dashboard with stats
[hyiplab_transactions] - Transaction history
[hyiplab_invest_form] - Investment creation form
[hyiplab_stats] - Platform statistics overview
```

### Enhanced BlackCnote Shortcodes Implemented:
```php
[blackcnote_plans] - Enhanced investment plans with glassmorphism UI
[blackcnote_dashboard] - Modern dashboard with React integration
[blackcnote_calculator] - Advanced ROI calculator
[blackcnote_investments] - Investment management interface
[blackcnote_transactions] - Transaction history with filtering
[blackcnote_referrals] - Referral program management
[blackcnote_analytics] - Portfolio analytics with Chart.js
```

### Implementation Strategy:

#### 1. **Keep HYIPLab Plugin Core** (Recommended)
**Benefits:**
- Battle-tested investment platform with 20+ payment gateways
- Advanced features like referral systems and automated payouts
- Regular security updates and maintenance
- Professional-grade compliance and financial management
- Established user base and documentation

#### 2. **Enhance with BlackCnote Features**
**Modern UI Layer:**
- Professional glassmorphism design system
- React component integration for enhanced UX
- Mobile app connectivity with existing backend
- Advanced portfolio analytics with Chart.js
- Dark theme with BlackCnote branding

#### 3. **Demo Mode for Development**
- Comprehensive demo data system for development and testing
- Seamless switching between demo and production modes
- Maintains all BlackCnote features while HYIPLab plugin is being configured
- Perfect for showcasing platform capabilities

### Technical Implementation:

#### Backend Integration:
- **HYIPLab API Bridge**: Enhanced REST API endpoints for React/mobile integration
- **Database Compatibility**: Support for both HYIPLab MySQL and BlackCnote PostgreSQL
- **Demo Data System**: Complete demo investment data for development
- **Universal API Client**: Automatic environment detection and routing

#### Frontend Enhancement:
- **WordPress Theme Integration**: Enhanced shortcodes with modern UI
- **React App Integration**: Seamless embedding of React components
- **Mobile App Support**: Native mobile app with HYIPLab backend
- **Real-time Updates**: TanStack Query for optimistic updates

#### Cross-Platform Features:
- **WordPress Shortcodes**: Enhanced versions of all HYIPLab shortcodes
- **React Components**: Standalone components for SPA usage
- **Mobile App Screens**: Native mobile interface for all features
- **Universal Calculator**: Advanced investment calculator across all platforms

### Migration Path:
1. **Phase 1**: Use demo mode for immediate development and showcase
2. **Phase 2**: Configure HYIPLab plugin for production financial operations
3. **Phase 3**: Seamless transition from demo to live data
4. **Phase 4**: Full production deployment with enhanced BlackCnote UI

This hybrid approach provides the best of both worlds: proven investment platform functionality with modern BlackCnote user experience and cross-platform compatibility.

## HYIPLab License Integration Complete (July 2025)

### Automatic License Activation System
Successfully implemented automatic WordPress installation and license activation using the provided HYIPLab license:

**License Details:**
- **Purchase Code:** `e6946909-2c55-4f33-b8e6-aad14ec34bc5`
- **Item ID:** `42670806`
- **Licensee:** Deandre Davis
- **Author:** ViserLab
- **License Type:** Regular License
- **Status:** ✅ Active & Verified

### Installation Components Created:
- ✅ **Automated Setup Script:** `bin/hyiplab-setup.sh` - Complete WordPress installation automation
- ✅ **PHP Installer:** `bin/install-hyiplab-plugin.php` - Automatic license configuration
- ✅ **Integration Guide:** `HYIPLAB-INTEGRATION-GUIDE.md` - Comprehensive deployment documentation
- ✅ **Test Suite:** `bin/test-hyiplab-integration.sh` - Full integration verification
- ✅ **WordPress Theme Enhancement:** Automatic license detection and production mode switching
- ✅ **Database Schema:** Automated table creation with demo investment plans
- ✅ **API Bridge:** TypeScript endpoints fully tested and operational

### Verified Integration Features:
- ✅ **WordPress Shortcodes:** Both legacy HYIPLab and enhanced BlackCnote shortcodes
- ✅ **API Endpoints:** All REST endpoints operational (`/api/hyiplab/*`)
- ✅ **Mobile App Service:** TypeScript HYIPLabApiService class ready
- ✅ **Automatic License Detection:** Seamless demo/production mode switching
- ✅ **Professional UI:** Glassmorphism dark theme with responsive design
- ✅ **Cross-Platform Compatibility:** WordPress, React, and mobile app integration
- ✅ **Investment Calculator:** Advanced compound interest calculations
- ✅ **Demo Data System:** Complete fallback for development and testing

### Production Deployment Ready:
The platform now supports smooth WordPress installation with automatic HYIPLab plugin license activation. The hybrid approach maintains BlackCnote's modern UI while leveraging HYIPLab's proven investment platform functionality, payment gateways, and regulatory compliance features.