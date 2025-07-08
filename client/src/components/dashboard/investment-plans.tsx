import { Button } from "@/components/ui/button";
import { useState } from "react";
import InvestmentModal from "@/components/modals/investment-modal";

interface InvestmentPlansProps {
  plans: Array<{
    id: number;
    name: string;
    description: string;
    apyRate: string;
    minimumAmount: string;
    maximumAmount: string;
    durationDays: number;
    isActive: boolean;
  }>;
}

export default function InvestmentPlans({ plans }: InvestmentPlansProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const handleInvest = (planId: number) => {
    setSelectedPlan(planId);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-[var(--dark-card)] rounded-xl p-6 border border-[var(--dark-border)]">
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
          Available Investment Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className="border border-[var(--dark-border)] rounded-lg p-4 hover:border-[var(--accent-blue)] transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {plan.name}
                </h3>
                <span className="bg-[var(--success-green)]/20 text-[var(--success-green)] px-2 py-1 rounded-md text-sm font-medium">
                  {plan.apyRate}% APY
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Minimum:</span>
                  <span className="text-[var(--text-primary)]">
                    ${parseFloat(plan.minimumAmount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Maximum:</span>
                  <span className="text-[var(--text-primary)]">
                    ${parseFloat(plan.maximumAmount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Duration:</span>
                  <span className="text-[var(--text-primary)]">
                    {plan.durationDays} days
                  </span>
                </div>
              </div>
              <Button 
                onClick={() => handleInvest(plan.id)}
                className="w-full mt-4 bg-[var(--accent-blue)] hover:bg-blue-600 text-white"
              >
                Invest Now
              </Button>
            </div>
          ))}
        </div>
      </div>

      <InvestmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plans={plans}
        selectedPlanId={selectedPlan}
      />
    </>
  );
}
