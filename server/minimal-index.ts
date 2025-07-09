import express from "express";
import { seedDatabase } from "./seed";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Basic investment plans endpoint
app.get('/api/investment-plans', (req, res) => {
  res.json([
    { id: 1, name: 'Basic', rate: 5, duration: 30, minAmount: 100 },
    { id: 2, name: 'Premium', rate: 8, duration: 60, minAmount: 500 }
  ]);
});

(async () => {
  try {
    // Seed database
    await seedDatabase();
    
    // Setup Vite
    await setupVite(app);
    
    // Serve static files
    app.use(serveStatic());
    
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
      log(`🚀 BlackCnote Server running on port ${PORT}`);
      log(`🌐 Health check: http://localhost:${PORT}/api/health`);
    });
    
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
})();