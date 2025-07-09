import { useState } from 'react';

export default function SimpleNews() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const newsArticles = [
    {
      id: 1,
      title: "BlackCnote Launches Revolutionary AI-Powered Investment Strategy",
      excerpt: "Our new artificial intelligence system analyzes market trends in real-time to optimize investment returns for all our clients.",
      date: "2024-01-15",
      category: "Platform Updates",
      readTime: "5 min read",
      featured: true,
      author: "BlackCnote Team",
      image: "🤖"
    },
    {
      id: 2,
      title: "Q4 2024 Performance Report: Record Returns for Investors",
      excerpt: "BlackCnote achieved unprecedented performance in Q4 2024, with average returns exceeding 18% across all investment plans.",
      date: "2024-01-12",
      category: "Company News",
      readTime: "3 min read",
      featured: true,
      author: "Investment Team",
      image: "📊"
    },
    {
      id: 3,
      title: "Enhanced Security Measures Now Active",
      excerpt: "We've implemented advanced security protocols including multi-signature wallets and real-time fraud detection.",
      date: "2024-01-08",
      category: "Security Updates",
      readTime: "4 min read",
      featured: false,
      author: "Security Team",
      image: "🔒"
    },
    {
      id: 4,
      title: "New Investment Plans Available: Premium Plus & Elite Growth",
      excerpt: "Introducing two new high-yield investment plans with enhanced features and exclusive benefits for our valued investors.",
      date: "2024-01-05",
      category: "Investment Plans",
      readTime: "6 min read",
      featured: false,
      author: "Product Team",
      image: "💎"
    },
    {
      id: 5,
      title: "Market Analysis: Cryptocurrency Trends for 2024",
      excerpt: "Our expert analysis team provides insights into the cryptocurrency market trends and opportunities for the coming year.",
      date: "2024-01-03",
      category: "Market Analysis",
      readTime: "8 min read",
      featured: false,
      author: "Market Analysis Team",
      image: "💰"
    },
    {
      id: 6,
      title: "Mobile App Beta Testing Now Open",
      excerpt: "Join our exclusive beta testing program for the new BlackCnote mobile application with enhanced features and real-time notifications.",
      date: "2023-12-28",
      category: "Platform Updates",
      readTime: "4 min read",
      featured: false,
      author: "Development Team",
      image: "📱"
    },
    {
      id: 7,
      title: "Partnership Announcement: Strategic Alliance with TechFin Solutions",
      excerpt: "BlackCnote announces a strategic partnership with TechFin Solutions to enhance our technological capabilities and expand our service offerings.",
      date: "2023-12-25",
      category: "Company News",
      readTime: "5 min read",
      featured: false,
      author: "Executive Team",
      image: "🤝"
    },
    {
      id: 8,
      title: "Two-Factor Authentication Implementation Complete",
      excerpt: "All user accounts now have access to advanced two-factor authentication options including TOTP and backup codes for enhanced security.",
      date: "2023-12-20",
      category: "Security Updates",
      readTime: "3 min read",
      featured: false,
      author: "Security Team",
      image: "🔐"
    }
  ];

  const categories = [
    { id: 'all', name: 'All News', color: '#3b82f6' },
    { id: 'Platform Updates', name: 'Platform Updates', color: '#10b981' },
    { id: 'Company News', name: 'Company News', color: '#f59e0b' },
    { id: 'Security Updates', name: 'Security Updates', color: '#ef4444' },
    { id: 'Investment Plans', name: 'Investment Plans', color: '#8b5cf6' },
    { id: 'Market Analysis', name: 'Market Analysis', color: '#06b6d4' }
  ];

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const articlesPerPage = 6;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  const featuredArticles = newsArticles.filter(article => article.featured);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      padding: '80px 20px 40px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
            BlackCnote News & Updates
          </h1>
          
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#94a3b8', 
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Stay informed with the latest platform updates, investment insights, and market analysis
          </p>
        </div>

        {/* Featured Articles */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '30px',
            textAlign: 'center',
            color: 'white'
          }}>
            Featured Stories
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '30px'
          }}>
            {featuredArticles.map((article) => (
              <div 
                key={article.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '30px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  FEATURED
                </div>
                
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <span>{article.image}</span>
                  <div style={{
                    fontSize: '0.9rem',
                    color: categories.find(cat => cat.id === article.category)?.color || '#94a3b8',
                    fontWeight: '600'
                  }}>
                    {article.category}
                  </div>
                </div>
                
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  marginBottom: '15px',
                  color: 'white',
                  lineHeight: '1.4'
                }}>
                  {article.title}
                </h3>
                
                <p style={{ 
                  color: '#cbd5e1', 
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  fontSize: '1rem'
                }}>
                  {article.excerpt}
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '15px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '5px' }}>
                      By {article.author}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                      {article.date} • {article.readTime}
                    </div>
                  </div>
                  <div style={{ 
                    color: '#3b82f6', 
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    Read More →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '40px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {/* Search Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '20px'
            }}>
              <div style={{
                flex: '1',
                position: 'relative'
              }}>
                <input
                  type="text"
                  placeholder="Search news articles..."
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
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setCurrentPage(1);
                }}
                style={{
                  padding: '15px 25px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
              >
                Clear
              </button>
            </div>

            {/* Category Filter */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '15px',
              justifyContent: 'center'
            }}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '25px',
                    border: 'none',
                    background: selectedCategory === category.id 
                      ? category.color 
                      : 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News Articles Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          marginBottom: '50px'
        }}>
          {currentArticles.map((article) => (
            <div 
              key={article.id}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '30px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '2rem' }}>{article.image}</div>
                <div style={{
                  fontSize: '0.8rem',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  backgroundColor: categories.find(cat => cat.id === article.category)?.color || '#94a3b8',
                  color: 'white',
                  fontWeight: '600'
                }}>
                  {article.category}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: '#94a3b8',
                  marginLeft: 'auto'
                }}>
                  {article.readTime}
                </div>
              </div>
              
              <h3 style={{ 
                fontSize: '1.2rem', 
                fontWeight: 'bold', 
                marginBottom: '15px',
                color: 'white',
                lineHeight: '1.4'
              }}>
                {article.title}
              </h3>
              
              <p style={{ 
                color: '#cbd5e1', 
                lineHeight: '1.6',
                marginBottom: '20px',
                fontSize: '0.95rem'
              }}>
                {article.excerpt}
              </p>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '15px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '3px' }}>
                    By {article.author}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    {article.date}
                  </div>
                </div>
                <div style={{ 
                  color: '#3b82f6', 
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  Read More →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '50px'
          }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                background: currentPage === 1 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                color: currentPage === 1 ? '#94a3b8' : 'white',
                fontSize: '0.9rem',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  padding: '10px 15px',
                  borderRadius: '8px',
                  border: 'none',
                  background: currentPage === page ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  fontWeight: currentPage === page ? '600' : '400'
                }}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                background: currentPage === totalPages ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                color: currentPage === totalPages ? '#94a3b8' : 'white',
                fontSize: '0.9rem',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              Next
            </button>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div style={{
          textAlign: 'center',
          marginTop: '60px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '50px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'inline-block',
            minWidth: '500px'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '20px'
            }}>
              📬
            </div>
            <h3 style={{ 
              fontSize: '1.8rem', 
              fontWeight: 'bold', 
              marginBottom: '15px',
              color: 'white'
            }}>
              Stay Updated
            </h3>
            <p style={{ 
              color: '#94a3b8', 
              marginBottom: '30px',
              fontSize: '1.1rem',
              lineHeight: '1.5'
            }}>
              Subscribe to our newsletter for the latest news, market insights, and platform updates delivered directly to your inbox.
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <input 
                type="email" 
                placeholder="Enter your email address"
                style={{
                  flex: '1',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
              <button style={{
                padding: '15px 30px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Subscribe Now
              </button>
            </div>
            <p style={{
              fontSize: '0.85rem',
              color: '#94a3b8',
              marginTop: '15px'
            }}>
              Join 10,000+ investors who trust BlackCnote for their investment news
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}