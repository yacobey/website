import type { IncomingMessage, ServerResponse } from "http";
import { ZodError, type ZodType } from "zod";

// Minimal request/response shapes shared by Vercel's runtime (which adds
// body parsing and the status/json helpers) and the local dev middleware
// in vite.config.ts (which polyfills them).
export interface ApiRequest extends IncomingMessage {
  body?: unknown;
}

export interface ApiResponse extends ServerResponse {
  status: (code: number) => ApiResponse;
  json: (data: unknown) => void;
}

type Handler<T> = (input: T) => Promise<unknown>;

// ZodType<T, any, any> so T is the schema's *output* type (e.g. fields with .default() applied)
export function jsonEndpoint<T>(schema: ZodType<T, any, any>, handler: Handler<T>, failureMessage: string) {
  return async (req: ApiRequest, res: ApiResponse) => {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
    try {
      const input = schema.parse(req.body);
      const result = await handler(input);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid request", errors: error.errors });
      }
      console.error(failureMessage, error);
      res.status(500).json({ message: failureMessage });
    }
  };
}
