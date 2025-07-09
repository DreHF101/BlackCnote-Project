import React from "react";
import { Switch, Route } from "wouter";

// Import existing page components
import About from "./pages/about";
import AIAssistant from "./pages/ai-assistant";
import Analytics from "./pages/analytics";
import Calculator from "./pages/calculator";
import Checkout from "./pages/checkout";
import Contact from "./pages/contact";
import Dashboard from "./pages/dashboard";
import Deposits from "./pages/deposits";
import Help from "./pages/help";
import Home from "./pages/home";
import Investments from "./pages/investments";
import Login from "./pages/login";
import News from "./pages/news";
import NotFound from "./pages/not-found";
import PaymentSuccess from "./pages/payment-success";
import Profile from "./pages/profile";
import Referrals from "./pages/referrals";
import Register from "./pages/register";
import Security from "./pages/security";
import TestHome from "./pages/test-home";
import Transactions from "./pages/transactions";
import Withdraw from "./pages/withdraw";

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
      
      <nav style={{ display: 'flex', gap: '24px' }}>
        <a href="/" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Home</a>
        <a href="/dashboard" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Dashboard</a>
        <a href="/investments" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Investments</a>
        <a href="/calculator" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Calculator</a>
        <a href="/about" style={{ color: '#cbd5e1', textDecoration: 'none' }}>About</a>
        <a href="/contact" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Contact</a>
        <a href="/news" style={{ color: '#cbd5e1', textDecoration: 'none' }}>News</a>
        <a href="/analytics" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Analytics</a>
        <a href="/ai-assistant" style={{ color: '#cbd5e1', textDecoration: 'none' }}>AI Assistant</a>
        <a href="/deposits" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Deposits</a>
        <a href="/withdraw" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Withdraw</a>
      </nav>
      
      <div style={{ display: 'flex', gap: '12px' }}>
        <a href="/login" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '8px 16px' }}>Login</a>
        <a
          href="/register"
          style={{
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            padding: '8px 16px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'white',
            fontWeight: '500'
          }}
        >
          Sign Up
        </a>
      </div>
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
        {/* Main Pages */}
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/help" component={Help} />
        <Route path="/news" component={News} />
        
        {/* Authentication Pages */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        
        {/* Investment Pages */}
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/investments" component={Investments} />
        <Route path="/calculator" component={Calculator} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/ai-assistant" component={AIAssistant} />
        
        {/* Transaction Pages */}
        <Route path="/deposits" component={Deposits} />
        <Route path="/withdraw" component={Withdraw} />
        <Route path="/transactions" component={Transactions} />
        
        {/* Payment Pages */}
        <Route path="/checkout" component={Checkout} />
        <Route path="/payment-success" component={PaymentSuccess} />
        
        {/* User Pages */}
        <Route path="/profile" component={Profile} />
        <Route path="/security" component={Security} />
        <Route path="/referrals" component={Referrals} />
        
        {/* Test/Development Pages */}
        <Route path="/test-home" component={TestHome} />
        
        {/* 404 Page */}
        <Route component={NotFound} />
      </Switch>
      
      <Footer />
    </div>
  );
}

export default App;