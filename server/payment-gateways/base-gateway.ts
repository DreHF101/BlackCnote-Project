import { PaymentGateway, PaymentTransaction, PaymentMethod } from "@shared/payment-schema";

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret?: string;
  confirmationUrl?: string;
  metadata?: Record<string, any>;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  externalId?: string;
  status: string;
  amount: number;
  currency: string;
  processingFee?: number;
  error?: string;
  metadata?: Record<string, any>;
}

export interface RefundResult {
  success: boolean;
  refundId?: string;
  amount: number;
  status: string;
  error?: string;
}

export interface WebhookEvent {
  id: string;
  type: string;
  data: any;
  signature?: string;
}

export interface GatewayConfig {
  apiKey?: string;
  secretKey?: string;
  publicKey?: string;
  webhookSecret?: string;
  environment: 'sandbox' | 'production';
  additionalConfig?: Record<string, any>;
}

export abstract class BasePaymentGateway {
  protected config: GatewayConfig;
  protected gateway: PaymentGateway;

  constructor(gateway: PaymentGateway, config: GatewayConfig) {
    this.gateway = gateway;
    this.config = config;
  }

  abstract initialize(): Promise<void>;

  abstract createPaymentIntent(
    amount: number,
    currency: string,
    metadata?: Record<string, any>
  ): Promise<PaymentIntent>;

  abstract confirmPayment(
    paymentIntentId: string,
    paymentMethodId?: string
  ): Promise<PaymentResult>;

  abstract capturePayment(paymentIntentId: string): Promise<PaymentResult>;

  abstract refundPayment(
    transactionId: string,
    amount?: number,
    reason?: string
  ): Promise<RefundResult>;

  abstract getPaymentStatus(transactionId: string): Promise<string>;

  abstract handleWebhook(
    payload: string,
    signature?: string
  ): Promise<WebhookEvent | null>;

  abstract createCustomer(
    userId: number,
    email: string,
    name?: string
  ): Promise<string>;

  abstract savePaymentMethod(
    customerId: string,
    paymentMethodData: any
  ): Promise<PaymentMethod>;

  abstract deletePaymentMethod(externalId: string): Promise<boolean>;

  abstract getExchangeRate(
    fromCurrency: string,
    toCurrency: string
  ): Promise<number>;

  // Common utility methods
  protected calculateProcessingFee(amount: number): number {
    if (this.gateway.processingFeeType === 'fixed') {
      return parseFloat(this.gateway.processingFee || '0');
    } else {
      return (amount * parseFloat(this.gateway.processingFee || '0')) / 100;
    }
  }

  protected validateAmount(amount: number): boolean {
    const minAmount = parseFloat(this.gateway.minAmount || '0');
    const maxAmount = parseFloat(this.gateway.maxAmount || '999999');
    return amount >= minAmount && amount <= maxAmount;
  }

  protected isCurrencySupported(currency: string): boolean {
    if (!this.gateway.supportedCurrencies) return true;
    return this.gateway.supportedCurrencies.includes(currency.toLowerCase());
  }

  // Helper method to format currency amounts
  protected formatAmount(amount: number, currency: string): number {
    // Most gateways expect amounts in smallest currency unit (cents for USD)
    const multipliers: Record<string, number> = {
      'USD': 100,
      'EUR': 100,
      'GBP': 100,
      'JPY': 1,
      'BTC': 100000000, // satoshis
      'ETH': 1000000000000000000, // wei
    };
    
    return Math.round(amount * (multipliers[currency.toUpperCase()] || 100));
  }

  protected parseAmount(amount: number, currency: string): number {
    const multipliers: Record<string, number> = {
      'USD': 100,
      'EUR': 100,
      'GBP': 100,
      'JPY': 1,
      'BTC': 100000000,
      'ETH': 1000000000000000000,
    };
    
    return amount / (multipliers[currency.toUpperCase()] || 100);
  }
}