import { useState, useEffect, useRef } from "react";

interface Stats {
  totalUsers: number;
  totalInvested: number;
  totalPaid: number;
  activeInvestments: number;
}

interface InvestmentPlan {
  id: string;
  name: string;
  apy: string;
  dailyReturn: string;
  duration: number;
  minAmount: number;
  maxAmount: number;
  popular?: boolean;
  features: string[];
  tier: string;
  color: string;
  gradient: string;
}

const investmentPlans: InvestmentPlan[] = [
  {
    id: "starter",
    name: "Starter Plan",
    apy: "8.5%",
    dailyReturn: "0.28%",
    duration: 30,
    minAmount: 100,
    maxAmount: 5000,
    tier: "BEGINNER",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    features: ["Daily Returns", "Basic Support", "Mobile Access", "Real-time Tracking"]
  },
  {
    id: "professional",
    name: "Professional Plan",
    apy: "12.3%",
    dailyReturn: "0.41%",
    duration: 60,
    minAmount: 1000,
    maxAmount: 25000,
    popular: true,
    tier: "PROFESSIONAL",
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    features: ["Higher Returns", "Priority Support", "Advanced Analytics", "Portfolio Optimization"]
  },
  {
    id: "vip",
    name: "VIP Plan",
    apy: "15.8%",
    dailyReturn: "0.53%",
    duration: 90,
    minAmount: 5000,
    maxAmount: 100000,
    tier: "VIP",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    features: ["Premium Returns", "VIP Support", "Custom Strategies", "Personal Account Manager"]
  },
  {
    id: "elite",
    name: "Elite Growth",
    apy: "18.2%",
    dailyReturn: "0.61%",
    duration: 120,
    minAmount: 25000,
    maxAmount: 500000,
    tier: "ELITE",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    features: ["Elite Returns", "White-Glove Service", "AI Portfolio Management", "Exclusive Events"]
  }
];

const features = [
  {
    icon: "🔒",
    title: "Bank-Level Security",
    description: "Military-grade encryption, 2FA authentication, and multi-layer security protocols protect your investments.",
    color: "#10b981"
  },
  {
    icon: "🤖",
    title: "AI-Powered Returns",
    description: "Advanced AI algorithms optimize your portfolio for maximum returns with dynamic APY adjustments.",
    color: "#3b82f6"
  },
  {
    icon: "⏰",
    title: "24/7 Real-Time Support",
    description: "Round-the-clock customer support with dedicated account managers and instant live chat.",
    color: "#f59e0b"
  },
  {
    icon: "📱",
    title: "Mobile-First Platform",
    description: "Trade anywhere with our PWA mobile app, offline capabilities, and push notifications.",
    color: "#8b5cf6"
  },
  {
    icon: "🌍",
    title: "Global Accessibility",
    description: "Multi-currency support, instant withdrawals, and compliance with international regulations.",
    color: "#ef4444"
  },
  {
    icon: "👥",
    title: "Expert Team",
    description: "Managed by seasoned financial professionals with decades of combined investment experience.",
    color: "#06b6d4"
  }
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Technology Entrepreneur",
    avatar: "SC",
    investment: "$15,000",
    returns: "+$2,847",
    rating: 5,
    comment: "BlackCnote's AI-powered investment platform has completely transformed my portfolio. The consistent returns and professional support are truly exceptional.",
    timeframe: "8 months"
  },
  {
    name: "Marcus Johnson",
    role: "Business Owner",
    avatar: "MJ",
    investment: "$32,000",
    returns: "+$6,240",
    rating: 5,
    comment: "The security features and transparency give me complete peace of mind. I've been investing for over a year and the results consistently exceed expectations.",
    timeframe: "14 months"
  },
  {
    name: "Elena Rodriguez",
    role: "Financial Advisor",
    avatar: "ER",
    investment: "$47,500",
    returns: "+$9,125",
    rating: 5,
    comment: "Outstanding platform with institutional-grade features. The AI recommendations and portfolio optimization tools are absolute game-changers.",
    timeframe: "6 months"
  }
];

