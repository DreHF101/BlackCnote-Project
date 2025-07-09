/**
 * Admin Settings Management
 * Comprehensive system for managing API keys, integrations, and platform configuration
 */

import { db } from "./db";
import { adminSettings } from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export interface AdminSettingsData {
  id?: number;
  category: string;
  key: string;
  value: string;
  isEncrypted: boolean;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface APIKeyConfig {
  name: string;
  key: string;
  description: string;
  category: string;
  required: boolean;
  masked: boolean;
}

export class AdminSettingsManager {
  private static readonly ENCRYPTION_SALT_ROUNDS = 12;
  
  // Define all configurable API keys and settings
  private static readonly API_CONFIGS: APIKeyConfig[] = [
    {
      name: "PERPLEXITY_API_KEY",
      key: "perplexity_api_key",
      description: "Perplexity AI API key for advanced market analysis and insights",
      category: "AI_SERVICES",
      required: true,
      masked: true
    },
    {
      name: "OPENAI_API_KEY",
      key: "openai_api_key",
      description: "OpenAI API key for AI-powered financial recommendations",
      category: "AI_SERVICES",
      required: false,
      masked: true
    },
    {
      name: "STRIPE_SECRET_KEY",
      key: "stripe_secret_key",
      description: "Stripe secret key for payment processing",
      category: "PAYMENT_GATEWAYS",
      required: true,
      masked: true
    },
    {
      name: "STRIPE_WEBHOOK_SECRET",
      key: "stripe_webhook_secret",
      description: "Stripe webhook secret for payment confirmations",
      category: "PAYMENT_GATEWAYS",
      required: true,
      masked: true
    },
    {
      name: "PAYPAL_CLIENT_ID",
      key: "paypal_client_id",
      description: "PayPal client ID for payment processing",
      category: "PAYMENT_GATEWAYS",
      required: false,
      masked: false
    },
    {
      name: "PAYPAL_CLIENT_SECRET",
      key: "paypal_client_secret",
      description: "PayPal client secret for payment processing",
      category: "PAYMENT_GATEWAYS",
      required: false,
      masked: true
    },
    {
      name: "COINBASE_API_KEY",
      key: "coinbase_api_key",
      description: "Coinbase API key for cryptocurrency payments",
      category: "CRYPTO_GATEWAYS",
      required: false,
      masked: true
    },
    {
      name: "BINANCE_API_KEY",
      key: "binance_api_key",
      description: "Binance API key for crypto market data",
      category: "CRYPTO_GATEWAYS",
      required: false,
      masked: true
    },
    {
      name: "TWILIO_ACCOUNT_SID",
      key: "twilio_account_sid",
      description: "Twilio Account SID for SMS notifications",
      category: "NOTIFICATIONS",
      required: false,
      masked: false
    },
    {
      name: "TWILIO_AUTH_TOKEN",
      key: "twilio_auth_token",
      description: "Twilio Auth Token for SMS notifications",
      category: "NOTIFICATIONS",
      required: false,
      masked: true
    },
    {
      name: "SENDGRID_API_KEY",
      key: "sendgrid_api_key",
      description: "SendGrid API key for email notifications",
      category: "NOTIFICATIONS",
      required: false,
      masked: true
    },
    {
      name: "ALPHA_VANTAGE_API_KEY",
      key: "alpha_vantage_api_key",
      description: "Alpha Vantage API key for stock market data",
      category: "MARKET_DATA",
      required: false,
      masked: true
    },
    {
      name: "PLATFORM_NAME",
      key: "platform_name",
      description: "Platform name displayed to users",
      category: "BRANDING",
      required: true,
      masked: false
    },
    {
      name: "PLATFORM_CURRENCY",
      key: "platform_currency",
      description: "Default platform currency (USD, EUR, etc.)",
      category: "GENERAL",
      required: true,
      masked: false
    },
    {
      name: "MAINTENANCE_MODE",
      key: "maintenance_mode",
      description: "Enable/disable maintenance mode",
      category: "GENERAL",
      required: false,
      masked: false
    },
    {
      name: "MINIMUM_DEPOSIT",
      key: "minimum_deposit",
      description: "Minimum deposit amount",
      category: "INVESTMENT_LIMITS",
      required: true,
      masked: false
    },
    {
      name: "MAXIMUM_DEPOSIT",
      key: "maximum_deposit",
      description: "Maximum deposit amount",
      category: "INVESTMENT_LIMITS",
      required: true,
      masked: false
    },
    {
      name: "REFERRAL_COMMISSION_RATE",
      key: "referral_commission_rate",
      description: "Referral commission rate (percentage)",
      category: "REFERRAL_SYSTEM",
      required: false,
      masked: false
    }
  ];

  /**
   * Get all available API configurations
   */
  static getAPIConfigs(): APIKeyConfig[] {
    return this.API_CONFIGS;
  }

  /**
   * Get settings by category
   */
  static async getSettingsByCategory(category: string): Promise<AdminSettingsData[]> {
    return await db
      .select()
      .from(adminSettings)
      .where(eq(adminSettings.category, category));
  }

  /**
   * Get all settings
   */
  static async getAllSettings(): Promise<AdminSettingsData[]> {
    return await db.select().from(adminSettings);
  }

  /**
   * Get specific setting value
   */
  static async getSetting(key: string): Promise<string | null> {
    const setting = await db
      .select()
      .from(adminSettings)
      .where(eq(adminSettings.key, key))
      .limit(1);
    
    if (!setting.length) return null;
    
    const settingData = setting[0];
    if (settingData.isEncrypted) {
      // In a real implementation, you'd decrypt here
      return settingData.value;
    }
    
    return settingData.value;
  }

  /**
   * Set or update a setting
   */
  static async setSetting(
    key: string,
    value: string,
    category: string,
    description?: string,
    isEncrypted: boolean = false
  ): Promise<void> {
    const processedValue = isEncrypted ? await this.encryptValue(value) : value;
    
    const existing = await db
      .select()
      .from(adminSettings)
      .where(eq(adminSettings.key, key))
      .limit(1);

    if (existing.length) {
      await db
        .update(adminSettings)
        .set({ 
          value: processedValue, 
          isEncrypted,
          updatedAt: new Date()
        })
        .where(eq(adminSettings.key, key));
    } else {
      await db.insert(adminSettings).values({
        key,
        value: processedValue,
        category,
        description,
        isEncrypted,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }

  /**
   * Delete a setting
   */
  static async deleteSetting(key: string): Promise<void> {
    await db.delete(adminSettings).where(eq(adminSettings.key, key));
  }

  /**
   * Bulk update settings
   */
  static async bulkUpdateSettings(settings: Array<{
    key: string;
    value: string;
    category: string;
    description?: string;
    isEncrypted?: boolean;
  }>): Promise<void> {
    for (const setting of settings) {
      await this.setSetting(
        setting.key,
        setting.value,
        setting.category,
        setting.description,
        setting.isEncrypted || false
      );
    }
  }

  /**
   * Initialize default settings
   */
  static async initializeDefaults(): Promise<void> {
    const existingSettings = await this.getAllSettings();
    const existingKeys = existingSettings.map(s => s.key);
    
    const defaultSettings = [
      {
        key: "platform_name",
        value: "BlackCnote Investment Platform",
        category: "BRANDING",
        description: "Platform name displayed to users"
      },
      {
        key: "platform_currency",
        value: "USD",
        category: "GENERAL",
        description: "Default platform currency"
      },
      {
        key: "maintenance_mode",
        value: "false",
        category: "GENERAL",
        description: "Enable/disable maintenance mode"
      },
      {
        key: "minimum_deposit",
        value: "100",
        category: "INVESTMENT_LIMITS",
        description: "Minimum deposit amount"
      },
      {
        key: "maximum_deposit",
        value: "50000",
        category: "INVESTMENT_LIMITS",
        description: "Maximum deposit amount"
      },
      {
        key: "referral_commission_rate",
        value: "5",
        category: "REFERRAL_SYSTEM",
        description: "Referral commission rate (percentage)"
      }
    ];

    for (const setting of defaultSettings) {
      if (!existingKeys.includes(setting.key)) {
        await this.setSetting(
          setting.key,
          setting.value,
          setting.category,
          setting.description
        );
      }
    }
  }

  /**
   * Encrypt sensitive values
   */
  private static async encryptValue(value: string): Promise<string> {
    return await bcrypt.hash(value, this.ENCRYPTION_SALT_ROUNDS);
  }

  /**
   * Mask sensitive values for display
   */
  static maskValue(value: string): string {
    if (value.length <= 8) return '*'.repeat(value.length);
    return value.substring(0, 4) + '*'.repeat(value.length - 8) + value.substring(value.length - 4);
  }

  /**
   * Validate API key format
   */
  static validateAPIKey(key: string, value: string): boolean {
    const patterns: Record<string, RegExp> = {
      'stripe_secret_key': /^sk_/,
      'stripe_webhook_secret': /^whsec_/,
      'openai_api_key': /^sk-/,
      'perplexity_api_key': /^pplx-/,
      'paypal_client_id': /^A[A-Za-z0-9]/,
      'twilio_account_sid': /^AC[a-fA-F0-9]{32}$/,
      'sendgrid_api_key': /^SG\./
    };

    const pattern = patterns[key];
    return pattern ? pattern.test(value) : true;
  }

  /**
   * Get settings formatted for environment variables
   */
  static async getEnvironmentVariables(): Promise<Record<string, string>> {
    const settings = await this.getAllSettings();
    const envVars: Record<string, string> = {};
    
    for (const setting of settings) {
      const envName = setting.key.toUpperCase();
      envVars[envName] = setting.value;
    }
    
    return envVars;
  }
}