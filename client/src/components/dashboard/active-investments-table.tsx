import { Button } from "@/components/ui/button";

interface ActiveInvestmentsTableProps {
  investments: Array<{
    id: number;
    planId: number;
    amount: string;
    currentReturns: string;
    status: string;
    startDate: string;
    endDate: string;
  }>;
  plans: Array<{
    id: number;
    name: string;
    apyRate: string;
    durationDays: number;
  }>;
}

export default function ActiveInvestmentsTable({ investments, plans }: ActiveInvestmentsTableProps) {
  const activeInvestments = investments.filter(inv => inv.status === "active");

  const getPlanById = (planId: number) => {
    return plans.find(plan => plan.id === planId);
  };

  const calculateProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = Date.now();
    
    const total = end - start;
    const elapsed = now - start;
    
    return Math.min(Math.max((elapsed / total) * 100, 0), 100);
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate).getTime();
    const now = Date.now();
    const diff = end - now;
    
    if (diff <= 0) return 0;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (activeInvestments.length === 0) {
    return (
      <div className="mt-8">
        <div className="bg-[var(--dark-card)] rounded-xl border border-[var(--dark-border)] p-8 text-center">
          <i className="fas fa-chart-line text-[var(--text-secondary)] text-4xl mb-4"></i>
          <h3 className="text-[var(--text-primary)] text-lg font-semibold mb-2">
            No Active Investments
          </h3>
          <p className="text-[var(--text-secondary)]">
            Start investing to see your active investments here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="bg-[var(--dark-card)] rounded-xl border border-[var(--dark-border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--dark-border)]">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            Active Investments
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--dark-bg)]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                  Investment Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                  Returns
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--dark-border)]">
              {activeInvestments.map((investment) => {
                const plan = getPlanById(investment.planId);
                const progress = calculateProgress(investment.startDate, investment.endDate);
                const daysRemaining = getDaysRemaining(investment.endDate);
                
                return (
                  <tr key={investment.id} className="hover:bg-[var(--dark-bg)] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[var(--accent-blue)]/20 rounded-lg flex items-center justify-center mr-3">
                          <i className="fas fa-chart-line text-[var(--accent-blue)]"></i>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[var(--text-primary)]">
                            {plan?.name || "Unknown Plan"}
                          </div>
                          <div className="text-sm text-[var(--text-secondary)]">
                            {plan?.apyRate}% APY
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-[var(--text-primary)]">
                        ${parseFloat(investment.amount).toLocaleString()}
                      </div>
                      <div className="text-sm text-[var(--text-secondary)]">Principal</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-[var(--success-green)] font-medium">
                        +${parseFloat(investment.currentReturns).toLocaleString()}
                      </div>
                      <div className="text-sm text-[var(--text-secondary)]">Current</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-[var(--dark-bg)] rounded-full h-2 mr-2">
                          <div 
                            className="bg-[var(--success-green)] h-2 rounded-full"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-[var(--text-secondary)]">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="text-sm text-[var(--text-secondary)] mt-1">
                        {daysRemaining} days remaining
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[var(--success-green)]/20 text-[var(--success-green)]">
                        {investment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/10"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
