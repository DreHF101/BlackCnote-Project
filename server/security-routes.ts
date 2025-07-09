/**
 * Security API Routes
 * Two-factor authentication and advanced security features
 */

import type { Express } from "express";
import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import crypto from 'crypto';

// Mock in-memory storage for 2FA data (in production, use database)
const userSecrets = new Map<number, string>();
const userBackupCodes = new Map<number, Array<{ code: string; used: boolean; usedAt?: string }>>();
const user2FAStatus = new Map<number, { isEnabled: boolean; lastUsed?: string; deviceCount: number }>();

export function registerSecurityRoutes(app: Express): void {

  /**
   * Get 2FA status for current user
   */
  app.get('/api/security/2fa/status', async (req, res) => {
    try {
      const userId = 1; // Mock user ID
      const status = user2FAStatus.get(userId) || { 
        isEnabled: false, 
        deviceCount: 0 
      };
      
      res.json({
        isEnabled: status.isEnabled,
        backupCodesGenerated: userBackupCodes.has(userId),
        lastUsed: status.lastUsed,
        deviceCount: status.deviceCount,
      });
    } catch (error: any) {
      console.error('2FA status error:', error);
      res.status(500).json({ error: 'Failed to get 2FA status' });
    }
  });

  /**
   * Enable 2FA - Generate secret and QR code
   */
  app.post('/api/security/2fa/enable', async (req, res) => {
    try {
      const userId = 1; // Mock user ID
      const userEmail = 'user@blackcnote.com'; // Mock user email
      
      // Generate secret
      const secret = authenticator.generateSecret();
      const serviceName = 'BlackCnote Investment Platform';
      const accountName = userEmail;
      
      // Generate otpauth URL
      const otpauthUrl = authenticator.keyuri(accountName, serviceName, secret);
      
      // Generate QR code
      const qrCodeUrl = await QRCode.toDataURL(otpauthUrl);
      
      // Store secret temporarily (not enabled until verified)
      userSecrets.set(userId, secret);
      
      res.json({
        qrCodeUrl,
        manualCode: secret,
        serviceName,
        accountName,
      });
    } catch (error: any) {
      console.error('2FA enable error:', error);
      res.status(500).json({ error: 'Failed to enable 2FA' });
    }
  });

  /**
   * Verify 2FA setup and complete enabling
   */
  app.post('/api/security/2fa/verify-setup', async (req, res) => {
    try {
      const { code } = req.body;
      const userId = 1; // Mock user ID
      
      const secret = userSecrets.get(userId);
      if (!secret) {
        return res.status(400).json({ error: '2FA setup not initiated' });
      }
      
      // Verify the code
      const isValid = authenticator.verify({ token: code, secret });
      
      if (!isValid) {
        return res.status(400).json({ error: 'Invalid verification code' });
      }
      
      // Enable 2FA for user
      user2FAStatus.set(userId, {
        isEnabled: true,
        deviceCount: 1,
        lastUsed: new Date().toISOString(),
      });
      
      // Generate backup codes
      const backupCodes = generateBackupCodes();
      userBackupCodes.set(userId, backupCodes);
      
      res.json({
        success: true,
        message: '2FA enabled successfully',
        backupCodes: backupCodes.map(bc => bc.code),
      });
    } catch (error: any) {
      console.error('2FA verify setup error:', error);
      res.status(500).json({ error: 'Failed to verify 2FA setup' });
    }
  });

  /**
   * Disable 2FA
   */
  app.post('/api/security/2fa/disable', async (req, res) => {
    try {
      const { code } = req.body;
      const userId = 1; // Mock user ID
      
      const secret = userSecrets.get(userId);
      if (!secret) {
        return res.status(400).json({ error: '2FA not enabled' });
      }
      
      // Verify the code or check if it's a backup code
      let isValid = authenticator.verify({ token: code, secret });
      
      if (!isValid) {
        // Check backup codes
        const backupCodes = userBackupCodes.get(userId) || [];
        const backupCode = backupCodes.find(bc => bc.code === code && !bc.used);
        
        if (backupCode) {
          isValid = true;
          backupCode.used = true;
          backupCode.usedAt = new Date().toISOString();
        }
      }
      
      if (!isValid) {
        return res.status(400).json({ error: 'Invalid verification code' });
      }
      
      // Disable 2FA
      userSecrets.delete(userId);
      userBackupCodes.delete(userId);
      user2FAStatus.delete(userId);
      
      res.json({
        success: true,
        message: '2FA disabled successfully',
      });
    } catch (error: any) {
      console.error('2FA disable error:', error);
      res.status(500).json({ error: 'Failed to disable 2FA' });
    }
  });

  /**
   * Get backup codes
   */
  app.get('/api/security/2fa/backup-codes', async (req, res) => {
    try {
      const userId = 1; // Mock user ID
      
      const status = user2FAStatus.get(userId);
      if (!status?.isEnabled) {
        return res.status(400).json({ error: '2FA not enabled' });
      }
      
      const backupCodes = userBackupCodes.get(userId) || [];
      
      res.json(backupCodes);
    } catch (error: any) {
      console.error('Get backup codes error:', error);
      res.status(500).json({ error: 'Failed to get backup codes' });
    }
  });

  /**
   * Generate new backup codes
   */
  app.post('/api/security/2fa/generate-backup-codes', async (req, res) => {
    try {
      const userId = 1; // Mock user ID
      
      const status = user2FAStatus.get(userId);
      if (!status?.isEnabled) {
        return res.status(400).json({ error: '2FA not enabled' });
      }
      
      // Generate new backup codes
      const backupCodes = generateBackupCodes();
      userBackupCodes.set(userId, backupCodes);
      
      res.json({
        success: true,
        message: 'New backup codes generated',
        backupCodes: backupCodes.map(bc => bc.code),
      });
    } catch (error: any) {
      console.error('Generate backup codes error:', error);
      res.status(500).json({ error: 'Failed to generate backup codes' });
    }
  });

  /**
   * Verify 2FA code (for login or sensitive operations)
   */
  app.post('/api/security/2fa/verify', async (req, res) => {
    try {
      const { code } = req.body;
      const userId = 1; // Mock user ID
      
      const secret = userSecrets.get(userId);
      if (!secret) {
        return res.status(400).json({ error: '2FA not enabled' });
      }
      
      // Verify TOTP code
      let isValid = authenticator.verify({ token: code, secret });
      let usedBackupCode = false;
      
      if (!isValid) {
        // Check backup codes
        const backupCodes = userBackupCodes.get(userId) || [];
        const backupCode = backupCodes.find(bc => bc.code === code && !bc.used);
        
        if (backupCode) {
          isValid = true;
          usedBackupCode = true;
          backupCode.used = true;
          backupCode.usedAt = new Date().toISOString();
        }
      }
      
      if (!isValid) {
        return res.status(400).json({ error: 'Invalid verification code' });
      }
      
      // Update last used
      const status = user2FAStatus.get(userId);
      if (status) {
        status.lastUsed = new Date().toISOString();
        user2FAStatus.set(userId, status);
      }
      
      res.json({
        success: true,
        message: 'Code verified successfully',
        usedBackupCode,
      });
    } catch (error: any) {
      console.error('2FA verify error:', error);
      res.status(500).json({ error: 'Failed to verify 2FA code' });
    }
  });

  /**
   * Get security settings overview
   */
  app.get('/api/security/overview', async (req, res) => {
    try {
      const userId = 1; // Mock user ID
      
      const twoFactorStatus = user2FAStatus.get(userId) || { 
        isEnabled: false, 
        deviceCount: 0 
      };
      
      const securityScore = calculateSecurityScore(twoFactorStatus);
      
      res.json({
        securityScore,
        twoFactorEnabled: twoFactorStatus.isEnabled,
        lastLogin: new Date().toISOString(), // Mock
        loginDevices: twoFactorStatus.deviceCount,
        recentActivity: [
          {
            action: 'Login',
            timestamp: new Date().toISOString(),
            ip: '192.168.1.1',
            device: 'Desktop',
            location: 'New York, US',
          },
          {
            action: 'Investment Created',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            ip: '192.168.1.1',
            device: 'Desktop',
            location: 'New York, US',
          },
        ],
        securityRecommendations: [
          ...(twoFactorStatus.isEnabled ? [] : ['Enable two-factor authentication']),
          'Use a strong, unique password',
          'Regularly review account activity',
          'Keep your recovery codes secure',
        ],
      });
    } catch (error: any) {
      console.error('Security overview error:', error);
      res.status(500).json({ error: 'Failed to get security overview' });
    }
  });
}

/**
 * Generate backup codes
 */
function generateBackupCodes(): Array<{ code: string; used: boolean }> {
  const codes: Array<{ code: string; used: boolean }> = [];
  
  for (let i = 0; i < 10; i++) {
    // Generate 8-character alphanumeric code
    const code = crypto.randomBytes(4).toString('hex').toUpperCase();
    codes.push({ code, used: false });
  }
  
  return codes;
}

/**
 * Calculate security score based on user's security settings
 */
function calculateSecurityScore(twoFactorStatus: { isEnabled: boolean; deviceCount: number }): number {
  let score = 60; // Base score
  
  if (twoFactorStatus.isEnabled) {
    score += 30; // +30 for 2FA
  }
  
  if (twoFactorStatus.deviceCount > 1) {
    score += 10; // +10 for multiple devices
  }
  
  return Math.min(100, score);
}