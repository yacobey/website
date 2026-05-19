/**
 * Send a draft social-media post to the approver as a one-click email.
 *
 * Uses SendGrid if SENDGRID_API_KEY + SOCIAL_APPROVAL_EMAIL + SOCIAL_APPROVAL_FROM
 * are all set; otherwise logs the approval links so the workflow still
 * works in local development.
 */

import sgMail from "@sendgrid/mail";
import type { SocialPostDraft } from "@shared/schema";

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export interface ApprovalEmailLinks {
  approveUrl: string;
  rejectUrl: string;
}

function htmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(draft: SocialPostDraft, links: ApprovalEmailLinks): string {
  const messageHtml = htmlEscape(draft.message).replace(/\n/g, "<br/>");
  const linkBlock = draft.link
    ? `<p style="color:#555;font-size:13px;margin:8px 0 0 0;">Attached link: <a href="${htmlEscape(draft.link)}">${htmlEscape(draft.link)}</a></p>`
    : "";
  return `<!DOCTYPE html><html><body style="font-family:-apple-system,Segoe UI,sans-serif;background:#f7f7f9;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;padding:24px;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
    <p style="font-size:13px;color:#888;margin:0 0 4px 0;">Draft for ${htmlEscape(draft.platform)}</p>
    <h2 style="margin:0 0 16px 0;font-size:18px;">A new social-media post is awaiting your approval</h2>
    <div style="background:#f0f2f5;border-radius:6px;padding:16px;font-size:15px;line-height:1.5;color:#1c1e21;">
      ${messageHtml}
      ${linkBlock}
    </div>
    <div style="margin-top:24px;text-align:center;">
      <a href="${htmlEscape(links.approveUrl)}" style="display:inline-block;background:#1877f2;color:#fff;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:600;margin-right:8px;">Approve &amp; Post</a>
      <a href="${htmlEscape(links.rejectUrl)}" style="display:inline-block;background:#e4e6eb;color:#1c1e21;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:600;">Reject</a>
    </div>
    <p style="font-size:12px;color:#888;margin:24px 0 0 0;">If you didn't request this, you can safely ignore it — the post will not go out without your approval.</p>
  </div>
</body></html>`;
}

function buildText(draft: SocialPostDraft, links: ApprovalEmailLinks): string {
  return [
    `A new ${draft.platform} post is awaiting your approval.`,
    "",
    "----- DRAFT -----",
    draft.message,
    draft.link ? `\nLink: ${draft.link}` : "",
    "-----------------",
    "",
    `Approve & Post: ${links.approveUrl}`,
    `Reject:         ${links.rejectUrl}`,
  ].join("\n");
}

export async function sendDraftForApproval(
  draft: SocialPostDraft,
  links: ApprovalEmailLinks,
): Promise<{ delivered: boolean }> {
  const to = process.env.SOCIAL_APPROVAL_EMAIL;
  const from = process.env.SOCIAL_APPROVAL_FROM;

  if (!process.env.SENDGRID_API_KEY || !to || !from) {
    console.log(
      "[social] SendGrid/approval email not fully configured — printing approval links instead.",
    );
    console.log(`[social] Approve: ${links.approveUrl}`);
    console.log(`[social] Reject:  ${links.rejectUrl}`);
    return { delivered: false };
  }

  await sgMail.send({
    to,
    from,
    subject: `Approve ${draft.platform} post draft #${draft.id}`,
    text: buildText(draft, links),
    html: buildHtml(draft, links),
  });
  return { delivered: true };
}
