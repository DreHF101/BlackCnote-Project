import { createRoot } from "react-dom/client";

// Enhanced BlackCnote Platform
function BlackCnotePlatform() {
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
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Investments</a>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Dashboard</a>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Calculator</a>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ padding: '2rem' }}>
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
