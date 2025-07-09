import { pgTable, serial, varchar, decimal, timestamp, integer, text, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { users, investments } from "./schema";
import { z } from "zod";

// Payment Gateways table
export const paymentGateways = pgTable("payment_gateways", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),
  displayName: varchar("display_name", { length: 100 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 255 }),
  isActive: boolean("is_active").default(true),
  supportedCurrencies: text("supported_currencies").array(),
  minAmount: decimal("min_amount", { precision: 15, scale: 2 }).default("1.00"),
  maxAmount: decimal("max_amount", { precision: 15, scale: 2 }).default("100000.00"),
  processingFee: decimal("processing_fee", { precision: 5, scale: 2 }).default("0.00"),
  processingFeeType: varchar("processing_fee_type", { length: 20 }).default("percentage"), // percentage or fixed
  configuration: text("configuration"), // JSON string for gateway-specific config
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Payment Methods table (user's saved payment methods)
export const paymentMethods = pgTable("payment_methods", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  gatewayId: integer("gateway_id").references(() => paymentGateways.id).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // card, bank_account, crypto_wallet, etc.
  last4: varchar("last_4", { length: 10 }), // Last 4 digits for cards
  brand: varchar("brand", { length: 50 }), // visa, mastercard, bitcoin, etc.
  expiryMonth: integer("expiry_month"),
  expiryYear: integer("expiry_year"),
  holderName: varchar("holder_name", { length: 255 }),
  isDefault: boolean("is_default").default(false),
  isActive: boolean("is_active").default(true),
  externalId: varchar("external_id", { length: 255 }), // ID from payment gateway
  metadata: text("metadata"), // JSON string for additional data
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Payment Transactions table
export const paymentTransactions = pgTable("payment_transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  investmentId: integer("investment_id").references(() => investments.id),
  gatewayId: integer("gateway_id").references(() => paymentGateways.id).notNull(),
  paymentMethodId: integer("payment_method_id").references(() => paymentMethods.id),
  type: varchar("type", { length: 50 }).notNull(), // deposit, withdrawal, investment, fee
  status: varchar("status", { length: 50 }).notNull(), // pending, processing, completed, failed, cancelled, refunded
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 10 }).notNull().default("USD"),
  processingFee: decimal("processing_fee", { precision: 15, scale: 2 }).default("0.00"),
  netAmount: decimal("net_amount", { precision: 15, scale: 2 }).notNull(),
  exchangeRate: decimal("exchange_rate", { precision: 15, scale: 8 }).default("1.00000000"),
  externalTransactionId: varchar("external_transaction_id", { length: 255 }),
  gatewayResponse: text("gateway_response"), // JSON string of gateway response
  failureReason: text("failure_reason"),
  description: text("description"),
  metadata: text("metadata"), // JSON string for additional data
  processedAt: timestamp("processed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Payment Webhooks table (for tracking webhook events)
export const paymentWebhooks = pgTable("payment_webhooks", {
  id: serial("id").primaryKey(),
  gatewayId: integer("gateway_id").references(() => paymentGateways.id).notNull(),
  eventType: varchar("event_type", { length: 100 }).notNull(),
  eventId: varchar("event_id", { length: 255 }).notNull(),
  transactionId: integer("transaction_id").references(() => paymentTransactions.id),
  status: varchar("status", { length: 50 }).notNull(), // received, processed, failed
  payload: text("payload").notNull(), // Full webhook payload
  processedAt: timestamp("processed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const paymentGatewaysRelations = relations(paymentGateways, ({ many }) => ({
  paymentMethods: many(paymentMethods),
  transactions: many(paymentTransactions),
  webhooks: many(paymentWebhooks),
}));

export const paymentMethodsRelations = relations(paymentMethods, ({ one, many }) => ({
  user: one(users, { fields: [paymentMethods.userId], references: [users.id] }),
  gateway: one(paymentGateways, { fields: [paymentMethods.gatewayId], references: [paymentGateways.id] }),
  transactions: many(paymentTransactions),
}));

export const paymentTransactionsRelations = relations(paymentTransactions, ({ one }) => ({
  user: one(users, { fields: [paymentTransactions.userId], references: [users.id] }),
  investment: one(investments, { fields: [paymentTransactions.investmentId], references: [investments.id] }),
  gateway: one(paymentGateways, { fields: [paymentTransactions.gatewayId], references: [paymentGateways.id] }),
  paymentMethod: one(paymentMethods, { fields: [paymentTransactions.paymentMethodId], references: [paymentMethods.id] }),
}));

export const paymentWebhooksRelations = relations(paymentWebhooks, ({ one }) => ({
  gateway: one(paymentGateways, { fields: [paymentWebhooks.gatewayId], references: [paymentGateways.id] }),
  transaction: one(paymentTransactions, { fields: [paymentWebhooks.transactionId], references: [paymentTransactions.id] }),
}));

// Zod schemas
export const insertPaymentGatewaySchema = createInsertSchema(paymentGateways).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPaymentMethodSchema = createInsertSchema(paymentMethods).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPaymentTransactionSchema = createInsertSchema(paymentTransactions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPaymentWebhookSchema = createInsertSchema(paymentWebhooks).omit({
  id: true,
  createdAt: true,
});

// Types
export type PaymentGateway = typeof paymentGateways.$inferSelect;
export type InsertPaymentGateway = z.infer<typeof insertPaymentGatewaySchema>;

export type PaymentMethod = typeof paymentMethods.$inferSelect;
export type InsertPaymentMethod = z.infer<typeof insertPaymentMethodSchema>;

export type PaymentTransaction = typeof paymentTransactions.$inferSelect;
export type InsertPaymentTransaction = z.infer<typeof insertPaymentTransactionSchema>;

export type PaymentWebhook = typeof paymentWebhooks.$inferSelect;
export type InsertPaymentWebhook = z.infer<typeof insertPaymentWebhookSchema>;

// Enums for validation
export const PaymentStatus = {
  PENDING: "pending",
  PROCESSING: "processing", 
  COMPLETED: "completed",
  FAILED: "failed",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
} as const;

export const PaymentType = {
  DEPOSIT: "deposit",
  WITHDRAWAL: "withdrawal",
  INVESTMENT: "investment",
  FEE: "fee",
} as const;

export const PaymentMethodType = {
  CARD: "card",
  BANK_ACCOUNT: "bank_account",
  CRYPTO_WALLET: "crypto_wallet",
  DIGITAL_WALLET: "digital_wallet",
} as const;