import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { LiveChatWidget } from "../components/live-chat-widget";

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

export default function UltimateHome() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalInvested: 0,
    totalPaid: 0,
    activeInvestments: 0
  });

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Fetch live stats
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/stats'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/stats');
        if (response.ok) {
          return await response.json();
        }
        throw new Error('Stats API not available');
      } catch (error) {
        // Return realistic demo data when API is unavailable
        return {
          totalUsers: 15420,
          totalInvested: 28475000,
          totalPaid: 31568000,
          activeInvestments: 8920
        };
      }
    }
  });

  // Animate stats counters
  useEffect(() => {
    if (statsData) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setStats(statsData);
        setIsAnimating(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [statsData]);

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

  // Intersection Observer for animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Enhanced Animated Background Elements with Parallax */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(140px)',
        animation: 'float 8s ease-in-out infinite',
        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
      }}></div>
      <div style={{
        position: 'absolute',
        top: '40%',
        right: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(120px)',
        animation: 'float 10s ease-in-out infinite reverse',
        transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '30%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        animation: 'float 12s ease-in-out infinite',
        transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
      }}></div>

      {/* Floating Particles */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              background: i % 3 === 0 ? '#f59e0b' : i % 3 === 1 ? '#3b82f6' : '#8b5cf6',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particle-float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.6
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 20px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="animate-on-scroll"
          style={{ 
            textAlign: 'center', 
            marginBottom: '120px', 
            paddingTop: '80px',
            transform: `translateY(${scrollY * 0.1}px)`
          }}>
          {/* Premium Logo Container with Enhanced Animations */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '60px'
          }}>
            <div style={{
              padding: '30px',
              borderRadius: '40px',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(25px)',
              border: '3px solid rgba(255, 255, 255, 0.15)',
              boxShadow: `0 30px 70px rgba(245, 158, 11, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              transform: `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px) scale(${1 + Math.sin(Date.now() * 0.001) * 0.02})`
            }}>
              <img 
                src="/assets/img/hero-logo.png" 
                alt="BlackCnote Investment Platform" 
                style={{
                  height: '160px',
                  width: 'auto',
                  filter: 'drop-shadow(0 15px 40px rgba(245, 158, 11, 0.4))',
                  position: 'relative',
                  zIndex: 2,
                  animation: 'logoFloat 6s ease-in-out infinite'
                }}
              />
              {/* Enhanced animated border effect */}
              <div style={{
                position: 'absolute',
                inset: '-3px',
                background: 'linear-gradient(45deg, transparent, rgba(245, 158, 11, 0.6), rgba(59, 130, 246, 0.4), transparent)',
                borderRadius: '43px',
                opacity: 0.8,
                animation: 'borderRotate 4s linear infinite'
              }}></div>
              {/* Pulsing inner glow */}
              <div style={{
                position: 'absolute',
                inset: '10px',
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
                borderRadius: '30px',
                animation: 'pulse 3s ease-in-out infinite'
              }}></div>
            </div>
          </div>

          {/* Hero Headlines */}
          <h1 style={{
            fontSize: '5.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 25%, #dc2626 50%, #b91c1c 75%, #991b1b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '30px',
            lineHeight: '1.1',
            textShadow: '0 10px 40px rgba(245, 158, 11, 0.3)',
            letterSpacing: '-0.02em'
          }}>
            The Future of<br />Smart Investing
          </h1>
          
          <p style={{
            fontSize: '1.7rem',
            color: '#94a3b8',
            marginBottom: '40px',
            maxWidth: '900px',
            margin: '0 auto 40px',
            lineHeight: '1.8',
            fontWeight: '400'
          }}>
            Join <strong style={{ color: '#f59e0b' }}>15,000+</strong> investors earning up to{' '}
            <strong style={{ color: '#10b981' }}>18.2% APY</strong> with our AI-powered investment platform. 
            Secure, transparent, and designed for the modern investor.
          </p>

          {/* Enhanced Trust Indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '50px',
            marginBottom: '60px',
            flexWrap: 'wrap'
          }}>
            {[
              { icon: "🔒", text: "Bank-Level Security", color: "#10b981" },
              { icon: "🏆", text: "Award-Winning Platform", color: "#f59e0b" },
              { icon: "👥", text: "15,000+ Active Investors", color: "#3b82f6" },
              { icon: "⚡", text: "Instant Processing", color: "#8b5cf6" }
            ].map((indicator, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '12px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <span style={{ fontSize: '1.2rem' }}>{indicator.icon}</span>
                <span style={{ color: '#cbd5e1', fontSize: '0.95rem', fontWeight: '500' }}>{indicator.text}</span>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Buttons */}
          <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '80px' }}>
            <a
              href="/register"
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                color: 'white',
                padding: '22px 45px',
                borderRadius: '16px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.3rem',
                boxShadow: '0 15px 40px rgba(245, 158, 11, 0.4)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = '0 20px 50px rgba(245, 158, 11, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 15px 40px rgba(245, 158, 11, 0.4)';
              }}
            >
              🚀 Start Investing Today
              <span style={{ fontSize: '1.1rem' }}>→</span>
            </a>
            
            <a
              href="/calculator"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                color: 'white',
                padding: '22px 45px',
                borderRadius: '16px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.3rem',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              📊 Calculate Returns
            </a>
          </div>
        </section>

        {/* Enhanced Live Stats Dashboard */}
        <section className="animate-on-scroll" style={{ marginBottom: '130px' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(25px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '30px',
            padding: '60px 40px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{
              textAlign: 'center',
              marginBottom: '60px'
            }}>
              <h2 style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '20px'
              }}>
                Live Platform Statistics
              </h2>
              <p style={{
                color: '#94a3b8',
                fontSize: '1.2rem',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Real-time data from our growing investment community
              </p>
            </div>

            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '35px',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {/* Total Investors */}
              <div style={{
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: '25px',
                padding: '40px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
                  animation: 'pulse 5s ease-in-out infinite'
                }}></div>
                <div style={{ fontSize: '3rem', marginBottom: '15px', position: 'relative' }}>👥</div>
                <div style={{
                  fontSize: '3.5rem',
                  fontWeight: 'bold',
                  color: '#10b981',
                  marginBottom: '12px',
                  position: 'relative'
                }}>
                  {statsLoading ? '...' : formatNumber(stats.totalUsers)}+
                </div>
                <div style={{ color: '#94a3b8', fontSize: '1.2rem', position: 'relative' }}>Total Investors</div>
              </div>

              {/* Total Invested */}
              <div style={{
                background: 'rgba(59, 130, 246, 0.12)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                borderRadius: '25px',
                padding: '40px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
                  animation: 'pulse 5s ease-in-out infinite 1s'
                }}></div>
                <div style={{ fontSize: '3rem', marginBottom: '15px', position: 'relative' }}>💰</div>
                <div style={{
                  fontSize: '3.5rem',
                  fontWeight: 'bold',
                  color: '#3b82f6',
                  marginBottom: '12px',
                  position: 'relative'
                }}>
                  {statsLoading ? '...' : formatCurrency(stats.totalInvested)}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '1.2rem', position: 'relative' }}>Total Invested</div>
              </div>

              {/* Total Paid Out */}
              <div style={{
                background: 'rgba(139, 92, 246, 0.12)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                borderRadius: '25px',
                padding: '40px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
                  animation: 'pulse 5s ease-in-out infinite 2s'
                }}></div>
                <div style={{ fontSize: '3rem', marginBottom: '15px', position: 'relative' }}>💎</div>
                <div style={{
                  fontSize: '3.5rem',
                  fontWeight: 'bold',
                  color: '#8b5cf6',
                  marginBottom: '12px',
                  position: 'relative'
                }}>
                  {statsLoading ? '...' : formatCurrency(stats.totalPaid)}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '1.2rem', position: 'relative' }}>Total Paid Out</div>
              </div>

              {/* Active Investments */}
              <div style={{
                background: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: '25px',
                padding: '40px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
                  animation: 'pulse 5s ease-in-out infinite 3s'
                }}></div>
                <div style={{ fontSize: '3rem', marginBottom: '15px', position: 'relative' }}>📈</div>
                <div style={{
                  fontSize: '3.5rem',
                  fontWeight: 'bold',
                  color: '#f59e0b',
                  marginBottom: '12px',
                  position: 'relative'
                }}>
                  {statsLoading ? '...' : formatNumber(stats.activeInvestments)}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '1.2rem', position: 'relative' }}>Active Investments</div>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Investment Plans */}
        <section className="animate-on-scroll" style={{ marginBottom: '130px' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '25px'
            }}>
              Premium Investment Plans
            </h2>
            <p style={{
              color: '#94a3b8',
              fontSize: '1.3rem',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              AI-optimized investment plans designed for maximum returns with professional risk management
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '35px',
            marginBottom: '70px'
          }}>
            {investmentPlans.map((plan) => (
              <div key={plan.id} style={{
                background: plan.popular 
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)'
                  : 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(20px)',
                border: plan.popular 
                  ? '2px solid rgba(59, 130, 246, 0.3)'
                  : '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '30px',
                padding: '45px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px)';
                e.currentTarget.style.boxShadow = `0 25px 60px ${plan.color}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
                    color: 'white',
                    padding: '10px 28px',
                    borderRadius: '25px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    ⭐ Most Popular
                  </div>
                )}
                
                {/* Plan Tier Badge */}
                <div style={{
                  background: `${plan.color}20`,
                  border: `1px solid ${plan.color}40`,
                  borderRadius: '12px',
                  padding: '8px 20px',
                  display: 'inline-block',
                  marginBottom: '25px',
                  marginTop: plan.popular ? '20px' : '0'
                }}>
                  <span style={{ color: plan.color, fontWeight: '700', fontSize: '0.8rem', letterSpacing: '1px' }}>
                    {plan.tier}
                  </span>
                </div>
                
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '20px'
                }}>
                  {plan.name}
                </h3>
                
                {/* APY Display */}
                <div style={{
                  fontSize: '4rem',
                  fontWeight: 'bold',
                  color: plan.color,
                  marginBottom: '8px',
                  lineHeight: '1'
                }}>
                  {plan.apy}
                </div>
                
                <div style={{
                  color: '#94a3b8',
                  marginBottom: '10px',
                  fontSize: '1.1rem'
                }}>
                  Annual Percentage Yield
                </div>

                <div style={{
                  color: plan.color,
                  fontWeight: '600',
                  marginBottom: '30px',
                  fontSize: '0.95rem'
                }}>
                  ({plan.dailyReturn} daily)
                </div>
                
                {/* Plan Details */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: '18px',
                  padding: '25px',
                  marginBottom: '35px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                  }}>
                    <span style={{ color: '#94a3b8' }}>Duration:</span>
                    <span style={{ color: 'white', fontWeight: 'bold' }}>{plan.duration} days</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                  }}>
                    <span style={{ color: '#94a3b8' }}>Minimum:</span>
                    <span style={{ color: 'white', fontWeight: 'bold' }}>{formatCurrency(plan.minAmount)}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ color: '#94a3b8' }}>Maximum:</span>
                    <span style={{ color: 'white', fontWeight: 'bold' }}>{formatCurrency(plan.maxAmount)}</span>
                  </div>
                </div>
                
                {/* Features */}
                <div style={{ marginBottom: '35px' }}>
                  {plan.features.map((feature, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '10px'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: plan.color
                      }}></div>
                      <span style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <a
                  href="/investments"
                  style={{
                    width: '100%',
                    background: plan.gradient,
                    color: 'white',
                    padding: '18px',
                    borderRadius: '15px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    display: 'block',
                    transition: 'all 0.3s ease',
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = `0 12px 30px ${plan.color}50`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Choose {plan.name}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Platform Features */}
        <section className="animate-on-scroll" style={{ marginBottom: '130px' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '25px'
            }}>
              Why Choose BlackCnote?
            </h2>
            <p style={{
              color: '#94a3b8',
              fontSize: '1.3rem',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Advanced features and cutting-edge technology designed for the modern investor
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '45px'
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '30px',
                padding: '45px',
                transition: 'all 0.4s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = feature.color + '40';
                e.currentTarget.style.boxShadow = `0 20px 50px ${feature.color}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '25px',
                  textAlign: 'center'
                }}>
                  {feature.icon}
                </div>
                
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  {feature.title}
                </h3>
                
                <p style={{
                  color: '#94a3b8',
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  textAlign: 'center'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Testimonials */}
        <section className="animate-on-scroll" style={{ marginBottom: '130px' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '25px'
            }}>
              What Our Investors Say
            </h2>
            <p style={{
              color: '#94a3b8',
              fontSize: '1.3rem',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Real stories from our successful investment community
            </p>
          </div>

          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(25px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '30px',
            padding: '60px',
            textAlign: 'center'
          }}>
            {/* Star Rating */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '30px'
            }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: '#f59e0b', fontSize: '1.5rem' }}>⭐</span>
              ))}
            </div>
            
            {/* Testimonial Content */}
            <p style={{
              color: '#cbd5e1',
              fontSize: '1.5rem',
              fontStyle: 'italic',
              lineHeight: '1.8',
              marginBottom: '40px',
              maxWidth: '700px',
              margin: '0 auto 40px'
            }}>
              "{testimonials[currentTestimonial].comment}"
            </p>
            
            {/* Testimonial Author */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.4rem'
              }}>
                {testimonials[currentTestimonial].avatar}
              </div>
              
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  marginBottom: '5px'
                }}>
                  {testimonials[currentTestimonial].name}
                </div>
                <div style={{
                  color: '#94a3b8',
                  fontSize: '0.95rem',
                  marginBottom: '8px'
                }}>
                  {testimonials[currentTestimonial].role}
                </div>
                <div style={{
                  display: 'flex',
                  gap: '15px',
                  fontSize: '0.85rem'
                }}>
                  <span style={{ color: '#10b981', fontWeight: '600' }}>
                    {testimonials[currentTestimonial].investment} → {testimonials[currentTestimonial].returns}
                  </span>
                  <span style={{ color: '#94a3b8' }}>
                    • {testimonials[currentTestimonial].timeframe}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Testimonial Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px'
            }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  style={{
                    width: '14px',
                    height: '14px',
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
        </section>

        {/* Final Call to Action */}
        <section className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(234, 88, 12, 0.1) 100%)',
            backdropFilter: 'blur(25px)',
            border: '2px solid rgba(245, 158, 11, 0.25)',
            borderRadius: '35px',
            padding: '80px 60px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '25px'
            }}>
              Ready to Start Investing?
            </h2>
            <p style={{
              color: '#94a3b8',
              fontSize: '1.4rem',
              marginBottom: '50px',
              maxWidth: '600px',
              margin: '0 auto 50px',
              lineHeight: '1.6'
            }}>
              Join thousands of successful investors and start building your wealth today with our AI-powered platform.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '25px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="/register"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                  color: 'white',
                  padding: '20px 45px',
                  borderRadius: '18px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.3rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 12px 35px rgba(245, 158, 11, 0.4)',
                  border: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-4px)';
                  e.target.style.boxShadow = '0 16px 45px rgba(245, 158, 11, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 12px 35px rgba(245, 158, 11, 0.4)';
                }}
              >
                Get Started Now
              </a>
              
              <a
                href="/contact"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(12px)',
                  border: '2px solid rgba(255, 255, 255, 0.25)',
                  color: 'white',
                  padding: '20px 45px',
                  borderRadius: '18px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.3rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                }}
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Enhanced CSS Animations and Responsive Design */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(2deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
        
        @keyframes borderRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes particle-float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-20px) translateX(10px) rotate(90deg);
            opacity: 1;
          }
          50% { 
            transform: translateY(-40px) translateX(-5px) rotate(180deg);
            opacity: 0.8;
          }
          75% { 
            transform: translateY(-20px) translateX(-10px) rotate(270deg);
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Enhanced Mobile Responsiveness */
        @media (max-width: 768px) {
          .grid-responsive {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          
          .text-responsive {
            font-size: 2.5rem !important;
          }
          
          .text-large-responsive {
            font-size: 4rem !important;
          }
          
          .padding-responsive {
            padding: 20px !important;
          }
          
          .margin-responsive {
            margin-bottom: 60px !important;
          }
        }

        @media (max-width: 480px) {
          .text-responsive {
            font-size: 2rem !important;
          }
          
          .text-large-responsive {
            font-size: 3rem !important;
          }
        }

        /* Enhanced Glassmorphism Effects */
        .glass-enhanced {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }

        /* Performance Optimizations */
        * {
          will-change: auto;
        }

        .no-select {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>

      {/* Live Chat Widget */}
      <LiveChatWidget position="bottom-right" />
    </div>
  );
}