import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

interface HeaderProps {
  isAuthenticated?: boolean;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
}

export function EnhancedHeader({ isAuthenticated = false, user, onLogout }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsMoreDropdownOpen(false);
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const mainNavigation = [
    { name: 'About', href: '/about', icon: '🏢' },
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Investments', href: '/investments', icon: '💰' },
    { name: 'Calculator', href: '/calculator', icon: '🧮' },
  ];

  const moreNavigation = {
    'Information': [
      { name: 'Contact', href: '/contact', icon: '📞', description: 'Get in touch with our team' },
      { name: 'Help & FAQ', href: '/help', icon: '❓', description: 'Support and documentation' },
      { name: 'News & Updates', href: '/news', icon: '📰', description: 'Latest platform news' },
    ],
    'Advanced Tools': [
      { name: 'AI Assistant', href: '/ai-assistant', icon: '🤖', description: 'AI-powered investment advice' },
      { name: 'Analytics', href: '/analytics', icon: '📈', description: 'Advanced portfolio analytics' },
      { name: 'Security Center', href: '/security', icon: '🔒', description: 'Manage your account security' },
    ],
    'Financial': [
      { name: 'Deposits', href: '/deposits', icon: '💳', description: 'Fund your account' },
      { name: 'Withdrawals', href: '/withdraw', icon: '🏦', description: 'Withdraw your earnings' },
      { name: 'Transactions', href: '/transactions', icon: '📋', description: 'View transaction history' },
      { name: 'Referrals', href: '/referrals', icon: '👥', description: 'Earn referral commissions' },
    ]
  };

  const isActivePath = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location?.startsWith(path)) return true;
    return false;
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: scrolled 
        ? 'rgba(15, 23, 42, 0.95)' 
        : 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      boxShadow: scrolled ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '80px'
        }}>
          
          {/* Enhanced Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                textDecoration: 'none',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{
                position: 'relative',
                padding: '8px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <img 
                  src="/assets/img/header-logo.png" 
                  alt="BlackCnote Investment Platform" 
                  style={{
                    height: '40px',
                    width: 'auto',
                    filter: 'drop-shadow(0 4px 12px rgba(245, 158, 11, 0.3))'
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: '1.2'
                }}>
                  BlackCnote
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  fontWeight: '500'
                }}>
                  Investment Platform
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {/* Main Navigation Items */}
            {mainNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: isActivePath(item.href) ? '#f59e0b' : '#cbd5e1',
                  background: isActivePath(item.href) 
                    ? 'rgba(245, 158, 11, 0.1)' 
                    : 'transparent',
                  border: '1px solid',
                  borderColor: isActivePath(item.href) 
                    ? 'rgba(245, 158, 11, 0.2)' 
                    : 'transparent',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (!isActivePath(item.href)) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#f8fafc';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActivePath(item.href)) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#cbd5e1';
                  }
                }}
              >
                <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                {item.name}
                {isActivePath(item.href) && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60%',
                    height: '3px',
                    background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
                    borderRadius: '2px'
                  }} />
                )}
              </a>
            ))}

            {/* Enhanced More Dropdown */}
            <div 
              className="dropdown-container"
              style={{ position: 'relative' }}
            >
              <button
                onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  background: isMoreDropdownOpen 
                    ? 'rgba(245, 158, 11, 0.1)' 
                    : 'transparent',
                  border: '1px solid',
                  borderColor: isMoreDropdownOpen 
                    ? 'rgba(245, 158, 11, 0.2)' 
                    : 'transparent',
                  color: isMoreDropdownOpen ? '#f59e0b' : '#cbd5e1',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isMoreDropdownOpen) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#f8fafc';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMoreDropdownOpen) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#cbd5e1';
                  }
                }}
              >
                <span style={{ fontSize: '1rem' }}>⚡</span>
                More
                <span style={{
                  fontSize: '0.8rem',
                  transform: isMoreDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}>
                  ▼
                </span>
              </button>

              {/* Enhanced Dropdown Menu */}
              {isMoreDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  right: 0,
                  width: '750px',
                  background: 'rgba(15, 23, 42, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: '30px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
                  zIndex: 1000,
                  animation: 'dropdownSlideIn 0.3s ease-out'
                }}>
                  {/* Dropdown Header */}
                  <div style={{
                    marginBottom: '25px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <h3 style={{
                      color: '#f8fafc',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      marginBottom: '8px'
                    }}>
                      Explore More Features
                    </h3>
                    <p style={{
                      color: '#94a3b8',
                      fontSize: '0.9rem'
                    }}>
                      Access advanced tools and comprehensive platform features
                    </p>
                  </div>

                  {/* Navigation Categories */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '25px'
                  }}>
                    {Object.entries(moreNavigation).map(([category, items]) => (
                      <div key={category}>
                        <h4 style={{
                          color: '#f59e0b',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          marginBottom: '15px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {category}
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {items.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px',
                                padding: '12px',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                background: 'transparent'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                              }}
                              onClick={() => setIsMoreDropdownOpen(false)}
                            >
                              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                              <div style={{ flex: 1 }}>
                                <div style={{
                                  color: '#f8fafc',
                                  fontSize: '0.9rem',
                                  fontWeight: '600',
                                  marginBottom: '4px'
                                }}>
                                  {item.name}
                                </div>
                                <div style={{
                                  color: '#94a3b8',
                                  fontSize: '0.8rem',
                                  lineHeight: '1.4'
                                }}>
                                  {item.description}
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Call to Action */}
                  <div style={{
                    marginTop: '25px',
                    paddingTop: '20px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    textAlign: 'center'
                  }}>
                    <a
                      href="/register"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 24px',
                        background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
                        color: 'white',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <span>🚀</span>
                      Start Investing Today
                    </a>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* User Actions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            {isAuthenticated && user ? (
              // Authenticated User Menu
              <div 
                className="dropdown-container"
                style={{ position: 'relative' }}
              >
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1rem'
                  }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      color: '#f8fafc',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      {user.name}
                    </span>
                    <span style={{
                      color: '#94a3b8',
                      fontSize: '0.8rem'
                    }}>
                      Premium Plan
                    </span>
                  </div>
                  <span style={{
                    color: '#94a3b8',
                    fontSize: '0.8rem',
                    transform: isUserDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}>
                    ▼
                  </span>
                </button>

                {/* User Dropdown */}
                {isUserDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    right: 0,
                    width: '280px',
                    background: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                    zIndex: 1000
                  }}>
                    <div style={{
                      textAlign: 'center',
                      marginBottom: '20px',
                      paddingBottom: '15px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.3rem',
                        margin: '0 auto 12px'
                      }}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div style={{ color: '#f8fafc', fontWeight: '600', marginBottom: '4px' }}>
                        {user.name}
                      </div>
                      <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                        {user.email}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        { name: 'Dashboard', href: '/dashboard', icon: '📊' },
                        { name: 'Profile', href: '/profile', icon: '👤' },
                        { name: 'Security', href: '/security', icon: '🔒' },
                        { name: 'Transactions', href: '/transactions', icon: '📋' },
                      ].map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            color: '#cbd5e1',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.currentTarget.style.color = '#f8fafc';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#cbd5e1';
                          }}
                        >
                          <span>{item.icon}</span>
                          {item.name}
                        </a>
                      ))}
                      
                      <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.1)', margin: '8px 0' }} />
                      
                      <button
                        onClick={onLogout}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px',
                          borderRadius: '10px',
                          background: 'transparent',
                          border: 'none',
                          color: '#ef4444',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          width: '100%',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <span>🚪</span>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Guest Actions
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <a
                  href="/login"
                  style={{
                    padding: '10px 20px',
                    color: '#cbd5e1',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    borderRadius: '10px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  Sign In
                </a>
                <a
                  href="/register"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    borderRadius: '12px',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.3)';
                  }}
                >
                  <span>🚀</span>
                  Get Started
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes dropdownSlideIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </header>
  );
}