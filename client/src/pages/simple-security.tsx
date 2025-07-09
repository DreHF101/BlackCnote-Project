import { useState } from 'react';

export default function SimpleSecurity() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [deviceManagement, setDeviceManagement] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  const securityScore = 85; // Mock security score

  const trustedDevices = [
    { id: 1, name: 'Chrome on Windows', location: 'New York, US', lastUsed: '2 hours ago', current: true },
    { id: 2, name: 'Safari on iPhone', location: 'New York, US', lastUsed: '1 day ago', current: false },
    { id: 3, name: 'Firefox on MacBook', location: 'New York, US', lastUsed: '3 days ago', current: false }
  ];

  const recentActivity = [
    { id: 1, action: 'Login', device: 'Chrome on Windows', time: '2 hours ago', success: true },
    { id: 2, action: 'Password Changed', device: 'Chrome on Windows', time: '1 week ago', success: true },
    { id: 3, action: 'Login', device: 'Safari on iPhone', time: '1 day ago', success: true },
    { id: 4, action: 'Failed Login Attempt', device: 'Unknown Device', time: '2 days ago', success: false }
  ];

  const backupCodes = [
    '1234-5678-9012',
    '3456-7890-1234',
    '5678-9012-3456',
    '7890-1234-5678',
    '9012-3456-7890'
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
            background: 'linear-gradient(90deg, #ef4444, #dc2626)',
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

        {/* Security Score */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '50px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '20px'
          }}>
            🛡️
          </div>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            Security Score: {securityScore}/100
          </h2>
          <div style={{
            width: '100%',
            maxWidth: '400px',
            height: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            margin: '0 auto 20px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${securityScore}%`,
              height: '100%',
              background: securityScore >= 80 ? 'linear-gradient(90deg, #10b981, #059669)' : 
                         securityScore >= 60 ? 'linear-gradient(90deg, #f59e0b, #ea580c)' : 
                         'linear-gradient(90deg, #ef4444, #dc2626)',
              borderRadius: '6px',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
          <p style={{
            color: '#94a3b8',
            fontSize: '1rem'
          }}>
            {securityScore >= 80 ? 'Excellent security! Your account is well protected.' :
             securityScore >= 60 ? 'Good security, but there\'s room for improvement.' :
             'Your account needs better security measures.'}
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
                background: twoFactorEnabled ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #6b7280, #4b5563)',
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
                  background: twoFactorEnabled ? '#10b981' : '#6b7280',
                  color: 'white',
                  fontSize: '0.8rem',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: '500'
                }}>
                  {twoFactorEnabled ? 'ENABLED' : 'DISABLED'}
                </div>
              </div>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '20px', lineHeight: '1.6' }}>
              Add an extra layer of security with time-based one-time passwords (TOTP) using Google Authenticator or similar apps.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setShowQRCode(!showQRCode)}
                style={{
                  background: 'linear-gradient(90deg, #10b981, #059669)',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                {twoFactorEnabled ? 'Manage 2FA' : 'Enable 2FA'}
              </button>
              <button 
                onClick={() => setShowBackupCodes(!showBackupCodes)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Backup Codes
              </button>
            </div>
          </div>

          {/* Login Alerts */}
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
                background: loginAlerts ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'linear-gradient(135deg, #6b7280, #4b5563)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>🚨</div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '4px' }}>
                  Login Alerts
                </h3>
                <div style={{
                  display: 'inline-block',
                  background: loginAlerts ? '#3b82f6' : '#6b7280',
                  color: 'white',
                  fontSize: '0.8rem',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: '500'
                }}>
                  {loginAlerts ? 'ENABLED' : 'DISABLED'}
                </div>
              </div>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '20px', lineHeight: '1.6' }}>
              Get notified via email when someone logs into your account from a new device or location.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setLoginAlerts(!loginAlerts)}
                style={{
                  background: loginAlerts ? 'linear-gradient(90deg, #ef4444, #dc2626)' : 'linear-gradient(90deg, #3b82f6, #2563eb)',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                {loginAlerts ? 'Disable' : 'Enable'}
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
                Settings
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
                  {trustedDevices.length} DEVICES
                </div>
              </div>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '20px', lineHeight: '1.6' }}>
              Manage and monitor all devices that have access to your account.
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
            </div>
          </div>

          {/* Password Security */}
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
              }}>🔑</div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '4px' }}>
                  Password Security
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
                  STRONG
                </div>
              </div>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '20px', lineHeight: '1.6' }}>
              Keep your password secure and change it regularly. Last changed 2 weeks ago.
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
                background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
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
                  background: '#06b6d4',
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
              Your email and phone number are verified. Complete KYC verification for higher limits.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                background: 'linear-gradient(90deg, #06b6d4, #0891b2)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Complete KYC
              </button>
            </div>
          </div>

          {/* Session Management */}
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
                background: 'linear-gradient(135deg, #ec4899, #db2777)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>⏱️</div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '4px' }}>
                  Session Management
                </h3>
                <div style={{
                  display: 'inline-block',
                  background: '#ec4899',
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
              Manage your login sessions and logout from all devices if needed.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                background: 'linear-gradient(90deg, #ec4899, #db2777)',
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
                Logout All
              </button>
            </div>
          </div>
        </div>

        {/* QR Code Modal */}
        {showQRCode && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '400px',
              width: '90%',
              textAlign: 'center',
              color: '#1f2937'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
                Setup Two-Factor Authentication
              </h3>
              <div style={{
                width: '200px',
                height: '200px',
                background: '#f3f4f6',
                borderRadius: '12px',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                color: '#6b7280'
              }}>
                QR Code Would Appear Here
              </div>
              <p style={{ color: '#6b7280', marginBottom: '20px', lineHeight: '1.6' }}>
                Scan this QR code with your authenticator app to set up 2FA.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button 
                  onClick={() => setShowQRCode(false)}
                  style={{
                    background: '#6b7280',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button style={{
                  background: 'linear-gradient(90deg, #10b981, #059669)',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Confirm Setup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Backup Codes Modal */}
        {showBackupCodes && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '500px',
              width: '90%',
              textAlign: 'center',
              color: '#1f2937'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
                Backup Codes
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '20px', lineHeight: '1.6' }}>
                Use these backup codes to access your account if you lose your authenticator device.
              </p>
              <div style={{
                background: '#f3f4f6',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px'
              }}>
                {backupCodes.map((code, index) => (
                  <div key={index} style={{
                    fontFamily: 'monospace',
                    fontSize: '1.1rem',
                    padding: '5px 0',
                    borderBottom: index < backupCodes.length - 1 ? '1px solid #e5e7eb' : 'none'
                  }}>
                    {code}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button 
                  onClick={() => setShowBackupCodes(false)}
                  style={{
                    background: '#6b7280',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
                <button style={{
                  background: 'linear-gradient(90deg, #3b82f6, #2563eb)',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Download Codes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Trusted Devices */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '50px'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span>📱</span>
            Trusted Devices
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {trustedDevices.map((device) => (
              <div key={device.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                border: device.current ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '5px'
                  }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                      {device.name}
                    </h3>
                    {device.current && (
                      <span style={{
                        background: '#10b981',
                        color: 'white',
                        fontSize: '0.7rem',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontWeight: '500'
                      }}>
                        CURRENT
                      </span>
                    )}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#94a3b8'
                  }}>
                    {device.location} • Last used {device.lastUsed}
                  </div>
                </div>
                <button style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  color: '#ef4444',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #ef4444',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '50px'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span>📋</span>
            Recent Security Activity
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {recentActivity.map((activity) => (
              <div key={activity.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                border: activity.success ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #ef4444'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: activity.success ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>
                    {activity.success ? '✅' : '❌'}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      marginBottom: '3px'
                    }}>
                      {activity.action}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#94a3b8'
                    }}>
                      {activity.device} • {activity.time}
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: activity.success ? '#10b981' : '#ef4444',
                  fontWeight: '600'
                }}>
                  {activity.success ? 'SUCCESS' : 'FAILED'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Tips */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '20px'
          }}>
            💡
          </div>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            Security Tips
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            textAlign: 'left'
          }}>
            {[
              {
                icon: '🔒',
                title: 'Use Strong Passwords',
                description: 'Create unique passwords with a mix of letters, numbers, and symbols.'
              },
              {
                icon: '🔐',
                title: 'Enable 2FA',
                description: 'Always enable two-factor authentication for extra security.'
              },
              {
                icon: '📱',
                title: 'Keep Devices Updated',
                description: 'Regularly update your devices and apps to patch security vulnerabilities.'
              },
              {
                icon: '🚨',
                title: 'Monitor Your Account',
                description: 'Regularly check your account activity and report suspicious behavior.'
              }
            ].map((tip, index) => (
              <div key={index} style={{
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px'
              }}>
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '10px'
                }}>
                  {tip.icon}
                </div>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  {tip.title}
                </h3>
                <p style={{
                  color: '#94a3b8',
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}>
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
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