import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import cookieParser from "cookie-parser";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Trust the first proxy hop (Replit's infrastructure)
app.set('trust proxy', 1);

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
      scriptSrc: ["'self'", "'unsafe-inline'",
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
        "https://js.stripe.com",
        "https://cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'",
        "https://api.anthropic.com",
        "https://www.google-analytics.com",
        "https://api.stripe.com"],
      frameSrc: ["https://js.stripe.com", "https://calendly.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Too many messages, please slow down.' }
});

app.use('/api/', apiLimiter);
app.use('/api/chat', chatLimiter);

// Performance optimizations for body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Cookie parser for payment authentication
app.use(cookieParser());

// Enhanced SSL and security middleware
app.use((req, res, next) => {
  const host = req.get('host');
  const protocol = req.get('x-forwarded-proto') || req.protocol;
  const forwardedHost = req.get('x-forwarded-host');
  
  // Domain connection monitoring for selamcpa.com
  if (host === 'selamcpa.com' || host === 'www.selamcpa.com') {
    console.log(`🔗 DOMAIN CONNECTION: ${host} → Selam CPA deployment`);
    console.log(`🔒 Security: ${protocol === 'https' ? 'SECURE' : 'REDIRECTING TO HTTPS'}`);
    if (protocol === 'https') {
      console.log(`✅ SUCCESS: selamcpa.com serving current Selam CPA website`);
    }
  }
  
  // Force HTTPS redirect only for custom domain (prevent development redirect loop)
  if (protocol !== 'https' && !req.url.startsWith('/health') && (host === 'selamcpa.com' || host === 'www.selamcpa.com')) {
    console.log(`🔒 SSL Redirect: ${protocol}://${host}${req.url} → https://${host}${req.url}`);
    return res.redirect(301, `https://${host}${req.url}`);
  }
  
  // Enhanced security headers for HTTPS
  if (protocol === 'https') {
    // HSTS (HTTP Strict Transport Security)
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    // SSL/TLS Security Headers
    res.setHeader('X-SSL-Enabled', 'true');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Custom domain identification
    if (host === 'selamcpa.com' || host === 'www.selamcpa.com') {
      res.setHeader('X-Custom-Domain-SSL', 'active');
      res.setHeader('X-Certificate-Status', 'secured');
      console.log(`✅ SECURE CUSTOM DOMAIN: ${req.method} ${req.url}`);
    }
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
