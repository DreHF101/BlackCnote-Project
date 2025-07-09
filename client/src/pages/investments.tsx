import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  TrendingUp, 
  Shield, 
  Clock, 
  DollarSign, 
  Star, 
  CheckCircle, 
  AlertTriangle,
  Target,
  Zap,
  Award,
  Users,
  BarChart
} from "lucide-react";

interface InvestmentPlan {
  id: number;
  name: string;
  description: string;
  apyRate: string;
  minimumAmount: string;
  maximumAmount: string;
  durationDays: number;
  isActive: boolean;
}

export default function Investments() {
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: userInvestments, isLoading } = useQuery({
    queryKey: ["/api/users/1/investments"],
  });

  const { data: investmentPlans } = useQuery({
    queryKey: ["/api/investment-plans"],
  });

  const createInvestmentMutation = useMutation({
    mutationFn: (planData: { planId: number; amount: string }) =>
      apiRequest("POST", "/api/investments", {
        ...planData,
        userId: 1,
        startDate: new Date().toISOString(),
        status: "active",
      }),
    onSuccess: () => {
      toast({
        title: "Investment Created",
        description: "Your investment has been successfully created!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/users/1/investments"] });
      setSelectedPlan(null);
    },
    onError: (error: any) => {
      toast({
        title: "Investment Failed",
        description: error.message || "Failed to create investment",
        variant: "destructive",
      });
    },
  });

  const handleInvest = (plan: InvestmentPlan) => {
    createInvestmentMutation.mutate({
      planId: plan.id,
      amount: plan.minimumAmount,
    });
  };

  const getPlanTier = (plan: InvestmentPlan) => {
    const apy = parseFloat(plan.apyRate);
    if (apy >= 18) return { tier: "Elite", color: "bg-purple-500", icon: Award };
    if (apy >= 15) return { tier: "Premium", color: "bg-yellow-500", icon: Star };
    if (apy >= 12) return { tier: "VIP", color: "bg-blue-500", icon: Zap };
    if (apy >= 8) return { tier: "Pro", color: "bg-green-500", icon: Target };
    return { tier: "Starter", color: "bg-gray-500", icon: Users };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-[var(--dark-card)] rounded w-1/3"></div>
            <div className="grid gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-[var(--dark-card)] rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--dark-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            Investment Plans & Portfolio
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Choose from our premium investment plans designed to maximize your returns 
            while maintaining security and transparency
          </p>
        </div>

        <Tabs defaultValue="my-investments" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="my-investments" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              My Investments
            </TabsTrigger>
            <TabsTrigger value="available-plans" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Available Plans
            </TabsTrigger>
          </TabsList>

          {/* My Investments Tab */}
          <TabsContent value="my-investments" className="space-y-6">
            <div className="space-y-6">
              {userInvestments && userInvestments.length > 0 ? (
                userInvestments.map((investment) => {
                  const plan = investmentPlans?.find(p => p.id === investment.planId);
                  const progressPercent = plan ? 
                    ((Date.now() - new Date(investment.startDate).getTime()) / 
                    (new Date(investment.endDate).getTime() - new Date(investment.startDate).getTime())) * 100 : 0;
                  const tierInfo = plan ? getPlanTier(plan) : { tier: "Unknown", color: "bg-gray-500", icon: Users };
                  const IconComponent = tierInfo.icon;
                  
                  return (
                    <Card key={investment.id} className="bg-[var(--dark-card)] border-[var(--dark-border)] relative overflow-hidden">
                      <div className={`absolute top-0 left-0 w-full h-1 ${tierInfo.color}`}></div>
                      <CardHeader>
                        <CardTitle className="text-[var(--text-primary)] flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${tierInfo.color} text-white`}>
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div>
                              <span className="text-xl">{plan?.name || "Unknown Plan"}</span>
                              <Badge variant="secondary" className="ml-2">
                                {tierInfo.tier}
                              </Badge>
                            </div>
                          </div>
                          <span className="text-[var(--success-green)] text-xl font-bold">
                            {plan?.apyRate}% APY
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div className="space-y-2">
                            <p className="text-[var(--text-secondary)] text-sm font-medium">Investment Amount</p>
                            <p className="text-[var(--text-primary)] font-bold text-lg">
                              ${parseFloat(investment.amount).toLocaleString()}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-[var(--text-secondary)] text-sm font-medium">Current Returns</p>
                            <p className="text-[var(--success-green)] font-bold text-lg">
                              +${parseFloat(investment.currentReturns).toLocaleString()}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-[var(--text-secondary)] text-sm font-medium">Progress</p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[var(--text-primary)] font-semibold">
                                  {Math.round(progressPercent)}%
                                </span>
                                <span className="text-[var(--text-secondary)] text-sm">
                                  {plan?.durationDays} days
                                </span>
                              </div>
                              <div className="w-full bg-[var(--dark-bg)] rounded-full h-3">
                                <div 
                                  className="bg-gradient-to-r from-[var(--success-green)] to-green-400 h-3 rounded-full transition-all duration-300"
                                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-[var(--text-secondary)] text-sm font-medium">Status</p>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[var(--success-green)]" />
                              <span className="text-[var(--success-green)] font-semibold capitalize">
                                {investment.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Card className="bg-[var(--dark-card)] border-[var(--dark-border)]">
                  <CardContent className="text-center py-16">
                    <div className="mb-6">
                      <BarChart className="h-16 w-16 text-[var(--text-secondary)] mx-auto mb-4" />
                    </div>
                    <h3 className="text-[var(--text-primary)] text-xl font-semibold mb-3">
                      No Active Investments
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
                      Start your investment journey by choosing from our available plans and 
                      begin earning attractive returns on your capital.
                    </p>
                    <Button 
                      onClick={() => setSelectedPlan(null)}
                      className="bg-[var(--success-green)] hover:bg-green-600"
                    >
                      Explore Investment Plans
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Available Plans Tab */}
          <TabsContent value="available-plans" className="space-y-8">
            
            {/* How It Works Section */}
            <Card className="bg-[var(--dark-card)] border-[var(--dark-border)]">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-[var(--text-primary)]">
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      1
                    </div>
                    <h4 className="font-semibold text-[var(--text-primary)]">Register</h4>
                    <p className="text-[var(--text-secondary)] text-sm">
                      Create your account with basic information and verify your identity.
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      2
                    </div>
                    <h4 className="font-semibold text-[var(--text-primary)]">Add Funds</h4>
                    <p className="text-[var(--text-secondary)] text-sm">
                      Deposit funds to your account using secure payment methods.
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      3
                    </div>
                    <h4 className="font-semibold text-[var(--text-primary)]">Select Plan</h4>
                    <p className="text-[var(--text-secondary)] text-sm">
                      Choose an investment plan that matches your goals and budget.
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      4
                    </div>
                    <h4 className="font-semibold text-[var(--text-primary)]">Enjoy Returns</h4>
                    <p className="text-[var(--text-secondary)] text-sm">
                      Watch your investment grow with daily returns and withdraw profits anytime.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investmentPlans?.map((plan) => {
                const tierInfo = getPlanTier(plan);
                const IconComponent = tierInfo.icon;
                const isPopular = parseFloat(plan.apyRate) >= 15;
                
                return (
                  <Card 
                    key={plan.id} 
                    className={`bg-[var(--dark-card)] border-[var(--dark-border)] relative overflow-hidden hover:shadow-lg transition-all duration-300 ${
                      isPopular ? 'ring-2 ring-yellow-500' : ''
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-yellow-500 text-black font-semibold">
                          <Star className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      </div>
                    )}
                    
                    <div className={`absolute top-0 left-0 w-full h-1 ${tierInfo.color}`}></div>
                    
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-3 rounded-lg ${tierInfo.color} text-white`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <Badge variant="secondary" className="mb-1">
                            {tierInfo.tier}
                          </Badge>
                          <CardTitle className="text-[var(--text-primary)] text-xl">
                            {plan.name}
                          </CardTitle>
                        </div>
                      </div>
                      <p className="text-[var(--text-secondary)] text-sm">
                        {plan.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[var(--success-green)] mb-2">
                          {plan.apyRate}%
                        </div>
                        <p className="text-[var(--text-secondary)] text-sm">Annual Percentage Yield</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--text-secondary)] text-sm">Minimum:</span>
                          <span className="text-[var(--text-primary)] font-semibold">
                            ${parseFloat(plan.minimumAmount).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--text-secondary)] text-sm">Maximum:</span>
                          <span className="text-[var(--text-primary)] font-semibold">
                            ${parseFloat(plan.maximumAmount).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--text-secondary)] text-sm">Duration:</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-[var(--text-secondary)]" />
                            <span className="text-[var(--text-primary)] font-semibold">
                              {plan.durationDays} days
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => handleInvest(plan)}
                        disabled={createInvestmentMutation.isPending}
                        className={`w-full ${tierInfo.color} hover:opacity-90 text-white font-semibold py-3`}
                      >
                        {createInvestmentMutation.isPending ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Investing...
                          </div>
                        ) : (
                          <>
                            <DollarSign className="h-4 w-4 mr-2" />
                            Invest Now
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Risk Disclaimer */}
            <Alert className="bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                <strong>Important Risk Disclaimer:</strong> All investments carry inherent risks, and past performance does not guarantee future results. High-yield investment programs involve significant risk and may not be suitable for all investors. Please carefully consider your financial situation and risk tolerance before investing. Only invest funds that you can afford to lose. BlackCnote is committed to transparency and responsible investing practices within the BlackCnote community.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
