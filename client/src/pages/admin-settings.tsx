/**
 * WordPress Admin Settings Page
 * Comprehensive admin panel for platform configuration and management
 */

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  Shield, 
  DollarSign, 
  Users, 
  Mail, 
  Database,
  Key,
  Globe,
  BarChart3,
  Bell,
  Zap,
  Lock,
  CreditCard,
  UserPlus,
  Activity
} from 'lucide-react';

interface AdminSetting {
  id: string;
  label: string;
  value: string | boolean | number;
  type: 'text' | 'password' | 'boolean' | 'number' | 'select';
  description: string;
  options?: string[];
}

const adminSettings: { [key: string]: AdminSetting[] } = {
  general: [
    {
      id: 'site_name',
      label: 'Platform Name',
      value: 'BlackCnote Investment Platform',
      type: 'text',
      description: 'The name displayed across the platform'
    },
    {
      id: 'site_description',
      label: 'Platform Description',
      value: 'AI-Powered Investment Platform for Modern Investors',
      type: 'text',
      description: 'Brief description used in meta tags and social sharing'
    },
    {
      id: 'admin_email',
      label: 'Administrator Email',
      value: 'admin@blackcnote.com',
      type: 'text',
      description: 'Primary contact email for platform notifications'
    },
    {
      id: 'maintenance_mode',
      label: 'Maintenance Mode',
      value: false,
      type: 'boolean',
      description: 'Put the platform in maintenance mode'
    },
    {
      id: 'platform_logo_url',
      label: 'Platform Logo URL',
      value: '/assets/img/hero-logo.png',
      type: 'text',
      description: 'URL to the platform logo image'
    },
    {
      id: 'platform_timezone',
      label: 'Platform Timezone',
      value: 'UTC',
      type: 'select',
      options: ['UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Asia/Tokyo'],
      description: 'Default timezone for the platform'
    },
    {
      id: 'debug_mode',
      label: 'Debug Mode',
      value: false,
      type: 'boolean',
      description: 'Enable debug mode for development'
    }
  ],
  security: [
    {
      id: 'force_2fa',
      label: 'Force 2FA for All Users',
      value: false,
      type: 'boolean',
      description: 'Require all users to enable two-factor authentication'
    },
    {
      id: 'session_timeout',
      label: 'Session Timeout (minutes)',
      value: 30,
      type: 'number',
      description: 'Automatic logout time for inactive sessions'
    },
    {
      id: 'password_requirements',
      label: 'Strong Password Policy',
      value: true,
      type: 'boolean',
      description: 'Enforce strong password requirements'
    },
    {
      id: 'login_attempts',
      label: 'Max Login Attempts',
      value: 5,
      type: 'number',
      description: 'Maximum failed login attempts before account lockout'
    }
  ],
  investment: [
    {
      id: 'min_investment',
      label: 'Minimum Investment Amount',
      value: 100,
      type: 'number',
      description: 'Minimum amount required for any investment'
    },
    {
      id: 'max_investment',
      label: 'Maximum Investment Amount',
      value: 100000,
      type: 'number',
      description: 'Maximum amount allowed per investment'
    },
    {
      id: 'auto_compound',
      label: 'Auto-Compounding Available',
      value: true,
      type: 'boolean',
      description: 'Allow users to enable automatic profit reinvestment'
    },
    {
      id: 'withdrawal_approval',
      label: 'Manual Withdrawal Approval',
      value: false,
      type: 'boolean',
      description: 'Require manual approval for all withdrawal requests'
    }
  ],
  payments: [
    {
      id: 'payment_currency',
      label: 'Default Currency',
      value: 'USD',
      type: 'select',
      options: ['USD', 'EUR', 'GBP', 'BTC', 'ETH'],
      description: 'Primary currency for the platform'
    },
    {
      id: 'deposit_fee',
      label: 'Deposit Fee (%)',
      value: 0,
      type: 'number',
      description: 'Percentage fee charged on deposits'
    },
    {
      id: 'withdrawal_fee',
      label: 'Withdrawal Fee (%)',
      value: 2.5,
      type: 'number',
      description: 'Percentage fee charged on withdrawals'
    },
    {
      id: 'instant_withdrawal',
      label: 'Instant Withdrawals',
      value: true,
      type: 'boolean',
      description: 'Process withdrawals automatically without delay'
    }
  ],
  notifications: [
    {
      id: 'email_notifications',
      label: 'Email Notifications',
      value: true,
      type: 'boolean',
      description: 'Send email notifications for platform events'
    },
    {
      id: 'sms_notifications',
      label: 'SMS Notifications',
      value: false,
      type: 'boolean',
      description: 'Send SMS notifications for critical events'
    },
    {
      id: 'push_notifications',
      label: 'Push Notifications',
      value: true,
      type: 'boolean',
      description: 'Send push notifications to mobile app users'
    },
    {
      id: 'smtp_host',
      label: 'SMTP Host',
      value: 'smtp.gmail.com',
      type: 'text',
      description: 'SMTP server hostname for email sending'
    },
    {
      id: 'smtp_port',
      label: 'SMTP Port',
      value: 587,
      type: 'number',
      description: 'SMTP server port'
    },
    {
      id: 'smtp_user',
      label: 'SMTP Username',
      value: '',
      type: 'text',
      description: 'SMTP authentication username'
    },
    {
      id: 'smtp_password',
      label: 'SMTP Password',
      value: '',
      type: 'password',
      description: 'SMTP authentication password'
    }
  ],
  analytics: [
    {
      id: 'analytics_enabled',
      label: 'Platform Analytics',
      value: true,
      type: 'boolean',
      description: 'Enable platform analytics and tracking'
    },
    {
      id: 'analytics_key',
      label: 'Analytics API Key',
      value: '',
      type: 'password',
      description: 'API key for analytics service'
    },
    {
      id: 'sentry_dsn',
      label: 'Sentry DSN',
      value: '',
      type: 'password',
      description: 'Sentry DSN for error tracking'
    },
    {
      id: 'user_behavior_tracking',
      label: 'User Behavior Tracking',
      value: true,
      type: 'boolean',
      description: 'Track user behavior for optimization'
    }
  ],
  wordpress: [
    {
      id: 'wp_integration_enabled',
      label: 'WordPress Integration',
      value: true,
      type: 'boolean',
      description: 'Enable WordPress plugin integration'
    },
    {
      id: 'wp_api_base_url',
      label: 'WordPress API Base URL',
      value: '/wp-json/wp/v2/',
      type: 'text',
      description: 'Base URL for WordPress REST API'
    },
    {
      id: 'jwt_auth_enabled',
      label: 'JWT Authentication',
      value: true,
      type: 'boolean',
      description: 'Enable JWT authentication for WordPress'
    },
    {
      id: 'wp_nonce_verification',
      label: 'WordPress Nonce Verification',
      value: true,
      type: 'boolean',
      description: 'Verify WordPress nonces for security'
    },
    {
      id: 'hyiplab_compatibility',
      label: 'HYIPLab Plugin Compatibility',
      value: true,
      type: 'boolean',
      description: 'Maintain compatibility with HYIPLab plugin'
    }
  ],
  performance: [
    {
      id: 'caching_enabled',
      label: 'Response Caching',
      value: true,
      type: 'boolean',
      description: 'Enable API response caching'
    },
    {
      id: 'cache_duration',
      label: 'Cache Duration (minutes)',
      value: 15,
      type: 'number',
      description: 'How long to cache API responses'
    },
    {
      id: 'rate_limit_enabled',
      label: 'Rate Limiting',
      value: true,
      type: 'boolean',
      description: 'Enable API rate limiting'
    },
    {
      id: 'rate_limit_max',
      label: 'Rate Limit Max Requests',
      value: 100,
      type: 'number',
      description: 'Maximum requests per rate limit window'
    },
    {
      id: 'rate_limit_window_ms',
      label: 'Rate Limit Window (ms)',
      value: 900000,
      type: 'number',
      description: 'Rate limit time window in milliseconds'
    },
    {
      id: 'redis_enabled',
      label: 'Redis Caching',
      value: false,
      type: 'boolean',
      description: 'Enable Redis for advanced caching'
    },
    {
      id: 'redis_url',
      label: 'Redis URL',
      value: 'redis://localhost:6379',
      type: 'text',
      description: 'Redis connection URL'
    }
  ]
};

