# 🍳 FamilyFuel

A family meal planning app: plan healthy, budget-friendly breakfasts, lunches and
dinners for the whole family using what's already in your kitchen.

- **Family profiles** with auto-calculated daily calorie and macro targets per person
  (kids included), allergies and dislikes.
- **Fridge & pantry scanning** — snap photos or a short video; AI detects the food
  items, you correct the list before saving. Soon-to-expire items are flagged.
- **AI 7-day meal plan** (breakfast/lunch/dinner) that uses your inventory first,
  stays within your weekly budget, avoids every allergy, and shows per-person
  portion sizes with calories and protein. Swap any single meal with one tap.
- **Shopping list** grouped by aisle with price estimates and budget tracking;
  checked-off items flow into your inventory.
- **Daily tracking** — log eaten meals per person and watch calorie/protein progress.

All family data stays in the browser (localStorage). Scan photos are processed and
never stored.

## Run locally

```bash
cd familyfuel
npm install
OPENAI_API_KEY=sk-... npm run dev
```

Open http://localhost:5173. The AI features (fridge scan, plan generation, meal
swap) need a valid `OPENAI_API_KEY`; everything else works without it.

## Deploy to Vercel (free)

1. Push this `familyfuel/` folder to a GitHub repository (it can be its own repo,
   or you can point Vercel at this subfolder).
2. In [vercel.com](https://vercel.com), click **Add New → Project**, import the
   repository, and set **Root Directory** to `familyfuel` (skip this if the folder
   is the repo root). Vercel auto-detects Vite.
3. Under **Environment Variables**, add `OPENAI_API_KEY` with your OpenAI key.
4. Click **Deploy**. You'll get a URL like `familyfuel.vercel.app` — share it with
   your family. Each person's phone keeps its own data.

The `api/` folder deploys automatically as serverless functions (`/api/scan`,
`/api/plan`, `/api/swap`), so there is no server to manage.

## Tech

Vite + React + TypeScript + Tailwind CSS v4 on the front end; Vercel serverless
functions calling OpenAI gpt-4o (vision for fridge scanning, JSON-mode for meal
plans) on the back end. Requests and AI responses are validated with zod
(`shared/schemas.ts`).
