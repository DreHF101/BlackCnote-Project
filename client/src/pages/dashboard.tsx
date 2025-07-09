import { useQuery } from "@tanstack/react-query";
import PortfolioOverview from "@/components/dashboard/portfolio-overview";
import PortfolioChart from "@/components/dashboard/portfolio-chart";
import InvestmentPlans from "@/components/dashboard/investment-plans";
import RecentTransactions from "@/components/dashboard/recent-transactions";
import QuickActions from "@/components/dashboard/quick-actions";
import InvestmentCalculator from "@/components/dashboard/investment-calculator";
import ActiveInvestmentsTable from "@/components/dashboard/active-investments-table";
import PaymentDemo from "@/components/payment/payment-demo";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import InvestmentModal from "@/components/modals/investment-modal";
import { OnboardingTutorial } from "@/components/onboarding/onboarding-tutorial";
import { OnboardingTrigger } from "@/components/ui/onboarding-trigger";

export default function Dashboard() {
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const { data: portfolioData, isLoading } = useQuery({
    queryKey: ["/api/users/1/portfolio"],
  });

  const { data: investmentPlans } = useQuery({
    queryKey: ["/api/investment-plans"],
  });

  const { data: userInvestments } = useQuery({
    queryKey: ["/api/users/1/investments"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-[var(--dark-card)] rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-[var(--dark-card)] rounded-xl"></div>
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
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                Investment Dashboard
              </h1>
              <p className="text-[var(--text-secondary)]">
                Monitor your portfolio performance and investment opportunities
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <Button 
                onClick={() => setIsInvestmentModalOpen(true)}
                className="bg-[var(--accent-blue)] hover:bg-blue-600 text-white px-6 py-3"
              >
                <i className="fas fa-plus mr-2"></i>
                New Investment
              </Button>
            </div>
          </div>
        </div>

        {/* Portfolio Overview */}
        {portfolioData && <PortfolioOverview data={portfolioData} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Portfolio Chart */}
            {portfolioData && <PortfolioChart data={portfolioData.portfolioHistory} />}
            
            {/* Investment Plans */}
            {investmentPlans && <InvestmentPlans plans={investmentPlans} />}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Transactions */}
            {portfolioData && <RecentTransactions transactions={portfolioData.recentTransactions} />}
            
            {/* Quick Actions */}
            <QuickActions />
            
            {/* Investment Calculator */}
            {investmentPlans && <InvestmentCalculator plans={investmentPlans} />}
          </div>
        </div>

        {/* Active Investments Table */}
        {userInvestments && investmentPlans && (
          <ActiveInvestmentsTable 
            investments={userInvestments} 
            plans={investmentPlans}
          />
        )}

        {/* HYIPLab Payment Integration */}
        <div className="mt-8">
          <PaymentDemo />
        </div>
      </div>

      {/* Investment Modal */}
      <InvestmentModal 
        isOpen={isInvestmentModalOpen}
        onClose={() => setIsInvestmentModalOpen(false)}
        plans={investmentPlans || []}
      />
      
      {/* Onboarding Components */}
      <OnboardingTrigger 
        onStartTutorial={() => setShowOnboarding(true)}
        variant="fab"
      />
      
      <OnboardingTutorial
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={() => {
          localStorage.setItem('blackcnote_onboarding_completed', 'true');
          setShowOnboarding(false);
        }}
        userType="returning"
      />
    </div>
  );
}
