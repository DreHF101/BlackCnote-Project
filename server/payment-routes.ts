import { Router } from "express";
import { z } from "zod";
import { paymentService } from "./payment-service";
import { PaymentType } from "@shared/payment-schema";

const router = Router();

// Initialize payment service
paymentService.initialize().catch(console.error);

// Get available payment gateways
router.get("/payment-gateways", async (req, res) => {
  try {
    const gateways = await paymentService.getAvailableGateways();
    res.json(gateways);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create payment intent
const createPaymentSchema = z.object({
  gatewaySlug: z.string(),
  amount: z.number().positive(),
  currency: z.string().length(3).optional().default("USD"),
  type: z.enum([PaymentType.DEPOSIT, PaymentType.INVESTMENT, PaymentType.WITHDRAWAL]).optional().default(PaymentType.DEPOSIT),
  investmentId: z.number().optional(),
  metadata: z.record(z.any()).optional(),
});

router.post("/create-payment", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const data = createPaymentSchema.parse(req.body);
    const userId = req.user.id;

    const result = await paymentService.createPayment(
      userId,
      data.gatewaySlug,
      data.amount,
      data.currency,
      data.type,
      data.investmentId,
      data.metadata
    );

    res.json({
      paymentIntent: result.paymentIntent,
      transaction: {
        id: result.transaction.id,
        status: result.transaction.status,
        amount: result.transaction.amount,
        currency: result.transaction.currency,
        processingFee: result.transaction.processingFee,
      },
    });
  } catch (error: any) {
    console.error("Create payment error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Confirm payment
router.post("/confirm-payment/:transactionId", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const transactionId = parseInt(req.params.transactionId);
    if (isNaN(transactionId)) {
      return res.status(400).json({ error: "Invalid transaction ID" });
    }

    const result = await paymentService.confirmPayment(transactionId);
    res.json(result);
  } catch (error: any) {
    console.error("Confirm payment error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get payment status
router.get("/payment-status/:transactionId", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const transactionId = parseInt(req.params.transactionId);
    if (isNaN(transactionId)) {
      return res.status(400).json({ error: "Invalid transaction ID" });
    }

    const status = await paymentService.getPaymentStatus(transactionId);
    res.json({ status });
  } catch (error: any) {
    console.error("Get payment status error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Refund payment
const refundPaymentSchema = z.object({
  amount: z.number().positive().optional(),
  reason: z.string().optional(),
});

router.post("/refund-payment/:transactionId", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const transactionId = parseInt(req.params.transactionId);
    if (isNaN(transactionId)) {
      return res.status(400).json({ error: "Invalid transaction ID" });
    }

    const data = refundPaymentSchema.parse(req.body);
    const result = await paymentService.refundPayment(
      transactionId,
      data.amount,
      data.reason
    );

    res.json(result);
  } catch (error: any) {
    console.error("Refund payment error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get user payment methods
router.get("/payment-methods", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const paymentMethods = await paymentService.getUserPaymentMethods(req.user.id);
    res.json(paymentMethods);
  } catch (error: any) {
    console.error("Get payment methods error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get user payment transactions
router.get("/payment-transactions", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    const transactions = await paymentService.getUserTransactions(
      req.user.id,
      limit,
      offset
    );

    res.json(transactions);
  } catch (error: any) {
    console.error("Get payment transactions error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook endpoints for different gateways
router.post("/webhooks/stripe", async (req, res) => {
  try {
    const signature = req.headers['stripe-signature'] as string;
    const payload = req.body;

    await paymentService.handleWebhook('stripe', payload, signature);
    res.json({ received: true });
  } catch (error: any) {
    console.error("Stripe webhook error:", error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/webhooks/paypal", async (req, res) => {
  try {
    const payload = JSON.stringify(req.body);
    await paymentService.handleWebhook('paypal', payload);
    res.json({ received: true });
  } catch (error: any) {
    console.error("PayPal webhook error:", error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/webhooks/crypto", async (req, res) => {
  try {
    const payload = JSON.stringify(req.body);
    await paymentService.handleWebhook('crypto', payload);
    res.json({ received: true });
  } catch (error: any) {
    console.error("Crypto webhook error:", error);
    res.status(400).json({ error: error.message });
  }
});

// Legacy Stripe routes for compatibility
router.post("/create-payment-intent", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { amount, currency = "USD", metadata = {} } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const result = await paymentService.createPayment(
      req.user.id,
      'stripe',
      amount,
      currency,
      PaymentType.DEPOSIT,
      undefined,
      metadata
    );

    res.json({
      clientSecret: result.paymentIntent.clientSecret,
      transactionId: result.transaction.id,
    });
  } catch (error: any) {
    console.error("Create payment intent error:", error);
    res.status(500).json({ error: error.message });
  }
});

export { router as paymentRoutes };