# Selam CPA — Social Posting Automation Setup

Goal: Claude drafts posts → you review → you approve → posts go live on **LinkedIn (personal)** and **Selam CPA Facebook Page**. Total cost: **$0/month**.

You don't write any code. You click through three tools to set this up once. After that, posting is: open Claude, ask for posts, paste them into a Google Sheet, check the "Approve" box, done.

---

## The architecture in plain English

```
1. You ask Claude:  "Draft me a week of LinkedIn posts for freelancers"
       ↓
2. Claude drafts the posts in chat
       ↓
3. You paste the drafts into a Google Sheet (one row per post)
       ↓
4. You review on phone or laptop, edit anything you want, then
   check the "Approve" box on each row you want to publish
       ↓
5. Make.com (free automation tool) sees the checkbox
       ↓
6. Make.com posts the row to LinkedIn or to the FB Page
       ↓
7. The Sheet row updates: Status = "Posted", with timestamp
```

The **"Approve" checkbox in the Sheet is your final permission step.** Nothing posts until you check it.

---

## What you'll set up (in order)

1. **Google Sheet** — your content calendar / approval queue (10 min)
2. **Facebook Page for Selam CPA** — if you don't have one yet (10 min)
3. **Make.com account** — the automation glue, free (5 min)
4. **Make.com scenario: LinkedIn** — connects Sheet → LinkedIn (15 min)
5. **Make.com scenario: Facebook Page** — connects Sheet → FB Page (10 min)
6. **First test post** — verify end-to-end (5 min)

**Total time: ~60 minutes once. After that, posting is 5 minutes per batch.**

---

## Step 1 — Build the Google Sheet

1. Go to **sheets.google.com** and click the **+** to create a new sheet.
2. Name it: **`Selam CPA — Social Posts`**
3. In **Row 1**, type these column headers exactly (one per column, A through H):

   | A | B | C | D | E | F | G | H |
   |---|---|---|---|---|---|---|---|
   | Date Drafted | Platform | Post Content | Image URL | Approve | Status | Posted At | Notes |

4. Click on **Column E** (the "Approve" column) → top menu **Insert → Checkbox**. This makes column E a checkbox column.
5. Click on **Column F** (the "Status" column header), then **Data → Data validation → Add rule → Dropdown** → add three options:
   - `Draft`
   - `Posted`
   - `Failed`
6. Click on **Column B** (the "Platform" column), then **Data → Data validation → Add rule → Dropdown** → add two options:
   - `LinkedIn`
   - `Facebook Page`
7. Freeze the header row: **View → Freeze → 1 row**.
8. Copy the **URL of this Sheet** — you'll need it in Step 4. The URL looks like `https://docs.google.com/spreadsheets/d/SOME_LONG_ID/edit`.

Done. The Sheet is your dashboard.

---

## Step 2 — Make sure you have a Facebook Page for Selam CPA

A Facebook **Page** is different from your personal profile. If you don't already have one:

1. Go to **facebook.com/pages/create**
2. Page name: **Selam CPA**
3. Category: **Accountant** (or **Tax Preparation Service** — pick whichever feels right)
4. Bio: copy 1–2 lines from your website's About section
5. Click **Create Page**
6. Add a profile photo (your logo) and a cover photo
7. Add basics under **Settings → Page Info**:
   - Website: `https://selamcpa.com`
   - Phone: `301-640-8549`
   - Email: `info@selamcpa.com`
   - Address: Laurel, MD

You only need to do this once.

If you already have a Selam CPA page, skip to Step 3.

---

## Step 3 — Create a Make.com account

1. Go to **make.com** → click **Get started free**.
2. Sign up with your Google account (the same one that owns the Sheet).
3. On the welcome screen, skip any "tutorial" prompts.
4. The free plan gives you **1,000 operations/month**. One post uses ~3 operations. That covers ~330 posts/month — way more than you'll publish.

---

## Step 4 — Build the LinkedIn scenario in Make.com

A "scenario" is just Make.com's word for an automation. You'll build one for LinkedIn, then a near-identical one for Facebook.

### 4a. Start the scenario

1. In Make.com left sidebar, click **Scenarios → Create a new scenario**.
2. You'll see a big purple **+** circle in the middle. Click it.
3. Search for **Google Sheets** and pick it.
4. Pick the trigger: **Watch Changes** (this fires when a row is edited).

### 4b. Configure the Google Sheets trigger

1. Click **Create a connection** → sign in with the Google account that owns the Sheet → grant Make access.
2. Spreadsheet: paste the URL from Step 1.
3. Sheet name: pick the tab (usually **Sheet1**).
4. Table contains headers: **Yes**.
5. Click **OK**. The trigger is now set.

### 4c. Add a filter so it only fires on approved LinkedIn posts

1. Click the line that connects the trigger to the next step. A **filter** dialog appears.
2. Set:
   - **Label:** `Approved LinkedIn only`
   - **Condition 1:** `Approve` → **equal to** → `TRUE`
   - **AND**
   - **Condition 2:** `Platform` → **text equal to** → `LinkedIn`
   - **AND**
   - **Condition 3:** `Status` → **text not equal to** → `Posted`
3. Click **OK**.

### 4d. Add the LinkedIn action

