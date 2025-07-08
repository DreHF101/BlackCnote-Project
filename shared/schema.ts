import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  balance: decimal("balance", { precision: 15, scale: 2 }).notNull().default("0.00"),
  totalInvested: decimal("total_invested", { precision: 15, scale: 2 }).notNull().default("0.00"),
  totalReturns: decimal("total_returns", { precision: 15, scale: 2 }).notNull().default("0.00"),
  planType: text("plan_type").notNull().default("basic"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const investmentPlans = pgTable("investment_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  apyRate: decimal("apy_rate", { precision: 5, scale: 2 }).notNull(),
  minimumAmount: decimal("minimum_amount", { precision: 15, scale: 2 }).notNull(),
  maximumAmount: decimal("maximum_amount", { precision: 15, scale: 2 }).notNull(),
  durationDays: integer("duration_days").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const investments = pgTable("investments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  planId: integer("plan_id").notNull(),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  currentReturns: decimal("current_returns", { precision: 15, scale: 2 }).notNull().default("0.00"),
  status: text("status").notNull().default("active"), // active, completed, cancelled
  startDate: timestamp("start_date").notNull().defaultNow(),
  endDate: timestamp("end_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  investmentId: integer("investment_id"),
  type: text("type").notNull(), // deposit, withdrawal, profit, investment
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default("completed"), // pending, completed, failed
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const portfolioHistory = pgTable("portfolio_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  totalValue: decimal("total_value", { precision: 15, scale: 2 }).notNull(),
  date: timestamp("date").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertInvestmentPlanSchema = createInsertSchema(investmentPlans).omit({
  id: true,
  createdAt: true,
});

export const insertInvestmentSchema = createInsertSchema(investments).omit({
  id: true,
  createdAt: true,
  endDate: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertPortfolioHistorySchema = createInsertSchema(portfolioHistory).omit({
  id: true,
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  investments: many(investments),
  transactions: many(transactions),
  portfolioHistory: many(portfolioHistory),
}));

export const investmentPlansRelations = relations(investmentPlans, ({ many }) => ({
  investments: many(investments),
}));

export const investmentsRelations = relations(investments, ({ one }) => ({
  user: one(users, {
    fields: [investments.userId],
    references: [users.id],
  }),
  plan: one(investmentPlans, {
    fields: [investments.planId],
    references: [investmentPlans.id],
  }),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
}));

export const portfolioHistoryRelations = relations(portfolioHistory, ({ one }) => ({
  user: one(users, {
    fields: [portfolioHistory.userId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InvestmentPlan = typeof investmentPlans.$inferSelect;
export type InsertInvestmentPlan = z.infer<typeof insertInvestmentPlanSchema>;
export type Investment = typeof investments.$inferSelect;
export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type PortfolioHistory = typeof portfolioHistory.$inferSelect;
export type InsertPortfolioHistory = z.infer<typeof insertPortfolioHistorySchema>;
