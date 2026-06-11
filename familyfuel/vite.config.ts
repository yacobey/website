import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import type { ApiRequest, ApiResponse } from "./api/_lib/http";

// Serves the same handlers Vercel deploys from api/, so `npm run dev` runs
// the full app locally. Polyfills Vercel's req.body parsing and res helpers.
function apiDevPlugin(): Plugin {
  const routes: Record<string, string> = {
    "/api/scan": "./api/scan",
    "/api/plan": "./api/plan",
    "/api/swap": "./api/swap",
  };

  return {
    name: "familyfuel-api-dev",
    configureServer(server: ViteDevServer) {
      for (const [path, modulePath] of Object.entries(routes)) {
        server.middlewares.use(path, (nodeReq, nodeRes) => {
          const req = nodeReq as ApiRequest;
          const res = nodeRes as ApiResponse;
          res.status = (code: number) => {
            res.statusCode = code;
            return res;
          };
          res.json = (data: unknown) => {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));
          };

          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", async () => {
            try {
              req.body = body ? JSON.parse(body) : undefined;
            } catch {
              return res.status(400).json({ message: "Invalid JSON body" });
            }
            try {
              const mod = await server.ssrLoadModule(modulePath);
              await mod.default(req, res);
            } catch (error) {
              console.error(`Error in ${path}:`, error);
              if (!res.writableEnded) {
                res.status(500).json({ message: "Internal server error" });
              }
            }
          });
        });
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), apiDevPlugin()],
});
