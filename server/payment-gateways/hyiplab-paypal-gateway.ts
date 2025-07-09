import { HYIPLabPaymentGateway, HYIPLabGatewayConfig, HYIPLabDepositData, HYIPLabWithdrawData, HYIPLabPaymentResponse } from './hyiplab-gateway-interface';
import crypto from 'crypto';

/**
 * HYIPLab-compatible PayPal Payment Gateway
 * 
 * Implements HYIPLab payment processing standards using PayPal APIs
 */
export class HYIPLabPayPalGateway extends HYIPLabPaymentGateway {
  private baseUrl: string;
  private clientId: string | null;
  private clientSecret: string | null;

  constructor(config: HYIPLabGatewayConfig) {
    super(config);
    
    this.baseUrl = process.env.PAYPAL_ENVIRONMENT === 'production' 
      ? 'https://api.paypal.com' 
      : 'https://api.sandbox.paypal.com';
    
    this.clientId = process.env.PAYPAL_CLIENT_ID || null;
    this.clientSecret = process.env.PAYPAL_CLIENT_SECRET || null;
  }

  async processDeposit(depositData: HYIPLabDepositData): Promise<HYIPLabPaymentResponse> {
    try {
      if (!this.clientId || !this.clientSecret) {
        return {
          success: false,
          message: 'PayPal configuration not available. Please configure PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET.'
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

      // Get PayPal access token
      const accessToken = await this.getAccessToken();
      if (!accessToken) {
        return {
          success: false,
          message: 'Failed to get PayPal access token'
        };
      }

      // Create PayPal order
      const order = await this.createPayPalOrder(depositData, accessToken);
      
      if (!order) {
        return {
          success: false,
          message: 'Failed to create PayPal order'
        };
      }

      // Find approval URL
      const approvalUrl = order.links?.find((link: any) => link.rel === 'approve')?.href;
      
      return {
        success: true,
        message: 'PayPal order created successfully',
        redirect_url: approvalUrl,
        payment_data: {
          order_id: order.id,
          approval_url: approvalUrl
        },
        transaction_id: order.id,
        reference_id: depositData.trx
      };

    } catch (error: any) {
      console.error('HYIPLab PayPal deposit error:', error);
      return {
        success: false,
        message: error.message || 'Payment processing failed'
      };
    }
  }

  async processWithdraw(withdrawData: HYIPLabWithdrawData): Promise<HYIPLabPaymentResponse> {
    try {
      if (!this.clientId || !this.clientSecret) {
        return {
          success: false,
          message: 'PayPal configuration not available'
        };
      }

      const accessToken = await this.getAccessToken();
      if (!accessToken) {
        return {
          success: false,
          message: 'Failed to get PayPal access token'
        };
      }

      // Create PayPal payout
      const payout = await this.createPayPalPayout(withdrawData, accessToken);
      
      if (!payout) {
        return {
          success: false,
          message: 'Failed to create PayPal payout'
        };
      }

      return {
        success: true,
        message: 'Withdrawal processed successfully',
        transaction_id: payout.batch_header.payout_batch_id,
        reference_id: withdrawData.withdraw_id.toString()
      };

    } catch (error: any) {
      console.error('HYIPLab PayPal withdrawal error:', error);
      return {
        success: false,
        message: error.message || 'Withdrawal processing failed'
      };
    }
  }

  async handleCallback(callbackData: Record<string, any>): Promise<HYIPLabPaymentResponse> {
    try {
      // Handle PayPal webhook
      const eventType = callbackData.event_type;
      const resource = callbackData.resource;

      switch (eventType) {
        case 'PAYMENT.CAPTURE.COMPLETED':
          return {
            success: true,
            message: 'Payment completed',
            transaction_id: resource.id,
            reference_id: resource.custom_id
          };

        case 'PAYMENT.CAPTURE.DENIED':
        case 'PAYMENT.CAPTURE.FAILED':
          return {
            success: false,
            message: 'Payment failed',
            transaction_id: resource.id
          };

        default:
          return {
            success: true,
            message: 'Event received'
          };
      }

    } catch (error: any) {
      console.error('HYIPLab PayPal callback error:', error);
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
      if (!this.clientId || !this.clientSecret) {
        return { status: 'failed' };
      }

      const accessToken = await this.getAccessToken();
      if (!accessToken) {
        return { status: 'failed' };
      }

      const response = await fetch(`${this.baseUrl}/v2/checkout/orders/${transactionId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        return { status: 'failed' };
      }

      const order = await response.json();
      
      let status: 'pending' | 'complete' | 'failed' | 'cancelled';
      switch (order.status) {
        case 'COMPLETED':
          status = 'complete';
          break;
        case 'APPROVED':
        case 'CREATED':
          status = 'pending';
          break;
        case 'CANCELLED':
          status = 'cancelled';
          break;
        default:
          status = 'failed';
      }

      const purchaseUnit = order.purchase_units?.[0];
      
      return {
        status,
        amount: purchaseUnit?.amount?.value ? parseFloat(purchaseUnit.amount.value) : undefined,
        currency: purchaseUnit?.amount?.currency_code,
        reference_id: purchaseUnit?.custom_id
      };

    } catch (error: any) {
      console.error('HYIPLab PayPal verification error:', error);
      return { status: 'failed' };
    }
  }

  private async getAccessToken(): Promise<string | null> {
    try {
      const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
      
      const response = await fetch(`${this.baseUrl}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
      });

      if (!response.ok) {
        throw new Error('Failed to get PayPal access token');
      }

      const data = await response.json();
      return data.access_token;
      
    } catch (error) {
      console.error('PayPal access token error:', error);
      return null;
    }
  }

  private async createPayPalOrder(depositData: HYIPLabDepositData, accessToken: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              currency_code: 'USD',
              value: depositData.final_amo.toFixed(2)
            },
            custom_id: depositData.trx,
            description: `Deposit via ${depositData.gateway}`
          }],
          application_context: {
            return_url: depositData.success_url,
            cancel_url: depositData.cancel_url,
            brand_name: 'BlackCnote Investment Platform'
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create PayPal order');
      }

      return await response.json();
      
    } catch (error) {
      console.error('PayPal order creation error:', error);
      return null;
    }
  }

  private async createPayPalPayout(withdrawData: HYIPLabWithdrawData, accessToken: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/payments/payouts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender_batch_header: {
            sender_batch_id: this.generateTransactionId(),
            email_subject: 'You have a payout!'
          },
          items: [{
            recipient_type: 'EMAIL',
            amount: {
              value: withdrawData.final_amount.toFixed(2),
              currency: withdrawData.currency
            },
            receiver: withdrawData.user_data.paypal_email,
            note: `Withdrawal from BlackCnote - ID: ${withdrawData.withdraw_id}`
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create PayPal payout');
      }

      return await response.json();
      
    } catch (error) {
      console.error('PayPal payout creation error:', error);
      return null;
    }
  }

  /**
   * Create HYIPLab-compatible configuration for PayPal
   */
  static createConfig(): HYIPLabGatewayConfig {
    return {
      gateway_name: 'PayPal',
      gateway_slug: 'paypal',
      gateway_type: 'automatic',
      gateway_currency: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
      gateway_symbol: '$',
      gateway_min_amount: 1,
      gateway_max_amount: 50000,
      gateway_fixed_charge: 0.30,
      gateway_percent_charge: 3.49,
      gateway_rate: 1,
      gateway_method: 'post',
      gateway_url: 'https://api.paypal.com',
      gateway_val: {
        client_id: process.env.PAYPAL_CLIENT_ID || '',
        client_secret: process.env.PAYPAL_CLIENT_SECRET || '',
        environment: process.env.PAYPAL_ENVIRONMENT || 'sandbox'
      },
      gateway_description: 'Pay with your PayPal account or credit card through PayPal',
      gateway_instruction: 'Click pay now button and you will be redirected to PayPal',
      gateway_status: (process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET) ? 1 : 0,
      gateway_extra: {
        logo: 'https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png',
        color: '#0070ba',
        supported_cards: ['paypal', 'visa', 'mastercard', 'amex', 'discover']
      }
    };
  }
}