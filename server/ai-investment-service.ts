/**
 * AI Investment Assistant Service
 * Comprehensive AI-powered investment recommendations and portfolio optimization
 */

import { db } from './db';
import { 
  DynamicAPY, 
  AIRecommendationData, 
  SmartPoolStrategy,
  AiRecommendation,
  InvestmentGoal,
  SmartInvestmentPool,
  InvestmentAlert,
  DynamicApyConfig
} from '@shared/ai-schema';
import { User, Investment, InvestmentPlan } from '@shared/schema';
import { storage } from './storage';

export class AIInvestmentService {
  
  /**
   * Calculate Dynamic APY based on performance, loyalty, and market conditions
   */
  static calculateDynamicAPY(
    baseRate: number,
    userInvestmentHistory: Investment[],
    marketConditions: 'bull' | 'bear' | 'neutral' = 'neutral'
  ): DynamicAPY {
    // Performance Bonus (0-2% based on investment performance)
    const avgPerformance = this.calculateAveragePerformance(userInvestmentHistory);
    const performanceBonus = Math.min(2.0, Math.max(0, avgPerformance - 5.0) * 0.4);
    
    // Loyalty Multiplier (1.0-1.5x based on investment duration and frequency)
    const loyaltyScore = this.calculateLoyaltyScore(userInvestmentHistory);
    const loyaltyMultiplier = 1.0 + (loyaltyScore * 0.5);
    
    // Market Condition Adjustment (-1% to +1% based on market sentiment)
    const marketAdjustment = this.getMarketConditionAdjustment(marketConditions);
    
    // Calculate final APY
    const adjustedBaseRate = baseRate + performanceBonus + marketAdjustment;
    const finalAPY = adjustedBaseRate * loyaltyMultiplier;
    
    return {
      baseRate,
      performanceBonus,
      loyaltyMultiplier,
      marketConditionAdjustment: marketAdjustment,
      finalAPY: Math.round(finalAPY * 100) / 100, // Round to 2 decimal places
    };
  }

  /**
   * Generate personalized investment recommendations
   */
  static async generatePersonalizedRecommendations(
    userId: number,
    riskTolerance: 'conservative' | 'moderate' | 'aggressive' = 'moderate'
  ): Promise<AIRecommendationData[]> {
    const user = await storage.getUser(userId);
    if (!user) throw new Error('User not found');

    const userInvestments = await storage.getUserInvestments(userId);
    const investmentPlans = await storage.getInvestmentPlans();
    
    const recommendations: AIRecommendationData[] = [];

    // Portfolio Diversification Recommendation
    const diversificationRec = await this.analyzeDiversification(userInvestments, investmentPlans);
    if (diversificationRec) recommendations.push(diversificationRec);

    // Risk-Adjusted Plan Recommendations
    const riskAdjustedRecs = await this.generateRiskAdjustedRecommendations(
      userInvestments, 
      investmentPlans, 
      riskTolerance
    );
    recommendations.push(...riskAdjustedRecs);

    // Goal-Based Recommendations
    const goalBasedRecs = await this.generateGoalBasedRecommendations(userId);
    recommendations.push(...goalBasedRecs);

    // Auto-Compounding Opportunities
    const compoundingRecs = await this.identifyCompoundingOpportunities(userInvestments);
    if (compoundingRecs) recommendations.push(compoundingRecs);

    return recommendations;
  }

  /**
   * Create smart investment pools with AI-powered allocation
   */
  static async createSmartInvestmentPool(
    poolName: string,
    category: string,
    riskLevel: 'low' | 'medium' | 'high',
    minimumInvestment: number,
    maximumInvestment: number
  ): Promise<SmartInvestmentPool> {
    const strategy = this.generateAIAllocationStrategy(category, riskLevel);
    const expectedAPY = this.calculatePoolExpectedAPY(strategy, riskLevel);

    const poolData = {
      poolName,
      description: `AI-optimized ${category} investment pool with ${riskLevel} risk profile`,
      category,
      totalValue: 0,
      participantCount: 0,
      minimumInvestment,
      maximumInvestment,
      expectedAPY,
      riskLevel,
      aiStrategy: strategy,
      isActive: true,
    };

    // In a real implementation, this would save to database
    // For now, return mock data structure
    return {
      id: Math.floor(Math.random() * 1000),
      ...poolData,
      createdAt: new Date(),
    };
  }

