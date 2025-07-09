import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface FinancialRecommendation {
  id: string;
  type: 'investment' | 'portfolio_rebalance' | 'risk_adjustment' | 'diversification';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  expectedReturn: number;
  riskLevel: number;
  timeframe: string;
  actionItems: string[];
  reasoning: string;
  confidence: number;
  potentialGains: number;
  potentialLosses: number;
  marketFactors: string[];
}

interface MarketInsight {
  category: 'trend' | 'opportunity' | 'risk' | 'economic';
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  severity: number;
  timeframe: 'immediate' | 'short_term' | 'medium_term' | 'long_term';
  affectedSectors: string[];
  recommendation: string;
}

interface PortfolioHealth {
  score: number;
  riskLevel: number;
  diversification: number;
  performance: number;
}

export default function AIFinancialAssistant() {
  const [selectedTab, setSelectedTab] = useState<'dashboard' | 'recommendations' | 'insights' | 'education'>('dashboard');
  const [selectedRecommendation, setSelectedRecommendation] = useState<FinancialRecommendation | null>(null);
  
  // Demo user ID - in real app this would come from auth context
  const userId = 1;

  const { data: dashboardData, isLoading: dashboardLoading } = useQuery({
    queryKey: [`/api/ai/financial/dashboard/${userId}`],
    enabled: selectedTab === 'dashboard'
  });

  const { data: recommendationsData, isLoading: recommendationsLoading } = useQuery({
    queryKey: [`/api/ai/financial/recommendations/${userId}`],
    enabled: selectedTab === 'recommendations'
  });

  const { data: insightsData, isLoading: insightsLoading } = useQuery({
    queryKey: ['/api/ai/financial/market-insights'],
    enabled: selectedTab === 'insights'
  });

  const { data: educationData, isLoading: educationLoading } = useQuery({
    queryKey: [`/api/ai/financial/education/${userId}`],
    enabled: selectedTab === 'education'
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'critical': return '#ef4444';
      case 'high': return '#f97316';
      case 'medium': return '#eab308';
      case 'low': return '#22c55e';
      default: return '#64748b';
    }
  };

  const getImpactColor = (impact: string) => {
    switch(impact) {
      case 'positive': return '#22c55e';
      case 'negative': return '#ef4444';
      case 'neutral': return '#64748b';
      default: return '#64748b';
    }
  };

  const handleAcceptRecommendation = async (recommendationId: string) => {
    try {
      const response = await fetch(`/api/ai/financial/recommendation/${userId}/${recommendationId}/accept`, {
        method: 'POST'
      });
      
      if (response.ok) {
        alert('Recommendation accepted and implementation initiated!');
        setSelectedRecommendation(null);
      }
    } catch (error) {
      console.error('Error accepting recommendation:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', padding: '20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
            AI Financial Assistant
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            Advanced financial analysis and personalized investment recommendations powered by AI
          </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '4px', 
          marginBottom: '30px',
          backgroundColor: '#1e293b',
          padding: '4px',
          borderRadius: '8px',
          border: '1px solid #475569'
        }}>
          {[
            { key: 'dashboard', label: 'Dashboard' },
            { key: 'recommendations', label: 'Recommendations' },
            { key: 'insights', label: 'Market Insights' },
            { key: 'education', label: 'Education' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as any)}
              style={{
                padding: '12px 24px',
                backgroundColor: selectedTab === tab.key ? '#3b82f6' : 'transparent',
                color: selectedTab === tab.key ? 'white' : '#94a3b8',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {selectedTab === 'dashboard' && (
          <div>
            {dashboardLoading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                Loading financial dashboard...
              </div>
            ) : (
              <div>
                {/* Portfolio Overview */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '20px',
                  marginBottom: '30px'
                }}>
                  <div style={{
                    backgroundColor: '#1e293b',
                    padding: '25px',
                    borderRadius: '12px',
                    border: '1px solid #475569'
                  }}>
                    <div style={{ color: '#3b82f6', fontSize: '0.9rem', marginBottom: '5px' }}>Portfolio Value</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                      {formatCurrency(dashboardData?.data?.overview?.portfolioValue || 0)}
                    </div>
                    <div style={{ color: '#22c55e', fontSize: '0.8rem', marginTop: '5px' }}>
                      ↗ {formatCurrency(dashboardData?.data?.overview?.totalReturn || 0)} total return
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: '#1e293b',
                    padding: '25px',
                    borderRadius: '12px',
                    border: '1px solid #475569'
                  }}>
                    <div style={{ color: '#10b981', fontSize: '0.9rem', marginBottom: '5px' }}>Annual Return</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                      {(dashboardData?.data?.overview?.annualizedReturn || 0).toFixed(1)}%
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '5px' }}>
                      Annualized performance
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: '#1e293b',
                    padding: '25px',
                    borderRadius: '12px',
                    border: '1px solid #475569'
                  }}>
                    <div style={{ color: '#f59e0b', fontSize: '0.9rem', marginBottom: '5px' }}>Portfolio Health</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                      {dashboardData?.data?.overview?.portfolioHealth?.score || 0}/100
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '5px' }}>
                      Overall assessment
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: '#1e293b',
                    padding: '25px',
                    borderRadius: '12px',
                    border: '1px solid #475569'
                  }}>
                    <div style={{ color: '#8b5cf6', fontSize: '0.9rem', marginBottom: '5px' }}>Active Recommendations</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                      {dashboardData?.data?.recommendations?.highPriority?.length || 0}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '5px' }}>
                      High priority actions
                    </div>
                  </div>
                </div>

                {/* Top Recommendations Preview */}
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
                    Top Recommendations
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {dashboardData?.data?.recommendations?.highPriority?.slice(0, 3).map((rec: any, index: number) => (
                      <div key={index} style={{
                        backgroundColor: '#1e293b',
                        padding: '20px',
                        borderRadius: '10px',
                        border: '1px solid #475569',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '10px',
                            marginBottom: '8px'
                          }}>
                            <div style={{
                              backgroundColor: getPriorityColor(rec.priority),
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: '600'
                            }}>
                              {rec.priority?.toUpperCase()}
                            </div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
                              {rec.title}
                            </h4>
                          </div>
                          <p style={{ color: '#94a3b8', margin: 0 }}>
                            {rec.description}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedTab('recommendations')}
                          style={{
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: 'none',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            marginLeft: '20px'
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Market Overview */}
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
                    Market Overview
                  </h3>
                  <div style={{
                    backgroundColor: '#1e293b',
                    padding: '25px',
                    borderRadius: '12px',
                    border: '1px solid #475569'
                  }}>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                      gap: '20px'
                    }}>
                      <div>
                        <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '5px' }}>
                          Market Trend
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#22c55e' }}>
                          {dashboardData?.data?.market?.conditions?.trend || 'Analyzing...'}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '5px' }}>
                          Volatility
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f59e0b' }}>
                          {dashboardData?.data?.market?.conditions?.volatility || 'Calculating...'}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '5px' }}>
                          AI Confidence
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                          {((dashboardData?.data?.market?.conditions?.confidence || 0) * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Recommendations Tab */}
        {selectedTab === 'recommendations' && (
          <div>
            {recommendationsLoading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                Generating AI recommendations...
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ color: '#94a3b8', fontSize: '1rem' }}>
                    {recommendationsData?.data?.recommendations?.length || 0} recommendations found
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {recommendationsData?.data?.recommendations?.map((rec: FinancialRecommendation, index: number) => (
                    <div key={rec.id} style={{
                      backgroundColor: '#1e293b',
                      padding: '25px',
                      borderRadius: '12px',
                      border: '1px solid #475569'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start',
                        marginBottom: '15px'
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '10px',
                            marginBottom: '10px'
                          }}>
                            <div style={{
                              backgroundColor: getPriorityColor(rec.priority),
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: '600'
                            }}>
                              {rec.priority.toUpperCase()}
                            </div>
                            <div style={{
                              backgroundColor: '#475569',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '0.75rem'
                            }}>
                              {rec.type.replace('_', ' ').toUpperCase()}
                            </div>
                            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                              {rec.timeframe}
                            </div>
                          </div>
                          <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px' }}>
                            {rec.title}
                          </h3>
                          <p style={{ color: '#94a3b8', marginBottom: '15px' }}>
                            {rec.description}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right', marginLeft: '20px' }}>
                          <div style={{ color: '#22c55e', fontSize: '1.1rem', fontWeight: 'bold' }}>
                            +{rec.expectedReturn.toFixed(1)}%
                          </div>
                          <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                            Expected return
                          </div>
                        </div>
                      </div>

                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                        gap: '15px',
                        marginBottom: '20px'
                      }}>
                        <div>
                          <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '4px' }}>
                            Potential Gains
                          </div>
                          <div style={{ color: '#22c55e', fontSize: '1rem', fontWeight: '600' }}>
                            {formatCurrency(rec.potentialGains)}
                          </div>
                        </div>
                        <div>
                          <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '4px' }}>
                            Risk Level
                          </div>
                          <div style={{ color: '#f59e0b', fontSize: '1rem', fontWeight: '600' }}>
                            {rec.riskLevel}/10
                          </div>
                        </div>
                        <div>
                          <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '4px' }}>
                            AI Confidence
                          </div>
                          <div style={{ color: '#8b5cf6', fontSize: '1rem', fontWeight: '600' }}>
                            {(rec.confidence * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '10px' }}>
                          Recommended Actions:
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {rec.actionItems.map((action, actionIndex) => (
                            <li key={actionIndex} style={{ 
                              marginBottom: '6px', 
                              display: 'flex', 
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <div style={{
                                width: '6px',
                                height: '6px',
                                backgroundColor: '#3b82f6',
                                borderRadius: '50%'
                              }}></div>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        gap: '15px'
                      }}>
                        <button
                          onClick={() => setSelectedRecommendation(rec)}
                          style={{
                            backgroundColor: 'transparent',
                            color: '#3b82f6',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: '1px solid #3b82f6',
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                          }}
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleAcceptRecommendation(rec.id)}
                          style={{
                            backgroundColor: getPriorityColor(rec.priority),
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: 'none',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Accept Recommendation
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Market Insights Tab */}
        {selectedTab === 'insights' && (
          <div>
            {insightsLoading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                Analyzing market conditions...
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ color: '#94a3b8', fontSize: '1rem' }}>
                    {insightsData?.data?.insights?.length || 0} market insights available
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {insightsData?.data?.insights?.map((insight: MarketInsight, index: number) => (
                    <div key={index} style={{
                      backgroundColor: '#1e293b',
                      padding: '25px',
                      borderRadius: '12px',
                      border: '1px solid #475569'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start',
                        marginBottom: '15px'
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '10px',
                            marginBottom: '10px'
                          }}>
                            <div style={{
                              backgroundColor: getImpactColor(insight.impact),
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: '600'
                            }}>
                              {insight.impact.toUpperCase()}
                            </div>
                            <div style={{
                              backgroundColor: '#475569',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '0.75rem'
                            }}>
                              {insight.category.toUpperCase()}
                            </div>
                            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                              {insight.timeframe.replace('_', ' ')}
                            </div>
                          </div>
                          <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px' }}>
                            {insight.title}
                          </h3>
                          <p style={{ color: '#94a3b8', marginBottom: '15px' }}>
                            {insight.description}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right', marginLeft: '20px' }}>
                          <div style={{ 
                            color: getImpactColor(insight.impact), 
                            fontSize: '1.5rem', 
                            fontWeight: 'bold' 
                          }}>
                            {insight.severity}/10
                          </div>
                          <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                            Severity
                          </div>
                        </div>
                      </div>

                      <div style={{ marginBottom: '15px' }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '8px' }}>
                          Affected Sectors:
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {insight.affectedSectors.map((sector, sectorIndex) => (
                            <div key={sectorIndex} style={{
                              backgroundColor: '#475569',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '0.8rem'
                            }}>
                              {sector}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{
                        backgroundColor: '#334155',
                        padding: '15px',
                        borderRadius: '8px',
                        border: '1px solid #475569'
                      }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '8px' }}>
                          AI Recommendation:
                        </div>
                        <div style={{ color: 'white' }}>
                          {insight.recommendation}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Education Tab */}
        {selectedTab === 'education' && (
          <div>
            {educationLoading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                Preparing personalized content...
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ color: '#94a3b8', fontSize: '1rem' }}>
                    Personalized for {educationData?.data?.userExperience} level • {educationData?.data?.riskTolerance} risk tolerance
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {educationData?.data?.content?.map((content: any, index: number) => (
                    <div key={index} style={{
                      backgroundColor: '#1e293b',
                      padding: '25px',
                      borderRadius: '12px',
                      border: '1px solid #475569'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px',
                        marginBottom: '15px'
                      }}>
                        <div style={{
                          backgroundColor: content.difficulty === 'beginner' ? '#22c55e' : 
                                         content.difficulty === 'intermediate' ? '#f59e0b' : '#ef4444',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {content.difficulty.toUpperCase()}
                        </div>
                        <div style={{
                          backgroundColor: '#475569',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.75rem'
                        }}>
                          {content.category}
                        </div>
                      </div>
                      
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '15px' }}>
                        {content.title}
                      </h3>
                      
                      <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                        {content.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Recommendation Detail Modal */}
        {selectedRecommendation && (
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
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: '#1e293b',
              padding: '30px',
              borderRadius: '15px',
              border: '1px solid #475569',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                  Recommendation Details
                </h2>
                <button
                  onClick={() => setSelectedRecommendation(null)}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#94a3b8',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    padding: '5px'
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
                  {selectedRecommendation.title}
                </h3>
                <p style={{ color: '#94a3b8', marginBottom: '15px' }}>
                  {selectedRecommendation.description}
                </p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '10px', color: '#3b82f6' }}>
                  AI Analysis & Reasoning
                </h4>
                <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                  {selectedRecommendation.reasoning}
                </p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '10px', color: '#22c55e' }}>
                  Action Plan
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {selectedRecommendation.actionItems.map((action, index) => (
                    <li key={index} style={{ 
                      marginBottom: '8px', 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#22c55e',
                        borderRadius: '50%'
                      }}></div>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                gap: '15px',
                marginTop: '25px'
              }}>
                <button
                  onClick={() => setSelectedRecommendation(null)}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#94a3b8',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    border: '1px solid #475569',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
                <button
                  onClick={() => handleAcceptRecommendation(selectedRecommendation.id)}
                  style={{
                    backgroundColor: getPriorityColor(selectedRecommendation.priority),
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Accept Recommendation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}