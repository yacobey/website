/**
 * Unit tests for the Facebook Graph API client.
 *
 * The fetch implementation is injected, so these tests run entirely
 * offline. We assert on URL shape, body encoding, error handling, and
 * the "configuration guard" that prevents accidental partial deploys.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  postToFacebookPage,
  isFacebookConfigured,
  FacebookNotConfiguredError,
  FacebookApiError,
} from "../social/facebook";

interface CapturedCall {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

function makeFakeFetch(
  response: { status: number; body: any | string },
): { fetch: typeof fetch; calls: CapturedCall[] } {
  const calls: CapturedCall[] = [];
  const fakeFetch = (async (input: any, init?: any) => {
    const url = typeof input === "string" ? input : input.url;
    calls.push({
      url,
      method: init?.method,
      headers: init?.headers,
      body: typeof init?.body === "string" ? init.body : undefined,
    });
    const bodyStr =
      typeof response.body === "string" ? response.body : JSON.stringify(response.body);
    return {
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      text: async () => bodyStr,
    } as unknown as Response;
  }) as unknown as typeof fetch;
  return { fetch: fakeFetch, calls };
}

const ORIGINAL_ENV = { ...process.env };

beforeEach(() => {
  process.env.FACEBOOK_PAGE_ID = "1234567890";
  process.env.FACEBOOK_PAGE_ACCESS_TOKEN = "test-access-token";
  delete process.env.FACEBOOK_GRAPH_API_VERSION;
});

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
  vi.restoreAllMocks();
});

describe("isFacebookConfigured", () => {
  it("returns true when both env vars are set", () => {
    expect(isFacebookConfigured()).toBe(true);
  });

  it("returns false when the page id is missing", () => {
    delete process.env.FACEBOOK_PAGE_ID;
    expect(isFacebookConfigured()).toBe(false);
  });

  it("returns false when the access token is missing", () => {
    delete process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
    expect(isFacebookConfigured()).toBe(false);
  });
});

describe("postToFacebookPage — happy path", () => {
  it("targets the configured page's feed endpoint with the default Graph version", async () => {
    const { fetch, calls } = makeFakeFetch({
      status: 200,
      body: { id: "1234567890_999" },
    });
    await postToFacebookPage({ message: "hello world" }, fetch);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(
      "https://graph.facebook.com/v19.0/1234567890/feed",
    );
  });

  it("respects FACEBOOK_GRAPH_API_VERSION when set", async () => {
    process.env.FACEBOOK_GRAPH_API_VERSION = "v18.0";
    const { fetch, calls } = makeFakeFetch({
      status: 200,
      body: { id: "abc_def" },
    });
    await postToFacebookPage({ message: "hi" }, fetch);
    expect(calls[0].url).toBe("https://graph.facebook.com/v18.0/1234567890/feed");
  });

  it("uses POST with form-encoded body containing message + access_token", async () => {
    const { fetch, calls } = makeFakeFetch({
      status: 200,
      body: { id: "1234567890_42" },
    });
    await postToFacebookPage({ message: "engagement post" }, fetch);
    expect(calls[0].method).toBe("POST");
    const params = new URLSearchParams(calls[0].body || "");
    expect(params.get("message")).toBe("engagement post");
    expect(params.get("access_token")).toBe("test-access-token");
  });

  it("includes the link field when provided", async () => {
    const { fetch, calls } = makeFakeFetch({
      status: 200,
      body: { id: "1234567890_77" },
    });
    await postToFacebookPage(
      { message: "see this", link: "https://example.com/blog/x" },
      fetch,
    );
    const params = new URLSearchParams(calls[0].body || "");
    expect(params.get("link")).toBe("https://example.com/blog/x");
  });

  it("omits the link field when not provided (no empty 'link=')", async () => {
    const { fetch, calls } = makeFakeFetch({
      status: 200,
      body: { id: "1234567890_77" },
    });
    await postToFacebookPage({ message: "no link" }, fetch);
    const params = new URLSearchParams(calls[0].body || "");
    expect(params.has("link")).toBe(false);
  });

  it("returns the post id parsed from the response", async () => {
    const { fetch } = makeFakeFetch({
      status: 200,
      body: { id: "1234567890_555" },
    });
    const result = await postToFacebookPage({ message: "x" }, fetch);
    expect(result).toEqual({ id: "1234567890_555" });
  });

  it("sets application/x-www-form-urlencoded content-type", async () => {
    const { fetch, calls } = makeFakeFetch({
      status: 200,
      body: { id: "x" },
    });
    await postToFacebookPage({ message: "y" }, fetch);
    expect(calls[0].headers?.["Content-Type"]).toBe(
      "application/x-www-form-urlencoded",
    );
  });

  it("does not put the access token in the URL (kept in body to avoid logs)", async () => {
    const { fetch, calls } = makeFakeFetch({
      status: 200,
      body: { id: "x" },
    });
    await postToFacebookPage({ message: "y" }, fetch);
    expect(calls[0].url).not.toContain("access_token");
    expect(calls[0].url).not.toContain("test-access-token");
  });
});

describe("postToFacebookPage — error paths", () => {
  it("throws FacebookNotConfiguredError when env vars are missing", async () => {
    delete process.env.FACEBOOK_PAGE_ID;
    const { fetch } = makeFakeFetch({ status: 200, body: { id: "x" } });
    await expect(postToFacebookPage({ message: "y" }, fetch)).rejects.toBeInstanceOf(
      FacebookNotConfiguredError,
    );
  });

  it("throws FacebookApiError with the Graph error message on non-2xx", async () => {
    const { fetch } = makeFakeFetch({
      status: 400,
      body: { error: { message: "Invalid OAuth access token", code: 190 } },
    });
    try {
      await postToFacebookPage({ message: "y" }, fetch);
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).toBeInstanceOf(FacebookApiError);
      const e = err as FacebookApiError;
      expect(e.status).toBe(400);
      expect(e.message).toBe("Invalid OAuth access token");
    }
  });

  it("falls back to a generic message when Graph returns no error.message", async () => {
    const { fetch } = makeFakeFetch({ status: 500, body: "not json" });
    try {
      await postToFacebookPage({ message: "y" }, fetch);
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).toBeInstanceOf(FacebookApiError);
      expect((err as FacebookApiError).message).toContain("HTTP 500");
    }
  });

  it("throws FacebookApiError when a 2xx response is missing an id field", async () => {
    const { fetch } = makeFakeFetch({ status: 200, body: { not_an_id: true } });
    await expect(postToFacebookPage({ message: "y" }, fetch)).rejects.toBeInstanceOf(
      FacebookApiError,
    );
  });
});
