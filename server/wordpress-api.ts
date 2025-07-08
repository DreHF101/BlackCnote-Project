import type { Express } from "express";
import { storage } from "./storage";
import { insertInvestmentSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";

// WordPress REST API compatibility layer
export function registerWordPressCompatibilityRoutes(app: Express): void {
  // WordPress-style authentication endpoint
  app.post("/wp-json/jwt-auth/v1/token", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Validate credentials
      const user = await storage.getUserByUsername(username);
      if (!user || password !== "demo") { // Simplified auth for demo
        return res.status(401).json({
          code: "jwt_auth_failed",
          message: "Invalid credentials",
          data: { status: 401 }
        });
      }

      // Generate JWT token (simplified for demo)
      const token = Buffer.from(`${user.id}:${username}:${Date.now()}`).toString('base64');
      
      res.json({
        token,
        user_email: user.email,
        user_nicename: user.username,
        user_display_name: user.username,
        user_id: user.id
      });
    } catch (error) {
      res.status(500).json({
        code: "internal_error",
        message: "Internal server error",
        data: { status: 500 }
      });
    }
  });

  // WordPress REST API endpoint for custom post types (investments)
  app.get("/wp-json/wp/v2/investments", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const per_page = parseInt(req.query.per_page as string) || 10;
      const userId = req.query.user_id ? parseInt(req.query.user_id as string) : 1;
      
      const investments = await storage.getUserInvestments(userId);
      const plans = await storage.getInvestmentPlans();
      
      // Convert to WordPress REST API format
      const wpFormatted = investments.map(investment => {
        const plan = plans.find(p => p.id === investment.planId);
        return {
          id: investment.id,
          date: investment.startDate,
          date_gmt: investment.startDate,
          guid: {
            rendered: `${req.protocol}://${req.get('host')}/investments/${investment.id}`
          },
          modified: investment.startDate,
          modified_gmt: investment.startDate,
          slug: `investment-${investment.id}`,
          status: investment.status,
          type: "investment",
          title: {
            rendered: `${plan?.name || 'Investment'} - $${investment.amount}`
          },
          content: {
            rendered: `<p>Investment Amount: $${investment.amount}</p><p>Current Returns: $${investment.currentReturns}</p><p>Status: ${investment.status}</p>`
          },
          excerpt: {
            rendered: `Investment of $${investment.amount} in ${plan?.name || 'plan'}`
          },
          author: userId,
          featured_media: 0,
          comment_status: "closed",
          ping_status: "closed",
          sticky: false,
          template: "",
          format: "standard",
          meta: {
            plan_id: investment.planId,
            amount: investment.amount,
            current_returns: investment.currentReturns,
            start_date: investment.startDate,
            end_date: investment.endDate
          },
          categories: [],
          tags: []
        };
      });
      
      // Pagination
      const start = (page - 1) * per_page;
      const end = start + per_page;
      const paginatedResults = wpFormatted.slice(start, end);
      
      // Set pagination headers
      res.set('X-WP-Total', investments.length.toString());
      res.set('X-WP-TotalPages', Math.ceil(investments.length / per_page).toString());
      
      res.json(paginatedResults);
    } catch (error) {
      res.status(500).json({
        code: "internal_error",
        message: "Internal server error",
        data: { status: 500 }
      });
    }
  });

  // WordPress REST API endpoint for investment plans
  app.get("/wp-json/wp/v2/investment-plans", async (req, res) => {
    try {
      const plans = await storage.getInvestmentPlans();
      
      // Convert to WordPress REST API format
      const wpFormatted = plans.map(plan => ({
        id: plan.id,
        date: new Date().toISOString(),
        date_gmt: new Date().toISOString(),
        guid: {
          rendered: `${req.protocol}://${req.get('host')}/investment-plans/${plan.id}`
        },
        modified: new Date().toISOString(),
        modified_gmt: new Date().toISOString(),
        slug: `plan-${plan.id}`,
        status: plan.isActive ? "publish" : "draft",
        type: "investment_plan",
        title: {
          rendered: plan.name
        },
        content: {
          rendered: `<p>${plan.description}</p><p>APY Rate: ${plan.apyRate}%</p><p>Duration: ${plan.durationDays} days</p>`
        },
        excerpt: {
          rendered: plan.description
        },
        author: 1,
        featured_media: 0,
        comment_status: "closed",
        ping_status: "closed",
        sticky: false,
        template: "",
        format: "standard",
        meta: {
          apy_rate: plan.apyRate,
          duration_days: plan.durationDays,
          minimum_amount: plan.minimumAmount,
          maximum_amount: plan.maximumAmount
        },
        categories: [],
        tags: []
      }));
      
      res.json(wpFormatted);
    } catch (error) {
      res.status(500).json({
        code: "internal_error",
        message: "Internal server error",
        data: { status: 500 }
      });
    }
  });

  // WordPress REST API endpoint for users
  app.get("/wp-json/wp/v2/users", async (req, res) => {
    try {
      const userId = parseInt(req.query.id as string) || 1;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({
          code: "rest_user_invalid_id",
          message: "Invalid user ID.",
          data: { status: 404 }
        });
      }
      
      // Convert to WordPress REST API format
      const wpFormatted = {
        id: user.id,
        username: user.username,
        name: user.username,
        first_name: "",
        last_name: "",
        email: user.email,
        url: "",
        description: "",
        link: `${req.protocol}://${req.get('host')}/author/${user.username}`,
        locale: "en_US",
        nickname: user.username,
        slug: user.username,
        roles: ["investor"],
        registered_date: new Date().toISOString(),
        capabilities: {
          read: true,
          level_0: true
        },
        extra_capabilities: {
          investor: true
        },
        avatar_urls: {
          "24": `https://secure.gravatar.com/avatar/?s=24&d=mm&r=g`,
          "48": `https://secure.gravatar.com/avatar/?s=48&d=mm&r=g`,
          "96": `https://secure.gravatar.com/avatar/?s=96&d=mm&r=g`
        },
        meta: {
          balance: user.balance,
          created_at: user.createdAt
        }
      };
      
      res.json(wpFormatted);
    } catch (error) {
      res.status(500).json({
        code: "internal_error",
        message: "Internal server error",
        data: { status: 500 }
      });
    }
  });

  // WordPress REST API endpoint for creating investments
  app.post("/wp-json/wp/v2/investments", async (req, res) => {
    try {
      const { meta, author } = req.body;
      
      if (!meta || !author) {
        return res.status(400).json({
          code: "rest_missing_callback_param",
          message: "Missing required parameters.",
          data: { status: 400 }
        });
      }
      
      const investmentData = {
        userId: author,
        planId: meta.plan_id,
        amount: meta.amount,
        currentReturns: "0.00",
        status: "active",
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + (meta.duration_days * 24 * 60 * 60 * 1000)).toISOString()
      };
      
      const validatedData = insertInvestmentSchema.parse(investmentData);
      const investment = await storage.createInvestment(validatedData);
      
      // Create transaction record
      await storage.createTransaction({
        userId: author,
        type: "investment",
        amount: `-${meta.amount}`,
        description: `Investment in plan ${meta.plan_id}`,
        createdAt: new Date().toISOString()
      });
      
      // Update user balance
      const user = await storage.getUser(author);
      if (user) {
        const newBalance = (parseFloat(user.balance) - parseFloat(meta.amount)).toFixed(2);
        await storage.updateUserBalance(author, newBalance);
      }
      
      res.status(201).json({
        id: investment.id,
        message: "Investment created successfully",
        data: investment
      });
    } catch (error) {
      res.status(500).json({
        code: "internal_error",
        message: "Internal server error",
        data: { status: 500 }
      });
    }
  });

  // CORS middleware for WordPress compatibility
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-WP-Nonce');
    res.header('Access-Control-Expose-Headers', 'X-WP-Total, X-WP-TotalPages');
    
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
}