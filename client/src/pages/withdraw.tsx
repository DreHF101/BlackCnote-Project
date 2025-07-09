import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CreditCard, Wallet, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Withdraw() {
  const [withdrawalData, setWithdrawalData] = useState({
    amount: "",
    gateway: "",
    walletAddress: "",
    bankAccount: "",
    description: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user data and available balance
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["/api/users/1"],
  });

  // Fetch available withdrawal methods
  const { data: gateways, isLoading: gatewaysLoading } = useQuery({
    queryKey: ["/api/payment-gateways"],
  });

  // Fetch withdrawal history
  const { data: withdrawalHistory, isLoading: historyLoading } = useQuery({
    queryKey: ["/api/users/1/withdrawals"],
  });

  // Withdrawal mutation
  const withdrawalMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/withdrawals", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Withdrawal Submitted",
        description: "Your withdrawal request has been submitted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/users/1"] });
      queryClient.invalidateQueries({ queryKey: ["/api/users/1/withdrawals"] });
      setWithdrawalData({
        amount: "",
        gateway: "",
        walletAddress: "",
        bankAccount: "",
        description: ""
      });
    },
    onError: (error: any) => {
      toast({
        title: "Withdrawal Failed",
        description: error.message || "Failed to process withdrawal",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!withdrawalData.amount || !withdrawalData.gateway) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(withdrawalData.amount);
    const availableBalance = parseFloat(user?.balance || "0");

    if (amount > availableBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this withdrawal",
        variant: "destructive",
      });
      return;
    }

    if (amount < 10) {
      toast({
        title: "Minimum Amount",
        description: "Minimum withdrawal amount is $10",
        variant: "destructive",
      });
      return;
    }

    withdrawalMutation.mutate({
      userId: 1,
      amount: amount.toString(),
      gateway: withdrawalData.gateway,
      walletAddress: withdrawalData.walletAddress,
      bankAccount: withdrawalData.bankAccount,
      description: withdrawalData.description,
      type: "withdrawal"
    });
  };

  const withdrawalGateways = [
    { id: "crypto", name: "Cryptocurrency", fee: "2%", processingTime: "2-6 hours" },
    { id: "bank", name: "Bank Transfer", fee: "3%", processingTime: "3-5 business days" },
    { id: "paypal", name: "PayPal", fee: "3.5%", processingTime: "1-2 business days" },
    { id: "stripe", name: "Credit/Debit Card", fee: "4%", processingTime: "3-7 business days" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'failed': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Withdraw Funds</h1>
          <p className="text-xl text-gray-300">Easily withdraw your earnings and available balance</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Withdrawal Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <DollarSign className="h-6 w-6 mr-2 text-green-400" />
                  Withdrawal Request
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Available Balance */}
                  <div className="p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-medium">Available Balance</span>
                      <span className="text-2xl font-bold text-white">
                        ${parseFloat(user?.balance || "0").toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Amount */}
                  <div>
                    <Label htmlFor="amount" className="text-gray-300">Withdrawal Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount (min $10)"
                      value={withdrawalData.amount}
                      onChange={(e) => setWithdrawalData({ ...withdrawalData, amount: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      min="10"
                      step="0.01"
                    />
                  </div>

                  {/* Gateway Selection */}
                  <div>
                    <Label htmlFor="gateway" className="text-gray-300">Withdrawal Method</Label>
                    <Select value={withdrawalData.gateway} onValueChange={(value) => setWithdrawalData({ ...withdrawalData, gateway: value })}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select withdrawal method" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {withdrawalGateways.map((gateway) => (
                          <SelectItem key={gateway.id} value={gateway.id} className="text-white hover:bg-slate-700">
                            <div className="flex items-center justify-between w-full">
                              <span>{gateway.name}</span>
                              <div className="text-xs text-gray-400 ml-4">
                                Fee: {gateway.fee} | {gateway.processingTime}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Gateway-specific fields */}
                  {withdrawalData.gateway === 'crypto' && (
                    <div>
                      <Label htmlFor="walletAddress" className="text-gray-300">Wallet Address</Label>
                      <Input
                        id="walletAddress"
                        placeholder="Enter your crypto wallet address"
                        value={withdrawalData.walletAddress}
                        onChange={(e) => setWithdrawalData({ ...withdrawalData, walletAddress: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                  )}

                  {withdrawalData.gateway === 'bank' && (
                    <div>
                      <Label htmlFor="bankAccount" className="text-gray-300">Bank Account Details</Label>
                      <Input
                        id="bankAccount"
                        placeholder="Account number or IBAN"
                        value={withdrawalData.bankAccount}
                        onChange={(e) => setWithdrawalData({ ...withdrawalData, bankAccount: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                  )}

                  {/* Description */}
                  <div>
                    <Label htmlFor="description" className="text-gray-300">Description (Optional)</Label>
                    <Input
                      id="description"
                      placeholder="Add a note for this withdrawal"
                      value={withdrawalData.description}
                      onChange={(e) => setWithdrawalData({ ...withdrawalData, description: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>

                  {/* Fees Info */}
                  {withdrawalData.gateway && (
                    <Alert className="bg-blue-600/20 border-blue-600/30">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-blue-300">
                        {withdrawalData.amount && parseFloat(withdrawalData.amount) > 0 && (
                          <>
                            Processing fee: {withdrawalGateways.find(g => g.id === withdrawalData.gateway)?.fee} 
                            {` (${(parseFloat(withdrawalData.amount) * 0.03).toFixed(2)} USD)`}
                            <br />
                            You will receive: ${(parseFloat(withdrawalData.amount) * 0.97).toFixed(2)} USD
                          </>
                        )}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={withdrawalMutation.isPending}
                  >
                    {withdrawalMutation.isPending ? "Processing..." : "Submit Withdrawal"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Withdrawal History */}
          <div>
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <Wallet className="h-5 w-5 mr-2 text-blue-400" />
                  Recent Withdrawals
                </CardTitle>
              </CardHeader>
              <CardContent>
                {historyLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {withdrawalHistory && withdrawalHistory.length > 0 ? (
                      withdrawalHistory.slice(0, 5).map((withdrawal: any) => (
                        <div key={withdrawal.id} className="p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium">${withdrawal.amount}</span>
                            <Badge className={`${getStatusColor(withdrawal.status)} flex items-center gap-1`}>
                              {getStatusIcon(withdrawal.status)}
                              {withdrawal.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-400">
                            {withdrawal.gateway} • {new Date(withdrawal.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No withdrawals yet</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Withdrawal Limits Info */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 mt-6">
              <CardHeader>
                <CardTitle className="text-lg text-white">Withdrawal Limits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Minimum:</span>
                  <span className="text-white">$10</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Daily Limit:</span>
                  <span className="text-white">$10,000</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Monthly Limit:</span>
                  <span className="text-white">$100,000</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Processing Time:</span>
                  <span className="text-white">2-24 hours</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}