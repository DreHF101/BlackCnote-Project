import React from "react";
import { Switch, Route } from "wouter";

// Import working simple components first
import SimpleHome from "./pages/simple-home";
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
import Profile from "./pages/profile";
import Transactions from "./pages/transactions";

// Import payment and other pages
import SimpleDeposits from "./pages/simple-deposits";
import SimpleWithdraw from "./pages/simple-withdraw";
import Security from "./pages/security";
import Referrals from "./pages/referrals";

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
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>BC</span>
          </div>
          <span style={{
            fontSize: '24px',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            BlackCnote
          </span>
        </a>
      </div>
      
      <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <a href="/" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'background-color 0.2s' }} 
           onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
           onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>Home</a>
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
               onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>Help</a>
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
    <div style={{
      height: '64px',
      backgroundColor: '#0f172a',
      borderTop: '1px solid #334155',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <p style={{ color: '#94a3b8', margin: 0 }}>
        © 2025 BlackCnote Investment Platform. All rights reserved.
      </p>
    </div>
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
        <Route path="/" component={SimpleHome} />
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
        <Route path="/help" component={Help} />
        <Route path="/profile" component={Profile} />
        <Route path="/transactions" component={Transactions} />
        
        {/* Financial Pages */}
        <Route path="/deposits" component={SimpleDeposits} />
        <Route path="/withdraw" component={SimpleWithdraw} />
        <Route path="/security" component={Security} />
        <Route path="/referrals" component={Referrals} />
        
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