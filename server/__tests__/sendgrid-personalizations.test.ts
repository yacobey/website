/**
 * Tests for the SendGrid personalization payload structure.
 *
 * Two complementary layers of protection:
 *
 * 1. WORKFLOW STRUCTURE TESTS — read `.github/workflows/security.yml`
 *    directly and assert the shell script contains the patterns required
 *    for per-recipient isolation.  If the workflow is reverted to a single
 *    shared personalization these tests fail.
 *
 * 2. PAYLOAD BUILDER TESTS — exercise `buildSendGridPayload()`, a
 *    TypeScript implementation of the same loop logic, with fine-grained
 *    assertions about the resulting JSON structure.
 *
 * Together they ensure (a) the live workflow file stays correct and (b) the
 * logic itself behaves correctly for edge cases (whitespace, bad addresses, …).
 */

import { describe, it, expect, beforeAll } from "vitest";
import fs from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface PersonalizationEntry {
  to: { email: string }[];
  subject: string;
}

interface SendGridPayload {
  personalizations: PersonalizationEntry[];
  from: { email: string };
  content: { type: string; value: string }[];
}

/**
 * Mirrors the payload-building loop from the security workflow:
 *
 *   IFS=',' read -ra RAW_EMAILS <<< "$SECURITY_ALERT_EMAIL"
 *   for raw in "${RAW_EMAILS[@]}"; do
 *     trimmed="$(echo "$raw" | xargs)"
 *     ENTRY='{"to":[{"email":"$trimmed"}],"subject":"..."}'
 *     PERSONALIZATIONS_JSON="${PERSONALIZATIONS_JSON:+$PERSONALIZATIONS_JSON,}$ENTRY"
 *   done
 *
 * Returns null when any address is invalid (mirrors `exit 1` in the script).
 */
function buildSendGridPayload(
  rawEmailList: string,
  fromEmail: string,
  subject: string,
  bodyText: string,
): SendGridPayload | null {
  const emails = rawEmailList
    .split(",")
    .map((e) => e.trim())
    .filter((e) => e.length > 0);

  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const personalizations: PersonalizationEntry[] = [];
  let invalidFound = false;

  for (const email of emails) {
    if (!emailRegex.test(email)) {
      invalidFound = true;
      continue;
    }
    personalizations.push({ to: [{ email }], subject });
  }

  if (invalidFound) return null;

  return {
    personalizations,
    from: { email: fromEmail },
    content: [{ type: "text/plain", value: bodyText }],
  };
}

// ---------------------------------------------------------------------------
// 1. WORKFLOW STRUCTURE TESTS
//    Read the actual .github/workflows/security.yml and assert that the
//    "Send email alert via SendGrid" step implements per-recipient
//    personalizations.  Scoping assertions to the specific step avoids
//    false positives from other SendGrid-related content in the file.
// ---------------------------------------------------------------------------

/**
 * Extract the shell script body of the named step from a workflow YAML
 * source string.  Returns everything between `- name: <stepName>` and the
 * next `- name:` or end-of-string.
 */
function extractStepBody(workflowSource: string, stepName: string): string {
  const escapedName = stepName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `- name:\\s*${escapedName}\\s*\\n([\\s\\S]*?)(?=\\n\\s*- name:|$)`,
  );
  const match = workflowSource.match(pattern);
  if (!match) throw new Error(`Step "${stepName}" not found in workflow YAML`);
  return match[1];
}

