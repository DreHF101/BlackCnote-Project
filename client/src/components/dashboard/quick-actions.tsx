import { Button } from "@/components/ui/button";

export default function QuickActions() {
  return (
    <div className="bg-[var(--dark-card)] rounded-xl p-6 border border-[var(--dark-border)]">
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
        Quick Actions
      </h2>
      <div className="space-y-3">
        <Button className="w-full bg-[var(--accent-blue)] hover:bg-blue-600 text-white py-3 flex items-center justify-center">
          <i className="fas fa-plus mr-2"></i>
          Deposit Funds
        </Button>
        <Button 
          variant="outline" 
          className="w-full bg-[var(--dark-bg)] hover:bg-gray-700 text-[var(--text-primary)] py-3 flex items-center justify-center border-[var(--dark-border)]"
        >
          <i className="fas fa-minus mr-2"></i>
          Withdraw
        </Button>
        <Button 
          variant="outline" 
          className="w-full bg-[var(--dark-bg)] hover:bg-gray-700 text-[var(--text-primary)] py-3 flex items-center justify-center border-[var(--dark-border)]"
        >
          <i className="fas fa-exchange-alt mr-2"></i>
          Transfer
        </Button>
      </div>
    </div>
  );
}
