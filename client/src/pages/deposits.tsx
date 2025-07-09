import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, CreditCard, Wallet, Shield, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function Deposits() {
  const [depositData, setDepositData] = useState({
    amount: "",
    gateway: "stripe",
    currency: "USD"
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user data
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["/api/users/1"],
  });

  // Fetch deposit history
  const { data: depositHistory, isLoading: historyLoading } = useQuery({
    queryKey: ["/api/users/1/deposits"],
  });

  // Deposit mutation
  const depositMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/deposits", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.paymentUrl) {
        // Redirect to payment gateway
        window.location.href = data.paymentUrl;
      } else {
        toast({
          title: "Deposit Initiated",
          description: "Your deposit has been initiated successfully.",
        });
        queryClient.invalidateQueries({ queryKey: ["/api/users/1"] });
        queryClient.invalidateQueries({ queryKey: ["/api/users/1/deposits"] });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Deposit Failed",
        description: error.message || "Failed to process deposit",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!depositData.amount || !depositData.gateway) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(depositData.amount);

    if (amount < 10) {
      toast({
        title: "Minimum Amount",
        description: "Minimum deposit amount is $10",
        variant: "destructive",
      });
      return;
    }

    depositMutation.mutate({
      userId: 1,
      amount: amount.toString(),
      gateway: depositData.gateway,
      currency: depositData.currency,
      type: "deposit"
    });
  };

  const paymentMethods = [
    {
      id: "stripe",
      name: "Credit/Debit Card",
      icon: CreditCard,
      fee: "2.9% + $0.30",
      processingTime: "Instant",
      minAmount: 10,
      maxAmount: 50000,
      supported: ["Visa", "Mastercard", "American Express"]
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      icon: Wallet,
      fee: "1%",
      processingTime: "5-30 minutes",
      minAmount: 10,
      maxAmount: 100000,
      supported: ["Bitcoin", "Ethereum", "USDT", "USDC"]
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: DollarSign,
      fee: "Free",
      processingTime: "1-3 business days",
      minAmount: 100,
      maxAmount: 500000,
      supported: ["Wire Transfer", "ACH"]
    }
  ];

  const depositTiers = [
    { min: 100, max: 999, bonus: "0%", tier: "Starter" },
    { min: 1000, max: 4999, bonus: "2%", tier: "Bronze" },
    { min: 5000, max: 24999, bonus: "5%", tier: "Silver" },
    { min: 25000, max: 99999, bonus: "10%", tier: "Gold" },
    { min: 100000, max: Infinity, bonus: "15%", tier: "Diamond" }
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

  const getDepositBonus = (amount: number) => {
    const tier = depositTiers.find(t => amount >= t.min && amount <= t.max);
    return tier ? { bonus: tier.bonus, tier: tier.tier } : { bonus: "0%", tier: "None" };
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const selectedMethod = paymentMethods.find(m => m.id === depositData.gateway);
  const depositAmount = parseFloat(depositData.amount) || 0;
  const bonusInfo = getDepositBonus(depositAmount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Deposit Funds</h1>
          <p className="text-xl text-gray-300">Add funds to your account and start investing</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Deposit Form */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="deposit" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-white/10 border-white/20">
                <TabsTrigger value="deposit" className="text-white">Make Deposit</TabsTrigger>
                <TabsTrigger value="methods" className="text-white">Payment Methods</TabsTrigger>
              </TabsList>

              <TabsContent value="deposit">
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center">
                      <DollarSign className="h-6 w-6 mr-2 text-green-400" />
                      Deposit Request
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Current Balance */}
                      <div className="p-4 bg-blue-600/20 border border-blue-600/30 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-400 font-medium">Current Balance</span>
                          <span className="text-2xl font-bold text-white">
                            ${parseFloat(user?.balance || "0").toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Amount */}
                      <div>
                        <Label htmlFor="amount" className="text-gray-300">Deposit Amount</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount (min $10)"
                          value={depositData.amount}
                          onChange={(e) => setDepositData({ ...depositData, amount: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          min="10"
                          step="0.01"
                        />
                        {depositAmount >= 100 && (
                          <div className="mt-2 p-2 bg-green-600/20 border border-green-600/30 rounded text-green-300 text-sm">
                            🎉 {bonusInfo.tier} Tier: +{bonusInfo.bonus} bonus on this deposit!
                          </div>
                        )}
                      </div>

                      {/* Payment Method */}
                      <div>
                        <Label htmlFor="gateway" className="text-gray-300">Payment Method</Label>
                        <Select value={depositData.gateway} onValueChange={(value) => setDepositData({ ...depositData, gateway: value })}>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            {paymentMethods.map((method) => (
                              <SelectItem key={method.id} value={method.id} className="text-white hover:bg-slate-700">
                                <div className="flex items-center gap-2">
                                  <method.icon className="h-4 w-4" />
                                  <span>{method.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Currency */}
                      <div>
                        <Label htmlFor="currency" className="text-gray-300">Currency</Label>
                        <Select value={depositData.currency} onValueChange={(value) => setDepositData({ ...depositData, currency: value })}>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="USD" className="text-white hover:bg-slate-700">USD - US Dollar</SelectItem>
                            <SelectItem value="EUR" className="text-white hover:bg-slate-700">EUR - Euro</SelectItem>
                            <SelectItem value="GBP" className="text-white hover:bg-slate-700">GBP - British Pound</SelectItem>
                            <SelectItem value="BTC" className="text-white hover:bg-slate-700">BTC - Bitcoin</SelectItem>
                            <SelectItem value="ETH" className="text-white hover:bg-slate-700">ETH - Ethereum</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Payment Method Info */}
                      {selectedMethod && (
                        <Alert className="bg-blue-600/20 border-blue-600/30">
                          <Shield className="h-4 w-4" />
                          <AlertDescription className="text-blue-300">
                            <div className="space-y-1">
                              <div><strong>{selectedMethod.name}</strong></div>
                              <div>Fee: {selectedMethod.fee}</div>
                              <div>Processing Time: {selectedMethod.processingTime}</div>
                              <div>Limit: ${selectedMethod.minAmount.toLocaleString()} - ${selectedMethod.maxAmount.toLocaleString()}</div>
                            </div>
                          </AlertDescription>
                        </Alert>
                      )}

                      {/* Total Calculation */}
                      {depositAmount > 0 && selectedMethod && (
                        <div className="p-4 bg-gray-800/50 rounded-lg space-y-2 text-white">
                          <div className="flex justify-between">
                            <span>Deposit Amount:</span>
                            <span>${depositAmount.toFixed(2)}</span>
                          </div>
                          {bonusInfo.bonus !== "0%" && (
                            <div className="flex justify-between text-green-400">
                              <span>Bonus ({bonusInfo.bonus}):</span>
                              <span>+${(depositAmount * (parseFloat(bonusInfo.bonus) / 100)).toFixed(2)}</span>
                            </div>
                          )}
                          <div className="border-t border-gray-600 pt-2 flex justify-between font-bold">
                            <span>Total Credit:</span>
                            <span>${(depositAmount + (depositAmount * (parseFloat(bonusInfo.bonus) / 100))).toFixed(2)}</span>
                          </div>
                        </div>
                      )}

                      <Button 
                        type="submit" 
                        className="w-full bg-green-600 hover:bg-green-700"
                        disabled={depositMutation.isPending}
                      >
                        {depositMutation.isPending ? "Processing..." : "Proceed to Payment"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="methods">
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <Card key={method.id} className="bg-white/10 backdrop-blur-md border-white/20">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <method.icon className="h-8 w-8 text-blue-400" />
                            <div>
                              <h3 className="text-lg font-semibold text-white">{method.name}</h3>
                              <p className="text-gray-400 text-sm">Fee: {method.fee} | {method.processingTime}</p>
                              <p className="text-gray-400 text-sm">
                                Limit: ${method.minAmount.toLocaleString()} - ${method.maxAmount.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-400 mb-1">Supported:</div>
                            <div className="flex flex-wrap gap-1">
                              {method.supported.map((support) => (
                                <Badge key={support} variant="outline" className="text-xs border-white/20 text-gray-300">
                                  {support}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Deposit History */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <Wallet className="h-5 w-5 mr-2 text-blue-400" />
                  Recent Deposits
                </CardTitle>
              </CardHeader>
              <CardContent>
                {historyLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {depositHistory && depositHistory.length > 0 ? (
                      depositHistory.slice(0, 5).map((deposit: any) => (
                        <div key={deposit.id} className="p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium">${deposit.amount}</span>
                            <Badge className={`${getStatusColor(deposit.status)} flex items-center gap-1`}>
                              {getStatusIcon(deposit.status)}
                              {deposit.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-400">
                            {deposit.gateway} • {new Date(deposit.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No deposits yet</p>
                        <p className="text-sm">Make your first deposit to start investing</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Deposit Bonuses */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-lg text-white">Deposit Bonuses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {depositTiers.map((tier, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded">
                    <div className="text-sm">
                      <div className="text-white font-medium">{tier.tier}</div>
                      <div className="text-gray-400">
                        ${tier.min.toLocaleString()} - {tier.max === Infinity ? '∞' : `$${tier.max.toLocaleString()}`}
                      </div>
                    </div>
                    <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                      +{tier.bonus}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/investments">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    View Investment Plans
                  </Button>
                </Link>
                <Link href="/transactions">
                  <Button variant="outline" className="w-full border-white/20 text-gray-300 hover:bg-white/10">
                    Transaction History
                  </Button>
                </Link>
                <Link href="/withdraw">
                  <Button variant="outline" className="w-full border-white/20 text-gray-300 hover:bg-white/10">
                    Withdraw Funds
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}