  /**
   * Auto-compounding investment management
   */
  static async processAutoCompounding(investment: Investment): Promise<{
    compounded: boolean;
    newAmount: number;
    reason: string;
  }> {
    // Check if investment is eligible for auto-compounding
    const plan = await storage.getInvestmentPlan(investment.planId);
    if (!plan) {
      return { compounded: false, newAmount: 0, reason: 'Investment plan not found' };
    }

    // Calculate compound interest
    const currentReturns = parseFloat(investment.currentReturns);
    const principal = parseFloat(investment.amount);
    
    // Check if returns meet minimum compounding threshold (e.g., $50)
    if (currentReturns < 50) {
      return { 
        compounded: false, 
        newAmount: principal, 
        reason: 'Returns below minimum compounding threshold ($50)' 
      };
    }

    // Calculate new investment amount
    const newAmount = principal + currentReturns;
    
    // Update investment with compounded amount
    await storage.updateInvestmentReturns(investment.id, "0.00"); // Reset returns
    
    return {
      compounded: true,
      newAmount,
      reason: `Compounded $${currentReturns.toFixed(2)} returns into principal`,
    };
  }

  /**
   * Portfolio rebalancing recommendations
   */
  static async generateRebalancingRecommendations(
    userId: number
  ): Promise<{
    shouldRebalance: boolean;
    recommendations: Array<{
      action: 'increase' | 'decrease' | 'maintain';
      planId: number;
      planName: string;
      currentAllocation: number;
      recommendedAllocation: number;
      reason: string;
    }>;
    expectedImprovement: number;
  }> {
    const userInvestments = await storage.getUserInvestments(userId);
    const investmentPlans = await storage.getInvestmentPlans();
    
    // Calculate current portfolio allocation
    const totalInvested = userInvestments.reduce(
      (sum, inv) => sum + parseFloat(inv.amount), 
      0
    );
    
    const currentAllocation = userInvestments.map(inv => {
      const plan = investmentPlans.find(p => p.id === inv.planId);
      return {
        planId: inv.planId,
        planName: plan?.name || 'Unknown',
        allocation: parseFloat(inv.amount) / totalInvested,
        amount: parseFloat(inv.amount),
      };
    });

    // AI-based optimal allocation (simplified algorithm)
    const optimalAllocation = this.calculateOptimalAllocation(currentAllocation, investmentPlans);
    
    // Generate recommendations
    const recommendations = currentAllocation.map(current => {
      const optimal = optimalAllocation.find(opt => opt.planId === current.planId);
      if (!optimal) return null;
      
      const difference = optimal.allocation - current.allocation;
      const threshold = 0.05; // 5% threshold for rebalancing
      
      if (Math.abs(difference) < threshold) {
        return {
          action: 'maintain' as const,
          planId: current.planId,
          planName: current.planName,
          currentAllocation: current.allocation,
          recommendedAllocation: optimal.allocation,
          reason: 'Current allocation is optimal',
        };
      }
      
      return {
        action: difference > 0 ? 'increase' as const : 'decrease' as const,
        planId: current.planId,
        planName: current.planName,
        currentAllocation: current.allocation,
        recommendedAllocation: optimal.allocation,
        reason: difference > 0 
          ? `Increase allocation to optimize returns` 
          : `Decrease allocation to reduce risk`,
      };
    }).filter(Boolean) as any[];

    const shouldRebalance = recommendations.some(rec => rec.action !== 'maintain');
    const expectedImprovement = this.calculateExpectedImprovement(
      currentAllocation, 
      optimalAllocation
    );

    return {
      shouldRebalance,
      recommendations,
      expectedImprovement,
    };
  }

