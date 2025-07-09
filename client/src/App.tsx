import React from "react";
import { Switch, Route } from "wouter";

// Dashboard Page Component
function Dashboard() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '32px',
          background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Investment Dashboard
        </h1>
        
        {/* Portfolio Overview */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '24px',
          marginBottom: '48px'
        }}>
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #475569'
          }}>
            <h3 style={{ color: '#10b981', fontSize: '1.25rem', marginBottom: '8px' }}>Portfolio Balance</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>$14,630</div>
            <div style={{ color: '#10b981', fontSize: '0.875rem' }}>+18.2% this month</div>
          </div>
          
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #475569'
          }}>
            <h3 style={{ color: '#3b82f6', fontSize: '1.25rem', marginBottom: '8px' }}>Active Investments</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>5</div>
            <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Across 3 plans</div>
          </div>
          
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #475569'
          }}>
            <h3 style={{ color: '#a855f7', fontSize: '1.25rem', marginBottom: '8px' }}>Monthly Earnings</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>$1,245</div>
            <div style={{ color: '#10b981', fontSize: '0.875rem' }}>+12% from last month</div>
          </div>
          
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #475569'
          }}>
            <h3 style={{ color: '#f59e0b', fontSize: '1.25rem', marginBottom: '8px' }}>AI Score</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>8.7/10</div>
            <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Excellent performance</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '24px' }}>Quick Actions</h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="/investments"
              style={{
                background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
                padding: '12px 24px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'white',
                fontWeight: '600'
              }}
            >
              New Investment
            </a>
            <a
              href="/withdraw"
              style={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                padding: '12px 24px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'white',
                fontWeight: '600'
              }}
            >
              Withdraw Funds
            </a>
            <a
              href="/calculator"
              style={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                padding: '12px 24px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'white',
                fontWeight: '600'
              }}
            >
              ROI Calculator
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '24px' }}>Recent Activity</h2>
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            border: '1px solid #475569',
            overflow: 'hidden'
          }}>
            {[
              { type: 'Investment', amount: '$500', plan: 'Premium Plan', time: '2 hours ago', status: 'Active' },
              { type: 'Profit', amount: '+$45', plan: 'Growth Plan', time: '1 day ago', status: 'Completed' },
              { type: 'Withdrawal', amount: '$200', plan: '-', time: '3 days ago', status: 'Pending' }
            ].map((activity, index) => (
              <div key={index} style={{
                padding: '16px 24px',
                borderBottom: index < 2 ? '1px solid #334155' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{activity.type}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{activity.plan}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ 
                    fontWeight: 'bold', 
                    color: activity.type === 'Profit' ? '#10b981' : activity.type === 'Withdrawal' ? '#f59e0b' : 'white',
                    marginBottom: '4px'
                  }}>
                    {activity.amount}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Investments Page Component
function Investments() {
  const investmentPlans = [
    {
      name: 'Starter Plan',
      apy: '12.5%',
      minAmount: '$100',
      duration: '30 days',
      color: '#10b981',
      description: 'Perfect for beginners starting their investment journey'
    },
    {
      name: 'Growth Plan',
      apy: '15.8%',
      minAmount: '$500',
      duration: '60 days',
      color: '#3b82f6',
      description: 'Balanced growth with moderate risk and excellent returns'
    },
    {
      name: 'Premium Plan',
      apy: '18.2%',
      minAmount: '$1,000',
      duration: '90 days',
      color: '#a855f7',
      description: 'High-yield investment for experienced investors'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '16px',
          background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Investment Plans
        </h1>
        
        <p style={{
          fontSize: '1.125rem',
          color: '#cbd5e1',
          marginBottom: '48px',
          maxWidth: '600px'
        }}>
          Choose from our AI-optimized investment plans with dynamic APY rates 
          that adjust based on market conditions and your loyalty tier.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '24px'
        }}>
          {investmentPlans.map((plan, index) => (
            <div key={index} style={{
              backgroundColor: '#1e293b',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid #475569',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: plan.color
              }} />
              
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '8px',
                color: plan.color
              }}>
                {plan.name}
              </h3>
              
              <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                marginBottom: '8px',
                color: plan.color
              }}>
                {plan.apy}
              </div>
              
              <div style={{
                color: '#94a3b8',
                marginBottom: '16px',
                fontSize: '0.875rem'
              }}>
                Annual Percentage Yield
              </div>
              
              <p style={{
                color: '#cbd5e1',
                marginBottom: '24px',
                lineHeight: '1.5'
              }}>
                {plan.description}
              </p>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}>
                  <span style={{ color: '#94a3b8' }}>Minimum:</span>
                  <span style={{ fontWeight: '600' }}>{plan.minAmount}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ color: '#94a3b8' }}>Duration:</span>
                  <span style={{ fontWeight: '600' }}>{plan.duration}</span>
                </div>
              </div>
              
              <button style={{
                width: '100%',
                padding: '16px',
                background: `linear-gradient(90deg, ${plan.color}, ${plan.color}dd)`,
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Invest Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Header Component
function Header() {
  return (
    <div style={{
      height: '64px',
      backgroundColor: '#0f172a',
      borderBottom: '1px solid #334155',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>BC</span>
          </div>
          <span style={{
            fontSize: '24px',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            BlackCnote
          </span>
        </a>
      </div>
      
      <nav style={{ display: 'flex', gap: '24px' }}>
        <a href="/" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Home</a>
        <a href="/dashboard" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Dashboard</a>
        <a href="/investments" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Investments</a>
        <a href="/calculator" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Calculator</a>
        <a href="/news" style={{ color: '#cbd5e1', textDecoration: 'none' }}>News</a>
      </nav>
      
      <div style={{ display: 'flex', gap: '12px' }}>
        <a href="/login" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '8px 16px' }}>Login</a>
        <a
          href="/register"
          style={{
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            padding: '8px 16px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'white',
            fontWeight: '500'
          }}
        >
          Sign Up
        </a>
      </div>
    </div>
  );
}

// Home Page Component  
function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Main Content */}
      <div style={{ padding: '48px 24px', textAlign: 'center' }}>
        <div style={{
          width: '96px',
          height: '96px',
          background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 32px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.4)'
        }}>
          <span style={{ fontSize: '48px', fontWeight: 'bold' }}>BC</span>
        </div>
        
        <h1 style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '24px',
          lineHeight: '1.1'
        }}>
          BlackCnote Investment Platform
        </h1>
        
        <p style={{
          fontSize: '1.25rem',
          color: '#cbd5e1',
          marginBottom: '48px',
          maxWidth: '600px',
          margin: '0 auto 48px'
        }}>
          Advanced AI-powered investment platform with dynamic APY rates, 
          smart portfolio management, and comprehensive security features.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '64px' }}>
          <a
            href="/register"
            style={{
              background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
              padding: '16px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              color: 'white',
              fontSize: '18px',
              fontWeight: '600',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
            }}
          >
            Start Investing Now
          </a>
          <a
            href="/calculator"
            style={{
              border: '1px solid #475569',
              padding: '16px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              color: 'white',
              fontSize: '18px',
              fontWeight: '600'
            }}
          >
            Calculate Returns
          </a>
        </div>
        
        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            border: '1px solid #475569'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>
              $12,450
            </div>
            <div style={{ color: '#94a3b8' }}>Total Invested</div>
          </div>
          
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            border: '1px solid #475569'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '8px' }}>
              $2,180
            </div>
            <div style={{ color: '#94a3b8' }}>Total Profit</div>
          </div>
          
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            border: '1px solid #475569'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '8px' }}>
              5
            </div>
            <div style={{ color: '#94a3b8' }}>Active Plans</div>
          </div>
          
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            border: '1px solid #475569'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#a855f7', marginBottom: '8px' }}>
              17.5%
            </div>
            <div style={{ color: '#94a3b8' }}>Average ROI</div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div style={{
        height: '64px',
        backgroundColor: '#0f172a',
        borderTop: '1px solid #334155',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '64px'
      }}>
        <p style={{ color: '#94a3b8', margin: 0 }}>
          © 2025 BlackCnote Investment Platform. All rights reserved.
        </p>
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <div style={{
      height: '64px',
      backgroundColor: '#0f172a',
      borderTop: '1px solid #334155',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <p style={{ color: '#94a3b8', margin: 0 }}>
        © 2025 BlackCnote Investment Platform. All rights reserved.
      </p>
    </div>
  );
}

// App Router Component
function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <Header />
      
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/investments" component={Investments} />
        <Route path="/login" component={() => (
          <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>Login</h1>
              <p style={{ color: '#94a3b8' }}>Login functionality coming soon...</p>
            </div>
          </div>
        )} />
        <Route path="/register" component={() => (
          <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>Register</h1>
              <p style={{ color: '#94a3b8' }}>Registration functionality coming soon...</p>
            </div>
          </div>
        )} />
        <Route path="/calculator" component={() => (
          <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>ROI Calculator</h1>
              <p style={{ color: '#94a3b8' }}>Calculator functionality coming soon...</p>
            </div>
          </div>
        )} />
        <Route path="/news" component={() => (
          <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>News & Updates</h1>
              <p style={{ color: '#94a3b8' }}>News section coming soon...</p>
            </div>
          </div>
        )} />
        <Route component={() => (
          <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>404 - Page Not Found</h1>
              <p style={{ color: '#94a3b8' }}>The page you're looking for doesn't exist.</p>
            </div>
          </div>
        )} />
      </Switch>
      
      <Footer />
    </div>
  );
}

export default App;
