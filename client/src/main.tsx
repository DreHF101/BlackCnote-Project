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
        <img 
          src="/assets/img/hero-logo.png" 
          alt="BlackCnote Investment Platform" 
          style={{
            height: '80px',
            width: 'auto',
            marginBottom: '1rem',
            filter: 'drop-shadow(0 8px 25px rgba(245, 158, 11, 0.3))'
          }}
        />
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

// InvestmentsPage Component
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
    },
    {
      name: "Elite Plan",
      apy: "18.2%",
      minimum: "$5,000",
      duration: "365 days",
      color: "#ef4444"
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Investment Plans
      </h1>
      <p style={{ color: '#94a3b8', marginBottom: '3rem', fontSize: '1.1rem' }}>
        Choose the perfect investment plan that matches your financial goals and risk tolerance.
      </p>

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
                Minimum Investment: <span style={{ color: 'white', fontWeight: 'bold' }}>{plan.minimum}</span>
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
              width: '100%',
              marginTop: '1rem'
            }}>
              Invest Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// DashboardPage Component
function DashboardPage({ onNavigate }) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Dashboard
      </h1>
      <p style={{ color: '#94a3b8', marginBottom: '3rem', fontSize: '1.1rem' }}>
        Track your investments and monitor your portfolio performance.
      </p>

      {/* Portfolio Overview */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        border: '1px solid rgba(245, 158, 11, 0.2)'
      }}>
        <h2 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Portfolio Overview</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>$12,543</div>
            <div style={{ color: '#94a3b8' }}>Total Balance</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>$8,250</div>
            <div style={{ color: '#94a3b8' }}>Active Investments</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>$1,247</div>
            <div style={{ color: '#94a3b8' }}>Total Profit</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>13.2%</div>
            <div style={{ color: '#94a3b8' }}>Total ROI</div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid rgba(245, 158, 11, 0.2)'
      }}>
        <h2 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Recent Transactions</h2>
        <div style={{ color: '#94a3b8' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid #334155' }}>
            <strong>Investment in Growth Plan</strong> - $500 - 2024-01-15
          </div>
          <div style={{ padding: '1rem', borderBottom: '1px solid #334155' }}>
            <strong>Profit Withdrawal</strong> - $125 - 2024-01-10
          </div>
          <div style={{ padding: '1rem' }}>
            <strong>Investment in Starter Plan</strong> - $200 - 2024-01-05
          </div>
        </div>
      </div>
    </div>
  );
}

// CalculatorPage Component
function CalculatorPage({ onNavigate }) {
  const [amount, setAmount] = useState(1000);
  const [plan, setPlan] = useState("growth");
  const [duration, setDuration] = useState(90);

  const plans = {
    starter: { apy: 8.5, name: "Starter Plan" },
    growth: { apy: 12.0, name: "Growth Plan" },
    premium: { apy: 15.8, name: "Premium Plan" },
    elite: { apy: 18.2, name: "Elite Plan" }
  };

  const calculateReturns = () => {
    const selectedPlan = plans[plan];
    const dailyRate = selectedPlan.apy / 100 / 365;
    const compoundedAmount = amount * Math.pow(1 + dailyRate, duration);
    const profit = compoundedAmount - amount;
    return { total: compoundedAmount, profit };
  };

  const { total, profit } = calculateReturns();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Investment Calculator
      </h1>
      <p style={{ color: '#94a3b8', marginBottom: '3rem', fontSize: '1.1rem' }}>
        Calculate potential returns on your investment with our interactive calculator.
      </p>

      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid rgba(245, 158, 11, 0.2)'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
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

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
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
            {Object.entries(plans).map(([key, planData]) => (
              <option key={key} value={key}>
                {planData.name} - {planData.apy}% APY
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
            Duration (days)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
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

        <div style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(234, 88, 12, 0.1) 100%)',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Projected Returns</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                ${total.toFixed(2)}
              </div>
              <div style={{ color: '#94a3b8' }}>Total Amount</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
                ${profit.toFixed(2)}
              </div>
              <div style={{ color: '#94a3b8' }}>Profit</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                {((profit / amount) * 100).toFixed(1)}%
              </div>
              <div style={{ color: '#94a3b8' }}>ROI</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// AboutPage Component
function AboutPage({ onNavigate }) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        About BlackCnote
      </h1>
      <p style={{ color: '#94a3b8', marginBottom: '3rem', fontSize: '1.1rem' }}>
        Leading the future of digital investment with innovative solutions and exceptional service.
      </p>

      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        border: '1px solid rgba(245, 158, 11, 0.2)'
      }}>
        <h2 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Our Mission</h2>
        <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
          At BlackCnote, we believe that everyone deserves access to professional-grade investment opportunities. 
          Our platform combines cutting-edge technology with time-tested investment strategies to deliver 
          consistent returns while maintaining the highest standards of security and transparency.
        </p>
      </div>

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
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Security First</h3>
          <p style={{ color: '#94a3b8' }}>
            Advanced encryption, multi-factor authentication, and cold storage security measures protect your investments.
          </p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid rgba(245, 158, 11, 0.2)'
        }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Transparency</h3>
          <p style={{ color: '#94a3b8' }}>
            Real-time reporting, detailed analytics, and clear fee structures keep you informed every step of the way.
          </p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid rgba(245, 158, 11, 0.2)'
        }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Expert Team</h3>
          <p style={{ color: '#94a3b8' }}>
            Our experienced team of financial experts and technology professionals work tirelessly to optimize your returns.
          </p>
        </div>
      </div>
    </div>
  );
}

