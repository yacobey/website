# The CPA-Built 1099 Tax Toolkit — Product Source Files

This is the source content for the digital product Selam CPA sells at **selamcpa.com/1099-toolkit** for $79.

The customer never sees these files — they receive finished Google Sheets and PDFs delivered automatically after Stripe checkout. This directory contains the specs and content you'll use to build those finished assets.

## What's in this directory

| File | What it becomes | Format the customer gets |
|---|---|---|
| `quarterly-calculator.md` | Quarterly Estimated Tax Calculator | Google Sheet |
| `expense-tracker.md` | Deductible Expense Tracker | Google Sheet |
| `mileage-log.md` | IRS-Compliant Mileage Log | Google Sheet |
| `deductions-cheatsheet.md` | "What Can I Actually Deduct?" | PDF |
| `quarterly-checklist.md` | Quarterly Action Checklist | PDF |
| `customer-delivery-email.md` | Delivery email that fires on purchase | Automated email |

## What you need to do once

1. Open each spec file in this folder.
2. Build the actual asset in Google Sheets / Google Docs following the spec.
3. Save the finished assets in a **Google Drive folder** called `1099 Toolkit — Customer Files`.
4. Set the Drive folder sharing to **"Anyone with the link can view"** (not edit).
5. Customers will receive a link to make their own copy of each file.

**Why make-a-copy and not direct sharing:** if you give edit access, customers all edit the same file. Read-only with "Make a copy" forces them to clone it to their own Drive. Standard practice.

## How to set "Anyone can copy" properly

For each Google Sheet/Doc:
1. Open the file → top-right **Share** button
2. Under "General access" → set to **Anyone with the link** → **Viewer**
3. Click **Copy link**
4. To force "Make a copy" behavior, replace `/edit` (or `/view`) at the end of the URL with **`/copy`**
5. That copy URL is what goes in the delivery email.

Example:
- Original: `https://docs.google.com/spreadsheets/d/1ABC.../edit`
- Customer link: `https://docs.google.com/spreadsheets/d/1ABC.../copy`

When they click, Google shows them a "Make a copy" button — they get their own private copy in their Drive.

## After you build the assets

Update `customer-delivery-email.md` with the real "copy" URLs (search for `REPLACE_WITH_COPY_LINK`). That email file gets loaded into Make.com in the delivery setup (see `STRIPE_DELIVERY_SETUP.md` in the repo root).
