/**
 * Authentication Routes
 * Complete user authentication system with JWT, session management, and security features
 */

import type { Express } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";

// JWT Secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || "blackcnote-development-secret";
const JWT_EXPIRES_IN = "7d";

// Validation schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  rememberMe: z.boolean().optional()
});

const registerSchema = insertUserSchema.extend({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  agreeTerms: z.boolean().refine(val => val === true, "You must agree to the terms"),
  referralCode: z.string().optional()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

const forgotPasswordSchema = z.object({
  email: z.string().email()
});

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Middleware to verify JWT tokens
export function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
}

// Rate limiting for auth endpoints
const authAttempts = new Map<string, { count: number; lastAttempt: number }>();

function rateLimitAuth(req: any, res: any, next: any) {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;

  const attempts = authAttempts.get(ip);
  
  if (attempts) {
    if (now - attempts.lastAttempt > windowMs) {
      authAttempts.delete(ip);
    } else if (attempts.count >= maxAttempts) {
      return res.status(429).json({ 
        message: "Too many authentication attempts. Please try again later.",
        retryAfter: Math.ceil((windowMs - (now - attempts.lastAttempt)) / 1000)
      });
    }
  }

  next();
}

function recordAuthAttempt(ip: string, success: boolean) {
  if (success) {
    authAttempts.delete(ip);
    return;
  }

  const attempts = authAttempts.get(ip) || { count: 0, lastAttempt: 0 };
  attempts.count++;
  attempts.lastAttempt = Date.now();
  authAttempts.set(ip, attempts);
}

export function registerAuthRoutes(app: Express): void {
  
  // Register new user
  app.post("/api/auth/register", rateLimitAuth, async (req, res) => {
    try {
      const validatedData = registerSchema.parse(req.body);
      const ip = req.ip || req.connection.remoteAddress;

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        recordAuthAttempt(ip, false);
        return res.status(400).json({ message: "User already exists with this email" });
      }

      const existingUsername = await storage.getUserByUsername(validatedData.username);
      if (existingUsername) {
        recordAuthAttempt(ip, false);
        return res.status(400).json({ message: "Username already taken" });
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(validatedData.password, saltRounds);

      // Create user
      const userData = {
        ...validatedData,
        password: hashedPassword,
        balance: "100.00", // Welcome bonus
        isActive: true
      };

      delete (userData as any).confirmPassword;
      delete (userData as any).agreeTerms;

      const user = await storage.createUser(userData);

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          username: user.username 
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Remove password from response
      const { password, ...userResponse } = user;

      recordAuthAttempt(ip, true);

      // Create welcome transaction
      await storage.createTransaction({
        userId: user.id,
        type: "bonus",
        amount: "100.00",
        description: "Welcome bonus for new registration",
        status: "completed"
      });

      res.status(201).json({
        message: "Registration successful",
        token,
        user: userResponse
      });

    } catch (error) {
      const ip = req.ip || req.connection.remoteAddress;
      recordAuthAttempt(ip, false);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Registration error:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  });

  // Login user
  app.post("/api/auth/login", rateLimitAuth, async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      const ip = req.ip || req.connection.remoteAddress;

      // Find user by email
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        recordAuthAttempt(ip, false);
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Check if user is active
      if (!user.isActive) {
        recordAuthAttempt(ip, false);
        return res.status(401).json({ message: "Account is disabled. Please contact support." });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(validatedData.password, user.password);
      if (!isValidPassword) {
        recordAuthAttempt(ip, false);
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const expiresIn = validatedData.rememberMe ? "30d" : JWT_EXPIRES_IN;
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          username: user.username 
        },
        JWT_SECRET,
        { expiresIn }
      );

      // Remove password from response
      const { password, ...userResponse } = user;

      recordAuthAttempt(ip, true);

      // Update last login
      await storage.updateUserLastLogin(user.id);

      res.json({
        message: "Login successful",
        token,
        user: userResponse
      });

    } catch (error) {
      const ip = req.ip || req.connection.remoteAddress;
      recordAuthAttempt(ip, false);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Logout user (invalidate token on client side)
  app.post("/api/auth/logout", authenticateToken, async (req, res) => {
    try {
      // In a production system, you might want to maintain a blacklist of invalidated tokens
      // For now, the client will remove the token
      
      res.json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Logout failed" });
    }
  });

  // Get current user profile
  app.get("/api/auth/me", authenticateToken, async (req, res) => {
    try {
      const user = await storage.getUser((req as any).user.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Remove password from response
      const { password, ...userResponse } = user;

      res.json(userResponse);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Failed to get user data" });
    }
  });

  // Forgot password
  app.post("/api/auth/forgot-password", rateLimitAuth, async (req, res) => {
    try {
      const validatedData = forgotPasswordSchema.parse(req.body);

      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        // Don't reveal whether email exists
        return res.json({ message: "If the email exists, a reset link has been sent." });
      }

      // Generate reset token
      const resetToken = jwt.sign(
        { userId: user.id, email: user.email, type: "password_reset" },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Store reset token (in production, save to database with expiration)
      await storage.createPasswordResetToken(user.id, resetToken);

      // Send reset email (implement email service)
      // await emailService.sendPasswordReset(user.email, resetToken);

      res.json({ 
        message: "If the email exists, a reset link has been sent.",
        // For development only - remove in production
        resetToken: process.env.NODE_ENV === "development" ? resetToken : undefined
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Forgot password error:", error);
      res.status(500).json({ message: "Password reset failed" });
    }
  });

  // Reset password
  app.post("/api/auth/reset-password", rateLimitAuth, async (req, res) => {
    try {
      const validatedData = resetPasswordSchema.parse(req.body);

      // Verify reset token
      const decoded = jwt.verify(validatedData.token, JWT_SECRET) as any;
      if (decoded.type !== "password_reset") {
        return res.status(400).json({ message: "Invalid reset token" });
      }

      // Check if token is still valid in database
      const isValidToken = await storage.verifyPasswordResetToken(decoded.userId, validatedData.token);
      if (!isValidToken) {
        return res.status(400).json({ message: "Reset token has expired or been used" });
      }

      // Hash new password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(validatedData.password, saltRounds);

      // Update password
      await storage.updateUserPassword(decoded.userId, hashedPassword);

      // Invalidate reset token
      await storage.invalidatePasswordResetToken(validatedData.token);

      res.json({ message: "Password reset successful" });

    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(400).json({ message: "Invalid or expired reset token" });
      }
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Reset password error:", error);
      res.status(500).json({ message: "Password reset failed" });
    }
  });

  // Change password (authenticated)
  app.post("/api/auth/change-password", authenticateToken, async (req, res) => {
    try {
      const { currentPassword, newPassword, confirmPassword } = req.body;

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "New passwords don't match" });
      }

      if (newPassword.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" });
      }

      const user = await storage.getUser((req as any).user.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Verify current password
      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }

      // Hash new password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password
      await storage.updateUserPassword(user.id, hashedPassword);

      res.json({ message: "Password changed successfully" });

    } catch (error) {
      console.error("Change password error:", error);
      res.status(500).json({ message: "Password change failed" });
    }
  });

  // Verify email
  app.post("/api/auth/verify-email", async (req, res) => {
    try {
      const { token } = req.body;

      const decoded = jwt.verify(token, JWT_SECRET) as any;
      if (decoded.type !== "email_verification") {
        return res.status(400).json({ message: "Invalid verification token" });
      }

      await storage.verifyUserEmail(decoded.userId);

      res.json({ message: "Email verified successfully" });

    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(400).json({ message: "Invalid or expired verification token" });
      }
      
      console.error("Email verification error:", error);
      res.status(500).json({ message: "Email verification failed" });
    }
  });

  // Send email verification
  app.post("/api/auth/send-verification", authenticateToken, async (req, res) => {
    try {
      const user = await storage.getUser((req as any).user.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.emailVerified) {
        return res.status(400).json({ message: "Email already verified" });
      }

      // Generate verification token
      const verificationToken = jwt.sign(
        { userId: user.id, email: user.email, type: "email_verification" },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      // Send verification email (implement email service)
      // await emailService.sendEmailVerification(user.email, verificationToken);

      res.json({ 
        message: "Verification email sent",
        // For development only - remove in production
        verificationToken: process.env.NODE_ENV === "development" ? verificationToken : undefined
      });

    } catch (error) {
      console.error("Send verification error:", error);
      res.status(500).json({ message: "Failed to send verification email" });
    }
  });

  // Refresh token
  app.post("/api/auth/refresh", async (req, res) => {
    try {
      const { refreshToken } = req.body;

      const decoded = jwt.verify(refreshToken, JWT_SECRET) as any;
      
      const user = await storage.getUser(decoded.userId);
      if (!user || !user.isActive) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      // Generate new access token
      const newToken = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          username: user.username 
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      res.json({ token: newToken });

    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }
      
      console.error("Refresh token error:", error);
      res.status(500).json({ message: "Token refresh failed" });
    }
  });
}