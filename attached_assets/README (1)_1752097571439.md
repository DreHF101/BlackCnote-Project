# BlackCnote Investment Platform

A comprehensive AI-powered investment platform that combines cutting-edge web technologies with advanced financial management tools, delivering a seamless and intelligent user experience for modern investors.

![BlackCnote Logo](client/public/assets/img/hero-logo.png)

## 🚀 Features

### Core Investment Platform
- **AI-Powered Recommendations** - Personalized investment suggestions based on performance analysis
- **Dynamic APY Rates** - Performance-based rate adjustments with loyalty bonuses
- **Smart Investment Pools** - AI-powered allocation with risk management
- **Portfolio Analytics** - Real-time performance tracking with interactive charts
- **Investment Calculator** - Advanced ROI calculations with compound interest projections

### Security & Authentication
- **Two-Factor Authentication (2FA)** - TOTP authentication with QR code generation
- **Advanced Security Features** - Biometric authentication and fraud detection
- **Secure User Management** - JWT authentication with session management
- **Device Management** - Track and manage authorized devices

### Cross-Platform Compatibility
- **Progressive Web App (PWA)** - Native app-like experience with offline capabilities
- **Mobile Responsive** - Optimized for all screen sizes and devices
- **WordPress Integration** - Complete HYIPLab plugin compatibility
- **React Native Mobile App** - Native iOS and Android applications

### HYIPLab Integration
- **20+ Payment Gateways** - Comprehensive payment processing system
- **Multi-layer Referral System** - Commission tracking and affiliate management
- **Automated Payouts** - Scheduled interest calculations and distributions
- **Real-time Analytics** - Comprehensive reporting and dashboard

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for development and build tooling
- **Tailwind CSS** with shadcn/ui components
- **TanStack Query** for server state management
- **Wouter** for lightweight routing
- **Chart.js** for data visualization

### Backend
- **Express.js** REST API server
- **PostgreSQL** with Drizzle ORM
- **JWT Authentication** with Passport.js
- **WebSocket** for real-time updates
- **Node.js** runtime environment

### Database
- **PostgreSQL** primary database
- **Drizzle ORM** for type-safe operations
- **Database migrations** with schema evolution
- **Automated seeding** for development

### Security
- **bcryptjs** for password hashing
- **OTPLib** for 2FA implementation
- **CORS** configuration
- **Rate limiting** and security headers

## 📱 Platform Versions

### Web Application
- Modern React SPA with TypeScript
- Professional glassmorphism dark theme
- PWA capabilities with offline support
- Cross-browser compatibility

### WordPress Plugin
- Complete HYIPLab integration
- WordPress shortcode system
- REST API compatibility
- Theme customization support

### Mobile Applications
- React Native with Expo
- iOS and Android support
- Biometric authentication
- Push notifications

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/DreHF101/BlackCnote-Project.git
cd BlackCnote-Project

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
npm run db:push

# Start development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL=postgresql://username:password@localhost:5432/blackcnote
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLIC_KEY=pk_test_...
JWT_SECRET=your-jwt-secret-here
```

## 📈 Investment Plans

### Available Tiers
- **Starter Plan** - 8.5% APY, $100-$999 investment range
- **Pro Plan** - 12.3% APY, $1,000-$4,999 investment range  
- **VIP Plan** - 14.7% APY, $5,000-$19,999 investment range
- **Premium Plus** - 15.8% APY, $20,000-$49,999 investment range
- **Elite Growth** - 18.2% APY, $50,000+ investment range

### Investment Features
- Daily profit distributions
- Compound interest calculations
- Flexible withdrawal options
- Risk management tools
- Performance tracking

## 🔒 Security Features

### Two-Factor Authentication
- TOTP implementation with QR codes
- Backup code generation
- Device authorization management
- Security audit logging

### Advanced Protection
- Bank-grade encryption
- Fraud detection algorithms
- Real-time monitoring
- Secure API endpoints

## 🌐 API Documentation

### Core Endpoints
- `GET /api/users/profile` - User profile information
- `GET /api/investments` - Investment portfolio
- `POST /api/investments` - Create new investment
- `GET /api/ai/recommendations` - AI investment suggestions
- `POST /api/security/2fa/enable` - Enable 2FA

### HYIPLab Compatibility
- `GET /api/hyiplab/plans` - Investment plans
- `POST /api/hyiplab/deposit` - Process deposits
- `POST /api/hyiplab/withdraw` - Handle withdrawals
- `GET /api/hyiplab/transactions` - Transaction history

## 🎨 Design System

### Visual Identity
- **Colors**: Dark theme with gold accents (#f59e0b)
- **Typography**: Modern sans-serif fonts
- **Layout**: Glassmorphism effects with backdrop blur
- **Icons**: Lucide React icon library
- **Animations**: Smooth transitions and hover effects

### Components
- Reusable UI components with shadcn/ui
- Responsive grid system
- Interactive charts and graphs
- Professional forms and inputs
- Toast notification system

## 📊 Analytics & Reporting

### Portfolio Analytics
- Real-time performance tracking
- Interactive charts and graphs
- Profit/loss calculations
- Investment history
- Goal tracking and progress

### Platform Statistics
- Total investments managed
- Active investor count
- Geographic distribution
- Performance metrics
- Growth analytics

## 🌍 Global Reach

### Supported Regions
- 65+ countries worldwide
- Multi-language support
- Regional compliance
- Local payment methods
- Currency conversion

### Compliance
- Regulatory adherence
- KYC/AML procedures
- Risk disclosures
- Terms of service
- Privacy policy

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [User Guide](docs/user-guide.md)
- [API Documentation](docs/api.md)
- [Developer Guide](docs/development.md)
- [Deployment Guide](docs/deployment.md)

### Contact
- **Email**: support@blackcnote.com
- **Website**: https://blackcnote.com
- **GitHub**: https://github.com/DreHF101/BlackCnote-Project

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by leading fintech platforms
- Community-driven development
- Open source contributions welcomed

---

**BlackCnote Investment Platform** - Empowering investors with AI-driven insights and comprehensive portfolio management tools.