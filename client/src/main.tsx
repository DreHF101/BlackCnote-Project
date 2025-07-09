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
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#f59e0b',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white'
          }}>BC</div>
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
      
      <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <button 
          onClick={() => onNavigate("about")}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: currentPage === "about" ? '#f59e0b' : '#94a3b8',
            cursor: 'pointer',
            fontWeight: currentPage === "about" ? 'bold' : 'normal'
          }}
        >
          About
        </button>
        <button 
          onClick={() => onNavigate("investments")}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: currentPage === "investments" ? '#f59e0b' : '#94a3b8',
            cursor: 'pointer',
            fontWeight: currentPage === "investments" ? 'bold' : 'normal'
          }}
        >
          Investments
        </button>
        <button 
          onClick={() => onNavigate("dashboard")}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: currentPage === "dashboard" ? '#f59e0b' : '#94a3b8',
            cursor: 'pointer',
            fontWeight: currentPage === "dashboard" ? 'bold' : 'normal'
          }}
        >
          Dashboard
        </button>
        <button 
          onClick={() => onNavigate("calculator")}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: currentPage === "calculator" ? '#f59e0b' : '#94a3b8',
            cursor: 'pointer',
            fontWeight: currentPage === "calculator" ? 'bold' : 'normal'
          }}
        >
          Calculator
        </button>
        <button 
          onClick={() => onNavigate("contact")}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: currentPage === "contact" ? '#f59e0b' : '#94a3b8',
            cursor: 'pointer',
            fontWeight: currentPage === "contact" ? 'bold' : 'normal'
          }}
        >
          Contact
        </button>
        <button 
          onClick={() => onNavigate("login")}
          style={{ 
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            border: 'none',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Login
        </button>
        <button 
          onClick={() => onNavigate("register")}
          style={{ 
            background: 'transparent',
            border: '1px solid #f59e0b',
            color: '#f59e0b',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Register
        </button>
      </nav>
    </div>
  );
}

// HomePage Component
function HomePage({ onNavigate }) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '4rem 0',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
        borderRadius: '12px',
        marginBottom: '3rem',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(245, 158, 11, 0.2)'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#f59e0b',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
          fontWeight: 'bold',
          color: 'white',
          margin: '0 auto 1rem',
          boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)'
        }}>BC</div>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          BlackCnote Investment Platform
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#94a3b8',
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          Secure, transparent, and profitable investment solutions for the modern investor
        </p>
        <button 
          onClick={() => onNavigate("register")}
          style={{
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            border: 'none',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
          }}
        >
          Start Investing Now
        </button>
      </div>

      {/* Statistics Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid rgba(245, 158, 11, 0.2)'
        }}>
          <h3 style={{ fontSize: '2rem', color: '#f59e0b', marginBottom: '0.5rem' }}>$2.5M+</h3>
          <p style={{ color: '#94a3b8' }}>Total Invested</p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid rgba(245, 158, 11, 0.2)'
        }}>
          <h3 style={{ fontSize: '2rem', color: '#f59e0b', marginBottom: '0.5rem' }}>15.2%</h3>
          <p style={{ color: '#94a3b8' }}>Average APY</p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid rgba(245, 158, 11, 0.2)'
        }}>
          <h3 style={{ fontSize: '2rem', color: '#f59e0b', marginBottom: '0.5rem' }}>5,000+</h3>
          <p style={{ color: '#94a3b8' }}>Active Investors</p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid rgba(245, 158, 11, 0.2)'
        }}>
          <h3 style={{ fontSize: '2rem', color: '#f59e0b', marginBottom: '0.5rem' }}>99.9%</h3>
          <p style={{ color: '#94a3b8' }}>Uptime</p>
        </div>
      </div>

      {/* Features Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid rgba(245, 158, 11, 0.2)'
        }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Secure Investments</h3>
          <p style={{ color: '#94a3b8' }}>
            Bank-grade security with SSL encryption and multi-factor authentication
          </p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid rgba(245, 158, 11, 0.2)'
        }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>High Returns</h3>
          <p style={{ color: '#94a3b8' }}>
            Competitive APY rates with consistent performance and reliable payouts
          </p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid rgba(245, 158, 11, 0.2)'
        }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>24/7 Support</h3>
          <p style={{ color: '#94a3b8' }}>
            Professional support team available around the clock for assistance
          </p>
        </div>
      </div>
    </div>
  );
}

// Simple About Page
function AboutPage({ onNavigate }) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        About BlackCnote
      </h1>
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid rgba(245, 158, 11, 0.2)',
        marginBottom: '2rem'
      }}>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.6' }}>
          BlackCnote is a leading investment platform that provides secure, high-yield investment 
          opportunities with cutting-edge technology and professional portfolio management.
        </p>
      </div>
      <button 
        onClick={() => onNavigate("investments")}
        style={{
          background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
          border: 'none',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        View Investment Plans
      </button>
    </div>
  );
}

// Simple Investments Page
function InvestmentsPage({ onNavigate }) {
  const plans = [
    {
      name: "Starter Plan",
      apy: "8.5%",
      minimum: "$100",
      duration: "30 days",
      color: "#10b981"
    },
    {
      name: "Growth Plan",
      apy: "12.0%",
      minimum: "$500",
      duration: "90 days",
      color: "#f59e0b"
    },
    {
      name: "Premium Plan",
      apy: "15.8%",
      minimum: "$1,000",
      duration: "180 days",
      color: "#8b5cf6"
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Investment Plans
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {plans.map((plan, index) => (
          <div key={index} style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
            padding: '2rem',
            borderRadius: '12px',
            border: `1px solid ${plan.color}`,
            boxShadow: `0 4px 15px ${plan.color}20`
          }}>
            <h3 style={{ color: plan.color, fontSize: '1.5rem', marginBottom: '1rem' }}>
              {plan.name}
            </h3>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: plan.color }}>
                {plan.apy}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Annual Percentage Yield</div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>
                Minimum: <span style={{ color: 'white', fontWeight: 'bold' }}>{plan.minimum}</span>
              </div>
              <div style={{ color: '#94a3b8' }}>
                Duration: <span style={{ color: 'white', fontWeight: 'bold' }}>{plan.duration}</span>
              </div>
            </div>
            <button style={{
              background: `linear-gradient(90deg, ${plan.color}, ${plan.color}dd)`,
              border: 'none',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%'
            }}>
              Invest Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Simple Dashboard Page
function DashboardPage({ onNavigate }) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Dashboard
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid rgba(245, 158, 11, 0.2)'
        }}>
          <h3 style={{ fontSize: '1.8rem', color: '#10b981', marginBottom: '0.5rem' }}>$12,543</h3>
          <p style={{ color: '#94a3b8' }}>Total Balance</p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid rgba(245, 158, 11, 0.2)'
        }}>
          <h3 style={{ fontSize: '1.8rem', color: '#f59e0b', marginBottom: '0.5rem' }}>$8,250</h3>
          <p style={{ color: '#94a3b8' }}>Active Investments</p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid rgba(245, 158, 11, 0.2)'
        }}>
          <h3 style={{ fontSize: '1.8rem', color: '#8b5cf6', marginBottom: '0.5rem' }}>$1,293</h3>
          <p style={{ color: '#94a3b8' }}>Total Returns</p>
        </div>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid rgba(245, 158, 11, 0.2)'
      }}>
        <h2 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Recent Activity</h2>
        <div style={{ color: '#94a3b8' }}>
          <p>• Investment of $1,000 in Growth Plan - 2 hours ago</p>
          <p>• Profit payout of $45.50 - 1 day ago</p>
          <p>• Investment of $500 in Starter Plan - 3 days ago</p>
        </div>
      </div>
    </div>
  );
}

// Simple Calculator Page
function CalculatorPage({ onNavigate }) {
  const [amount, setAmount] = useState(1000);
  const [plan, setPlan] = useState("growth");
  
  const planData = {
    starter: { apy: 8.5, duration: 30 },
    growth: { apy: 12.0, duration: 90 },
    premium: { apy: 15.8, duration: 180 }
  };

  const calculateReturns = () => {
    const selectedPlan = planData[plan];
    const dailyRate = selectedPlan.apy / 100 / 365;
    const totalReturn = amount * (1 + dailyRate * selectedPlan.duration);
    const profit = totalReturn - amount;
    return { totalReturn, profit };
  };

  const { totalReturn, profit } = calculateReturns();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Investment Calculator
      </h1>

      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid rgba(245, 158, 11, 0.2)',
        marginBottom: '2rem'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
            Investment Amount ($)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #334155',
              backgroundColor: '#1e293b',
              color: 'white',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
            Investment Plan
          </label>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #334155',
              backgroundColor: '#1e293b',
              color: 'white',
              fontSize: '1rem'
            }}
          >
            <option value="starter">Starter Plan (8.5% APY - 30 days)</option>
            <option value="growth">Growth Plan (12.0% APY - 90 days)</option>
            <option value="premium">Premium Plan (15.8% APY - 180 days)</option>
          </select>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #10b981'
          }}>
            <div style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 'bold' }}>
              ${totalReturn.toFixed(2)}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Total Return</div>
          </div>
          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #f59e0b'
          }}>
            <div style={{ color: '#f59e0b', fontSize: '1.5rem', fontWeight: 'bold' }}>
              ${profit.toFixed(2)}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Profit</div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => onNavigate("investments")}
        style={{
          background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
          border: 'none',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Start Investing
      </button>
    </div>
  );
}

// Simple Contact Page
function ContactPage({ onNavigate }) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Contact Us
      </h1>

      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid rgba(245, 158, 11, 0.2)',
        marginBottom: '2rem'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Get in Touch</h3>
          <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
            Have questions about our investment plans? Our team is here to help you 24/7.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ color: '#94a3b8' }}>
              📧 Email: <span style={{ color: 'white' }}>support@blackcnote.com</span>
            </div>
            <div style={{ color: '#94a3b8' }}>
              📞 Phone: <span style={{ color: 'white' }}>+1 (555) 123-4567</span>
            </div>
            <div style={{ color: '#94a3b8' }}>
              ⏰ Hours: <span style={{ color: 'white' }}>24/7 Support Available</span>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => onNavigate("about")}
        style={{
          background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
          border: 'none',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Learn More About Us
      </button>
    </div>
  );
}

// Simple Login Page
function LoginPage({ onNavigate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        textAlign: 'center',
        background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Login
      </h1>

      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid rgba(245, 158, 11, 0.2)'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #334155',
              backgroundColor: '#1e293b',
              color: 'white',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #334155',
              backgroundColor: '#1e293b',
              color: 'white',
              fontSize: '1rem'
            }}
          />
        </div>

        <button 
          onClick={() => onNavigate("dashboard")}
          style={{
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            border: 'none',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '1rem'
          }}
        >
          Login
        </button>

        <div style={{ textAlign: 'center' }}>
          <span style={{ color: '#94a3b8' }}>Don't have an account? </span>
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
        </div>
      </div>
    </div>
  );
}

// Simple Register Page
function RegisterPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        textAlign: 'center',
        background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Register
      </h1>

      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid rgba(245, 158, 11, 0.2)'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
            Username
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => handleChange('username', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #334155',
              backgroundColor: '#1e293b',
              color: 'white',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #334155',
              backgroundColor: '#1e293b',
              color: 'white',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #334155',
              backgroundColor: '#1e293b',
              color: 'white',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
            Confirm Password
          </label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #334155',
              backgroundColor: '#1e293b',
              color: 'white',
              fontSize: '1rem'
            }}
          />
        </div>

        <button 
          onClick={() => onNavigate("dashboard")}
          style={{
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            border: 'none',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '1rem'
          }}
        >
          Create Account
        </button>

        <div style={{ textAlign: 'center' }}>
          <span style={{ color: '#94a3b8' }}>Already have an account? </span>
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
        </div>
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
      padding: '2rem',
      marginTop: '4rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '1rem'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#f59e0b',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'white'
          }}>BC</div>
          <span style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#f59e0b'
          }}>
            BlackCnote
          </span>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
          © 2025 BlackCnote Investment Platform. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', color: '#94a3b8' }}>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms of Service</a>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Support</a>
        </div>
      </div>
    </footer>
  );
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Render the app
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<BlackCnotePlatform />);
}