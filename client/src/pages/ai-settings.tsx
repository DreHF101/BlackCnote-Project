/**
 * AI Configuration Settings Page
 * Comprehensive AI model and service configuration for investment recommendations
 */

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Settings, 
  Key, 
  Zap, 
  BarChart3,
  Target,
  Shield,
  Database,
  Cpu,
  Globe,
  Activity,
  AlertTriangle
} from 'lucide-react';

interface AISetting {
  id: string;
  label: string;
  value: string | boolean | number;
  type: 'text' | 'password' | 'boolean' | 'number' | 'select' | 'range';
  description: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

const aiSettings: { [key: string]: AISetting[] } = {
  models: [
    {
      id: 'ai_provider',
      label: 'AI Provider',
      value: 'perplexity',
      type: 'select',
      options: ['perplexity', 'openai', 'anthropic', 'xai', 'local'],
      description: 'Primary AI service provider for investment analysis'
    },
    {
      id: 'perplexity_api_key',
      label: 'Perplexity API Key',
      value: '',
      type: 'password',
      description: 'API key for Perplexity AI service (llama-3.1-sonar-small-128k-online)'
    },
    {
      id: 'openai_api_key',
      label: 'OpenAI API Key',
      value: '',
      type: 'password',
      description: 'API key for OpenAI GPT models'
    },
    {
      id: 'xai_api_key',
      label: 'xAI API Key',
      value: '',
      type: 'password',
      description: 'API key for xAI Grok models (grok-2-1212, grok-vision-beta)'
    },
    {
      id: 'ai_model',
      label: 'Primary AI Model',
      value: 'llama-3.1-sonar-small-128k-online',
      type: 'select',
      options: [
        'llama-3.1-sonar-small-128k-online',
        'llama-3.1-sonar-large-128k-online',
        'gpt-4-turbo',
        'gpt-3.5-turbo',
        'grok-2-1212',
        'grok-vision-beta'
      ],
      description: 'AI model used for investment recommendations'
    }
  ],
  recommendations: [
    {
      id: 'recommendation_frequency',
      label: 'Recommendation Update Frequency (hours)',
      value: 24,
      type: 'number',
      min: 1,
      max: 168,
      description: 'How often AI recommendations are refreshed'
    },
    {
      id: 'min_confidence_threshold',
      label: 'Minimum Confidence Threshold (%)',
      value: 75,
      type: 'range',
      min: 50,
      max: 95,
      step: 5,
      description: 'Minimum confidence score required for AI recommendations'
    },
    {
      id: 'max_recommendations_per_user',
      label: 'Max Recommendations Per User',
      value: 5,
      type: 'number',
      min: 1,
      max: 20,
      description: 'Maximum number of active recommendations per user'
    },
    {
      id: 'enable_real_time_analysis',
      label: 'Real-time Market Analysis',
      value: true,
      type: 'boolean',
      description: 'Enable real-time market data analysis for recommendations'
    },
    {
      id: 'risk_assessment_enabled',
      label: 'AI Risk Assessment',
      value: true,
      type: 'boolean',
      description: 'Enable AI-powered risk assessment for investments'
    }
  ],
  apy: [
    {
      id: 'dynamic_apy_enabled',
      label: 'Dynamic APY Calculation',
      value: true,
      type: 'boolean',
      description: 'Enable AI-powered dynamic APY adjustments'
    },
    {
      id: 'base_apy_rate',
      label: 'Base APY Rate (%)',
      value: 12.5,
      type: 'number',
      min: 1,
      max: 50,
      step: 0.1,
      description: 'Base annual percentage yield before AI adjustments'
    },
    {
      id: 'max_performance_bonus',
      label: 'Max Performance Bonus (%)',
      value: 5.0,
      type: 'number',
      min: 0,
      max: 20,
      step: 0.1,
      description: 'Maximum performance-based APY bonus'
    },
    {
      id: 'loyalty_multiplier_max',
      label: 'Max Loyalty Multiplier',
      value: 1.5,
      type: 'number',
      min: 1.0,
      max: 3.0,
      step: 0.1,
      description: 'Maximum loyalty multiplier for long-term investors'
    },
    {
      id: 'market_adjustment_range',
      label: 'Market Adjustment Range (%)',
      value: 2.0,
      type: 'number',
      min: 0.5,
      max: 10.0,
      step: 0.1,
      description: 'Maximum market condition adjustment range'
    }
  ],
  smartPools: [
    {
      id: 'smart_pools_enabled',
      label: 'Smart Investment Pools',
      value: true,
      type: 'boolean',
      description: 'Enable AI-managed smart investment pools'
    },
    {
      id: 'pool_rebalancing_frequency',
      label: 'Pool Rebalancing Frequency (days)',
      value: 7,
      type: 'number',
      min: 1,
      max: 30,
      description: 'How often smart pools are rebalanced'
    },
    {
      id: 'min_pool_participants',
      label: 'Minimum Pool Participants',
      value: 10,
      type: 'number',
      min: 2,
      max: 100,
      description: 'Minimum participants required to activate a smart pool'
    },
    {
      id: 'max_pool_allocation',
      label: 'Max Pool Allocation per User (%)',
      value: 25,
      type: 'range',
      min: 5,
      max: 100,
      step: 5,
      description: 'Maximum percentage of portfolio that can be allocated to pools'
    }
  ],
  goals: [
    {
      id: 'goal_tracking_enabled',
      label: 'Investment Goal Tracking',
      value: true,
      type: 'boolean',
      description: 'Enable AI-powered investment goal tracking'
    },
    {
      id: 'goal_adjustment_sensitivity',
      label: 'Goal Adjustment Sensitivity',
      value: 'medium',
      type: 'select',
      options: ['low', 'medium', 'high'],
      description: 'How sensitive AI is to suggesting goal adjustments'
    },
    {
      id: 'progress_update_frequency',
      label: 'Progress Update Frequency (hours)',
      value: 6,
      type: 'number',
      min: 1,
      max: 72,
      description: 'How often goal progress is updated'
    },
    {
      id: 'milestone_notifications',
      label: 'Milestone Notifications',
      value: true,
      type: 'boolean',
      description: 'Send notifications when investment goals reach milestones'
    }
  ],
  performance: [
    {
      id: 'ai_response_timeout',
      label: 'AI Response Timeout (seconds)',
      value: 30,
      type: 'number',
      min: 5,
      max: 120,
      description: 'Maximum time to wait for AI responses'
    },
    {
      id: 'cache_ai_responses',
      label: 'Cache AI Responses',
      value: true,
      type: 'boolean',
      description: 'Cache AI responses to improve performance'
    },
    {
      id: 'cache_duration_minutes',
      label: 'Cache Duration (minutes)',
      value: 30,
      type: 'number',
      min: 5,
      max: 1440,
      description: 'How long to cache AI responses'
    },
    {
      id: 'concurrent_ai_requests',
      label: 'Max Concurrent AI Requests',
      value: 10,
      type: 'number',
      min: 1,
      max: 50,
      description: 'Maximum number of concurrent AI API requests'
    }
  ]
};

const categoryIcons: { [key: string]: React.ComponentType } = {
  models: Brain,
  recommendations: BarChart3,
  apy: Zap,
  smartPools: Target,
  goals: Activity,
  performance: Cpu
};

export default function AISettings() {
  const [activeTab, setActiveTab] = useState('models');
  const [settings, setSettings] = useState(aiSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);

  const updateSetting = (category: string, settingId: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: prev[category].map(setting =>
        setting.id === settingId ? { ...setting, value } : setting
      )
    }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    console.log('Saving AI settings:', settings);
    setHasChanges(false);
    alert('AI settings saved successfully!');
  };

