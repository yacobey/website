/**
 * AI-driven generator for short Facebook posts tuned for engagement.
 *
 * Two flavors:
 *   - generateDraftFromBlogPost(post) — teaser that links back to the blog article
 *   - generateDraftFromTopic(topic)   — standalone post on a given topic
 *
 * Both return { message, link? } ready to feed into postToFacebookPage().
 */

import OpenAI from "openai";
import type { BlogPost } from "@shared/schema";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export interface SocialDraftOutput {
  message: string;
  link?: string;
}

const FACEBOOK_SYSTEM_PROMPT = `You are a social-media copywriter for Selam CPA, a full-service accounting firm.
Write Facebook Page posts that maximize organic reach and engagement.

VOICE: Confident, friendly, helpful. Professional but human. Never salesy.

STRUCTURE:
- Open with a scroll-stopping hook in line 1 (a surprising stat, a sharp question, a relatable pain point).
- Deliver 1 concrete piece of value in the body (a tip, a number, a quick "did you know").
- Close with a low-pressure call-to-action (a question that invites comments, or "DM us / link in comments").
- Add 3–5 relevant hashtags on the last line. Mix broad (#SmallBusiness) and niche (#Form1120S).

CONSTRAINTS:
- 80–250 words total (Facebook engagement falls off above ~280 words).
- Plain text only — no markdown, no asterisks, no headers.
- Use line breaks for rhythm. Emojis sparingly (≤ 2, only if they help readability).
- Never invent specific tax-law citations or numbers; speak in generalities or use widely-known figures.
- Do not include URLs in the body — a link card will be attached separately.

OUTPUT: Return ONLY the post text. No preface, no quotes, no explanation.`;

async function callOpenAI(userPrompt: string): Promise<string> {
  if (!openai) {
    throw new Error("OpenAI API key not configured");
  }
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: FACEBOOK_SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    max_tokens: 500,
    temperature: 0.85,
  });
  const text = response.choices[0]?.message?.content?.trim();
  if (!text) {
    throw new Error("OpenAI returned an empty social-post draft");
  }
  return text;
}

export async function generateDraftFromBlogPost(
  post: Pick<BlogPost, "title" | "excerpt" | "category" | "slug">,
  siteOrigin?: string,
): Promise<SocialDraftOutput> {
  const userPrompt = `Write a Facebook Page post that teases this new blog article and drives clicks to it.

Article title: ${post.title}
Category: ${post.category}
Summary: ${post.excerpt}

The hook should reflect the article's main idea. The CTA should invite readers to read the full post via the attached link.`;

  const message = await callOpenAI(userPrompt);
  const link = siteOrigin ? `${siteOrigin.replace(/\/$/, "")}/blog/${post.slug}` : undefined;
  return { message, link };
}

export async function generateDraftFromTopic(topic: string): Promise<SocialDraftOutput> {
  const userPrompt = `Write a Facebook Page post on this topic:

Topic: ${topic}

Make it stand on its own (no link needed). Optimize for comments and shares.`;
  const message = await callOpenAI(userPrompt);
  return { message };
}
