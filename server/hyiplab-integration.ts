import { Express } from 'express';
import { db } from './db';
import { 
  investmentPlans, 
  investments, 
  transactions, 
  users,
  type InvestmentPlan,
  type Investment,
  type Transaction
} from '../shared/schema';
import { eq, and, gte, lte, desc } from 'drizzle-orm';

/**
 * HYIPLab Integration for BlackCnote
 * 
 * This module provides enhanced integration between HYIPLab plugin functionality
 * and the BlackCnote React/TypeScript architecture while maintaining compatibility
 * with existing WordPress HYIPLab installations.
 */

export interface HYIPLabPlan {
  id: number;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  profitRate: number;
  duration: number;
  status: 'active' | 'inactive';
  color?: string;
  featured?: boolean;
}

export interface HYIPLabInvestment {
  id: number;
  userId: number;
  planId: number;
  amount: number;
  profitRate: number;
  totalProfit: number;
  status: 'active' | 'completed' | 'cancelled';
  startDate: Date;
  endDate: Date;
  lastPayout?: Date;
}

export interface HYIPLabTransaction {
  id: number;
  userId: number;
  type: 'deposit' | 'withdrawal' | 'investment' | 'profit' | 'referral';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  gateway?: string;
  referenceId?: string;
}

export interface HYIPLabUserStats {
  totalInvested: number;
  totalProfit: number;
  activeInvestments: number;
  totalReferrals: number;
  referralEarnings: number;
  pendingWithdrawals: number;
}

export class HYIPLabIntegration {
  
  /**
   * Convert BlackCnote investment plan to HYIPLab format
   */
  static mapToHYIPLabPlan(plan: InvestmentPlan): HYIPLabPlan {
    return {
      id: plan.id,
      name: plan.name,
      description: plan.description,
      minAmount: parseFloat(plan.minimumAmount),
      maxAmount: parseFloat(plan.maximumAmount),
      profitRate: parseFloat(plan.apyRate),
      duration: plan.durationDays,
      status: plan.isActive ? 'active' : 'inactive',
      featured: plan.isActive // Treat active plans as featured for now
    };
  }

  /**
   * Convert BlackCnote investment to HYIPLab format
   */
  static mapToHYIPLabInvestment(investment: Investment & { plan?: InvestmentPlan }): HYIPLabInvestment {
    const startDate = new Date(investment.startDate);
    const endDate = new Date(investment.endDate);
    
    return {
      id: investment.id,
      userId: investment.userId,
      planId: investment.planId,
      amount: parseFloat(investment.amount),
      profitRate: investment.plan ? parseFloat(investment.plan.apyRate) : 0,
      totalProfit: parseFloat(investment.currentReturns),
      status: investment.status as 'active' | 'completed' | 'cancelled',
      startDate,
      endDate
    };
  }

  /**
   * Convert BlackCnote transaction to HYIPLab format
   */
  static mapToHYIPLabTransaction(transaction: Transaction): HYIPLabTransaction {
    return {
      id: transaction.id,
      userId: transaction.userId,
      type: transaction.type as any,
      amount: parseFloat(transaction.amount),
      description: transaction.description,
      status: 'completed', // Assume completed for existing transactions
      createdAt: new Date(transaction.createdAt)
    };
  }

  /**
   * Calculate user statistics in HYIPLab format
   */
  static async calculateUserStats(userId: number): Promise<HYIPLabUserStats> {
    try {
      // Get user investments
      const userInvestments = await db
        .select()
        .from(investments)
        .where(eq(investments.userId, userId));

      // Get user transactions
      const userTransactions = await db
        .select()
        .from(transactions)
        .where(eq(transactions.userId, userId));

      const totalInvested = userInvestments
        .filter(inv => inv.status === 'active')
        .reduce((sum, inv) => sum + parseFloat(inv.amount), 0);

      const totalProfit = userInvestments
        .reduce((sum, inv) => sum + parseFloat(inv.currentReturns), 0);

      const activeInvestments = userInvestments
        .filter(inv => inv.status === 'active').length;

      // For now, set referral stats to 0 - can be enhanced later
      const totalReferrals = 0;
      const referralEarnings = 0;
      const pendingWithdrawals = 0;

      return {
        totalInvested,
        totalProfit,
        activeInvestments,
        totalReferrals,
        referralEarnings,
        pendingWithdrawals
      };
    } catch (error) {
      console.error('Error calculating user stats:', error);
      return {
        totalInvested: 0,
        totalProfit: 0,
        activeInvestments: 0,
        totalReferrals: 0,
        referralEarnings: 0,
        pendingWithdrawals: 0
      };
    }
  }

