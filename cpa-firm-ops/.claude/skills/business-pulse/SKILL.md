---
name: business-pulse
description: One-shot snapshot pulling from every connected system (QBO, HubSpot, Gmail, Canva). Use when user says "business pulse", "show me everything", "full snapshot", or "where do things stand".
---

# Business Pulse

The "what's the state of the world" dashboard. Pulls from every connected source and synthesizes.

## Inputs to confirm
- Client / QBO realm
- Time window (default: this month + comparisons)
- Level of detail (executive / standard / deep)

## Steps
Pull in parallel from all connected systems:

1. **QBO** (financial state):
   - Cash position + 30-day projection
   - MTD revenue vs forecast
   - AR aging summary
   - AP aging summary
   - Last payroll
2. **HubSpot** (commercial state):
   - Open pipeline $ and weighted forecast
   - Deals closed this period
   - New leads / inbound this period
   - Top accounts by recent activity
3. **Gmail** (operational signals):
   - Unread threads from VIP customers (search by label or sender)
   - Outstanding W-9 requests, contract negotiations, etc.
4. **Canva** (marketing pipeline):
   - Recently edited designs (`list-recent-files` / `list-folder-items`)
   - Anything in-flight for upcoming campaigns

## Output
A single-page dashboard:
- 6 KPIs at the top (Cash, MTD Rev, Pipeline $, Open AR, Open AP, Active Customers)
- 4 quadrants: Money · Sales · Operations · Marketing
- 3 things to celebrate, 3 things to worry about
