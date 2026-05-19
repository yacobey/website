/**
 * Orchestrates the AI-draft → email-approval → publish-to-Facebook flow.
 *
 * Public entry points:
 *   - queueDraft(input)           generate content + persist + email approver
 *   - approveAndPublish(token)    redeem a token, publish to the platform
 *   - rejectDraft(token)          redeem a token, mark rejected
 */

import crypto from "crypto";
import { storage } from "../storage";
import { generateDraftFromBlogPost, generateDraftFromTopic } from "./content";
import { sendDraftForApproval } from "./email";
import {
  postToFacebookPage,
  isFacebookConfigured,
  FacebookApiError,
} from "./facebook";
import type { BlogPost, SocialPostDraft } from "@shared/schema";

export type QueueDraftInput =
  | { kind: "blog"; blogPost: BlogPost; platform?: "facebook" }
  | { kind: "topic"; topic: string; platform?: "facebook" }
  | { kind: "manual"; message: string; link?: string; platform?: "facebook" };

export interface QueueDraftResult {
  draft: SocialPostDraft;
  approvalEmailDelivered: boolean;
}

function getSiteOrigin(): string | undefined {
  return process.env.PUBLIC_SITE_URL || process.env.FRONTEND_ORIGIN || undefined;
}

function buildApprovalLinks(token: string): { approveUrl: string; rejectUrl: string } {
  const origin = getSiteOrigin() || "http://localhost:5000";
  const base = origin.replace(/\/$/, "");
  return {
    approveUrl: `${base}/api/social/drafts/approve?token=${encodeURIComponent(token)}`,
    rejectUrl: `${base}/api/social/drafts/reject?token=${encodeURIComponent(token)}`,
  };
}

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function queueDraft(input: QueueDraftInput): Promise<QueueDraftResult> {
  const platform = input.platform ?? "facebook";
  let message: string;
  let link: string | undefined;
  let source: SocialPostDraft["source"];
  let blogPostId: number | null = null;
  let topic: string | null = null;

  if (input.kind === "blog") {
    const generated = await generateDraftFromBlogPost(input.blogPost, getSiteOrigin());
    message = generated.message;
    link = generated.link;
    source = "ai_blog";
    blogPostId = input.blogPost.id;
  } else if (input.kind === "topic") {
    const generated = await generateDraftFromTopic(input.topic);
    message = generated.message;
    source = "ai_topic";
    topic = input.topic;
  } else {
    message = input.message;
    link = input.link;
    source = "manual";
  }

  const approvalToken = generateToken();
  const draft = await storage.createSocialPostDraft({
    platform,
    source,
    blogPostId,
    topic,
    message,
    link: link ?? null,
    status: "pending",
    approvalToken,
  });

  const links = buildApprovalLinks(approvalToken);
  const { delivered } = await sendDraftForApproval(draft, links);
  return { draft, approvalEmailDelivered: delivered };
}

export type RedeemOutcome =
  | { ok: true; draft: SocialPostDraft }
  | { ok: false; reason: "not_found" | "already_decided"; status?: SocialPostDraft["status"] };

/**
 * Approve a draft by its one-time token, publish it to the platform, and
 * return the updated draft. Idempotent in the sense that re-using a token
 * that already transitioned out of "pending" returns { ok: false }.
 */
export async function approveAndPublish(token: string): Promise<RedeemOutcome> {
  const draft = await storage.getSocialPostDraftByToken(token);
  if (!draft) return { ok: false, reason: "not_found" };
  if (draft.status !== "pending") {
    return { ok: false, reason: "already_decided", status: draft.status };
  }

  // Mark approved up front so a second click on the email link can't
  // double-post even under a race condition.
  const approved = await storage.updateSocialPostDraft(draft.id, {
    status: "approved",
    decidedAt: new Date(),
  });
  if (!approved) return { ok: false, reason: "not_found" };

  if (approved.platform !== "facebook") {
    const failed = await storage.updateSocialPostDraft(approved.id, {
      status: "failed",
      errorMessage: `Unsupported platform: ${approved.platform}`,
    });
    return { ok: true, draft: failed ?? approved };
  }

  if (!isFacebookConfigured()) {
    const failed = await storage.updateSocialPostDraft(approved.id, {
      status: "failed",
      errorMessage: "Facebook is not configured on the server.",
    });
    return { ok: true, draft: failed ?? approved };
  }

  try {
    const result = await postToFacebookPage({
      message: approved.message,
      link: approved.link ?? undefined,
    });
    const posted = await storage.updateSocialPostDraft(approved.id, {
      status: "posted",
      externalPostId: result.id,
      postedAt: new Date(),
    });

    // If the draft was generated from a blog post, flip its socialMediaPosted flag.
    if (posted && posted.blogPostId) {
      const blog = await storage.getBlogPostById(posted.blogPostId);
      if (blog) {
        await storage.updateBlogPost(blog.slug, { socialMediaPosted: true });
      }
    }

    return { ok: true, draft: posted ?? approved };
  } catch (err) {
    const errorMessage =
      err instanceof FacebookApiError
        ? `Facebook API error (HTTP ${err.status}): ${err.message}`
        : err instanceof Error
        ? err.message
        : "Unknown error";
    const failed = await storage.updateSocialPostDraft(approved.id, {
      status: "failed",
      errorMessage,
    });
    return { ok: true, draft: failed ?? approved };
  }
}

export async function rejectDraft(token: string): Promise<RedeemOutcome> {
  const draft = await storage.getSocialPostDraftByToken(token);
  if (!draft) return { ok: false, reason: "not_found" };
  if (draft.status !== "pending") {
    return { ok: false, reason: "already_decided", status: draft.status };
  }
  const updated = await storage.updateSocialPostDraft(draft.id, {
    status: "rejected",
    decidedAt: new Date(),
  });
  return { ok: true, draft: updated ?? draft };
}
