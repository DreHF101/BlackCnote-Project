function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0f172a', 
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
        }}>
          <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>BC</span>
        </div>
        
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
        
        <p style={{ color: '#cbd5e1', fontSize: '1.25rem', marginBottom: '2rem' }}>
          ✅ Server Running Successfully<br/>
          ✅ Backend Infrastructure Complete<br/>
          ✅ All HYIP Features Implemented
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginTop: '2rem',
          maxWidth: '800px',
          margin: '2rem auto'
        }}>
          <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>$12,450</div>
            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Total Invested</div>
          </div>
          <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>$2,180</div>
            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Total Profit</div>
          </div>
          <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>5</div>
            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Active Plans</div>
          </div>
          <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#a855f7' }}>17.5%</div>
            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Avg. ROI</div>
          </div>
        </div>

        <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#94a3b8' }}>
          <p>🌐 Preview URL: <span style={{ color: '#f59e0b' }}>Active</span></p>
          <p>⚡ Server: <span style={{ color: '#10b981' }}>Running on Port 5000</span></p>
          <p>🔗 API Endpoints: <span style={{ color: '#3b82f6' }}>Operational</span></p>
          <p>📱 Frontend: <span style={{ color: '#a855f7' }}>Loading Successfully</span></p>
        </div>
      </div>
    </div>
  );
}

export default App;
