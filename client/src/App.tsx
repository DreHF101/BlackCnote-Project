import React from "react";

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
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
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>BC</span>
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
        </div>
        
        <nav style={{ display: 'flex', gap: '24px' }}>
          <a href="/" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Home</a>
          <a href="/dashboard" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Dashboard</a>
          <a href="/investments" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Investments</a>
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

      {/* Main Content */}
      <div style={{ padding: '48px 24px', textAlign: 'center' }}>
        <div style={{
          width: '96px',
          height: '96px',
          background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 32px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.4)'
        }}>
          <span style={{ fontSize: '48px', fontWeight: 'bold' }}>BC</span>
        </div>
        
        <h1 style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '24px',
          lineHeight: '1.1'
        }}>
          BlackCnote Investment Platform
        </h1>
        
        <p style={{
          fontSize: '1.25rem',
          color: '#cbd5e1',
          marginBottom: '48px',
          maxWidth: '600px',
          margin: '0 auto 48px'
        }}>
          Advanced AI-powered investment platform with dynamic APY rates, 
          smart portfolio management, and comprehensive security features.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '64px' }}>
          <a
            href="/register"
            style={{
              background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
              padding: '16px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              color: 'white',
              fontSize: '18px',
              fontWeight: '600',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
            }}
          >
            Start Investing Now
          </a>
          <a
            href="/calculator"
            style={{
              border: '1px solid #475569',
              padding: '16px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              color: 'white',
              fontSize: '18px',
              fontWeight: '600'
            }}
          >
            Calculate Returns
          </a>
        </div>
        
        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            border: '1px solid #475569'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>
              $12,450
            </div>
            <div style={{ color: '#94a3b8' }}>Total Invested</div>
          </div>
          
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            border: '1px solid #475569'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '8px' }}>
              $2,180
            </div>
            <div style={{ color: '#94a3b8' }}>Total Profit</div>
          </div>
          
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            border: '1px solid #475569'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '8px' }}>
              5
            </div>
            <div style={{ color: '#94a3b8' }}>Active Plans</div>
          </div>
          
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            border: '1px solid #475569'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#a855f7', marginBottom: '8px' }}>
              17.5%
            </div>
            <div style={{ color: '#94a3b8' }}>Average ROI</div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div style={{
        height: '64px',
        backgroundColor: '#0f172a',
        borderTop: '1px solid #334155',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '64px'
      }}>
        <p style={{ color: '#94a3b8', margin: 0 }}>
          © 2025 BlackCnote Investment Platform. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default App;
