export default function BasicApp() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{
        fontSize: '3rem',
        textAlign: 'center',
        marginBottom: '20px',
        background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        BlackCnote Investment Platform
      </h1>
      <p style={{
        fontSize: '1.2rem',
        textAlign: 'center',
        color: '#94a3b8',
        marginBottom: '40px'
      }}>
        Your premium investment platform offering consistent daily returns with bank-level security.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          border: '1px solid #475569'
        }}>
          <h3 style={{ color: '#10b981', marginBottom: '10px' }}>15,420</h3>
          <p style={{ color: '#94a3b8' }}>Total Investors</p>
        </div>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          border: '1px solid #475569'
        }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '10px' }}>$28.4M</h3>
          <p style={{ color: '#94a3b8' }}>Total Invested</p>
        </div>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          border: '1px solid #475569'
        }}>
          <h3 style={{ color: '#3b82f6', marginBottom: '10px' }}>$31.6M</h3>
          <p style={{ color: '#94a3b8' }}>Total Paid</p>
        </div>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          border: '1px solid #475569'
        }}>
          <h3 style={{ color: '#8b5cf6', marginBottom: '10px' }}>8,920</h3>
          <p style={{ color: '#94a3b8' }}>Active Investments</p>
        </div>
      </div>
      <div style={{
        textAlign: 'center',
        marginTop: '40px',
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
    </div>
  );
}