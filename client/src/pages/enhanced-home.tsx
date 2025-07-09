import { useState, useEffect } from "react";

interface Stats {
  totalUsers: number;
  totalInvested: number;
  totalPaid: number;
  activeInvestments: number;
}

export default function EnhancedHome() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 15420,
    totalInvested: 28475000,
    totalPaid: 31568000,
    activeInvestments: 8920
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(100px)'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(120px)'
      }}></div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 20px 40px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          {/* Hero Logo */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '40px'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #dc2626 100%)',
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 50px rgba(245, 158, 11, 0.4)',
              border: '3px solid rgba(255, 255, 255, 0.1)',
              position: 'relative'
            }}>
              <span style={{ 
                fontSize: '48px', 
                fontWeight: 'bold', 
                color: 'white',
                textShadow: '0 4px 8px rgba(0,0,0,0.3)'
              }}>BC</span>
              <div style={{
                position: 'absolute',
                inset: '-2px',
                background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                borderRadius: '32px',
                opacity: 0.6
              }}></div>
            </div>
          </div>

          <h1 style={{
            fontSize: '4.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #f59e0b, #ea580c, #dc2626)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '24px',
            lineHeight: '1.1',
            textShadow: '0 4px 20px rgba(245, 158, 11, 0.3)'
          }}>
            Invest Smart,<br />Earn More
          </h1>
          <p style={{
            fontSize: '1.5rem',
            color: '#94a3b8',
            marginBottom: '50px',
            maxWidth: '700px',
            margin: '0 auto 50px',
            lineHeight: '1.6'
          }}>
            Join thousands of successful investors earning up to <strong style={{ color: '#f59e0b' }}>18.2% APY</strong> with our AI-powered investment platform. Secure, transparent, and profitable.
          </p>
          
          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
            <a
              href="/register"
              style={{
                background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
                color: 'white',
                padding: '18px 36px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1rem',
                boxShadow: '0 8px 25px rgba(245, 158, 11, 0.4)',
                transition: 'transform 0.2s',
                border: '2px solid transparent'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              🚀 Start Investing Now
            </a>
            <a
              href="/calculator"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                padding: '18px 36px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1rem',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              📊 Calculate Returns
            </a>
          </div>

          {/* Trust Indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            flexWrap: 'wrap',
            color: '#94a3b8',
            fontSize: '0.9rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#10b981' }}>🔒</span>
              <span>SSL Secured</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#3b82f6' }}>🏆</span>
              <span>Award Winning</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#f59e0b' }}>⚡</span>
              <span>Instant Deposits</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#8b5cf6' }}>🤖</span>
              <span>AI Powered</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '30px',
          marginBottom: '80px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '30px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>👥</div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#3b82f6',
              marginBottom: '8px'
            }}>
              {formatNumber(stats.totalUsers)}
            </div>
            <div style={{ color: '#94a3b8' }}>Active Investors</div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '30px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>💰</div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#10b981',
              marginBottom: '8px'
            }}>
              {formatCurrency(stats.totalInvested)}
            </div>
            <div style={{ color: '#94a3b8' }}>Total Invested</div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '30px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>💎</div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#f59e0b',
              marginBottom: '8px'
            }}>
              {formatCurrency(stats.totalPaid)}
            </div>
            <div style={{ color: '#94a3b8' }}>Total Paid Out</div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '30px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📈</div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#8b5cf6',
              marginBottom: '8px'
            }}>
              {formatNumber(stats.activeInvestments)}
            </div>
            <div style={{ color: '#94a3b8' }}>Active Investments</div>
          </div>
        </div>

        {/* Investment Plans Preview */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: '20px'
          }}>
            Choose Your Investment Plan
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#94a3b8',
            marginBottom: '50px',
            maxWidth: '600px',
            margin: '0 auto 50px'
          }}>
            Flexible investment options designed to match your financial goals and risk tolerance.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            marginBottom: '40px'
          }}>
            {/* Starter Plan */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '30px',
              textAlign: 'center'
            }}>
              <div style={{
                background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
                borderRadius: '8px',
                padding: '8px 16px',
                display: 'inline-block',
                marginBottom: '20px'
              }}>
                <span style={{ color: 'white', fontWeight: '600', fontSize: '0.9rem' }}>STARTER</span>
              </div>
              <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#3b82f6',
                marginBottom: '8px'
              }}>6.5%</div>
              <div style={{ color: '#94a3b8', marginBottom: '20px' }}>Annual Percentage Yield</div>
              <div style={{ color: '#cbd5e1', marginBottom: '20px' }}>
                Minimum: $100<br />
                Perfect for beginners
              </div>
              <a
                href="/investments"
                style={{
                  background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  display: 'inline-block'
                }}
              >
                Get Started
              </a>
            </div>

            {/* VIP Plan */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '2px solid #f59e0b',
              borderRadius: '16px',
              padding: '30px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#f59e0b',
                color: 'white',
                padding: '4px 16px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>POPULAR</div>
              <div style={{
                background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
                borderRadius: '8px',
                padding: '8px 16px',
                display: 'inline-block',
                marginBottom: '20px'
              }}>
                <span style={{ color: 'white', fontWeight: '600', fontSize: '0.9rem' }}>VIP</span>
              </div>
              <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#f59e0b',
                marginBottom: '8px'
              }}>11.2%</div>
              <div style={{ color: '#94a3b8', marginBottom: '20px' }}>Annual Percentage Yield</div>
              <div style={{ color: '#cbd5e1', marginBottom: '20px' }}>
                Minimum: $5,000<br />
                Most popular choice
              </div>
              <a
                href="/investments"
                style={{
                  background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  display: 'inline-block'
                }}
              >
                Choose VIP
              </a>
            </div>

            {/* Elite Plan */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '30px',
              textAlign: 'center'
            }}>
              <div style={{
                background: 'linear-gradient(90deg, #8b5cf6, #7c3aed)',
                borderRadius: '8px',
                padding: '8px 16px',
                display: 'inline-block',
                marginBottom: '20px'
              }}>
                <span style={{ color: 'white', fontWeight: '600', fontSize: '0.9rem' }}>ELITE</span>
              </div>
              <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#8b5cf6',
                marginBottom: '8px'
              }}>18.2%</div>
              <div style={{ color: '#94a3b8', marginBottom: '20px' }}>Annual Percentage Yield</div>
              <div style={{ color: '#cbd5e1', marginBottom: '20px' }}>
                Minimum: $25,000<br />
                Maximum returns
              </div>
              <a
                href="/investments"
                style={{
                  background: 'linear-gradient(90deg, #8b5cf6, #7c3aed)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  display: 'inline-block'
                }}
              >
                Go Elite
              </a>
            </div>
          </div>

          <a
            href="/investments"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              padding: '14px 28px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '500',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            View All Investment Plans
          </a>
        </div>

        {/* Features Section */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: '20px'
          }}>
            Why Choose BlackCnote?
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginTop: '50px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '30px'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🤖</div>
              <h3 style={{ color: '#3b82f6', marginBottom: '16px', fontSize: '1.5rem' }}>AI-Powered Analytics</h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                Advanced artificial intelligence analyzes market trends and optimizes your portfolio for maximum returns.
              </p>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '30px'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🛡️</div>
              <h3 style={{ color: '#10b981', marginBottom: '16px', fontSize: '1.5rem' }}>Bank-Level Security</h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                Your investments are protected with military-grade encryption and advanced security protocols.
              </p>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '30px'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⚡</div>
              <h3 style={{ color: '#f59e0b', marginBottom: '16px', fontSize: '1.5rem' }}>Instant Transactions</h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                Deposits are processed instantly, and withdrawals are completed within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}