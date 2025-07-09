import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function QuickActions() {
  return (
    <div className="bg-[var(--dark-card)] rounded-xl p-6 border border-[var(--dark-border)]">
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
        Quick Actions
      </h2>
      <div className="space-y-3">
        <Link href="/investments">
          <Button className="w-full bg-[var(--accent-blue)] hover:bg-blue-600 text-white py-3 flex items-center justify-center">
            <i className="fas fa-plus mr-2"></i>
            New Investment
          </Button>
        </Link>
        <Link href="/transactions">
          <Button 
            variant="outline" 
            className="w-full bg-[var(--dark-bg)] hover:bg-gray-700 text-[var(--text-primary)] py-3 flex items-center justify-center border-[var(--dark-border)]"
          >
            <i className="fas fa-history mr-2"></i>
            View Transactions
          </Button>
        </Link>
        <Link href="/referrals">
          <Button 
            variant="outline" 
            className="w-full bg-[var(--dark-bg)] hover:bg-gray-700 text-[var(--text-primary)] py-3 flex items-center justify-center border-[var(--dark-border)]"
          >
            <i className="fas fa-users mr-2"></i>
            Refer Friends
          </Button>
        </Link>
      </div>
    </div>
  );
}
