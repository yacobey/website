import type { Express, Request, Response, NextFunction } from "express";
import { optimizeResultSet, checkDatabaseHealth } from "./db-optimizations";
import { storage } from "./storage";
import { db } from "./db";
import { users } from "@shared/schema";

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

// Performance monitoring endpoint
export function addPerformanceRoutes(app: Express, adminAuth: Middleware) {
  // Database health check — restricted to authenticated admins
  app.get("/api/health", adminAuth, async (req, res) => {
    try {
      const start = Date.now();
      // Test database connection
      await db.select().from(users).limit(1);
      const dbLatency = Date.now() - start;
      
      const health = {
        status: dbLatency < 100 ? 'healthy' : dbLatency < 500 ? 'degraded' : 'unhealthy',
        dbLatency,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date().toISOString()
      };
      
      res.json(health);
    } catch (error) {
      res.status(500).json({ 
        status: 'error', 
        message: 'Health check failed',
        error: (error as Error).message 
      });
    }
  });

  // Performance metrics endpoint — restricted to authenticated admins
  app.get("/api/performance", adminAuth, async (req, res) => {
    try {
      const metrics = {
        memory: process.memoryUsage(),
        uptime: process.uptime(),
        cpu: process.cpuUsage(),
        timestamp: new Date().toISOString()
      };
      
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ 
        message: 'Failed to get performance metrics',
        error: (error as Error).message 
      });
    }
  });

  // Optimized blog posts with pagination
  app.get("/api/blog/optimized", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;

      // Use optimized query
      const allPosts = await storage.getBlogPosts();
      const result = optimizeResultSet(allPosts.slice(offset, offset + limit), limit);
      
      res.json({
        ...result,
        page,
        totalPages: Math.ceil(allPosts.length / limit)
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Failed to fetch optimized blog posts',
        error: (error as Error).message 
      });
    }
  });

  // Cache status endpoint
  app.get("/api/cache-status", (req, res) => {
    const cacheHeaders = {
      'Cache-Control': req.get('Cache-Control'),
      'ETag': req.get('ETag'),
      'Last-Modified': req.get('Last-Modified'),
      'If-None-Match': req.get('If-None-Match'),
      'If-Modified-Since': req.get('If-Modified-Since')
    };

    res.json({
      cacheHeaders,
      timestamp: new Date().toISOString(),
      userAgent: req.get('User-Agent')
    });
  });
}