describe("security.yml — 'Send email alert via SendGrid' step structure", () => {
  let stepBody: string;

  beforeAll(() => {
    const workflowPath = path.resolve(
      __dirname,
      "../../.github/workflows/security.yml",
    );
    const workflowSource = fs.readFileSync(workflowPath, "utf8");
    stepBody = extractStepBody(workflowSource, "Send email alert via SendGrid");
  });

  it("step body is found and non-empty", () => {
    expect(stepBody.length).toBeGreaterThan(0);
  });

  it("loops over each email address instead of using a static list", () => {
    // The step must iterate over split addresses (for loop referencing RAW_EMAILS).
    expect(stepBody).toMatch(/for\s+\w+\s+in\s+.*RAW_EMAILS/);
  });

  it("builds a personalization entry inside the loop (one per address)", () => {
    // ENTRY is assigned inside the loop body and contains "to" and "email" tokens.
    expect(stepBody).toMatch(/ENTRY\s*=\s*.+to.+email/);
  });

  it("wraps the recipient in a single-item 'to' array", () => {
    // Pattern: "to":[{"email": ...}] — exactly one entry.
    // Quotes may be backslash-escaped in the shell script, so we match
    // the token sequence flexibly.
    expect(stepBody).toMatch(/\\?"to\\?":\s*\[\s*\{\\?\s*"?\\?"?email/);
  });

  it("does not place multiple addresses inside a single 'to' array", () => {
    // A regression would be: "to": ["alice@...", "bob@..."] in one entry.
    // This would expose recipient addresses to each other.
    expect(stepBody).not.toMatch(/to.*@.*,.*@.*email/);
  });

  it("accumulates separate personalization entries per loop iteration", () => {
    // Pattern: PERSONALIZATIONS_JSON="${PERSONALIZATIONS_JSON:+...}$ENTRY"
    expect(stepBody).toMatch(/PERSONALIZATIONS_JSON.*PERSONALIZATIONS_JSON.*ENTRY/s);
  });

  it("validates addresses before building the payload", () => {
    // There must be an address-validation guard (grep -qE or INVALID_FOUND flag).
    expect(stepBody).toMatch(/grep\s+-qE|INVALID_FOUND/);
  });

  it("aborts (exit 1) when any invalid address is detected", () => {
    expect(stepBody).toMatch(/INVALID_FOUND.*exit\s+1|exit\s+1.*INVALID_FOUND/s);
  });
});

// ---------------------------------------------------------------------------
// 2. PAYLOAD BUILDER TESTS
//    Exercise buildSendGridPayload() with fine-grained structural assertions.
// ---------------------------------------------------------------------------

describe("buildSendGridPayload() — per-recipient isolation", () => {
  const FROM = "alerts@example.com";
  const SUBJECT = "[Security Alert] Scan failed on owner/repo";
  const BODY = "Security scan failed\n\nFailed job(s): npm audit";

  describe("single recipient", () => {
    it("produces exactly one personalization entry", () => {
      const payload = buildSendGridPayload("alice@example.com", FROM, SUBJECT, BODY);
      expect(payload).not.toBeNull();
      expect(payload!.personalizations).toHaveLength(1);
    });

    it("the single entry addresses only that recipient", () => {
      const payload = buildSendGridPayload("alice@example.com", FROM, SUBJECT, BODY);
      expect(payload!.personalizations[0].to).toEqual([{ email: "alice@example.com" }]);
    });
  });

  describe("multiple recipients", () => {
    const RAW = "alice@example.com, bob@example.com, carol@example.com";

    it("produces one personalization per recipient", () => {
      const payload = buildSendGridPayload(RAW, FROM, SUBJECT, BODY);
      expect(payload).not.toBeNull();
      expect(payload!.personalizations).toHaveLength(3);
    });

    it("each personalization has exactly one address in its 'to' array", () => {
      const payload = buildSendGridPayload(RAW, FROM, SUBJECT, BODY);
      for (const p of payload!.personalizations) {
        expect(p.to).toHaveLength(1);
      }
    });

    it("each recipient appears in their own separate personalization", () => {
      const payload = buildSendGridPayload(RAW, FROM, SUBJECT, BODY);
      const addresses = payload!.personalizations.map((p) => p.to[0].email);
      expect(addresses).toEqual([
        "alice@example.com",
        "bob@example.com",
        "carol@example.com",
      ]);
    });

    it("every personalization uses the same subject", () => {
      const payload = buildSendGridPayload(RAW, FROM, SUBJECT, BODY);
      for (const p of payload!.personalizations) {
        expect(p.subject).toBe(SUBJECT);
      }
    });
  });

  describe("whitespace handling", () => {
    it("trims leading and trailing spaces around addresses", () => {
      const payload = buildSendGridPayload(
        "  alice@example.com  ,   bob@example.com  ",
        FROM,
        SUBJECT,
        BODY,
      );
      expect(payload).not.toBeNull();
      expect(payload!.personalizations).toHaveLength(2);
      expect(payload!.personalizations[0].to[0].email).toBe("alice@example.com");
      expect(payload!.personalizations[1].to[0].email).toBe("bob@example.com");
    });

    it("ignores empty segments between commas", () => {
      const payload = buildSendGridPayload(
        "alice@example.com,,bob@example.com",
        FROM,
        SUBJECT,
        BODY,
      );
      expect(payload).not.toBeNull();
      expect(payload!.personalizations).toHaveLength(2);
    });
  });

  describe("invalid address handling", () => {
    it("returns null when any address is invalid (mirrors workflow exit 1)", () => {
      const payload = buildSendGridPayload(
        "alice@example.com, not-an-email, bob@example.com",
        FROM,
        SUBJECT,
        BODY,
      );
      expect(payload).toBeNull();
    });

    it("rejects an address with no @ symbol", () => {
      expect(buildSendGridPayload("nodomain", FROM, SUBJECT, BODY)).toBeNull();
    });

    it("rejects an address with no domain dot", () => {
      expect(buildSendGridPayload("user@nodot", FROM, SUBJECT, BODY)).toBeNull();
    });
  });

  describe("payload top-level structure", () => {
    it("includes a 'from' field", () => {
      const payload = buildSendGridPayload("alice@example.com", FROM, SUBJECT, BODY);
      expect(payload!.from).toEqual({ email: FROM });
    });

    it("includes a non-empty 'content' array with plain text", () => {
      const payload = buildSendGridPayload("alice@example.com", FROM, SUBJECT, BODY);
      expect(payload!.content).toHaveLength(1);
      expect(payload!.content[0].type).toBe("text/plain");
      expect(payload!.content[0].value).toBe(BODY);
    });

    it("has no 'cc' or 'bcc' fields — recipients stay private", () => {
      const payload = buildSendGridPayload(
        "alice@example.com, bob@example.com",
        FROM,
        SUBJECT,
        BODY,
      );
      const raw = JSON.stringify(payload);
      expect(raw).not.toContain('"cc"');
      expect(raw).not.toContain('"bcc"');
    });
  });
});
