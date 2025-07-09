import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInvestmentSchema, insertTransactionSchema } from "@shared/schema";
import { registerHYIPLabRoutes } from "./hyiplab-integration";
import { paymentRoutes } from "./payment-routes";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes (simplified for demo)
  app.get("/api/user/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Investment Plans
  app.get("/api/investment-plans", async (req, res) => {
    try {
      const plans = await storage.getInvestmentPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // User Investments
  app.get("/api/users/:userId/investments", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const investments = await storage.getUserInvestments(userId);
      res.json(investments);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/investments", async (req, res) => {
    try {
      const validatedData = insertInvestmentSchema.parse(req.body);
      
      // Check if user has sufficient balance
      const user = await storage.getUser(validatedData.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const userBalance = parseFloat(user.balance);
      const investmentAmount = parseFloat(validatedData.amount);
      
      if (userBalance < investmentAmount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
      
      // Create investment
      const investment = await storage.createInvestment(validatedData);
      
      // Update user balance
      const newBalance = (userBalance - investmentAmount).toFixed(2);
      await storage.updateUserBalance(validatedData.userId, newBalance);
      
      // Create transaction record
      await storage.createTransaction({
        userId: validatedData.userId,
        investmentId: investment.id,
        type: "investment",
        amount: validatedData.amount,
        description: `New investment in plan ${validatedData.planId}`,
        status: "completed",
      });
      
      res.status(201).json(investment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Transactions
  app.get("/api/users/:userId/transactions", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const transactions = await storage.getUserTransactions(userId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const validatedData = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(validatedData);
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Portfolio data
  app.get("/api/users/:userId/portfolio", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const user = await storage.getUser(userId);
      const investments = await storage.getUserInvestments(userId);
      const transactions = await storage.getUserTransactions(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Calculate portfolio metrics
      const activeInvestments = investments.filter(inv => inv.status === "active");
      const totalInvested = investments.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
      const totalReturns = investments.reduce((sum, inv) => sum + parseFloat(inv.currentReturns), 0);
      const totalPortfolio = parseFloat(user.balance) + totalInvested + totalReturns;
      
      // Generate portfolio history for chart (mock data for demo)
      const portfolioHistory = [];
      const baseValue = 95000;
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      for (let i = 0; i < 12; i++) {
        portfolioHistory.push({
          month: months[i],
          value: baseValue + (i * 2500) + Math.random() * 1000
        });
      }
      
      res.json({
        user,
        portfolio: {
          total: totalPortfolio.toFixed(2),
          balance: user.balance,
          totalInvested: totalInvested.toFixed(2),
          totalReturns: totalReturns.toFixed(2),
          activeInvestments: activeInvestments.length,
        },
        portfolioHistory,
        recentTransactions: transactions.slice(0, 5),
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Investment calculator
  app.post("/api/calculate-investment", async (req, res) => {
    try {
      const { amount, planId } = req.body;
      const plan = await storage.getInvestmentPlan(planId);
      
      if (!plan) {
        return res.status(404).json({ message: "Investment plan not found" });
      }
      
      const investmentAmount = parseFloat(amount);
      const apyRate = parseFloat(plan.apyRate) / 100;
      const durationInYears = plan.durationDays / 365;
      
      const estimatedReturn = (investmentAmount * apyRate * durationInYears).toFixed(2);
      const totalReturn = (investmentAmount + parseFloat(estimatedReturn)).toFixed(2);
      
      res.json({
        investmentAmount: investmentAmount.toFixed(2),
        estimatedReturn,
        totalReturn,
        apyRate: plan.apyRate,
        duration: plan.durationDays,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Register HYIPLab integration routes
  registerHYIPLabRoutes(app);

  // Register payment routes
  app.use("/api", paymentRoutes);

  const httpServer = createServer(app);
  return httpServer;
}
