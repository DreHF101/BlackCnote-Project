import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Transactions() {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["/api/users/1/transactions"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--dark-bg)]">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-[var(--dark-card)] rounded w-1/3"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-[var(--dark-card)] rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--dark-bg)]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
            Transaction History
          </h1>
          <p className="text-[var(--text-secondary)]">
            View all your investment transactions and activities
          </p>
        </div>

        <Card className="bg-[var(--dark-card)] border-[var(--dark-border)]">
          <CardHeader>
            <CardTitle className="text-[var(--text-primary)]">
              All Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {transactions && transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="flex items-center space-x-3 p-4 rounded-lg bg-[var(--dark-bg)] hover:bg-opacity-80 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      transaction.type === 'profit' 
                        ? 'bg-[var(--success-green)]/20' 
                        : transaction.type === 'withdrawal'
                        ? 'bg-[var(--accent-blue)]/20'
                        : 'bg-[var(--success-green)]/20'
                    }`}>
                      <i className={`fas ${
                        transaction.type === 'profit' 
                          ? 'fa-chart-line text-[var(--success-green)]' 
                          : transaction.type === 'withdrawal'
                          ? 'fa-arrow-down text-[var(--accent-blue)]'
                          : 'fa-arrow-up text-[var(--success-green)]'
                      }`}></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-[var(--text-primary)] font-medium">
                        {transaction.description}
                      </p>
                      <p className="text-[var(--text-secondary)] text-sm">
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.type === 'withdrawal' 
                          ? 'text-[var(--text-primary)]' 
                          : 'text-[var(--success-green)]'
                      }`}>
                        {transaction.type === 'withdrawal' ? '-' : '+'}${parseFloat(transaction.amount).toLocaleString()}
                      </p>
                      <p className="text-[var(--text-secondary)] text-sm">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <i className="fas fa-receipt text-[var(--text-secondary)] text-4xl mb-4"></i>
                <h3 className="text-[var(--text-primary)] text-lg font-semibold mb-2">
                  No Transactions Yet
                </h3>
                <p className="text-[var(--text-secondary)]">
                  Your transaction history will appear here once you start investing.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
