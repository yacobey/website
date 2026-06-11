# App-Builder Prompt: Family Meal Planner & Nutrition Assistant

Copy everything below the line into your AI app builder (Claude, Replit Agent, v0, Lovable, Cursor, etc.).

---

## The Prompt

Build a complete, production-ready mobile-first web app called **"FamilyFuel"** — a smart meal planning and nutrition assistant for a family of 5. The app must do the following:

### 1. Family Profiles & Individual Nutrition Targets
- Onboarding flow where I create a household and add 5 family member profiles, each with: name, age, sex, height, weight, activity level, dietary restrictions/allergies (e.g., nut-free, lactose intolerant, vegetarian), food likes/dislikes, and health goals (grow strong, lose weight, maintain, build muscle).
- Automatically calculate each member's daily calorie target and macro split (protein, carbs, fat) using the Mifflin-St Jeor equation adjusted by activity level and goal. Show kid-appropriate targets for children based on age/sex.
- Display a per-person daily nutrition dashboard: calories consumed vs. target, protein/carbs/fat progress bars, and key micronutrients (iron, calcium, vitamin D, fiber) with simple "doing great / needs attention" indicators.

### 2. Kitchen Inventory from Video & Photos (Fridge/Pantry Scanning)
- Let me record a short video or take photos of my fridge, freezer, and pantry shelves from my phone.
- Use a vision AI model (e.g., Claude's vision API or GPT-4o vision) to analyze the frames and automatically detect and list food items with estimated quantities (e.g., "1 dozen eggs, ~half gallon milk, 3 tomatoes, 1 pack chicken thighs, half bag rice").
- For video input: extract keyframes client-side (1 frame per second), deduplicate items detected across frames, and merge into one inventory list.
- Show the detected inventory in an editable list so I can correct quantities, add missed items, or remove mistakes. Each item should have: name, category (produce/dairy/protein/grains/etc.), quantity, and estimated expiry date (AI-suggested based on item type, editable).
- Flag items expiring within 3 days and prioritize them in meal recommendations to reduce waste.
- Allow manual barcode/text entry as a fallback, and keep a running inventory that decrements automatically when a planned meal is marked "cooked."

### 3. Budget-Aware Meal Planning
- Let me set a weekly grocery budget (in my local currency) and track spending against it.
- The planner must first use what's already in the house, then suggest a minimal shopping list for missing ingredients with estimated prices and a running total kept within budget.
- Show a weekly budget summary: estimated cost of the plan, money saved by using on-hand ingredients, and cost per meal per person.

### 4. AI Meal Recommendations & Weekly Plan (Breakfast, Lunch, Dinner)
- Generate a full 7-day plan with breakfast, lunch, and dinner for the family, where each meal:
  - Uses available inventory first (especially soon-to-expire items),
  - Fits the weekly budget,
  - Meets each member's calorie and macro targets — show per-person portion sizes (e.g., "Dad: 1.5 cups, Mom: 1.25 cups, kids: 0.75 cup each"),
  - Respects every member's allergies and dislikes,
  - Is balanced across the week (variety of proteins, vegetables, whole grains; limits repeated meals).
- Support both **family meals** (one dish, individualized portions) and **individual meals** when needs differ (e.g., a child's school lunchbox vs. a parent's high-protein lunch).
- Each recipe includes: ingredients with amounts, step-by-step instructions, prep + cook time, total cost estimate, and per-serving nutrition (calories, protein, carbs, fat).
- One-tap actions: swap a meal for an alternative suggestion, regenerate the day, or lock meals I like before regenerating the rest.
- "Cook now" mode: a clean step-by-step cooking view with built-in timers.

### 5. Reminders & Scheduling
- Meal prep reminders via push notifications (and optional email): "Take chicken out to thaw tonight," "Start dinner prep at 5:30 PM," "Pack school lunches."
- Per-person eating reminders aligned with their schedules (breakfast before school/work, etc.).
- Weekly reminders: "Sunday 10 AM — scan your fridge and plan next week," and "Grocery run reminder" with the shopping list attached.
- Expiry alerts: "Spinach expires in 2 days — tonight's dinner uses it."

### 6. Shopping List
- Auto-generated from the weekly plan minus current inventory, grouped by store aisle/category, with estimated prices and checkboxes.
- Checking off items adds them to inventory automatically.

### 7. Health & Progress Tracking
- Log meals as eaten (one tap from the plan) and adjust each person's daily calorie/macro tally.
- Weekly family health report: average calorie adherence per person, fruit/veg servings, protein adequacy for the kids' growth, and 2–3 plain-language suggestions (e.g., "Add a calcium source to the kids' breakfasts").
- Optional weight tracking with a simple trend chart per member.

### Technical Requirements
- **Stack:** React + TypeScript front end (mobile-first, installable PWA with offline support for viewing the plan and shopping list), Node.js/Express backend, PostgreSQL database, Tailwind CSS with a warm, family-friendly design.
- **AI integration:** Use the Claude API (vision for fridge scanning, text for meal plan generation). Structure prompts so the model returns strict JSON (inventory items, recipes, plans) that the backend validates with Zod before saving.
- **Notifications:** Web Push API for reminders; store reminder schedules server-side.
- **Auth:** Simple email/password or magic-link login; one household account with member sub-profiles (no separate logins needed for kids).
- **Privacy:** Photos/videos are processed for inventory extraction and then deleted; only the extracted item list is stored.
- Seed the app with demo data (a sample family of 5, sample inventory, and one generated week) so it's immediately explorable.

### Screens to Build
1. Onboarding (household + 5 member profiles + budget)
2. Home dashboard (today's 3 meals, reminders, budget status, expiring items)
3. Fridge/pantry scanner (camera/video upload → AI detection → editable inventory)
4. Inventory list
5. Weekly meal plan (calendar view, per-person portions, swap/regenerate)
6. Recipe detail + cook mode
7. Shopping list
8. Per-person nutrition dashboard
9. Weekly family health report
10. Settings (budget, dietary rules, reminder times)

Start by scaffolding the project, then build the screens in the order listed, and finish by wiring up the AI fridge-scanning and meal-generation flows end to end.
