import { z } from "zod";

// ---------- Family members ----------

export const memberSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  age: z.number().min(1).max(120),
  sex: z.enum(["male", "female"]),
  heightCm: z.number().min(50).max(250),
  weightKg: z.number().min(5).max(300),
  activity: z.enum(["sedentary", "light", "moderate", "active", "very_active"]),
  goal: z.enum(["maintain", "lose", "gain_muscle", "grow"]),
  allergies: z.array(z.string()).default([]),
  dislikes: z.array(z.string()).default([]),
});

export type Member = z.infer<typeof memberSchema>;

// ---------- Kitchen inventory ----------

export const inventoryCategories = [
  "produce",
  "dairy",
  "protein",
  "grains",
  "canned",
  "frozen",
  "condiments",
  "snacks",
  "beverages",
  "other",
] as const;

export const inventoryItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  category: z.enum(inventoryCategories),
  quantity: z.string().min(1),
  expiresOn: z.string().optional(), // ISO date
});

export type InventoryItem = z.infer<typeof inventoryItemSchema>;

// Item shape returned by the vision scan (before the user confirms it)
export const scannedItemSchema = z.object({
  name: z.string(),
  category: z.enum(inventoryCategories).catch("other"),
  quantity: z.string().catch("1"),
  expiresInDays: z.number().nullable().catch(null),
});

export type ScannedItem = z.infer<typeof scannedItemSchema>;

export const scanRequestSchema = z.object({
  // Data URLs (image/jpeg;base64,...) — client downscales before upload
  images: z.array(z.string().startsWith("data:image/")).min(1).max(8),
});

export const scanResponseSchema = z.object({
  items: z.array(scannedItemSchema),
});

export type ScanResponse = z.infer<typeof scanResponseSchema>;

// ---------- Meal plan ----------

export const mealSlots = ["breakfast", "lunch", "dinner"] as const;
export type MealSlot = (typeof mealSlots)[number];

export const portionSchema = z.object({
  memberName: z.string(),
  portion: z.string(), // e.g. "1.5 cups"
  calories: z.number(),
  proteinG: z.number().catch(0),
});

export const mealIngredientSchema = z.object({
  name: z.string(),
  amount: z.string().catch(""),
  fromPantry: z.boolean().catch(false),
});

export const mealSchema = z.object({
  slot: z.enum(mealSlots),
  name: z.string(),
  description: z.string().catch(""),
  ingredients: z.array(mealIngredientSchema).catch([]),
  steps: z.array(z.string()).catch([]),
  prepMinutes: z.number().catch(10),
  cookMinutes: z.number().catch(15),
  estCost: z.number().catch(0),
  portions: z.array(portionSchema).catch([]),
  prepReminder: z.string().nullable().catch(null), // e.g. "Thaw chicken the night before"
});

export type Meal = z.infer<typeof mealSchema>;

export const dayPlanSchema = z.object({
  day: z.string(), // "Monday" ... "Sunday"
  meals: z.array(mealSchema),
});

export type DayPlan = z.infer<typeof dayPlanSchema>;

export const shoppingItemSchema = z.object({
  name: z.string(),
  quantity: z.string().catch("1"),
  category: z.enum(inventoryCategories).catch("other"),
  estCost: z.number().catch(0),
});

export type ShoppingItem = z.infer<typeof shoppingItemSchema>;

export const mealPlanSchema = z.object({
  days: z.array(dayPlanSchema),
  shoppingList: z.array(shoppingItemSchema).catch([]),
  totalEstCost: z.number().catch(0),
  notes: z.string().catch(""),
});

export type MealPlan = z.infer<typeof mealPlanSchema>;

// What the client sends to generate a plan. Targets are computed client-side
// so the model plans against the same numbers the dashboard displays.
export const planMemberSchema = z.object({
  name: z.string(),
  age: z.number(),
  sex: z.enum(["male", "female"]),
  goal: z.string(),
  dailyCalories: z.number(),
  proteinG: z.number(),
  allergies: z.array(z.string()),
  dislikes: z.array(z.string()),
});

export const planRequestSchema = z.object({
  members: z.array(planMemberSchema).min(1).max(10),
  inventory: z.array(
    z.object({
      name: z.string(),
      quantity: z.string(),
      expiresOn: z.string().optional(),
    })
  ),
  weeklyBudget: z.number().min(0),
  currency: z.string().default("USD"),
  preferences: z.string().optional(), // free-text, e.g. "we love Ethiopian food"
});

export type PlanRequest = z.infer<typeof planRequestSchema>;

export const swapRequestSchema = z.object({
  members: z.array(planMemberSchema).min(1).max(10),
  inventory: z.array(
    z.object({
      name: z.string(),
      quantity: z.string(),
      expiresOn: z.string().optional(),
    })
  ),
  day: z.string(),
  slot: z.enum(mealSlots),
  currentMealName: z.string(),
  budgetPerMeal: z.number().min(0),
  currency: z.string().default("USD"),
});

export type SwapRequest = z.infer<typeof swapRequestSchema>;
