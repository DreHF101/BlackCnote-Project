import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plans: Array<{
    id: number;
    name: string;
    apyRate: string;
    minimumAmount: string;
    maximumAmount: string;
    durationDays: number;
  }>;
  selectedPlanId?: number | null;
}

export default function InvestmentModal({ 
  isOpen, 
  onClose, 
  plans, 
  selectedPlanId 
}: InvestmentModalProps) {
  const [selectedPlan, setSelectedPlan] = useState(selectedPlanId?.toString() || "");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("balance");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createInvestmentMutation = useMutation({
    mutationFn: async (data: { userId: number; planId: number; amount: string }) => {
      const response = await apiRequest("POST", "/api/investments", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Investment Created",
        description: "Your investment has been created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/users/1/investments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/users/1/portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["/api/users/1/transactions"] });
      onClose();
      setAmount("");
      setSelectedPlan("");
      setPaymentMethod("balance");
    },
    onError: (error: any) => {
      toast({
        title: "Investment Failed",
        description: error.message || "Failed to create investment",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan || !amount) {
      toast({
        title: "Missing Information",
        description: "Please select a plan and enter an amount",
        variant: "destructive",
      });
      return;
    }

    const plan = plans.find(p => p.id.toString() === selectedPlan);
    if (!plan) return;

    const investmentAmount = parseFloat(amount);
    const minAmount = parseFloat(plan.minimumAmount);
    const maxAmount = parseFloat(plan.maximumAmount);

    if (investmentAmount < minAmount || investmentAmount > maxAmount) {
      toast({
        title: "Invalid Amount",
        description: `Amount must be between $${minAmount.toLocaleString()} and $${maxAmount.toLocaleString()}`,
        variant: "destructive",
      });
      return;
    }

    createInvestmentMutation.mutate({
      userId: 1, // Hardcoded for demo
      planId: parseInt(selectedPlan),
      amount,
    });
  };

  const selectedPlanData = plans.find(p => p.id.toString() === selectedPlan);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[var(--dark-card)] border-[var(--dark-border)] text-[var(--text-primary)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            New Investment
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-[var(--text-secondary)] text-sm font-medium">
              Select Plan
            </Label>
            <Select value={selectedPlan} onValueChange={setSelectedPlan}>
              <SelectTrigger className="w-full bg-[var(--dark-bg)] border-[var(--dark-border)] text-[var(--text-primary)] mt-2">
                <SelectValue placeholder="Choose an investment plan" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--dark-card)] border-[var(--dark-border)]">
                {plans.map((plan) => (
                  <SelectItem 
                    key={plan.id} 
                    value={plan.id.toString()}
                    className="text-[var(--text-primary)] hover:bg-[var(--dark-bg)]"
                  >
                    {plan.name} ({plan.apyRate}% APY)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedPlanData && (
            <div className="bg-[var(--dark-bg)] rounded-lg p-4 border border-[var(--dark-border)]">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-[var(--text-secondary)]">Min Amount:</span>
                  <span className="text-[var(--text-primary)] ml-2">
                    ${parseFloat(selectedPlanData.minimumAmount).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--text-secondary)]">Max Amount:</span>
                  <span className="text-[var(--text-primary)] ml-2">
                    ${parseFloat(selectedPlanData.maximumAmount).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--text-secondary)]">Duration:</span>
                  <span className="text-[var(--text-primary)] ml-2">
                    {selectedPlanData.durationDays} days
                  </span>
                </div>
                <div>
                  <span className="text-[var(--text-secondary)]">APY:</span>
                  <span className="text-[var(--success-green)] ml-2 font-medium">
                    {selectedPlanData.apyRate}%
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div>
            <Label className="text-[var(--text-secondary)] text-sm font-medium">
              Investment Amount
            </Label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[var(--dark-bg)] border-[var(--dark-border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] mt-2"
            />
          </div>
          
          <div>
            <Label className="text-[var(--text-secondary)] text-sm font-medium">
              Payment Method
            </Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="w-full bg-[var(--dark-bg)] border-[var(--dark-border)] text-[var(--text-primary)] mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[var(--dark-card)] border-[var(--dark-border)]">
                <SelectItem value="balance" className="text-[var(--text-primary)] hover:bg-[var(--dark-bg)]">
                  Account Balance
                </SelectItem>
                <SelectItem value="bank" className="text-[var(--text-primary)] hover:bg-[var(--dark-bg)]">
                  Bank Transfer
                </SelectItem>
                <SelectItem value="card" className="text-[var(--text-primary)] hover:bg-[var(--dark-bg)]">
                  Credit Card
                </SelectItem>
                <SelectItem value="crypto" className="text-[var(--text-primary)] hover:bg-[var(--dark-bg)]">
                  Cryptocurrency
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <Button 
              type="button" 
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-[var(--dark-bg)] hover:bg-gray-700 text-[var(--text-primary)] border-[var(--dark-border)]"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={createInvestmentMutation.isPending}
              className="flex-1 bg-[var(--accent-blue)] hover:bg-blue-600 text-white"
            >
              {createInvestmentMutation.isPending ? "Creating..." : "Invest Now"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
