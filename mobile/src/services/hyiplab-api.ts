import { ApiService } from './api';

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

export interface HYIPLabUserStats {
  totalInvested: number;
  totalProfit: number;
  activeInvestments: number;
  totalReferrals: number;
  referralEarnings: number;
  pendingWithdrawals: number;
}

export interface HYIPLabCalculationResult {
  principal: number;
  totalAmount: number;
  totalProfit: number;
  dailyProfit: number;
  profitRate: number;
  duration: number;
  compounding: string;
}

export class HYIPLabApiService extends ApiService {
  /**
   * Get investment plans
   */
  async getInvestmentPlans(): Promise<HYIPLabPlan[]> {
    const response = await this.request<{ data: HYIPLabPlan[] }>('/api/hyiplab/plans');
    return response.data;
  }

  /**
   * Get demo data for development
   */
  async getDemoData(): Promise<{ demoPlans: HYIPLabPlan[]; demoStats: HYIPLabUserStats }> {
    const response = await this.request<{ data: { demoPlans: HYIPLabPlan[]; demoStats: HYIPLabUserStats } }>('/api/hyiplab/demo');
    return response.data;
  }

  /**
   * Calculate investment returns
   */
  async calculateInvestment(
    amount: number,
    planId: number,
    customDuration?: number,
    compounding: 'daily' | 'weekly' | 'monthly' = 'daily'
  ): Promise<HYIPLabCalculationResult> {
    const response = await this.request<{ data: HYIPLabCalculationResult }>('/api/hyiplab/calculate', {
      method: 'POST',
      body: JSON.stringify({
        amount,
        planId,
        customDuration,
        compounding
      })
    });
    return response.data;
  }

  /**
   * Get user dashboard data
   */
  async getUserDashboard(userId: number): Promise<{
    stats: HYIPLabUserStats;
    investments: HYIPLabInvestment[];
    transactions: any[];
  }> {
    const response = await this.request<{ 
      data: {
        stats: HYIPLabUserStats;
        investments: HYIPLabInvestment[];
        transactions: any[];
      } 
    }>(`/api/hyiplab/dashboard/${userId}`);
    return response.data;
  }

  /**
   * Create new investment
   */
  async createInvestment(planId: number, amount: number): Promise<HYIPLabInvestment> {
    const response = await this.request<{ data: HYIPLabInvestment }>('/api/investments', {
      method: 'POST',
      body: JSON.stringify({
        planId,
        amount: amount.toString(),
        startDate: new Date().toISOString(),
        status: 'active'
      })
    });
    return response.data;
  }

  /**
   * Get user investments
   */
  async getUserInvestments(userId: number): Promise<HYIPLabInvestment[]> {
    const response = await this.request<HYIPLabInvestment[]>(`/api/users/${userId}/investments`);
    return response;
  }

  /**
   * Get user transactions
   */
  async getUserTransactions(userId: number): Promise<any[]> {
    const response = await this.request<any[]>(`/api/users/${userId}/transactions`);
    return response;
  }

  /**
   * Get platform statistics
   */
  async getPlatformStats(): Promise<{
    totalUsers: number;
    totalInvested: number;
    totalPaid: number;
    activeInvestments: number;
  }> {
    // Return demo stats for now - can be enhanced with real endpoint
    return {
      totalUsers: 2547,
      totalInvested: 1250000,
      totalPaid: 187500,
      activeInvestments: 1423
    };
  }
}

export const hyipLabApi = new HYIPLabApiService();