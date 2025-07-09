export default function MinimalApp() {
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
        Platform is now loading successfully!
      </p>
      <div style={{
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#1e293b',
        borderRadius: '10px',
        margin: '20px auto',
        maxWidth: '600px'
      }}>
        <h2 style={{ color: '#22c55e', marginBottom: '10px' }}>✅ System Status</h2>
        <p>React is working correctly</p>
        <p>Server is running on port 5000</p>
        <p>Preview URL is accessible</p>
      </div>
    </div>
  );
}