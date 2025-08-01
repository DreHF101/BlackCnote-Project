import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface InvestmentPlan {
  id: number;
  name: string;
  apy: number;
  minAmount: number;
  maxAmount: number;
  duration: number;
  tier: string;
  features: string[];
}

export default function SimpleInvestments() {
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState("");

  const investmentPlans: InvestmentPlan[] = [
    {
      id: 1,
      name: "Starter Plan",
      apy: 6.5,
      minAmount: 100,
      maxAmount: 1000,
      duration: 30,
      tier: "Starter",
      features: ["Daily profits", "Basic support", "Instant deposits"]
    },
    {
      id: 2,
      name: "Pro Plan",
      apy: 9.8,
      minAmount: 1000,
      maxAmount: 10000,
      duration: 60,
      tier: "Pro",
      features: ["Higher returns", "Priority support", "Advanced analytics", "Compound interest"]
    },
    {
      id: 3,
      name: "VIP Plan",
      apy: 12.4,
      minAmount: 5000,
      maxAmount: 50000,
      duration: 90,
      tier: "VIP",
      features: ["Premium returns", "Dedicated manager", "Custom strategies", "Risk management"]
    },
    {
      id: 4,
      name: "Elite Plan",
      apy: 15.2,
      minAmount: 10000,
      maxAmount: 100000,
      duration: 120,
      tier: "Elite",
      features: ["Maximum returns", "Personal advisor", "Portfolio diversification", "Exclusive opportunities"]
    }
  ];

  const [activeInvestments] = useState([
    { id: 1, planName: "Pro Plan", amount: 2500, profit: 127.50, daysLeft: 45, status: "Active" },
    { id: 2, planName: "Starter Plan", amount: 500, profit: 45.25, daysLeft: 12, status: "Active" },
    { id: 3, planName: "VIP Plan", amount: 8000, profit: 892.40, daysLeft: 67, status: "Active" }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'Starter': return '#10b981';
      case 'Pro': return '#3b82f6';
      case 'VIP': return '#8b5cf6';
      case 'Elite': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const calculateDailyProfit = (amount: number, apy: number) => {
    return (amount * (apy / 100)) / 365;
  };

  const calculateTotalReturn = (amount: number, apy: number, days: number) => {
    const dailyProfit = calculateDailyProfit(amount, apy);
    return amount + (dailyProfit * days);
  };

  const handleInvest = (plan: InvestmentPlan) => {
    if (!investmentAmount || parseFloat(investmentAmount) < plan.minAmount) {
      alert(`Minimum investment amount is ${formatCurrency(plan.minAmount)}`);
      return;
    }
    if (parseFloat(investmentAmount) > plan.maxAmount) {
      alert(`Maximum investment amount is ${formatCurrency(plan.maxAmount)}`);
      return;
    }
    
    // Simulate investment creation
    alert(`Investment of ${formatCurrency(parseFloat(investmentAmount))} in ${plan.name} created successfully!`);
    setSelectedPlan(null);
    setInvestmentAmount("");
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
            Investment Plans
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            Choose from our diversified investment plans designed to maximize your returns
          </p>
        </div>

        {/* Active Investments */}
        <div style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '20px' }}>
            Your Active Investments
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {activeInvestments.map((investment) => (
              <div key={investment.id} style={{
                backgroundColor: '#1e293b',
                padding: '25px',
                borderRadius: '12px',
                border: '1px solid #475569'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{investment.planName}</h3>
                  <span style={{
                    backgroundColor: '#10b981',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}>
                    {investment.status}
                  </span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Investment Amount</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {formatCurrency(investment.amount)}
                  </div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Current Profit</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981' }}>
                    +{formatCurrency(investment.profit)}
                  </div>
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  {investment.daysLeft} days remaining
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Plans */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '20px' }}>
            Available Investment Plans
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '25px'
          }}>
            {investmentPlans.map((plan) => (
              <div key={plan.id} style={{
                backgroundColor: '#1e293b',
                padding: '30px',
                borderRadius: '15px',
                border: '1px solid #475569',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  backgroundColor: getTierColor(plan.tier),
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {plan.tier}
                </div>
                
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px' }}>
                  {plan.name}
                </h3>
                
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '3rem', fontWeight: 'bold', color: getTierColor(plan.tier) }}>
                    {plan.apy}%
                  </div>
                  <div style={{ color: '#94a3b8' }}>Annual Percentage Yield</div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{ color: '#94a3b8' }}>Min Amount: </span>
                    <span style={{ fontWeight: '600' }}>{formatCurrency(plan.minAmount)}</span>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{ color: '#94a3b8' }}>Max Amount: </span>
                    <span style={{ fontWeight: '600' }}>{formatCurrency(plan.maxAmount)}</span>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8' }}>Duration: </span>
                    <span style={{ fontWeight: '600' }}>{plan.duration} days</span>
                  </div>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '10px' }}>
                    Plan Features:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {plan.features.map((feature, index) => (
                      <li key={index} style={{ 
                        marginBottom: '5px', 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          backgroundColor: getTierColor(plan.tier),
                          borderRadius: '50%'
                        }}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedPlan(plan)}
                  style={{
                    backgroundColor: getTierColor(plan.tier),
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  Invest Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Modal */}
        {selectedPlan && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: '#1e293b',
              padding: '40px',
              borderRadius: '15px',
              border: '1px solid #475569',
              maxWidth: '500px',
              width: '90%'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
                Invest in {selectedPlan.name}
              </h3>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8' }}>
                  Investment Amount
                </label>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  placeholder={`Min: ${formatCurrency(selectedPlan.minAmount)}`}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #475569',
                    backgroundColor: '#0f172a',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                />
              </div>

              {investmentAmount && parseFloat(investmentAmount) > 0 && (
                <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#0f172a', borderRadius: '8px' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{ color: '#94a3b8' }}>Daily Profit: </span>
                    <span style={{ fontWeight: '600', color: '#10b981' }}>
                      {formatCurrency(calculateDailyProfit(parseFloat(investmentAmount), selectedPlan.apy))}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8' }}>Total Return: </span>
                    <span style={{ fontWeight: '600', color: '#10b981' }}>
                      {formatCurrency(calculateTotalReturn(parseFloat(investmentAmount), selectedPlan.apy, selectedPlan.duration))}
                    </span>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '15px' }}>
                <button
                  onClick={() => handleInvest(selectedPlan)}
                  style={{
                    backgroundColor: getTierColor(selectedPlan.tier),
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Confirm Investment
                </button>
                <button
                  onClick={() => setSelectedPlan(null)}
                  style={{
                    backgroundColor: '#374151',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* How It Works Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '40px',
          marginBottom: '40px'
        }}>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '30px',
            textAlign: 'center',
            background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            How It Works
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginBottom: '30px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'white'
              }}>1</div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px' }}>
                Choose Your Plan
              </h4>
              <p style={{ color: '#94a3b8', lineHeight: '1.5' }}>
                Select from our carefully crafted investment plans ranging from Starter to Elite, each designed for different risk appetites and investment goals.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'white'
              }}>2</div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px' }}>
                Make Your Investment
              </h4>
              <p style={{ color: '#94a3b8', lineHeight: '1.5' }}>
                Deposit your chosen amount within the plan's minimum and maximum limits. Your investment starts earning returns immediately upon confirmation.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'white'
              }}>3</div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px' }}>
                Earn Daily Profits
              </h4>
              <p style={{ color: '#94a3b8', lineHeight: '1.5' }}>
                Watch your investment grow with daily profit distributions. Track your earnings in real-time through your personalized dashboard.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'white'
              }}>4</div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px' }}>
                Withdraw Anytime
              </h4>
              <p style={{ color: '#94a3b8', lineHeight: '1.5' }}>
                Request withdrawals at any time with fast processing. Choose from multiple payment methods including bank transfers and digital wallets.
              </p>
            </div>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>⚠️</div>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: '#ef4444'
            }}>
              Investment Risk Disclaimer
            </h3>
          </div>
          
          <div style={{ color: '#e5e7eb', lineHeight: '1.6', fontSize: '0.95rem' }}>
            <p style={{ marginBottom: '15px' }}>
              <strong>Important Notice:</strong> All investments carry inherent risks, and past performance does not guarantee future results. 
              The value of your investment may fluctuate, and you may lose some or all of your principal investment.
            </p>
            
            <p style={{ marginBottom: '15px' }}>
              <strong>Key Risk Factors:</strong>
            </p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
              <li style={{ marginBottom: '8px' }}>Market volatility may affect investment performance</li>
              <li style={{ marginBottom: '8px' }}>Economic conditions can impact returns</li>
              <li style={{ marginBottom: '8px' }}>Regulatory changes may affect investment strategies</li>
              <li style={{ marginBottom: '8px' }}>Technology and operational risks are inherent to digital platforms</li>
            </ul>
            
            <p style={{ marginBottom: '15px' }}>
              <strong>Recommendation:</strong> Only invest funds you can afford to lose. Diversify your portfolio and consider consulting 
              with a qualified financial advisor before making investment decisions.
            </p>
            
            <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#94a3b8' }}>
              By investing with BlackCnote, you acknowledge that you have read, understood, and accepted these risks. 
              This disclaimer does not constitute financial advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}