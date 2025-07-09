import { useState } from 'react';

export default function SimpleHelp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [supportTicket, setSupportTicket] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📚' },
    { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
    { id: 'investments', name: 'Investments', icon: '💰' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'payments', name: 'Payments', icon: '💳' },
    { id: 'account', name: 'Account', icon: '👤' },
    { id: 'technical', name: 'Technical', icon: '⚙️' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I create an account?',
      answer: 'Click "Register" in the header, fill out the form with your details, and verify your email address. The process takes less than 5 minutes and requires a valid email address and phone number.',
      tags: ['registration', 'account', 'signup']
    },
    {
      id: 2,
      category: 'getting-started',
      question: 'What is the minimum investment amount?',
      answer: 'Our Starter plan begins at just $100, making it accessible for all investors. You can start small and gradually increase your investment as you become more comfortable with our platform.',
      tags: ['minimum', 'investment', 'starter']
    },
    {
      id: 3,
      category: 'investments',
      question: 'What are the available investment plans?',
      answer: 'We offer 5 investment tiers: Starter (6.5% APY), Professional (8.7% APY), VIP (11.2% APY), Premium Plus (15.8% APY), and Elite Growth (18.2% APY). Each plan has different minimum amounts and durations.',
      tags: ['plans', 'apy', 'returns']
    },
    {
      id: 4,
      category: 'investments',
      question: 'How are returns calculated and paid?',
      answer: 'Returns are calculated daily based on your plan\'s APY rate and paid out according to your plan\'s schedule. Interest compounds automatically unless you choose to withdraw profits.',
      tags: ['returns', 'calculation', 'compound']
    },
    {
      id: 5,
      category: 'security',
      question: 'How secure is my account and investment?',
      answer: 'We use bank-level security including 2FA, SSL encryption, and cold storage for funds. Your personal data is protected with AES-256 encryption, and we undergo regular security audits.',
      tags: ['security', 'encryption', '2fa']
    },
    {
      id: 6,
      category: 'security',
      question: 'How do I enable Two-Factor Authentication?',
      answer: 'Go to Security settings, click "Enable 2FA", scan the QR code with Google Authenticator or similar app, then enter the verification code. Keep your backup codes in a safe place.',
      tags: ['2fa', 'authentication', 'security']
    },
    {
      id: 7,
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards, bank transfers, PayPal, and major cryptocurrencies including Bitcoin, Ethereum, and USDT. All transactions are processed securely.',
      tags: ['payments', 'deposit', 'cryptocurrency']
    },
    {
      id: 8,
      category: 'payments',
      question: 'How long do withdrawals take?',
      answer: 'Withdrawals are typically processed within 24-48 hours for bank transfers, instantly for supported cryptocurrencies, and 3-5 business days for PayPal transfers.',
      tags: ['withdrawal', 'processing', 'time']
    },
    {
      id: 9,
      category: 'account',
      question: 'Can I have multiple investment plans?',
      answer: 'Yes! You can invest in multiple plans simultaneously to diversify your portfolio. Many of our investors use this strategy to balance risk and maximize returns.',
      tags: ['multiple', 'plans', 'diversify']
    },
    {
      id: 10,
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'Visit your Profile page from the user menu, click "Edit Profile", make your changes, and save. Some changes may require email verification for security purposes.',
      tags: ['profile', 'update', 'information']
    },
    {
      id: 11,
      category: 'technical',
      question: 'Is there a mobile app available?',
      answer: 'Yes! Our mobile app is available for iOS and Android devices. You can download it from the App Store or Google Play Store to manage your investments on the go.',
      tags: ['mobile', 'app', 'download']
    },
    {
      id: 12,
      category: 'technical',
      question: 'What browsers are supported?',
      answer: 'Our platform works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.',
      tags: ['browser', 'compatibility', 'support']
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the support ticket to your backend
    alert('Support ticket submitted successfully! We\'ll get back to you within 24 hours.');
    setSupportTicket({ name: '', email: '', subject: '', message: '', priority: 'medium' });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '80px 20px 40px',
      color: 'white'
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
            background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px'
          }}>
            Help Center
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#94a3b8',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Find answers to frequently asked questions and get expert support for your BlackCnote investment journey.
          </p>
        </div>

        {/* Quick Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '50px'
        }}>
          {[
            { icon: '📞', title: 'Live Chat', description: 'Get instant help', action: 'Start Chat' },
            { icon: '📧', title: 'Email Support', description: '24/7 assistance', action: 'Send Email' },
            { icon: '📱', title: 'Call Us', description: '+1 (555) 123-4567', action: 'Call Now' },
            { icon: '📚', title: 'User Guide', description: 'Complete tutorials', action: 'View Guide' }
          ].map((item, index) => (
            <div key={index} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '25px',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '5px' }}>{item.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '15px' }}>{item.description}</p>
              <button style={{
                background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                {item.action}
              </button>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '40px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {/* Search Bar */}
            <div style={{
              position: 'relative',
              maxWidth: '600px',
              margin: '0 auto',
              width: '100%'
            }}>
              <input
                type="text"
                placeholder="Search for help topics, keywords, or questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  paddingLeft: '50px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
              <span style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.2rem'
              }}>
                🔍
              </span>
            </div>

            {/* Category Filter */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center'
            }}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: 'none',
                    background: selectedCategory === category.id 
                      ? 'linear-gradient(90deg, #3b82f6, #1d4ed8)' 
                      : 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '40px',
          marginBottom: '60px'
        }}>
          {/* FAQ List */}
          <div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>❓</span>
              Frequently Asked Questions
            </h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              {filteredFAQs.map((faq) => (
                <div key={faq.id} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden'
                }}>
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    style={{
                      width: '100%',
                      padding: '20px',
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span>{faq.question}</span>
                    <span style={{
                      fontSize: '1.2rem',
                      transform: expandedFAQ === faq.id ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }}>
                      ▼
                    </span>
                  </button>
                  {expandedFAQ === faq.id && (
                    <div style={{
                      padding: '0 20px 20px',
                      color: '#cbd5e1',
                      lineHeight: '1.6',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <p style={{ margin: '15px 0' }}>{faq.answer}</p>
                      <div style={{
                        display: 'flex',
                        gap: '8px',
                        flexWrap: 'wrap',
                        marginTop: '15px'
                      }}>
                        {faq.tags.map((tag, index) => (
                          <span key={index} style={{
                            background: 'rgba(59, 130, 246, 0.2)',
                            color: '#60a5fa',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.8rem'
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {filteredFAQs.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: '#94a3b8'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔍</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>No results found</h3>
                <p>Try adjusting your search terms or selecting a different category.</p>
              </div>
            )}
          </div>

          {/* Support Ticket Form */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '30px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            height: 'fit-content',
            position: 'sticky',
            top: '100px'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>🎫</span>
              Submit Support Ticket
            </h3>
            <form onSubmit={handleSupportSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              <input
                type="text"
                placeholder="Your Name"
                value={supportTicket.name}
                onChange={(e) => setSupportTicket({...supportTicket, name: e.target.value})}
                required
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  outline: 'none'
                }}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={supportTicket.email}
                onChange={(e) => setSupportTicket({...supportTicket, email: e.target.value})}
                required
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  outline: 'none'
                }}
              />
              <input
                type="text"
                placeholder="Subject"
                value={supportTicket.subject}
                onChange={(e) => setSupportTicket({...supportTicket, subject: e.target.value})}
                required
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  outline: 'none'
                }}
              />
              <select
                value={supportTicket.priority}
                onChange={(e) => setSupportTicket({...supportTicket, priority: e.target.value})}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  outline: 'none'
                }}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
              <textarea
                placeholder="Describe your issue in detail..."
                value={supportTicket.message}
                onChange={(e) => setSupportTicket({...supportTicket, message: e.target.value})}
                required
                rows={5}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Submit Ticket
              </button>
            </form>
          </div>
        </div>

        {/* Additional Resources */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '40px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            Additional Resources
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginTop: '30px'
          }}>
            {[
              {
                icon: '📖',
                title: 'Investment Guide',
                description: 'Complete guide to getting started with investing',
                link: 'View Guide'
              },
              {
                icon: '🎥',
                title: 'Video Tutorials',
                description: 'Step-by-step video tutorials for all features',
                link: 'Watch Videos'
              },
              {
                icon: '📊',
                title: 'Market Analysis',
                description: 'Daily market insights and investment tips',
                link: 'Read Analysis'
              },
              {
                icon: '💬',
                title: 'Community Forum',
                description: 'Connect with other investors and share experiences',
                link: 'Join Forum'
              }
            ].map((resource, index) => (
              <div key={index} style={{
                padding: '25px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{resource.icon}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px' }}>
                  {resource.title}
                </h3>
                <p style={{ color: '#94a3b8', marginBottom: '15px', fontSize: '0.9rem' }}>
                  {resource.description}
                </p>
                <button style={{
                  background: 'rgba(59, 130, 246, 0.2)',
                  color: '#60a5fa',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #60a5fa',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  {resource.link}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
                <strong>Can I change my investment plan?</strong><br />
                Yes, you can upgrade your plan at any time through your dashboard.
              </div>
              <div>
                <strong>How are returns calculated?</strong><br />
                Returns are calculated daily and compounded based on your chosen plan's APY rate.
              </div>
            </div>
          </div>

          {/* Deposits & Withdrawals */}
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
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              💳 Deposits & Withdrawals
            </h3>
            <div style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
              <div style={{ marginBottom: '15px' }}>
                <strong>What payment methods are accepted?</strong><br />
                We accept credit cards, bank transfers, PayPal, and major cryptocurrencies.
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>How long do withdrawals take?</strong><br />
                Standard withdrawals process within 24-48 hours during business days.
              </div>
              <div>
                <strong>Are there any fees?</strong><br />
                Deposits are free. Withdrawal fees vary by method (2-5% typically).
              </div>
            </div>
          </div>

          {/* Security */}
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
              color: '#8b5cf6',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              🔒 Security
            </h3>
            <div style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
              <div style={{ marginBottom: '15px' }}>
                <strong>Is my money safe?</strong><br />
                Yes, we use bank-grade encryption and secure cold storage for all funds.
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>Do you offer 2FA?</strong><br />
                Yes, we strongly recommend enabling Two-Factor Authentication for enhanced security.
              </div>
              <div>
                <strong>How do I reset my password?</strong><br />
                Click "Forgot Password" on the login page and follow the email instructions.
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '1.75rem',
            fontWeight: '600',
            color: '#fff',
            marginBottom: '16px'
          }}>
            Still Need Help?
          </h3>
          <p style={{
            color: '#94a3b8',
            marginBottom: '30px',
            fontSize: '1.1rem'
          }}>
            Our support team is available 24/7 to assist you with any questions.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/contact"
              style={{
                background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              📧 Contact Support
            </a>
            <a
              href="/ai-assistant"
              style={{
                background: 'linear-gradient(90deg, #10b981, #059669)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🤖 AI Assistant
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}