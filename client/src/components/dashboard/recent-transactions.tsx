interface RecentTransactionsProps {
  transactions: Array<{
    id: number;
    type: string;
    amount: string;
    description: string;
    createdAt: string;
  }>;
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "profit":
        return "fas fa-chart-line text-[var(--success-green)]";
      case "withdrawal":
        return "fas fa-arrow-down text-[var(--accent-blue)]";
      case "investment":
        return "fas fa-arrow-up text-[var(--success-green)]";
      default:
        return "fas fa-exchange-alt text-[var(--text-secondary)]";
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "profit":
        return "bg-[var(--success-green)]/20";
      case "withdrawal":
        return "bg-[var(--accent-blue)]/20";
      case "investment":
        return "bg-[var(--success-green)]/20";
      default:
        return "bg-[var(--text-secondary)]/20";
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="bg-[var(--dark-card)] rounded-xl p-6 border border-[var(--dark-border)]">
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
        Recent Transactions
      </h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div 
            key={transaction.id}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[var(--dark-bg)] transition-colors"
          >
            <div className={`w-10 h-10 ${getTransactionColor(transaction.type)} rounded-lg flex items-center justify-center`}>
              <i className={getTransactionIcon(transaction.type)}></i>
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
                transaction.type === "withdrawal" 
                  ? "text-[var(--text-primary)]" 
                  : "text-[var(--success-green)]"
              }`}>
                {transaction.type === "withdrawal" ? "-" : "+"}${parseFloat(transaction.amount).toLocaleString()}
              </p>
              <p className="text-[var(--text-secondary)] text-sm">
                {formatTimeAgo(transaction.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-[var(--accent-blue)] hover:underline text-sm font-medium">
        View All Transactions
      </button>
    </div>
  );
}
