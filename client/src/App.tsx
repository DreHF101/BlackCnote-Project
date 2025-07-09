import React from "react";
import { Switch, Route } from "wouter";

// Import only working simple components first
import SimpleHome from "./pages/simple-home";
import SimpleDashboard from "./pages/simple-dashboard";
import SimpleInvestments from "./pages/simple-investments";
import SimpleCalculator from "./pages/simple-calculator";

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
        {/* Working Simple Pages */}
        <Route path="/" component={SimpleHome} />
        <Route path="/dashboard" component={SimpleDashboard} />
        <Route path="/investments" component={SimpleInvestments} />
        <Route path="/calculator" component={SimpleCalculator} />
        
        {/* Fallback */}
        <Route>
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2 style={{ color: '#f59e0b', marginBottom: '20px' }}>Page Under Development</h2>
            <p style={{ color: '#94a3b8' }}>This page is being worked on. Please visit one of the main pages:</p>
            <div style={{ marginTop: '20px' }}>
              <a href="/" style={{ color: '#3b82f6', marginRight: '20px' }}>Home</a>
              <a href="/dashboard" style={{ color: '#3b82f6', marginRight: '20px' }}>Dashboard</a>
              <a href="/investments" style={{ color: '#3b82f6', marginRight: '20px' }}>Investments</a>
              <a href="/calculator" style={{ color: '#3b82f6' }}>Calculator</a>
            </div>
          </div>
        </Route>
      </Switch>
      
      <Footer />
    </div>
  );
}

export default App;