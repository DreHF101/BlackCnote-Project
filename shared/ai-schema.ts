/**
 * AI Investment Assistant Schema
 * Enhanced schema for AI-powered investment features and dynamic APY calculations
 */

import { pgTable, serial, varchar, text, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Dynamic APY Configuration Table
export const dynamicApyConfig = pgTable("dynamic_apy_config", {
  id: serial("id").primaryKey(),
  planId: integer("plan_id").notNull(),
  baseRate: decimal("base_rate", { precision: 5, scale: 2 }).notNull(),
  performanceBonus: decimal("performance_bonus", { precision: 5, scale: 2 }).default("0.00"),
  loyaltyMultiplier: decimal("loyalty_multiplier", { precision: 5, scale: 2 }).default("1.00"),
  marketConditionAdjustment: decimal("market_condition_adjustment", { precision: 5, scale: 2 }).default("0.00"),
  finalAPY: decimal("final_apy", { precision: 5, scale: 2 }).notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// AI Investment Recommendations
export const aiRecommendations = pgTable("ai_recommendations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  recommendationType: varchar("recommendation_type", { length: 50 }).notNull(), // portfolio_optimization, new_investment, rebalancing
  recommendation: jsonb("recommendation").notNull(), // JSON structure with recommendation details
  confidence: decimal("confidence", { precision: 3, scale: 2 }).notNull(), // 0.00 to 1.00
  status: varchar("status", { length: 20 }).default("pending"), // pending, accepted, rejected, expired
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Investment Goals
export const investmentGoals = pgTable("investment_goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  goalName: varchar("goal_name", { length: 255 }).notNull(),
  targetAmount: decimal("target_amount", { precision: 15, scale: 2 }).notNull(),
  currentAmount: decimal("current_amount", { precision: 15, scale: 2 }).default("0.00"),
  targetDate: timestamp("target_date").notNull(),
  riskTolerance: varchar("risk_tolerance", { length: 20 }).notNull(), // conservative, moderate, aggressive
  goalType: varchar("goal_type", { length: 50 }).notNull(), // retirement, education, house, emergency
  status: varchar("status", { length: 20 }).default("active"), // active, completed, paused, cancelled
  autoInvest: boolean("auto_invest").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Smart Investment Pools
export const smartInvestmentPools = pgTable("smart_investment_pools", {
  id: serial("id").primaryKey(),
  poolName: varchar("pool_name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(), // technology, healthcare, energy, diversified
  totalValue: decimal("total_value", { precision: 20, scale: 2 }).default("0.00"),
  participantCount: integer("participant_count").default(0),
  minimumInvestment: decimal("minimum_investment", { precision: 15, scale: 2 }).notNull(),
  maximumInvestment: decimal("maximum_investment", { precision: 15, scale: 2 }).notNull(),
  expectedAPY: decimal("expected_apy", { precision: 5, scale: 2 }).notNull(),
  riskLevel: varchar("risk_level", { length: 20 }).notNull(),
  aiStrategy: jsonb("ai_strategy").notNull(), // AI allocation strategy details
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Investment Alerts
export const investmentAlerts = pgTable("investment_alerts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  alertType: varchar("alert_type", { length: 50 }).notNull(), // price_target, milestone, rebalance, goal_progress
  targetValue: decimal("target_value", { precision: 15, scale: 2 }),
  currentValue: decimal("current_value", { precision: 15, scale: 2 }),
  message: text("message").notNull(),
  isTriggered: boolean("is_triggered").default(false),
  isActive: boolean("is_active").default(true),
  triggerCondition: varchar("trigger_condition", { length: 50 }).notNull(), // above, below, equals, percentage_change
  createdAt: timestamp("created_at").defaultNow(),
  triggeredAt: timestamp("triggered_at"),
});

// Portfolio Rebalancing History
export const portfolioRebalancing = pgTable("portfolio_rebalancing", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  rebalanceType: varchar("rebalance_type", { length: 50 }).notNull(), // automatic, manual, ai_suggested
  oldAllocation: jsonb("old_allocation").notNull(),
  newAllocation: jsonb("new_allocation").notNull(),
  reason: text("reason").notNull(),
  performanceImpact: decimal("performance_impact", { precision: 5, scale: 2 }),
  executedAt: timestamp("executed_at").defaultNow(),
});

// AI Analysis Results
export const aiAnalysis = pgTable("ai_analysis", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  analysisType: varchar("analysis_type", { length: 50 }).notNull(), // risk_assessment, market_sentiment, performance_prediction
  inputData: jsonb("input_data").notNull(),
  results: jsonb("results").notNull(),
  confidence: decimal("confidence", { precision: 3, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Enhanced Investment Plans (extends existing)
export const enhancedInvestmentPlans = pgTable("enhanced_investment_plans", {
  id: serial("id").primaryKey(),
  planId: integer("plan_id").notNull(), // references investment_plans.id
  tier: varchar("tier", { length: 50 }).default("starter"), // starter, pro, vip, premium, elite
  riskLevel: varchar("risk_level", { length: 20 }).default("low"), // low, medium, high
  category: varchar("category", { length: 100 }).default("general"), // technology, healthcare, energy, etc.
  autoCompounding: boolean("auto_compounding").default(false),
  flexibleTerms: boolean("flexible_terms").default(false),
  minDurationDays: integer("min_duration_days"),
  maxDurationDays: integer("max_duration_days"),
  targetAudience: varchar("target_audience", { length: 100 }),
  features: jsonb("features"), // JSON array of plan features
  restrictions: jsonb("restrictions"), // JSON object with plan restrictions
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const dynamicApyConfigRelations = relations(dynamicApyConfig, ({ one }) => ({
  plan: one(enhancedInvestmentPlans, {
    fields: [dynamicApyConfig.planId],
    references: [enhancedInvestmentPlans.planId],
  }),
}));

export const aiRecommendationsRelations = relations(aiRecommendations, ({ one }) => ({
  user: one(enhancedInvestmentPlans, {
    fields: [aiRecommendations.userId],
    references: [enhancedInvestmentPlans.id],
  }),
}));

export const investmentGoalsRelations = relations(investmentGoals, ({ one }) => ({
  user: one(enhancedInvestmentPlans, {
    fields: [investmentGoals.userId],
    references: [enhancedInvestmentPlans.id],
  }),
}));

// Insert Schemas
export const insertDynamicApyConfigSchema = createInsertSchema(dynamicApyConfig).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAiRecommendationSchema = createInsertSchema(aiRecommendations).omit({
  id: true,
  createdAt: true,
});

export const insertInvestmentGoalSchema = createInsertSchema(investmentGoals).omit({
  id: true,
  createdAt: true,
});

export const insertSmartInvestmentPoolSchema = createInsertSchema(smartInvestmentPools).omit({
  id: true,
  createdAt: true,
});

export const insertInvestmentAlertSchema = createInsertSchema(investmentAlerts).omit({
  id: true,
  createdAt: true,
  triggeredAt: true,
});

export const insertPortfolioRebalancingSchema = createInsertSchema(portfolioRebalancing).omit({
  id: true,
  executedAt: true,
});

export const insertAiAnalysisSchema = createInsertSchema(aiAnalysis).omit({
  id: true,
  createdAt: true,
});

export const insertEnhancedInvestmentPlanSchema = createInsertSchema(enhancedInvestmentPlans).omit({
  id: true,
  createdAt: true,
});

// Types
export type DynamicApyConfig = typeof dynamicApyConfig.$inferSelect;
export type InsertDynamicApyConfig = z.infer<typeof insertDynamicApyConfigSchema>;

export type AiRecommendation = typeof aiRecommendations.$inferSelect;
export type InsertAiRecommendation = z.infer<typeof insertAiRecommendationSchema>;

export type InvestmentGoal = typeof investmentGoals.$inferSelect;
export type InsertInvestmentGoal = z.infer<typeof insertInvestmentGoalSchema>;

export type SmartInvestmentPool = typeof smartInvestmentPools.$inferSelect;
export type InsertSmartInvestmentPool = z.infer<typeof insertSmartInvestmentPoolSchema>;

export type InvestmentAlert = typeof investmentAlerts.$inferSelect;
export type InsertInvestmentAlert = z.infer<typeof insertInvestmentAlertSchema>;

export type PortfolioRebalancing = typeof portfolioRebalancing.$inferSelect;
export type InsertPortfolioRebalancing = z.infer<typeof insertPortfolioRebalancingSchema>;

export type AiAnalysis = typeof aiAnalysis.$inferSelect;
export type InsertAiAnalysis = z.infer<typeof insertAiAnalysisSchema>;

export type EnhancedInvestmentPlan = typeof enhancedInvestmentPlans.$inferSelect;
export type InsertEnhancedInvestmentPlan = z.infer<typeof insertEnhancedInvestmentPlanSchema>;

// Dynamic APY Interface
export interface DynamicAPY {
  baseRate: number;
  performanceBonus: number;
  loyaltyMultiplier: number;
  marketConditionAdjustment: number;
  finalAPY: number;
}

// AI Recommendation Interface
export interface AIRecommendationData {
  type: 'portfolio_optimization' | 'new_investment' | 'rebalancing' | 'goal_adjustment';
  title: string;
  description: string;
  actionItems: string[];
  expectedImpact: {
    roi: number;
    risk: 'low' | 'medium' | 'high';
    timeframe: string;
  };
  confidence: number;
}

// Smart Pool Strategy Interface
export interface SmartPoolStrategy {
  allocation: {
    [category: string]: number; // percentage allocation
  };
  rebalanceFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  riskParameters: {
    maxVolatility: number;
    maxDrawdown: number;
    diversificationScore: number;
  };
  performanceTargets: {
    expectedReturn: number;
    minReturn: number;
    maxReturn: number;
  };
}