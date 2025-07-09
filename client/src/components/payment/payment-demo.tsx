import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { PaymentService, PaymentGateway, formatCurrency, calculateTotalWithFee } from '@/lib/payment';
import PaymentGatewaySelector from './payment-gateway-selector';
import { CreditCard, Wallet, TrendingUp, AlertCircle } from 'lucide-react';

export default function PaymentDemo() {
  const [amount, setAmount] = useState<number>(100);
  const [currency, setCurrency] = useState<string>('USD');
  const [paymentType, setPaymentType] = useState<'deposit' | 'investment' | 'withdrawal'>('deposit');
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const { data: gateways } = useQuery<PaymentGateway[]>({
    queryKey: ['/api/payment-gateways'],
    queryFn: () => PaymentService.getAvailableGateways(),
  });

  const handlePayment = async () => {
    if (!selectedGateway) {
      toast({
        title: "Select Payment Method",
        description: "Please choose a payment method to continue",
        variant: "destructive",
      });
      return;
    }

    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const paymentData = await PaymentService.createPayment({
        gatewaySlug: selectedGateway.slug,
        amount,
        currency,
        type: paymentType,
        metadata: {
          source: 'payment_demo',
          timestamp: new Date().toISOString(),
        },
      });

      // For Stripe, redirect to checkout
      if (selectedGateway.slug === 'stripe' && paymentData.paymentIntent.clientSecret) {
        const checkoutUrl = `/checkout?amount=${amount}&currency=${currency}&type=${paymentType}&clientSecret=${paymentData.paymentIntent.clientSecret}`;
        window.location.href = checkoutUrl;
        return;
      }

      // For other gateways, show confirmation URL
      if (paymentData.paymentIntent.confirmationUrl) {
        window.open(paymentData.paymentIntent.confirmationUrl, '_blank');
      }

      toast({
        title: "Payment Created",
        description: `Payment intent created with ID: ${paymentData.paymentIntent.id}`,
      });

    } catch (error: any) {
      console.error('Payment creation failed:', error);
      toast({
        title: "Payment Failed",
        description: error.message || "Failed to create payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTotal = () => {
    if (!selectedGateway) return amount;
    return calculateTotalWithFee(amount, selectedGateway.processingFee, selectedGateway.processingFeeType);
  };

  const getPaymentTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <Wallet className="h-4 w-4" />;
      case 'investment':
        return <TrendingUp className="h-4 w-4" />;
      case 'withdrawal':
        return <CreditCard className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Gateway Integration Demo
          </CardTitle>
          <p className="text-sm text-gray-600">
            Test the enhanced payment gateway system with multiple providers
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                min="1"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                placeholder="Enter amount"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="BTC">BTC - Bitcoin</SelectItem>
                  <SelectItem value="ETH">ETH - Ethereum</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Transaction Type</Label>
              <Select value={paymentType} onValueChange={(value: any) => setPaymentType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deposit">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      Deposit
                    </div>
                  </SelectItem>
                  <SelectItem value="investment">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Investment
                    </div>
                  </SelectItem>
                  <SelectItem value="withdrawal">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Withdrawal
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Payment Gateway Selection */}
          <PaymentGatewaySelector
            amount={amount}
            currency={currency}
            onGatewaySelect={setSelectedGateway}
            selectedGateway={selectedGateway}
          />

          {/* Payment Summary */}
          {selectedGateway && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-800 mb-3">Payment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="font-medium">{selectedGateway.displayName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transaction Type:</span>
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getPaymentTypeIcon(paymentType)}
                      {paymentType.charAt(0).toUpperCase() + paymentType.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span>{formatCurrency(amount, currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee:</span>
                    <span>
                      {selectedGateway.processingFeeType === 'fixed' 
                        ? formatCurrency(parseFloat(selectedGateway.processingFee), currency)
                        : `${selectedGateway.processingFee}%`}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-semibold text-blue-800">
                    <span>Total:</span>
                    <span>{formatCurrency(calculateTotal(), currency)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Button */}
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handlePayment}
            disabled={!selectedGateway || amount <= 0 || isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                {paymentType === 'deposit' && 'Make Deposit'}
                {paymentType === 'investment' && 'Invest Now'}
                {paymentType === 'withdrawal' && 'Withdraw Funds'}
              </div>
            )}
          </Button>

          {/* API Keys Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">API Keys Required</p>
                <p>
                  To test payments with Stripe and PayPal, you'll need to provide your API keys.
                  Cryptocurrency payments work in demo mode without additional configuration.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}