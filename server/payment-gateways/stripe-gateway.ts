import Stripe from 'stripe';
import { BasePaymentGateway, PaymentIntent, PaymentResult, RefundResult, WebhookEvent, GatewayConfig } from './base-gateway';
import { PaymentGateway, PaymentMethod } from '@shared/payment-schema';

export class StripeGateway extends BasePaymentGateway {
  private stripe: Stripe;

  constructor(gateway: PaymentGateway, config: GatewayConfig) {
    super(gateway, config);
    
    if (!config.secretKey) {
      throw new Error('Stripe secret key is required');
    }

    this.stripe = new Stripe(config.secretKey, {
      apiVersion: '2023-10-16',
    });
  }

  async initialize(): Promise<void> {
    try {
      // Verify the API key by making a test request
      await this.stripe.balance.retrieve();
    } catch (error) {
      throw new Error(`Failed to initialize Stripe: ${error}`);
    }
  }

  async createPaymentIntent(
    amount: number,
    currency: string = 'usd',
    metadata: Record<string, any> = {}
  ): Promise<PaymentIntent> {
    if (!this.validateAmount(amount)) {
      throw new Error(`Amount ${amount} is outside allowed range`);
    }

    if (!this.isCurrencySupported(currency)) {
      throw new Error(`Currency ${currency} is not supported`);
    }

    const stripeAmount = this.formatAmount(amount, currency);
    const processingFee = this.calculateProcessingFee(amount);

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: stripeAmount,
        currency: currency.toLowerCase(),
        metadata: {
          ...metadata,
          gateway: 'stripe',
          originalAmount: amount.toString(),
          processingFee: processingFee.toString(),
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        id: paymentIntent.id,
        amount,
        currency,
        status: paymentIntent.status,
        clientSecret: paymentIntent.client_secret || undefined,
        metadata: paymentIntent.metadata,
      };
    } catch (error) {
      throw new Error(`Failed to create Stripe payment intent: ${error}`);
    }
  }

  async confirmPayment(
    paymentIntentId: string,
    paymentMethodId?: string
  ): Promise<PaymentResult> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.confirm(paymentIntentId, {
        payment_method: paymentMethodId,
      });

      const originalAmount = parseFloat(paymentIntent.metadata?.originalAmount || '0');
      const processingFee = parseFloat(paymentIntent.metadata?.processingFee || '0');

      return {
        success: paymentIntent.status === 'succeeded',
        transactionId: paymentIntent.id,
        externalId: paymentIntent.id,
        status: paymentIntent.status,
        amount: originalAmount,
        currency: paymentIntent.currency.toUpperCase(),
        processingFee,
        metadata: paymentIntent.metadata,
      };
    } catch (error: any) {
      return {
        success: false,
        transactionId: paymentIntentId,
        externalId: paymentIntentId,
        status: 'failed',
        amount: 0,
        currency: 'USD',
        error: error.message,
      };
    }
  }

  async capturePayment(paymentIntentId: string): Promise<PaymentResult> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.capture(paymentIntentId);
      
      const originalAmount = parseFloat(paymentIntent.metadata?.originalAmount || '0');
      const processingFee = parseFloat(paymentIntent.metadata?.processingFee || '0');

      return {
        success: paymentIntent.status === 'succeeded',
        transactionId: paymentIntent.id,
        externalId: paymentIntent.id,
        status: paymentIntent.status,
        amount: originalAmount,
        currency: paymentIntent.currency.toUpperCase(),
        processingFee,
        metadata: paymentIntent.metadata,
      };
    } catch (error: any) {
      return {
        success: false,
        transactionId: paymentIntentId,
        externalId: paymentIntentId,
        status: 'failed',
        amount: 0,
        currency: 'USD',
        error: error.message,
      };
    }
  }

  async refundPayment(
    transactionId: string,
    amount?: number,
    reason?: string
  ): Promise<RefundResult> {
    try {
      const refundData: Stripe.RefundCreateParams = {
        payment_intent: transactionId,
        reason: reason as Stripe.RefundCreateParams.Reason,
      };

      if (amount) {
        // Determine currency from the original payment intent
        const paymentIntent = await this.stripe.paymentIntents.retrieve(transactionId);
        const stripeAmount = this.formatAmount(amount, paymentIntent.currency);
        refundData.amount = stripeAmount;
      }

      const refund = await this.stripe.refunds.create(refundData);

      return {
        success: refund.status === 'succeeded',
        refundId: refund.id,
        amount: this.parseAmount(refund.amount, refund.currency),
        status: refund.status,
      };
    } catch (error: any) {
      return {
        success: false,
        amount: amount || 0,
        status: 'failed',
        error: error.message,
      };
    }
  }

  async getPaymentStatus(transactionId: string): Promise<string> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(transactionId);
      return paymentIntent.status;
    } catch (error) {
      return 'unknown';
    }
  }

  async handleWebhook(payload: string, signature?: string): Promise<WebhookEvent | null> {
    if (!signature || !this.config.webhookSecret) {
      throw new Error('Webhook signature validation failed');
    }

    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        this.config.webhookSecret
      );

      return {
        id: event.id,
        type: event.type,
        data: event.data,
      };
    } catch (error) {
      throw new Error(`Webhook validation failed: ${error}`);
    }
  }

  async createCustomer(userId: number, email: string, name?: string): Promise<string> {
    try {
      const customer = await this.stripe.customers.create({
        email,
        name,
        metadata: {
          userId: userId.toString(),
        },
      });

      return customer.id;
    } catch (error) {
      throw new Error(`Failed to create Stripe customer: ${error}`);
    }
  }

  async savePaymentMethod(
    customerId: string,
    paymentMethodData: any
  ): Promise<PaymentMethod> {
    try {
      // Attach payment method to customer
      await this.stripe.paymentMethods.attach(paymentMethodData.id, {
        customer: customerId,
      });

      const paymentMethod = await this.stripe.paymentMethods.retrieve(paymentMethodData.id);

      // Convert Stripe payment method to our format
      const result: Partial<PaymentMethod> = {
        type: paymentMethod.type as any,
        externalId: paymentMethod.id,
        isActive: true,
      };

      if (paymentMethod.card) {
        result.last4 = paymentMethod.card.last4;
        result.brand = paymentMethod.card.brand;
        result.expiryMonth = paymentMethod.card.exp_month;
        result.expiryYear = paymentMethod.card.exp_year;
      }

      if (paymentMethod.billing_details?.name) {
        result.holderName = paymentMethod.billing_details.name;
      }

      return result as PaymentMethod;
    } catch (error) {
      throw new Error(`Failed to save payment method: ${error}`);
    }
  }

  async deletePaymentMethod(externalId: string): Promise<boolean> {
    try {
      await this.stripe.paymentMethods.detach(externalId);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number> {
    // Stripe doesn't provide exchange rates directly
    // You would typically use a separate service like exchangerate-api.com
    // For now, return 1 as a placeholder
    return 1;
  }
}