const categoryIcons: { [key: string]: React.ComponentType } = {
  general: Settings,
  security: Shield,
  investment: DollarSign,
  payments: CreditCard,
  notifications: Bell,
  analytics: BarChart3,
  wordpress: Globe,
  performance: Activity
};

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState(adminSettings);
  const [hasChanges, setHasChanges] = useState(false);

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
    // Here you would save the settings to the backend
    console.log('Saving settings:', settings);
    setHasChanges(false);
    alert('Settings saved successfully!');
  };

  const resetToDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to default values?')) {
      setSettings(adminSettings);
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
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid rgba(59, 130, 246, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Settings size={28} style={{ color: '#3b82f6' }} />
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            WordPress Admin Settings
          </h1>
        </div>
        <p style={{ color: '#94a3b8', margin: 0 }}>
          Configure platform settings, security policies, and administrative preferences
        </p>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Settings Navigation */}
        <div style={{ width: '250px' }}>
          <Card style={{
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'white' }}>
              Settings Categories
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
                      backgroundColor: activeTab === category ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      color: activeTab === category ? '#3b82f6' : '#94a3b8',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    <Icon size={16} />
                    <span style={{ fontWeight: '500', textTransform: 'capitalize' }}>
                      {category}
                    </span>
                  </button>
                );
              })}
            </nav>
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
                {activeTab} Settings
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
                    backgroundColor: hasChanges ? '#3b82f6' : '#1e293b',
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
                            style={{ accentColor: '#3b82f6' }}
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
                      ) : (
                        <input
                          type={setting.type}
                          value={setting.value as string | number}
                          onChange={(e) => updateSetting(activeTab, setting.id, 
                            setting.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value
                          )}
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
          backgroundColor: 'rgba(59, 130, 246, 0.9)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          You have unsaved changes
        </div>
      )}
    </div>
  );
}