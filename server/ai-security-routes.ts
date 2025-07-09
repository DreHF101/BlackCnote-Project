/**
 * Combined AI and Security Routes
 * Consolidated to avoid import conflicts
 */

import type { Express } from "express";
import { AIInvestmentService } from './ai-investment-service';
import { storage } from './storage';
import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import crypto from 'crypto';

// Mock in-memory storage for 2FA data (in production, use database)
const userSecrets = new Map<number, string>();
const userBackupCodes = new Map<number, Array<{ code: string; used: boolean; usedAt?: string }>>();
const user2FAStatus = new Map<number, { isEnabled: boolean; lastUsed?: string; deviceCount: number }>();

export function registerAIAndSecurityRoutes(app: Express): void {
  
  // =================== AI ROUTES ===================
  
  /**
   * Generate personalized AI investment recommendations
   */
  app.get('/api/ai/recommendations', async (req, res) => {
    try {
      const userId = 1; // Mock user ID - in real app, get from session
      const riskTolerance = req.query.riskTolerance as 'conservative' | 'moderate' | 'aggressive' || 'moderate';
      
      const recommendations = await AIInvestmentService.generatePersonalizedRecommendations(userId, riskTolerance);
      
      // Add mock IDs and priorities for demo
      const enrichedRecommendations = recommendations.map((rec, index) => ({
        id: `rec_${Date.now()}_${index}`,
        ...rec,
        priority: index === 0 ? 'high' : index === 1 ? 'medium' : 'low',
      }));
      
      res.json(enrichedRecommendations);
    } catch (error: any) {
      console.error('AI recommendations error:', error);
      res.status(500).json({ 
        error: 'Failed to generate AI recommendations',
        message: error.message 
      });
    }
  });

  /**
   * Calculate and return dynamic APY for user
   */
  app.get('/api/ai/dynamic-apy', async (req, res) => {
    try {
      const userId = 1; // Mock user ID
      const userInvestments = await storage.getUserInvestments(userId);
      
      // Mock base rate from user's primary investment plan
      const baseRate = 12.5;
      const marketConditions = 'neutral' as const; // In real app, fetch from market API
      
      const dynamicAPY = AIInvestmentService.calculateDynamicAPY(
        baseRate,
        userInvestments,
        marketConditions
      );
      
      res.json(dynamicAPY);
    } catch (error: any) {
      console.error('Dynamic APY calculation error:', error);
      res.status(500).json({ 
        error: 'Failed to calculate dynamic APY',
        message: error.message 
      });
    }
  });

  /**
   * Get investment goals tracking
   */
  app.get('/api/ai/investment-goals', async (req, res) => {
    try {
      const userId = 1; // Mock user ID
      const goalsData = await AIInvestmentService.trackInvestmentGoals(userId);
      
      res.json(goalsData);
    } catch (error: any) {
      console.error('Investment goals tracking error:', error);
      res.status(500).json({ 
        error: 'Failed to track investment goals',
        message: error.message 
      });
    }
  });

  // =================== SECURITY ROUTES ===================

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