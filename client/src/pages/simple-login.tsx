export default function SimpleLogin() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>BC</span>
          </div>
          
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            marginBottom: '10px',
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Welcome Back
          </h1>
          <p style={{ color: '#94a3b8' }}>Sign in to your BlackCnote account</p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '30px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <form>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1' }}>
                Email Address
              </label>
              <input 
                type="email" 
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white'
                }}
                placeholder="Enter your email"
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1' }}>
                Password
              </label>
              <input 
                type="password" 
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white'
                }}
                placeholder="Enter your password"
              />
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '30px'
            }}>
              <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1', fontSize: '14px' }}>
                <input type="checkbox" style={{ marginRight: '8px' }} />
                Remember me
              </label>
              <a href="#" style={{ color: '#3b82f6', fontSize: '14px', textDecoration: 'none' }}>
                Forgot password?
              </a>
            </div>
            
            <button 
              type="submit"
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '20px'
              }}
            >
              Sign In
            </button>
            
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#94a3b8', fontSize: '14px' }}>
                Don't have an account? {' '}
                <a href="/register" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                  Create one here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}