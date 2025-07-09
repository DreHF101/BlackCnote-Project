export default function SimpleHelp() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '80px 20px 40px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px'
          }}>
            Help Center
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#94a3b8',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Find answers to frequently asked questions and get support for your BlackCnote investment journey.
          </p>
        </div>

        {/* FAQ Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          marginBottom: '60px'
        }}>
          {/* Getting Started */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '30px'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#3b82f6',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              🚀 Getting Started
            </h3>
            <div style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
              <div style={{ marginBottom: '15px' }}>
                <strong>How do I create an account?</strong><br />
                Click "Register" in the header, fill out the form with your details, and verify your email address.
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>What is the minimum investment?</strong><br />
                Our Starter plan begins at just $100, making it accessible for all investors.
              </div>
              <div>
                <strong>How do I make my first investment?</strong><br />
                After registration, go to "Investments", choose a plan, and follow the guided process.
              </div>
            </div>
          </div>

          {/* Investment Plans */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '30px'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#10b981',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              💰 Investment Plans
            </h3>
            <div style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
              <div style={{ marginBottom: '15px' }}>
                <strong>What are the available plans?</strong><br />
                Starter (6.5% APY), Pro (8.7% APY), VIP (11.2% APY), Premium (15.8% APY), Elite (18.2% APY).
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>Can I change my investment plan?</strong><br />
                Yes, you can upgrade your plan at any time through your dashboard.
              </div>
              <div>
                <strong>How are returns calculated?</strong><br />
                Returns are calculated daily and compounded based on your chosen plan's APY rate.
              </div>
            </div>
          </div>

          {/* Deposits & Withdrawals */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '30px'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#f59e0b',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              💳 Deposits & Withdrawals
            </h3>
            <div style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
              <div style={{ marginBottom: '15px' }}>
                <strong>What payment methods are accepted?</strong><br />
                We accept credit cards, bank transfers, PayPal, and major cryptocurrencies.
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>How long do withdrawals take?</strong><br />
                Standard withdrawals process within 24-48 hours during business days.
              </div>
              <div>
                <strong>Are there any fees?</strong><br />
                Deposits are free. Withdrawal fees vary by method (2-5% typically).
              </div>
            </div>
          </div>

          {/* Security */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '30px'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#8b5cf6',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              🔒 Security
            </h3>
            <div style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
              <div style={{ marginBottom: '15px' }}>
                <strong>Is my money safe?</strong><br />
                Yes, we use bank-grade encryption and secure cold storage for all funds.
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>Do you offer 2FA?</strong><br />
                Yes, we strongly recommend enabling Two-Factor Authentication for enhanced security.
              </div>
              <div>
                <strong>How do I reset my password?</strong><br />
                Click "Forgot Password" on the login page and follow the email instructions.
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '1.75rem',
            fontWeight: '600',
            color: '#fff',
            marginBottom: '16px'
          }}>
            Still Need Help?
          </h3>
          <p style={{
            color: '#94a3b8',
            marginBottom: '30px',
            fontSize: '1.1rem'
          }}>
            Our support team is available 24/7 to assist you with any questions.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/contact"
              style={{
                background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              📧 Contact Support
            </a>
            <a
              href="/ai-assistant"
              style={{
                background: 'linear-gradient(90deg, #10b981, #059669)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🤖 AI Assistant
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}