  const testAIConnection = async () => {
    setTestingConnection(true);
    try {
      // Simulate API connection test
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('AI connection test successful!');
    } catch (error) {
      alert('AI connection test failed. Please check your API keys.');
    } finally {
      setTestingConnection(false);
    }
  };

  const resetToDefaults = () => {
    if (confirm('Are you sure you want to reset all AI settings to default values?')) {
      setSettings(aiSettings);
      setHasChanges(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1))',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid rgba(147, 51, 234, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Brain size={28} style={{ color: '#9333ea' }} />
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            AI Configuration Settings
          </h1>
        </div>
        <p style={{ color: '#94a3b8', margin: 0 }}>
          Configure AI models, investment recommendations, and intelligent features
        </p>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Settings Navigation */}
        <div style={{ width: '280px' }}>
          <Card style={{
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'white' }}>
              AI Settings Categories
            </h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {Object.keys(settings).map((category) => {
                const Icon = categoryIcons[category];
                return (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px',
                      backgroundColor: activeTab === category ? 'rgba(147, 51, 234, 0.2)' : 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      color: activeTab === category ? '#9333ea' : '#94a3b8',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    <Icon size={16} />
                    <span style={{ fontWeight: '500', textTransform: 'capitalize' }}>
                      {category === 'apy' ? 'Dynamic APY' : category.replace(/([A-Z])/g, ' $1')}
                    </span>
                  </button>
                );
              })}
            </nav>
            
