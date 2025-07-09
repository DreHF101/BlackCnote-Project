import { HYIPLabPaymentGateway, HYIPLabGatewayConfig, HYIPLabDepositData, HYIPLabWithdrawData, HYIPLabPaymentResponse } from './hyiplab-gateway-interface';
import crypto from 'crypto';

/**
 * HYIPLab-compatible Cryptocurrency Payment Gateway
 * 
 * Supports Bitcoin, Ethereum, Litecoin and other popular cryptocurrencies
 * Compatible with popular HYIP crypto payment processors
 */
export class HYIPLabCryptoGateway extends HYIPLabPaymentGateway {
  private apiKey: string | null;
  private apiSecret: string | null;
  private supportedCurrencies: string[];

  constructor(config: HYIPLabGatewayConfig) {
    super(config);
    
    this.apiKey = process.env.CRYPTO_API_KEY || null;
    this.apiSecret = process.env.CRYPTO_API_SECRET || null;
    this.supportedCurrencies = ['BTC', 'ETH', 'LTC', 'USDT', 'USDC', 'BCH', 'DOGE'];
  }

  async processDeposit(depositData: HYIPLabDepositData): Promise<HYIPLabPaymentResponse> {
    try {
      // Validate deposit data
      const validation = this.validateDepositData(depositData);
      if (!validation.valid) {
        return {
          success: false,
          message: validation.errors.join(', ')
        };
      }

      // For demo/development mode, generate mock crypto address
      if (!this.apiKey) {
        return this.generateDemoDeposit(depositData);
      }

      // Determine cryptocurrency based on amount and preferences
      const crypto_currency = this.determineCryptoCurrency(depositData);
      const crypto_amount = await this.convertUSDToCrypto(depositData.final_amo, crypto_currency);
      
      // Generate crypto address for deposit
      const depositAddress = await this.generateDepositAddress(crypto_currency, depositData.trx);
      
      if (!depositAddress) {
        return {
          success: false,
          message: 'Failed to generate deposit address'
        };
      }

      return {
        success: true,
        message: 'Crypto deposit address generated successfully',
        redirect_url: `/crypto-payment?address=${depositAddress.address}&amount=${crypto_amount}&currency=${crypto_currency}&trx=${depositData.trx}`,
        payment_data: {
          crypto_address: depositAddress.address,
          crypto_amount: crypto_amount,
          crypto_currency: crypto_currency,
          qr_code: depositAddress.qr_code,
          expires_at: depositAddress.expires_at
        },
        transaction_id: depositAddress.address,
        reference_id: depositData.trx
      };

    } catch (error: any) {
      console.error('HYIPLab Crypto deposit error:', error);
      return {
        success: false,
        message: error.message || 'Crypto payment processing failed'
      };
    }
  }

  async processWithdraw(withdrawData: HYIPLabWithdrawData): Promise<HYIPLabPaymentResponse> {
    try {
      if (!this.apiKey) {
        // Demo mode - simulate successful withdrawal
        return {
          success: true,
          message: 'Demo withdrawal processed successfully',
          transaction_id: this.generateTransactionId(),
          reference_id: withdrawData.withdraw_id.toString()
        };
      }

      const crypto_currency = withdrawData.user_data.crypto_currency || 'BTC';
      const crypto_address = withdrawData.user_data.crypto_address;
      
      if (!crypto_address) {
        return {
          success: false,
          message: 'Crypto withdrawal address not provided'
        };
      }

      // Convert USD to crypto amount
      const crypto_amount = await this.convertUSDToCrypto(withdrawData.final_amount, crypto_currency);
      
      // Process withdrawal to blockchain
      const txHash = await this.sendCryptoPayment(crypto_address, crypto_amount, crypto_currency);
      
      if (!txHash) {
        return {
          success: false,
          message: 'Failed to process crypto withdrawal'
        };
      }

      return {
        success: true,
        message: 'Crypto withdrawal processed successfully',
        transaction_id: txHash,
        reference_id: withdrawData.withdraw_id.toString()
      };

    } catch (error: any) {
      console.error('HYIPLab Crypto withdrawal error:', error);
      return {
        success: false,
        message: error.message || 'Crypto withdrawal processing failed'
      };
    }
  }

