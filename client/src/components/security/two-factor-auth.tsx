/**
 * Two-Factor Authentication Component
 * Advanced security implementation with TOTP and backup codes
 */

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Smartphone, 
  Key, 
  Copy, 
  Download, 
  Eye, 
  EyeOff,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  QrCode
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface TwoFactorStatus {
  isEnabled: boolean;
  backupCodesGenerated: boolean;
  lastUsed?: string;
  deviceCount: number;
}

interface BackupCode {
  code: string;
  used: boolean;
  usedAt?: string;
}

export default function TwoFactorAuth() {
  const [verificationCode, setVerificationCode] = useState('');
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [manualCode, setManualCode] = useState('');
  const [isSetupMode, setIsSetupMode] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch 2FA status
  const { data: twoFactorStatus, isLoading } = useQuery<TwoFactorStatus>({
    queryKey: ['/api/security/2fa/status'],
    queryFn: () => apiRequest('GET', '/api/security/2fa/status'),
  });

  // Fetch backup codes
  const { data: backupCodes } = useQuery<BackupCode[]>({
    queryKey: ['/api/security/2fa/backup-codes'],
    queryFn: () => apiRequest('GET', '/api/security/2fa/backup-codes'),
    enabled: twoFactorStatus?.isEnabled || false,
  });

  // Enable 2FA mutation
  const enableTwoFactorMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/security/2fa/enable'),
    onSuccess: (data) => {
      setQrCodeUrl(data.qrCodeUrl);
      setManualCode(data.manualCode);
      setIsSetupMode(true);
      toast({
        title: "2FA Setup Started",
        description: "Scan the QR code with your authenticator app to complete setup.",
      });
    },
  });

  // Verify and complete 2FA setup
  const verifySetupMutation = useMutation({
    mutationFn: (code: string) => 
      apiRequest('POST', '/api/security/2fa/verify-setup', { code }),
    onSuccess: (data) => {
      setIsSetupMode(false);
      setQrCodeUrl('');
      setVerificationCode('');
      queryClient.invalidateQueries({ queryKey: ['/api/security/2fa/status'] });
      toast({
        title: "2FA Enabled Successfully",
        description: "Two-factor authentication is now active on your account.",
      });
    },
    onError: () => {
      toast({
        title: "Verification Failed",
        description: "Please check your code and try again.",
        variant: "destructive",
      });
    },
  });

  // Disable 2FA mutation
  const disableTwoFactorMutation = useMutation({
    mutationFn: (code: string) => 
      apiRequest('POST', '/api/security/2fa/disable', { code }),
    onSuccess: () => {
      setVerificationCode('');
      queryClient.invalidateQueries({ queryKey: ['/api/security/2fa/status'] });
      toast({
        title: "2FA Disabled",
        description: "Two-factor authentication has been disabled for your account.",
      });
    },
    onError: () => {
      toast({
        title: "Disable Failed",
        description: "Please check your verification code and try again.",
        variant: "destructive",
      });
    },
  });

  // Generate backup codes mutation
  const generateBackupCodesMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/security/2fa/generate-backup-codes'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/security/2fa/backup-codes'] });
      toast({
        title: "Backup Codes Generated",
        description: "New backup codes have been generated. Store them securely.",
      });
    },
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "The text has been copied to your clipboard.",
    });
  };

  const downloadBackupCodes = () => {
    if (!backupCodes) return;
    
    const codesText = backupCodes
      .filter(code => !code.used)
      .map(code => code.code)
      .join('\n');
    
    const blob = new Blob([codesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blackcnote-backup-codes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Backup Codes Downloaded",
      description: "Store this file in a secure location.",
    });
  };

  if (isLoading) {
    return (
      <Card className="bg-[var(--dark-card)] border-[var(--dark-border)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* 2FA Status Card */}
      <Card className="bg-[var(--dark-card)] border-[var(--dark-border)]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Two-Factor Authentication
            </div>
            <Badge 
              className={
                twoFactorStatus?.isEnabled 
                  ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200'
              }
            >
              {twoFactorStatus?.isEnabled ? (
                <>
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Enabled
                </>
              ) : (
                <>
                  <ShieldAlert className="h-3 w-3 mr-1" />
                  Disabled
                </>
              )}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {twoFactorStatus?.isEnabled ? (
            <div className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Two-factor authentication is enabled and protecting your account.
                  {twoFactorStatus.lastUsed && (
                    <span className="block text-sm text-[var(--text-secondary)] mt-1">
                      Last used: {new Date(twoFactorStatus.lastUsed).toLocaleDateString()}
                    </span>
                  )}
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="disable-code">Enter 6-digit code to disable</Label>
                  <Input
                    id="disable-code"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    className="text-center text-lg tracking-widest"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    variant="destructive"
                    onClick={() => disableTwoFactorMutation.mutate(verificationCode)}
                    disabled={verificationCode.length !== 6 || disableTwoFactorMutation.isPending}
                    className="w-full"
                  >
                    {disableTwoFactorMutation.isPending ? 'Disabling...' : 'Disable 2FA'}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Your account is not protected by two-factor authentication. 
                  Enable 2FA to add an extra layer of security.
                </AlertDescription>
              </Alert>

              {!isSetupMode ? (
                <Button
                  onClick={() => enableTwoFactorMutation.mutate()}
                  disabled={enableTwoFactorMutation.isPending}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {enableTwoFactorMutation.isPending ? 'Setting up...' : 'Enable Two-Factor Authentication'}
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                      Setup Two-Factor Authentication
                    </h3>
                    
                    {/* QR Code Display */}
                    {qrCodeUrl && (
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <div className="p-4 bg-white rounded-lg">
                            <img src={qrCodeUrl} alt="2FA QR Code" className="w-48 h-48" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm text-[var(--text-secondary)]">
                            Or enter this code manually:
                          </p>
                          <div className="flex items-center gap-2">
                            <code className="flex-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-center font-mono text-sm">
                              {manualCode}
                            </code>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(manualCode)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="verify-code">Enter 6-digit verification code</Label>
                      <Input
                        id="verify-code"
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="000000"
                        className="text-center text-lg tracking-widest"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsSetupMode(false);
                          setQrCodeUrl('');
                          setVerificationCode('');
                        }}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => verifySetupMutation.mutate(verificationCode)}
                        disabled={verificationCode.length !== 6 || verifySetupMutation.isPending}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        {verifySetupMutation.isPending ? 'Verifying...' : 'Complete Setup'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Backup Codes Card */}
      {twoFactorStatus?.isEnabled && (
        <Card className="bg-[var(--dark-card)] border-[var(--dark-border)]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Backup Recovery Codes
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowBackupCodes(!showBackupCodes)}
                >
                  {showBackupCodes ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-1" />
                      Hide Codes
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-1" />
                      Show Codes
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  onClick={() => generateBackupCodesMutation.mutate()}
                  disabled={generateBackupCodesMutation.isPending}
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Generate New
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Backup codes can be used to access your account if you lose your authenticator device. 
                Store them securely and treat them like passwords.
              </AlertDescription>
            </Alert>

            {showBackupCodes && backupCodes && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {backupCodes.map((backup, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border font-mono text-sm text-center ${
                        backup.used
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 line-through'
                          : 'bg-gray-50 dark:bg-gray-900 text-[var(--text-primary)]'
                      }`}
                    >
                      {backup.code}
                      {backup.used && (
                        <div className="text-xs text-gray-400 mt-1">
                          Used {backup.usedAt ? new Date(backup.usedAt).toLocaleDateString() : ''}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(
                      backupCodes
                        .filter(code => !code.used)
                        .map(code => code.code)
                        .join('\n')
                    )}
                    className="flex-1"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy Unused Codes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={downloadBackupCodes}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download as File
                  </Button>
                </div>
              </div>
            )}

            {!showBackupCodes && (
              <div className="text-center py-8">
                <Key className="h-12 w-12 text-[var(--text-secondary)] mx-auto mb-2" />
                <p className="text-[var(--text-secondary)]">
                  Backup codes are hidden for security. Click "Show Codes" to view them.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Security Tips */}
      <Card className="bg-[var(--dark-card)] border-[var(--dark-border)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Authenticator App Setup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-[var(--text-secondary)]">
            <p className="font-medium text-[var(--text-primary)]">Recommended Authenticator Apps:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Google Authenticator (iOS/Android)</li>
              <li>Microsoft Authenticator (iOS/Android)</li>
              <li>Authy (iOS/Android/Desktop)</li>
              <li>1Password (Cross-platform)</li>
            </ul>
            
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Security Tips:</h4>
              <ul className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
                <li>• Never share your authenticator codes with anyone</li>
                <li>• Store backup codes in a secure location (password manager)</li>
                <li>• Don't screenshot or email your backup codes</li>
                <li>• Consider using multiple devices for redundancy</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}