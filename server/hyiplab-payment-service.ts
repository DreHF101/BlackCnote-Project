/**
 * HYIPLab Payment Service
 * 
 * This service provides full compatibility with HYIPLab plugin payment architecture
 * while integrating with BlackCnote's modern TypeScript infrastructure.
 */

import { Express } from 'express';
import { HYIPLabPaymentGateway, HYIPLabGatewayConfig, HYIPLabDepositData, HYIPLabWithdrawData } from './payment-gateways/hyiplab-gateway-interface';
import { HYIPLabStripeGateway } from './payment-gateways/hyiplab-stripe-gateway';
import { HYIPLabPayPalGateway } from './payment-gateways/hyiplab-paypal-gateway';
import { HYIPLabCryptoGateway } from './payment-gateways/hyiplab-crypto-gateway';
import { db } from './db';
import { paymentGateways, paymentTransactions, users } from '../shared/payment-schema';
import { eq } from 'drizzle-orm';

export class HYIPLabPaymentService {
  private gateways: Map<string, HYIPLabPaymentGateway> = new Map();
  private gatewayConfigs: Map<string, HYIPLabGatewayConfig> = new Map();

  constructor() {
    this.initializeGateways();
  }

  private initializeGateways() {
    // Initialize Stripe Gateway
    const stripeConfig = HYIPLabStripeGateway.createConfig();
    const stripeGateway = new HYIPLabStripeGateway(stripeConfig);
    this.gateways.set('stripe', stripeGateway);
    this.gatewayConfigs.set('stripe', stripeConfig);

    // Initialize PayPal Gateway
    const paypalConfig = HYIPLabPayPalGateway.createConfig();
    const paypalGateway = new HYIPLabPayPalGateway(paypalConfig);
    this.gateways.set('paypal', paypalGateway);
    this.gatewayConfigs.set('paypal', paypalConfig);

    // Initialize Crypto Gateway
    const cryptoConfig = HYIPLabCryptoGateway.createConfig();
    const cryptoGateway = new HYIPLabCryptoGateway(cryptoConfig);
    this.gateways.set('crypto', cryptoGateway);
    this.gatewayConfigs.set('crypto', cryptoConfig);

    console.log('HYIPLab Payment Gateways initialized:', Array.from(this.gateways.keys()));
  }

  /**
   * Get all available payment gateways in HYIPLab format
   */
  async getAvailableGateways(): Promise<HYIPLabGatewayConfig[]> {
    const configs = Array.from(this.gatewayConfigs.values());
    
    // Filter only active gateways
    return configs.filter(config => config.gateway_status === 1);
  }

  /**
   * Get specific gateway configuration
   */
  async getGatewayConfig(gatewaySlug: string): Promise<HYIPLabGatewayConfig | null> {
    return this.gatewayConfigs.get(gatewaySlug) || null;
  }

  /**
   * Process deposit using HYIPLab standards
   */
  async processDeposit(gatewaySlug: string, depositData: HYIPLabDepositData) {
    const gateway = this.gateways.get(gatewaySlug);
    if (!gateway) {
      throw new Error(`Gateway ${gatewaySlug} not found`);
    }

    // Generate unique transaction reference if not provided
    if (!depositData.trx) {
      depositData.trx = this.generateTransactionReference(gatewaySlug);
    }

    // Process deposit through gateway
    const result = await gateway.processDeposit(depositData);

    // Log transaction to database
    if (result.success) {
      await this.logTransaction({
        gateway_slug: gatewaySlug,
        type: 'deposit',
        amount: depositData.amount,
        charge: depositData.charge,
        final_amount: depositData.final_amo,
        reference_id: depositData.trx,
        transaction_id: result.transaction_id,
        status: 'pending',
        payment_data: result.payment_data
      });
    }

    return result;
  }

  /**
   * Process withdrawal using HYIPLab standards
   */
  async processWithdrawal(gatewaySlug: string, withdrawData: HYIPLabWithdrawData) {
    const gateway = this.gateways.get(gatewaySlug);
    if (!gateway) {
      throw new Error(`Gateway ${gatewaySlug} not found`);
    }

    // Process withdrawal through gateway
    const result = await gateway.processWithdraw(withdrawData);

    // Log transaction to database
    if (result.success) {
      await this.logTransaction({
        gateway_slug: gatewaySlug,
        type: 'withdrawal',
        amount: withdrawData.amount,
        charge: withdrawData.charge,
        final_amount: withdrawData.final_amount,
        reference_id: withdrawData.withdraw_id.toString(),
        transaction_id: result.transaction_id,
        status: 'pending'
      });
    }

    return result;
  }

