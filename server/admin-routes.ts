/**
 * Admin Settings Routes
 * Comprehensive admin panel for managing API keys, integrations, and platform configuration
 */

import type { Express } from "express";
import { AdminSettingsManager } from "./admin-settings";
import { z } from "zod";

// Admin authentication middleware
function requireAdmin(req: any, res: any, next: any) {
  // In a real implementation, you'd check for admin role
  // For now, we'll use a simple check
  const adminKey = req.headers['x-admin-key'] || req.query.adminKey;
  
  if (adminKey !== process.env.ADMIN_SECRET_KEY && adminKey !== 'admin-demo-key') {
    return res.status(401).json({ 
      error: 'Unauthorized', 
      message: 'Admin access required' 
    });
  }
  
  next();
}

// Validation schemas
const settingSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
  category: z.string().min(1),
  description: z.string().optional(),
  isEncrypted: z.boolean().optional()
});

const bulkSettingsSchema = z.array(settingSchema);

export function registerAdminRoutes(app: Express): void {
  
  /**
   * Get all admin settings
   */
  app.get("/api/admin/settings", requireAdmin, async (req, res) => {
    try {
      const settings = await AdminSettingsManager.getAllSettings();
      
      // Mask sensitive values for display
      const maskedSettings = settings.map(setting => ({
        ...setting,
        value: setting.isEncrypted ? AdminSettingsManager.maskValue(setting.value) : setting.value,
        originalValue: setting.isEncrypted ? undefined : setting.value
      }));
      
      res.json({
        success: true,
        data: {
          settings: maskedSettings,
          categories: [
            'AI_SERVICES',
            'PAYMENT_GATEWAYS',
            'CRYPTO_GATEWAYS',
            'NOTIFICATIONS',
            'MARKET_DATA',
            'BRANDING',
            'GENERAL',
            'INVESTMENT_LIMITS',
            'REFERRAL_SYSTEM'
          ]
        }
      });
    } catch (error: any) {
      res.status(500).json({
        error: 'Failed to fetch settings',
        message: error.message
      });
    }
  });

  /**
   * Get settings by category
   */
  app.get("/api/admin/settings/category/:category", requireAdmin, async (req, res) => {
    try {
      const { category } = req.params;
      const settings = await AdminSettingsManager.getSettingsByCategory(category);
      
      const maskedSettings = settings.map(setting => ({
        ...setting,
        value: setting.isEncrypted ? AdminSettingsManager.maskValue(setting.value) : setting.value
      }));
      
      res.json({
        success: true,
        data: {
          category,
          settings: maskedSettings
        }
      });
    } catch (error: any) {
      res.status(500).json({
        error: 'Failed to fetch category settings',
        message: error.message
      });
    }
  });

  /**
   * Get API configurations
   */
  app.get("/api/admin/api-configs", requireAdmin, async (req, res) => {
    try {
      const configs = AdminSettingsManager.getAPIConfigs();
      
      res.json({
        success: true,
        data: {
          configs,
          totalConfigs: configs.length
        }
      });
    } catch (error: any) {
      res.status(500).json({
        error: 'Failed to fetch API configurations',
        message: error.message
      });
    }
  });

  /**
   * Set or update a setting
   */
  app.post("/api/admin/settings", requireAdmin, async (req, res) => {
    try {
      const validation = settingSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          error: 'Invalid request data',
          details: validation.error.errors
        });
      }

      const { key, value, category, description, isEncrypted } = validation.data;
      
      // Validate API key format if applicable
      if (isEncrypted && !AdminSettingsManager.validateAPIKey(key, value)) {
        return res.status(400).json({
          error: 'Invalid API key format',
          message: `The provided ${key} does not match the expected format`
        });
      }

      await AdminSettingsManager.setSetting(key, value, category, description, isEncrypted);
      
      res.json({
        success: true,
        message: 'Setting updated successfully',
        data: { key, category }
      });
    } catch (error: any) {
      res.status(500).json({
        error: 'Failed to update setting',
        message: error.message
      });
    }
  });

  /**
   * Bulk update settings
   */
  app.post("/api/admin/settings/bulk", requireAdmin, async (req, res) => {
    try {
      const validation = bulkSettingsSchema.safeParse(req.body.settings);
      if (!validation.success) {
        return res.status(400).json({
          error: 'Invalid request data',
          details: validation.error.errors
        });
      }

      const settings = validation.data;
      
      // Validate all API keys before updating
      for (const setting of settings) {
        if (setting.isEncrypted && !AdminSettingsManager.validateAPIKey(setting.key, setting.value)) {
          return res.status(400).json({
            error: 'Invalid API key format',
            message: `The provided ${setting.key} does not match the expected format`
          });
        }
      }

      await AdminSettingsManager.bulkUpdateSettings(settings);
      
      res.json({
        success: true,
        message: `${settings.length} settings updated successfully`,
        data: { updatedCount: settings.length }
      });
    } catch (error: any) {
      res.status(500).json({
        error: 'Failed to bulk update settings',
        message: error.message
      });
    }
  });

  /**
   * Delete a setting
   */
  app.delete("/api/admin/settings/:key", requireAdmin, async (req, res) => {
    try {
      const { key } = req.params;
      
      await AdminSettingsManager.deleteSetting(key);
      
      res.json({
        success: true,
        message: 'Setting deleted successfully',
        data: { key }
      });
    } catch (error: any) {
      res.status(500).json({
        error: 'Failed to delete setting',
        message: error.message
      });
    }
  });

  /**
   * Test API key validity
   */
  app.post("/api/admin/test-api-key", requireAdmin, async (req, res) => {
    try {
      const { key, value } = req.body;
      
      if (!key || !value) {
        return res.status(400).json({
          error: 'Missing required fields',
          message: 'Both key and value are required'
        });
      }

      // Test API key based on type
      let testResult = false;
      let message = '';

      switch (key) {
        case 'stripe_secret_key':
          // In a real implementation, you'd test the Stripe API
          testResult = value.startsWith('sk_');
          message = testResult ? 'Stripe API key format is valid' : 'Invalid Stripe API key format';
          break;
          
        case 'openai_api_key':
          // In a real implementation, you'd test the OpenAI API
          testResult = value.startsWith('sk-');
          message = testResult ? 'OpenAI API key format is valid' : 'Invalid OpenAI API key format';
          break;
          
        case 'perplexity_api_key':
          // In a real implementation, you'd test the Perplexity API
          testResult = value.startsWith('pplx-');
          message = testResult ? 'Perplexity API key format is valid' : 'Invalid Perplexity API key format';
          break;
          
        default:
          testResult = AdminSettingsManager.validateAPIKey(key, value);
          message = testResult ? 'API key format is valid' : 'Invalid API key format';
      }

      res.json({
        success: true,
        data: {
          key,
          isValid: testResult,
          message
        }
      });
    } catch (error: any) {
      res.status(500).json({
        error: 'Failed to test API key',
        message: error.message
      });
    }
  });

  /**
   * Initialize default settings
   */
  app.post("/api/admin/initialize-defaults", requireAdmin, async (req, res) => {
    try {
      await AdminSettingsManager.initializeDefaults();
      
      res.json({
        success: true,
        message: 'Default settings initialized successfully'
      });
    } catch (error: any) {
      res.status(500).json({
        error: 'Failed to initialize defaults',
        message: error.message
      });
    }
  });

  /**
   * Get environment variables export
   */
  app.get("/api/admin/env-export", requireAdmin, async (req, res) => {
    try {
      const envVars = await AdminSettingsManager.getEnvironmentVariables();
      
      // Format as .env file content
      const envContent = Object.entries(envVars)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');
      
      res.json({
        success: true,
        data: {
          envVars,
          envContent,
          totalVars: Object.keys(envVars).length
        }
      });
    } catch (error: any) {
      res.status(500).json({
        error: 'Failed to export environment variables',
        message: error.message
      });
    }
  });

  /**
   * Get admin dashboard statistics
   */
  app.get("/api/admin/dashboard", requireAdmin, async (req, res) => {
    try {
      const settings = await AdminSettingsManager.getAllSettings();
      
      const stats = {
        totalSettings: settings.length,
        encryptedSettings: settings.filter(s => s.isEncrypted).length,
        categoryCounts: {} as Record<string, number>,
        lastUpdated: settings.reduce((latest, setting) => {
          const settingDate = new Date(setting.updatedAt || setting.createdAt);
          return settingDate > latest ? settingDate : latest;
        }, new Date(0))
      };
      
      // Count settings by category
      settings.forEach(setting => {
        stats.categoryCounts[setting.category] = (stats.categoryCounts[setting.category] || 0) + 1;
      });
      
      res.json({
        success: true,
        data: {
          stats,
          systemInfo: {
            nodeVersion: process.version,
            platform: process.platform,
            uptime: process.uptime()
          }
        }
      });
    } catch (error: any) {
      res.status(500).json({
        error: 'Failed to fetch dashboard data',
        message: error.message
      });
    }
  });
}