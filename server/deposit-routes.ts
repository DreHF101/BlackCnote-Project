/**
 * Deposit Routes
 * Complete deposit system with multiple payment gateways and instant crediting
 */

import type { Express } from "express";
import { z } from "zod";
import { storage } from "./storage";
import { authenticateToken } from "./auth-routes";

// Validation schemas
const depositSchema = z.object({
  userId: z.number(),
  amount: z.string().refine(val => parseFloat(val) >= 10, "Minimum deposit is $10"),
  gateway: z.enum(["stripe", "paypal", "crypto", "bank"]),
  currency: z.string().default("USD")
});

// Deposit configuration
const depositConfig = {
  stripe: {
    minAmount: 10,
    maxAmount: 50000,
    fee: 0.029, // 2.9%
    processingTime: "Instant"
  },
  paypal: {
    minAmount: 10,
    maxAmount: 25000,
    fee: 0.035, // 3.5%
    processingTime: "Instant"
  },
  crypto: {
    minAmount: 10,
    maxAmount: 100000,
    fee: 0.01, // 1%
    processingTime: "5-30 minutes"
  },
  bank: {
    minAmount: 100,
    maxAmount: 500000,
    fee: 0, // Free
    processingTime: "1-3 business days"
  }
};

export function registerDepositRoutes(app: Express): void {

  // Create deposit request
  app.post("/api/deposits", authenticateToken, async (req, res) => {
    try {
      const validatedData = depositSchema.parse(req.body);
      const userId = (req as any).user.userId;

      // Security check: ensure user can only deposit for themselves
      if (validatedData.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized deposit request" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const amount = parseFloat(validatedData.amount);
      const config = depositConfig[validatedData.gateway as keyof typeof depositConfig];

      // Validate amount limits
      if (amount < config.minAmount) {
        return res.status(400).json({ 
          message: `Minimum deposit for ${validatedData.gateway} is $${config.minAmount}` 
        });
      }

      if (amount > config.maxAmount) {
        return res.status(400).json({ 
          message: `Maximum deposit for ${validatedData.gateway} is $${config.maxAmount}` 
        });
      }

      // Calculate fees and net amount
      const fee = amount * config.fee;
      const netAmount = amount - fee;

      // For demo purposes, simulate instant processing for most gateways
      const isInstant = validatedData.gateway !== "bank";

      if (isInstant) {
        // Credit the account immediately
        const currentBalance = parseFloat(user.balance);
        const newBalance = (currentBalance + netAmount).toFixed(2);
        await storage.updateUserBalance(userId, newBalance);

        // Create transaction record
        await storage.createTransaction({
          userId,
          type: "deposit",
          amount: netAmount.toFixed(2),
          description: `Deposit via ${validatedData.gateway}`,
          status: "completed"
        });

        res.json({
          message: "Deposit completed successfully",
          deposit: {
            amount: validatedData.amount,
            netAmount: netAmount.toFixed(2),
            fee: fee.toFixed(2),
            gateway: validatedData.gateway,
            status: "completed",
            processingTime: config.processingTime
          }
        });
      } else {
        // For bank transfers, create pending transaction
        await storage.createTransaction({
          userId,
          type: "deposit",
          amount: netAmount.toFixed(2),
          description: `Pending deposit via ${validatedData.gateway}`,
          status: "pending"
        });

        res.json({
          message: "Deposit request submitted successfully",
          deposit: {
            amount: validatedData.amount,
            netAmount: netAmount.toFixed(2),
            fee: fee.toFixed(2),
            gateway: validatedData.gateway,
            status: "pending",
            processingTime: config.processingTime,
            instructions: "Please transfer the funds to the provided bank account. Your deposit will be credited within 1-3 business days."
          }
        });
      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Deposit creation error:", error);
      res.status(500).json({ message: "Failed to process deposit request" });
    }
  });

  // Get user deposits (transaction history)
  app.get("/api/users/:userId/deposits", authenticateToken, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const requestingUserId = (req as any).user.userId;

      // Security check: users can only view their own deposits
      if (userId !== requestingUserId) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      const transactions = await storage.getUserTransactions(userId);
      const deposits = transactions.filter(tx => tx.type === "deposit");
      
      res.json(deposits);
    } catch (error) {
      console.error("Get deposits error:", error);
      res.status(500).json({ message: "Failed to fetch deposits" });
    }
  });

  // Get available payment gateways
  app.get("/api/payment-gateways", async (req, res) => {
    try {
      const gateways = Object.entries(depositConfig).map(([id, config]) => ({
        id,
        name: id.charAt(0).toUpperCase() + id.slice(1),
        minAmount: config.minAmount,
        maxAmount: config.maxAmount,
        fee: `${(config.fee * 100).toFixed(1)}%`,
        processingTime: config.processingTime
      }));

      res.json(gateways);
    } catch (error) {
      console.error("Get payment gateways error:", error);
      res.status(500).json({ message: "Failed to fetch payment gateways" });
    }
  });

  // Process payment callback (for real payment gateways)
  app.post("/api/deposits/callback/:gateway", async (req, res) => {
    try {
      const gateway = req.params.gateway;
      const callbackData = req.body;

      // In a real implementation, you would:
      // 1. Verify the callback signature
      // 2. Update the transaction status
      // 3. Credit the user's account if successful

      console.log(`Received callback from ${gateway}:`, callbackData);

      res.json({ message: "Callback processed successfully" });
    } catch (error) {
      console.error("Deposit callback error:", error);
      res.status(500).json({ message: "Failed to process callback" });
    }
  });

  // Get deposit statistics
  app.get("/api/users/:userId/deposit-stats", authenticateToken, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const requestingUserId = (req as any).user.userId;

      if (userId !== requestingUserId) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      const transactions = await storage.getUserTransactions(userId);
      const deposits = transactions.filter(tx => tx.type === "deposit");

      const totalDeposited = deposits
        .filter(d => d.status === "completed")
        .reduce((sum, d) => sum + parseFloat(d.amount), 0);

      const pendingDeposits = deposits
        .filter(d => d.status === "pending")
        .reduce((sum, d) => sum + parseFloat(d.amount), 0);

      const depositCount = deposits.filter(d => d.status === "completed").length;
      const averageDeposit = depositCount > 0 ? totalDeposited / depositCount : 0;

      // Get today's deposits
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todaysDeposits = deposits
        .filter(d => d.createdAt >= today && d.status === "completed")
        .reduce((sum, d) => sum + parseFloat(d.amount), 0);

      res.json({
        totalDeposited: totalDeposited.toFixed(2),
        pendingDeposits: pendingDeposits.toFixed(2),
        depositCount,
        averageDeposit: averageDeposit.toFixed(2),
        todaysDeposits: todaysDeposits.toFixed(2),
        lastDeposit: deposits.length > 0 ? deposits[0].createdAt : null
      });
    } catch (error) {
      console.error("Get deposit stats error:", error);
      res.status(500).json({ message: "Failed to fetch deposit statistics" });
    }
  });
}