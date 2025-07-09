import { db } from "./db";
import { 
  paymentGateways, 
  paymentTransactions, 
  paymentMethods, 
  paymentWebhooks,
  PaymentGateway,
  PaymentTransaction,
  PaymentMethod,
  InsertPaymentTransaction,
  InsertPaymentMethod,
  InsertPaymentWebhook,
  PaymentStatus,
  PaymentType
} from "@shared/payment-schema";
import { eq, and, desc } from "drizzle-orm";
import { BasePaymentGateway, PaymentIntent, PaymentResult } from "./payment-gateways/base-gateway";
import { StripeGateway } from "./payment-gateways/stripe-gateway";
import { PayPalGateway } from "./payment-gateways/paypal-gateway";
import { CryptoGateway } from "./payment-gateways/crypto-gateway";

export class PaymentService {
  private gateways: Map<string, BasePaymentGateway> = new Map();

  async initialize(): Promise<void> {
    // Load payment gateways from database
    const activeGateways = await db
      .select()
      .from(paymentGateways)
      .where(eq(paymentGateways.isActive, true));

    for (const gateway of activeGateways) {
      try {
        const gatewayInstance = await this.createGatewayInstance(gateway);
        if (gatewayInstance) {
          await gatewayInstance.initialize();
          this.gateways.set(gateway.slug, gatewayInstance);
          console.log(`Payment gateway ${gateway.name} initialized successfully`);
        }
      } catch (error) {
        console.warn(`Failed to initialize payment gateway ${gateway.name}:`, error);
      }
    }
  }

  private async createGatewayInstance(gateway: PaymentGateway): Promise<BasePaymentGateway | null> {
    const config = gateway.configuration ? JSON.parse(gateway.configuration) : {};

    // Add environment variables to config
    switch (gateway.slug) {
      case 'stripe':
        config.secretKey = process.env.STRIPE_SECRET_KEY;
        config.publicKey = process.env.VITE_STRIPE_PUBLIC_KEY;
        config.webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        config.environment = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';
        
        if (!config.secretKey) {
          console.warn('Stripe secret key not found in environment variables');
          return null;
        }
        
        return new StripeGateway(gateway, config);

      case 'paypal':
        config.apiKey = process.env.PAYPAL_CLIENT_ID;
        config.secretKey = process.env.PAYPAL_CLIENT_SECRET;
        config.webhookSecret = process.env.PAYPAL_WEBHOOK_SECRET;
        config.environment = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';
        
        if (!config.apiKey || !config.secretKey) {
          console.warn('PayPal credentials not found in environment variables');
          return null;
        }
        
        return new PayPalGateway(gateway, config);

      case 'crypto':
        config.environment = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';
        return new CryptoGateway(gateway, config);

      default:
        console.warn(`Unknown payment gateway: ${gateway.slug}`);
        return null;
    }
  }

  async createPayment(
    userId: number,
    gatewaySlug: string,
    amount: number,
    currency: string = 'USD',
    type: string = PaymentType.DEPOSIT,
    investmentId?: number,
    metadata?: Record<string, any>
  ): Promise<{ paymentIntent: PaymentIntent; transaction: PaymentTransaction }> {
    const gateway = this.gateways.get(gatewaySlug);
    if (!gateway) {
      throw new Error(`Payment gateway ${gatewaySlug} not available`);
    }

    // Create payment intent with the gateway
    const paymentIntent = await gateway.createPaymentIntent(amount, currency, {
      userId,
      type,
      investmentId,
      ...metadata,
    });

    // Get gateway info from database
    const [gatewayInfo] = await db
      .select()
      .from(paymentGateways)
      .where(eq(paymentGateways.slug, gatewaySlug));

    if (!gatewayInfo) {
      throw new Error(`Payment gateway ${gatewaySlug} not found in database`);
    }

    // Calculate processing fee
    const processingFee = this.calculateProcessingFee(amount, gatewayInfo);
    const netAmount = amount - processingFee;

    // Create transaction record
    const transactionData: InsertPaymentTransaction = {
      userId,
      investmentId,
      gatewayId: gatewayInfo.id,
      type,
      status: PaymentStatus.PENDING,
      amount: amount.toString(),
      currency,
      processingFee: processingFee.toString(),
      netAmount: netAmount.toString(),
      externalTransactionId: paymentIntent.id,
      description: `${type} via ${gatewayInfo.displayName}`,
      metadata: JSON.stringify(paymentIntent.metadata || {}),
    };

    const [transaction] = await db
      .insert(paymentTransactions)
      .values(transactionData)
      .returning();

    return { paymentIntent, transaction };
  }

