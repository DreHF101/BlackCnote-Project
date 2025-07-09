import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

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

interface InvestmentPlansProps {
  plans?: InvestmentPlan[];
}

export default function InvestmentPlans({ plans = [] }: InvestmentPlansProps) {
  // Default plans if none provided
  const defaultPlans: InvestmentPlan[] = [
    {
      id: 1,
      name: "Starter Plan",
      description: "Perfect for beginners looking to start their investment journey",
      apyRate: "12.5",
      minimumAmount: "100.00",
      maximumAmount: "5000.00",
      durationDays: 30,
      isActive: true
    },
    {
      id: 2,
      name: "Growth Plan", 
      description: "Balanced plan for steady growth and returns",
      apyRate: "15.8",
      minimumAmount: "1000.00",
      maximumAmount: "25000.00",
      durationDays: 90,
      isActive: true
    },
    {
      id: 3,
      name: "Premium Plan",
      description: "High-yield plan for experienced investors",
      apyRate: "22.3",
      minimumAmount: "10000.00",
      maximumAmount: "100000.00",
      durationDays: 180,
      isActive: true
    }
  ];

  const displayPlans = plans.length > 0 ? plans : defaultPlans;

  const getTierColor = (apy: string) => {
    const rate = parseFloat(apy);
    if (rate >= 20) return "from-amber-500 to-orange-600";
    if (rate >= 15) return "from-blue-500 to-blue-600";
    return "from-green-500 to-green-600";
  };

  const getTierBadgeColor = (apy: string) => {
    const rate = parseFloat(apy);
    if (rate >= 20) return "bg-amber-500/20 text-amber-400";
    if (rate >= 15) return "bg-blue-500/20 text-blue-400";
    return "bg-green-500/20 text-green-400";
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Investment Plans</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Choose from our carefully curated investment plans designed to maximize your returns 
          while managing risk through diversified strategies.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPlans.map((plan) => (
          <Card 
            key={plan.id}
            className={`
              bg-slate-800/50 border-slate-700 hover:border-slate-600 
              transition-all duration-200 hover:scale-105 group relative overflow-hidden
            `}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${getTierColor(plan.apyRate)} opacity-5 group-hover:opacity-10 transition-opacity`} />
            
            <CardHeader className="relative">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                <Badge className={getTierBadgeColor(plan.apyRate)}>
                  {plan.apyRate}% APY
                </Badge>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {plan.description}
              </p>
            </CardHeader>

            <CardContent className="relative space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Minimum:</span>
                  <span className="text-white font-semibold">${plan.minimumAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Maximum:</span>
                  <span className="text-white font-semibold">${plan.maximumAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Duration:</span>
                  <span className="text-white font-semibold">{plan.durationDays} days</span>
                </div>
              </div>

              <Button 
                className={`
                  w-full bg-gradient-to-r ${getTierColor(plan.apyRate)} 
                  hover:scale-105 transition-transform text-white font-semibold
                  shadow-lg hover:shadow-xl
                `}
                disabled={!plan.isActive}
              >
                {plan.isActive ? 'Invest Now' : 'Currently Unavailable'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-6">
        <p className="text-xs text-slate-500">
          * All investment plans are subject to market conditions and our risk management protocols.
          Past performance does not guarantee future results.
        </p>
      </div>
    </div>
  );
}