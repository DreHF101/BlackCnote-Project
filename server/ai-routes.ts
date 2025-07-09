/**
 * AI Investment Assistant API Routes
 * RESTful endpoints for AI-powered investment features
 */

import type { Express } from "express";
import { AIInvestmentService } from './ai-investment-service';
import { storage } from './storage';

export function registerAIRoutes(app: Express): void {
  
  /**
   * Generate personalized AI investment recommendations
   */
  app.get('/api/ai/recommendations', async (req, res) => {
    try {
      const userId = 1; // Mock user ID - in real app, get from session
      const riskTolerance = req.query.riskTolerance as 'conservative' | 'moderate' | 'aggressive' || 'moderate';
      
      const recommendations = await AIInvestmentService.generatePersonalizedRecommendations(userId, riskTolerance);
      
      // Add mock IDs and priorities for demo
      const enrichedRecommendations = recommendations.map((rec, index) => ({
        id: `rec_${Date.now()}_${index}`,
        ...rec,
        priority: index === 0 ? 'high' : index === 1 ? 'medium' : 'low',
      }));
      
      res.json(enrichedRecommendations);
    } catch (error: any) {
      console.error('AI recommendations error:', error);
      res.status(500).json({ 
        error: 'Failed to generate AI recommendations',
        message: error.message 
      });
    }
  });

  /**
   * Calculate and return dynamic APY for user
   */
  app.get('/api/ai/dynamic-apy', async (req, res) => {
    try {
      const userId = 1; // Mock user ID
      const userInvestments = await storage.getUserInvestments(userId);
      
      // Mock base rate from user's primary investment plan
      const baseRate = 12.5;
      const marketConditions = 'neutral' as const; // In real app, fetch from market API
      
      const dynamicAPY = AIInvestmentService.calculateDynamicAPY(
        baseRate,
        userInvestments,
        marketConditions
      );
      
      res.json(dynamicAPY);
    } catch (error: any) {
      console.error('Dynamic APY calculation error:', error);
      res.status(500).json({ 
        error: 'Failed to calculate dynamic APY',
        message: error.message 
      });
    }
  });

  /**
   * Get investment goals tracking
   */
  app.get('/api/ai/investment-goals', async (req, res) => {
    try {
      const userId = 1; // Mock user ID
      const goalsData = await AIInvestmentService.trackInvestmentGoals(userId);
      
      res.json(goalsData);
    } catch (error: any) {
      console.error('Investment goals tracking error:', error);
      res.status(500).json({ 
        error: 'Failed to track investment goals',
        message: error.message 
      });
    }
  });

  /**
   * Get available smart investment pools
   */
  app.get('/api/ai/smart-pools', async (req, res) => {
    try {
      // Mock smart pools data
      const smartPools = [
        await AIInvestmentService.createSmartInvestmentPool(
          "Tech Growth Pool",
          "technology",
          "medium",
          1000,
          50000
        ),
        await AIInvestmentService.createSmartInvestmentPool(
          "Healthcare Innovation",
          "healthcare",
          "medium",
          2500,
          100000
        ),
        await AIInvestmentService.createSmartInvestmentPool(
          "Green Energy Fund",
          "energy",
          "high",
          5000,
          250000
        ),
        await AIInvestmentService.createSmartInvestmentPool(
          "Diversified Conservative",
          "diversified",
          "low",
          500,
          25000
        ),
      ];
      
      res.json(smartPools);
    } catch (error: any) {
      console.error('Smart pools error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch smart pools',
        message: error.message 
      });
    }
  });

  /**
   * Accept an AI recommendation
   */
  app.post('/api/ai/recommendations/:id/accept', async (req, res) => {
    try {
      const recommendationId = req.params.id;
      const userId = 1; // Mock user ID
      
      // In a real implementation, this would:
      // 1. Validate the recommendation exists
      // 2. Apply the recommendation logic
      // 3. Update user's portfolio/investments
      // 4. Log the action
      
      console.log(`Applying AI recommendation ${recommendationId} for user ${userId}`);
      
      // Mock success response
      res.json({
        success: true,
        message: 'AI recommendation applied successfully',
        recommendationId,
        appliedAt: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error('Apply recommendation error:', error);
      res.status(500).json({ 
        error: 'Failed to apply recommendation',
        message: error.message 
      });
    }
  });

  /**
   * Generate portfolio rebalancing recommendations
   */
  app.get('/api/ai/rebalancing', async (req, res) => {
    try {
      const userId = 1; // Mock user ID
      const rebalancingData = await AIInvestmentService.generateRebalancingRecommendations(userId);
      
      res.json(rebalancingData);
    } catch (error: any) {
      console.error('Portfolio rebalancing error:', error);
      res.status(500).json({ 
        error: 'Failed to generate rebalancing recommendations',
        message: error.message 
      });
    }
  });

  /**
   * Process auto-compounding for eligible investments
   */
  app.post('/api/ai/auto-compound/:investmentId', async (req, res) => {
    try {
      const investmentId = parseInt(req.params.investmentId);
      const investment = await storage.getInvestment(investmentId);
      
      if (!investment) {
        return res.status(404).json({ error: 'Investment not found' });
      }
      
      const compoundingResult = await AIInvestmentService.processAutoCompounding(investment);
      
      res.json(compoundingResult);
    } catch (error: any) {
      console.error('Auto-compounding error:', error);
      res.status(500).json({ 
        error: 'Failed to process auto-compounding',
        message: error.message 
      });
    }
  });

  /**
   * Create a new investment goal
   */
  app.post('/api/ai/investment-goals', async (req, res) => {
    try {
      const { goalName, targetAmount, targetDate, riskTolerance, goalType } = req.body;
      const userId = 1; // Mock user ID
      
      // Validate input
      if (!goalName || !targetAmount || !targetDate || !riskTolerance || !goalType) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      // In real implementation, save to database
      const newGoal = {
        id: Date.now(),
        userId,
        goalName,
        targetAmount: parseFloat(targetAmount),
        currentAmount: 0,
        targetDate: new Date(targetDate),
        riskTolerance,
        goalType,
        status: 'active',
        autoInvest: false,
        createdAt: new Date(),
      };
      
      res.json(newGoal);
    } catch (error: any) {
      console.error('Create investment goal error:', error);
      res.status(500).json({ 
        error: 'Failed to create investment goal',
        message: error.message 
      });
    }
  });

  /**
   * Join a smart investment pool
   */
  app.post('/api/ai/smart-pools/:poolId/join', async (req, res) => {
    try {
      const poolId = parseInt(req.params.poolId);
      const { amount } = req.body;
      const userId = 1; // Mock user ID
      
      if (!amount || amount <= 0) {
        return res.status(400).json({ error: 'Invalid investment amount' });
      }
      
      // In real implementation:
      // 1. Validate pool exists and is active
      // 2. Check minimum/maximum investment limits
      // 3. Process the investment
      // 4. Update pool statistics
      // 5. Create transaction record
      
      console.log(`User ${userId} joining pool ${poolId} with $${amount}`);
      
      res.json({
        success: true,
        message: 'Successfully joined smart investment pool',
        poolId,
        investmentAmount: amount,
        joinedAt: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error('Join smart pool error:', error);
      res.status(500).json({ 
        error: 'Failed to join smart pool',
        message: error.message 
      });
    }
  });

  /**
   * Get AI analysis and insights
   */
  app.get('/api/ai/insights', async (req, res) => {
    try {
      const userId = 1; // Mock user ID
      
      // Mock AI insights data
      const insights = {
        portfolioHealthScore: 87,
        aiConfidenceLevel: 92,
        riskAssessment: {
          currentRisk: 'medium',
          recommendedRisk: 'medium',
          riskScore: 6.2,
        },
        marketSentiment: {
          sentiment: 'bullish',
          confidence: 0.78,
          factors: [
            'Positive earnings reports',
            'Strong market momentum',
            'Favorable economic indicators',
          ],
        },
        performancePrediction: {
          nextMonth: { min: 0.8, expected: 1.2, max: 1.8 },
          nextQuarter: { min: 2.5, expected: 3.8, max: 5.2 },
          nextYear: { min: 8.5, expected: 12.3, max: 16.8 },
        },
      };
      
      res.json(insights);
    } catch (error: any) {
      console.error('AI insights error:', error);
      res.status(500).json({ 
        error: 'Failed to generate AI insights',
        message: error.message 
      });
    }
  });
}