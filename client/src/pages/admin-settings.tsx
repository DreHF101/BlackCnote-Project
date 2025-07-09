/**
 * Admin Settings Panel
 * Comprehensive interface for managing API keys, integrations, and platform configuration
 */

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface Setting {
  id: number;
  key: string;
  value: string;
  category: string;
  description?: string;
  isEncrypted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface APIConfig {
  name: string;
  key: string;
  description: string;
  category: string;
  required: boolean;
  masked: boolean;
}

const CATEGORIES = [
  { id: 'AI_SERVICES', name: 'AI Services', icon: '🤖' },
  { id: 'PAYMENT_GATEWAYS', name: 'Payment Gateways', icon: '💳' },
  { id: 'CRYPTO_GATEWAYS', name: 'Crypto Gateways', icon: '₿' },
  { id: 'NOTIFICATIONS', name: 'Notifications', icon: '📧' },
  { id: 'MARKET_DATA', name: 'Market Data', icon: '📊' },
  { id: 'BRANDING', name: 'Branding', icon: '🎨' },
  { id: 'GENERAL', name: 'General', icon: '⚙️' },
  { id: 'INVESTMENT_LIMITS', name: 'Investment Limits', icon: '💰' },
  { id: 'REFERRAL_SYSTEM', name: 'Referral System', icon: '🎯' }
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('AI_SERVICES');
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingSettings, setEditingSettings] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch admin settings
  const { data: settingsData, isLoading, error } = useQuery({
    queryKey: ['admin-settings', adminKey],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/admin/settings?adminKey=${adminKey}`);
      return response.json();
    },
    enabled: isAuthenticated
  });

  // Fetch API configurations
  const { data: apiConfigsData } = useQuery({
    queryKey: ['admin-api-configs', adminKey],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/admin/api-configs?adminKey=${adminKey}`);
      return response.json();
    },
    enabled: isAuthenticated
  });

  // Update setting mutation
  const updateSettingMutation = useMutation({
    mutationFn: async (settingData: any) => {
      const response = await apiRequest('POST', `/api/admin/settings?adminKey=${adminKey}`, settingData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      toast({
        title: "Success",
        description: "Setting updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update setting",
        variant: "destructive"
      });
    }
  });

  // Test API key mutation
  const testApiKeyMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const response = await apiRequest('POST', `/api/admin/test-api-key?adminKey=${adminKey}`, { key, value });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: data.data.isValid ? "API Key Valid" : "API Key Invalid",
        description: data.data.message,
        variant: data.data.isValid ? "default" : "destructive"
      });
    }
  });

  const handleAuth = () => {
    if (adminKey === 'admin-demo-key' || adminKey === process.env.ADMIN_SECRET_KEY) {
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "Admin access granted",
      });
    } else {
      toast({
        title: "Authentication Failed",
        description: "Invalid admin key",
        variant: "destructive"
      });
    }
  };

  const handleUpdateSetting = async (key: string, value: string, category: string, description?: string, isEncrypted?: boolean) => {
    updateSettingMutation.mutate({
      key,
      value,
      category,
      description,
      isEncrypted
    });
  };

  const handleTestApiKey = (key: string, value: string) => {
    testApiKeyMutation.mutate({ key, value });
  };

  const filteredSettings = settingsData?.data?.settings?.filter((setting: Setting) => 
    setting.category === activeTab
  ) || [];

  const filteredApiConfigs = apiConfigsData?.data?.configs?.filter((config: APIConfig) =>
    config.category === activeTab
  ) || [];

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '40px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          maxWidth: '400px',
          width: '100%'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            🔒 Admin Access Required
          </h2>
          <p style={{
            color: '#94a3b8',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            Enter your admin key to access the settings panel
          </p>
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            placeholder="Admin Key"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              marginBottom: '20px'
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
          />
          <button
            onClick={handleAuth}
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Access Admin Panel
          </button>
          <p style={{
            color: '#64748b',
            fontSize: '12px',
            textAlign: 'center',
            marginTop: '15px'
          }}>
            Demo key: admin-demo-key
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              ⚙️ Admin Settings Panel
            </h1>
            <p style={{ color: '#94a3b8' }}>
              Manage API keys, integrations, and platform configuration
            </p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            style={{
              padding: '8px 16px',
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          gap: '2px',
          marginBottom: '30px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          padding: '4px',
          overflowX: 'auto'
        }}>
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              style={{
                padding: '12px 16px',
                background: activeTab === category.id ? 'rgba(59, 130, 246, 0.3)' : 'transparent',
                color: activeTab === category.id ? '#60a5fa' : '#94a3b8',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '30px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid rgba(255, 255, 255, 0.3)',
                borderTop: '4px solid #3b82f6',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto'
              }}></div>
              <p style={{ marginTop: '16px', color: '#94a3b8' }}>Loading settings...</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: '#ef4444', marginBottom: '16px' }}>Failed to load settings</p>
              <button
                onClick={() => queryClient.invalidateQueries({ queryKey: ['admin-settings'] })}
                style={{
                  padding: '8px 16px',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Retry
              </button>
            </div>
          ) : (
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: '#f59e0b'
              }}>
                {CATEGORIES.find(c => c.id === activeTab)?.icon} {CATEGORIES.find(c => c.id === activeTab)?.name}
              </h3>

              {/* API Configurations */}
              <div style={{ display: 'grid', gap: '20px' }}>
                {filteredApiConfigs.map((config: APIConfig) => {
                  const existingSetting = filteredSettings.find((s: Setting) => s.key === config.key);
                  const currentValue = editingSettings[config.key] !== undefined 
                    ? editingSettings[config.key] 
                    : existingSetting?.value || '';

                  return (
                    <div
                      key={config.key}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                        padding: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '12px'
                      }}>
                        <div style={{ flex: 1 }}>
                          <h4 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            marginBottom: '4px'
                          }}>
                            {config.name}
                            {config.required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
                          </h4>
                          <p style={{
                            color: '#94a3b8',
                            fontSize: '14px',
                            marginBottom: '12px'
                          }}>
                            {config.description}
                          </p>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {config.masked && (
                            <button
                              onClick={() => handleTestApiKey(config.key, currentValue)}
                              disabled={!currentValue || testApiKeyMutation.isPending}
                              style={{
                                padding: '6px 12px',
                                background: 'rgba(16, 185, 129, 0.2)',
                                color: '#10b981',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                borderRadius: '4px',
                                fontSize: '12px',
                                cursor: currentValue ? 'pointer' : 'not-allowed',
                                opacity: currentValue ? 1 : 0.5
                              }}
                            >
                              {testApiKeyMutation.isPending ? 'Testing...' : 'Test'}
                            </button>
                          )}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <input
                          type={config.masked ? 'password' : 'text'}
                          value={currentValue}
                          onChange={(e) => setEditingSettings(prev => ({
                            ...prev,
                            [config.key]: e.target.value
                          }))}
                          placeholder={config.masked ? 'Enter API key' : 'Enter value'}
                          style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: '6px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: 'white'
                          }}
                        />
                        <button
                          onClick={() => handleUpdateSetting(
                            config.key,
                            currentValue,
                            config.category,
                            config.description,
                            config.masked
                          )}
                          disabled={updateSettingMutation.isPending || !currentValue}
                          style={{
                            padding: '10px 20px',
                            background: updateSettingMutation.isPending ? 'rgba(59, 130, 246, 0.5)' : '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: updateSettingMutation.isPending || !currentValue ? 'not-allowed' : 'pointer',
                            fontWeight: '500'
                          }}
                        >
                          {updateSettingMutation.isPending ? 'Saving...' : 'Save'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredApiConfigs.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: '#94a3b8'
                }}>
                  <p>No settings available for this category</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}