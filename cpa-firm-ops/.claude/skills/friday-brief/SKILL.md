---
name: friday-brief
description: End-of-week brief covering revenue, wins, and watches. Use on Fridays or when user says "Friday brief", "weekly wrap", or "end of week summary".
---

# Friday Brief

The end-of-week snapshot. Designed to land in the owner's inbox before they unplug.

## Inputs to confirm
- Client / QBO realm
- Week ending date (default: today if Fri, else last Fri)
- Send via email? (default: drafts only)

## Steps
1. **Revenue this week**: pull MTD/WTD from QBO. Show vs prior week and vs same week last year.
2. **Wins**:
   - Biggest invoice paid
   - New customers added (from HubSpot)
   - Deals closed in HubSpot (`search_crm_objects` filter to closed-won this week)
3. **Watches**:
   - Largest invoice still overdue
   - Deals slipping in HubSpot (pushed close date)
   - Cash position vs 2 weeks ago
   - Anything from `/month-heads-up` if late in the month
4. **Next week**: payroll due? Big bill due? Estimated tax deadline?

## Output
Short, scannable, owner-friendly:
- 3-5 bullet "wins"
- 3-5 bullet "watches"
- One number that matters most this week (highlighted)
- Optional Canva-rendered card for sharing
