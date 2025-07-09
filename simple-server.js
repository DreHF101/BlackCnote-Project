import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the client/src directory
app.use(express.static(path.join(__dirname, 'client')));

// Basic API endpoints for testing
app.get('/api/test', (req, res) => {
  res.json({ message: 'BlackCnote API is working!', timestamp: new Date().toISOString() });
});

// Serve the main HTML file for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 BlackCnote Investment Platform serving on 0.0.0.0:${PORT}`);
  console.log(`🎯 Preview URL: https://5db379d8-9fc3-44b0-94e2-9a078ea6ab2c-00-2iut31ug47ekw.worf.replit.dev`);
});