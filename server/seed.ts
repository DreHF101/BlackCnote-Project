import { db } from "./db";
import { users, investmentPlans, investments, transactions, portfolioHistory } from "@shared/schema";

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingUsers = await db.select().from(users);
    if (existingUsers.length > 0) {
      console.log("Database already seeded, skipping...");
      return;
    }

    console.log("Seeding database...");

    // Seed user
    const [user] = await db.insert(users).values({
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password_123",
      firstName: "John",
      lastName: "Doe",
      balance: "15000.00",
      isActive: true,
    }).returning();

    // Seed investment plans
    const plans = await db.insert(investmentPlans).values([
      {
        name: "Starter Plan",
        description: "Perfect for beginners looking to start their investment journey",
        apyRate: "12.5",
        minimumAmount: "100.00",
        maximumAmount: "1000.00",
        durationDays: 30,
        isActive: true,
      },
      {
        name: "Growth Plan",
        description: "Balanced approach for steady portfolio growth",
        apyRate: "15.8",
        minimumAmount: "1000.00",
        maximumAmount: "10000.00",
        durationDays: 90,
        isActive: true,
      },
      {
        name: "Premium Plan",
        description: "Maximum returns for serious investors",
        apyRate: "22.3",
        minimumAmount: "10000.00",
        maximumAmount: "100000.00",
        durationDays: 180,
        isActive: true,
      },
    ]).returning();

    // Seed user investments
    await db.insert(investments).values([
      {
        userId: user.id,
        planId: plans[0].id,
        amount: "500.00",
        currentReturns: "52.08",
        status: "active",
        startDate: new Date("2024-12-01"),
        endDate: new Date("2024-12-31"),
      },
      {
        userId: user.id,
        planId: plans[1].id,
        amount: "2500.00",
        currentReturns: "328.75",
        status: "active",
        startDate: new Date("2024-11-15"),
        endDate: new Date("2025-02-13"),
      },
    ]);

    // Seed transactions
    await db.insert(transactions).values([
      {
        userId: user.id,
        type: "deposit",
        amount: "5000.00",
        description: "Initial deposit",
        status: "completed",
      },
      {
        userId: user.id,
        type: "investment",
        amount: "500.00",
        description: "Investment in Starter Plan",
        status: "completed",
      },
      {
        userId: user.id,
        type: "investment",
        amount: "2500.00",
        description: "Investment in Growth Plan",
        status: "completed",
      },
      {
        userId: user.id,
        type: "deposit",
        amount: "10000.00",
        description: "Portfolio expansion",
        status: "completed",
      },
    ]);

    // Seed portfolio history
    const historyData = [
      { date: new Date("2024-11-01"), totalValue: "5000.00" },
      { date: new Date("2024-11-15"), totalValue: "8000.00" },
      { date: new Date("2024-12-01"), totalValue: "8500.00" },
      { date: new Date("2024-12-15"), totalValue: "15200.00" },
      { date: new Date("2025-01-01"), totalValue: "15880.83" },
    ];

    await db.insert(portfolioHistory).values(
      historyData.map(data => ({
        userId: user.id,
        ...data,
      }))
    );

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}