  async handleCallback(callbackData: Record<string, any>): Promise<HYIPLabPaymentResponse> {
    try {
      // Handle blockchain confirmation callback
      const { tx_hash, confirmations, status, amount, currency, reference_id } = callbackData;

      // Verify callback authenticity
      if (!this.verifyCallbackSignature(callbackData)) {
        return {
          success: false,
          message: 'Invalid callback signature'
        };
      }

      // Check if transaction has enough confirmations
      const requiredConfirmations = this.getRequiredConfirmations(currency);
      
      if (confirmations >= requiredConfirmations && status === 'confirmed') {
        return {
          success: true,
          message: 'Crypto payment confirmed',
          transaction_id: tx_hash,
          reference_id: reference_id
        };
      } else {
        return {
          success: false,
          message: `Waiting for confirmations (${confirmations}/${requiredConfirmations})`
        };
      }

    } catch (error: any) {
      console.error('HYIPLab Crypto callback error:', error);
      return {
        success: false,
        message: error.message || 'Callback processing failed'
      };
    }
  }

  async verifyPayment(transactionId: string): Promise<{
    status: 'pending' | 'complete' | 'failed' | 'cancelled';
    amount?: number;
    currency?: string;
    reference_id?: string;
  }> {
    try {
      if (!this.apiKey) {
        // Demo mode - simulate verification
        return {
          status: 'complete',
          amount: 100,
          currency: 'BTC',
          reference_id: 'DEMO_' + Date.now()
        };
      }

      // Check transaction status on blockchain
      const txStatus = await this.getTransactionStatus(transactionId);
      
      if (!txStatus) {
        return { status: 'failed' };
      }

      let status: 'pending' | 'complete' | 'failed' | 'cancelled';
      
      if (txStatus.confirmations >= this.getRequiredConfirmations(txStatus.currency)) {
        status = 'complete';
      } else if (txStatus.confirmations > 0) {
        status = 'pending';
      } else {
        status = 'failed';
      }

      return {
        status,
        amount: txStatus.amount,
        currency: txStatus.currency,
        reference_id: txStatus.reference_id
      };

    } catch (error: any) {
      console.error('HYIPLab Crypto verification error:', error);
      return { status: 'failed' };
    }
  }

