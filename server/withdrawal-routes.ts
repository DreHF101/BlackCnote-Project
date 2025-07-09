/**
 * Withdrawal Routes
 * Complete withdrawal system with multiple payment gateways and approval workflow
 */

import type { Express } from "express";
import { z } from "zod";
import { storage } from "./storage";
import { authenticateToken } from "./auth-routes";

// Validation schemas
const withdrawalSchema = z.object({
  userId: z.number(),
  amount: z.string().refine(val => parseFloat(val) >= 10, "Minimum withdrawal is $10"),
  gateway: z.enum(["crypto", "bank", "paypal", "stripe"]),
  walletAddress: z.string().optional(),
  bankAccount: z.string().optional(),
  description: z.string().optional()
});

const approveWithdrawalSchema = z.object({
  withdrawalId: z.number(),
  status: z.enum(["approved", "rejected"]),
  adminNote: z.string().optional()
});

// Withdrawal limits and fees
const withdrawalConfig = {
  crypto: {
    minAmount: 10,
    maxDailyAmount: 50000,
    fee: 0.02, // 2%
    processingTime: "2-6 hours"
  },
  bank: {
    minAmount: 50,
    maxDailyAmount: 25000,
    fee: 0.03, // 3%
    processingTime: "3-5 business days"
  },
  paypal: {
    minAmount: 10,
    maxDailyAmount: 10000,
    fee: 0.035, // 3.5%
    processingTime: "1-2 business days"
  },
  stripe: {
    minAmount: 10,
    maxDailyAmount: 15000,
    fee: 0.04, // 4%
    processingTime: "3-7 business days"
  }
};

