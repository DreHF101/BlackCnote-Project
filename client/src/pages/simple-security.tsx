export default function SimpleSecurity() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
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
            marginBottom: '20px',
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Security Center
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#94a3b8',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Manage your account security and enable advanced protection features for your investments
          </p>
        </div>

        {/* Security Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          marginBottom: '60px'
        }}>
          {/* Two-Factor Authentication */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '30px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>🔐</div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '4px' }}>
                  Two-Factor Authentication
                </h3>
                <div style={{
                  display: 'inline-block',
                  background: '#10b981',
                  color: 'white',
                  fontSize: '0.8rem',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: '500'
                }}>
                  ENABLED
                </div>
              </div>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '20px', lineHeight: '1.6' }}>
              Add an extra layer of security with time-based one-time passwords (TOTP) using Google Authenticator or similar apps.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                background: 'linear-gradient(90deg, #10b981, #059669)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Manage 2FA
              </button>
              <button style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Backup Codes
              </button>
            </div>
          </div>

          {/* Login Security */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '30px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>🔒</div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '4px' }}>
                  Login Security
                </h3>
                <div style={{
                  display: 'inline-block',
                  background: '#3b82f6',
                  color: 'white',
                  fontSize: '0.8rem',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: '500'
                }}>
                  ACTIVE
                </div>
              </div>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '20px', lineHeight: '1.6' }}>
              Monitor and manage your login sessions, view recent activity, and secure your account from unauthorized access.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                View Sessions
              </button>
              <button style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Change Password
              </button>
            </div>
          </div>

          {/* Account Verification */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '30px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>✅</div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '4px' }}>
                  Account Verification
                </h3>
                <div style={{
                  display: 'inline-block',
                  background: '#f59e0b',
                  color: 'white',
                  fontSize: '0.8rem',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: '500'
                }}>
                  VERIFIED
                </div>
              </div>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '20px', lineHeight: '1.6' }}>
              Your account is verified and ready for investments. Complete KYC verification increases your withdrawal limits.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                View Documents
              </button>
              <button style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Upgrade KYC
              </button>
            </div>
          </div>

          {/* Device Management */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '30px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>📱</div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '4px' }}>
                  Device Management
                </h3>
                <div style={{
                  display: 'inline-block',
                  background: '#8b5cf6',
                  color: 'white',
                  fontSize: '0.8rem',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: '500'
                }}>
                  3 DEVICES
                </div>
              </div>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '20px', lineHeight: '1.6' }}>
              Manage trusted devices and review login history to keep your account secure from unauthorized access.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                background: 'linear-gradient(90deg, #8b5cf6, #7c3aed)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Manage Devices
              </button>
              <button style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Login History
              </button>
            </div>
          </div>
        </div>

        {/* Security Score */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '20px'
          }}>
            Security Score
          </h3>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              border: '4px solid #10b981',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#10b981'
            }}>
              92%
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '4px' }}>
                Excellent Security
              </div>
              <div style={{ color: '#94a3b8' }}>
                Your account is well protected with strong security measures
              </div>
            </div>
          </div>
          <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
            Your security score is calculated based on enabled features, account verification status, and login patterns.
          </p>
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
            marginBottom: '20px'
          }}>
            Recent Security Activity
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { action: 'Successful login', location: 'New York, US', time: '2 hours ago', status: 'success' },
              { action: '2FA verification', location: 'New York, US', time: '2 hours ago', status: 'success' },
              { action: 'Password changed', location: 'New York, US', time: '3 days ago', status: 'warning' },
              { action: 'New device registered', location: 'New York, US', time: '1 week ago', status: 'info' }
            ].map((activity, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: activity.status === 'success' ? '#10b981' : 
                               activity.status === 'warning' ? '#f59e0b' : '#3b82f6'
                  }}></div>
                  <div>
                    <div style={{ fontWeight: '500' }}>{activity.action}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                      {activity.location}
                    </div>
                  </div>
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}