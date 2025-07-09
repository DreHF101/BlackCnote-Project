/**
 * AI-Powered Financial Recommendation Engine
 * Advanced financial analysis and personalized investment recommendations
 */

import { db } from "./db";
import { users, investments, investmentPlans, transactions, portfolioHistory as portfolioHistoryTable } from "@shared/schema";
import { eq, and, desc, gte, lte, sql } from "drizzle-orm";

export interface FinancialProfile {
  userId: number;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentGoals: string[];
  timeHorizon: number; // months
  monthlyIncome: number;
  monthlyExpenses: number;
  currentSavings: number;
  age: number;
  experience: 'beginner' | 'intermediate' | 'expert';
}

export interface MarketCondition {
  trend: 'bullish' | 'bearish' | 'neutral';
  volatility: 'low' | 'medium' | 'high';
  confidence: number; // 0-1
  factors: string[];
}

export interface FinancialRecommendation {
  id: string;
  type: 'investment' | 'portfolio_rebalance' | 'risk_adjustment' | 'diversification';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  expectedReturn: number;
  riskLevel: number;
  timeframe: string;
  actionItems: string[];
  reasoning: string;
  confidence: number;
  potentialGains: number;
  potentialLosses: number;
  marketFactors: string[];
}

export interface PortfolioAnalysis {
  currentValue: number;
  totalReturn: number;
  annualizedReturn: number;
  volatility: number;
  sharpeRatio: number;
  diversificationScore: number;
  riskScore: number;
  performanceVsBenchmark: number;
  topPerformers: Array<{
    name: string;
    return: number;
    weight: number;
  }>;
  underPerformers: Array<{
    name: string;
    return: number;
    weight: number;
  }>;
}

export interface MarketInsight {
  category: 'trend' | 'opportunity' | 'risk' | 'economic';
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  severity: number; // 1-10
  timeframe: 'immediate' | 'short_term' | 'medium_term' | 'long_term';
  affectedSectors: string[];
  recommendation: string;
}

export class AIFinancialEngine {
  
  /**
   * Generate comprehensive financial recommendations for a user
   */
  static async generateFinancialRecommendations(userId: number): Promise<FinancialRecommendation[]> {
    const [userProfile, portfolioAnalysis, marketConditions] = await Promise.all([
      this.buildUserFinancialProfile(userId),
      this.analyzePortfolioPerformance(userId),
      this.getCurrentMarketConditions()
    ]);

    const recommendations: FinancialRecommendation[] = [];

    // Portfolio optimization recommendations
    const portfolioRecs = await this.generatePortfolioOptimizationRecommendations(
      userProfile, portfolioAnalysis, marketConditions
    );
    recommendations.push(...portfolioRecs);

    // Risk management recommendations
    const riskRecs = await this.generateRiskManagementRecommendations(
      userProfile, portfolioAnalysis
    );
    recommendations.push(...riskRecs);

    // Market opportunity recommendations
    const opportunityRecs = await this.generateMarketOpportunityRecommendations(
      userProfile, marketConditions
    );
    recommendations.push(...opportunityRecs);

    // Tax optimization recommendations
    const taxRecs = await this.generateTaxOptimizationRecommendations(
      userId, portfolioAnalysis
    );
    recommendations.push(...taxRecs);

    // Sort by priority and confidence
    return recommendations.sort((a, b) => {
      const priorityWeight = { critical: 4, high: 3, medium: 2, low: 1 };
      return (priorityWeight[b.priority] * b.confidence) - (priorityWeight[a.priority] * a.confidence);
    });
  }

  /**
   * Build comprehensive financial profile for user
   */
  static async buildUserFinancialProfile(userId: number): Promise<FinancialProfile> {
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user.length) throw new Error('User not found');

    const userInvestments = await db
      .select()
      .from(investments)
      .where(eq(investments.userId, userId));

