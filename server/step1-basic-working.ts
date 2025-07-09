import express from "express";
import cors from 'cors';

const app = express();

// CORS and basic middleware
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Step 1: Basic working endpoints
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'BlackCnote server is running'
  });
});

app.get('/api/investment-plans', (req, res) => {
  res.json([
    {
      id: 1,
      name: "Starter Plan",
      description: "Perfect for beginners",
      apyRate: "12.5",
      minimumAmount: "100.00",
      maximumAmount: "1000.00",
      durationDays: 30,
      isActive: true
    },
    {
      id: 2,
      name: "Growth Plan", 
      description: "Balanced approach",
      apyRate: "15.8",
      minimumAmount: "1000.00",
      maximumAmount: "10000.00",
      durationDays: 90,
      isActive: true
    },
    {
      id: 3,
      name: "Premium Plan",
      description: "Maximum returns",
      apyRate: "22.3",
      minimumAmount: "10000.00",
      maximumAmount: "100000.00",
      durationDays: 180,
      isActive: true
    }
  ]);
});

app.get('/api/users', (req, res) => {
  res.json([
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
      balance: "15000.00",
      isActive: true
    }
  ]);
});

// Basic frontend
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
            padding: 0;
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
            max-width: 600px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          }
          .logo { 
            font-size: 36px; 
            font-weight: bold; 
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          }
          .status { 
            font-size: 20px; 
            margin-bottom: 30px;
            opacity: 0.9;
          }
          .success {
            color: #4ade80;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .endpoints {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 25px;
            margin-top: 30px;
            text-align: left;
          }
          .endpoint {
            margin: 15px 0;
            padding: 10px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            font-family: monospace;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .endpoint a {
            color: #ffffff;
            text-decoration: none;
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            transition: all 0.3s ease;
          }
          .endpoint a:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">BlackCnote</div>
          <div class="status">Investment Platform</div>
          <div class="success">✓ Server Successfully Restored</div>
          <div>Step 1: Basic functionality is working</div>
          
          <div class="endpoints">
            <div class="endpoint">
              <span>Health Check</span>
              <a href="/api/health">Test</a>
            </div>
            <div class="endpoint">
              <span>Investment Plans</span>
              <a href="/api/investment-plans">View</a>
            </div>
            <div class="endpoint">
              <span>Users</span>
              <a href="/api/users">View</a>
            </div>
          </div>
          
          <div style="margin-top: 30px; font-size: 14px; opacity: 0.7;">
            Next: Add database connection, then restore full features
          </div>
        </div>
      </body>
    </html>
  `);
});

// Error handling
app.use((error: any, req: any, res: any, next: any) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 BlackCnote Step 1 Server running on port ${PORT}`);
  console.log(`🌐 Open: http://localhost:${PORT}`);
});