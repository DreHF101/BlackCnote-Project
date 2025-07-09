import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface Stats {
  totalUsers: number;
  totalInvested: number;
  totalPaid: number;
  activeInvestments: number;
}

export default function SimpleHome() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 15420,
    totalInvested: 28475000,
    totalPaid: 31568000,
    activeInvestments: 8920
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', padding: '20px' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '60px', paddingTop: '60px' }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 'bold', 
          marginBottom: '20px',
          background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Welcome to BlackCnote
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#cbd5e1', 
          marginBottom: '40px',
          maxWidth: '600px',
          margin: '0 auto 40px'
        }}>
          Your premium investment platform offering consistent daily returns with bank-level security. 
          Join thousands of successful investors building wealth with confidence.
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="/register"
            style={{
              background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
              padding: '15px 30px',
              borderRadius: '10px',
              textDecoration: 'none',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '600',
              display: 'inline-block'
            }}
          >
            Start Investing Now
          </a>
          <a
            href="/investments"
            style={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              padding: '15px 30px',
              borderRadius: '10px',
              textDecoration: 'none',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '600',
              display: 'inline-block'
            }}
          >
            View Investment Plans
          </a>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '30px',
        marginBottom: '60px',
        maxWidth: '1200px',
        margin: '0 auto 60px'
      }}>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '30px',
          borderRadius: '15px',
          textAlign: 'center',
          border: '1px solid #475569'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981', marginBottom: '10px' }}>
            {formatNumber(stats.totalUsers)}
          </div>
          <div style={{ color: '#94a3b8' }}>Total Investors</div>
        </div>
        
        <div style={{
          backgroundColor: '#1e293b',
          padding: '30px',
          borderRadius: '15px',
          textAlign: 'center',
          border: '1px solid #475569'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '10px' }}>
            {formatCurrency(stats.totalInvested)}
          </div>
          <div style={{ color: '#94a3b8' }}>Total Invested</div>
        </div>
        
        <div style={{
          backgroundColor: '#1e293b',
          padding: '30px',
          borderRadius: '15px',
          textAlign: 'center',
          border: '1px solid #475569'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#a855f7', marginBottom: '10px' }}>
            {formatCurrency(stats.totalPaid)}
          </div>
          <div style={{ color: '#94a3b8' }}>Total Paid Out</div>
        </div>
        
        <div style={{
          backgroundColor: '#1e293b',
          padding: '30px',
          borderRadius: '15px',
          textAlign: 'center',
          border: '1px solid #475569'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '10px' }}>
            {formatNumber(stats.activeInvestments)}
          </div>
          <div style={{ color: '#94a3b8' }}>Active Investments</div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '60px' }}>
        <h2 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: '50px',
          color: 'white'
        }}>
          Why Choose BlackCnote?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          <div style={{
            backgroundColor: '#1e293b',
            padding: '30px',
            borderRadius: '15px',
            border: '1px solid #475569'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981', marginBottom: '15px' }}>
              Bank-Level Security
            </h3>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
              Your investments are protected with military-grade encryption and multi-layer security protocols.
            </p>
          </div>
          
          <div style={{
            backgroundColor: '#1e293b',
            padding: '30px',
            borderRadius: '15px',
            border: '1px solid #475569'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '15px' }}>
              Proven Returns
            </h3>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
              Consistent daily returns with transparent performance tracking and real-time portfolio monitoring.
            </p>
          </div>
          
          <div style={{
            backgroundColor: '#1e293b',
            padding: '30px',
            borderRadius: '15px',
            border: '1px solid #475569'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#a855f7', marginBottom: '15px' }}>
              24/7 Support
            </h3>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
              Round-the-clock customer support with dedicated account managers for premium investors.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div style={{ 
        textAlign: 'center', 
        backgroundColor: '#1e293b', 
        padding: '50px 30px',
        borderRadius: '15px',
        border: '1px solid #475569',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px', color: 'white' }}>
          Ready to Start Your Investment Journey?
        </h2>
        <p style={{ color: '#cbd5e1', marginBottom: '30px', fontSize: '1.1rem' }}>
          Join thousands of investors who trust BlackCnote with their financial future.
        </p>
        <a
          href="/register"
          style={{
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            padding: '15px 40px',
            borderRadius: '10px',
            textDecoration: 'none',
            color: 'white',
            fontSize: '1.2rem',
            fontWeight: '600',
            display: 'inline-block'
          }}
        >
          Get Started Today
        </a>
      </div>
    </div>
  );
}