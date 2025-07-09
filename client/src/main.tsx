import { createRoot } from "react-dom/client";
import { useState } from "react";

// Working BlackCnote Platform
function BlackCnotePlatform() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "investments":
        return <InvestmentsPage onNavigate={setCurrentPage} />;
      case "dashboard":
        return <DashboardPage onNavigate={setCurrentPage} />;
      case "calculator":
        return <CalculatorPage onNavigate={setCurrentPage} />;
      case "about":
        return <AboutPage onNavigate={setCurrentPage} />;
      case "contact":
        return <ContactPage onNavigate={setCurrentPage} />;
      case "login":
        return <LoginPage onNavigate={setCurrentPage} />;
      case "register":
        return <RegisterPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main style={{ padding: '2rem' }}>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

// Header Component
function Header({ currentPage, onNavigate }) {
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
        <button 
          onClick={() => onNavigate("home")}
          style={{ 
            background: 'none', 
            border: 'none', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            cursor: 'pointer' 
          }}
        >
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
        </button>
      </div>
      
      <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <button 
          onClick={() => onNavigate("about")}
          style={{ 
            background: currentPage === "about" ? 'rgba(245, 158, 11, 0.2)' : 'none',
            border: 'none',
            color: '#cbd5e1', 
            padding: '8px 12px', 
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          About
        </button>
        <button 
          onClick={() => onNavigate("dashboard")}
          style={{ 
            background: currentPage === "dashboard" ? 'rgba(245, 158, 11, 0.2)' : 'none',
            border: 'none',
            color: '#cbd5e1', 
            padding: '8px 12px', 
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Dashboard
        </button>
        <button 
          onClick={() => onNavigate("investments")}
          style={{ 
            background: currentPage === "investments" ? 'rgba(245, 158, 11, 0.2)' : 'none',
            border: 'none',
            color: '#cbd5e1', 
            padding: '8px 12px', 
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Investments
        </button>
        <button 
          onClick={() => onNavigate("calculator")}
          style={{ 
            background: currentPage === "calculator" ? 'rgba(245, 158, 11, 0.2)' : 'none',
            border: 'none',
            color: '#cbd5e1', 
            padding: '8px 12px', 
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Calculator
        </button>
        <button 
          onClick={() => onNavigate("contact")}
          style={{ 
            background: currentPage === "contact" ? 'rgba(245, 158, 11, 0.2)' : 'none',
            border: 'none',
            color: '#cbd5e1', 
            padding: '8px 12px', 
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Contact
        </button>
        
        <button 
          onClick={() => onNavigate("login")}
          style={{ 
            color: 'white', 
            padding: '8px 16px',
            background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
            borderRadius: '6px',
            fontWeight: '500',
            marginLeft: '10px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
        <button 
          onClick={() => onNavigate("register")}
          style={{ 
            color: 'white', 
            padding: '8px 16px',
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            borderRadius: '6px',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Register
        </button>
      </nav>
    </div>
  );
}

// Home Page
function HomePage({ onNavigate }) {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            padding: '20px',
            borderRadius: '30px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '3px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 50px rgba(245, 158, 11, 0.4)'
          }}>
            <img 
              src="/assets/img/hero-logo.png" 
              alt="BlackCnote Investment Platform" 
              style={{
                height: '120px',
                width: 'auto',
                filter: 'drop-shadow(0 8px 25px rgba(245, 158, 11, 0.3))'
              }}
            />
          </div>
        </div>

        <h1 style={{
          fontSize: '4.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #f59e0b, #ea580c, #dc2626)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '24px',
          lineHeight: '1.1',
          textShadow: '0 4px 20px rgba(245, 158, 11, 0.3)'
        }}>
          Invest Smart,<br />Earn More
        </h1>
        <p style={{
          fontSize: '1.5rem',
          color: '#94a3b8',
          marginBottom: '50px',
          maxWidth: '700px',
          margin: '0 auto 50px',
          lineHeight: '1.6'
        }}>
          Join thousands of successful investors earning up to <strong style={{ color: '#f59e0b' }}>18.2% APY</strong> with our AI-powered investment platform. Secure, transparent, and profitable.
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
          <button
            onClick={() => onNavigate("register")}
            style={{
              background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
              color: 'white',
              padding: '18px 36px',
              borderRadius: '12px',
              border: 'none',
              fontWeight: '600',
              fontSize: '1.1rem',
              boxShadow: '0 8px 25px rgba(245, 158, 11, 0.4)',
              cursor: 'pointer'
            }}
          >
            🚀 Start Investing Now
          </button>
          <button
            onClick={() => onNavigate("calculator")}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'white',
              padding: '18px 36px',
              borderRadius: '12px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              fontWeight: '600',
              fontSize: '1.1rem',
              backdropFilter: 'blur(10px)',
              cursor: 'pointer'
            }}
          >
            📊 Calculate Returns
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '30px',
        marginBottom: '80px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '30px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>👥</div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#3b82f6',
            marginBottom: '8px'
          }}>
            15,420
          </div>
          <div style={{ color: '#94a3b8' }}>Active Investors</div>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '30px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>💰</div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#10b981',
            marginBottom: '8px'
          }}>
            $28.4M
          </div>
          <div style={{ color: '#94a3b8' }}>Total Invested</div>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '30px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>💎</div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#f59e0b',
            marginBottom: '8px'
          }}>
            $31.6M
          </div>
          <div style={{ color: '#94a3b8' }}>Total Paid Out</div>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '30px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📈</div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#8b5cf6',
            marginBottom: '8px'
          }}>
            8,920
          </div>
          <div style={{ color: '#94a3b8' }}>Active Investments</div>
        </div>
      </div>
    </div>
  );
}

