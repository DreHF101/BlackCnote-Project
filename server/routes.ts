import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInvestmentSchema, insertTransactionSchema } from "@shared/schema";
import { registerHYIPLabRoutes } from "./hyiplab-integration";
import { registerAIAndSecurityRoutes } from "./ai-security-routes";
import { paymentRoutes } from "./payment-routes";
import { hyipLabPaymentService } from "./hyiplab-payment-service";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes (simplified for demo)
  app.get("/api/users/:id", async (req, res) => {
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

  // Register all route modules
  registerHYIPLabRoutes(app);
  registerAIAndSecurityRoutes(app);
  
  // Register payment routes
  app.use("/api", paymentRoutes);

  // HYIPLab-compatible payment gateway routes
  app.get("/api/hyiplab/payment-gateways", async (req, res) => {
    try {
      const gateways = await hyipLabPaymentService.getAvailableGateways();
      res.json({
        success: true,
        data: gateways,
        message: 'Payment gateways retrieved successfully'
      });
    } catch (error: any) {
      console.error('Error fetching HYIPLab gateways:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch payment gateways'
      });
    }
  });

  app.post("/api/hyiplab/deposit", async (req, res) => {
    try {
      const { gateway, amount, currency = 'USD' } = req.body;
      
      if (!gateway || !amount) {
        return res.status(400).json({
          success: false,
          message: 'Gateway and amount are required'
        });
      }

      // Calculate fees
      const fees = hyipLabPaymentService.calculateGatewayFees(gateway, amount);
      
      // Prepare HYIPLab deposit data
      const depositData = {
        gateway,
        method_code: 1,
        amount: amount,
        charge: fees.total_charge,
        rate: fees.gateway_rate,
        final_amo: fees.final_amount,
        usd_amo: fees.final_amount,
        trx: '',
        success_url: `${req.protocol}://${req.get('host')}/payment-success`,
        failed_url: `${req.protocol}://${req.get('host')}/payment-failed`,
        cancel_url: `${req.protocol}://${req.get('host')}/payment-cancelled`
      };

      const result = await hyipLabPaymentService.processDeposit(gateway, depositData);
      
      res.json({
        success: result.success,
        message: result.message,
        data: {
          redirect_url: result.redirect_url,
          payment_data: result.payment_data,
          transaction_id: result.transaction_id,
          fees: fees
        }
      });
    } catch (error: any) {
      console.error('HYIPLab deposit error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Deposit processing failed'
      });
    }
  });

  app.get("/api/hyiplab/transactions", async (req, res) => {
    try {
      const userId = req.query.user_id ? parseInt(req.query.user_id as string) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      
      const transactions = await hyipLabPaymentService.getTransactionHistory(userId, limit);
      
      res.json({
        success: true,
        data: transactions,
        message: 'Transaction history retrieved successfully'
      });
    } catch (error: any) {
      console.error('HYIPLab transaction history error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve transaction history'
      });
    }
  });

  // Register AI routes
  const { registerAIRoutes } = await import('./ai-routes');
  registerAIRoutes(app);
  
  // Register Security routes
  const { registerSecurityRoutes } = await import('./security-routes');
  registerSecurityRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