// ContactPage Component
function ContactPage({ onNavigate }) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Contact Us
      </h1>
      <p style={{ color: '#94a3b8', marginBottom: '3rem', fontSize: '1.1rem' }}>
        Get in touch with our support team for any questions or assistance.
      </p>

      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid rgba(245, 158, 11, 0.2)'
      }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
              Name
            </label>
            <input
              type="text"
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
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
              Email
            </label>
            <input
              type="email"
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
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
              Message
            </label>
            <textarea
              rows={5}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #334155',
                backgroundColor: '#1e293b',
                color: 'white',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
              border: 'none',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Send Message
          </button>
        </form>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        marginTop: '3rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid rgba(245, 158, 11, 0.2)'
        }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Email</h3>
          <p style={{ color: '#94a3b8' }}>support@blackcnote.com</p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid rgba(245, 158, 11, 0.2)'
        }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Phone</h3>
          <p style={{ color: '#94a3b8' }}>+1 (555) 123-4567</p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid rgba(245, 158, 11, 0.2)'
        }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Support Hours</h3>
          <p style={{ color: '#94a3b8' }}>24/7 Available</p>
        </div>
      </div>
    </div>
  );
}

// LoginPage Component
function LoginPage({ onNavigate }) {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid rgba(245, 158, 11, 0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img 
            src="/assets/img/hero-logo.png" 
            alt="BlackCnote" 
            style={{
              height: '60px',
              width: 'auto',
              marginBottom: '1rem',
              filter: 'drop-shadow(0 8px 25px rgba(245, 158, 11, 0.3))'
            }}
          />
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Welcome Back
          </h1>
          <p style={{ color: '#94a3b8' }}>Sign in to your account</p>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
              Email
            </label>
            <input
              type="email"
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
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
              Password
            </label>
            <input
              type="password"
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
            type="submit"
            style={{
              background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
              border: 'none',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Sign In
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: '#94a3b8' }}>
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
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// RegisterPage Component
function RegisterPage({ onNavigate }) {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid rgba(245, 158, 11, 0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img 
            src="/assets/img/hero-logo.png" 
            alt="BlackCnote" 
            style={{
              height: '60px',
              width: 'auto',
              marginBottom: '1rem',
              filter: 'drop-shadow(0 8px 25px rgba(245, 158, 11, 0.3))'
            }}
          />
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Create Account
          </h1>
          <p style={{ color: '#94a3b8' }}>Join thousands of investors</p>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
              Full Name
            </label>
            <input
              type="text"
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
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
              Email
            </label>
            <input
              type="email"
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
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
              Password
            </label>
            <input
              type="password"
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
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
              Confirm Password
            </label>
            <input
              type="password"
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
            type="submit"
            style={{
              background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
              border: 'none',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Create Account
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: '#94a3b8' }}>
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
              Sign in
            </button>
          </p>
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
      padding: '2rem 0',
      marginTop: '4rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem'
      }}>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '1rem'
          }}>
            <img 
              src="/assets/img/hero-logo.png" 
              alt="BlackCnote" 
              style={{
                height: '40px',
                width: 'auto',
                filter: 'drop-shadow(0 4px 15px rgba(245, 158, 11, 0.3))'
              }}
            />
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              BlackCnote
            </span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Professional investment platform delivering consistent returns through innovative technology and expert management.
          </p>
        </div>
        
        <div>
          <h4 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Quick Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Investment Plans</a>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Calculator</a>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Dashboard</a>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Support</a>
          </div>
        </div>
        
        <div>
          <h4 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Contact</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ color: '#94a3b8' }}>support@blackcnote.com</span>
            <span style={{ color: '#94a3b8' }}>+1 (555) 123-4567</span>
            <span style={{ color: '#94a3b8' }}>24/7 Support Available</span>
          </div>
        </div>
      </div>
      
      <div style={{
        maxWidth: '1200px',
        margin: '2rem auto 0',
        padding: '2rem 2rem 0',
        borderTop: '1px solid #334155',
        textAlign: 'center'
      }}>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          © 2024 BlackCnote Investment Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

createRoot(document.getElementById("root")!).render(<BlackCnotePlatform />);
