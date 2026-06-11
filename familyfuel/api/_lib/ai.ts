import OpenAI from "openai";
import {
  type MealPlan,
  type Meal,
  type PlanRequest,
  type ScanResponse,
  type SwapRequest,
  mealPlanSchema,
  mealSchema,
  scanResponseSchema,
} from "../../shared/schemas";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

function requireOpenAI(): OpenAI {
  if (!openai) {
    throw new Error("OpenAI API key not configured");
  }
  return openai;
}

function parseJsonContent(content: string | null | undefined): unknown {
  if (!content) {
    throw new Error("AI returned an empty response");
  }
  return JSON.parse(content);
}

export async function scanInventoryImages(images: string[]): Promise<ScanResponse> {
  const client = requireOpenAI();

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 2000,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a kitchen inventory assistant. The user sends photos (or video keyframes) of their fridge, freezer or pantry. Identify every distinct food item you can see and estimate quantities.

Respond ONLY with JSON in this exact shape:
{"items": [{"name": "string (e.g. 'Eggs')", "category": "one of: produce, dairy, protein, grains, canned, frozen, condiments, snacks, beverages, other", "quantity": "string estimate (e.g. 'about 8', 'half gallon', '1 bag')", "expiresInDays": number or null (typical shelf life from today for this item as stored, null if non-perishable)}]}

Rules:
- Merge duplicates seen across multiple photos into a single item with a combined quantity.
- Only list food and drink. Skip non-food objects.
- Be conservative: if you cannot identify something, skip it rather than guess wildly.`,
      },
      {
        role: "user",
        content: [
          { type: "text" as const, text: "Here are photos of my kitchen. List the food items." },
          ...images.map((url) => ({ type: "image_url" as const, image_url: { url } })),
        ],
      },
    ],
  });

  const raw = parseJsonContent(response.choices[0]?.message?.content);
  return scanResponseSchema.parse(raw);
}

function memberSummary(members: PlanRequest["members"]): string {
  return members
    .map(
      (m) =>
        `- ${m.name}: ${m.age}yo ${m.sex}, goal: ${m.goal}, daily target ${m.dailyCalories} kcal / ${m.proteinG}g protein` +
        (m.allergies.length ? `, ALLERGIES (never use): ${m.allergies.join(", ")}` : "") +
        (m.dislikes.length ? `, dislikes: ${m.dislikes.join(", ")}` : "")
    )
    .join("\n");
}

function inventorySummary(inventory: PlanRequest["inventory"]): string {
  if (!inventory.length) return "(empty — plan from scratch)";
  return inventory
    .map((i) => `- ${i.name} (${i.quantity})${i.expiresOn ? ` expires ${i.expiresOn}` : ""}`)
    .join("\n");
}

const MEAL_JSON_SHAPE = `{"slot": "breakfast|lunch|dinner", "name": "string", "description": "1 sentence", "ingredients": [{"name": "string", "amount": "string", "fromPantry": true if already in the house}], "steps": ["short step", ...], "prepMinutes": number, "cookMinutes": number, "estCost": number (cost of NEW ingredients only, 0 if fully from pantry), "portions": [{"memberName": "exact member name", "portion": "serving size, e.g. '1.5 cups'", "calories": number, "proteinG": number}], "prepReminder": "string or null (e.g. 'Take chicken out to thaw the night before')"}`;

export async function generateMealPlan(req: PlanRequest): Promise<MealPlan> {
  const client = requireOpenAI();

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 16000,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a family meal planning expert and nutritionist. Create a realistic 7-day meal plan (breakfast, lunch, dinner each day) for the whole family.

Hard rules:
1. NEVER include any member's allergens in a meal they eat.
2. Use pantry/fridge inventory FIRST, prioritizing items closest to expiry. Mark those ingredients fromPantry: true.
3. The total cost of NEW ingredients across the week must stay within the weekly budget.
4. Every meal must include a "portions" entry for EVERY family member, sized so each person's daily total lands within ~10% of their calorie target and protein is adequate for their goal.
5. Keep recipes simple and family-friendly (most under 40 min total), with variety across the week (different proteins, plenty of vegetables and whole grains, limit repeats).
6. Kids' portions must be age-appropriate.

Respond ONLY with JSON in this exact shape:
{"days": [{"day": "Monday", "meals": [${MEAL_JSON_SHAPE}, ...3 meals]}, ...7 days starting Monday], "shoppingList": [{"name": "string", "quantity": "string", "category": "produce|dairy|protein|grains|canned|frozen|condiments|snacks|beverages|other", "estCost": number}], "totalEstCost": number (sum of shopping list), "notes": "2-3 sentences: how the plan uses what's on hand, stays in budget, and supports each member's goals"}`,
      },
      {
        role: "user",
        content: `Family members:
${memberSummary(req.members)}

Current kitchen inventory:
${inventorySummary(req.inventory)}

Weekly grocery budget: ${req.weeklyBudget} ${req.currency}
${req.preferences ? `Family preferences: ${req.preferences}` : ""}

Create the 7-day plan.`,
      },
    ],
  });

  const raw = parseJsonContent(response.choices[0]?.message?.content);
  return mealPlanSchema.parse(raw);
}

export async function swapMeal(req: SwapRequest): Promise<Meal> {
  const client = requireOpenAI();

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 3000,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a family meal planning expert. Suggest ONE replacement meal that is clearly different from the meal being swapped out, respects every member's allergies, uses on-hand inventory where possible, and includes a portion for every member sized to their calorie target.

Respond ONLY with JSON in this exact shape:
${MEAL_JSON_SHAPE}`,
      },
      {
        role: "user",
        content: `Family members:
${memberSummary(req.members)}

Current kitchen inventory:
${inventorySummary(req.inventory)}

Replace this meal: ${req.slot} on ${req.day} — currently "${req.currentMealName}".
Budget for new ingredients in this meal: about ${req.budgetPerMeal} ${req.currency}.`,
      },
    ],
  });

  const raw = parseJsonContent(response.choices[0]?.message?.content);
  const meal = mealSchema.parse(raw);
  return { ...meal, slot: req.slot };
}
