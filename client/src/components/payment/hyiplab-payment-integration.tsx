import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { 
  CreditCard, 
  Wallet, 
  Bitcoin, 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Clock,
  Shield,
  Zap
} from 'lucide-react';

interface HYIPLabGateway {
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
  gateway_description: string;
  gateway_instruction: string;
  gateway_status: number;
  gateway_extra: {
    logo: string;
    color: string;
    supported_cards?: string[];
    demo_mode?: boolean;
  };
}

interface HYIPLabTransaction {
  id: number;
  trx: string;
  gateway: string;
  amount: number;
  charge: number;
  final_amount: number;
  status: string;
  type: string;
  created_at: string;
}

export default function HYIPLabPaymentIntegration() {
  const [selectedGateway, setSelectedGateway] = useState<HYIPLabGateway | null>(null);
  const [amount, setAmount] = useState<number>(100);
  const [paymentType, setPaymentType] = useState<'deposit' | 'withdrawal'>('deposit');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch available HYIPLab payment gateways
  const { data: gateways, isLoading: gatewaysLoading } = useQuery<{ success: boolean; data: HYIPLabGateway[] }>({
    queryKey: ['/api/hyiplab/payment-gateways'],
    queryFn: () => apiRequest('GET', '/api/hyiplab/payment-gateways'),
  });

  // Fetch HYIPLab transaction history
  const { data: transactionsData } = useQuery<{ success: boolean; data: HYIPLabTransaction[] }>({
    queryKey: ['/api/hyiplab/transactions'],
    queryFn: () => apiRequest('GET', '/api/hyiplab/transactions?limit=10'),
  });

  // Process payment mutation
  const processPaymentMutation = useMutation({
    mutationFn: async (paymentData: { gateway: string; amount: number; currency: string }) => {
      const endpoint = paymentType === 'deposit' ? '/api/hyiplab/deposit' : '/api/hyiplab/withdraw';
      return apiRequest('POST', endpoint, paymentData);
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Payment Initiated",
          description: data.message,
        });
        
        // Redirect to payment URL if available
        if (data.data?.redirect_url) {
          window.location.href = data.data.redirect_url;
        }
        
        // Refresh transactions
        queryClient.invalidateQueries({ queryKey: ['/api/hyiplab/transactions'] });
      } else {
        toast({
          title: "Payment Failed",
          description: data.message,
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Payment Error",
        description: error.message || "Failed to process payment",
        variant: "destructive",
      });
    },
  });

  const handlePayment = () => {
    if (!selectedGateway) {
      toast({
        title: "Select Gateway",
        description: "Please select a payment gateway",
        variant: "destructive",
      });
      return;
    }

    if (amount < selectedGateway.gateway_min_amount || amount > selectedGateway.gateway_max_amount) {
      toast({
        title: "Invalid Amount",
        description: `Amount must be between ${selectedGateway.gateway_symbol}${selectedGateway.gateway_min_amount} and ${selectedGateway.gateway_symbol}${selectedGateway.gateway_max_amount}`,
        variant: "destructive",
      });
      return;
    }

    processPaymentMutation.mutate({
      gateway: selectedGateway.gateway_slug,
      amount,
      currency: 'USD'
    });
  };

  const calculateFees = (gateway: HYIPLabGateway, amount: number) => {
    const fixedCharge = gateway.gateway_fixed_charge;
    const percentCharge = (amount * gateway.gateway_percent_charge) / 100;
    const totalCharge = fixedCharge + percentCharge;
    const finalAmount = amount + totalCharge;

    return {
      fixedCharge,
      percentCharge,
      totalCharge,
      finalAmount
    };
  };

  const getGatewayIcon = (gateway: HYIPLabGateway) => {
    switch (gateway.gateway_slug) {
      case 'stripe':
        return <CreditCard className="h-6 w-6" />;
      case 'paypal':
        return <Wallet className="h-6 w-6" />;
      case 'crypto':
        return <Bitcoin className="h-6 w-6" />;
      default:
        return <DollarSign className="h-6 w-6" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  if (gatewaysLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            HYIPLab Payment Gateway Integration
          </CardTitle>
          <p className="text-sm text-gray-600">
            Complete WordPress HYIPLab plugin compatibility with enhanced BlackCnote UI
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={paymentType} onValueChange={(value: any) => setPaymentType(value)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="deposit" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Deposit
              </TabsTrigger>
              <TabsTrigger value="withdrawal" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Withdrawal
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deposit" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                
                {selectedGateway && (
                  <div className="space-y-2">
                    <Label>Fee Calculation</Label>
                    <div className="p-3 bg-blue-50 rounded-lg text-sm">
                      {(() => {
                        const fees = calculateFees(selectedGateway, amount);
                        return (
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>Amount:</span>
                              <span>{selectedGateway.gateway_symbol}{amount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Fees:</span>
                              <span>{selectedGateway.gateway_symbol}{fees.totalCharge.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-semibold border-t pt-1">
                              <span>Total:</span>
                              <span>{selectedGateway.gateway_symbol}{fees.finalAmount.toFixed(2)}</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>

              {/* Gateway Selection */}
              <div className="space-y-4">
                <Label>Select Payment Gateway</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {gateways?.data?.map((gateway) => (
                    <Card
                      key={gateway.gateway_slug}
                      className={`cursor-pointer transition-all ${
                        selectedGateway?.gateway_slug === gateway.gateway_slug
                          ? 'ring-2 ring-blue-500 bg-blue-50'
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedGateway(gateway)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: gateway.gateway_extra.color + '20' }}
                          >
                            {getGatewayIcon(gateway)}
                          </div>
                          <div>
                            <h4 className="font-semibold">{gateway.gateway_name}</h4>
                            <Badge variant={gateway.gateway_type === 'automatic' ? 'default' : 'secondary'}>
                              <Zap className="h-3 w-3 mr-1" />
                              {gateway.gateway_type}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {gateway.gateway_description}
                        </p>
                        <div className="text-xs text-gray-500">
                          Fee: {gateway.gateway_fixed_charge > 0 && `${gateway.gateway_symbol}${gateway.gateway_fixed_charge} + `}
                          {gateway.gateway_percent_charge}%
                        </div>
                        {gateway.gateway_extra.demo_mode && (
                          <Badge variant="outline" className="mt-2">
                            Demo Mode
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={!selectedGateway || amount <= 0 || processPaymentMutation.isPending}
                className="w-full"
              >
                {processPaymentMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  `Process ${paymentType} - ${selectedGateway?.gateway_symbol}${amount.toFixed(2)}`
                )}
              </Button>
            </TabsContent>

            <TabsContent value="withdrawal" className="space-y-6">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Withdrawal processing requires additional user verification 
                  and may take 1-3 business days depending on the selected gateway.
                </p>
              </div>
              
              {/* Similar structure for withdrawal with additional fields */}
              <div className="space-y-4">
                <Label htmlFor="withdraw-amount">Withdrawal Amount</Label>
                <Input
                  id="withdraw-amount"
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  placeholder="Enter withdrawal amount"
                />
              </div>
              
              <Button
                onClick={handlePayment}
                disabled={!selectedGateway || amount <= 0 || processPaymentMutation.isPending}
                className="w-full"
                variant="outline"
              >
                Request Withdrawal
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Transaction History */}
      {transactionsData?.data && transactionsData.data.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent HYIPLab Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactionsData.data.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(transaction.status)}
                    <div>
                      <div className="font-medium">
                        {transaction.type.toUpperCase()} via {transaction.gateway}
                      </div>
                      <div className="text-sm text-gray-600">
                        TRX: {transaction.trx}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      ${transaction.final_amount.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}