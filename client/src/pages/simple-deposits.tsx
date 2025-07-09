export default function SimpleDeposits() {
  const paymentMethods = [
    {
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, American Express",
      fee: "2.5%",
      minAmount: "$10",
      maxAmount: "$50,000",
      processingTime: "Instant"
    },
    {
      name: "Bank Transfer",
      description: "Direct bank wire transfer",
      fee: "$0",
      minAmount: "$100",
      maxAmount: "$100,000",
      processingTime: "1-3 business days"
    },
    {
      name: "Cryptocurrency",
      description: "Bitcoin, Ethereum, USDT",
      fee: "1%",
      minAmount: "$25",
      maxAmount: "$25,000",
      processingTime: "15-30 minutes"
    }
  ];

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
          💰 Make a Deposit
        </h1>
        
        <p style={{ 
          fontSize: '18px', 
          textAlign: 'center', 
          color: '#94a3b8', 
          marginBottom: '40px' 
        }}>
          Fund your account to start investing
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px',
          marginBottom: '40px'
        }}>
          {paymentMethods.map((method, index) => (
            <div 
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '30px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#f59e0b' }}>
                {method.name}
              </h3>
              <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
                {method.description}
              </p>
              
              <div style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '14px' }}>Processing Fee:</span>
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>{method.fee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '14px' }}>Min Amount:</span>
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>{method.minAmount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '14px' }}>Max Amount:</span>
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>{method.maxAmount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8', fontSize: '14px' }}>Processing Time:</span>
                  <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '500' }}>{method.processingTime}</span>
                </div>
              </div>
              
              <button style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Select Method
              </button>
            </div>
          ))}
        </div>

        {/* Deposit Form */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '40px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
            Deposit Amount
          </h3>
          
          <form>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1' }}>
                Amount (USD)
              </label>
              <input 
                type="number" 
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '18px'
                }}
                placeholder="Enter deposit amount"
                min="10"
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1' }}>
                Payment Method
              </label>
              <select 
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '16px'
                }}
              >
                <option value="">Select payment method</option>
                <option value="card">Credit/Debit Card</option>
                <option value="bank">Bank Transfer</option>
                <option value="crypto">Cryptocurrency</option>
              </select>
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
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Continue to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}