  /**
   * Investment goal tracking and recommendations
   */
  static async trackInvestmentGoals(userId: number): Promise<{
    goals: Array<{
      goalId: number;
      goalName: string;
      progress: number;
      timeRemaining: number;
      onTrack: boolean;
      recommendations: string[];
    }>;
    overallProgress: number;
  }> {
    // Mock implementation - in real app, fetch from database
    const mockGoals = [
      {
        goalId: 1,
        goalName: "Emergency Fund",
        targetAmount: 10000,
        currentAmount: 7500,
        targetDate: new Date('2024-12-31'),
        riskTolerance: 'conservative' as const,
      },
      {
        goalId: 2,
        goalName: "Retirement Savings",
        targetAmount: 500000,
        currentAmount: 125000,
        targetDate: new Date('2044-01-01'),
        riskTolerance: 'moderate' as const,
      },
    ];

    const goals = mockGoals.map(goal => {
      const progress = (goal.currentAmount / goal.targetAmount) * 100;
      const timeRemaining = Math.max(0, goal.targetDate.getTime() - Date.now());
      const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));
      
      // Calculate if on track
      const timeElapsed = Date.now() - (goal.targetDate.getTime() - (20 * 365 * 24 * 60 * 60 * 1000)); // Assuming 20-year timeline
      const expectedProgress = (timeElapsed / (20 * 365 * 24 * 60 * 60 * 1000)) * 100;
      const onTrack = progress >= expectedProgress * 0.9; // 90% of expected progress
      
      // Generate recommendations
      const recommendations: string[] = [];
      if (!onTrack) {
        recommendations.push(`Increase monthly contribution by 20% to stay on track`);
        if (goal.riskTolerance === 'conservative') {
          recommendations.push(`Consider moderate risk investments for better returns`);
        }
      }
      if (progress > 90) {
        recommendations.push(`Great progress! Consider planning for the next milestone`);
      }
      
      return {
        goalId: goal.goalId,
        goalName: goal.goalName,
        progress,
        timeRemaining: daysRemaining,
        onTrack,
        recommendations,
      };
    });

    const overallProgress = goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length;

    return { goals, overallProgress };
  }

  // Private helper methods
  private static calculateAveragePerformance(investments: Investment[]): number {
    if (investments.length === 0) return 5.0; // Default baseline
    
    const totalReturns = investments.reduce((sum, inv) => {
      const principal = parseFloat(inv.amount);
      const returns = parseFloat(inv.currentReturns);
      return sum + (returns / principal) * 100;
    }, 0);
    
    return totalReturns / investments.length;
  }

  private static calculateLoyaltyScore(investments: Investment[]): number {
    if (investments.length === 0) return 0;
    
    // Calculate based on investment duration and frequency
    const avgDuration = investments.reduce((sum, inv) => {
      const duration = Date.now() - inv.startDate.getTime();
      return sum + duration;
    }, 0) / investments.length;
    
    const durationScore = Math.min(1.0, avgDuration / (365 * 24 * 60 * 60 * 1000)); // Max 1 year
    const frequencyScore = Math.min(1.0, investments.length / 10); // Max 10 investments
    
    return (durationScore + frequencyScore) / 2;
  }

  private static getMarketConditionAdjustment(condition: 'bull' | 'bear' | 'neutral'): number {
    switch (condition) {
      case 'bull': return 0.5;
      case 'bear': return -0.5;
      case 'neutral': return 0.0;
      default: return 0.0;
    }
  }

  private static async analyzeDiversification(
    userInvestments: Investment[],
    availablePlans: InvestmentPlan[]
  ): Promise<AIRecommendationData | null> {
    if (userInvestments.length === 0) return null;
    
    // Check if user has investments in multiple tiers
    const planIds = userInvestments.map(inv => inv.planId);
    const uniquePlans = new Set(planIds);
    
    if (uniquePlans.size < 2 && availablePlans.length > 2) {
      return {
        type: 'portfolio_optimization',
        title: 'Diversify Your Portfolio',
        description: 'Consider spreading your investments across multiple plans to reduce risk and optimize returns.',
        actionItems: [
          'Add investments to different risk tiers',
          'Consider both short-term and long-term plans',
          'Balance between conservative and growth-oriented investments',
        ],
        expectedImpact: {
          roi: 15,
          risk: 'low',
          timeframe: '3-6 months',
        },
        confidence: 0.85,
      };
    }
    
    return null;
  }

  private static async generateRiskAdjustedRecommendations(
    userInvestments: Investment[],
    availablePlans: InvestmentPlan[],
    riskTolerance: 'conservative' | 'moderate' | 'aggressive'
  ): Promise<AIRecommendationData[]> {
    const recommendations: AIRecommendationData[] = [];
    
    // Filter plans based on risk tolerance
    const suitablePlans = availablePlans.filter(plan => {
      const apy = parseFloat(plan.apyRate);
      switch (riskTolerance) {
        case 'conservative': return apy <= 8;
        case 'moderate': return apy > 6 && apy <= 15;
        case 'aggressive': return apy > 12;
        default: return true;
      }
    });

    // Find plans user doesn't have
    const userPlanIds = new Set(userInvestments.map(inv => inv.planId));
    const newPlans = suitablePlans.filter(plan => !userPlanIds.has(plan.id));

    if (newPlans.length > 0) {
      const topPlan = newPlans.sort((a, b) => parseFloat(b.apyRate) - parseFloat(a.apyRate))[0];
      
      recommendations.push({
        type: 'new_investment',
        title: `Consider ${topPlan.name}`,
        description: `Based on your ${riskTolerance} risk profile, this plan offers attractive returns with appropriate risk levels.`,
        actionItems: [
          `Invest in ${topPlan.name} with ${topPlan.apyRate}% APY`,
          `Minimum investment: $${topPlan.minimumAmount}`,
          `Duration: ${topPlan.durationDays} days`,
        ],
        expectedImpact: {
          roi: parseFloat(topPlan.apyRate),
          risk: riskTolerance === 'conservative' ? 'low' : riskTolerance === 'moderate' ? 'medium' : 'high',
          timeframe: `${topPlan.durationDays} days`,
        },
        confidence: 0.78,
      });
    }

    return recommendations;
  }

  private static async generateGoalBasedRecommendations(userId: number): Promise<AIRecommendationData[]> {
    // Mock implementation for goal-based recommendations
    return [
      {
        type: 'goal_adjustment',
        title: 'Emergency Fund Progress',
        description: 'You\'re making good progress on your emergency fund goal. Consider increasing contributions to reach your target faster.',
        actionItems: [
          'Increase monthly contribution by $200',
          'Consider auto-investing feature',
          'Review goal timeline and adjust if needed',
        ],
        expectedImpact: {
          roi: 8,
          risk: 'low',
          timeframe: '6 months',
        },
        confidence: 0.92,
      },
    ];
  }

  private static async identifyCompoundingOpportunities(
    userInvestments: Investment[]
  ): Promise<AIRecommendationData | null> {
    const eligibleInvestments = userInvestments.filter(inv => {
      const returns = parseFloat(inv.currentReturns);
      return returns >= 50; // Minimum threshold for compounding
    });

    if (eligibleInvestments.length > 0) {
      const totalReturns = eligibleInvestments.reduce(
        (sum, inv) => sum + parseFloat(inv.currentReturns), 
        0
      );
      
      return {
        type: 'portfolio_optimization',
        title: 'Auto-Compounding Opportunity',
        description: `You have $${totalReturns.toFixed(2)} in returns that can be automatically reinvested for compound growth.`,
        actionItems: [
          'Enable auto-compounding on eligible investments',
          'Reinvest returns to maximize compound interest',
          'Set up automatic rebalancing',
        ],
        expectedImpact: {
          roi: 25,
          risk: 'low',
          timeframe: '1 year',
        },
        confidence: 0.95,
      };
    }

    return null;
  }

  private static generateAIAllocationStrategy(
    category: string,
    riskLevel: 'low' | 'medium' | 'high'
  ): SmartPoolStrategy {
    // Simplified AI allocation strategy
    const baseAllocation = {
      conservative: 40,
      moderate: 35,
      growth: 25,
    };

    // Adjust based on risk level
    if (riskLevel === 'high') {
      baseAllocation.growth += 20;
      baseAllocation.conservative -= 15;
      baseAllocation.moderate -= 5;
    } else if (riskLevel === 'low') {
      baseAllocation.conservative += 20;
      baseAllocation.growth -= 15;
      baseAllocation.moderate -= 5;
    }

    return {
      allocation: baseAllocation,
      rebalanceFrequency: 'monthly',
      riskParameters: {
        maxVolatility: riskLevel === 'high' ? 25 : riskLevel === 'medium' ? 15 : 8,
        maxDrawdown: riskLevel === 'high' ? 20 : riskLevel === 'medium' ? 12 : 6,
        diversificationScore: 0.8,
      },
      performanceTargets: {
        expectedReturn: riskLevel === 'high' ? 18 : riskLevel === 'medium' ? 12 : 8,
        minReturn: riskLevel === 'high' ? 10 : riskLevel === 'medium' ? 6 : 4,
        maxReturn: riskLevel === 'high' ? 25 : riskLevel === 'medium' ? 18 : 12,
      },
    };
  }

  private static calculatePoolExpectedAPY(
    strategy: SmartPoolStrategy,
    riskLevel: 'low' | 'medium' | 'high'
  ): number {
    return strategy.performanceTargets.expectedReturn;
  }

  private static calculateOptimalAllocation(
    currentAllocation: any[],
    availablePlans: InvestmentPlan[]
  ): any[] {
    // Simplified optimal allocation algorithm
    return currentAllocation.map(alloc => ({
      ...alloc,
      allocation: 1.0 / currentAllocation.length, // Equal weight for simplicity
    }));
  }

  private static calculateExpectedImprovement(
    current: any[],
    optimal: any[]
  ): number {
    // Simplified calculation - returns percentage improvement
    return 12.5; // Mock 12.5% improvement
  }
}