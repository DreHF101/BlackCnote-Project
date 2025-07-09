export default function TestApp() {
  return (
    <div style={{
      backgroundColor: '#0f172a',
      color: 'white',
      padding: '20px',
      minHeight: '100vh'
    }}>
      <h1>BlackCnote Test App</h1>
      <p>If you can see this, React is working correctly!</p>
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h2>✅ React Loading Successfully</h2>
        <p>The app is functional and ready to use.</p>
      </div>
    </div>
  );
}