1. Click the **+** to the right of the Google Sheets module.
2. Search for **LinkedIn** → pick **LinkedIn**.
3. Pick action: **Create a Post**.
4. Click **Create a connection** → sign in with your LinkedIn account → approve all permissions.
5. Configure the action:
   - **Author:** Your personal LinkedIn profile (it should auto-fill).
   - **Visibility:** `Public`.
   - **Text:** click the field, then in the right-side panel pick the variable **`Post Content`** from the Google Sheets step.
   - **Media:** leave blank for now. (We'll add image support later if you need it.)
6. Click **OK**.

### 4e. Add a final step to update the Sheet

1. Click the **+** to the right of LinkedIn.
2. Search for **Google Sheets** → **Update a Row**.
3. Pick the same spreadsheet and sheet.
4. **Row number:** map to `Row number` from the trigger.
5. **Status:** type `Posted`.
6. **Posted At:** click the variable picker, then **Date/Time → now**.
7. Click **OK**.

### 4f. Turn the scenario on

1. Top of the screen, name the scenario: **`Selam CPA — LinkedIn auto-post`**.
2. Bottom-left toggle: switch it from **OFF** to **ON**.
3. Set **Run scenario: Every 15 minutes** (the default). That means once you check "Approve", the post goes live within 15 minutes.

LinkedIn is wired up.

---

## Step 5 — Build the Facebook Page scenario

Repeat Step 4 with two changes:

1. In the filter (Step 4c), change **Platform → text equal to → `Facebook Page`** instead of `LinkedIn`.
2. The action module (Step 4d): search for **Facebook Pages**, action **Create a Page Post**.
   - **Page:** pick **Selam CPA**.
   - **Message:** map to `Post Content` from the Sheet.
3. Name this scenario: **`Selam CPA — Facebook Page auto-post`**.
4. Turn it ON.

---

## Step 6 — End-to-end test

1. Open your Sheet.
2. Add one test row:
   - **Date Drafted:** today's date
   - **Platform:** `LinkedIn` (pick from dropdown)
   - **Post Content:** `Testing automated posting from Make.com. Please ignore.`
   - **Approve:** check the box
   - **Status:** `Draft`
3. Wait up to 15 minutes. (Or in Make.com, click **Run once** on your LinkedIn scenario to force it.)
4. Check LinkedIn. The post should appear on your profile.
5. Go back to the Sheet. The row's **Status** should now say `Posted` with a timestamp in **Posted At**.
6. Delete the test post from LinkedIn.

If it worked, repeat with a Facebook test row.

If it didn't work, see **Troubleshooting** at the bottom.

---

## How you use this every day

### Drafting a week of posts

Open Claude (this chat or Claude.ai) and say:

> Draft me 7 LinkedIn posts for next week. 4 for self-employed/freelancers, 2 for nonprofits needing audits, 1 for AI-consulting prospects. Lead with the pain point on each. End with a CTA appropriate for the platform. No emojis, no hashtags unless they earn their spot.

Claude will produce the 7 posts. Copy them into the Sheet, one per row, with Platform = LinkedIn and Status = Draft.

### Approving

On your phone or laptop, open the Sheet. Read each post. Edit if needed. When you're happy, check the **Approve** box. Within 15 minutes it's live.

### Mobile review

Install the **Google Sheets** app on your phone. The Sheet works the same on mobile — tap the checkbox to approve from anywhere.

### If you want to UNDO an approved post

If you check "Approve" by accident, **uncheck it within 15 minutes**. Make.com only runs the scenario every 15 minutes, so you have a window. After it's posted, you'll need to delete it from LinkedIn/Facebook directly.

---

## Adding Instagram later (when you have a Business account)

1. Convert your Selam CPA Instagram to a **Business or Creator** account: in IG app → Settings → Account → **Switch to Professional Account**.
2. Link it to the Selam CPA Facebook Page.
3. Add `Instagram` as a new option in the Platform dropdown (Step 1, item 6).
4. Build a third Make.com scenario, same as Step 4 but using the **Instagram for Business** module → **Create a Post**.
5. **Important:** Instagram requires every post to have an image. So the **Image URL** column becomes mandatory for IG posts. Use Google Drive links (set sharing to "Anyone with the link") or Imgur for free image hosting.

---

## Adding TikTok later

Same pattern, but: Make.com's TikTok module only supports **TikTok for Business** accounts, and posts require video files. Skip until you have a video content workflow.

---

## Troubleshooting

**"LinkedIn permissions error in Make.com"**
LinkedIn occasionally denies new API connections. Try: disconnect the LinkedIn connection in Make.com → reconnect. If it still fails, post manually for a week and try reconnecting — LinkedIn unblocks most accounts within days.

**"Facebook Page not appearing in Make.com"**
You need to be the **admin** of the Page. Check **facebook.com/[your-page]/settings/people-and-other-accounts**. If you're not admin, ask whoever set up the Page to add you.

**"Post didn't appear and Status stayed Draft"**
Open Make.com → click the scenario → click **History**. The most recent run will show where it failed. The error message will tell you whether it's a filter mismatch (you typed `linkedin` lowercase instead of `LinkedIn`) or an API error.

**"I got rate-limited"**
LinkedIn caps personal-profile posts at ~25/day, Facebook Pages around 50/day. You'll never hit this unless something is misconfigured.

---

## What this does NOT cover (yet)

- **Image and video attachments** — basic text works now; image support requires adding an upload step. Ask Claude to extend the Make.com scenario when you need it.
- **Scheduled time of day** — right now posts go live within 15 min of approval. If you want "approve now, publish tomorrow at 8am," we add a scheduling column. Ask when you need it.
- **Analytics dashboard** — Make.com can log post performance back into a "Results" tab. Add later once you've been posting for a month.
- **Instagram + TikTok** — see sections above.

---

## Cost summary

| Tool | Plan | Cost |
|---|---|---|
| Google Sheets | Free with Google account | $0 |
| Facebook Page | Free | $0 |
| Make.com | Free tier (1,000 ops/mo) | $0 |
| LinkedIn personal posting | Free via Make's OAuth connection | $0 |
| **Total** | | **$0 / month** |

If you ever exceed 1,000 Make.com operations in a month (~330 posts), Make's Core plan is $9/month.
