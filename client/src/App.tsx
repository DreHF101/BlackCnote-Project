import React from "react";
import { Switch, Route } from "wouter";

// Import working simple components first
import SimpleHome from "./pages/simple-home";
import EnhancedHome from "./pages/enhanced-home";
import SimpleDashboard from "./pages/simple-dashboard";
import SimpleInvestments from "./pages/simple-investments";
import SimpleCalculator from "./pages/simple-calculator";

// Import basic working pages
import About from "./pages/about";
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

// Import advanced features
import SimpleNews from "./pages/simple-news";
import Analytics from "./pages/analytics";
import SimpleAIAssistant from "./pages/simple-ai-assistant";

// Import payment completion pages
import Checkout from "./pages/checkout";
import PaymentSuccess from "./pages/payment-success";

// Header Component
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
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #dc2626 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)',
            border: '2px solid rgba(255, 255, 255, 0.1)'
          }}>
            <span style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>BC</span>
          </div>
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
        
        {/* Dropdown Menu for More Pages */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button style={{
            background: 'none',
            border: 'none',
            color: '#cbd5e1',
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '16px'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
            e.target.nextSibling.style.display = 'block';
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
            borderRadius: '8px',
            padding: '8px 0',
            minWidth: '160px',
            zIndex: 1000,
            boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
          }}
          onMouseLeave={(e) => e.target.style.display = 'none'}>
            <a href="/about" style={{ display: 'block', color: '#cbd5e1', textDecoration: 'none', padding: '8px 16px' }}
               onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
               onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>About</a>
            <a href="/contact" style={{ display: 'block', color: '#cbd5e1', textDecoration: 'none', padding: '8px 16px' }}
               onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
               onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>Contact</a>
            <a href="/news" style={{ display: 'block', color: '#cbd5e1', textDecoration: 'none', padding: '8px 16px' }}
               onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
               onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>News</a>
            <a href="/ai-assistant" style={{ display: 'block', color: '#cbd5e1', textDecoration: 'none', padding: '8px 16px' }}
               onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
               onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>AI Assistant</a>
            <a href="/help" style={{ display: 'block', color: '#cbd5e1', textDecoration: 'none', padding: '8px 16px' }}
               onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
               onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>❓ Help</a>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '8px 0' }}></div>
            <a href="/deposits" style={{ display: 'block', color: '#10b981', textDecoration: 'none', padding: '8px 16px' }}
               onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
               onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>💰 Deposits</a>
            <a href="/withdraw" style={{ display: 'block', color: '#f59e0b', textDecoration: 'none', padding: '8px 16px' }}
               onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
               onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>💸 Withdraw</a>
            <a href="/analytics" style={{ display: 'block', color: '#8b5cf6', textDecoration: 'none', padding: '8px 16px' }}
               onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
               onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>📊 Analytics</a>
            <a href="/referrals" style={{ display: 'block', color: '#3b82f6', textDecoration: 'none', padding: '8px 16px' }}
               onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
               onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>🎯 Referrals</a>
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
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>BC</span>
              </div>
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
      <Header />
      
      <Switch>
        {/* Core Working Pages */}
        <Route path="/" component={EnhancedHome} />
        <Route path="/dashboard" component={SimpleDashboard} />
        <Route path="/investments" component={SimpleInvestments} />
        <Route path="/calculator" component={SimpleCalculator} />
        
        {/* Basic Information Pages */}
        <Route path="/about" component={About} />
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
        <Route path="/security" component={Security} />
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