export default function UltimateHomeFixed() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 15420,
    totalInvested: 28475000,
    totalPaid: 31568000,
    activeInvestments: 8920
  });

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Mouse position tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', overflow: 'hidden' }}>
      {/* Floating Particles Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              background: 'rgba(245, 158, 11, 0.3)',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 10}s infinite linear`,
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section ref={heroRef} style={{
        position: 'relative',
        zIndex: 2,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px',
        background: `linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))`,
        transform: `translateY(${scrollY * 0.5}px)`
      }}>
        <div style={{ maxWidth: '1200px', textAlign: 'center' }}>
          {/* BlackCnote Logo */}
          <div style={{
            marginBottom: '40px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '30px',
            display: 'inline-block'
          }}>
            <img 
              src="/assets/img/hero-logo.png" 
              alt="BlackCnote" 
              style={{
                height: '80px',
                filter: 'drop-shadow(0 10px 30px rgba(245, 158, 11, 0.3))'
              }}
            />
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 'bold',
            marginBottom: '24px',
            background: 'linear-gradient(90deg, #f59e0b, #ea580c, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% 100%',
            animation: 'gradient 3s ease infinite'
          }}>
            The Future of AI-Powered Investment
          </h1>

          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            color: '#cbd5e1',
            marginBottom: '50px',
            maxWidth: '800px',
            margin: '0 auto 50px',
            lineHeight: '1.6'
          }}>
            Join thousands of intelligent investors earning consistent returns with BlackCnote's 
            revolutionary AI-powered investment platform. Start with as little as $100 and watch 
            your wealth grow with bank-level security and 24/7 professional support.
          </p>

          {/* Trust Indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            marginBottom: '50px',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#10b981', fontSize: '2rem', marginBottom: '8px' }}>🔒</div>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Bank-Level Security</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#3b82f6', fontSize: '2rem', marginBottom: '8px' }}>⚡</div>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Instant Processing</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#f59e0b', fontSize: '2rem', marginBottom: '8px' }}>🌍</div>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Global Platform</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#8b5cf6', fontSize: '2rem', marginBottom: '8px' }}>🤖</div>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>AI-Powered</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a
              href="/register"
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                padding: '18px 40px',
                borderRadius: '50px',
                textDecoration: 'none',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)',
                transition: 'all 0.3s ease',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(245, 158, 11, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(245, 158, 11, 0.3)';
              }}
            >
              Start Investing Now
              <span style={{ fontSize: '1.2rem' }}>🚀</span>
            </a>
            
            <a
              href="/calculator"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '18px 40px',
                borderRadius: '50px',
                textDecoration: 'none',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              Calculate Returns
              <span style={{ fontSize: '1.2rem' }}>🧮</span>
            </a>
          </div>
        </div>
      </section>

      {/* Live Stats Dashboard */}
      <section style={{
        position: 'relative',
        zIndex: 2,
        padding: '80px 20px',
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 'bold',
            marginBottom: '60px',
            background: 'linear-gradient(90deg, #fff, #cbd5e1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Platform Performance
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginBottom: '60px'
          }}>
            {[
              { label: 'Active Users', value: formatNumber(stats.totalUsers), icon: '👥', color: '#10b981' },
              { label: 'Total Invested', value: formatCurrency(stats.totalInvested), icon: '💰', color: '#3b82f6' },
              { label: 'Total Paid Out', value: formatCurrency(stats.totalPaid), icon: '💎', color: '#f59e0b' },
              { label: 'Active Investments', value: formatNumber(stats.activeInvestments), icon: '📈', color: '#8b5cf6' }
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: '40px 20px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${stat.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '15px',
                  filter: `drop-shadow(0 0 20px ${stat.color})`
                }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  fontWeight: 'bold',
                  color: stat.color,
                  marginBottom: '10px',
                  fontFamily: 'monospace'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: '#94a3b8',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
                
                {/* Pulse Effect */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${stat.color}20, transparent)`,
                  transform: 'translate(-50%, -50%)',
                  animation: 'pulse 3s infinite',
                  zIndex: -1
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Plans */}
      <section style={{
        position: 'relative',
        zIndex: 2,
        padding: '80px 20px',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.8))'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 'bold',
              marginBottom: '20px',
              background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Investment Plans
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#cbd5e1',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Choose from our carefully crafted investment plans designed to maximize your returns
              while minimizing risk through advanced AI portfolio optimization.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {investmentPlans.map((plan, index) => (
              <div
                key={plan.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: plan.popular ? `2px solid ${plan.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: '40px 30px',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = `0 25px 50px ${plan.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-1px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: plan.gradient,
                    color: 'white',
                    padding: '8px 24px',
                    borderRadius: '0 0 12px 12px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    Most Popular
                  </div>
                )}

                <div style={{
                  display: 'inline-block',
                  background: plan.gradient,
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                  marginTop: plan.popular ? '20px' : '0'
                }}>
                  {plan.tier}
                </div>

                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '15px'
                }}>
                  {plan.name}
                </h3>

                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: plan.color,
                  marginBottom: '10px'
                }}>
                  {plan.apy}
                </div>

                <div style={{
                  fontSize: '1rem',
                  color: '#94a3b8',
                  marginBottom: '30px'
                }}>
                  {plan.dailyReturn} daily • {plan.duration} days
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '30px'
                }}>
                  <div style={{ marginBottom: '10px', color: '#cbd5e1' }}>
                    Investment Range
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>
                    {formatCurrency(plan.minAmount)} - {formatCurrency(plan.maxAmount)}
                  </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '10px',
                      color: '#cbd5e1'
                    }}>
                      <span style={{ color: plan.color }}>✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="/register"
                  style={{
                    display: 'block',
                    background: plan.gradient,
                    color: 'white',
                    padding: '15px 30px',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        position: 'relative',
        zIndex: 2,
        padding: '80px 20px',
        background: 'rgba(15, 23, 42, 0.9)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: 'white'
            }}>
              Why Choose BlackCnote?
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#cbd5e1',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Experience the next generation of investment technology with features designed 
              for modern investors who demand excellence.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: '40px 30px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = feature.color;
                  e.currentTarget.style.boxShadow = `0 20px 40px ${feature.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '20px',
                  filter: `drop-shadow(0 0 20px ${feature.color})`
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '15px'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#cbd5e1',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{
        position: 'relative',
        zIndex: 2,
        padding: '80px 20px',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.8))'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 'bold',
            marginBottom: '60px',
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            What Our Investors Say
          </h2>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '30px',
            padding: '50px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{
                  display: index === currentTestimonial ? 'block' : 'none',
                  opacity: index === currentTestimonial ? 1 : 0,
                  transition: 'all 0.5s ease'
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  margin: '0 auto 30px'
                }}>
                  {testimonial.avatar}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '4px',
                  marginBottom: '20px'
                }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} style={{ color: '#f59e0b', fontSize: '1.5rem' }}>★</span>
                  ))}
                </div>

                <blockquote style={{
                  fontSize: '1.3rem',
                  fontStyle: 'italic',
                  color: '#cbd5e1',
                  lineHeight: '1.6',
                  marginBottom: '30px',
                  maxWidth: '700px',
                  margin: '0 auto 30px'
                }}>
                  "{testimonial.comment}"
                </blockquote>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '40px',
                  marginBottom: '20px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {testimonial.investment}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Invested</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#f59e0b', fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {testimonial.returns}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Returns</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#8b5cf6', fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {testimonial.timeframe}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Duration</div>
                  </div>
                </div>

                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '5px'
                }}>
                  {testimonial.name}
                </div>
                <div style={{
                  color: '#94a3b8'
                }}>
                  {testimonial.role}
                </div>
              </div>
            ))}

            {/* Testimonial Indicators */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '40px'
            }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    background: index === currentTestimonial ? '#f59e0b' : 'rgba(255, 255, 255, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{
        position: 'relative',
        zIndex: 2,
        padding: '100px 20px',
        background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '20px'
          }}>
            Ready to Start Your Investment Journey?
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Join thousands of successful investors who trust BlackCnote with their financial future. 
            Start earning consistent returns today with our AI-powered investment platform.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a
              href="/register"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(20px)',
                border: '2px solid white',
                color: 'white',
                padding: '18px 40px',
                borderRadius: '50px',
                textDecoration: 'none',
                fontSize: '1.2rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#f59e0b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.color = 'white';
              }}
            >
              Start Investing Now
            </a>
            
            <a
              href="/about"
              style={{
                background: 'transparent',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                color: 'white',
                padding: '18px 40px',
                borderRadius: '50px',
                textDecoration: 'none',
                fontSize: '1.2rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'white';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          100% { transform: translateY(0px) rotate(360deg); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}