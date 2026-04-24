import { describe, it, expect, vi, beforeAll } from "vitest";
import request from "supertest";
import express from "express";

vi.mock("../db", () => ({
  db: {
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        limit: vi.fn().mockResolvedValue([]),
      }),
    }),
  },
}));

vi.mock("../db-optimizations", () => ({
  optimizeResultSet: vi.fn().mockImplementation((results: unknown[], pageSize = 50) => ({
    data: results.slice(0, pageSize),
    hasMore: results.length > pageSize,
    total: results.length,
  })),
  checkDatabaseHealth: vi.fn().mockResolvedValue({
    status: "healthy",
    latency: 5,
    connections: { total: 2, idle: 2, active: 0 },
  }),
}));

vi.mock("../storage", () => ({
  storage: {
    getBlogPosts: vi.fn().mockResolvedValue([]),
  },
}));

import type { Request, Response, NextFunction } from "express";
import { addPerformanceRoutes } from "../routes-performance";

const noopAuth = (_req: Request, _res: Response, next: NextFunction) => next();

describe("Performance Routes", () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    addPerformanceRoutes(app, noopAuth);
  });

  describe("GET /api/health", () => {
    it("responds with HTTP 200", async () => {
      const res = await request(app).get("/api/health");
      expect(res.status).toBe(200);
    });

    it("returns JSON with all required fields", async () => {
      const res = await request(app).get("/api/health");
      expect(res.headers["content-type"]).toMatch(/application\/json/);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("dbLatency");
      expect(res.body).toHaveProperty("uptime");
      expect(res.body).toHaveProperty("memory");
      expect(res.body).toHaveProperty("timestamp");
    });

    it("status is one of: healthy, degraded, unhealthy", async () => {
      const res = await request(app).get("/api/health");
      expect(["healthy", "degraded", "unhealthy"]).toContain(res.body.status);
    });

    it("dbLatency is a non-negative number", async () => {
      const res = await request(app).get("/api/health");
      expect(typeof res.body.dbLatency).toBe("number");
      expect(res.body.dbLatency).toBeGreaterThanOrEqual(0);
    });

    it("uptime is a non-negative number", async () => {
      const res = await request(app).get("/api/health");
      expect(typeof res.body.uptime).toBe("number");
      expect(res.body.uptime).toBeGreaterThanOrEqual(0);
    });

    it("memory contains rss, heapUsed, heapTotal, external", async () => {
      const res = await request(app).get("/api/health");
      expect(res.body.memory).toHaveProperty("rss");
      expect(res.body.memory).toHaveProperty("heapUsed");
      expect(res.body.memory).toHaveProperty("heapTotal");
      expect(res.body.memory).toHaveProperty("external");
    });

    it("timestamp is a valid ISO 8601 string", async () => {
      const res = await request(app).get("/api/health");
      expect(typeof res.body.timestamp).toBe("string");
      expect(new Date(res.body.timestamp).toISOString()).toBe(res.body.timestamp);
    });

    it("returns error shape when database query fails", async () => {
      const { db } = await import("../db");
      const mockDb = db as ReturnType<typeof vi.fn>;
      vi.mocked(mockDb.select).mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          limit: vi.fn().mockRejectedValueOnce(new Error("DB connection lost")),
        }),
      } as any);

      const res = await request(app).get("/api/health");
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("status", "error");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("GET /api/performance", () => {
    it("responds with HTTP 200", async () => {
      const res = await request(app).get("/api/performance");
      expect(res.status).toBe(200);
    });

    it("returns JSON with all required fields", async () => {
      const res = await request(app).get("/api/performance");
      expect(res.headers["content-type"]).toMatch(/application\/json/);
      expect(res.body).toHaveProperty("memory");
      expect(res.body).toHaveProperty("uptime");
      expect(res.body).toHaveProperty("cpu");
      expect(res.body).toHaveProperty("timestamp");
    });

    it("uptime is a non-negative number", async () => {
      const res = await request(app).get("/api/performance");
      expect(typeof res.body.uptime).toBe("number");
      expect(res.body.uptime).toBeGreaterThanOrEqual(0);
    });

    it("memory contains rss, heapUsed, heapTotal, external", async () => {
      const res = await request(app).get("/api/performance");
      expect(res.body.memory).toHaveProperty("rss");
      expect(res.body.memory).toHaveProperty("heapUsed");
      expect(res.body.memory).toHaveProperty("heapTotal");
      expect(res.body.memory).toHaveProperty("external");
    });

    it("cpu contains user and system usage numbers", async () => {
      const res = await request(app).get("/api/performance");
      expect(res.body.cpu).toHaveProperty("user");
      expect(res.body.cpu).toHaveProperty("system");
      expect(typeof res.body.cpu.user).toBe("number");
      expect(typeof res.body.cpu.system).toBe("number");
    });

    it("timestamp is a valid ISO 8601 string", async () => {
      const res = await request(app).get("/api/performance");
      expect(typeof res.body.timestamp).toBe("string");
      expect(new Date(res.body.timestamp).toISOString()).toBe(res.body.timestamp);
    });
  });
});
