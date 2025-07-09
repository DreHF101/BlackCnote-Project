import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface PortfolioStats {
  totalBalance: number;
  totalInvestments: number;
  totalProfit: number;
  activeInvestments: number;
  monthlyGrowth: number;
}

export default function SimpleDashboard() {
  const [stats] = useState<PortfolioStats>({
    totalBalance: 12450.75,
    totalInvestments: 8500.00,
    totalProfit: 3950.75,
    activeInvestments: 4,
    monthlyGrowth: 12.8
  });

  const [recentTransactions] = useState([
    { id: 1, type: "Deposit", amount: 1000, date: "2025-01-05", status: "Completed" },
    { id: 2, type: "Profit", amount: 45.50, date: "2025-01-04", status: "Completed" },
    { id: 3, type: "Investment", amount: -2000, date: "2025-01-03", status: "Active" },
    { id: 4, type: "Profit", amount: 67.25, date: "2025-01-02", status: "Completed" },
    { id: 5, type: "Deposit", amount: 500, date: "2025-01-01", status: "Completed" }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTransactionColor = (type: string) => {
    switch(type) {
      case 'Deposit': return '#10b981';
      case 'Profit': return '#3b82f6';
      case 'Investment': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
            Investment Dashboard
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            Monitor your portfolio performance and investment opportunities
          </p>
        </div>

        {/* Portfolio Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            backgroundColor: '#1e293b',
            padding: '25px',
            borderRadius: '12px',
            border: '1px solid #475569'
          }}>
            <div style={{ color: '#10b981', fontSize: '0.9rem', marginBottom: '5px' }}>Total Balance</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {formatCurrency(stats.totalBalance)}
            </div>
            <div style={{ color: '#10b981', fontSize: '0.8rem', marginTop: '5px' }}>
              ↗ +{stats.monthlyGrowth}% this month
            </div>
          </div>

          <div style={{
            backgroundColor: '#1e293b',
            padding: '25px',
            borderRadius: '12px',
            border: '1px solid #475569'
          }}>
            <div style={{ color: '#3b82f6', fontSize: '0.9rem', marginBottom: '5px' }}>Total Investments</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {formatCurrency(stats.totalInvestments)}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '5px' }}>
              {stats.activeInvestments} active investments
            </div>
          </div>

          <div style={{
            backgroundColor: '#1e293b',
            padding: '25px',
            borderRadius: '12px',
            border: '1px solid #475569'
          }}>
            <div style={{ color: '#f59e0b', fontSize: '0.9rem', marginBottom: '5px' }}>Total Profit</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {formatCurrency(stats.totalProfit)}
            </div>
            <div style={{ color: '#f59e0b', fontSize: '0.8rem', marginTop: '5px' }}>
              ROI: {((stats.totalProfit / stats.totalInvestments) * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
            Quick Actions
          </h2>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <a
              href="/investments"
              style={{
                backgroundColor: '#3b82f6',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'white',
                fontWeight: '600',
                display: 'inline-block'
              }}
            >
              New Investment
            </a>
            <a
              href="/deposits"
              style={{
                backgroundColor: '#10b981',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'white',
                fontWeight: '600',
                display: 'inline-block'
              }}
            >
              Deposit Funds
            </a>
            <a
              href="/withdraw"
              style={{
                backgroundColor: '#f59e0b',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'white',
                fontWeight: '600',
                display: 'inline-block'
              }}
            >
              Withdraw
            </a>
            <a
              href="/analytics"
              style={{
                backgroundColor: '#8b5cf6',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'white',
                fontWeight: '600',
                display: 'inline-block'
              }}
            >
              Analytics
            </a>
          </div>
        </div>

        {/* Recent Transactions */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
            Recent Transactions
          </h2>
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '12px',
            border: '1px solid #475569',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '20px 25px', borderBottom: '1px solid #475569' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                gap: '20px',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#94a3b8'
              }}>
                <div>Type</div>
                <div>Amount</div>
                <div>Date</div>
                <div>Status</div>
                <div>Action</div>
              </div>
            </div>
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} style={{
                padding: '20px 25px',
                borderBottom: '1px solid #374151',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                gap: '20px',
                alignItems: 'center'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px' 
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: getTransactionColor(transaction.type)
                  }}></div>
                  {transaction.type}
                </div>
                <div style={{ 
                  color: transaction.amount > 0 ? '#10b981' : '#f59e0b',
                  fontWeight: '600'
                }}>
                  {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                </div>
                <div style={{ color: '#94a3b8' }}>
                  {new Date(transaction.date).toLocaleDateString()}
                </div>
                <div>
                  <span style={{
                    backgroundColor: transaction.status === 'Completed' ? '#10b981' : '#f59e0b',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}>
                    {transaction.status}
                  </span>
                </div>
                <div>
                  <button style={{
                    backgroundColor: '#374151',
                    color: '#94a3b8',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}>
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Plans Preview */}
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
            Popular Investment Plans
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              backgroundColor: '#1e293b',
              padding: '25px',
              borderRadius: '12px',
              border: '1px solid #475569'
            }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#10b981', marginBottom: '10px' }}>
                Starter Plan
              </h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>
                6.5% APY
              </div>
              <div style={{ color: '#94a3b8', marginBottom: '15px' }}>
                Min: $100 | Max: $1,000
              </div>
              <a
                href="/investments"
                style={{
                  backgroundColor: '#10b981',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: '600',
                  display: 'inline-block'
                }}
              >
                Invest Now
              </a>
            </div>

            <div style={{
              backgroundColor: '#1e293b',
              padding: '25px',
              borderRadius: '12px',
              border: '1px solid #475569'
            }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '10px' }}>
                Pro Plan
              </h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>
                9.8% APY
              </div>
              <div style={{ color: '#94a3b8', marginBottom: '15px' }}>
                Min: $1,000 | Max: $10,000
              </div>
              <a
                href="/investments"
                style={{
                  backgroundColor: '#3b82f6',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: '600',
                  display: 'inline-block'
                }}
              >
                Invest Now
              </a>
            </div>

            <div style={{
              backgroundColor: '#1e293b',
              padding: '25px',
              borderRadius: '12px',
              border: '1px solid #475569'
            }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '10px' }}>
                Elite Plan
              </h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>
                15.2% APY
              </div>
              <div style={{ color: '#94a3b8', marginBottom: '15px' }}>
                Min: $10,000 | Max: $100,000
              </div>
              <a
                href="/investments"
                style={{
                  backgroundColor: '#f59e0b',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: '600',
                  display: 'inline-block'
                }}
              >
                Invest Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}