  private generateDemoDeposit(depositData: HYIPLabDepositData): HYIPLabPaymentResponse {
    const crypto_currency = 'BTC';
    const demo_address = this.generateDemoAddress(crypto_currency);
    const crypto_amount = (depositData.final_amo / 45000).toFixed(8); // Mock BTC conversion
    
    return {
      success: true,
      message: 'Demo crypto deposit address generated',
      redirect_url: `/crypto-payment?address=${demo_address}&amount=${crypto_amount}&currency=${crypto_currency}&trx=${depositData.trx}&demo=true`,
      payment_data: {
        crypto_address: demo_address,
        crypto_amount: crypto_amount,
        crypto_currency: crypto_currency,
        qr_code: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${crypto_currency}:${demo_address}?amount=${crypto_amount}`,
        expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
        demo_mode: true
      },
      transaction_id: demo_address,
      reference_id: depositData.trx
    };
  }

  private generateDemoAddress(currency: string): string {
    const prefixes: Record<string, string> = {
      'BTC': '1',
      'ETH': '0x',
      'LTC': 'L',
      'USDT': '0x',
      'USDC': '0x',
      'BCH': 'q',
      'DOGE': 'D'
    };

    const prefix = prefixes[currency] || '1';
    const suffix = crypto.randomBytes(20).toString('hex');
    
    if (currency === 'ETH' || currency === 'USDT' || currency === 'USDC') {
      return prefix + suffix.slice(0, 40);
    } else {
      return prefix + suffix.slice(0, 33);
    }
  }

  private determineCryptoCurrency(depositData: HYIPLabDepositData): string {
    // Default to Bitcoin, can be enhanced with user preferences
    return 'BTC';
  }

  private async convertUSDToCrypto(usdAmount: number, currency: string): Promise<string> {
    // Mock conversion rates for demo
    const rates: Record<string, number> = {
      'BTC': 45000,
      'ETH': 3000,
      'LTC': 100,
      'USDT': 1,
      'USDC': 1,
      'BCH': 300,
      'DOGE': 0.15
    };

    const rate = rates[currency] || rates['BTC'];
    const cryptoAmount = usdAmount / rate;
    
    return cryptoAmount.toFixed(8);
  }

  private async generateDepositAddress(currency: string, reference: string): Promise<{
    address: string;
    qr_code: string;
    expires_at: string;
  } | null> {
    // In production, this would call to a crypto payment processor API
    // For demo, generate a mock address
    
    const address = this.generateDemoAddress(currency);
    const qr_code = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${currency}:${address}`;
    const expires_at = new Date(Date.now() + 30 * 60 * 1000).toISOString();
    
    return {
      address,
      qr_code,
      expires_at
    };
  }

  private async sendCryptoPayment(address: string, amount: string, currency: string): Promise<string | null> {
    // In production, this would send actual crypto transaction
    // For demo, return mock transaction hash
    
    const mockTxHash = crypto.randomBytes(32).toString('hex');
    return mockTxHash;
  }

  private async getTransactionStatus(txHash: string): Promise<{
    confirmations: number;
    amount: number;
    currency: string;
    reference_id: string;
  } | null> {
    // Mock transaction status for demo
    return {
      confirmations: 6,
      amount: 0.001,
      currency: 'BTC',
      reference_id: 'DEMO_' + Date.now()
    };
  }

  private getRequiredConfirmations(currency: string): number {
    const confirmations: Record<string, number> = {
      'BTC': 3,
      'ETH': 12,
      'LTC': 6,
      'USDT': 12,
      'USDC': 12,
      'BCH': 6,
      'DOGE': 6
    };

    return confirmations[currency] || 3;
  }

  private verifyCallbackSignature(callbackData: Record<string, any>): boolean {
    // In production, verify callback signature from crypto processor
    // For demo, always return true
    return true;
  }

  /**
   * Create HYIPLab-compatible configuration for Crypto Gateway
   */
  static createConfig(): HYIPLabGatewayConfig {
    return {
      gateway_name: 'Cryptocurrency',
      gateway_slug: 'crypto',
      gateway_type: 'automatic',
      gateway_currency: ['BTC', 'ETH', 'LTC', 'USDT', 'USDC', 'BCH', 'DOGE'],
      gateway_symbol: '₿',
      gateway_min_amount: 10,
      gateway_max_amount: 500000,
      gateway_fixed_charge: 0,
      gateway_percent_charge: 1.5,
      gateway_rate: 1,
      gateway_method: 'post',
      gateway_url: 'https://blockchain.info',
      gateway_val: {
        api_key: process.env.CRYPTO_API_KEY || '',
        api_secret: process.env.CRYPTO_API_SECRET || '',
        webhook_secret: process.env.CRYPTO_WEBHOOK_SECRET || ''
      },
      gateway_description: 'Pay with Bitcoin, Ethereum, Litecoin, and other cryptocurrencies',
      gateway_instruction: 'Send the exact amount to the generated address within 30 minutes',
      gateway_status: 1, // Always available (demo mode if no API keys)
      gateway_extra: {
        logo: 'https://bitcoin.org/img/icons/opengraph.png',
        color: '#f7931a',
        supported_currencies: ['BTC', 'ETH', 'LTC', 'USDT', 'USDC', 'BCH', 'DOGE'],
        demo_mode: !process.env.CRYPTO_API_KEY
      }
    };
  }
}