export function registerWithdrawalRoutes(app: Express): void {

  // Create withdrawal request
  app.post("/api/withdrawals", authenticateToken, async (req, res) => {
    try {
      const validatedData = withdrawalSchema.parse(req.body);
      const userId = (req as any).user.userId;

      // Security check: ensure user can only withdraw for themselves
      if (validatedData.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized withdrawal request" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const amount = parseFloat(validatedData.amount);
      const availableBalance = parseFloat(user.balance);
      const config = withdrawalConfig[validatedData.gateway as keyof typeof withdrawalConfig];

      // Validate amount limits
      if (amount < config.minAmount) {
        return res.status(400).json({ 
          message: `Minimum withdrawal for ${validatedData.gateway} is $${config.minAmount}` 
        });
      }

      // Check daily limit
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dailyWithdrawals = await storage.getUserWithdrawalsAfterDate(userId, today);
      const dailyTotal = dailyWithdrawals.reduce((sum, w) => sum + parseFloat(w.amount), 0);

      if (dailyTotal + amount > config.maxDailyAmount) {
        return res.status(400).json({ 
          message: `Daily withdrawal limit exceeded. Available: $${(config.maxDailyAmount - dailyTotal).toFixed(2)}` 
        });
      }

      // Check sufficient balance
      if (amount > availableBalance) {
        return res.status(400).json({ message: "Insufficient balance" });
      }

      // Validate gateway-specific requirements
      if (validatedData.gateway === "crypto" && !validatedData.walletAddress) {
        return res.status(400).json({ message: "Wallet address required for crypto withdrawals" });
      }

      if (validatedData.gateway === "bank" && !validatedData.bankAccount) {
        return res.status(400).json({ message: "Bank account details required for bank withdrawals" });
      }

      // Calculate fees
      const fee = amount * config.fee;
      const netAmount = amount - fee;

      // Create withdrawal record
      const withdrawal = await storage.createWithdrawal({
        userId,
        amount: validatedData.amount,
        netAmount: netAmount.toFixed(2),
        fee: fee.toFixed(2),
        gateway: validatedData.gateway,
        walletAddress: validatedData.walletAddress,
        bankAccount: validatedData.bankAccount,
        description: validatedData.description || `Withdrawal via ${validatedData.gateway}`,
        status: "pending",
        adminNote: ""
      });

      // Update user balance (hold the amount)
      const newBalance = (availableBalance - amount).toFixed(2);
      await storage.updateUserBalance(userId, newBalance);

      // Create transaction record
      await storage.createTransaction({
        userId,
        type: "withdrawal",
        amount: validatedData.amount,
        description: `Withdrawal request via ${validatedData.gateway} (ID: ${withdrawal.id})`,
        status: "pending"
      });

      res.status(201).json({
        message: "Withdrawal request submitted successfully",
        withdrawal: {
          ...withdrawal,
          processingTime: config.processingTime
        }
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Withdrawal creation error:", error);
      res.status(500).json({ message: "Failed to process withdrawal request" });
    }
  });

  // Get user withdrawals
  app.get("/api/users/:userId/withdrawals", authenticateToken, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const requestingUserId = (req as any).user.userId;

      // Security check: users can only view their own withdrawals
      if (userId !== requestingUserId) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      const withdrawals = await storage.getUserWithdrawals(userId);
      
      res.json(withdrawals);
    } catch (error) {
      console.error("Get withdrawals error:", error);
      res.status(500).json({ message: "Failed to fetch withdrawals" });
    }
  });

  // Get withdrawal by ID
  app.get("/api/withdrawals/:id", authenticateToken, async (req, res) => {
    try {
      const withdrawalId = parseInt(req.params.id);
      const userId = (req as any).user.userId;

      const withdrawal = await storage.getWithdrawal(withdrawalId);
      if (!withdrawal) {
        return res.status(404).json({ message: "Withdrawal not found" });
      }

      // Security check: users can only view their own withdrawals
      if (withdrawal.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      res.json(withdrawal);
    } catch (error) {
      console.error("Get withdrawal error:", error);
      res.status(500).json({ message: "Failed to fetch withdrawal" });
    }
  });

  // Cancel withdrawal (only pending withdrawals)
  app.post("/api/withdrawals/:id/cancel", authenticateToken, async (req, res) => {
    try {
      const withdrawalId = parseInt(req.params.id);
      const userId = (req as any).user.userId;

      const withdrawal = await storage.getWithdrawal(withdrawalId);
      if (!withdrawal) {
        return res.status(404).json({ message: "Withdrawal not found" });
      }

      // Security check
      if (withdrawal.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      if (withdrawal.status !== "pending") {
        return res.status(400).json({ message: "Cannot cancel withdrawal that is not pending" });
      }

      // Update withdrawal status
      await storage.updateWithdrawalStatus(withdrawalId, "cancelled", "Cancelled by user");

      // Refund the amount to user balance
      const user = await storage.getUser(userId);
      if (user) {
        const currentBalance = parseFloat(user.balance);
        const refundAmount = parseFloat(withdrawal.amount);
        const newBalance = (currentBalance + refundAmount).toFixed(2);
        await storage.updateUserBalance(userId, newBalance);

        // Create refund transaction
        await storage.createTransaction({
          userId,
          type: "refund",
          amount: withdrawal.amount,
          description: `Withdrawal cancellation refund (ID: ${withdrawalId})`,
          status: "completed"
        });
      }

      res.json({ message: "Withdrawal cancelled successfully" });
    } catch (error) {
      console.error("Cancel withdrawal error:", error);
      res.status(500).json({ message: "Failed to cancel withdrawal" });
    }
  });

  // Admin: Get all withdrawals (requires admin role)
  app.get("/api/admin/withdrawals", authenticateToken, async (req, res) => {
    try {
      // TODO: Add admin role check
      const { status, page = 1, limit = 20 } = req.query;
      
      const withdrawals = await storage.getAllWithdrawals({
        status: status as string,
        page: parseInt(page as string),
        limit: parseInt(limit as string)
      });

      res.json(withdrawals);
    } catch (error) {
      console.error("Get all withdrawals error:", error);
      res.status(500).json({ message: "Failed to fetch withdrawals" });
    }
  });

  // Admin: Approve/Reject withdrawal
  app.post("/api/admin/withdrawals/:id/review", authenticateToken, async (req, res) => {
    try {
      // TODO: Add admin role check
      const withdrawalId = parseInt(req.params.id);
      const validatedData = approveWithdrawalSchema.parse(req.body);

      const withdrawal = await storage.getWithdrawal(withdrawalId);
      if (!withdrawal) {
        return res.status(404).json({ message: "Withdrawal not found" });
      }

      if (withdrawal.status !== "pending") {
        return res.status(400).json({ message: "Withdrawal is not pending review" });
      }

      await storage.updateWithdrawalStatus(
        withdrawalId, 
        validatedData.status, 
        validatedData.adminNote || ""
      );

      // If rejected, refund the amount
      if (validatedData.status === "rejected") {
        const user = await storage.getUser(withdrawal.userId);
        if (user) {
          const currentBalance = parseFloat(user.balance);
          const refundAmount = parseFloat(withdrawal.amount);
          const newBalance = (currentBalance + refundAmount).toFixed(2);
          await storage.updateUserBalance(withdrawal.userId, newBalance);

          // Create refund transaction
          await storage.createTransaction({
            userId: withdrawal.userId,
            type: "refund",
            amount: withdrawal.amount,
            description: `Withdrawal rejection refund (ID: ${withdrawalId})`,
            status: "completed"
          });
        }
      } else if (validatedData.status === "approved") {
        // Update transaction status
        await storage.updateTransactionStatus(withdrawal.userId, "withdrawal", withdrawalId, "processing");
        
        // TODO: Integrate with actual payment gateway to process withdrawal
        // For now, mark as completed
        setTimeout(async () => {
          await storage.updateWithdrawalStatus(withdrawalId, "completed", "Payment processed");
          await storage.updateTransactionStatus(withdrawal.userId, "withdrawal", withdrawalId, "completed");
        }, 5000); // Simulate processing delay
      }

      res.json({ 
        message: `Withdrawal ${validatedData.status} successfully`,
        withdrawal: await storage.getWithdrawal(withdrawalId)
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Review withdrawal error:", error);
      res.status(500).json({ message: "Failed to review withdrawal" });
    }
  });

  // Get withdrawal statistics
  app.get("/api/users/:userId/withdrawal-stats", authenticateToken, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const requestingUserId = (req as any).user.userId;

      if (userId !== requestingUserId) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      const stats = await storage.getUserWithdrawalStats(userId);
      const config = withdrawalConfig;

      res.json({
        ...stats,
        limits: {
          crypto: { daily: config.crypto.maxDailyAmount, fee: `${config.crypto.fee * 100}%` },
          bank: { daily: config.bank.maxDailyAmount, fee: `${config.bank.fee * 100}%` },
          paypal: { daily: config.paypal.maxDailyAmount, fee: `${config.paypal.fee * 100}%` },
          stripe: { daily: config.stripe.maxDailyAmount, fee: `${config.stripe.fee * 100}%` }
        }
      });
    } catch (error) {
      console.error("Get withdrawal stats error:", error);
      res.status(500).json({ message: "Failed to fetch withdrawal statistics" });
    }
  });
}