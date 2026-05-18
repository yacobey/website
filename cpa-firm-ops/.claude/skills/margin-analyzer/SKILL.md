---
name: margin-analyzer
description: Compute unit economics (revenue, COGS, gross margin) per product or service line. Use when user says "margin analysis", "unit economics", "which products are profitable", or "product profitability".
---

# Margin Analyzer

Breaks down profitability per product/service to find the winners and losers.

## Inputs to confirm
- Client / QBO realm
- Period (default: trailing 90 days)
- Are COGS tracked per item in QBO, or do we need to estimate?
- Allocate overhead? (default: no — focus on contribution margin)

## Steps
1. Pull sales by product/service via `qbo_accounting_get_sales_by_product_summary`.
2. For each item, pull cost: from QBO item record OR estimate from purchases.
3. Compute per item:
   - Units sold
   - Revenue
   - COGS
   - Gross margin $ and %
   - Contribution margin per unit
4. Rank by gross margin $ (volume × margin), not margin % alone.
5. Identify the 80/20: which items drive 80% of profit?
6. Flag any items with negative or sub-10% margin.

## Output
- Ranked margin table (top to bottom by GM $)
- 80/20 breakdown
- "Kill, fix, or scale" recommendation per category
- One-paragraph owner summary