    const userTransactions = await db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.createdAt))
      .limit(50);

    // Analyze user behavior patterns
    const riskTolerance = this.calculateRiskTolerance(userInvestments, userTransactions);
    const experience = this.assessInvestmentExperience(userInvestments, userTransactions);
    
    return {
      userId,
      riskTolerance,
      investmentGoals: this.extractInvestmentGoals(userInvestments),
      timeHorizon: this.calculateAverageTimeHorizon(userInvestments),
      monthlyIncome: this.estimateMonthlyIncome(userTransactions),
      monthlyExpenses: this.estimateMonthlyExpenses(userTransactions),
      currentSavings: parseFloat(user[0].balance || '0'),
      age: 35, // Default - could be collected from user profile
      experience
    };
  }

  /**
   * Analyze portfolio performance and characteristics
   */
  static async analyzePortfolioPerformance(userId: number): Promise<PortfolioAnalysis> {
    const userInvestments = await db
      .select({
        investment: investments,
        plan: investmentPlans
      })
      .from(investments)
      .leftJoin(investmentPlans, eq(investments.planId, investmentPlans.id))
      .where(eq(investments.userId, userId));

    const portfolioHistoryData = await db
      .select()
      .from(portfolioHistoryTable)
      .where(eq(portfolioHistoryTable.userId, userId))
      .orderBy(desc(portfolioHistoryTable.date))
      .limit(30);

    const currentValue = userInvestments.reduce((sum, inv) => 
      sum + parseFloat(inv.investment.amount) + parseFloat(inv.investment.currentReturns || '0'), 0
    );

    const totalInvested = userInvestments.reduce((sum, inv) => 
      sum + parseFloat(inv.investment.amount), 0
    );

    const totalReturn = currentValue - totalInvested;
    const annualizedReturn = this.calculateAnnualizedReturn(portfolioHistoryData);
    const volatility = this.calculateVolatility(portfolioHistoryData);
    
    return {
      currentValue,
      totalReturn,
      annualizedReturn,
      volatility,
      sharpeRatio: this.calculateSharpeRatio(annualizedReturn, volatility),
      diversificationScore: this.calculateDiversificationScore(userInvestments),
      riskScore: this.calculatePortfolioRiskScore(userInvestments),
      performanceVsBenchmark: annualizedReturn - 8.0, // Compare against 8% benchmark
      topPerformers: this.identifyTopPerformers(userInvestments),
      underPerformers: this.identifyUnderPerformers(userInvestments)
    };
  }

  /**
   * Get current market conditions and trends
   */
  static async getCurrentMarketConditions(): Promise<MarketCondition> {
    // In a real implementation, this would integrate with financial APIs
    // For now, we'll simulate market analysis
    
    const marketFactors = [
      'Economic growth indicators showing steady expansion',
      'Inflation rates stabilizing within target range',
      'Central bank policy supporting liquidity',
      'Geopolitical tensions creating selective volatility',
      'Technology sector showing strong fundamentals'
    ];

    // Simulated market analysis based on various factors
    const volatilityScore = Math.random() * 0.6 + 0.2; // 0.2 to 0.8
    const trendScore = Math.random() * 2 - 1; // -1 to 1
    
    let trend: 'bullish' | 'bearish' | 'neutral';
    if (trendScore > 0.3) trend = 'bullish';
    else if (trendScore < -0.3) trend = 'bearish';
    else trend = 'neutral';

    let volatility: 'low' | 'medium' | 'high';
    if (volatilityScore < 0.4) volatility = 'low';
    else if (volatilityScore < 0.7) volatility = 'medium';
    else volatility = 'high';

    return {
      trend,
      volatility,
      confidence: 0.75 + Math.random() * 0.2, // 0.75 to 0.95
      factors: marketFactors
    };
  }

  /**
   * Generate portfolio optimization recommendations
   */
  private static async generatePortfolioOptimizationRecommendations(
    profile: FinancialProfile,
    analysis: PortfolioAnalysis,
    market: MarketCondition
  ): Promise<FinancialRecommendation[]> {
    const recommendations: FinancialRecommendation[] = [];

    // Diversification recommendation
    if (analysis.diversificationScore < 0.6) {
      recommendations.push({
        id: `diversify-${Date.now()}`,
        type: 'diversification',
        title: 'Improve Portfolio Diversification',
        description: 'Your portfolio shows concentration risk. Consider spreading investments across different plans and risk levels.',
        priority: 'high',
        expectedReturn: 2.5,
        riskLevel: 3,
        timeframe: '1-3 months',
        actionItems: [
          'Allocate 25% to conservative plans',
          'Add medium-risk growth investments',
          'Consider international exposure',
          'Reduce concentration in single plan'
        ],
        reasoning: `Current diversification score: ${(analysis.diversificationScore * 100).toFixed(1)}%. Optimal diversification reduces risk while maintaining returns.`,
        confidence: 0.85,
        potentialGains: analysis.currentValue * 0.15,
        potentialLosses: analysis.currentValue * 0.05,
        marketFactors: market.factors.slice(0, 2)
      });
    }

    // Rebalancing recommendation
    if (Math.abs(analysis.performanceVsBenchmark) > 3) {
      recommendations.push({
        id: `rebalance-${Date.now()}`,
        type: 'portfolio_rebalance',
        title: 'Portfolio Rebalancing Required',
        description: 'Your portfolio allocation has drifted from optimal targets. Rebalancing can improve risk-adjusted returns.',
        priority: 'medium',
        expectedReturn: 1.8,
        riskLevel: 2,
        timeframe: '2-4 weeks',
        actionItems: [
          'Sell overweight positions',
          'Increase allocation to underweight assets',
          'Maintain target risk level',
          'Consider tax implications'
        ],
        reasoning: `Performance vs benchmark: ${analysis.performanceVsBenchmark.toFixed(1)}%. Rebalancing helps maintain optimal risk/return profile.`,
        confidence: 0.78,
        potentialGains: analysis.currentValue * 0.08,
        potentialLosses: analysis.currentValue * 0.02,
        marketFactors: ['Portfolio drift from target allocation', 'Market timing opportunities']
      });
    }

    return recommendations;
  }

  /**
   * Generate risk management recommendations
   */
  private static async generateRiskManagementRecommendations(
    profile: FinancialProfile,
    analysis: PortfolioAnalysis
  ): Promise<FinancialRecommendation[]> {
    const recommendations: FinancialRecommendation[] = [];

    // Risk level adjustment
    const targetRisk = this.getTargetRiskLevel(profile);
    if (Math.abs(analysis.riskScore - targetRisk) > 1.5) {
      const isHighRisk = analysis.riskScore > targetRisk;
      
      recommendations.push({
        id: `risk-adjust-${Date.now()}`,
        type: 'risk_adjustment',
        title: isHighRisk ? 'Reduce Portfolio Risk' : 'Optimize Risk Exposure',
        description: `Your current portfolio risk level (${analysis.riskScore.toFixed(1)}/10) doesn't align with your profile. ${isHighRisk ? 'Consider reducing' : 'You could increase'} risk exposure.`,
        priority: isHighRisk ? 'high' : 'medium',
        expectedReturn: isHighRisk ? -0.5 : 2.2,
        riskLevel: isHighRisk ? -2 : 1,
        timeframe: '3-6 weeks',
        actionItems: isHighRisk ? [
          'Move funds to conservative plans',
          'Reduce position sizes',
          'Add defensive investments',
          'Set stop-loss levels'
        ] : [
          'Gradually increase growth allocation',
          'Add higher-yield investments',
          'Maintain diversification',
          'Monitor risk metrics'
        ],
        reasoning: `Target risk level: ${targetRisk.toFixed(1)}/10 based on your ${profile.riskTolerance} profile and ${profile.timeHorizon}-month horizon.`,
        confidence: 0.82,
        potentialGains: isHighRisk ? analysis.currentValue * 0.03 : analysis.currentValue * 0.12,
        potentialLosses: isHighRisk ? analysis.currentValue * 0.08 : analysis.currentValue * 0.05,
        marketFactors: ['Risk tolerance alignment', 'Time horizon considerations']
      });
    }

    return recommendations;
  }

  /**
   * Generate market opportunity recommendations
   */
  private static async generateMarketOpportunityRecommendations(
    profile: FinancialProfile,
    market: MarketCondition
  ): Promise<FinancialRecommendation[]> {
    const recommendations: FinancialRecommendation[] = [];

    // Market timing opportunities
    if (market.trend === 'bullish' && market.confidence > 0.8) {
      recommendations.push({
        id: `market-opportunity-${Date.now()}`,
        type: 'investment',
        title: 'Capitalize on Bullish Market Trend',
        description: 'Current market conditions favor growth investments. Consider increasing allocation to higher-yield plans.',
        priority: 'medium',
        expectedReturn: 4.2,
        riskLevel: 4,
        timeframe: '1-2 months',
        actionItems: [
          'Increase allocation to growth plans',
          'Consider premium investment tiers',
          'Take advantage of market momentum',
          'Monitor for trend reversal signals'
        ],
        reasoning: `Strong bullish trend with ${(market.confidence * 100).toFixed(0)}% confidence. Market factors support growth strategies.`,
        confidence: market.confidence,
        potentialGains: profile.currentSavings * 0.20,
        potentialLosses: profile.currentSavings * 0.08,
        marketFactors: market.factors
      });
    }

    return recommendations;
  }

  /**
   * Generate tax optimization recommendations
   */
  private static async generateTaxOptimizationRecommendations(
    userId: number,
    analysis: PortfolioAnalysis
  ): Promise<FinancialRecommendation[]> {
    const recommendations: FinancialRecommendation[] = [];

    // Tax efficiency optimization
    if (analysis.totalReturn > 1000) {
      recommendations.push({
        id: `tax-optimize-${Date.now()}`,
        type: 'portfolio_rebalance',
        title: 'Optimize Tax Efficiency',
        description: 'Your portfolio gains can be optimized for tax efficiency. Consider strategic rebalancing and timing.',
        priority: 'low',
        expectedReturn: 1.2,
        riskLevel: 1,
        timeframe: '6-12 months',
        actionItems: [
          'Harvest tax losses where applicable',
          'Consider long-term holding strategies',
          'Optimize withdrawal timing',
          'Review tax-advantaged options'
        ],
        reasoning: `Current unrealized gains: $${analysis.totalReturn.toFixed(2)}. Tax-efficient strategies can improve after-tax returns.`,
        confidence: 0.70,
        potentialGains: analysis.totalReturn * 0.15, // Tax savings
        potentialLosses: 0,
        marketFactors: ['Tax regulation considerations', 'Timing optimization opportunities']
      });
    }

    return recommendations;
  }

  // Helper methods for calculations
  private static calculateRiskTolerance(investments: any[], transactions: any[]): 'conservative' | 'moderate' | 'aggressive' {
    const avgInvestmentSize = investments.reduce((sum, inv) => sum + parseFloat(inv.amount), 0) / investments.length;
    const totalBalance = transactions
      .filter(t => t.type === 'deposit')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const riskRatio = avgInvestmentSize / totalBalance;
    
    if (riskRatio < 0.2) return 'conservative';
    if (riskRatio < 0.5) return 'moderate';
    return 'aggressive';
  }

  private static assessInvestmentExperience(investments: any[], transactions: any[]): 'beginner' | 'intermediate' | 'expert' {
    const totalTransactions = transactions.length;
    const investmentDiversity = new Set(investments.map(inv => inv.planId)).size;
    
    if (totalTransactions < 10 || investmentDiversity < 2) return 'beginner';
    if (totalTransactions < 25 || investmentDiversity < 4) return 'intermediate';
    return 'expert';
  }

  private static extractInvestmentGoals(investments: any[]): string[] {
    const goals = ['capital_growth'];
    
    if (investments.some(inv => parseFloat(inv.amount) > 10000)) {
      goals.push('wealth_building');
    }
    
    if (investments.length > 5) {
      goals.push('diversification');
    }
    
    return goals;
  }

  private static calculateAverageTimeHorizon(investments: any[]): number {
    const avgDuration = investments.reduce((sum, inv) => {
      const duration = Math.max(1, Math.floor((new Date(inv.endDate).getTime() - new Date(inv.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30)));
      return sum + duration;
    }, 0) / investments.length;
    
    return Math.round(avgDuration) || 12;
  }

  private static estimateMonthlyIncome(transactions: any[]): number {
    const deposits = transactions
      .filter(t => t.type === 'deposit')
      .slice(0, 6); // Last 6 months
    
    return deposits.reduce((sum, t) => sum + parseFloat(t.amount), 0) / Math.max(1, deposits.length);
  }

  private static estimateMonthlyExpenses(transactions: any[]): number {
    const withdrawals = transactions
      .filter(t => t.type === 'withdrawal')
      .slice(0, 6);
    
    return withdrawals.reduce((sum, t) => sum + parseFloat(t.amount), 0) / Math.max(1, withdrawals.length);
  }

  private static calculateAnnualizedReturn(history: any[]): number {
    if (history.length < 2) return 0;
    
    const latest = parseFloat(history[0].totalValue);
    const earliest = parseFloat(history[history.length - 1].totalValue);
    const periods = history.length;
    
    return ((latest / earliest) ** (12 / periods) - 1) * 100;
  }

  private static calculateVolatility(history: any[]): number {
    if (history.length < 2) return 0;
    
    const returns = [];
    for (let i = 0; i < history.length - 1; i++) {
      const currentValue = parseFloat(history[i].totalValue);
      const previousValue = parseFloat(history[i + 1].totalValue);
      returns.push((currentValue - previousValue) / previousValue);
    }
    
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
    
    return Math.sqrt(variance) * Math.sqrt(12) * 100; // Annualized
  }

  private static calculateSharpeRatio(annualizedReturn: number, volatility: number): number {
    const riskFreeRate = 2; // 2% risk-free rate
    return volatility > 0 ? (annualizedReturn - riskFreeRate) / volatility : 0;
  }

  private static calculateDiversificationScore(investments: any[]): number {
    const planCounts = new Map();
    investments.forEach(inv => {
      const planId = inv.investment?.planId || inv.planId;
      planCounts.set(planId, (planCounts.get(planId) || 0) + 1);
    });
    
    const uniquePlans = planCounts.size;
    const totalInvestments = investments.length;
    
    // Higher score for more diversification
    return Math.min(uniquePlans / Math.max(totalInvestments * 0.6, 1), 1);
  }

  private static calculatePortfolioRiskScore(investments: any[]): number {
    // Simplified risk scoring based on APY rates
    const avgAPY = investments.reduce((sum, inv) => {
      const apy = parseFloat(inv.plan?.apyRate || inv.investment?.expectedReturn || '10');
      return sum + apy;
    }, 0) / investments.length;
    
    return Math.min(avgAPY / 3, 10); // Scale to 1-10
  }

  private static identifyTopPerformers(investments: any[]): Array<{name: string; return: number; weight: number}> {
    return investments
      .map(inv => ({
        name: inv.plan?.name || 'Investment',
        return: parseFloat(inv.investment?.currentReturns || '0') / parseFloat(inv.investment?.amount || '1') * 100,
        weight: parseFloat(inv.investment?.amount || '0')
      }))
      .sort((a, b) => b.return - a.return)
      .slice(0, 3);
  }

  private static identifyUnderPerformers(investments: any[]): Array<{name: string; return: number; weight: number}> {
    return investments
      .map(inv => ({
        name: inv.plan?.name || 'Investment',
        return: parseFloat(inv.investment?.currentReturns || '0') / parseFloat(inv.investment?.amount || '1') * 100,
        weight: parseFloat(inv.investment?.amount || '0')
      }))
      .sort((a, b) => a.return - b.return)
      .slice(0, 2);
  }

  private static getTargetRiskLevel(profile: FinancialProfile): number {
    let baseRisk = 5; // Moderate baseline
    
    // Adjust for risk tolerance
    if (profile.riskTolerance === 'conservative') baseRisk -= 2;
    if (profile.riskTolerance === 'aggressive') baseRisk += 2;
    
    // Adjust for time horizon
    if (profile.timeHorizon < 6) baseRisk -= 1;
    if (profile.timeHorizon > 24) baseRisk += 1;
    
    // Adjust for age (younger = more risk capacity)
    if (profile.age < 30) baseRisk += 1;
    if (profile.age > 50) baseRisk -= 1;
    
    return Math.max(1, Math.min(10, baseRisk));
  }

  /**
   * Generate market insights and analysis
   */
  static async generateMarketInsights(): Promise<MarketInsight[]> {
    const insights: MarketInsight[] = [
      {
        category: 'trend',
        title: 'Emerging Market Opportunities',
        description: 'Technology and green energy sectors showing strong growth potential with favorable regulatory environments.',
        impact: 'positive',
        severity: 7,
        timeframe: 'medium_term',
        affectedSectors: ['Technology', 'Renewable Energy', 'Infrastructure'],
        recommendation: 'Consider increasing allocation to growth-oriented investment plans that benefit from these trends.'
      },
      {
        category: 'risk',
        title: 'Inflation Pressure Monitoring',
        description: 'Rising inflation expectations may impact fixed-income investments and require portfolio adjustments.',
        impact: 'negative',
        severity: 5,
        timeframe: 'short_term',
        affectedSectors: ['Fixed Income', 'Consumer Goods', 'Utilities'],
        recommendation: 'Maintain exposure to inflation-protected assets and consider reducing duration risk.'
      },
      {
        category: 'opportunity',
        title: 'Volatility Creates Entry Points',
        description: 'Market volatility has created attractive entry points for long-term investors with appropriate risk tolerance.',
        impact: 'positive',
        severity: 6,
        timeframe: 'immediate',
        affectedSectors: ['Equities', 'Growth Investments', 'Alternative Assets'],
        recommendation: 'Dollar-cost averaging into quality investments during volatile periods can enhance long-term returns.'
      },
      {
        category: 'economic',
        title: 'Interest Rate Environment',
        description: 'Central bank policy shifts are creating new dynamics in yield curves and investment returns.',
        impact: 'neutral',
        severity: 8,
        timeframe: 'long_term',
        affectedSectors: ['Banking', 'Real Estate', 'Bonds'],
        recommendation: 'Monitor interest rate sensitivity in portfolio and adjust duration exposure accordingly.'
      }
    ];

    return insights;
  }

  /**
   * Generate personalized financial education content
   */
  static async generateEducationalContent(profile: FinancialProfile): Promise<Array<{
    title: string;
    content: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    category: string;
  }>> {
    const content = [];

    if (profile.experience === 'beginner') {
      content.push({
        title: 'Understanding Investment Risk',
        content: 'Learn how to balance risk and return in your investment portfolio. Risk tolerance varies by individual and should align with your financial goals and time horizon.',
        difficulty: 'beginner' as const,
        category: 'Risk Management'
      });
    }

    if (profile.riskTolerance === 'aggressive') {
      content.push({
        title: 'Advanced Portfolio Optimization',
        content: 'Explore sophisticated strategies for maximizing risk-adjusted returns through diversification, correlation analysis, and dynamic rebalancing.',
        difficulty: 'advanced' as const,
        category: 'Portfolio Strategy'
      });
    }

    content.push({
      title: 'Market Timing vs. Time in Market',
      content: 'Understanding why consistent investing often outperforms attempting to time market movements. Historical data shows the importance of staying invested.',
      difficulty: profile.experience === 'beginner' ? 'beginner' : 'intermediate' as const,
      category: 'Investment Philosophy'
    });

    return content;
  }
}