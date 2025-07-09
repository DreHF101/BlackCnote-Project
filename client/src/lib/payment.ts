import { apiRequest } from './queryClient';

export interface CreatePaymentRequest {
  gatewaySlug: string;
  amount: number;
  currency?: string;
  type?: 'deposit' | 'investment' | 'withdrawal';
  investmentId?: number;
  metadata?: Record<string, any>;
}

export interface PaymentIntentResponse {
  paymentIntent: {
    id: string;
    amount: number;
    currency: string;
    status: string;
    clientSecret?: string;
    confirmationUrl?: string;
    metadata?: Record<string, any>;
  };
  transaction: {
    id: number;
    status: string;
    amount: string;
    currency: string;
    processingFee: string;
  };
}

export interface PaymentGateway {
  id: number;
  name: string;
  slug: string;
  displayName: string;
  description: string;
  icon: string;
  isActive: boolean;
  supportedCurrencies: string[];
  minAmount: string;
  maxAmount: string;
  processingFee: string;
  processingFeeType: string;
}

export interface PaymentTransaction {
  id: number;
  userId: number;
  gatewayId: number;
  type: string;
  status: string;
  amount: string;
  currency: string;
  processingFee: string;
  netAmount: string;
  externalTransactionId?: string;
  description?: string;
  createdAt: string;
}

export class PaymentService {
  static async getAvailableGateways(): Promise<PaymentGateway[]> {
    const response = await apiRequest('GET', '/api/payment-gateways');
    if (!response.ok) {
      throw new Error('Failed to fetch payment gateways');
    }
    return response.json();
  }

  static async createPayment(data: CreatePaymentRequest): Promise<PaymentIntentResponse> {
    const response = await apiRequest('POST', '/api/create-payment', data);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create payment');
    }
    return response.json();
  }

  static async confirmPayment(transactionId: number): Promise<any> {
    const response = await apiRequest('POST', `/api/confirm-payment/${transactionId}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to confirm payment');
    }
    return response.json();
  }

  static async getPaymentStatus(transactionId: number): Promise<{ status: string }> {
    const response = await apiRequest('GET', `/api/payment-status/${transactionId}`);
    if (!response.ok) {
      throw new Error('Failed to get payment status');
    }
    return response.json();
  }

  static async getUserTransactions(): Promise<PaymentTransaction[]> {
    const response = await apiRequest('GET', '/api/payment-transactions');
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }
    return response.json();
  }

  static async refundPayment(
    transactionId: number, 
    amount?: number, 
    reason?: string
  ): Promise<any> {
    const response = await apiRequest('POST', `/api/refund-payment/${transactionId}`, {
      amount,
      reason,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to process refund');
    }
    return response.json();
  }

  // Legacy Stripe compatibility
  static async createStripePaymentIntent(
    amount: number, 
    currency: string = 'USD',
    metadata: Record<string, any> = {}
  ): Promise<{ clientSecret: string; transactionId: number }> {
    const response = await apiRequest('POST', '/api/create-payment-intent', {
      amount,
      currency,
      metadata,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create payment intent');
    }
    return response.json();
  }
}

// Utility functions
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function calculateTotalWithFee(
  amount: number, 
  processingFee: string,
  processingFeeType: string
): number {
  const fee = parseFloat(processingFee);
  if (processingFeeType === 'fixed') {
    return amount + fee;
  } else {
    return amount + (amount * fee / 100);
  }
}

export function getPaymentStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'text-green-600 bg-green-100';
    case 'pending':
      return 'text-yellow-600 bg-yellow-100';
    case 'processing':
      return 'text-blue-600 bg-blue-100';
    case 'failed':
    case 'cancelled':
      return 'text-red-600 bg-red-100';
    case 'refunded':
      return 'text-gray-600 bg-gray-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function getPaymentTypeIcon(type: string): string {
  switch (type.toLowerCase()) {
    case 'deposit':
      return '↓';
    case 'withdrawal':
      return '↑';
    case 'investment':
      return '📈';
    case 'refund':
      return '↩';
    default:
      return '💰';
  }
}