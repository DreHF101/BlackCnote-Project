export default function SimpleContact() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: '20px',
          background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Contact BlackCnote
        </h1>
        
        <p style={{ 
          fontSize: '18px', 
          textAlign: 'center', 
          color: '#94a3b8', 
          marginBottom: '40px' 
        }}>
          Get in touch with our investment experts
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '30px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#f59e0b' }}>
              📧 Email Support
            </h3>
            <p style={{ color: '#cbd5e1', marginBottom: '10px' }}>support@blackcnote.com</p>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>24/7 customer support</p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '30px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#f59e0b' }}>
              📞 Phone Support
            </h3>
            <p style={{ color: '#cbd5e1', marginBottom: '10px' }}>+1 (555) 123-4567</p>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>Mon-Fri: 9AM-6PM EST</p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '30px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#f59e0b' }}>
              🏢 Office Location
            </h3>
            <p style={{ color: '#cbd5e1', marginBottom: '10px' }}>123 Financial District</p>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>New York, NY 10004</p>
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '40px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
            Send us a Message
          </h3>
          
          <form style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1' }}>Name</label>
              <input 
                type="text" 
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white'
                }}
                placeholder="Your full name"
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1' }}>Email</label>
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
                placeholder="your.email@example.com"
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1' }}>Message</label>
              <textarea 
                rows={5}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  resize: 'vertical'
                }}
                placeholder="How can we help you?"
              />
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
                cursor: 'pointer'
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}