  async confirmPayment(transactionId: number): Promise<PaymentResult> {
    const [transaction] = await db
      .select()
      .from(paymentTransactions)
      .leftJoin(paymentGateways, eq(paymentTransactions.gatewayId, paymentGateways.id))
      .where(eq(paymentTransactions.id, transactionId));

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    if (!transaction.payment_gateways) {
      throw new Error('Payment gateway not found');
    }

    const gateway = this.gateways.get(transaction.payment_gateways.slug);
    if (!gateway) {
      throw new Error(`Payment gateway ${transaction.payment_gateways.slug} not available`);
    }

    // Confirm payment with the gateway
    const result = await gateway.confirmPayment(
      transaction.payment_transactions.externalTransactionId!
    );

    // Update transaction status
    await this.updateTransactionStatus(
      transactionId,
      result.success ? PaymentStatus.COMPLETED : PaymentStatus.FAILED,
      result.externalId,
      result.error,
      result.metadata
    );

    return result;
  }

  async getPaymentStatus(transactionId: number): Promise<string> {
    const [transaction] = await db
      .select()
      .from(paymentTransactions)
      .leftJoin(paymentGateways, eq(paymentTransactions.gatewayId, paymentGateways.id))
      .where(eq(paymentTransactions.id, transactionId));

    if (!transaction || !transaction.payment_gateways) {
      return 'unknown';
    }

    const gateway = this.gateways.get(transaction.payment_gateways.slug);
    if (!gateway) {
      return transaction.payment_transactions.status;
    }

    try {
      const status = await gateway.getPaymentStatus(
        transaction.payment_transactions.externalTransactionId!
      );

      // Update status if it has changed
      if (status !== transaction.payment_transactions.status) {
        await this.updateTransactionStatus(transactionId, status);
      }

      return status;
    } catch (error) {
      console.error('Failed to get payment status:', error);
      return transaction.payment_transactions.status;
    }
  }

  async refundPayment(
    transactionId: number,
    amount?: number,
    reason?: string
  ): Promise<PaymentResult> {
    const [transaction] = await db
      .select()
      .from(paymentTransactions)
      .leftJoin(paymentGateways, eq(paymentTransactions.gatewayId, paymentGateways.id))
      .where(eq(paymentTransactions.id, transactionId));

    if (!transaction || !transaction.payment_gateways) {
      throw new Error('Transaction not found');
    }

    const gateway = this.gateways.get(transaction.payment_gateways.slug);
    if (!gateway) {
      throw new Error(`Payment gateway ${transaction.payment_gateways.slug} not available`);
    }

    const refundResult = await gateway.refundPayment(
      transaction.payment_transactions.externalTransactionId!,
      amount,
      reason
    );

    if (refundResult.success) {
      // Create refund transaction record
      const refundData: InsertPaymentTransaction = {
        userId: transaction.payment_transactions.userId,
        gatewayId: transaction.payment_gateways.id,
        type: 'refund',
        status: PaymentStatus.COMPLETED,
        amount: (-Math.abs(refundResult.amount)).toString(),
        currency: transaction.payment_transactions.currency,
        processingFee: '0.00',
        netAmount: (-Math.abs(refundResult.amount)).toString(),
        externalTransactionId: refundResult.refundId,
        description: `Refund for transaction #${transactionId}`,
        metadata: JSON.stringify({ originalTransactionId: transactionId, reason }),
      };

      await db.insert(paymentTransactions).values(refundData);
    }

    return {
      success: refundResult.success,
      transactionId: transactionId.toString(),
      externalId: refundResult.refundId,
      status: refundResult.status,
      amount: refundResult.amount,
      currency: transaction.payment_transactions.currency,
      error: refundResult.error,
    };
  }

