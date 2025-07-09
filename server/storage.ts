import { 
  users, 
  investmentPlans, 
  investments, 
  transactions, 
  portfolioHistory,
  type User, 
  type InsertUser,
  type InvestmentPlan,
  type InsertInvestmentPlan,
  type Investment,
  type InsertInvestment,
  type Transaction,
  type InsertTransaction,
  type PortfolioHistory,
  type InsertPortfolioHistory
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserBalance(userId: number, balance: string): Promise<User | undefined>;
  
  // Investment Plan methods
  getInvestmentPlans(): Promise<InvestmentPlan[]>;
  getInvestmentPlan(id: number): Promise<InvestmentPlan | undefined>;
  createInvestmentPlan(plan: InsertInvestmentPlan): Promise<InvestmentPlan>;
  
  // Investment methods
  getUserInvestments(userId: number): Promise<Investment[]>;
  getInvestment(id: number): Promise<Investment | undefined>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  updateInvestmentReturns(id: number, returns: string): Promise<Investment | undefined>;
  
  // Transaction methods
  getUserTransactions(userId: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  // Portfolio methods
  getUserPortfolioHistory(userId: number): Promise<PortfolioHistory[]>;
  addPortfolioHistory(history: InsertPortfolioHistory): Promise<PortfolioHistory>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private investmentPlans: Map<number, InvestmentPlan>;
  private investments: Map<number, Investment>;
  private transactions: Map<number, Transaction>;
  private portfolioHistory: Map<number, PortfolioHistory>;
  private currentUserId: number;
  private currentPlanId: number;
  private currentInvestmentId: number;
  private currentTransactionId: number;
  private currentHistoryId: number;

  constructor() {
    this.users = new Map();
    this.investmentPlans = new Map();
    this.investments = new Map();
    this.transactions = new Map();
    this.portfolioHistory = new Map();
    this.currentUserId = 1;
    this.currentPlanId = 1;
    this.currentInvestmentId = 1;
    this.currentTransactionId = 1;
    this.currentHistoryId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Create default user
    const defaultUser: User = {
      id: this.currentUserId++,
      username: "john_investor",
      email: "john@example.com",
      password: "hashed_password",
      firstName: "John",
      lastName: "Investor",
      balance: "15420.00",
      totalInvested: "112000.00",
      totalReturns: "15543.89",
      planType: "premium",
      isActive: true,
      createdAt: new Date(),
    };
    this.users.set(defaultUser.id, defaultUser);

    // Create investment plans
    const plans: InvestmentPlan[] = [
      {
        id: this.currentPlanId++,
        name: "Starter Plan",
        description: "Perfect for beginners looking to start their investment journey",
        apyRate: "5.2",
        minimumAmount: "500.00",
        maximumAmount: "10000.00",
        durationDays: 30,
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentPlanId++,
        name: "Professional Plan",
        description: "Advanced investment opportunities for experienced investors",
        apyRate: "8.7",
        minimumAmount: "5000.00",
        maximumAmount: "100000.00",
        durationDays: 90,
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentPlanId++,
        name: "VIP Plan",
        description: "Exclusive high-yield investment plan for VIP members",
        apyRate: "12.5",
        minimumAmount: "25000.00",
        maximumAmount: "500000.00",
        durationDays: 180,
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentPlanId++,
        name: "Premium Plus",
        description: "Premium investment plan with enhanced returns and flexible terms",
        apyRate: "15.8",
        minimumAmount: "10000.00",
        maximumAmount: "250000.00",
        durationDays: 120,
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentPlanId++,
        name: "Elite Growth",
        description: "Elite tier investment with maximum growth potential",
        apyRate: "18.2",
        minimumAmount: "50000.00",
        maximumAmount: "1000000.00",
        durationDays: 365,
        isActive: true,
        createdAt: new Date(),
      },
    ];
    plans.forEach(plan => this.investmentPlans.set(plan.id, plan));

    // Create sample investments
    const now = new Date();
    const sampleInvestments: Investment[] = [
      {
        id: this.currentInvestmentId++,
        userId: defaultUser.id,
        planId: 2, // Professional Plan
        amount: "5000.00",
        currentReturns: "287.50",
        status: "active",
        startDate: new Date(now.getTime() - 58 * 24 * 60 * 60 * 1000), // 58 days ago
        endDate: new Date(now.getTime() + 32 * 24 * 60 * 60 * 1000), // 32 days from now
        createdAt: new Date(now.getTime() - 58 * 24 * 60 * 60 * 1000),
      },
      {
        id: this.currentInvestmentId++,
        userId: defaultUser.id,
        planId: 1, // Starter Plan
        amount: "1500.00",
        currentReturns: "65.00",
        status: "active",
        startDate: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
        endDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        createdAt: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000),
      },
    ];
    sampleInvestments.forEach(inv => this.investments.set(inv.id, inv));

    // Create sample transactions
    const sampleTransactions: Transaction[] = [
      {
        id: this.currentTransactionId++,
        userId: defaultUser.id,
        investmentId: 1,
        type: "investment",
        amount: "5000.00",
        description: "Investment Deposit - Professional Plan",
        status: "completed",
        createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        id: this.currentTransactionId++,
        userId: defaultUser.id,
        investmentId: 2,
        type: "profit",
        amount: "124.50",
        description: "Profit Earned - Starter Plan",
        status: "completed",
        createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000), // 1 day ago
      },
      {
        id: this.currentTransactionId++,
        userId: defaultUser.id,
        investmentId: null,
        type: "withdrawal",
        amount: "2500.00",
        description: "Withdrawal - To Bank Account",
        status: "completed",
        createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      },
    ];
    sampleTransactions.forEach(tx => this.transactions.set(tx.id, tx));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      balance: insertUser.balance || "0.00",
      totalInvested: insertUser.totalInvested || "0.00",
      totalReturns: insertUser.totalReturns || "0.00",
      planType: insertUser.planType || "basic",
      isActive: insertUser.isActive !== undefined ? insertUser.isActive : true,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserBalance(userId: number, balance: string): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (user) {
      const updatedUser = { ...user, balance };
      this.users.set(userId, updatedUser);
      return updatedUser;
    }
    return undefined;
  }

  async getInvestmentPlans(): Promise<InvestmentPlan[]> {
    return Array.from(this.investmentPlans.values()).filter(plan => plan.isActive);
  }

  async getInvestmentPlan(id: number): Promise<InvestmentPlan | undefined> {
    return this.investmentPlans.get(id);
  }

  async createInvestmentPlan(insertPlan: InsertInvestmentPlan): Promise<InvestmentPlan> {
    const id = this.currentPlanId++;
    const plan: InvestmentPlan = { 
      ...insertPlan, 
      id,
      isActive: insertPlan.isActive !== undefined ? insertPlan.isActive : true,
      createdAt: new Date(),
    };
    this.investmentPlans.set(id, plan);
    return plan;
  }

  async getUserInvestments(userId: number): Promise<Investment[]> {
    return Array.from(this.investments.values()).filter(inv => inv.userId === userId);
  }

  async getInvestment(id: number): Promise<Investment | undefined> {
    return this.investments.get(id);
  }

  async createInvestment(insertInvestment: InsertInvestment): Promise<Investment> {
    const id = this.currentInvestmentId++;
    const plan = await this.getInvestmentPlan(insertInvestment.planId);
    if (!plan) throw new Error("Investment plan not found");
    
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + plan.durationDays * 24 * 60 * 60 * 1000);
    
    const investment: Investment = { 
      ...insertInvestment, 
      id,
      status: insertInvestment.status || "active",
      currentReturns: insertInvestment.currentReturns || "0.00",
      endDate,
      startDate,
      createdAt: new Date(),
    };
    this.investments.set(id, investment);
    return investment;
  }

  async updateInvestmentReturns(id: number, returns: string): Promise<Investment | undefined> {
    const investment = this.investments.get(id);
    if (investment) {
      const updatedInvestment = { ...investment, currentReturns: returns };
      this.investments.set(id, updatedInvestment);
      return updatedInvestment;
    }
    return undefined;
  }

  async getUserTransactions(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter(tx => tx.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentTransactionId++;
    const transaction: Transaction = { 
      ...insertTransaction, 
      id,
      status: insertTransaction.status || "completed",
      investmentId: insertTransaction.investmentId || null,
      createdAt: new Date(),
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getUserPortfolioHistory(userId: number): Promise<PortfolioHistory[]> {
    return Array.from(this.portfolioHistory.values())
      .filter(history => history.userId === userId)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  async addPortfolioHistory(insertHistory: InsertPortfolioHistory): Promise<PortfolioHistory> {
    const id = this.currentHistoryId++;
    const history: PortfolioHistory = { 
      ...insertHistory, 
      id,
      date: insertHistory.date || new Date(),
    };
    this.portfolioHistory.set(id, history);
    return history;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user || undefined;
    } catch (error) {
      console.error('Database error in getUser:', error);
      throw new Error('Failed to fetch user');
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user || undefined;
    } catch (error) {
      console.error('Database error in getUserByUsername:', error);
      throw new Error('Failed to fetch user by username');
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.email, email));
      return user || undefined;
    } catch (error) {
      console.error('Database error in getUserByEmail:', error);
      throw new Error('Failed to fetch user by email');
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const [user] = await db
        .insert(users)
        .values(insertUser)
        .returning();
      return user;
    } catch (error) {
      console.error('Database error in createUser:', error);
      throw new Error('Failed to create user');
    }
  }

  async updateUserBalance(userId: number, balance: string): Promise<User | undefined> {
    try {
      const [user] = await db
        .update(users)
        .set({ balance })
        .where(eq(users.id, userId))
        .returning();
      return user || undefined;
    } catch (error) {
      console.error('Database error in updateUserBalance:', error);
      throw new Error('Failed to update user balance');
    }
  }

  async getInvestmentPlans(): Promise<InvestmentPlan[]> {
    try {
      return await db.select().from(investmentPlans);
    } catch (error) {
      console.error('Database error in getInvestmentPlans:', error);
      throw new Error('Failed to fetch investment plans');
    }
  }

  async getInvestmentPlan(id: number): Promise<InvestmentPlan | undefined> {
    try {
      const [plan] = await db.select().from(investmentPlans).where(eq(investmentPlans.id, id));
      return plan || undefined;
    } catch (error) {
      console.error('Database error in getInvestmentPlan:', error);
      throw new Error('Failed to fetch investment plan');
    }
  }

  async createInvestmentPlan(insertPlan: InsertInvestmentPlan): Promise<InvestmentPlan> {
    try {
      const [plan] = await db
        .insert(investmentPlans)
        .values(insertPlan)
        .returning();
      return plan;
    } catch (error) {
      console.error('Database error in createInvestmentPlan:', error);
      throw new Error('Failed to create investment plan');
    }
  }

  async getUserInvestments(userId: number): Promise<Investment[]> {
    try {
      return await db.select().from(investments).where(eq(investments.userId, userId));
    } catch (error) {
      console.error('Database error in getUserInvestments:', error);
      throw new Error('Failed to fetch user investments');
    }
  }

  async getInvestment(id: number): Promise<Investment | undefined> {
    try {
      const [investment] = await db.select().from(investments).where(eq(investments.id, id));
      return investment || undefined;
    } catch (error) {
      console.error('Database error in getInvestment:', error);
      throw new Error('Failed to fetch investment');
    }
  }

  async createInvestment(insertInvestment: InsertInvestment): Promise<Investment> {
    try {
      const [investment] = await db
        .insert(investments)
        .values(insertInvestment)
        .returning();
      return investment;
    } catch (error) {
      console.error('Database error in createInvestment:', error);
      throw new Error('Failed to create investment');
    }
  }

  async updateInvestmentReturns(id: number, returns: string): Promise<Investment | undefined> {
    try {
      const [investment] = await db
        .update(investments)
        .set({ currentReturns: returns })
        .where(eq(investments.id, id))
        .returning();
      return investment || undefined;
    } catch (error) {
      console.error('Database error in updateInvestmentReturns:', error);
      throw new Error('Failed to update investment returns');
    }
  }

  async getUserTransactions(userId: number): Promise<Transaction[]> {
    try {
      return await db.select().from(transactions).where(eq(transactions.userId, userId));
    } catch (error) {
      console.error('Database error in getUserTransactions:', error);
      throw new Error('Failed to fetch user transactions');
    }
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    try {
      const [transaction] = await db
        .insert(transactions)
        .values(insertTransaction)
        .returning();
      return transaction;
    } catch (error) {
      console.error('Database error in createTransaction:', error);
      throw new Error('Failed to create transaction');
    }
  }

  async getUserPortfolioHistory(userId: number): Promise<PortfolioHistory[]> {
    try {
      return await db.select().from(portfolioHistory).where(eq(portfolioHistory.userId, userId));
    } catch (error) {
      console.error('Database error in getUserPortfolioHistory:', error);
      throw new Error('Failed to fetch portfolio history');
    }
  }

  async addPortfolioHistory(insertHistory: InsertPortfolioHistory): Promise<PortfolioHistory> {
    try {
      const [history] = await db
        .insert(portfolioHistory)
        .values(insertHistory)
        .returning();
      return history;
    } catch (error) {
      console.error('Database error in addPortfolioHistory:', error);
      throw new Error('Failed to add portfolio history');
    }
  }
}

export const storage = new DatabaseStorage();
