export default function SimpleAIAssistant() {
  const recommendations = [
    {
      title: "Portfolio Optimization Suggestion",
      description: "Consider diversifying your portfolio by adding 15% to the VIP tier for balanced growth potential.",
      impact: "Expected 2.3% APY increase",
      priority: "High"
    },
    {
      title: "Market Timing Opportunity",
      description: "Current market conditions favor investment in tech-focused plans. Consider the Elite tier.",
      impact: "Potential 18.5% returns",
      priority: "Medium"
    },
    {
      title: "Risk Management Alert",
      description: "Your current allocation may benefit from rebalancing to reduce volatility.",
      impact: "Risk reduction: 12%",
      priority: "Low"
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
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🤖 AI Investment Assistant
          </h1>
          
          <p style={{ 
            fontSize: '18px', 
            color: '#94a3b8', 
            marginBottom: '30px' 
          }}>
            Personalized investment recommendations powered by artificial intelligence
          </p>
        </div>

        {/* Dynamic APY Display */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '30px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
            Your Dynamic APY Rate
          </h3>
          <div style={{ 
            fontSize: '48px', 
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px'
          }}>
            16.8%
          </div>
          <p style={{ color: '#94a3b8' }}>
            +2.3% performance bonus • +0.5% loyalty multiplier
          </p>
        </div>

        {/* AI Recommendations */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            color: '#f59e0b'
          }}>
            AI Recommendations
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gap: '20px'
          }}>
            {recommendations.map((rec, index) => (
              <div 
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '25px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  position: 'relative'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '15px'
                }}>
                  <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
                    {rec.title}
                  </h4>
                  <span style={{
                    fontSize: '12px',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    backgroundColor: rec.priority === 'High' ? '#dc2626' : rec.priority === 'Medium' ? '#f59e0b' : '#10b981',
                    color: 'white',
                    fontWeight: '500'
                  }}>
                    {rec.priority}
                  </span>
                </div>
                
                <p style={{ color: '#cbd5e1', marginBottom: '15px', lineHeight: '1.6' }}>
                  {rec.description}
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ 
                    color: '#10b981', 
                    fontWeight: '500',
                    fontSize: '14px'
                  }}>
                    {rec.impact}
                  </span>
                  <button style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: '1px solid #3b82f6',
                    backgroundColor: 'transparent',
                    color: '#3b82f6',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}>
                    Apply Suggestion
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Goals */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '30px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
            🎯 Investment Goals Tracking
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px'
          }}>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
                Retirement Fund
              </h4>
              <div style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                height: '8px', 
                borderRadius: '4px',
                marginBottom: '8px'
              }}>
                <div style={{ 
                  backgroundColor: '#10b981', 
                  height: '100%', 
                  width: '68%', 
                  borderRadius: '4px'
                }}></div>
              </div>
              <p style={{ fontSize: '14px', color: '#94a3b8' }}>
                $34,000 of $50,000 target (68%)
              </p>
            </div>
            
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
                Emergency Fund
              </h4>
              <div style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                height: '8px', 
                borderRadius: '4px',
                marginBottom: '8px'
              }}>
                <div style={{ 
                  backgroundColor: '#f59e0b', 
                  height: '100%', 
                  width: '45%', 
                  borderRadius: '4px'
                }}></div>
              </div>
              <p style={{ fontSize: '14px', color: '#94a3b8' }}>
                $4,500 of $10,000 target (45%)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}