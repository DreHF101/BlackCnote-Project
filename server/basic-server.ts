import express from "express";
import path from "path";
import fs from "fs";

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

// Serve client files
app.get('*', (req, res) => {
  const clientPath = path.resolve(process.cwd(), 'client', 'index.html');
  if (fs.existsSync(clientPath)) {
    res.sendFile(clientPath);
  } else {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>BlackCnote - Loading...</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .logo { font-size: 24px; font-weight: bold; color: #333; }
            .status { color: #666; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="logo">BlackCnote Investment Platform</div>
          <div class="status">Server is running - Setting up frontend...</div>
        </body>
      </html>
    `);
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 BlackCnote Basic Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});