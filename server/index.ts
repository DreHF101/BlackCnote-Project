import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { registerWordPressCompatibilityRoutes } from "./wordpress-api";
import { setupVite, serveStatic, log } from "./vite";
import { seedDatabase } from "./seed";
import cors from 'cors';

const app = express();

// Security and CORS middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'development' 
    ? ['http://localhost:3000', 'http://localhost:5174', 'http://localhost:5000', /\.replit\.dev$/, /\.worf\.replit\.dev$/]
    : true,
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Allow framing for Replit preview
  if (process.env.NODE_ENV === 'development') {
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  } else {
    res.setHeader('X-Frame-Options', 'DENY');
  }
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Seed database with initial data
  await seedDatabase();
  
  // Register WordPress compatibility routes
  registerWordPressCompatibilityRoutes(app);
  
  const server = await registerRoutes(app);

  // Enhanced error handling
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    // Log error for debugging
    log(`Error ${status}: ${message} on ${req.method} ${req.path}`, "error");
    
    // Send structured error response
    res.status(status).json({ 
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  });

  // 404 handler for API routes
  app.use('/api/*', (req, res) => {
    res.status(404).json({
      success: false,
      message: `API endpoint not found: ${req.method} ${req.path}`
    });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  const host = "0.0.0.0";
  
  server.listen(port, host, () => {
    log(`🚀 BlackCnote Investment Platform serving on ${host}:${port}`);
    log(`📱 AI Investment Assistant: http://${host}:${port}/api/ai/recommendations`);
    log(`🔒 Security Features: http://${host}:${port}/api/security/2fa/status`);
    log(`💰 HYIPLab Integration: http://${host}:${port}/api/hyiplab/plans`);
    log(`🎯 Preview URL: Ready for external connections`);
  });
})();
