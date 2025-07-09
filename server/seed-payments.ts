import { db } from "./db";
import { paymentGateways, InsertPaymentGateway } from "@shared/payment-schema";
import { eq } from "drizzle-orm";

export async function seedPaymentGateways() {
  console.log("Seeding payment gateways...");

  const gateways: InsertPaymentGateway[] = [
    {
      name: "Stripe",
      slug: "stripe",
      displayName: "Credit/Debit Card",
      description: "Secure payments with Visa, Mastercard, American Express, and more",
      icon: "fas fa-credit-card",
      isActive: true,
      supportedCurrencies: ["usd", "eur", "gbp", "cad", "aud"],
      minAmount: "1.00",
      maxAmount: "100000.00",
      processingFee: "2.9",
      processingFeeType: "percentage",
      configuration: JSON.stringify({
        environment: "sandbox",
        features: ["cards", "wallets", "bank_transfers"],
        webhookEvents: [
          "payment_intent.succeeded",
          "payment_intent.payment_failed",
          "payment_intent.processing"
        ]
      }),
    },
    {
      name: "PayPal",
      slug: "paypal",
      displayName: "PayPal",
      description: "Pay with your PayPal account or credit card through PayPal",
      icon: "fab fa-paypal",
      isActive: true,
      supportedCurrencies: ["usd", "eur", "gbp", "cad", "aud"],
      minAmount: "1.00",
      maxAmount: "50000.00",
      processingFee: "3.49",
      processingFeeType: "percentage",
      configuration: JSON.stringify({
        environment: "sandbox",
        features: ["paypal", "credit_cards"],
        webhookEvents: [
          "CHECKOUT.ORDER.APPROVED",
          "PAYMENT.CAPTURE.COMPLETED",
          "PAYMENT.CAPTURE.DENIED"
        ]
      }),
    },
    {
      name: "Bitcoin",
      slug: "crypto",
      displayName: "Cryptocurrency",
      description: "Pay with Bitcoin, Ethereum, Litecoin, and other cryptocurrencies",
      icon: "fab fa-bitcoin",
      isActive: true,
      supportedCurrencies: ["btc", "eth", "ltc", "usdt", "usdc"],
      minAmount: "10.00",
      maxAmount: "500000.00",
      processingFee: "1.5",
      processingFeeType: "percentage",
      configuration: JSON.stringify({
        environment: "mainnet",
        features: ["bitcoin", "ethereum", "litecoin", "usdt", "usdc"],
        networks: ["mainnet", "testnet"],
        confirmations: {
          btc: 3,
          eth: 12,
          ltc: 6,
          usdt: 12,
          usdc: 12
        }
      }),
    },
    {
      name: "Bank Transfer",
      slug: "bank_transfer",
      displayName: "Bank Transfer",
      description: "Direct bank account transfer (ACH, Wire Transfer)",
      icon: "fas fa-university",
      isActive: false, // Disabled by default - requires manual processing
      supportedCurrencies: ["usd", "eur", "gbp"],
      minAmount: "100.00",
      maxAmount: "1000000.00",
      processingFee: "5.00",
      processingFeeType: "fixed",
      configuration: JSON.stringify({
        environment: "manual",
        features: ["ach", "wire_transfer"],
        processingTime: "1-3 business days"
      }),
    },
    {
      name: "Digital Wallet",
      slug: "digital_wallet",
      displayName: "Digital Wallet",
      description: "Apple Pay, Google Pay, and other digital wallets",
      icon: "fas fa-mobile-alt",
      isActive: true,
      supportedCurrencies: ["usd", "eur", "gbp"],
      minAmount: "1.00",
      maxAmount: "10000.00",
      processingFee: "2.5",
      processingFeeType: "percentage",
      configuration: JSON.stringify({
        environment: "sandbox",
        features: ["apple_pay", "google_pay", "samsung_pay"],
        requiredDeviceSupport: true
      }),
    }
  ];

  for (const gateway of gateways) {
    try {
      // Check if gateway already exists
      const existing = await db
        .select()
        .from(paymentGateways)
        .where(eq(paymentGateways.slug, gateway.slug))
        .limit(1);

      if (existing.length === 0) {
        await db.insert(paymentGateways).values(gateway);
        console.log(`✓ Created payment gateway: ${gateway.name}`);
      } else {
        // Update existing gateway configuration
        await db
          .update(paymentGateways)
          .set({
            ...gateway,
            updatedAt: new Date(),
          })
          .where(eq(paymentGateways.slug, gateway.slug));
        console.log(`✓ Updated payment gateway: ${gateway.name}`);
      }
    } catch (error) {
      console.error(`Failed to seed payment gateway ${gateway.name}:`, error);
    }
  }

  console.log("Payment gateways seeding completed.");
}