import express from "express";
import { db } from "./db";
import { users, investmentPlans, investments } from "@shared/schema";
import { eq } from "drizzle-orm";
import cors from 'cors';

const app = express();

// CORS and middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'development' 
    ? [
        'http://localhost:3000', 
        'http://localhost:5174', 
        'http://localhost:5000',
        /\.replit\.dev$/,
        /\.worf\.replit\.dev$/,
        /\.repl\.co$/
      ]
    : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Investment plans endpoint
app.get('/api/investment-plans', async (req, res) => {
  try {
    const plans = await db.select().from(investmentPlans).where(eq(investmentPlans.isActive, true));
    res.json(plans);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Users endpoint
app.get('/api/users', async (req, res) => {
  try {
    const allUsers = await db.select().from(users);
    res.json(allUsers);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Basic frontend serving
app.get('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>BlackCnote Investment Platform</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0; 
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            color: white;
            max-width: 500px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          }
          .logo { 
            font-size: 32px; 
            font-weight: bold; 
            margin-bottom: 20px;
          }
          .status { 
            font-size: 18px; 
            margin-bottom: 30px;
            opacity: 0.9;
          }
          .endpoints {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
          }
          .endpoint {
            margin: 10px 0;
            font-family: monospace;
            font-size: 14px;
          }
          .endpoint a {
            color: #ffffff;
            text-decoration: none;
            border-bottom: 1px dotted rgba(255, 255, 255, 0.5);
          }
          .endpoint a:hover {
            border-bottom-color: white;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">BlackCnote</div>
          <div class="status">Investment Platform Recovery Mode</div>
          <div>Server is running successfully</div>
          
          <div class="endpoints">
            <div class="endpoint">
              <a href="/api/health">Health Check</a>
            </div>
            <div class="endpoint">
              <a href="/api/investment-plans">Investment Plans</a>
            </div>
            <div class="endpoint">
              <a href="/api/users">Users</a>
            </div>
          </div>
          
          <div style="margin-top: 30px; font-size: 14px; opacity: 0.7;">
            Frontend will be restored after server stability is confirmed
          </div>
        </div>
      </body>
    </html>
  `);
});

// Error handling middleware
app.use((error: any, req: any, res: any, next: any) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 BlackCnote Recovery Server running on port ${PORT}`);
  console.log(`🌐 Health: http://localhost:${PORT}/api/health`);
  console.log(`💰 Plans: http://localhost:${PORT}/api/investment-plans`);
  console.log(`👥 Users: http://localhost:${PORT}/api/users`);
});