import { useState, useEffect } from "react";

interface CalculationResult {
  dailyProfit: number;
  totalProfit: number;
  totalReturn: number;
  roi: number;
}

export default function SimpleCalculator() {
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [duration, setDuration] = useState("");
  const [customDuration, setCustomDuration] = useState("");
  const [results, setResults] = useState<CalculationResult>({
    dailyProfit: 0,
    totalProfit: 0,
    totalReturn: 0,
    roi: 0
  });

  const investmentPlans = [
    { id: "starter", name: "Starter Plan", apy: 6.5, minAmount: 100, maxAmount: 1000 },
    { id: "pro", name: "Pro Plan", apy: 9.8, minAmount: 1000, maxAmount: 10000 },
    { id: "vip", name: "VIP Plan", apy: 12.4, minAmount: 5000, maxAmount: 50000 },
    { id: "elite", name: "Elite Plan", apy: 15.2, minAmount: 10000, maxAmount: 100000 }
  ];

  const durationOptions = [
    { value: "30", label: "30 Days", multiplier: 1 },
    { value: "60", label: "60 Days", multiplier: 1.1 },
    { value: "90", label: "90 Days", multiplier: 1.2 },
    { value: "180", label: "180 Days", multiplier: 1.3 },
    { value: "365", label: "1 Year", multiplier: 1.5 },
    { value: "custom", label: "Custom Duration", multiplier: 1 }
  ];

  const calculateReturns = () => {
    if (!investmentAmount || !selectedPlan || !duration) {
      setResults({ dailyProfit: 0, totalProfit: 0, totalReturn: 0, roi: 0 });
      return;
    }

    const amount = parseFloat(investmentAmount);
    const plan = investmentPlans.find(p => p.id === selectedPlan);
    if (!plan) return;

    const days = duration === "custom" ? parseInt(customDuration) || 0 : parseInt(duration);
    if (amount <= 0 || days <= 0) {
      setResults({ dailyProfit: 0, totalProfit: 0, totalReturn: 0, roi: 0 });
      return;
    }

    const durationData = durationOptions.find(d => d.value === duration);
    const multiplier = durationData?.multiplier || 1;

    const dailyRate = (plan.apy * multiplier) / 100 / 365;
    const dailyProfit = amount * dailyRate;
    const totalProfit = dailyProfit * days;
    const totalReturn = amount + totalProfit;
    const roi = (totalProfit / amount) * 100;

    setResults({
      dailyProfit,
      totalProfit,
      totalReturn,
      roi
    });
  };

  useEffect(() => {
    calculateReturns();
  }, [investmentAmount, selectedPlan, duration, customDuration]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getSelectedPlan = () => {
    return investmentPlans.find(p => p.id === selectedPlan);
  };

  const generateProjection = () => {
    if (!results.dailyProfit || !duration) return [];
    
    const days = duration === "custom" ? parseInt(customDuration) || 0 : parseInt(duration);
    const intervals = Math.min(days, 12);
    const stepSize = Math.ceil(days / intervals);
    
    return Array.from({ length: intervals }, (_, i) => {
      const day = (i + 1) * stepSize;
      const profit = results.dailyProfit * day;
      const total = parseFloat(investmentAmount) + profit;
      return { day, profit, total };
    });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
            Investment Calculator
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            Calculate your potential returns and plan your investment strategy
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          {/* Input Section */}
          <div style={{
            backgroundColor: '#1e293b',
            padding: '30px',
            borderRadius: '15px',
            border: '1px solid #475569',
            height: 'fit-content'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '25px' }}>
              Investment Parameters
            </h2>

            {/* Investment Amount */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.9rem' }}>
                Investment Amount ($)
              </label>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                placeholder="Enter amount"
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

            {/* Investment Plan */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.9rem' }}>
                Investment Plan
              </label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #475569',
                  backgroundColor: '#0f172a',
                  color: 'white',
                  fontSize: '1rem'
                }}
              >
                <option value="">Select a plan</option>
                {investmentPlans.map(plan => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} - {plan.apy}% APY
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.9rem' }}>
                Investment Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #475569',
                  backgroundColor: '#0f172a',
                  color: 'white',
                  fontSize: '1rem'
                }}
              >
                <option value="">Select duration</option>
                {durationOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Duration */}
            {duration === "custom" && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.9rem' }}>
                  Custom Duration (Days)
                </label>
                <input
                  type="number"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  placeholder="Enter days"
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
            )}

            {/* Plan Info */}
            {selectedPlan && (
              <div style={{
                backgroundColor: '#0f172a',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '10px' }}>
                  {getSelectedPlan()?.name}
                </h3>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                  <div>APY: {getSelectedPlan()?.apy}%</div>
                  <div>Min: {formatCurrency(getSelectedPlan()?.minAmount || 0)}</div>
                  <div>Max: {formatCurrency(getSelectedPlan()?.maxAmount || 0)}</div>
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div>
            {/* Calculation Results */}
            <div style={{
              backgroundColor: '#1e293b',
              padding: '30px',
              borderRadius: '15px',
              border: '1px solid #475569',
              marginBottom: '30px'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '25px' }}>
                Calculation Results
              </h2>

              <div style={{ display: 'grid', gap: '20px' }}>
                <div style={{
                  backgroundColor: '#0f172a',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid #374151'
                }}>
                  <div style={{ color: '#10b981', fontSize: '0.9rem', marginBottom: '5px' }}>
                    Daily Profit
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                    {formatCurrency(results.dailyProfit)}
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#0f172a',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid #374151'
                }}>
                  <div style={{ color: '#3b82f6', fontSize: '0.9rem', marginBottom: '5px' }}>
                    Total Profit
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                    {formatCurrency(results.totalProfit)}
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#0f172a',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid #374151'
                }}>
                  <div style={{ color: '#f59e0b', fontSize: '0.9rem', marginBottom: '5px' }}>
                    Total Return
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                    {formatCurrency(results.totalReturn)}
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#0f172a',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid #374151'
                }}>
                  <div style={{ color: '#8b5cf6', fontSize: '0.9rem', marginBottom: '5px' }}>
                    ROI
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                    {results.roi.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Projection Timeline */}
            {results.dailyProfit > 0 && (
              <div style={{
                backgroundColor: '#1e293b',
                padding: '30px',
                borderRadius: '15px',
                border: '1px solid #475569'
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '25px' }}>
                  Growth Projection
                </h2>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #475569' }}>
                        <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8', fontSize: '0.9rem' }}>
                          Day
                        </th>
                        <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8', fontSize: '0.9rem' }}>
                          Profit
                        </th>
                        <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8', fontSize: '0.9rem' }}>
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {generateProjection().map((row, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #374151' }}>
                          <td style={{ padding: '12px', fontWeight: '600' }}>
                            {row.day}
                          </td>
                          <td style={{ padding: '12px', color: '#10b981' }}>
                            {formatCurrency(row.profit)}
                          </td>
                          <td style={{ padding: '12px', fontWeight: '600' }}>
                            {formatCurrency(row.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        {results.totalReturn > 0 && (
          <div style={{
            backgroundColor: '#1e293b',
            padding: '30px',
            borderRadius: '15px',
            border: '1px solid #475569',
            textAlign: 'center',
            marginTop: '40px'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px' }}>
              Ready to Start Investing?
            </h2>
            <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
              Based on your calculation, you could earn {formatCurrency(results.totalProfit)} in profit!
            </p>
            <a
              href="/investments"
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                display: 'inline-block'
              }}
            >
              Start Investing Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
}