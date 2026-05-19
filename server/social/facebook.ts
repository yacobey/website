/**
 * Minimal Facebook Graph API client for publishing posts to a Page feed.
 *
 * Credentials come from environment variables — there is no per-user OAuth.
 * To get a long-lived Page Access Token: https://developers.facebook.com/docs/pages/access-tokens
 *
 *   FACEBOOK_PAGE_ID            — numeric Page ID (e.g. "1234567890")
 *   FACEBOOK_PAGE_ACCESS_TOKEN  — Page Access Token with pages_manage_posts scope
 *   FACEBOOK_GRAPH_API_VERSION  — optional, defaults to v19.0
 */

const DEFAULT_GRAPH_VERSION = "v19.0";

export interface FacebookPostInput {
  message: string;
  link?: string;
}

export interface FacebookPostResult {
  /** Composite ID returned by the Graph API, e.g. "{page-id}_{post-id}". */
  id: string;
}

export class FacebookNotConfiguredError extends Error {
  constructor() {
    super(
      "Facebook is not configured. Set FACEBOOK_PAGE_ID and FACEBOOK_PAGE_ACCESS_TOKEN.",
    );
    this.name = "FacebookNotConfiguredError";
  }
}

export class FacebookApiError extends Error {
  status: number;
  fbError: unknown;
  constructor(status: number, fbError: unknown, message: string) {
    super(message);
    this.name = "FacebookApiError";
    this.status = status;
    this.fbError = fbError;
  }
}

export function isFacebookConfigured(): boolean {
  return Boolean(process.env.FACEBOOK_PAGE_ID && process.env.FACEBOOK_PAGE_ACCESS_TOKEN);
}

function getGraphVersion(): string {
  return process.env.FACEBOOK_GRAPH_API_VERSION || DEFAULT_GRAPH_VERSION;
}

/**
 * Publish a post to the configured Facebook Page feed.
 *
 * `fetchImpl` is injectable so tests can run without hitting the network.
 */
export async function postToFacebookPage(
  input: FacebookPostInput,
  fetchImpl: typeof fetch = fetch,
): Promise<FacebookPostResult> {
  if (!isFacebookConfigured()) {
    throw new FacebookNotConfiguredError();
  }
  const pageId = process.env.FACEBOOK_PAGE_ID!;
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN!;
  const version = getGraphVersion();

  // Graph API expects form-encoded fields on /{page-id}/feed. `link` is
  // optional and, when present, generates a link preview card in the post.
  const body = new URLSearchParams();
  body.set("message", input.message);
  if (input.link) body.set("link", input.link);
  body.set("access_token", accessToken);

  const url = `https://graph.facebook.com/${version}/${encodeURIComponent(pageId)}/feed`;

  const response = await fetchImpl(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const raw = await response.text();
  let parsed: any = null;
  try {
    parsed = raw ? JSON.parse(raw) : null;
  } catch {
    // leave parsed as null — handled below
  }

  if (!response.ok) {
    const fbMessage =
      parsed?.error?.message || `Graph API request failed (HTTP ${response.status})`;
    throw new FacebookApiError(response.status, parsed?.error ?? raw, fbMessage);
  }

  if (!parsed || typeof parsed.id !== "string") {
    throw new FacebookApiError(
      response.status,
      parsed ?? raw,
      "Graph API responded without a post id",
    );
  }

  return { id: parsed.id };
}
