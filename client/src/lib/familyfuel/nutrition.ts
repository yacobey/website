import type { Member } from "@shared/familyfuel";

const activityMultipliers: Record<Member["activity"], number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export const activityLabels: Record<Member["activity"], string> = {
  sedentary: "Sedentary",
  light: "Lightly active",
  moderate: "Moderately active",
  active: "Active",
  very_active: "Very active",
};

export const goalLabels: Record<Member["goal"], string> = {
  maintain: "Maintain weight",
  lose: "Lose weight",
  gain_muscle: "Build muscle",
  grow: "Healthy growth (kids)",
};

export interface NutritionTargets {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

// Mifflin-St Jeor BMR x activity, adjusted for goal.
export function calculateTargets(member: Member): NutritionTargets {
  const { weightKg, heightCm, age, sex, activity, goal } = member;
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + (sex === "male" ? 5 : -161);
  let calories = bmr * activityMultipliers[activity];

  if (goal === "lose") calories *= 0.85;
  if (goal === "gain_muscle") calories *= 1.1;
  if (goal === "grow") calories *= 1.05; // growing kids need a small surplus

  // Mifflin-St Jeor underestimates for young children; keep a sane floor.
  calories = Math.max(calories, age < 13 ? 1200 : 1400);
  calories = Math.round(calories / 10) * 10;

  const proteinPct = goal === "gain_muscle" ? 0.3 : 0.25;
  const fatPct = 0.3;
  const carbsPct = 1 - proteinPct - fatPct;

  return {
    calories,
    proteinG: Math.round((calories * proteinPct) / 4),
    carbsG: Math.round((calories * carbsPct) / 4),
    fatG: Math.round((calories * fatPct) / 9),
  };
}

export function todayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function todayWeekday(date = new Date()): string {
  return weekdays[date.getDay()];
}

export function daysUntil(isoDate: string): number {
  const target = new Date(isoDate + "T00:00:00");
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - now.getTime()) / 86_400_000);
}
