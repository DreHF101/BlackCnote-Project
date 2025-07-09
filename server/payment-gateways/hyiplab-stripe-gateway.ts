import { HYIPLabPaymentGateway, HYIPLabGatewayConfig, HYIPLabDepositData, HYIPLabWithdrawData, HYIPLabPaymentResponse } from './hyiplab-gateway-interface';
import Stripe from 'stripe';

/**
 * HYIPLab-compatible Stripe Payment Gateway
 * 
 * Implements HYIPLab payment processing standards while using Stripe's API
 */
export class HYIPLabStripeGateway extends HYIPLabPaymentGateway {
  private stripe: Stripe | null = null;

  constructor(config: HYIPLabGatewayConfig) {
    super(config);
    
    if (process.env.STRIPE_SECRET_KEY) {
      this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2023-10-16',
      });
    }
  }

  async processDeposit(depositData: HYIPLabDepositData): Promise<HYIPLabPaymentResponse> {
    try {
      if (!this.stripe) {
        return {
          success: false,
          message: 'Stripe configuration not available. Please configure STRIPE_SECRET_KEY.'
        };
      }

      // Validate deposit data
      const validation = this.validateDepositData(depositData);
      if (!validation.valid) {
        return {
          success: false,
          message: validation.errors.join(', ')
        };
      }

      // Create Stripe Payment Intent
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(depositData.final_amo * 100), // Convert to cents
        currency: 'usd',
        metadata: {
          hyiplab_trx: depositData.trx,
          gateway: depositData.gateway,
          method_code: depositData.method_code.toString(),
          original_amount: depositData.amount.toString(),
          charge: depositData.charge.toString(),
          type: 'deposit'
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        success: true,
        message: 'Payment intent created successfully',
        redirect_url: `/checkout?client_secret=${paymentIntent.client_secret}&return_url=${encodeURIComponent(depositData.success_url)}`,
        payment_data: {
          client_secret: paymentIntent.client_secret,
          payment_intent_id: paymentIntent.id
        },
        transaction_id: paymentIntent.id,
        reference_id: depositData.trx
      };

    } catch (error: any) {
      console.error('HYIPLab Stripe deposit error:', error);
      return {
        success: false,
        message: error.message || 'Payment processing failed'
      };
    }
  }

  async processWithdraw(withdrawData: HYIPLabWithdrawData): Promise<HYIPLabPaymentResponse> {
    try {
      if (!this.stripe) {
        return {
          success: false,
          message: 'Stripe configuration not available'
        };
      }

      // For withdrawals, we would typically need to use Stripe Connect
      // or manual payouts. This is a simplified implementation.
      
      const transfer = await this.stripe.transfers.create({
        amount: Math.round(withdrawData.final_amount * 100),
        currency: withdrawData.currency.toLowerCase(),
        destination: withdrawData.user_data.stripe_account_id, // User's connected Stripe account
        metadata: {
          withdraw_id: withdrawData.withdraw_id.toString(),
          gateway: withdrawData.gateway,
          type: 'withdrawal'
        }
      });

      return {
        success: true,
        message: 'Withdrawal processed successfully',
        transaction_id: transfer.id,
        reference_id: withdrawData.withdraw_id.toString()
      };

    } catch (error: any) {
      console.error('HYIPLab Stripe withdrawal error:', error);
      return {
        success: false,
        message: error.message || 'Withdrawal processing failed'
      };
    }
  }

  async handleCallback(callbackData: Record<string, any>): Promise<HYIPLabPaymentResponse> {
    try {
      if (!this.stripe) {
        return {
          success: false,
          message: 'Stripe configuration not available'
        };
      }

      // Handle Stripe webhook
      const event = callbackData;
      
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          return {
            success: true,
            message: 'Payment confirmed',
            transaction_id: paymentIntent.id,
            reference_id: paymentIntent.metadata.hyiplab_trx
          };

        case 'payment_intent.payment_failed':
          return {
            success: false,
            message: 'Payment failed',
            transaction_id: event.data.object.id
          };

        default:
          return {
            success: true,
            message: 'Event received'
          };
      }

    } catch (error: any) {
      console.error('HYIPLab Stripe callback error:', error);
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
      if (!this.stripe) {
        return { status: 'failed' };
      }

      const paymentIntent = await this.stripe.paymentIntents.retrieve(transactionId);
      
      let status: 'pending' | 'complete' | 'failed' | 'cancelled';
      switch (paymentIntent.status) {
        case 'succeeded':
          status = 'complete';
          break;
        case 'processing':
        case 'requires_payment_method':
        case 'requires_confirmation':
          status = 'pending';
          break;
        case 'canceled':
          status = 'cancelled';
          break;
        default:
          status = 'failed';
      }

      return {
        status,
        amount: paymentIntent.amount / 100, // Convert from cents
        currency: paymentIntent.currency.toUpperCase(),
        reference_id: paymentIntent.metadata.hyiplab_trx
      };

    } catch (error: any) {
      console.error('HYIPLab Stripe verification error:', error);
      return { status: 'failed' };
    }
  }

  /**
   * Create HYIPLab-compatible configuration for Stripe
   */
  static createConfig(): HYIPLabGatewayConfig {
    return {
      gateway_name: 'Stripe',
      gateway_slug: 'stripe',
      gateway_type: 'automatic',
      gateway_currency: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
      gateway_symbol: '$',
      gateway_min_amount: 1,
      gateway_max_amount: 100000,
      gateway_fixed_charge: 0.30,
      gateway_percent_charge: 2.9,
      gateway_rate: 1,
      gateway_method: 'post',
      gateway_url: 'https://api.stripe.com',
      gateway_val: {
        secret_key: process.env.STRIPE_SECRET_KEY || '',
        public_key: process.env.VITE_STRIPE_PUBLIC_KEY || '',
        webhook_secret: process.env.STRIPE_WEBHOOK_SECRET || ''
      },
      gateway_description: 'Pay securely with your credit or debit card via Stripe',
      gateway_instruction: 'Click pay now button and you will be redirected to secure payment page',
      gateway_status: process.env.STRIPE_SECRET_KEY ? 1 : 0,
      gateway_extra: {
        logo: 'https://js.stripe.com/v3/fingerprinted/img/stripe_logo.png',
        color: '#635bff',
        supported_cards: ['visa', 'mastercard', 'amex', 'discover']
      }
    };
  }
}