            {/* Connection Test */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #334155' }}>
              <Button
                onClick={testAIConnection}
                disabled={testingConnection}
                style={{
                  width: '100%',
                  backgroundColor: testingConnection ? '#1e293b' : '#9333ea',
                  border: 'none',
                  color: 'white'
                }}
              >
                {testingConnection ? 'Testing...' : 'Test AI Connection'}
              </Button>
            </div>
          </Card>
        </div>

        {/* Settings Content */}
        <div style={{ flex: 1 }}>
          <Card style={{
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0, textTransform: 'capitalize' }}>
                {activeTab === 'apy' ? 'Dynamic APY' : activeTab.replace(/([A-Z])/g, ' $1')} Settings
              </h2>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button
                  onClick={resetToDefaults}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #64748b',
                    color: '#64748b'
                  }}
                >
                  Reset to Defaults
                </Button>
                <Button
                  onClick={saveSettings}
                  disabled={!hasChanges}
                  style={{
                    backgroundColor: hasChanges ? '#9333ea' : '#1e293b',
                    border: 'none',
                    color: 'white'
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {settings[activeTab]?.map((setting) => (
                <div key={setting.id} style={{
                  padding: '20px',
                  backgroundColor: 'rgba(30, 41, 59, 0.5)',
                  borderRadius: '8px',
                  border: '1px solid #334155'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: 'white', marginBottom: '4px', display: 'block' }}>
                        {setting.label}
                      </label>
                      <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                        {setting.description}
                      </p>
                    </div>
                    
                    <div style={{ minWidth: '200px' }}>
                      {setting.type === 'boolean' ? (
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={setting.value as boolean}
                            onChange={(e) => updateSetting(activeTab, setting.id, e.target.checked)}
                            style={{ accentColor: '#9333ea' }}
                          />
                          <span style={{ color: '#94a3b8', fontSize: '14px' }}>
                            {setting.value ? 'Enabled' : 'Disabled'}
                          </span>
                        </label>
                      ) : setting.type === 'select' ? (
                        <select
                          value={setting.value as string}
                          onChange={(e) => updateSetting(activeTab, setting.id, e.target.value)}
                          style={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '6px',
                            color: 'white',
                            padding: '8px 12px',
                            width: '100%'
                          }}
                        >
                          {setting.options?.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : setting.type === 'range' ? (
                        <div>
                          <input
                            type="range"
                            min={setting.min}
                            max={setting.max}
                            step={setting.step || 1}
                            value={setting.value as number}
                            onChange={(e) => updateSetting(activeTab, setting.id, parseFloat(e.target.value))}
                            style={{ width: '100%', accentColor: '#9333ea' }}
                          />
                          <div style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                            {setting.value}
                          </div>
                        </div>
                      ) : (
                        <input
                          type={setting.type}
                          min={setting.min}
                          max={setting.max}
                          step={setting.step}
                          value={setting.value as string | number}
                          onChange={(e) => updateSetting(activeTab, setting.id, 
                            setting.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value
                          )}
                          placeholder={setting.type === 'password' ? '••••••••••••••••' : undefined}
                          style={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '6px',
                            color: 'white',
                            padding: '8px 12px',
                            width: '100%'
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {hasChanges && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'rgba(147, 51, 234, 0.9)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          You have unsaved AI configuration changes
        </div>
      )}
    </div>
  );
}