import express from "express";
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Investment plans
app.get('/api/investment-plans', (req, res) => {
  res.json([
    { id: 1, name: 'Basic Plan', rate: 12.5, minAmount: 100, duration: 30 },
    { id: 2, name: 'Premium Plan', rate: 18.0, minAmount: 1000, duration: 90 }
  ]);
});

// Frontend
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>BlackCnote Investment Platform</title></head>
      <body style="font-family: Arial; text-align: center; padding: 50px;">
        <h1>BlackCnote Investment Platform</h1>
        <p>✅ Server is working correctly</p>
        <p><a href="/api/health">Health Check</a> | <a href="/api/investment-plans">Investment Plans</a></p>
      </body>
    </html>
  `);
});

// Catch all
app.get('*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`BlackCnote server running on port ${PORT}`);
});