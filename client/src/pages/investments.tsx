import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Investments() {
  const { data: userInvestments, isLoading } = useQuery({
    queryKey: ["/api/users/1/investments"],
  });

  const { data: investmentPlans } = useQuery({
    queryKey: ["/api/investment-plans"],
  });

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
            My Investments
          </h1>
          <p className="text-[var(--text-secondary)]">
            Track and manage your active investments
          </p>
        </div>

        <div className="space-y-6">
          {userInvestments && userInvestments.length > 0 ? (
            userInvestments.map((investment) => {
              const plan = investmentPlans?.find(p => p.id === investment.planId);
              const progressPercent = plan ? 
                ((Date.now() - new Date(investment.startDate).getTime()) / 
                (new Date(investment.endDate).getTime() - new Date(investment.startDate).getTime())) * 100 : 0;
              
              return (
                <Card key={investment.id} className="bg-[var(--dark-card)] border-[var(--dark-border)]">
                  <CardHeader>
                    <CardTitle className="text-[var(--text-primary)] flex items-center justify-between">
                      <span>{plan?.name || "Unknown Plan"}</span>
                      <span className="text-[var(--success-green)] text-lg">
                        {plan?.apyRate}% APY
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-[var(--text-secondary)] text-sm">Investment Amount</p>
                        <p className="text-[var(--text-primary)] font-semibold">
                          ${parseFloat(investment.amount).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[var(--text-secondary)] text-sm">Current Returns</p>
                        <p className="text-[var(--success-green)] font-semibold">
                          +${parseFloat(investment.currentReturns).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[var(--text-secondary)] text-sm">Progress</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-[var(--dark-bg)] rounded-full h-2">
                            <div 
                              className="bg-[var(--success-green)] h-2 rounded-full"
                              style={{ width: `${Math.min(progressPercent, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-[var(--text-secondary)] text-sm">
                            {Math.round(progressPercent)}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-[var(--text-secondary)] text-sm">Status</p>
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-[var(--success-green)]/20 text-[var(--success-green)]">
                          {investment.status}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card className="bg-[var(--dark-card)] border-[var(--dark-border)]">
              <CardContent className="text-center py-12">
                <i className="fas fa-chart-line text-[var(--text-secondary)] text-4xl mb-4"></i>
                <h3 className="text-[var(--text-primary)] text-lg font-semibold mb-2">
                  No Active Investments
                </h3>
                <p className="text-[var(--text-secondary)]">
                  Start your investment journey by choosing from our available plans.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
