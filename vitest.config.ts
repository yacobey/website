import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: ["./client/src/test/setup.ts"],
    environment: "jsdom",
    environmentMatchGlobs: [
      ["server/**", "node"],
      ["server/__tests__/**", "node"],
    ],
    include: [
      "client/src/**/*.test.ts",
      "client/src/**/*.test.tsx",
      "server/**/*.test.ts",
      "server/__tests__/**/*.test.ts",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
});