  async handleWebhook(
    gatewaySlug: string,
    payload: string,
    signature?: string
  ): Promise<void> {
    const gateway = this.gateways.get(gatewaySlug);
    if (!gateway) {
      throw new Error(`Payment gateway ${gatewaySlug} not available`);
    }

    const [gatewayInfo] = await db
      .select()
      .from(paymentGateways)
      .where(eq(paymentGateways.slug, gatewaySlug));

    if (!gatewayInfo) {
      throw new Error(`Payment gateway ${gatewaySlug} not found`);
    }

    try {
      const event = await gateway.handleWebhook(payload, signature);
      if (!event) {
        return;
      }

      // Log webhook event
      const webhookData: InsertPaymentWebhook = {
        gatewayId: gatewayInfo.id,
        eventType: event.type,
        eventId: event.id,
        status: 'received',
        payload,
      };

      const [webhookRecord] = await db
        .insert(paymentWebhooks)
        .values(webhookData)
        .returning();

      // Process webhook event
      await this.processWebhookEvent(event, webhookRecord.id);

    } catch (error) {
      console.error(`Webhook processing failed for ${gatewaySlug}:`, error);
      throw error;
    }
  }

  async getUserPaymentMethods(userId: number): Promise<PaymentMethod[]> {
    return db
      .select()
      .from(paymentMethods)
      .leftJoin(paymentGateways, eq(paymentMethods.gatewayId, paymentGateways.id))
      .where(
        and(
          eq(paymentMethods.userId, userId),
          eq(paymentMethods.isActive, true)
        )
      )
      .then(results => results.map(r => r.payment_methods));
  }

  async getUserTransactions(
    userId: number,
    limit: number = 50,
    offset: number = 0
  ): Promise<PaymentTransaction[]> {
    return db
      .select()
      .from(paymentTransactions)
      .where(eq(paymentTransactions.userId, userId))
      .orderBy(desc(paymentTransactions.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async getAvailableGateways(): Promise<PaymentGateway[]> {
    return db
      .select()
      .from(paymentGateways)
      .where(eq(paymentGateways.isActive, true));
  }

  private async updateTransactionStatus(
    transactionId: number,
    status: string,
    externalId?: string,
    errorMessage?: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    const updateData: Partial<PaymentTransaction> = {
      status,
      updatedAt: new Date(),
    };

    if (externalId) {
      updateData.externalTransactionId = externalId;
    }

    if (errorMessage) {
      updateData.failureReason = errorMessage;
    }

    if (status === PaymentStatus.COMPLETED || status === PaymentStatus.FAILED) {
      updateData.processedAt = new Date();
    }

    if (metadata) {
      updateData.metadata = JSON.stringify(metadata);
    }

    await db
      .update(paymentTransactions)
      .set(updateData)
      .where(eq(paymentTransactions.id, transactionId));
  }

  private calculateProcessingFee(amount: number, gateway: PaymentGateway): number {
    const feeRate = parseFloat(gateway.processingFee || '0');
    
    if (gateway.processingFeeType === 'fixed') {
      return feeRate;
    } else {
      return (amount * feeRate) / 100;
    }
  }

  private async processWebhookEvent(event: any, webhookId: number): Promise<void> {
    try {
      // Find related transaction
      const transaction = await db
        .select()
        .from(paymentTransactions)
        .where(eq(paymentTransactions.externalTransactionId, event.data.id))
        .limit(1);

      if (transaction.length > 0) {
        // Update webhook record with transaction reference
        await db
          .update(paymentWebhooks)
          .set({ 
            transactionId: transaction[0].id,
            status: 'processed',
            processedAt: new Date(),
          })
          .where(eq(paymentWebhooks.id, webhookId));

        // Update transaction status based on webhook event
        let newStatus = transaction[0].status;
        
        switch (event.type) {
          case 'payment_intent.succeeded':
          case 'checkout.session.completed':
            newStatus = PaymentStatus.COMPLETED;
            break;
          case 'payment_intent.payment_failed':
            newStatus = PaymentStatus.FAILED;
            break;
          case 'payment_intent.processing':
            newStatus = PaymentStatus.PROCESSING;
            break;
        }

        if (newStatus !== transaction[0].status) {
          await this.updateTransactionStatus(transaction[0].id, newStatus);
        }
      }

      // Mark webhook as processed
      await db
        .update(paymentWebhooks)
        .set({ 
          status: 'processed',
          processedAt: new Date(),
        })
        .where(eq(paymentWebhooks.id, webhookId));

    } catch (error) {
      console.error('Failed to process webhook event:', error);
      
      // Mark webhook as failed
      await db
        .update(paymentWebhooks)
        .set({ status: 'failed' })
        .where(eq(paymentWebhooks.id, webhookId));
    }
  }
}

export const paymentService = new PaymentService();