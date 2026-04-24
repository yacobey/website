# Security Alert Email Recipients

This document explains how to control who receives email notifications when a security scan fails in CI.

## How it works

The `SECURITY_ALERT_EMAIL` GitHub Actions secret drives all alert recipients. The workflow reads this value, splits it on commas, and sends a single SendGrid request addressed to every recipient in the list. No code changes are needed to add or remove people.

## Adding or changing recipients

1. Go to **Settings → Secrets and variables → Actions** in the GitHub repository.
2. Find the secret named `SECURITY_ALERT_EMAIL`.
3. Click **Edit** (pencil icon).
4. Set the value to a comma-separated list of email addresses:

   ```
   alice@example.com, bob@example.com, security-team@example.com
   ```

   Spaces around commas are ignored, so both formats below are valid:

   ```
   alice@example.com,bob@example.com
   alice@example.com, bob@example.com
   ```

5. Click **Save secret**.

The next failing scan will deliver the alert to every address in the list.

## Removing a recipient

Edit the secret (step 1–3 above) and remove the address you no longer want to notify. Save the secret. No deployment or code change is required.

## Required secrets

| Secret | Purpose |
|---|---|
| `SENDGRID_API_KEY` | Authenticates requests to the SendGrid API |
| `SENDGRID_FROM_EMAIL` | The verified sender address shown in the From field |
| `SECURITY_ALERT_EMAIL` | Comma-separated list of recipient addresses |

If any of the three secrets above is missing or empty the email step is skipped silently — no error is raised.

## Address validation

Before sending any email, the workflow validates both the sender and recipient addresses against a basic email pattern (`local-part@domain.tld`).

**Sender address (`SENDGRID_FROM_EMAIL`)** is checked first. If it fails validation the step exits immediately with a message such as:

```
ERROR: 'alertexample.com' is not a valid sender address. Fix SENDGRID_FROM_EMAIL and re-run.
```

**Recipient addresses (`SECURITY_ALERT_EMAIL`)** are then validated one by one. If any address fails, the step exits with a message such as:

```
ERROR: 'alice@' is not a valid email address. Fix SECURITY_ALERT_EMAIL and re-run.
One or more recipient addresses in SECURITY_ALERT_EMAIL are invalid. Aborting email alert.
```

Both checks cause the workflow step to **fail visibly** rather than silently dropping the alert. To fix either issue, update the relevant secret (see above) and re-run the workflow.

## SendGrid sender verification

Setting `SENDGRID_FROM_EMAIL` to a syntactically valid address is not enough on its own. SendGrid requires the address to be a **verified Sender Identity** before it will accept outgoing mail from it. If the address passes the regex check but has not been verified, the API returns a `403 Forbidden` response and the workflow step will print a message like:

```
WARNING: The sender address 'alerts@example.com' appears to be unverified in SendGrid.
A syntactically valid address still requires Sender Identity verification before SendGrid will accept it.
To verify your sender, visit: https://app.sendgrid.com/settings/sender_auth
```

### How to verify a sender

1. Log in to [SendGrid](https://app.sendgrid.com).
2. Go to **Settings → Sender Authentication**.
3. Choose **Verify a Single Sender** (for individual addresses) or set up **Domain Authentication** (recommended for production use).
4. Follow the on-screen steps to verify the address you have stored in `SENDGRID_FROM_EMAIL`.
5. Re-run the workflow — the email step should now succeed.

More details are available in the [SendGrid Sender Identity documentation](https://docs.sendgrid.com/ui/sending-email/sender-verification).

## Other notification channels

The workflow also posts a comment on the pull request and, if `SLACK_WEBHOOK_URL` is set, sends a Slack message. Those channels are independent of `SECURITY_ALERT_EMAIL`.