  /**
   * Handle payment callback/webhook
   */
  async handleCallback(gatewaySlug: string, callbackData: Record<string, any>) {
    const gateway = this.gateways.get(gatewaySlug);
    if (!gateway) {
      throw new Error(`Gateway ${gatewaySlug} not found`);
    }

    const result = await gateway.handleCallback(callbackData);

    // Update transaction status based on callback
    if (result.success && result.transaction_id) {
      await this.updateTransactionStatus(
        result.transaction_id,
        result.success ? 'completed' : 'failed'
      );
    }

    return result;
  }

  /**
   * Verify payment status
   */
  async verifyPayment(gatewaySlug: string, transactionId: string) {
    const gateway = this.gateways.get(gatewaySlug);
    if (!gateway) {
      throw new Error(`Gateway ${gatewaySlug} not found`);
    }

    const verification = await gateway.verifyPayment(transactionId);

    // Update local transaction status
    if (verification.status === 'complete') {
      await this.updateTransactionStatus(transactionId, 'completed');
    } else if (verification.status === 'failed' || verification.status === 'cancelled') {
      await this.updateTransactionStatus(transactionId, verification.status);
    }

    return verification;
  }

  /**
   * Calculate gateway fees (HYIPLab style)
   */
  calculateGatewayFees(gatewaySlug: string, amount: number) {
    const config = this.gatewayConfigs.get(gatewaySlug);
    if (!config) {
      throw new Error(`Gateway ${gatewaySlug} not found`);
    }

    const fixedCharge = config.gateway_fixed_charge;
    const percentCharge = (amount * config.gateway_percent_charge) / 100;
    const totalCharge = fixedCharge + percentCharge;
    const finalAmount = amount + totalCharge;

    return {
      fixed_charge: fixedCharge,
      percent_charge: percentCharge,
      total_charge: totalCharge,
      final_amount: finalAmount,
      gateway_rate: config.gateway_rate
    };
  }

  /**
   * Generate transaction reference (HYIPLab format)
   */
  private generateTransactionReference(gatewaySlug: string): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${gatewaySlug.toUpperCase()}${timestamp}${random}`;
  }

  /**
   * Log transaction to database
   */
  private async logTransaction(data: {
    gateway_slug: string;
    type: string;
    amount: number;
    charge: number;
    final_amount: number;
    reference_id: string;
    transaction_id?: string;
    status: string;
    payment_data?: any;
  }) {
    try {
      await db.insert(paymentTransactions).values({
        userId: 1, // Default user for demo
        gatewayId: 1, // Default gateway ID
        type: data.type as 'deposit' | 'withdrawal' | 'investment',
        status: data.status as 'pending' | 'completed' | 'failed' | 'cancelled',
        amount: data.amount.toString(),
        currency: 'USD',
        processingFee: data.charge.toString(),
        netAmount: data.final_amount.toString(),
        externalTransactionId: data.transaction_id,
        description: `${data.type} via ${data.gateway_slug}`,
        metadata: JSON.stringify({
          gateway_slug: data.gateway_slug,
          reference_id: data.reference_id,
          payment_data: data.payment_data
        })
      });
    } catch (error) {
      console.error('Failed to log transaction:', error);
    }
  }

  /**
   * Update transaction status
   */
  private async updateTransactionStatus(transactionId: string, status: string) {
    try {
      await db
        .update(paymentTransactions)
        .set({ 
          status: status as 'pending' | 'completed' | 'failed' | 'cancelled',
          processedAt: new Date()
        })
        .where(eq(paymentTransactions.externalTransactionId, transactionId));
    } catch (error) {
      console.error('Failed to update transaction status:', error);
    }
  }

  /**
   * Get transaction history for HYIPLab compatibility
   */
  async getTransactionHistory(userId?: number, limit: number = 50) {
    try {
      const transactions = await db
        .select()
        .from(paymentTransactions)
        .where(userId ? eq(paymentTransactions.userId, userId) : undefined)
        .limit(limit)
        .orderBy(paymentTransactions.createdAt);

      return transactions.map(tx => ({
        id: tx.id,
        trx: tx.externalTransactionId || tx.id.toString(),
        gateway: JSON.parse(tx.metadata || '{}').gateway_slug || 'unknown',
        amount: parseFloat(tx.amount),
        charge: parseFloat(tx.processingFee || '0'),
        final_amount: parseFloat(tx.netAmount),
        status: tx.status,
        type: tx.type,
        created_at: tx.createdAt,
        processed_at: tx.processedAt
      }));
    } catch (error) {
      console.error('Failed to get transaction history:', error);
      return [];
    }
  }
}

// Export singleton instance
export const hyipLabPaymentService = new HYIPLabPaymentService();