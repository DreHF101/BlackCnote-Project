import { BasePaymentGateway, PaymentIntent, PaymentResult, RefundResult, WebhookEvent, GatewayConfig } from './base-gateway';
import { PaymentGateway, PaymentMethod } from '@shared/payment-schema';

interface PayPalAccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface PayPalOrder {
  id: string;
  status: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

export class PayPalGateway extends BasePaymentGateway {
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;
  private baseUrl: string;

  constructor(gateway: PaymentGateway, config: GatewayConfig) {
    super(gateway, config);
    
    if (!config.apiKey || !config.secretKey) {
      throw new Error('PayPal client ID and secret are required');
    }

    this.baseUrl = config.environment === 'production' 
      ? 'https://api.paypal.com'
      : 'https://api.sandbox.paypal.com';
  }

  async initialize(): Promise<void> {
    try {
      await this.getAccessToken();
    } catch (error) {
      throw new Error(`Failed to initialize PayPal: ${error}`);
    }
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const auth = Buffer.from(`${this.config.apiKey}:${this.config.secretKey}`).toString('base64');

    try {
      const response = await fetch(`${this.baseUrl}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      });

      if (!response.ok) {
        throw new Error(`PayPal auth failed: ${response.statusText}`);
      }

      const data: PayPalAccessToken = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Refresh 1 minute early

      return this.accessToken;
    } catch (error) {
      throw new Error(`Failed to get PayPal access token: ${error}`);
    }
  }

  async createPaymentIntent(
    amount: number,
    currency: string = 'USD',
    metadata: Record<string, any> = {}
  ): Promise<PaymentIntent> {
    if (!this.validateAmount(amount)) {
      throw new Error(`Amount ${amount} is outside allowed range`);
    }

    if (!this.isCurrencySupported(currency)) {
      throw new Error(`Currency ${currency} is not supported`);
    }

    const accessToken = await this.getAccessToken();
    const processingFee = this.calculateProcessingFee(amount);

    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: currency.toUpperCase(),
          value: amount.toFixed(2),
        },
        custom_id: metadata.customId || '',
        description: metadata.description || 'BlackCnote Investment',
      }],
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
            brand_name: 'BlackCnote',
            locale: 'en-US',
            landing_page: 'LOGIN',
            user_action: 'PAY_NOW',
          },
        },
      },
    };

    try {
      const response = await fetch(`${this.baseUrl}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`PayPal order creation failed: ${response.statusText}`);
      }

      const order: PayPalOrder = await response.json();
      const approveLink = order.links.find(link => link.rel === 'approve');

      return {
        id: order.id,
        amount,
        currency,
        status: order.status.toLowerCase(),
        confirmationUrl: approveLink?.href,
        metadata: {
          ...metadata,
          gateway: 'paypal',
          processingFee: processingFee.toString(),
        },
      };
    } catch (error) {
      throw new Error(`Failed to create PayPal order: ${error}`);
    }
  }

  async confirmPayment(
    paymentIntentId: string,
    paymentMethodId?: string
  ): Promise<PaymentResult> {
    const accessToken = await this.getAccessToken();

    try {
      const response = await fetch(`${this.baseUrl}/v2/checkout/orders/${paymentIntentId}/capture`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`PayPal capture failed: ${response.statusText}`);
      }

      const captureData = await response.json();
      const captureUnit = captureData.purchase_units?.[0]?.payments?.captures?.[0];

      if (!captureUnit) {
        throw new Error('No capture data found');
      }

      const amount = parseFloat(captureUnit.amount.value);
      const processingFee = this.calculateProcessingFee(amount);

      return {
        success: captureUnit.status === 'COMPLETED',
        transactionId: paymentIntentId,
        externalId: captureUnit.id,
        status: captureUnit.status.toLowerCase(),
        amount,
        currency: captureUnit.amount.currency_code,
        processingFee,
        metadata: {
          gateway: 'paypal',
          captureId: captureUnit.id,
        },
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
    // PayPal handles capture in confirmPayment
    return this.confirmPayment(paymentIntentId);
  }

  async refundPayment(
    transactionId: string,
    amount?: number,
    reason?: string
  ): Promise<RefundResult> {
    const accessToken = await this.getAccessToken();

    try {
      // First, get the capture ID from the order
      const orderResponse = await fetch(`${this.baseUrl}/v2/checkout/orders/${transactionId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to retrieve PayPal order');
      }

      const orderData = await orderResponse.json();
      const captureId = orderData.purchase_units?.[0]?.payments?.captures?.[0]?.id;

      if (!captureId) {
        throw new Error('No capture found for this transaction');
      }

      const refundData: any = {
        note_to_payer: reason || 'Refund processed',
      };

      if (amount) {
        const originalAmount = parseFloat(orderData.purchase_units[0].amount.value);
        const currency = orderData.purchase_units[0].amount.currency_code;
        
        if (amount <= originalAmount) {
          refundData.amount = {
            value: amount.toFixed(2),
            currency_code: currency,
          };
        }
      }

      const response = await fetch(`${this.baseUrl}/v2/payments/captures/${captureId}/refund`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(refundData),
      });

      if (!response.ok) {
        throw new Error(`PayPal refund failed: ${response.statusText}`);
      }

      const refund = await response.json();

      return {
        success: refund.status === 'COMPLETED',
        refundId: refund.id,
        amount: parseFloat(refund.amount.value),
        status: refund.status.toLowerCase(),
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
    const accessToken = await this.getAccessToken();

    try {
      const response = await fetch(`${this.baseUrl}/v2/checkout/orders/${transactionId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        return 'unknown';
      }

      const order = await response.json();
      return order.status.toLowerCase();
    } catch (error) {
      return 'unknown';
    }
  }

  async handleWebhook(payload: string, signature?: string): Promise<WebhookEvent | null> {
    try {
      const event = JSON.parse(payload);
      
      // PayPal webhook verification would go here
      // For now, we'll accept all webhooks
      
      return {
        id: event.id,
        type: event.event_type,
        data: event.resource,
      };
    } catch (error) {
      throw new Error(`PayPal webhook validation failed: ${error}`);
    }
  }

  async createCustomer(userId: number, email: string, name?: string): Promise<string> {
    // PayPal doesn't have a direct customer concept like Stripe
    // Return a generated customer ID for consistency
    return `paypal_customer_${userId}`;
  }

  async savePaymentMethod(
    customerId: string,
    paymentMethodData: any
  ): Promise<PaymentMethod> {
    // PayPal payment methods are typically handled through their UI
    // Return a basic payment method structure
    return {
      id: 0,
      userId: 0,
      gatewayId: this.gateway.id,
      type: 'digital_wallet',
      brand: 'paypal',
      holderName: paymentMethodData.name || '',
      isDefault: false,
      isActive: true,
      externalId: paymentMethodData.id || '',
      metadata: JSON.stringify(paymentMethodData),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async deletePaymentMethod(externalId: string): Promise<boolean> {
    // PayPal payment methods are managed through their platform
    return true;
  }

  async getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number> {
    // PayPal doesn't provide exchange rates directly
    return 1;
  }
}