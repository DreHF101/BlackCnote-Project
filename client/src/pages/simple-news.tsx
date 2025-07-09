export default function SimpleNews() {
  const newsArticles = [
    {
      id: 1,
      title: "BlackCnote Launches Revolutionary AI-Powered Investment Strategy",
      excerpt: "Our new artificial intelligence system analyzes market trends in real-time to optimize investment returns for all our clients.",
      date: "2024-01-15",
      category: "Platform Updates",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Q4 2024 Performance Report: Record Returns for Investors",
      excerpt: "BlackCnote achieved unprecedented performance in Q4 2024, with average returns exceeding 18% across all investment plans.",
      date: "2024-01-12",
      category: "Company News",
      readTime: "3 min read"
    },
    {
      id: 3,
      title: "Enhanced Security Measures Now Active",
      excerpt: "We've implemented advanced security protocols including multi-signature wallets and real-time fraud detection.",
      date: "2024-01-08",
      category: "Security Updates",
      readTime: "4 min read"
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: '20px',
          background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          BlackCnote News & Updates
        </h1>
        
        <p style={{ 
          fontSize: '18px', 
          textAlign: 'center', 
          color: '#94a3b8', 
          marginBottom: '40px' 
        }}>
          Stay informed with the latest platform updates and market insights
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '30px'
        }}>
          {newsArticles.map((article) => (
            <div 
              key={article.id}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '30px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <span style={{
                  fontSize: '12px',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  fontWeight: '500'
                }}>
                  {article.category}
                </span>
                <span style={{ fontSize: '14px', color: '#94a3b8' }}>
                  {article.readTime}
                </span>
              </div>
              
              <h3 style={{ 
                fontSize: '20px', 
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
                marginBottom: '15px'
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
                <span style={{ fontSize: '14px', color: '#94a3b8' }}>
                  {article.date}
                </span>
                <span style={{ 
                  color: '#3b82f6', 
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Read More →
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '50px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '30px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'inline-block'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
              📬 Stay Updated
            </h3>
            <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
              Subscribe to our newsletter for the latest news and insights
            </p>
            <div style={{ display: 'flex', gap: '10px', maxWidth: '400px' }}>
              <input 
                type="email" 
                placeholder="Enter your email"
                style={{
                  flex: '1',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white'
                }}
              />
              <button style={{
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}