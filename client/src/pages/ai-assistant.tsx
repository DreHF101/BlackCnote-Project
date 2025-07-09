/**
 * AI Investment Assistant Page
 * Main page for AI-powered investment recommendations and portfolio optimization
 */

import AIInvestmentAssistant from "@/components/ai/ai-investment-assistant";

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] py-8">
      <div className="container mx-auto px-4">
        <AIInvestmentAssistant />
      </div>
    </div>
  );
}