  /**
   * Enhanced investment calculator with HYIPLab compatibility
   */
  static calculateInvestmentReturns(
    amount: number, 
    profitRate: number, 
    duration: number, 
    compounding: 'daily' | 'weekly' | 'monthly' = 'daily'
  ) {
    const principal = amount;
    const rate = profitRate / 100;
    
    let periods: number;
    let periodicRate: number;
    
    switch (compounding) {
      case 'weekly':
        periods = Math.floor(duration / 7);
        periodicRate = rate / 52; // Weekly rate
        break;
      case 'monthly':
        periods = Math.floor(duration / 30);
        periodicRate = rate / 12; // Monthly rate
        break;
      default: // daily
        periods = duration;
        periodicRate = rate / 365; // Daily rate
    }

    // Compound interest calculation
    const compoundAmount = principal * Math.pow(1 + periodicRate, periods);
    const totalProfit = compoundAmount - principal;
    const dailyProfit = totalProfit / duration;

    return {
      principal,
      totalAmount: compoundAmount,
      totalProfit,
      dailyProfit,
      profitRate,
      duration,
      compounding
    };
  }

  /**
   * Generate demo data for development with HYIPLab structure
   */
  static generateDemoData() {
    const demoPlans: HYIPLabPlan[] = [
      {
        id: 1,
        name: "Starter Plan",
        description: "Perfect for beginners with guaranteed returns",
        minAmount: 10,
        maxAmount: 999,
        profitRate: 1.5,
        duration: 7,
        status: 'active',
        color: '#4CAF50',
        featured: true
      },
      {
        id: 2,
        name: "Professional Plan",
        description: "Enhanced returns for experienced investors",
        minAmount: 1000,
        maxAmount: 9999,
        profitRate: 2.5,
        duration: 14,
        status: 'active',
        color: '#2196F3',
        featured: true
      },
      {
        id: 3,
        name: "Premium Plan",
        description: "Maximum returns for high-value investments",
        minAmount: 10000,
        maxAmount: 100000,
        profitRate: 4.0,
        duration: 30,
        status: 'active',
        color: '#FF9800',
        featured: true
      }
    ];

    const demoStats: HYIPLabUserStats = {
      totalInvested: 15000,
      totalProfit: 2750,
      activeInvestments: 3,
      totalReferrals: 12,
      referralEarnings: 450,
      pendingWithdrawals: 0
    };

    return { demoPlans, demoStats };
  }
}

/**
 * Register HYIPLab-compatible API routes
 */
export function registerHYIPLabRoutes(app: Express) {
  
  // Get investment plans (HYIPLab compatible)
  app.get('/api/hyiplab/plans', async (req, res) => {
    try {
      const plans = await db.select().from(investmentPlans);
      const hyipLabPlans = plans.map(plan => HYIPLabIntegration.mapToHYIPLabPlan(plan));
      
      res.json({
        success: true,
        data: hyipLabPlans,
        message: 'Investment plans retrieved successfully'
      });
    } catch (error) {
      console.error('Error fetching HYIPLab plans:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch investment plans'
      });
    }
  });

  // Get user dashboard data (HYIPLab compatible)
  app.get('/api/hyiplab/dashboard/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      // Get user stats
      const stats = await HYIPLabIntegration.calculateUserStats(userId);
      
      // Get recent investments
      const userInvestments = await db
        .select()
        .from(investments)
        .where(eq(investments.userId, userId))
        .limit(5);

      // Get recent transactions
      const userTransactions = await db
        .select()
        .from(transactions)
        .where(eq(transactions.userId, userId))
        .orderBy(desc(transactions.createdAt))
        .limit(10);

      const hyipLabInvestments = userInvestments.map(inv => 
        HYIPLabIntegration.mapToHYIPLabInvestment(inv)
      );
      
      const hyipLabTransactions = userTransactions.map(txn => 
        HYIPLabIntegration.mapToHYIPLabTransaction(txn)
      );

      res.json({
        success: true,
        data: {
          stats,
          investments: hyipLabInvestments,
          transactions: hyipLabTransactions
        },
        message: 'Dashboard data retrieved successfully'
      });
    } catch (error) {
      console.error('Error fetching HYIPLab dashboard:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch dashboard data'
      });
    }
  });

  // Investment calculator (HYIPLab compatible)
  app.post('/api/hyiplab/calculate', async (req, res) => {
    try {
      const { amount, planId, customDuration, compounding = 'daily' } = req.body;
      
      if (!amount || !planId) {
        return res.status(400).json({
          success: false,
          message: 'Amount and plan ID are required'
        });
      }

      // Get plan details
      const [plan] = await db
        .select()
        .from(investmentPlans)
        .where(eq(investmentPlans.id, planId));

      if (!plan) {
        return res.status(404).json({
          success: false,
          message: 'Investment plan not found'
        });
      }

      const duration = customDuration || plan.durationDays;
      const profitRate = parseFloat(plan.apyRate);

      const calculation = HYIPLabIntegration.calculateInvestmentReturns(
        parseFloat(amount),
        profitRate,
        duration,
        compounding
      );

      res.json({
        success: true,
        data: calculation,
        message: 'Investment calculation completed'
      });
    } catch (error) {
      console.error('Error calculating investment:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to calculate investment returns'
      });
    }
  });

  // Get demo data for development
  app.get('/api/hyiplab/demo', (req, res) => {
    const demoData = HYIPLabIntegration.generateDemoData();
    res.json({
      success: true,
      data: demoData,
      message: 'Demo data retrieved successfully'
    });
  });
}