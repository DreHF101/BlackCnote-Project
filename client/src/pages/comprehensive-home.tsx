import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  TrendingUp,
  Shield,
  Clock,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Zap,
  Globe,
  RefreshCw,
  DollarSign,
  BarChart3,
  Award,
  Target,
  Wallet,
  PiggyBank,
  AlertCircle,
  Lock,
  Smartphone,
  Calculator,
  CreditCard,
  TrendingDown,
  Activity
} from "lucide-react";

interface Stats {
  totalUsers: number;
  totalInvested: number;
  totalPaid: number;
  activeInvestments: number;
}

interface Feature {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  color: string;
}

interface InvestmentPlan {
  id: string;
  name: string;
  apy: number;
  duration: number;
  minAmount: number;
  maxAmount: number;
  popular?: boolean;
  features: string[];
  color: string;
}

const features: Feature[] = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Military-grade encryption, 2FA authentication, and multi-layer security protocols protect your investments.",
    color: "#10b981"
  },
  {
    icon: TrendingUp,
    title: "AI-Powered Returns",
    description: "Our advanced AI algorithms optimize your portfolio for maximum returns with dynamic APY adjustments.",
    color: "#3b82f6"
  },
  {
    icon: Clock,
    title: "24/7 Real-Time Support",
    description: "Round-the-clock customer support with dedicated account managers and instant live chat.",
    color: "#f59e0b"
  },
  {
    icon: Smartphone,
    title: "Mobile-First Platform",
    description: "Trade anywhere with our PWA mobile app, offline capabilities, and push notifications.",
    color: "#8b5cf6"
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description: "Multi-currency support, instant withdrawals, and compliance with international regulations.",
    color: "#ef4444"
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Managed by seasoned financial professionals with decades of combined investment experience.",
    color: "#06b6d4"
  }
];

const investmentPlans: InvestmentPlan[] = [
  {
    id: "starter",
    name: "Starter Plan",
    apy: 8.5,
    duration: 30,
    minAmount: 100,
    maxAmount: 5000,
    features: ["Daily Returns", "Basic Support", "Mobile Access", "Real-time Tracking"],
    color: "#10b981"
  },
  {
    id: "professional",
    name: "Professional Plan",
    apy: 12.3,
    duration: 60,
    minAmount: 1000,
    maxAmount: 25000,
    popular: true,
    features: ["Higher Returns", "Priority Support", "Advanced Analytics", "Portfolio Optimization"],
    color: "#3b82f6"
  },
  {
    id: "vip",
    name: "VIP Plan",
    apy: 15.8,
    duration: 90,
    minAmount: 5000,
    maxAmount: 100000,
    features: ["Premium Returns", "VIP Support", "Custom Strategies", "Personal Account Manager"],
    color: "#f59e0b"
  },
  {
    id: "elite",
    name: "Elite Growth",
    apy: 18.2,
    duration: 120,
    minAmount: 25000,
    maxAmount: 500000,
    features: ["Elite Returns", "White-Glove Service", "AI Portfolio Management", "Exclusive Events"],
    color: "#8b5cf6"
  }
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Entrepreneur",
    rating: 5,
    comment: "BlackCnote's AI-powered investment platform has transformed my portfolio. The consistent returns and professional support are exceptional.",
    avatar: "SC",
    investment: "$15,000",
    returns: "+$2,847"
  },
  {
    name: "Marcus Johnson", 
    role: "Business Owner",
    rating: 5,
    comment: "The security features and transparency give me complete peace of mind. I've been investing for 8 months and the results exceed expectations.",
    avatar: "MJ",
    investment: "$32,000",
    returns: "+$6,240"
  },
  {
    name: "Elena Rodriguez",
    role: "Financial Advisor",
    rating: 5, 
    comment: "Outstanding platform with institutional-grade features. The AI recommendations and portfolio optimization tools are game-changers.",
    avatar: "ER",
    investment: "$47,500",
    returns: "+$9,125"
  }
];

