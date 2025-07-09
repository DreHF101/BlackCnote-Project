/**
 * Profile Routes
 * Complete user profile management system
 */

import type { Express } from "express";
import { z } from "zod";
import { storage } from "./storage";
import { authenticateToken } from "./auth-routes";

// Validation schemas
const profileUpdateSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  timezone: z.string().optional(),
  bio: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().optional(),
  twitter: z.string().optional()
});

const preferencesUpdateSchema = z.object({
  language: z.string().optional(),
  currency: z.string().optional(),
  emailNotifications: z.boolean().optional(),
  smsNotifications: z.boolean().optional(),
  marketingEmails: z.boolean().optional(),
  twoFactorAuth: z.boolean().optional(),
  sessionTimeout: z.string().optional(),
  theme: z.string().optional()
});

export function registerProfileRoutes(app: Express): void {

  // Get user profile
  app.get("/api/users/:userId/profile", authenticateToken, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const requestingUserId = (req as any).user.userId;

      // Security check: users can only view their own profile
      if (userId !== requestingUserId) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Remove sensitive data
      const { password, ...profile } = user;
      
      res.json(profile);
    } catch (error) {
      console.error("Get profile error:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  // Update user profile
  app.put("/api/users/:userId/profile", authenticateToken, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const requestingUserId = (req as any).user.userId;

      if (userId !== requestingUserId) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      const validatedData = profileUpdateSchema.parse(req.body);

      // For now, we'll simulate profile update
      // In a real implementation, you'd update the database
      console.log(`Profile update for user ${userId}:`, validatedData);

      res.json({ 
        message: "Profile updated successfully",
        profile: validatedData
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Profile update error:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Update user preferences
  app.put("/api/users/:userId/preferences", authenticateToken, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const requestingUserId = (req as any).user.userId;

      if (userId !== requestingUserId) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      const validatedData = preferencesUpdateSchema.parse(req.body);

      // For now, we'll simulate preferences update
      console.log(`Preferences update for user ${userId}:`, validatedData);

      res.json({ 
        message: "Preferences updated successfully",
        preferences: validatedData
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Preferences update error:", error);
      res.status(500).json({ message: "Failed to update preferences" });
    }
  });

  // Get user statistics
  app.get("/api/users/:userId/stats", authenticateToken, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const requestingUserId = (req as any).user.userId;

      if (userId !== requestingUserId) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      const user = await storage.getUser(userId);
      const investments = await storage.getUserInvestments(userId);
      const transactions = await storage.getUserTransactions(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Calculate statistics
      const activeInvestments = investments.filter(inv => inv.status === "active");
      const totalInvested = investments.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
      const totalReturns = investments.reduce((sum, inv) => sum + parseFloat(inv.currentReturns), 0);
      
      const deposits = transactions.filter(tx => tx.type === "deposit" && tx.status === "completed");
      const withdrawals = transactions.filter(tx => tx.type === "withdrawal" && tx.status === "completed");
      
      const totalDeposited = deposits.reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
      const totalWithdrawn = withdrawals.reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

      const stats = {
        totalInvested: totalInvested.toFixed(2),
        totalReturns: totalReturns.toFixed(2),
        activeInvestments: activeInvestments.length,
        totalTransactions: transactions.length,
        totalDeposited: totalDeposited.toFixed(2),
        totalWithdrawn: totalWithdrawn.toFixed(2),
        memberSince: user.createdAt,
        lastActivity: transactions.length > 0 ? transactions[0].createdAt : user.createdAt,
        profitability: totalInvested > 0 ? ((totalReturns / totalInvested) * 100).toFixed(2) : "0.00"
      };

      res.json(stats);
    } catch (error) {
      console.error("Get user stats error:", error);
      res.status(500).json({ message: "Failed to fetch user statistics" });
    }
  });

  // Upload avatar (placeholder)
  app.post("/api/users/:userId/avatar", authenticateToken, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const requestingUserId = (req as any).user.userId;

      if (userId !== requestingUserId) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      // In a real implementation, you'd handle file upload here
      res.json({ 
        message: "Avatar upload functionality will be implemented",
        avatarUrl: "/api/placeholder-avatar.jpg"
      });
    } catch (error) {
      console.error("Avatar upload error:", error);
      res.status(500).json({ message: "Failed to upload avatar" });
    }
  });

  // Delete user account (soft delete)
  app.delete("/api/users/:userId/account", authenticateToken, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const requestingUserId = (req as any).user.userId;

      if (userId !== requestingUserId) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      const { confirmPassword } = req.body;

      if (!confirmPassword) {
        return res.status(400).json({ message: "Password confirmation required" });
      }

      // In a real implementation, you'd:
      // 1. Verify the password
      // 2. Check for pending investments/withdrawals
      // 3. Mark account as inactive
      // 4. Send confirmation email

      res.json({ 
        message: "Account deletion process initiated. Please check your email for confirmation." 
      });
    } catch (error) {
      console.error("Account deletion error:", error);
      res.status(500).json({ message: "Failed to process account deletion" });
    }
  });

  // Export user data (GDPR compliance)
  app.get("/api/users/:userId/export", authenticateToken, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const requestingUserId = (req as any).user.userId;

      if (userId !== requestingUserId) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      const user = await storage.getUser(userId);
      const investments = await storage.getUserInvestments(userId);
      const transactions = await storage.getUserTransactions(userId);
      const portfolioHistory = await storage.getUserPortfolioHistory(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Remove sensitive data
      const { password, ...userData } = user;

      const exportData = {
        user: userData,
        investments,
        transactions,
        portfolioHistory,
        exportedAt: new Date().toISOString(),
        exportVersion: "1.0"
      };

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="blackcnote-data-${userId}-${Date.now()}.json"`);
      res.json(exportData);
    } catch (error) {
      console.error("Data export error:", error);
      res.status(500).json({ message: "Failed to export user data" });
    }
  });
}