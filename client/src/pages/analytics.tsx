import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Analytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  
  // Mock data for demonstration
  const mockAnalytics = {
    totalReturn: 24.5,
    monthlyGrowth: 8.2,
    activeInvestments: 5,
    totalInvested: 12500,
    totalEarned: 3062.5,
    portfolioValue: 15562.5,
    performanceData: [
      { date: '2024-01-01', value: 10000 },
      { date: '2024-01-15', value: 10500 },
      { date: '2024-02-01', value: 11200 },
      { date: '2024-02-15', value: 11800 },
      { date: '2024-03-01', value: 12500 },
      { date: '2024-03-15', value: 13200 },
      { date: '2024-04-01', value: 14100 },
      { date: '2024-04-15', value: 15562.5 }
    ]
  };

  const investmentBreakdown = [
    { plan: 'Starter Plan', amount: 2500, percentage: 20, apy: 6.5 },
    { plan: 'Professional Plan', amount: 3750, percentage: 30, apy: 8.7 },
    { plan: 'VIP Plan', amount: 3750, percentage: 30, apy: 11.2 },
    { plan: 'Elite Plan', amount: 2500, percentage: 20, apy: 15.8 }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      padding: '80px 20px 40px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Investment Analytics
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#94a3b8',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Comprehensive analysis of your investment performance and portfolio insights
          </p>
        </div>

        {/* Time Period Selector */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '4px'
          }}>
            {['7d', '30d', '90d', '1y', 'all'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedTimeframe(period)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: selectedTimeframe === period 
                    ? 'linear-gradient(90deg, #3b82f6, #1d4ed8)' 
                    : 'transparent',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {period.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          marginBottom: '50px'
        }}>
          {[
            { 
              title: 'Total Return', 
              value: `+${mockAnalytics.totalReturn}%`, 
              icon: '📈', 
              color: '#10b981',
              description: 'Overall portfolio performance'
            },
            { 
              title: 'Monthly Growth', 
              value: `+${mockAnalytics.monthlyGrowth}%`, 
              icon: '📊', 
              color: '#3b82f6',
              description: 'Average monthly return'
            },
            { 
              title: 'Active Investments', 
              value: mockAnalytics.activeInvestments.toString(), 
              icon: '💼', 
              color: '#f59e0b',
              description: 'Currently running investments'
            },
            { 
              title: 'Portfolio Value', 
              value: `$${mockAnalytics.portfolioValue.toLocaleString()}`, 
              icon: '💰', 
              color: '#8b5cf6',
              description: 'Total investment value'
            }
          ].map((metric, index) => (
            <div key={index} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '30px',
              textAlign: 'center',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '10px'
              }}>
                {metric.icon}
              </div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: metric.color,
                marginBottom: '5px'
              }}>
                {metric.value}
              </div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '5px'
              }}>
                {metric.title}
              </h3>
              <p style={{
                fontSize: '0.85rem',
                color: '#94a3b8'
              }}>
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Portfolio Performance Chart */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '40px',
          marginBottom: '50px'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Portfolio Performance Over Time
          </h2>
          <div style={{
            height: '300px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Simulated Chart */}
            <svg width="100%" height="100%" viewBox="0 0 800 300">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <path
                d="M 0 250 Q 100 200 200 180 T 400 140 T 600 100 T 800 50"
                stroke="#3b82f6"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 0 250 Q 100 200 200 180 T 400 140 T 600 100 T 800 50 L 800 300 L 0 300 Z"
                fill="url(#gradient)"
                opacity="0.3"
              />
            </svg>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: '#94a3b8',
              fontSize: '0.9rem'
            }}>
              <div style={{ fontSize: '1.2rem', marginBottom: '10px' }}>📊</div>
              Interactive Chart Coming Soon
            </div>
          </div>
        </div>

        {/* Investment Breakdown */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Investment Distribution */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '30px'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              Investment Distribution
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {investmentBreakdown.map((investment, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '10px'
                }}>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '5px' }}>
                      {investment.plan}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                      {investment.apy}% APY
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '600', marginBottom: '5px' }}>
                      ${investment.amount.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                      {investment.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Investments */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '30px'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              Top Performing Investments
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {[
                { plan: 'Elite Plan Investment #1', return: '+18.5%', profit: '+$925' },
                { plan: 'VIP Plan Investment #2', return: '+11.8%', profit: '+$443' },
                { plan: 'Professional Plan #3', return: '+9.2%', profit: '+$345' },
                { plan: 'Elite Plan Investment #2', return: '+17.9%', profit: '+$895' }
              ].map((investment, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '10px'
                }}>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '5px' }}>
                      {investment.plan}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#10b981' }}>
                      {investment.return}
                    </div>
                  </div>
                  <div style={{ 
                    textAlign: 'right',
                    color: '#10b981',
                    fontWeight: '600'
                  }}>
                    {investment.profit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Assessment */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '40px',
          marginBottom: '50px'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Risk Assessment & Recommendations
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {[
              {
                title: 'Portfolio Risk Level',
                level: 'Moderate',
                color: '#f59e0b',
                description: 'Well-balanced portfolio with moderate risk exposure',
                recommendation: 'Consider increasing VIP plan allocation for higher returns'
              },
              {
                title: 'Diversification Score',
                level: 'Excellent',
                color: '#10b981',
                description: 'Good spread across different investment tiers',
                recommendation: 'Maintain current allocation for optimal diversification'
              },
              {
                title: 'Performance Trend',
                level: 'Positive',
                color: '#3b82f6',
                description: 'Consistent upward trajectory over the past 6 months',
                recommendation: 'Continue current investment strategy'
              }
            ].map((assessment, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                padding: '25px',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  {assessment.title}
                </h3>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: assessment.color,
                  marginBottom: '10px'
                }}>
                  {assessment.level}
                </div>
                <p style={{
                  color: '#94a3b8',
                  fontSize: '0.9rem',
                  marginBottom: '15px'
                }}>
                  {assessment.description}
                </p>
                <div style={{
                  padding: '10px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  color: '#cbd5e1'
                }}>
                  <strong>Recommendation:</strong> {assessment.recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '40px'
        }}>
          <button style={{
            background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
            color: 'white',
            padding: '12px 30px',
            borderRadius: '12px',
            border: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Export Report
          </button>
          <button style={{
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            padding: '12px 30px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Schedule Report
          </button>
        </div>
      </div>
    </div>
  );
}
