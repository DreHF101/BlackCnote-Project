import { useState } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface InvestmentCalculatorProps {
  plans: Array<{
    id: number;
    name: string;
    apyRate: string;
    durationDays: number;
  }>;
}

export default function InvestmentCalculator({ plans }: InvestmentCalculatorProps) {
  const [amount, setAmount] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [calculation, setCalculation] = useState<{
    estimatedReturn: string;
    totalReturn: string;
  } | null>(null);

  const calculateMutation = useMutation({
    mutationFn: async (data: { amount: string; planId: number }) => {
      const response = await apiRequest("POST", "/api/calculate-investment", data);
      return response.json();
    },
    onSuccess: (data) => {
      setCalculation({
        estimatedReturn: data.estimatedReturn,
        totalReturn: data.totalReturn,
      });
    },
  });

  const handleCalculate = () => {
    if (!amount || !selectedPlan) return;
    
    calculateMutation.mutate({
      amount,
      planId: parseInt(selectedPlan),
    });
  };

  return (
    <div className="bg-[var(--dark-card)] rounded-xl p-6 border border-[var(--dark-border)]">
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
        Investment Calculator
      </h2>
      <div className="space-y-4">
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
            Investment Plan
          </Label>
          <Select value={selectedPlan} onValueChange={setSelectedPlan}>
            <SelectTrigger className="w-full bg-[var(--dark-bg)] border-[var(--dark-border)] text-[var(--text-primary)] mt-2">
              <SelectValue placeholder="Select a plan" />
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
        
        {calculation && (
          <div className="bg-[var(--dark-bg)] rounded-lg p-4 border border-[var(--dark-border)]">
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">Estimated Return:</span>
              <span className="text-[var(--success-green)] font-semibold">
                ${calculation.estimatedReturn}
              </span>
            </div>
          </div>
        )}
        
        <Button 
          onClick={handleCalculate}
          disabled={!amount || !selectedPlan || calculateMutation.isPending}
          className="w-full bg-[var(--success-green)] hover:bg-green-600 text-white py-2"
        >
          {calculateMutation.isPending ? "Calculating..." : "Calculate"}
        </Button>
      </div>
    </div>
  );
}
