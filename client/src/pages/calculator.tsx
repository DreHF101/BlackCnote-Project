import Header from "@/components/layout/header";
import { Calculator, DollarSign, TrendingUp, Calendar, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export default function InvestmentCalculator() {
  const [calculation, setCalculation] = useState({
    planId: "",
    investmentAmount: "",
    duration: "",
    customDuration: ""
  });

  const [results, setResults] = useState({
    dailyProfit: 0,
    totalProfit: 0,
    totalReturn: 0,
    roi: 0
  });

  const { data: investmentPlans } = useQuery({
    queryKey: ["/api/investment-plans"],
  });

  const predefinedDurations = [
    { value: "30", label: "30 Days", multiplier: 1 },
    { value: "60", label: "60 Days", multiplier: 1.1 },
    { value: "90", label: "90 Days", multiplier: 1.2 },
    { value: "180", label: "180 Days", multiplier: 1.3 },
    { value: "365", label: "1 Year", multiplier: 1.5 },
    { value: "custom", label: "Custom Duration", multiplier: 1 }
  ];

  useEffect(() => {
    calculateReturns();
  }, [calculation, investmentPlans]);

  const calculateReturns = () => {
    if (!calculation.planId || !calculation.investmentAmount || !investmentPlans) {
      setResults({ dailyProfit: 0, totalProfit: 0, totalReturn: 0, roi: 0 });
      return;
    }

    const selectedPlan = investmentPlans.find((plan: any) => plan.id === parseInt(calculation.planId));
    if (!selectedPlan) return;

    const amount = parseFloat(calculation.investmentAmount);
    const apyRate = parseFloat(selectedPlan.apyRate) / 100;
    
    let days = calculation.duration === "custom" 
      ? parseInt(calculation.customDuration) || 0
      : parseInt(calculation.duration) || 0;

    if (amount <= 0 || days <= 0) {
      setResults({ dailyProfit: 0, totalProfit: 0, totalReturn: 0, roi: 0 });
      return;
    }

    // Get duration multiplier
    const durationData = predefinedDurations.find(d => d.value === calculation.duration);
    const multiplier = durationData?.multiplier || 1;

    // Calculate daily rate
    const dailyRate = (apyRate * multiplier) / 365;
    const dailyProfit = amount * dailyRate;
    const totalProfit = dailyProfit * days;
    const totalReturn = amount + totalProfit;
    const roi = (totalProfit / amount) * 100;

    setResults({
      dailyProfit,
      totalProfit,
      totalReturn,
      roi
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setCalculation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const projectionData = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const days = month * 30;
    const profit = results.dailyProfit * days;
    return {
      month,
      profit: profit,
      total: parseFloat(calculation.investmentAmount || "0") + profit
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Investment <span className="text-blue-400">Calculator</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Calculate your potential returns with our advanced investment calculator. 
            Plan your investment strategy and see how your money can grow over time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <Calculator className="h-6 w-6 mr-2 text-blue-400" />
                Investment Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Investment Plan Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Investment Plan
                </label>
                <Select onValueChange={(value) => handleInputChange('planId', value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Choose an investment plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {investmentPlans?.map((plan: any) => (
                      <SelectItem key={plan.id} value={plan.id.toString()}>
                        {plan.name} - {plan.apyRate}% APY
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Investment Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Investment Amount ($)
                </label>
                <Input
                  type="number"
                  min="1"
                  step="0.01"
                  value={calculation.investmentAmount}
                  onChange={(e) => handleInputChange('investmentAmount', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  placeholder="Enter investment amount"
                />
                {calculation.planId && investmentPlans && (
                  <div className="mt-2 text-sm text-gray-400">
                    {(() => {
                      const plan = investmentPlans.find((p: any) => p.id === parseInt(calculation.planId));
                      return plan ? `Min: ${formatCurrency(parseFloat(plan.minimumAmount))} - Max: ${formatCurrency(parseFloat(plan.maximumAmount))}` : '';
                    })()}
                  </div>
                )}
              </div>

              {/* Duration Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Investment Duration
                </label>
                <Select onValueChange={(value) => handleInputChange('duration', value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {predefinedDurations.map((duration) => (
                      <SelectItem key={duration.value} value={duration.value}>
                        {duration.label}
                        {duration.multiplier > 1 && (
                          <span className="text-green-400 ml-2">
                            (+{((duration.multiplier - 1) * 100).toFixed(0)}% bonus)
                          </span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Duration Input */}
              {calculation.duration === "custom" && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Custom Duration (Days)
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={calculation.customDuration}
                    onChange={(e) => handleInputChange('customDuration', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="Enter number of days"
                  />
                </div>
              )}

              <Button 
                onClick={calculateReturns}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Returns
              </Button>
            </CardContent>
          </Card>

          {/* Results Display */}
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-2">
                    {formatCurrency(results.dailyProfit)}
                  </div>
                  <div className="text-sm text-gray-300">Daily Profit</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-2">
                    {results.roi.toFixed(2)}%
                  </div>
                  <div className="text-sm text-gray-300">ROI</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6 text-center">
                  <PieChart className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-2">
                    {formatCurrency(results.totalProfit)}
                  </div>
                  <div className="text-sm text-gray-300">Total Profit</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-2">
                    {formatCurrency(results.totalReturn)}
                  </div>
                  <div className="text-sm text-gray-300">Total Return</div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Breakdown */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">Investment Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Initial Investment:</span>
                    <span className="text-white font-semibold">
                      {formatCurrency(parseFloat(calculation.investmentAmount || "0"))}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Investment Period:</span>
                    <span className="text-white font-semibold">
                      {calculation.duration === "custom" 
                        ? `${calculation.customDuration} days`
                        : predefinedDurations.find(d => d.value === calculation.duration)?.label || "Not selected"
                      }
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Expected APY:</span>
                    <span className="text-white font-semibold">
                      {calculation.planId && investmentPlans 
                        ? `${investmentPlans.find((p: any) => p.id === parseInt(calculation.planId))?.apyRate}%`
                        : "N/A"
                      }
                    </span>
                  </div>
                  <hr className="border-white/20" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-300">Total Return:</span>
                    <span className="text-green-400">{formatCurrency(results.totalReturn)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Projection */}
            {results.dailyProfit > 0 && (
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-xl text-white">12-Month Projection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {projectionData.map((data) => (
                      <div key={data.month} className="flex justify-between text-sm">
                        <span className="text-gray-300">Month {data.month}:</span>
                        <div className="text-right">
                          <div className="text-white font-semibold">
                            {formatCurrency(data.total)}
                          </div>
                          <div className="text-green-400 text-xs">
                            +{formatCurrency(data.profit)} profit
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Investing?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            These calculations are estimates based on our current investment plans. 
            Start your investment journey today and begin earning returns.
          </p>
          <div className="space-x-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Start Investing
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-3">
              View All Plans
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}