export default function SimpleReferrals() {
  const referralCode = "BLACKCNOTE2025";
  const referralLink = `https://blackcnote.com/register?ref=${referralCode}`;

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
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px'
          }}>
            Referral Program
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#94a3b8',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Earn generous commissions by referring friends and family to BlackCnote. The more you share, the more you earn!
          </p>
        </div>

        {/* Statistics Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '50px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '25px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎯</div>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#3b82f6',
              marginBottom: '4px'
            }}>12</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Total Referrals</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '25px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💰</div>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#10b981',
              marginBottom: '4px'
            }}>$2,450</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Total Earned</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '25px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>⚡</div>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#f59e0b',
              marginBottom: '4px'
            }}>8</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Active This Month</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '25px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏆</div>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#8b5cf6',
              marginBottom: '4px'
            }}>15%</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Commission Rate</div>
          </div>
        </div>

        {/* Share Your Link */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '40px',
          marginBottom: '40px'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#fff',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            Share Your Referral Link
          </h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '20px'
          }}>
            <input
              type="text"
              value={referralLink}
              readOnly
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button
              onClick={() => navigator.clipboard.writeText(referralLink)}
              style={{
                background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Copy
            </button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
              Your referral code: <strong style={{ color: '#f59e0b' }}>{referralCode}</strong>
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button style={{
                background: 'linear-gradient(90deg, #1d4ed8, #3730a3)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}>
                📧 Share via Email
              </button>
              <button style={{
                background: 'linear-gradient(90deg, #059669, #047857)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}>
                💬 Share via WhatsApp
              </button>
              <button style={{
                background: 'linear-gradient(90deg, #7c3aed, #6d28d9)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}>
                📱 Share via SMS
              </button>
            </div>
          </div>
        </div>

        {/* Commission Structure */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          marginBottom: '50px'
        }}>
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
              marginBottom: '20px'
            }}>
              💰 Commission Structure
            </h3>
            <div style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}>
                <span>Level 1 (Direct):</span>
                <strong style={{ color: '#10b981' }}>15%</strong>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}>
                <span>Level 2:</span>
                <strong style={{ color: '#3b82f6' }}>8%</strong>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}>
                <span>Level 3:</span>
                <strong style={{ color: '#f59e0b' }}>5%</strong>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 0'
              }}>
                <span>Level 4+:</span>
                <strong style={{ color: '#8b5cf6' }}>2%</strong>
              </div>
            </div>
          </div>

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
              marginBottom: '20px'
            }}>
              🎯 How It Works
            </h3>
            <div style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
              <div style={{ marginBottom: '16px' }}>
                <strong>1. Share Your Link</strong><br />
                Copy your unique referral link and share it with friends, family, or on social media.
              </div>
              <div style={{ marginBottom: '16px' }}>
                <strong>2. They Sign Up</strong><br />
                When someone registers using your link and makes their first investment.
              </div>
              <div style={{ marginBottom: '16px' }}>
                <strong>3. You Earn Commission</strong><br />
                Receive 15% commission on their investment plus ongoing passive income.
              </div>
              <div>
                <strong>4. Build Your Network</strong><br />
                Earn from multiple levels as your referrals bring in their own referrals.
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
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
            color: '#fff',
            marginBottom: '25px'
          }}>
            📈 Recent Referral Activity
          </h3>
          <div style={{ color: '#cbd5e1' }}>
            {[
              { name: 'Sarah M.', amount: '$500', commission: '$75', time: '2 hours ago', level: 1 },
              { name: 'Mike R.', amount: '$1,200', commission: '$180', time: '1 day ago', level: 1 },
              { name: 'Emma K.', amount: '$800', commission: '$64', time: '2 days ago', level: 2 },
              { name: 'James L.', amount: '$300', commission: '$45', time: '3 days ago', level: 1 },
              { name: 'Lisa P.', amount: '$600', commission: '$30', time: '5 days ago', level: 2 }
            ].map((ref, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 0',
                borderBottom: index < 4 ? '1px solid rgba(255,255,255,0.1)' : 'none'
              }}>
                <div>
                  <div style={{ fontWeight: '500', marginBottom: '4px' }}>{ref.name}</div>
                  <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                    Level {ref.level} • {ref.time}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '500', color: '#10b981' }}>{ref.commission}</div>
                  <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>from {ref.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}