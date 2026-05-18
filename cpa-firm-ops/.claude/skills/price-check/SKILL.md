---
name: price-check
description: Run pricing scenarios — what happens to margin and revenue at different price points. Use when user says "price check", "pricing scenarios", "what if I raise prices", or "elasticity check".
---

# Price Check

Model price changes against cost structure to find the right price point.

## Inputs to confirm
- Client / QBO realm
- Product/service in question
- Current price and current unit cost (auto-pull if in QBO)
- Scenarios to model (default: -10%, current, +5%, +10%, +20%)
- Demand sensitivity assumption (default: -1.0 elasticity unless told otherwise)

## Steps
1. Pull current price, cost, and trailing 90-day units sold.
2. For each scenario:
   - New price
   - New unit margin ($ and %)
   - Projected units (apply elasticity)
   - Projected revenue
   - Projected gross profit
3. Identify the **profit-maximizing** price.
4. Note the **revenue-maximizing** price (different from profit-max when elastic).
5. Flag the price floor: where margin <15% or below industry benchmark (`benchmarking-against-industry`).

## Output
- Scenario table (5 rows): Price | Unit Margin | Est Units | Est Revenue | Est Profit | Δ vs current
- Recommended price + the math behind it
- Caveat: elasticity is an assumption; recommend a 30-day test
