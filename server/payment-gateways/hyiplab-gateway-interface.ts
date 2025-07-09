/**
 * HYIPLab Payment Gateway Interface
 * 
 * This interface ensures compatibility with HYIPLab plugin architecture
 * while maintaining BlackCnote's modern TypeScript implementation.
 */

export interface HYIPLabGatewayConfig {
  // HYIPLab standard configuration
  gateway_name: string;
  gateway_slug: string;
  gateway_type: 'automatic' | 'manual';
  gateway_currency: string[];
  gateway_symbol: string;
  gateway_min_amount: number;
  gateway_max_amount: number;
  gateway_fixed_charge: number;
  gateway_percent_charge: number;
  gateway_rate: number;
  gateway_method: 'get' | 'post';
  gateway_url: string;
  gateway_val: Record<string, any>;
  gateway_description: string;
  gateway_instruction: string;
  gateway_status: 0 | 1;
  gateway_extra: Record<string, any>;
}

export interface HYIPLabDepositData {
  gateway: string;
  method_code: number;
  amount: number;
  charge: number;
  rate: number;
  final_amo: number;
  usd_amo: number;
  btc_amo?: number;
  btc_wallet?: string;
  trx: string;
  success_url: string;
  failed_url: string;
  cancel_url: string;
}

export interface HYIPLabWithdrawData {
  withdraw_id: number;
  gateway: string;
  amount: number;
  charge: number;
  after_charge: number;
  rate: number;
  final_amount: number;
  user_data: Record<string, any>;
  currency: string;
  method_name: string;
}

export interface HYIPLabPaymentResponse {
  success: boolean;
  message: string;
  redirect_url?: string;
  payment_data?: Record<string, any>;
  transaction_id?: string;
  reference_id?: string;
}

/**
 * Abstract base class for HYIPLab-compatible payment gateways
 */
export abstract class HYIPLabPaymentGateway {
  protected config: HYIPLabGatewayConfig;
  
  constructor(config: HYIPLabGatewayConfig) {
    this.config = config;
  }

  /**
   * Process deposit according to HYIPLab standards
   */
  abstract processDeposit(depositData: HYIPLabDepositData): Promise<HYIPLabPaymentResponse>;

  /**
   * Process withdrawal according to HYIPLab standards
   */
  abstract processWithdraw(withdrawData: HYIPLabWithdrawData): Promise<HYIPLabPaymentResponse>;

  /**
   * Handle payment callback/webhook
   */
  abstract handleCallback(callbackData: Record<string, any>): Promise<HYIPLabPaymentResponse>;

  /**
   * Verify payment status
   */
  abstract verifyPayment(transactionId: string): Promise<{
    status: 'pending' | 'complete' | 'failed' | 'cancelled';
    amount?: number;
    currency?: string;
    reference_id?: string;
  }>;

  /**
   * Get gateway configuration for HYIPLab
   */
  getConfig(): HYIPLabGatewayConfig {
    return this.config;
  }

  /**
   * Calculate fees according to HYIPLab logic
   */
  calculateFees(amount: number): {
    fixed_charge: number;
    percent_charge: number;
    total_charge: number;
    final_amount: number;
  } {
    const fixed_charge = this.config.gateway_fixed_charge;
    const percent_charge = (amount * this.config.gateway_percent_charge) / 100;
    const total_charge = fixed_charge + percent_charge;
    const final_amount = amount + total_charge;

    return {
      fixed_charge,
      percent_charge,
      total_charge,
      final_amount
    };
  }

  /**
   * Generate transaction reference ID (HYIPLab format)
   */
  generateTransactionId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${this.config.gateway_slug.toUpperCase()}${timestamp}${random}`;
  }

  /**
   * Validate deposit data according to HYIPLab rules
   */
  validateDepositData(data: HYIPLabDepositData): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.amount || data.amount < this.config.gateway_min_amount) {
      errors.push(`Minimum amount is ${this.config.gateway_min_amount}`);
    }

    if (data.amount > this.config.gateway_max_amount) {
      errors.push(`Maximum amount is ${this.config.gateway_max_amount}`);
    }

    if (!this.config.gateway_currency.includes(data.final_amo ? 'USD' : 'USD')) {
      errors.push('Currency not supported');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}