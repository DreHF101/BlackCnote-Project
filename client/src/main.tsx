import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";

// Page Components
function HomePage({ onLogin }) {
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
          <button 
            onClick={onLogin}
            style={{
              background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
              padding: '0.75rem 2rem',
              borderRadius: '0.5rem',
              border: 'none',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
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

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{
        fontSize: '2.5rem',
        marginBottom: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        Login to BlackCnote
      </h1>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#1e293b',
        padding: '2rem',
        borderRadius: '0.75rem',
        border: '1px solid #475569'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: 'white', marginBottom: '0.5rem', display: 'block' }}>
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #475569',
              backgroundColor: '#0f172a',
              color: 'white',
              fontSize: '1rem'
            }}
            required
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ color: 'white', marginBottom: '0.5rem', display: 'block' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #475569',
              backgroundColor: '#0f172a',
              color: 'white',
              fontSize: '1rem'
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            border: 'none',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

function RegisterPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
      
      if (response.ok) {
        onLogin(username, password);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{
        fontSize: '2.5rem',
        marginBottom: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        Join BlackCnote
      </h1>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#1e293b',
        padding: '2rem',
        borderRadius: '0.75rem',
        border: '1px solid #475569'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: 'white', marginBottom: '0.5rem', display: 'block' }}>
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #475569',
              backgroundColor: '#0f172a',
              color: 'white',
              fontSize: '1rem'
            }}
            required
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: 'white', marginBottom: '0.5rem', display: 'block' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #475569',
              backgroundColor: '#0f172a',
              color: 'white',
              fontSize: '1rem'
            }}
            required
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ color: 'white', marginBottom: '0.5rem', display: 'block' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #475569',
              backgroundColor: '#0f172a',
              color: 'white',
              fontSize: '1rem'
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            border: 'none',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

