interface PortfolioOverviewProps {
  data: {
    portfolio: {
      total: string;
      balance: string;
      totalInvested: string;
      totalReturns: string;
      activeInvestments: number;
    };
  };
}

export default function PortfolioOverview({ data }: PortfolioOverviewProps) {
  const { portfolio } = data;

  const stats = [
    {
      title: "Total Portfolio",
      value: `$${parseFloat(portfolio.total).toLocaleString()}`,
      change: "+12.5%",
      changeType: "positive",
      icon: "fas fa-wallet",
      color: "accent-blue",
    },
    {
      title: "Active Investments",
      value: portfolio.activeInvestments.toString(),
      change: "+2",
      changeType: "positive",
      icon: "fas fa-chart-line",
      color: "success-green",
    },
    {
      title: "Total Returns",
      value: `$${parseFloat(portfolio.totalReturns).toLocaleString()}`,
      change: "7.8% APY",
      changeType: "neutral",
      icon: "fas fa-trending-up",
      color: "success-green",
    },
    {
      title: "Available Balance",
      value: `$${parseFloat(portfolio.balance).toLocaleString()}`,
      change: "Add Funds",
      changeType: "action",
      icon: "fas fa-coins",
      color: "accent-blue",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-[var(--dark-card)] rounded-xl p-6 border border-[var(--dark-border)]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--text-secondary)] text-sm font-medium">
                {stat.title}
              </p>
              <p className="text-3xl font-bold text-[var(--text-primary)] mt-2">
                {stat.value}
              </p>
            </div>
            <div className={`w-12 h-12 bg-[var(--${stat.color})]/20 rounded-lg flex items-center justify-center`}>
              <i className={`${stat.icon} text-[var(--${stat.color})] text-xl`}></i>
            </div>
          </div>
          <div className="flex items-center mt-4">
            {stat.changeType === "positive" && (
              <span className="text-[var(--success-green)] text-sm font-medium">
                {stat.change}
              </span>
            )}
            {stat.changeType === "neutral" && (
              <span className="text-[var(--success-green)] text-sm font-medium">
                {stat.change}
              </span>
            )}
            {stat.changeType === "action" && (
              <button className="text-[var(--accent-blue)] text-sm font-medium hover:underline">
                {stat.change}
              </button>
            )}
            {stat.changeType !== "action" && (
              <span className="text-[var(--text-secondary)] text-sm ml-2">
                {stat.title === "Active Investments" ? "this week" : 
                 stat.title === "Total Returns" ? "average" : "from last month"}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
