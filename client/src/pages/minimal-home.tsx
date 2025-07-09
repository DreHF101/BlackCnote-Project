export default function MinimalHome() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
        paddingTop: '80px'
      }}>
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
        </p>
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
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
        
        {/* Platform Status */}
        <div style={{
          marginTop: '80px',
          padding: '40px',
          backgroundColor: '#1e293b',
          borderRadius: '15px',
          border: '1px solid #475569'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#22c55e'
          }}>
            ✅ Platform Status: Online
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '30px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#10b981',
                marginBottom: '10px'
              }}>
                15,420
              </div>
              <div style={{ color: '#94a3b8' }}>Total Investors</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#f59e0b',
                marginBottom: '10px'
              }}>
                $28.4M
              </div>
              <div style={{ color: '#94a3b8' }}>Total Invested</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#3b82f6',
                marginBottom: '10px'
              }}>
                $31.6M
              </div>
              <div style={{ color: '#94a3b8' }}>Total Paid</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#8b5cf6',
                marginBottom: '10px'
              }}>
                8,920
              </div>
              <div style={{ color: '#94a3b8' }}>Active Investments</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}