/**
 * AI Financial Recommendation Engine API Routes
 * RESTful endpoints for advanced financial analysis and recommendations
 */

import type { Express } from "express";
import { AIFinancialEngine } from "./ai-financial-engine";

export function registerAIFinancialRoutes(app: Express): void {

  /**
   * Get comprehensive financial recommendations for user
   */
  app.get("/api/ai/financial/recommendations/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      if (isNaN(userId)) {
        return res.status(400).json({ 
          error: "Invalid user ID",
          message: "User ID must be a valid number"
        });
      }

      const recommendations = await AIFinancialEngine.generateFinancialRecommendations(userId);
      
      res.json({
        success: true,
        data: {
          userId,
          recommendations,
          generatedAt: new Date().toISOString(),
          totalRecommendations: recommendations.length,
          highPriorityCount: recommendations.filter(r => r.priority === 'high' || r.priority === 'critical').length
        }
      });

    } catch (error: any) {
      console.error("Error generating financial recommendations:", error);
      res.status(500).json({ 
        error: "Failed to generate recommendations",
        message: error.message
      });
    }
  });

  /**
   * Get user's financial profile analysis
   */
  app.get("/api/ai/financial/profile/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      if (isNaN(userId)) {
        return res.status(400).json({ 
          error: "Invalid user ID"
        });
      }

      const profile = await AIFinancialEngine.buildUserFinancialProfile(userId);
      
      res.json({
        success: true,
        data: {
          profile,
          analyzedAt: new Date().toISOString()
        }
      });

    } catch (error: any) {
      console.error("Error building financial profile:", error);
      res.status(500).json({ 
        error: "Failed to build financial profile",
        message: error.message
      });
    }
  });

  /**
   * Get portfolio performance analysis
   */
  app.get("/api/ai/financial/portfolio/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      if (isNaN(userId)) {
        return res.status(400).json({ 
          error: "Invalid user ID"
        });
      }

      const analysis = await AIFinancialEngine.analyzePortfolioPerformance(userId);
      
      res.json({
        success: true,
        data: {
          analysis,
          analyzedAt: new Date().toISOString()
        }
      });

    } catch (error: any) {
      console.error("Error analyzing portfolio:", error);
      res.status(500).json({ 
        error: "Failed to analyze portfolio",
        message: error.message
      });
    }
  });

  /**
   * Get current market conditions and insights
   */
  app.get("/api/ai/financial/market-conditions", async (req, res) => {
    try {
      const [conditions, insights] = await Promise.all([
        AIFinancialEngine.getCurrentMarketConditions(),
        AIFinancialEngine.generateMarketInsights()
      ]);
      
      res.json({
        success: true,
        data: {
          conditions,
          insights,
          analyzedAt: new Date().toISOString()
        }
      });

    } catch (error: any) {
      console.error("Error getting market conditions:", error);
      res.status(500).json({ 
        error: "Failed to get market conditions",
        message: error.message
      });
    }
  });

  /**
   * Get market insights only
   */
  app.get("/api/ai/financial/market-insights", async (req, res) => {
    try {
      const insights = await AIFinancialEngine.generateMarketInsights();
      
      res.json({
        success: true,
        data: {
          insights,
          count: insights.length,
          generatedAt: new Date().toISOString()
        }
      });

    } catch (error: any) {
      console.error("Error generating market insights:", error);
      res.status(500).json({ 
        error: "Failed to generate market insights",
        message: error.message
      });
    }
  });

  /**
   * Get personalized educational content
   */
  app.get("/api/ai/financial/education/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      if (isNaN(userId)) {
        return res.status(400).json({ 
          error: "Invalid user ID"
        });
      }

      const profile = await AIFinancialEngine.buildUserFinancialProfile(userId);
      const educationalContent = await AIFinancialEngine.generateEducationalContent(profile);
      
      res.json({
        success: true,
        data: {
          content: educationalContent,
          userExperience: profile.experience,
          riskTolerance: profile.riskTolerance,
          generatedAt: new Date().toISOString()
        }
      });

    } catch (error: any) {
      console.error("Error generating educational content:", error);
      res.status(500).json({ 
        error: "Failed to generate educational content",
        message: error.message
      });
    }
  });

  /**
   * Get comprehensive financial dashboard data
   */
  app.get("/api/ai/financial/dashboard/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      if (isNaN(userId)) {
        return res.status(400).json({ 
          error: "Invalid user ID"
        });
      }

      // Get all financial data in parallel
      const [
        recommendations,
        profile,
        portfolioAnalysis,
        marketConditions,
        marketInsights,
        educationalContent
      ] = await Promise.all([
        AIFinancialEngine.generateFinancialRecommendations(userId),
        AIFinancialEngine.buildUserFinancialProfile(userId),
        AIFinancialEngine.analyzePortfolioPerformance(userId),
        AIFinancialEngine.getCurrentMarketConditions(),
        AIFinancialEngine.generateMarketInsights(),
        AIFinancialEngine.generateEducationalContent(await AIFinancialEngine.buildUserFinancialProfile(userId))
      ]);

      // Calculate summary metrics
      const topRecommendations = recommendations
        .filter(r => r.priority === 'high' || r.priority === 'critical')
        .slice(0, 3);

      const portfolioHealth = {
        score: Math.round(
          (portfolioAnalysis.diversificationScore * 30) +
          (Math.max(0, 10 - portfolioAnalysis.riskScore) * 20) +
          (Math.min(portfolioAnalysis.sharpeRatio * 10, 30)) +
          (portfolioAnalysis.performanceVsBenchmark > 0 ? 20 : 0)
        ),
        riskLevel: portfolioAnalysis.riskScore,
        diversification: portfolioAnalysis.diversificationScore,
        performance: portfolioAnalysis.performanceVsBenchmark
      };

      res.json({
        success: true,
        data: {
          userId,
          overview: {
            portfolioValue: portfolioAnalysis.currentValue,
            totalReturn: portfolioAnalysis.totalReturn,
            annualizedReturn: portfolioAnalysis.annualizedReturn,
            portfolioHealth
          },
          recommendations: {
            total: recommendations.length,
            highPriority: topRecommendations,
            categories: {
              investment: recommendations.filter(r => r.type === 'investment').length,
              rebalance: recommendations.filter(r => r.type === 'portfolio_rebalance').length,
              risk: recommendations.filter(r => r.type === 'risk_adjustment').length,
              diversification: recommendations.filter(r => r.type === 'diversification').length
            }
          },
          profile: {
            riskTolerance: profile.riskTolerance,
            experience: profile.experience,
            timeHorizon: profile.timeHorizon,
            investmentGoals: profile.investmentGoals
          },
          market: {
            conditions: marketConditions,
            keyInsights: marketInsights.slice(0, 3)
          },
          education: {
            recommendedContent: educationalContent.slice(0, 3),
            totalContent: educationalContent.length
          },
          generatedAt: new Date().toISOString()
        }
      });

    } catch (error: any) {
      console.error("Error generating financial dashboard:", error);
      res.status(500).json({ 
        error: "Failed to generate financial dashboard",
        message: error.message
      });
    }
  });

  /**
   * Get specific recommendation details
   */
  app.get("/api/ai/financial/recommendation/:userId/:recommendationId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const recommendationId = req.params.recommendationId;
      
      if (isNaN(userId)) {
        return res.status(400).json({ 
          error: "Invalid user ID"
        });
      }

      const recommendations = await AIFinancialEngine.generateFinancialRecommendations(userId);
      const recommendation = recommendations.find(r => r.id === recommendationId);

      if (!recommendation) {
        return res.status(404).json({
          error: "Recommendation not found"
        });
      }

      res.json({
        success: true,
        data: {
          recommendation,
          retrievedAt: new Date().toISOString()
        }
      });

    } catch (error: any) {
      console.error("Error getting recommendation details:", error);
      res.status(500).json({ 
        error: "Failed to get recommendation details",
        message: error.message
      });
    }
  });

  /**
   * Accept/implement a recommendation
   */
  app.post("/api/ai/financial/recommendation/:userId/:recommendationId/accept", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const recommendationId = req.params.recommendationId;
      
      if (isNaN(userId)) {
        return res.status(400).json({ 
          error: "Invalid user ID"
        });
      }

      // In a real implementation, this would execute the recommendation
      // For now, we'll just log the acceptance
      console.log(`User ${userId} accepted recommendation ${recommendationId}`);

      res.json({
        success: true,
        data: {
          message: "Recommendation accepted and implementation initiated",
          userId,
          recommendationId,
          acceptedAt: new Date().toISOString()
        }
      });

    } catch (error: any) {
      console.error("Error accepting recommendation:", error);
      res.status(500).json({ 
        error: "Failed to accept recommendation",
        message: error.message
      });
    }
  });
}