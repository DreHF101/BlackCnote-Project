import React from "react";
import { Switch, Route } from "wouter";

// Import working simple components first
import SimpleHome from "./pages/simple-home";
import EnhancedHome from "./pages/enhanced-home";
import ComprehensiveHome from "./pages/comprehensive-home";
import UltimateHome from "./pages/ultimate-home";
import SimpleDashboard from "./pages/simple-dashboard";
import SimpleInvestments from "./pages/simple-investments";
import SimpleCalculator from "./pages/simple-calculator";

// Import basic working pages
import About from "./pages/about";
import EnhancedAbout from "./pages/enhanced-about";
import SimpleContact from "./pages/simple-contact";
import SimpleLogin from "./pages/simple-login";
import SimpleRegister from "./pages/simple-register";
import NotFound from "./pages/not-found";

// Import additional stable pages
import Help from "./pages/help";
import SimpleHelp from "./pages/simple-help";
import Profile from "./pages/profile";
import Transactions from "./pages/transactions";

// Import payment and other pages
import SimpleDeposits from "./pages/simple-deposits";
import SimpleWithdraw from "./pages/simple-withdraw";
import Security from "./pages/security";
import Referrals from "./pages/referrals";
import SimpleReferrals from "./pages/simple-referrals";
import SimpleSecurityPage from "./pages/simple-security";

// Import advanced features
import SimpleNews from "./pages/simple-news";
import Analytics from "./pages/analytics";
import SimpleAIAssistant from "./pages/simple-ai-assistant";

// Import payment completion pages
import Checkout from "./pages/checkout";
import PaymentSuccess from "./pages/payment-success";

// Header Component
import { EnhancedHeader } from "./components/enhanced-header";
function Header() {
  return (
    <div style={{
      height: '64px',
      backgroundColor: '#0f172a',
      borderBottom: '1px solid #334155',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img 
            src="/assets/img/hero-logo.png" 
            alt="BlackCnote Investment Platform" 
            style={{
              height: '48px',
              width: 'auto',
              filter: 'drop-shadow(0 8px 25px rgba(245, 158, 11, 0.3))'
            }}
          />
          <div>
            <div style={{
              fontSize: '26px',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: '1',
              marginBottom: '2px'
            }}>
              BlackCnote
            </div>
            <div style={{
              fontSize: '12px',
              color: '#94a3b8',
              fontWeight: '500',
              letterSpacing: '0.5px'
            }}>
              Investment Platform
            </div>
          </div>
        </a>
      </div>
      
      <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <a href="/about" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'background-color 0.2s' }} 
           onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
           onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>About</a>
        <a href="/dashboard" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'background-color 0.2s' }}
           onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
           onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>Dashboard</a>
        <a href="/investments" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'background-color 0.2s' }}
           onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
           onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>Investments</a>
        <a href="/calculator" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'background-color 0.2s' }}
           onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
           onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>Calculator</a>
        
        {/* Enhanced Dropdown Menu for More Pages */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button style={{
            background: 'none',
            border: 'none',
            color: '#cbd5e1',
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
            e.target.style.color = '#f59e0b';
            e.target.nextSibling.style.display = 'block';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#cbd5e1';
          }}>
            More ▼
          </button>
          <div style={{
            display: 'none',
            position: 'absolute',
            top: '100%',
            left: '0',
            backgroundColor: '#1e293b',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '12px',
            padding: '12px 0',
            minWidth: '220px',
            zIndex: 1000,
            boxShadow: '0 12px 35px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(10px)'
          }}
          onMouseLeave={(e) => e.target.style.display = 'none'}>
            {/* Information Section */}
            <div style={{ padding: '8px 16px', color: '#94a3b8', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Information
            </div>
            <a href="/about" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1', textDecoration: 'none', padding: '10px 16px', transition: 'all 0.2s ease' }}
               onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.target.style.color = '#f59e0b'; }}
               onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#cbd5e1'; }}>
              <span>ℹ️</span> About Us
            </a>
            <a href="/contact" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1', textDecoration: 'none', padding: '10px 16px', transition: 'all 0.2s ease' }}
               onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.target.style.color = '#f59e0b'; }}
               onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#cbd5e1'; }}>
              <span>📞</span> Contact
            </a>
            <a href="/news" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1', textDecoration: 'none', padding: '10px 16px', transition: 'all 0.2s ease' }}
               onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.target.style.color = '#f59e0b'; }}
               onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#cbd5e1'; }}>
              <span>📰</span> News & Updates
            </a>
            <a href="/help" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1', textDecoration: 'none', padding: '10px 16px', transition: 'all 0.2s ease' }}
               onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.target.style.color = '#f59e0b'; }}
               onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#cbd5e1'; }}>
              <span>❓</span> Help Center
            </a>
            
            {/* Divider */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '12px 0' }}></div>
            
            {/* Tools Section */}
            <div style={{ padding: '8px 16px', color: '#94a3b8', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Advanced Tools
            </div>
            <a href="/ai-assistant" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#8b5cf6', textDecoration: 'none', padding: '10px 16px', transition: 'all 0.2s ease' }}
               onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.1)'; e.target.style.color = '#a855f7'; }}
               onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#8b5cf6'; }}>
              <span>🤖</span> AI Assistant
            </a>
            <a href="/analytics" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#8b5cf6', textDecoration: 'none', padding: '10px 16px', transition: 'all 0.2s ease' }}
               onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.1)'; e.target.style.color = '#a855f7'; }}
               onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#8b5cf6'; }}>
              <span>📊</span> Analytics
            </a>
            <a href="/referrals" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#3b82f6', textDecoration: 'none', padding: '10px 16px', transition: 'all 0.2s ease' }}
               onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'; e.target.style.color = '#60a5fa'; }}
               onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#3b82f6'; }}>
              <span>🎯</span> Referrals
            </a>
            
            {/* Divider */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '12px 0' }}></div>
            
            {/* Financial Section */}
            <div style={{ padding: '8px 16px', color: '#94a3b8', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Financial
            </div>
            <a href="/deposits" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', textDecoration: 'none', padding: '10px 16px', transition: 'all 0.2s ease' }}
               onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.1)'; e.target.style.color = '#34d399'; }}
               onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#10b981'; }}>
              <span>💰</span> Deposits
            </a>
            <a href="/withdraw" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f59e0b', textDecoration: 'none', padding: '10px 16px', transition: 'all 0.2s ease' }}
               onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(245, 158, 11, 0.1)'; e.target.style.color = '#fbbf24'; }}
               onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#f59e0b'; }}>
              <span>💸</span> Withdraw
            </a>
            <a href="/security" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444', textDecoration: 'none', padding: '10px 16px', transition: 'all 0.2s ease' }}
               onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'; e.target.style.color = '#f87171'; }}
               onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#ef4444'; }}>
              <span>🔒</span> Security
            </a>
          </div>
        </div>
        
        <a href="/login" style={{ 
          color: 'white', 
          textDecoration: 'none', 
          padding: '8px 16px',
          background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
          borderRadius: '6px',
          fontWeight: '500',
          marginLeft: '10px'
        }}>Login</a>
        <a href="/register" style={{ 
          color: 'white', 
          textDecoration: 'none', 
          padding: '8px 16px',
          background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
          borderRadius: '6px',
          fontWeight: '500'
        }}>Register</a>
      </nav>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0f172a',
      borderTop: '1px solid #334155',
      padding: '40px 20px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '30px'
        }}>
          {/* Company Info */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <img 
                src="/assets/img/hero-logo.png" 
                alt="BlackCnote Investment Platform" 
                style={{
                  height: '32px',
                  width: 'auto'
                }}
              />
              <span style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#f59e0b'
              }}>
                BlackCnote
              </span>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: '0 0 16px' }}>
              The leading investment platform providing secure, high-yield opportunities 
              with cutting-edge AI technology and professional portfolio management.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#" style={{
                width: '32px',
                height: '32px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                textDecoration: 'none'
              }}>📧</a>
              <a href="#" style={{
                width: '32px',
                height: '32px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                textDecoration: 'none'
              }}>📱</a>
              <a href="#" style={{
                width: '32px',
                height: '32px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                textDecoration: 'none'
              }}>🐦</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="/about" style={{ color: '#94a3b8', textDecoration: 'none' }}>About Us</a>
              <a href="/investments" style={{ color: '#94a3b8', textDecoration: 'none' }}>Investment Plans</a>
              <a href="/calculator" style={{ color: '#94a3b8', textDecoration: 'none' }}>ROI Calculator</a>
              <a href="/news" style={{ color: '#94a3b8', textDecoration: 'none' }}>News & Updates</a>
              <a href="/help" style={{ color: '#94a3b8', textDecoration: 'none' }}>Help Center</a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
              Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="/ai-assistant" style={{ color: '#94a3b8', textDecoration: 'none' }}>AI Investment Assistant</a>
              <a href="/analytics" style={{ color: '#94a3b8', textDecoration: 'none' }}>Portfolio Analytics</a>
              <a href="/referrals" style={{ color: '#94a3b8', textDecoration: 'none' }}>Referral Program</a>
              <a href="/security" style={{ color: '#94a3b8', textDecoration: 'none' }}>Security Center</a>
              <a href="/contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>24/7 Support</a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
              Contact Info
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📧</span>
                <span>support@blackcnote.com</span>
              </div>
              <div style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📞</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>⏰</span>
                <span>24/7 Customer Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #334155',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>
            © 2025 BlackCnote Investment Platform. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Terms of Service</a>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Risk Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// App Router Component