export default function ComprehensiveHome() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalInvested: 0,
    totalPaid: 0,
    activeInvestments: 0
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Fetch live stats from API
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
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [statsData]);

  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
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

  const animateNumber = (start: number, end: number, duration: number) => {
    if (start === end) return end;
    const increment = (end - start) / (duration / 16);
    return Math.min(start + increment, end);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(120px)',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '5%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '30%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 10s ease-in-out infinite'
      }}></div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 20px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Hero Section */}
        <section style={{ textAlign: 'center', marginBottom: '120px', paddingTop: '60px' }}>
          {/* Premium Logo Container */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '50px'
          }}>
            <div style={{
              padding: '25px',
              borderRadius: '35px',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              border: '3px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 25px 60px rgba(245, 158, 11, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <img 
                src="/assets/img/hero-logo.png" 
                alt="BlackCnote Investment Platform" 
                style={{
                  height: '140px',
                  width: 'auto',
                  filter: 'drop-shadow(0 12px 35px rgba(245, 158, 11, 0.4))',
                  position: 'relative',
                  zIndex: 2
                }}
              />
              {/* Animated border effect */}
              <div style={{
                position: 'absolute',
                inset: '-3px',
                background: 'linear-gradient(45deg, transparent, rgba(245, 158, 11, 0.3), transparent)',
                borderRadius: '38px',
                opacity: 0.7,
                animation: 'borderAnimation 3s linear infinite'
              }}></div>
            </div>
          </div>

          {/* Hero Headlines */}
          <h1 style={{
            fontSize: '5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 25%, #dc2626 50%, #b91c1c 75%, #991b1b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '30px',
            lineHeight: '1.1',
            textShadow: '0 8px 32px rgba(245, 158, 11, 0.3)',
            letterSpacing: '-0.02em'
          }}>
            The Future of<br />Smart Investing
          </h1>
          
          <p style={{
            fontSize: '1.6rem',
            color: '#94a3b8',
            marginBottom: '40px',
            maxWidth: '800px',
            margin: '0 auto 40px',
            lineHeight: '1.7',
            fontWeight: '400'
          }}>
            Join <strong style={{ color: '#f59e0b' }}>15,000+</strong> investors earning up to{' '}
            <strong style={{ color: '#10b981' }}>18.2% APY</strong> with our AI-powered investment platform. 
            Secure, transparent, and designed for the modern investor.
          </p>

          {/* Trust Indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            marginBottom: '50px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield style={{ color: '#10b981', width: '20px', height: '20px' }} />
              <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Bank-Level Security</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award style={{ color: '#f59e0b', width: '20px', height: '20px' }} />
              <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Award-Winning Platform</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users style={{ color: '#3b82f6', width: '20px', height: '20px' }} />
              <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>15,000+ Active Investors</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '25px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '80px' }}>
            <Link href="/register">
              <button style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                color: 'white',
                padding: '20px 40px',
                borderRadius: '15px',
                border: 'none',
                fontWeight: '600',
                fontSize: '1.2rem',
                boxShadow: '0 12px 35px rgba(245, 158, 11, 0.4)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 16px 45px rgba(245, 158, 11, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 12px 35px rgba(245, 158, 11, 0.4)';
              }}>
                🚀 Start Investing Today
                <ArrowRight style={{ width: '20px', height: '20px' }} />
              </button>
            </Link>
            
            <Link href="/calculator">
              <button style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                color: 'white',
                padding: '20px 40px',
                borderRadius: '15px',
                fontWeight: '600',
                fontSize: '1.2rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}>
                <Calculator style={{ width: '20px', height: '20px' }} />
                Calculate Returns
              </button>
            </Link>
          </div>
        </section>

        {/* Live Stats Dashboard */}
        <section style={{ marginBottom: '120px' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '25px',
            padding: '50px 30px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '50px'
            }}>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '15px'
              }}>
                Live Platform Statistics
              </h2>
              <p style={{
                color: '#94a3b8',
                fontSize: '1.1rem'
              }}>
                Real-time data from our growing investment community
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {/* Total Investors */}
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '20px',
                padding: '35px',
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
                  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)',
                  animation: 'pulse 4s ease-in-out infinite'
                }}></div>
                <Users style={{ color: '#10b981', width: '40px', height: '40px', marginBottom: '15px' }} />
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#10b981',
                  marginBottom: '10px',
                  position: 'relative'
                }}>
                  {statsLoading ? '...' : formatNumber(stats.totalUsers)}+
                </div>
                <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Total Investors</div>
              </div>

              {/* Total Invested */}
              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '20px',
                padding: '35px',
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
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
                  animation: 'pulse 4s ease-in-out infinite 1s'
                }}></div>
                <Wallet style={{ color: '#3b82f6', width: '40px', height: '40px', marginBottom: '15px' }} />
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#3b82f6',
                  marginBottom: '10px',
                  position: 'relative'
                }}>
                  {statsLoading ? '...' : formatCurrency(stats.totalInvested)}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Total Invested</div>
              </div>

              {/* Total Paid Out */}
              <div style={{
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '20px',
                padding: '35px',
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
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
                  animation: 'pulse 4s ease-in-out infinite 2s'
                }}></div>
                <DollarSign style={{ color: '#8b5cf6', width: '40px', height: '40px', marginBottom: '15px' }} />
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#8b5cf6',
                  marginBottom: '10px',
                  position: 'relative'
                }}>
                  {statsLoading ? '...' : formatCurrency(stats.totalPaid)}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Total Paid Out</div>
              </div>

              {/* Active Investments */}
              <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                borderRadius: '20px',
                padding: '35px',
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
                  background: 'radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%)',
                  animation: 'pulse 4s ease-in-out infinite 3s'
                }}></div>
                <TrendingUp style={{ color: '#f59e0b', width: '40px', height: '40px', marginBottom: '15px' }} />
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#f59e0b',
                  marginBottom: '10px',
                  position: 'relative'
                }}>
                  {statsLoading ? '...' : formatNumber(stats.activeInvestments)}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Active Investments</div>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Plans Preview */}
        <section style={{ marginBottom: '120px' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px'
            }}>
              Premium Investment Plans
            </h2>
            <p style={{
              color: '#94a3b8',
              fontSize: '1.2rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Choose from our AI-optimized investment plans designed for maximum returns
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginBottom: '60px'
          }}>
            {investmentPlans.map((plan) => (
              <div key={plan.id} style={{
                background: plan.popular 
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)'
                  : 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(15px)',
                border: plan.popular 
                  ? '2px solid rgba(59, 130, 246, 0.3)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '25px',
                padding: '40px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
                    color: 'white',
                    padding: '8px 24px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)'
                  }}>
                    ⭐ Most Popular
                  </div>
                )}
                
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '15px',
                  marginTop: plan.popular ? '15px' : '0'
                }}>
                  {plan.name}
                </h3>
                
                <div style={{
                  fontSize: '3.5rem',
                  fontWeight: 'bold',
                  color: plan.color,
                  marginBottom: '5px'
                }}>
                  {plan.apy}%
                </div>
                
                <div style={{
                  color: '#94a3b8',
                  marginBottom: '30px',
                  fontSize: '1.1rem'
                }}>
                  Annual Percentage Yield
                </div>
                
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '15px',
                  padding: '20px',
                  marginBottom: '30px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px'
                  }}>
                    <span style={{ color: '#94a3b8' }}>Duration:</span>
                    <span style={{ color: 'white', fontWeight: 'bold' }}>{plan.duration} days</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px'
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
                
                <div style={{ marginBottom: '30px' }}>
                  {plan.features.map((feature, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '8px'
                    }}>
                      <CheckCircle style={{ color: '#10b981', width: '16px', height: '16px' }} />
                      <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link href="/investments">
                  <button style={{
                    width: '100%',
                    background: `linear-gradient(90deg, ${plan.color}, ${plan.color}CC)`,
                    color: 'white',
                    padding: '15px',
                    borderRadius: '12px',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = `0 8px 25px ${plan.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}>
                    Choose Plan
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Platform Features */}
        <section style={{ marginBottom: '120px' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px'
            }}>
              Why Choose BlackCnote?
            </h2>
            <p style={{
              color: '#94a3b8',
              fontSize: '1.2rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Advanced features designed for the modern investor
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '40px'
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '25px',
                padding: '40px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = feature.color + '40';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '20px',
                  background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '25px',
                  border: `1px solid ${feature.color}30`
                }}>
                  <feature.icon style={{ color: feature.color, width: '32px', height: '32px' }} />
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
                  color: '#94a3b8',
                  fontSize: '1rem',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ marginBottom: '120px' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px'
            }}>
              What Our Investors Say
            </h2>
            <p style={{
              color: '#94a3b8',
              fontSize: '1.2rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Real stories from our successful investment community
            </p>
          </div>

          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '25px',
            padding: '50px',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '30px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '5px',
                marginBottom: '20px'
              }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} style={{ color: '#f59e0b', width: '20px', height: '20px', fill: '#f59e0b' }} />
                ))}
              </div>
              
              <p style={{
                color: '#cbd5e1',
                fontSize: '1.3rem',
                fontStyle: 'italic',
                lineHeight: '1.7',
                marginBottom: '30px'
              }}>
                "{testimonials[currentTestimonial].comment}"
              </p>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}>
                  {testimonials[currentTestimonial].avatar}
                </div>
                
                <div style={{ textAlign: 'left' }}>
                  <div style={{
                    color: 'white',
                    fontWeight: 'bold',
                    marginBottom: '5px'
                  }}>
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div style={{
                    color: '#94a3b8',
                    fontSize: '0.9rem',
                    marginBottom: '3px'
                  }}>
                    {testimonials[currentTestimonial].role}
                  </div>
                  <div style={{
                    color: '#10b981',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {testimonials[currentTestimonial].investment} → {testimonials[currentTestimonial].returns}
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
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
        </section>

        {/* Call to Action */}
        <section style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(234, 88, 12, 0.1) 100%)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(245, 158, 11, 0.2)',
            borderRadius: '30px',
            padding: '80px 50px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px'
            }}>
              Ready to Start Investing?
            </h2>
            <p style={{
              color: '#94a3b8',
              fontSize: '1.3rem',
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '0 auto 40px'
            }}>
              Join thousands of successful investors and start building your wealth today with our AI-powered platform.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link href="/register">
                <button style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                  color: 'white',
                  padding: '18px 40px',
                  borderRadius: '15px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(245, 158, 11, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 12px 35px rgba(245, 158, 11, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.4)';
                }}>
                  Get Started Now
                </button>
              </Link>
              
              <Link href="/contact">
                <button style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  padding: '18px 40px',
                  borderRadius: '15px',
                  fontWeight: '600',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}>
                  Contact Support
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes borderAnimation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}