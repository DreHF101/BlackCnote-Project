import { createRoot } from "react-dom/client";
import { useState } from "react";

// Page Components
function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          BlackCnote Investment Platform
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#94a3b8',
          marginBottom: '2rem'
        }}>
          Your premium investment platform offering consistent daily returns with bank-level security.
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button style={{
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            padding: '0.75rem 2rem',
            borderRadius: '0.5rem',
            border: 'none',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Start Investing Now
          </button>
          <button style={{
            backgroundColor: '#1e293b',
            border: '1px solid #475569',
            padding: '0.75rem 2rem',
            borderRadius: '0.5rem',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            View Investment Plans
          </button>
        </div>
      </section>

      {/* Statistics Grid */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '2rem',
          borderRadius: '0.75rem',
          textAlign: 'center',
          border: '1px solid #475569'
        }}>
          <h3 style={{ 
            color: '#10b981', 
            fontSize: '2rem',
            marginBottom: '0.5rem' 
          }}>
            15,420
          </h3>
          <p style={{ color: '#94a3b8' }}>Total Investors</p>
        </div>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '2rem',
          borderRadius: '0.75rem',
          textAlign: 'center',
          border: '1px solid #475569'
        }}>
          <h3 style={{ 
            color: '#f59e0b', 
            fontSize: '2rem',
            marginBottom: '0.5rem' 
          }}>
            $28.4M
          </h3>
          <p style={{ color: '#94a3b8' }}>Total Invested</p>
        </div>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '2rem',
          borderRadius: '0.75rem',
          textAlign: 'center',
          border: '1px solid #475569'
        }}>
          <h3 style={{ 
            color: '#3b82f6', 
            fontSize: '2rem',
            marginBottom: '0.5rem' 
          }}>
            $31.6M
          </h3>
          <p style={{ color: '#94a3b8' }}>Total Paid</p>
        </div>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '2rem',
          borderRadius: '0.75rem',
          textAlign: 'center',
          border: '1px solid #475569'
        }}>
          <h3 style={{ 
            color: '#8b5cf6', 
            fontSize: '2rem',
            marginBottom: '0.5rem' 
          }}>
            8,920
          </h3>
          <p style={{ color: '#94a3b8' }}>Active Investments</p>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        marginTop: '3rem',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2rem',
          marginBottom: '2rem',
          color: 'white'
        }}>
          Platform Features
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            backgroundColor: '#1e293b',
            padding: '2rem',
            borderRadius: '0.75rem',
            border: '1px solid #475569'
          }}>
            <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>AI Investment Assistant</h3>
            <p style={{ color: '#94a3b8' }}>
              Advanced AI-powered recommendations for optimized portfolio management
            </p>
          </div>
          <div style={{
            backgroundColor: '#1e293b',
            padding: '2rem',
            borderRadius: '0.75rem',
            border: '1px solid #475569'
          }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Bank-Level Security</h3>
            <p style={{ color: '#94a3b8' }}>
              2FA authentication and enterprise-grade security measures
            </p>
          </div>
          <div style={{
            backgroundColor: '#1e293b',
            padding: '2rem',
            borderRadius: '0.75rem',
            border: '1px solid #475569'
          }}>
            <h3 style={{ color: '#3b82f6', marginBottom: '1rem' }}>Multiple Payment Methods</h3>
            <p style={{ color: '#94a3b8' }}>
              Stripe, PayPal, and cryptocurrency payment options
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function InvestmentsPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: '2.5rem',
        marginBottom: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        Investment Plans
      </h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '2rem',
          borderRadius: '0.75rem',
          border: '1px solid #475569',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>Starter Plan</h3>
          <p style={{ color: '#f59e0b', fontSize: '2rem', marginBottom: '1rem' }}>5.2% APY</p>
          <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Minimum: $100</p>
          <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Duration: 30 days</p>
          <button style={{
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            padding: '0.75rem 2rem',
            borderRadius: '0.5rem',
            border: 'none',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Invest Now
          </button>
        </div>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '2rem',
          borderRadius: '0.75rem',
          border: '1px solid #475569',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#3b82f6', marginBottom: '1rem' }}>Pro Plan</h3>
          <p style={{ color: '#f59e0b', fontSize: '2rem', marginBottom: '1rem' }}>8.7% APY</p>
          <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Minimum: $500</p>
          <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Duration: 60 days</p>
          <button style={{
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            padding: '0.75rem 2rem',
            borderRadius: '0.5rem',
            border: 'none',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Invest Now
          </button>
        </div>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '2rem',
          borderRadius: '0.75rem',
          border: '1px solid #475569',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#8b5cf6', marginBottom: '1rem' }}>VIP Plan</h3>
          <p style={{ color: '#f59e0b', fontSize: '2rem', marginBottom: '1rem' }}>12.4% APY</p>
          <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Minimum: $1,000</p>
          <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Duration: 90 days</p>
          <button style={{
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            padding: '0.75rem 2rem',
            borderRadius: '0.5rem',
            border: 'none',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Invest Now
          </button>
        </div>
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: '2.5rem',
        marginBottom: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        Investment Dashboard
      </h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '2rem',
          borderRadius: '0.75rem',
          border: '1px solid #475569',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>Total Balance</h3>
          <p style={{ color: 'white', fontSize: '2rem' }}>$2,450.00</p>
        </div>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '2rem',
          borderRadius: '0.75rem',
          border: '1px solid #475569',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Active Investments</h3>
          <p style={{ color: 'white', fontSize: '2rem' }}>3</p>
        </div>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '2rem',
          borderRadius: '0.75rem',
          border: '1px solid #475569',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#3b82f6', marginBottom: '1rem' }}>Total Profit</h3>
          <p style={{ color: 'white', fontSize: '2rem' }}>$124.50</p>
        </div>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '2rem',
          borderRadius: '0.75rem',
          border: '1px solid #475569',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#8b5cf6', marginBottom: '1rem' }}>Pending Withdrawals</h3>
          <p style={{ color: 'white', fontSize: '2rem' }}>$0.00</p>
        </div>
      </div>
      <div style={{
        backgroundColor: '#1e293b',
        padding: '2rem',
        borderRadius: '0.75rem',
        border: '1px solid #475569'
      }}>
        <h2 style={{ color: 'white', marginBottom: '1rem' }}>Recent Activity</h2>
        <div style={{ color: '#94a3b8' }}>
          <p style={{ marginBottom: '0.5rem' }}>• Investment of $1,000 in VIP Plan - Active</p>
          <p style={{ marginBottom: '0.5rem' }}>• Profit payment of $52.00 received</p>
          <p style={{ marginBottom: '0.5rem' }}>• Investment of $500 in Pro Plan - Completed</p>
        </div>
      </div>
    </div>
  );
}

function CalculatorPage() {
  const [amount, setAmount] = useState(1000);
  const [plan, setPlan] = useState('starter');
  
  const calculateReturns = () => {
    const rates = {
      starter: 0.052,
      pro: 0.087,
      vip: 0.124
    };
    const rate = rates[plan];
    const dailyReturn = (amount * rate) / 365;
    const monthlyReturn = dailyReturn * 30;
    const totalReturn = amount + monthlyReturn;
    
    return {
      daily: dailyReturn.toFixed(2),
      monthly: monthlyReturn.toFixed(2),
      total: totalReturn.toFixed(2)
    };
  };
  
  const returns = calculateReturns();
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: '2.5rem',
        marginBottom: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        Investment Calculator
      </h1>
      <div style={{
        backgroundColor: '#1e293b',
        padding: '2rem',
        borderRadius: '0.75rem',
        border: '1px solid #475569',
        marginBottom: '2rem'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: 'white', marginBottom: '0.5rem', display: 'block' }}>
            Investment Amount ($)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #475569',
              backgroundColor: '#0f172a',
              color: 'white',
              fontSize: '1rem'
            }}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: 'white', marginBottom: '0.5rem', display: 'block' }}>
            Investment Plan
          </label>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #475569',
              backgroundColor: '#0f172a',
              color: 'white',
              fontSize: '1rem'
            }}
          >
            <option value="starter">Starter Plan (5.2% APY)</option>
            <option value="pro">Pro Plan (8.7% APY)</option>
            <option value="vip">VIP Plan (12.4% APY)</option>
          </select>
        </div>
      </div>
      <div style={{
        backgroundColor: '#1e293b',
        padding: '2rem',
        borderRadius: '0.75rem',
        border: '1px solid #475569'
      }}>
        <h2 style={{ color: 'white', marginBottom: '1rem' }}>Projected Returns</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#10b981', marginBottom: '0.5rem' }}>Daily Return</h3>
            <p style={{ color: 'white', fontSize: '1.5rem' }}>${returns.daily}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>Monthly Return</h3>
            <p style={{ color: 'white', fontSize: '1.5rem' }}>${returns.monthly}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>Total After 30 Days</h3>
            <p style={{ color: 'white', fontSize: '1.5rem' }}>${returns.total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced BlackCnote Platform
function BlackCnotePlatform() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage />;
      case 'investments':
        return <InvestmentsPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'calculator':
        return <CalculatorPage />;
      default:
        return <HomePage />;
    }
  };
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#1e293b',
        padding: '1rem 2rem',
        borderBottom: '1px solid #475569',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            BlackCnote
          </div>
        </div>
        <nav style={{
          display: 'flex',
          gap: '2rem'
        }}>
          <button 
            onClick={() => setCurrentPage('home')}
            style={{ 
              color: currentPage === 'home' ? '#f59e0b' : '#94a3b8', 
              textDecoration: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentPage('investments')}
            style={{ 
              color: currentPage === 'investments' ? '#f59e0b' : '#94a3b8', 
              textDecoration: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Investments
          </button>
          <button 
            onClick={() => setCurrentPage('dashboard')}
            style={{ 
              color: currentPage === 'dashboard' ? '#f59e0b' : '#94a3b8', 
              textDecoration: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setCurrentPage('calculator')}
            style={{ 
              color: currentPage === 'calculator' ? '#f59e0b' : '#94a3b8', 
              textDecoration: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Calculator
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ padding: '2rem' }}>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#1e293b',
        padding: '2rem',
        marginTop: '3rem',
        borderTop: '1px solid #475569',
        textAlign: 'center'
      }}>
        <p style={{ color: '#94a3b8' }}>
          © 2025 BlackCnote Investment Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<BlackCnotePlatform />);
} else {
  console.error("Root element not found");
}