function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <EnhancedHeader 
        isAuthenticated={false}
        user={{ name: "John Investor", email: "john@example.com" }}
        onLogout={() => console.log("Logout clicked")}
      />
      
      <Switch>
        {/* Core Working Pages */}
        <Route path="/" component={UltimateHome} />
        <Route path="/simple-home" component={SimpleHome} />
        <Route path="/enhanced-home" component={EnhancedHome} />
        <Route path="/comprehensive-home" component={ComprehensiveHome} />
        <Route path="/dashboard" component={SimpleDashboard} />
        <Route path="/investments" component={SimpleInvestments} />
        <Route path="/calculator" component={SimpleCalculator} />
        
        {/* Basic Information Pages */}
        <Route path="/about" component={EnhancedAbout} />
        <Route path="/contact" component={SimpleContact} />
        
        {/* Authentication Pages */}
        <Route path="/login" component={SimpleLogin} />
        <Route path="/register" component={SimpleRegister} />
        
        {/* Additional Stable Pages */}
        <Route path="/help" component={SimpleHelp} />
        <Route path="/profile" component={Profile} />
        <Route path="/transactions" component={Transactions} />
        
        {/* Financial Pages */}
        <Route path="/deposits" component={SimpleDeposits} />
        <Route path="/withdraw" component={SimpleWithdraw} />
        <Route path="/security" component={SimpleSecurityPage} />
        <Route path="/referrals" component={SimpleReferrals} />
        
        {/* Advanced Features */}
        <Route path="/news" component={SimpleNews} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/ai-assistant" component={SimpleAIAssistant} />
        
        {/* Payment Completion Pages */}
        <Route path="/checkout" component={Checkout} />
        <Route path="/payment-success" component={PaymentSuccess} />
        
        {/* 404 Page */}
        <Route component={NotFound} />
      </Switch>
      
      <Footer />
    </div>
  );
}

export default App;