// Simple placeholder pages
function AboutPage({ onNavigate }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#f59e0b' }}>About BlackCnote</h1>
      <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: '1.6' }}>
        BlackCnote is a leading investment platform providing secure, high-yield opportunities 
        with cutting-edge AI technology and professional portfolio management.
      </p>
      <button
        onClick={() => onNavigate("investments")}
        style={{
          marginTop: '2rem',
          background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        Start Investing
      </button>
    </div>
  );
}

function InvestmentsPage({ onNavigate }) {
  const plans = [
    { name: "Starter Plan", apy: 6.5, minAmount: 100, duration: 30 },
    { name: "VIP Plan", apy: 11.2, minAmount: 5000, duration: 60 },
    { name: "Elite Plan", apy: 18.2, minAmount: 25000, duration: 90 }
  ];

  return (
    <div>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center', color: '#f59e0b' }}>
        Investment Plans
      </h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {plans.map((plan, index) => (
          <div key={index} style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '30px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '1rem', fontSize: '1.5rem' }}>
              {plan.name}
            </h3>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#10b981', marginBottom: '1rem' }}>
              {plan.apy}%
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
              Annual Percentage Yield
            </p>
            <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>
              Minimum: ${plan.minAmount.toLocaleString()}
            </p>
            <p style={{ color: '#cbd5e1', marginBottom: '2rem' }}>
              Duration: {plan.duration} days
            </p>
            <button style={{
              background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Invest Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardPage({ onNavigate }) {
  return (
    <div>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center', color: '#f59e0b' }}>
        Investment Dashboard
      </h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '30px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>Total Balance</h3>
          <p style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>$12,475.00</p>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '30px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Active Investments</h3>
          <p style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>3</p>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '30px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#3b82f6', marginBottom: '1rem' }}>Total Profit</h3>
          <p style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>$2,847.50</p>
        </div>
      </div>
    </div>
  );
}

function CalculatorPage({ onNavigate }) {
  const [amount, setAmount] = useState(1000);
  const [plan, setPlan] = useState("vip");
  
  const planData = {
    starter: { apy: 6.5, duration: 30 },
    vip: { apy: 11.2, duration: 60 },
    elite: { apy: 18.2, duration: 90 }
  };
  
  const selectedPlan = planData[plan];
  const estimatedReturn = (amount * (selectedPlan.apy / 100) * (selectedPlan.duration / 365)).toFixed(2);
  const totalReturn = (parseFloat(amount) + parseFloat(estimatedReturn)).toFixed(2);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center', color: '#f59e0b' }}>
        Investment Calculator
      </h1>
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '30px'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ color: 'white', marginBottom: '0.5rem', display: 'block' }}>
            Investment Amount ($)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
        
        <div style={{ marginBottom: '2rem' }}>
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
            <option value="starter">Starter Plan (6.5% APY)</option>
            <option value="vip">VIP Plan (11.2% APY)</option>
            <option value="elite">Elite Plan (18.2% APY)</option>
          </select>
        </div>
        
        <div style={{
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '8px',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Estimated Returns</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Investment</p>
              <p style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                ${parseFloat(amount).toLocaleString()}
              </p>
            </div>
            <div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Profit</p>
              <p style={{ color: '#10b981', fontSize: '1.2rem', fontWeight: 'bold' }}>
                ${parseFloat(estimatedReturn).toLocaleString()}
              </p>
            </div>
            <div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Total Return</p>
              <p style={{ color: '#f59e0b', fontSize: '1.2rem', fontWeight: 'bold' }}>
                ${parseFloat(totalReturn).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => onNavigate("register")}
          style={{
            width: '100%',
            marginTop: '2rem',
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            fontWeight: '600',
            fontSize: '1.1rem',
            cursor: 'pointer'
          }}
        >
          Start Investing Now
        </button>
      </div>
    </div>
  );
}

function ContactPage({ onNavigate }) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center', color: '#f59e0b' }}>
        Contact Us
      </h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '30px'
        }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Get in Touch</h3>
          <div style={{ color: '#94a3b8', lineHeight: '1.6' }}>
            <p>📧 support@blackcnote.com</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>⏰ 24/7 Customer Support</p>
          </div>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '30px'
        }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={() => onNavigate("about")}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer'
              }}
            >
              Learn About Us
            </button>
            <button
              onClick={() => onNavigate("investments")}
              style={{
                background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              View Investment Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginPage({ onNavigate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'white', textAlign: 'center' }}>
        Login to BlackCnote
      </h1>
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '30px'
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
          />
        </div>
        <button
          onClick={() => onNavigate("dashboard")}
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
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#94a3b8' }}>
          Don't have an account?{' '}
          <button
            onClick={() => onNavigate("register")}
            style={{
              background: 'none',
              border: 'none',
              color: '#f59e0b',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}

function RegisterPage({ onNavigate }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'white', textAlign: 'center' }}>
        Join BlackCnote
      </h1>
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '30px'
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
          />
        </div>
        <button
          onClick={() => onNavigate("dashboard")}
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
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#94a3b8' }}>
          Already have an account?{' '}
          <button
            onClick={() => onNavigate("login")}
            style={{
              background: 'none',
              border: 'none',
              color: '#f59e0b',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0f172a',
      borderTop: '1px solid #334155',
      padding: '40px 20px 20px',
      marginTop: '4rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '20px'
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
        <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
          The leading investment platform providing secure, high-yield opportunities.
        </p>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          © 2025 BlackCnote Investment Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// Mount the application
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<BlackCnotePlatform />);
} else {
  console.error("Root container not found");
}