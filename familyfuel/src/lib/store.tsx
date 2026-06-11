import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { InventoryItem, MealPlan, Member } from "../../shared/schemas";

// Eaten log: date -> memberId -> list of logged meals
export interface EatenEntry {
  mealKey: string; // `${day}-${slot}`
  mealName: string;
  calories: number;
  proteinG: number;
}

export interface FamilyFuelState {
  members: Member[];
  inventory: InventoryItem[];
  weeklyBudget: number;
  currency: string;
  preferences: string;
  plan: MealPlan | null;
  planGeneratedAt: string | null;
  eatenLog: Record<string, Record<string, EatenEntry[]>>;
  checkedShoppingItems: string[]; // item names checked off the list
}

const defaultState: FamilyFuelState = {
  members: [],
  inventory: [],
  weeklyBudget: 150,
  currency: "USD",
  preferences: "",
  plan: null,
  planGeneratedAt: null,
  eatenLog: {},
  checkedShoppingItems: [],
};

const STORAGE_KEY = "familyfuel-state-v1";

function loadState(): FamilyFuelState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

interface FamilyFuelContextValue {
  state: FamilyFuelState;
  update: (patch: Partial<FamilyFuelState>) => void;
}

const FamilyFuelContext = createContext<FamilyFuelContextValue | null>(null);

export function FamilyFuelProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FamilyFuelState>(loadState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // localStorage full or unavailable — keep working in memory
    }
  }, [state]);

  const update = (patch: Partial<FamilyFuelState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  };

  return <FamilyFuelContext.Provider value={{ state, update }}>{children}</FamilyFuelContext.Provider>;
}

export function useFamilyFuel(): FamilyFuelContextValue {
  const ctx = useContext(FamilyFuelContext);
  if (!ctx) throw new Error("useFamilyFuel must be used within FamilyFuelProvider");
  return ctx;
}

export function newId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export const demoMembers: Member[] = [
  { id: "demo-dad", name: "Dad", age: 42, sex: "male", heightCm: 178, weightKg: 84, activity: "moderate", goal: "lose", allergies: [], dislikes: ["mushrooms"] },
  { id: "demo-mom", name: "Mom", age: 39, sex: "female", heightCm: 165, weightKg: 64, activity: "active", goal: "maintain", allergies: [], dislikes: [] },
  { id: "demo-sara", name: "Sara", age: 14, sex: "female", heightCm: 160, weightKg: 50, activity: "active", goal: "grow", allergies: ["peanuts"], dislikes: [] },
  { id: "demo-noah", name: "Noah", age: 10, sex: "male", heightCm: 140, weightKg: 35, activity: "very_active", goal: "grow", allergies: [], dislikes: ["broccoli"] },
  { id: "demo-lily", name: "Lily", age: 6, sex: "female", heightCm: 115, weightKg: 21, activity: "active", goal: "grow", allergies: [], dislikes: [] },
];