function InvestmentsPage({ plans, isAuthenticated }) {
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
        {plans.map((plan, index) => (
          <div key={plan.id || index} style={{
            backgroundColor: '#1e293b',
            padding: '2rem',
            borderRadius: '0.75rem',
            border: '1px solid #475569',
            textAlign: 'center'
          }}>
            <h3 style={{ 
              color: index === 0 ? '#10b981' : index === 1 ? '#3b82f6' : '#8b5cf6', 
              marginBottom: '1rem' 
            }}>
              {plan.name}
            </h3>
            <p style={{ color: '#f59e0b', fontSize: '2rem', marginBottom: '1rem' }}>
              {plan.apy}% APY
            </p>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
              Minimum: ${plan.minAmount}
            </p>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
              Duration: {plan.duration} days
            </p>
            <button 
              onClick={() => {
                if (isAuthenticated) {
                  alert(`Investing in ${plan.name}...`);
                } else {
                  alert('Please login to invest');
                }
              }}
              style={{
                background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
                padding: '0.75rem 2rem',
                borderRadius: '0.5rem',
                border: 'none',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Invest Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardPage({ user, stats }) {
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
          <p style={{ color: 'white', fontSize: '2rem' }}>${stats.totalBalance.toFixed(2)}</p>
        </div>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '2rem',
          borderRadius: '0.75rem',
          border: '1px solid #475569',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Active Investments</h3>
          <p style={{ color: 'white', fontSize: '2rem' }}>{stats.activeInvestments}</p>
        </div>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '2rem',
          borderRadius: '0.75rem',
          border: '1px solid #475569',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#3b82f6', marginBottom: '1rem' }}>Total Profit</h3>
          <p style={{ color: 'white', fontSize: '2rem' }}>${stats.totalProfit.toFixed(2)}</p>
        </div>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '2rem',
          borderRadius: '0.75rem',
          border: '1px solid #475569',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#8b5cf6', marginBottom: '1rem' }}>Pending Withdrawals</h3>
          <p style={{ color: 'white', fontSize: '2rem' }}>${stats.pendingWithdrawals.toFixed(2)}</p>
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

function AIAssistantPage({ user }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai-financial-assistant/recommendations');
      if (response.ok) {
        const data = await response.json();
        setRecommendations(data);
      }
    } catch (error) {
      console.error('Failed to load AI recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: '2.5rem',
        marginBottom: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        AI Financial Assistant
      </h1>
      
      <div style={{
        backgroundColor: '#1e293b',
        padding: '2rem',
        borderRadius: '0.75rem',
        border: '1px solid #475569',
        marginBottom: '2rem'
      }}>
        <h2 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Personalized Recommendations</h2>
        <button 
          onClick={loadRecommendations}
          style={{
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Get AI Recommendations'}
        </button>
      </div>

      {recommendations.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {recommendations.map((rec, index) => (
            <div key={index} style={{
              backgroundColor: '#1e293b',
              padding: '2rem',
              borderRadius: '0.75rem',
              border: '1px solid #475569'
            }}>
              <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>{rec.title}</h3>
              <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>{rec.description}</p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ 
                  color: rec.priority === 'high' ? '#f59e0b' : rec.priority === 'medium' ? '#3b82f6' : '#10b981',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  {rec.priority.toUpperCase()} PRIORITY
                </span>
                <span style={{ color: '#8b5cf6', fontSize: '0.875rem' }}>
                  {rec.confidence}% confidence
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CalculatorPage({ plans }) {
  const [amount, setAmount] = useState(1000);
  const [plan, setPlan] = useState(plans[0]?.id || '1');
  
  const calculateReturns = () => {
    const selectedPlan = plans.find(p => p.id === parseInt(plan)) || plans[0];
    if (!selectedPlan) return { daily: '0.00', monthly: '0.00', total: '0.00' };
    
    const rate = selectedPlan.apy / 100;
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
            {plans.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.apy}% APY)
              </option>
            ))}
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
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [investmentPlans, setInvestmentPlans] = useState([]);
  const [userStats, setUserStats] = useState({
    totalBalance: 0,
    activeInvestments: 0,
    totalProfit: 0,
    pendingWithdrawals: 0
  });

  // Load investment plans and user data
  useEffect(() => {
    loadInvestmentPlans();
    checkAuthStatus();
  }, []);

  const loadInvestmentPlans = async () => {
    try {
      const response = await fetch('/api/investment-plans');
      const plans = await response.json();
      setInvestmentPlans(plans);
    } catch (error) {
      console.error('Failed to load investment plans:', error);
      // Fallback to demo plans
      setInvestmentPlans([
        { id: 1, name: 'Starter Plan', apy: 5.2, minAmount: 100, duration: 30 },
        { id: 2, name: 'Pro Plan', apy: 8.7, minAmount: 500, duration: 60 },
        { id: 3, name: 'VIP Plan', apy: 12.4, minAmount: 1000, duration: 90 }
      ]);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
        loadUserStats();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const loadUserStats = async () => {
    try {
      const response = await fetch('/api/users/stats');
      if (response.ok) {
        const stats = await response.json();
        setUserStats(stats);
      }
    } catch (error) {
      console.error('Failed to load user stats:', error);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
        loadUserStats();
        setCurrentPage('dashboard');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setIsAuthenticated(false);
      setCurrentPage('home');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage onLogin={() => setCurrentPage('login')} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'register':
        return <RegisterPage onLogin={handleLogin} />;
      case 'investments':
        return <InvestmentsPage plans={investmentPlans} isAuthenticated={isAuthenticated} />;
      case 'dashboard':
        return isAuthenticated ? <DashboardPage user={user} stats={userStats} /> : <LoginPage onLogin={handleLogin} />;
      case 'calculator':
        return <CalculatorPage plans={investmentPlans} />;
      case 'ai-assistant':
        return isAuthenticated ? <AIAssistantPage user={user} /> : <LoginPage onLogin={handleLogin} />;
      default:
        return <HomePage onLogin={() => setCurrentPage('login')} />;
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
          gap: '2rem',
          alignItems: 'center'
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
          {isAuthenticated && (
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
          )}
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
          {isAuthenticated && (
            <button 
              onClick={() => setCurrentPage('ai-assistant')}
              style={{ 
                color: currentPage === 'ai-assistant' ? '#f59e0b' : '#94a3b8', 
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              AI Assistant
            </button>
          )}
          <div style={{ marginLeft: '1rem' }}>
            {isAuthenticated ? (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8' }}>Welcome, {user?.username}</span>
                <button 
                  onClick={handleLogout}
                  style={{
                    background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={() => setCurrentPage('login')}
                  style={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Login
                </button>
                <button 
                  onClick={() => setCurrentPage('register')}
                  style={{
                    background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Register
                </button>
              </div>
            )}
          </div>
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
