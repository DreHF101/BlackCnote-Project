import { useState } from "react";

export default function EnhancedAbout() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Years of Experience", value: "8+", icon: "🏆" },
    { label: "Active Investors", value: "25,000+", icon: "👥" },
    { label: "Total Invested", value: "$120M+", icon: "💰" },
    { label: "Countries Served", value: "65+", icon: "🌍" },
  ];

  const team = [
    {
      name: "Marcus Johnson",
      role: "Chief Executive Officer",
      experience: "15+ years in investment management",
      expertise: "Strategic Leadership, Risk Management, Portfolio Optimization",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Sarah Chen",
      role: "Chief Technology Officer",
      experience: "12+ years in fintech development",
      expertise: "Blockchain Technology, AI/ML, Cybersecurity",
      image: "/api/placeholder/200/200"
    },
    {
      name: "David Rodriguez",
      role: "Chief Financial Officer",
      experience: "18+ years in financial services",
      expertise: "Financial Planning, Regulatory Compliance, Risk Assessment",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Emily Thompson",
      role: "Head of Operations",
      experience: "10+ years in operations management",
      expertise: "Process Optimization, Customer Success, Quality Assurance",
      image: "/api/placeholder/200/200"
    },
  ];

  const milestones = [
    { year: "2016", event: "BlackCnote founded with initial $1M seed funding" },
    { year: "2017", event: "Launched first investment platform, reached 1,000 users" },
    { year: "2018", event: "Expanded to 10 countries, introduced mobile app" },
    { year: "2019", event: "Achieved $10M in total investments, launched crypto trading" },
    { year: "2020", event: "Introduced AI-powered investment recommendations" },
    { year: "2021", event: "Reached 15,000 active investors, launched referral program" },
    { year: "2022", event: "Expanded to 45 countries, implemented advanced security features" },
    { year: "2023", event: "Launched HYIPLab integration and cross-platform compatibility" },
    { year: "2024", event: "Achieved $120M+ total investments, 25,000+ active investors" },
  ];

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
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '30px'
          }}>
            <img 
              src="/assets/img/hero-logo.png" 
              alt="BlackCnote Investment Platform" 
              style={{
                height: '80px',
                width: 'auto',
                filter: 'drop-shadow(0 8px 25px rgba(245, 158, 11, 0.3))'
              }}
            />
          </div>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            About BlackCnote
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: '#94a3b8',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Pioneering the future of digital investments since 2016, BlackCnote has evolved from a startup vision 
            into a global investment platform trusted by thousands of investors worldwide.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '50px',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'team', label: 'Our Team' },
            { id: 'history', label: 'Our Journey' },
            { id: 'mission', label: 'Mission & Vision' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id 
                  ? 'linear-gradient(90deg, #f59e0b, #ea580c)' 
                  : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Section */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px',
              marginBottom: '60px'
            }}>
              {stats.map((stat, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '30px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{stat.icon}</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px', color: '#f59e0b' }}>
                    {stat.value}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Company Description */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '40px',
              marginBottom: '40px'
            }}>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '25px',
                textAlign: 'center'
              }}>
                Who We Are
              </h2>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#e2e8f0',
                marginBottom: '20px'
              }}>
                BlackCnote is a cutting-edge investment platform that combines traditional financial wisdom with modern technology. 
                We specialize in High-Yield Investment Programs (HYIP) and have built a reputation for transparency, security, and consistent returns.
              </p>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#e2e8f0',
                marginBottom: '20px'
              }}>
                Our platform leverages advanced algorithms, AI-powered recommendations, and comprehensive risk management to maximize 
                returns while minimizing exposure. We serve over 25,000 active investors across 65+ countries, managing over $120M in investments.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginTop: '30px',
                flexWrap: 'wrap'
              }}>
                <a href="/investments" style={{
                  background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
                  color: 'white',
                  padding: '14px 28px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  🚀 Start Investing
                </a>
                <a href="/contact" style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  padding: '14px 28px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  💬 Contact Us
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Meet Our Leadership Team
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
              marginBottom: '40px'
            }}>
              {team.map((member, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '30px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                    margin: '0 auto 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: 'white'
                  }}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    marginBottom: '5px'
                  }}>
                    {member.name}
                  </h3>
                  <p style={{
                    color: '#f59e0b',
                    fontWeight: '600',
                    marginBottom: '10px'
                  }}>
                    {member.role}
                  </p>
                  <p style={{
                    color: '#94a3b8',
                    fontSize: '0.9rem',
                    marginBottom: '15px'
                  }}>
                    {member.experience}
                  </p>
                  <p style={{
                    color: '#e2e8f0',
                    fontSize: '0.9rem',
                    lineHeight: '1.4'
                  }}>
                    <strong>Expertise:</strong> {member.expertise}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Our Journey
            </h2>
            <div style={{
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {milestones.map((milestone, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  marginBottom: '30px',
                  padding: '20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    {milestone.year}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: '1.1rem',
                      lineHeight: '1.5',
                      color: '#e2e8f0'
                    }}>
                      {milestone.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'mission' && (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '40px',
              marginBottom: '40px'
            }}>
              {/* Mission */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '40px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '25px'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>🎯</div>
                  <h3 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}>
                    Our Mission
                  </h3>
                </div>
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  color: '#e2e8f0'
                }}>
                  To democratize access to high-yield investment opportunities by providing a secure, transparent, and 
                  user-friendly platform that empowers individuals to build wealth and achieve financial independence 
                  through smart investing.
                </p>
              </div>

              {/* Vision */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '40px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '25px'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>🔮</div>
                  <h3 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}>
                    Our Vision
                  </h3>
                </div>
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  color: '#e2e8f0'
                }}>
                  To become the world's leading investment platform by continuously innovating with cutting-edge technology, 
                  AI-powered insights, and comprehensive financial solutions that make investing accessible to everyone, 
                  everywhere.
                </p>
              </div>
            </div>

            {/* Values */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '40px'
            }}>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '30px',
                textAlign: 'center'
              }}>
                Our Core Values
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '25px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🔒</div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Security</h4>
                  <p style={{ color: '#94a3b8', lineHeight: '1.5' }}>
                    Your investments are protected with bank-grade security and advanced encryption.
                  </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🏃</div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Transparency</h4>
                  <p style={{ color: '#94a3b8', lineHeight: '1.5' }}>
                    Clear, honest communication about risks, returns, and all aspects of your investments.
                  </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🚀</div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Innovation</h4>
                  <p style={{ color: '#94a3b8', lineHeight: '1.5' }}>
                    Continuously evolving with the latest technology and market insights.
                  </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🤝</div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Integrity</h4>
                  <p style={{ color: '#94a3b8', lineHeight: '1.5' }}>
                    Ethical practices and fair treatment of all investors, regardless of investment size.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center',
          marginTop: '50px'
        }}>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            Ready to Start Your Investment Journey?
          </h3>
          <p style={{
            fontSize: '1.1rem',
            color: '#94a3b8',
            marginBottom: '30px',
            maxWidth: '600px',
            margin: '0 auto 30px'
          }}>
            Join thousands of investors who trust BlackCnote with their financial future. Start with as little as $100 and watch your wealth grow.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <a href="/register" style={{
              background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🚀 Get Started Now
            </a>
            <a href="/calculator" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.1rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📊 Try Calculator
            </a>
            <a href="/contact" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.1rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              💬 Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}