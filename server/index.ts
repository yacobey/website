import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import compression from "compression";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Performance middleware - compression
app.use(compression({
  level: 6, // Good balance between compression and speed
  threshold: 1024, // Only compress files larger than 1KB
  filter: (req, res) => {
    // Don't compress if request includes 'x-no-compression'
    if (req.headers['x-no-compression']) {
      return false;
    }
    // Use compression filter
    return compression.filter(req, res);
  }
}));

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://js.stripe.com", "https://www.googletagmanager.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.stripe.com", "https://www.google-analytics.com"],
      frameSrc: ["'self'", "https://js.stripe.com", "https://calendly.com"]
    }
  },
  crossOriginEmbedderPolicy: false
}));

// Performance optimizations for body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Custom domain routing middleware - AGGRESSIVE CACHE BYPASS
app.use((req, res, next) => {
  const host = req.get('host');
  
  // Force all requests to be treated as coming from Replit deployment
  if (host === 'selamcpa.com' || host === 'www.selamcpa.com') {
    // Aggressive anti-cache headers
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Last-Modified', new Date().toUTCString());
    res.setHeader('ETag', `"${Date.now()}"`);
    
    // Override any CDN/proxy caching
    res.setHeader('Surrogate-Control', 'no-store');
    res.setHeader('X-Accel-Expires', '0');
    res.setHeader('Vary', 'Origin');
    
    // Custom headers for identification
    res.setHeader('X-Custom-Domain', 'selamcpa.com');
    res.setHeader('X-Replit-Force', 'true');
    res.setHeader('X-Content-Source', 'replit-deployment');
    
    // Log ALL requests for debugging
    console.log(`CUSTOM DOMAIN REQUEST: ${req.method} ${req.url} from ${host} - User-Agent: ${req.get('User-Agent')}`);
  }
  
  next();
});

// Performance headers with custom domain override
app.use((req, res, next) => {
  const host = req.get('host');
  const isCustomDomain = host === 'selamcpa.com' || host === 'www.selamcpa.com';
  
  if (isCustomDomain) {
    // For custom domain, force no cache on EVERYTHING
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  } else {
    // Normal caching for temporary domain
    if (req.url.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
    } else if (req.url.match(/\.(html|htm)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes for HTML
    } else if (req.url.startsWith('/api/')) {
      res.setHeader('Cache-Control', 'public, max-age=60'); // 1 minute
    }
  }
  
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
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
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
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
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
