import { BasePaymentGateway, PaymentIntent, PaymentResult, RefundResult, WebhookEvent, GatewayConfig } from './base-gateway';
import { PaymentGateway, PaymentMethod } from '@shared/payment-schema';

interface CryptoAddress {
  address: string;
  currency: string;
  network: string;
}

interface CryptoTransaction {
  hash: string;
  amount: string;
  confirmations: number;
  status: string;
}

export class CryptoGateway extends BasePaymentGateway {
  private supportedCurrencies = ['BTC', 'ETH', 'LTC', 'USDT', 'USDC'];

  constructor(gateway: PaymentGateway, config: GatewayConfig) {
    super(gateway, config);
  }

  async initialize(): Promise<void> {
    // Crypto gateway initialization
    // In a real implementation, you would connect to blockchain APIs
    console.log('Crypto gateway initialized');
  }

  async createPaymentIntent(
    amount: number,
    currency: string = 'BTC',
    metadata: Record<string, any> = {}
  ): Promise<PaymentIntent> {
    if (!this.validateAmount(amount)) {
      throw new Error(`Amount ${amount} is outside allowed range`);
    }

    if (!this.supportedCurrencies.includes(currency.toUpperCase())) {
      throw new Error(`Currency ${currency} is not supported`);
    }

    const processingFee = this.calculateProcessingFee(amount);
    const paymentId = `crypto_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Generate a unique wallet address for this payment
    const walletAddress = await this.generateWalletAddress(currency.toUpperCase());

    return {
      id: paymentId,
      amount,
      currency: currency.toUpperCase(),
      status: 'pending',
      confirmationUrl: `crypto://pay?address=${walletAddress}&amount=${amount}&currency=${currency}`,
      metadata: {
        ...metadata,
        gateway: 'crypto',
        walletAddress,
        processingFee: processingFee.toString(),
        requiredConfirmations: this.getRequiredConfirmations(currency),
      },
    };
  }

  async confirmPayment(
    paymentIntentId: string,
    paymentMethodId?: string
  ): Promise<PaymentResult> {
    try {
      // In a real implementation, you would check the blockchain for the transaction
      const transaction = await this.checkBlockchainTransaction(paymentIntentId);

      if (!transaction) {
        return {
          success: false,
          transactionId: paymentIntentId,
          externalId: paymentIntentId,
          status: 'pending',
          amount: 0,
          currency: 'BTC',
          error: 'Transaction not found on blockchain',
        };
      }

      const isConfirmed = transaction.confirmations >= this.getRequiredConfirmations('BTC');
      const amount = parseFloat(transaction.amount);
      const processingFee = this.calculateProcessingFee(amount);

      return {
        success: isConfirmed,
        transactionId: paymentIntentId,
        externalId: transaction.hash,
        status: isConfirmed ? 'completed' : 'pending',
        amount,
        currency: 'BTC',
        processingFee,
        metadata: {
          gateway: 'crypto',
          transactionHash: transaction.hash,
          confirmations: transaction.confirmations,
          requiredConfirmations: this.getRequiredConfirmations('BTC'),
        },
      };
    } catch (error: any) {
      return {
        success: false,
        transactionId: paymentIntentId,
        externalId: paymentIntentId,
        status: 'failed',
        amount: 0,
        currency: 'BTC',
        error: error.message,
      };
    }
  }

  async capturePayment(paymentIntentId: string): Promise<PaymentResult> {
    // Crypto payments are automatically captured when confirmed
    return this.confirmPayment(paymentIntentId);
  }

  async refundPayment(
    transactionId: string,
    amount?: number,
    reason?: string
  ): Promise<RefundResult> {
    // Crypto payments cannot be automatically refunded
    // This would require manual intervention
    return {
      success: false,
      amount: amount || 0,
      status: 'failed',
      error: 'Crypto payments cannot be automatically refunded. Please contact support for manual refund processing.',
    };
  }

  async getPaymentStatus(transactionId: string): Promise<string> {
    try {
      const transaction = await this.checkBlockchainTransaction(transactionId);
      
      if (!transaction) {
        return 'pending';
      }

      const requiredConfirmations = this.getRequiredConfirmations('BTC');
      
      if (transaction.confirmations >= requiredConfirmations) {
        return 'completed';
      } else if (transaction.confirmations > 0) {
        return 'processing';
      } else {
        return 'pending';
      }
    } catch (error) {
      return 'unknown';
    }
  }

  async handleWebhook(payload: string, signature?: string): Promise<WebhookEvent | null> {
    try {
      const event = JSON.parse(payload);
      
      // Crypto webhook validation would go here
      // Different blockchain APIs have different webhook formats
      
      return {
        id: event.id || event.txid,
        type: event.type || 'transaction',
        data: event,
      };
    } catch (error) {
      throw new Error(`Crypto webhook validation failed: ${error}`);
    }
  }

  async createCustomer(userId: number, email: string, name?: string): Promise<string> {
    // Generate a unique customer ID for crypto payments
    return `crypto_customer_${userId}`;
  }

  async savePaymentMethod(
    customerId: string,
    paymentMethodData: any
  ): Promise<PaymentMethod> {
    // Validate crypto wallet address
    if (!this.isValidWalletAddress(paymentMethodData.address, paymentMethodData.currency)) {
      throw new Error('Invalid wallet address');
    }

    return {
      id: 0,
      userId: 0,
      gatewayId: this.gateway.id,
      type: 'crypto_wallet',
      brand: paymentMethodData.currency.toLowerCase(),
      holderName: paymentMethodData.name || '',
      isDefault: false,
      isActive: true,
      externalId: paymentMethodData.address,
      metadata: JSON.stringify({
        address: paymentMethodData.address,
        currency: paymentMethodData.currency,
        network: paymentMethodData.network || 'mainnet',
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async deletePaymentMethod(externalId: string): Promise<boolean> {
    // Crypto wallet addresses cannot be "deleted" but can be marked as inactive
    return true;
  }

  async getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number> {
    try {
      // In a real implementation, you would use a crypto exchange API
      // like CoinGecko, CoinMarketCap, or a trading exchange
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${this.getCoinGeckoId(fromCurrency)}&vs_currencies=${toCurrency.toLowerCase()}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate');
      }
      
      const data = await response.json();
      const coinId = this.getCoinGeckoId(fromCurrency);
      
      return data[coinId]?.[toCurrency.toLowerCase()] || 1;
    } catch (error) {
      console.warn(`Failed to get exchange rate for ${fromCurrency}/${toCurrency}:`, error);
      return 1;
    }
  }

  // Private helper methods
  private async generateWalletAddress(currency: string): Promise<string> {
    // In a real implementation, you would generate or retrieve a wallet address
    // from your crypto wallet infrastructure
    const addresses: Record<string, string> = {
      'BTC': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      'ETH': '0x742C3cF8c3F631061915aE3D9C5d4b1e2e4e0e4',
      'LTC': 'LTC1QxyZ3cF8c3F631061915aE3D9C5d4b1e2e4e0e4',
      'USDT': '0x742C3cF8c3F631061915aE3D9C5d4b1e2e4e0e4',
      'USDC': '0x742C3cF8c3F631061915aE3D9C5d4b1e2e4e0e4',
    };

    return addresses[currency] || addresses['BTC'];
  }

  private async checkBlockchainTransaction(paymentId: string): Promise<CryptoTransaction | null> {
    // In a real implementation, you would query blockchain APIs
    // This is a mock implementation
    return {
      hash: `0x${Math.random().toString(16).substr(2, 64)}`,
      amount: '0.001',
      confirmations: Math.floor(Math.random() * 10),
      status: 'confirmed',
    };
  }

  private getRequiredConfirmations(currency: string): number {
    const confirmations: Record<string, number> = {
      'BTC': 3,
      'ETH': 12,
      'LTC': 6,
      'USDT': 12,
      'USDC': 12,
    };

    return confirmations[currency.toUpperCase()] || 3;
  }

  private isValidWalletAddress(address: string, currency: string): boolean {
    // Basic validation - in a real implementation, you would use proper
    // crypto address validation libraries
    const patterns: Record<string, RegExp> = {
      'BTC': /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
      'ETH': /^0x[a-fA-F0-9]{40}$/,
      'LTC': /^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/,
      'USDT': /^0x[a-fA-F0-9]{40}$/, // ERC-20
      'USDC': /^0x[a-fA-F0-9]{40}$/, // ERC-20
    };

    const pattern = patterns[currency.toUpperCase()];
    return pattern ? pattern.test(address) : false;
  }

  private getCoinGeckoId(currency: string): string {
    const mapping: Record<string, string> = {
      'BTC': 'bitcoin',
      'ETH': 'ethereum',
      'LTC': 'litecoin',
      'USDT': 'tether',
      'USDC': 'usd-coin',
    };

    return mapping[currency.toUpperCase()] || 'bitcoin';
  }
}