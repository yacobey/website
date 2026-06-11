import { useState } from "react";
import type { Meal, MealPlan, PlanRequest } from "../../shared/schemas";
import { CalendarDays, ChefHat, ChevronDown, Clock, Loader2, RefreshCw, Repeat } from "lucide-react";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from "./ui";
import { useToast } from "./toast";
import { postJson } from "../lib/api";
import { calculateTargets, todayKey, todayWeekday } from "../lib/nutrition";
import { useFamilyFuel, type EatenEntry, type FamilyFuelState } from "../lib/store";

const slotEmoji: Record<Meal["slot"], string> = {
  breakfast: "🌅",
  lunch: "🥪",
  dinner: "🍽️",
};

export function buildPlanMembers(members: FamilyFuelState["members"]): PlanRequest["members"] {
  return members.map((m) => {
    const t = calculateTargets(m);
    return {
      name: m.name,
      age: m.age,
      sex: m.sex,
      goal: m.goal,
      dailyCalories: t.calories,
      proteinG: t.proteinG,
      allergies: m.allergies,
      dislikes: m.dislikes,
    };
  });
}

export function buildPlanInventory(inventory: FamilyFuelState["inventory"]) {
  return inventory.map((i) => ({ name: i.name, quantity: i.quantity, expiresOn: i.expiresOn }));
}

function MealCard({ meal, day }: { meal: Meal; day: string }) {
  const { state, update } = useFamilyFuel();
  const { toast } = useToast();
  const [swapping, setSwapping] = useState(false);
  const [open, setOpen] = useState(false);

  const isToday = day === todayWeekday();
  const mealKey = `${day}-${meal.slot}`;
  const today = todayKey();

  const isEaten = (memberId: string) =>
    (state.eatenLog[today]?.[memberId] ?? []).some((e) => e.mealKey === mealKey);

  const toggleEaten = (memberId: string, memberName: string) => {
    const portion = meal.portions.find((p) => p.memberName === memberName);
    const log = { ...state.eatenLog };
    const dayLog = { ...(log[today] ?? {}) };
    const entries = [...(dayLog[memberId] ?? [])];
    const idx = entries.findIndex((e) => e.mealKey === mealKey);
    if (idx >= 0) {
      entries.splice(idx, 1);
    } else {
      const entry: EatenEntry = {
        mealKey,
        mealName: meal.name,
        calories: portion?.calories ?? 0,
        proteinG: portion?.proteinG ?? 0,
      };
      entries.push(entry);
    }
    dayLog[memberId] = entries;
    log[today] = dayLog;
    update({ eatenLog: log });
  };

  const swap = async () => {
    if (!state.plan) return;
    setSwapping(true);
    try {
      const newMeal = await postJson<Meal>("/api/swap", {
        members: buildPlanMembers(state.members),
        inventory: buildPlanInventory(state.inventory),
        day,
        slot: meal.slot,
        currentMealName: meal.name,
        budgetPerMeal: Math.round((state.weeklyBudget / 21) * 100) / 100,
        currency: state.currency,
      });
      const days = state.plan.days.map((d) =>
        d.day === day
          ? { ...d, meals: d.meals.map((m) => (m.slot === meal.slot ? newMeal : m)) }
          : d
      );
      update({ plan: { ...state.plan, days } });
      toast({ title: `Swapped to "${newMeal.name}"` });
    } catch (error) {
      toast({
        title: "Swap failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSwapping(false);
    }
  };

  return (
    <div className="border rounded-lg mb-2">
      <button
        className="w-full flex items-center justify-between gap-2 px-3 py-3 text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <span>{slotEmoji[meal.slot]}</span>
          <div>
            <div className="font-medium text-sm capitalize">{meal.slot}: {meal.name}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
              <Clock className="h-3 w-3" /> {meal.prepMinutes + meal.cookMinutes} min
              {meal.estCost > 0 && <span>· ~${meal.estCost.toFixed(2)} new ingredients</span>}
              {meal.estCost === 0 && <Badge variant="secondary" className="text-[10px] px-1">From pantry</Badge>}
            </div>
          </div>
        </div>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="px-3 pb-3 space-y-3">
          {meal.description && <p className="text-sm text-muted-foreground">{meal.description}</p>}

          {meal.prepReminder && (
            <p className="text-sm bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
              ⏰ {meal.prepReminder}
            </p>
          )}

          <div>
            <p className="text-sm font-medium mb-1">Portions per person</p>
            <div className="grid gap-1">
              {meal.portions.map((p) => {
                const member = state.members.find((m) => m.name === p.memberName);
                return (
                  <div key={p.memberName} className="flex items-center justify-between gap-2 text-sm bg-muted rounded-md px-3 py-1.5">
                    <span>
                      <span className="font-medium">{p.memberName}</span>: {p.portion}
                      <span className="text-muted-foreground"> · {p.calories} kcal · {p.proteinG}g protein</span>
                    </span>
                    {isToday && member && (
                      <Button
                        variant={isEaten(member.id) ? "default" : "outline"}
                        size="sm"
                        className="h-7 text-xs shrink-0"
                        onClick={() => toggleEaten(member.id, p.memberName)}
                      >
                        {isEaten(member.id) ? "✓ Eaten" : "Log eaten"}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-1">Ingredients</p>
            <ul className="text-sm space-y-0.5">
              {meal.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span>• {ing.amount ? `${ing.amount} ` : ""}{ing.name}</span>
                  {ing.fromPantry && <Badge variant="secondary" className="text-[10px] px-1">have it</Badge>}
                </li>
              ))}
            </ul>
          </div>

          {meal.steps.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-1">Steps</p>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                {meal.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>
          )}

          <Button variant="outline" size="sm" onClick={swap} disabled={swapping}>
            {swapping ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Repeat className="h-4 w-4 mr-1" />}
            Swap this meal
          </Button>
        </div>
      )}
    </div>
  );
}

export default function PlanTab() {
  const { state, update } = useFamilyFuel();
  const { toast } = useToast();
  const [generating, setGenerating] = useState(false);

  const generate = async () => {
    if (state.members.length === 0) {
      toast({ title: "Add your family first", description: "Go to the Family tab and add at least one member.", variant: "destructive" });
      return;
    }
    setGenerating(true);
    try {
      const plan = await postJson<MealPlan>("/api/plan", {
        members: buildPlanMembers(state.members),
        inventory: buildPlanInventory(state.inventory),
        weeklyBudget: state.weeklyBudget,
        currency: state.currency,
        preferences: state.preferences || undefined,
      } satisfies PlanRequest);
      update({ plan, planGeneratedAt: new Date().toISOString(), checkedShoppingItems: [] });
      toast({ title: "Your 7-day plan is ready!" });
    } catch (error) {
      toast({
        title: "Plan generation failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarDays className="h-5 w-5" /> Weekly meal plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="ff-budget">Weekly grocery budget ($)</Label>
              <Input
                id="ff-budget"
                type="number"
                min={0}
                value={state.weeklyBudget}
                onChange={(e) => update({ weeklyBudget: Math.max(0, Number(e.target.value) || 0) })}
              />
            </div>
            <div>
              <Label htmlFor="ff-prefs">Family preferences (optional)</Label>
              <Input
                id="ff-prefs"
                placeholder="e.g. we love pasta, prefer low-sugar breakfasts"
                value={state.preferences}
                onChange={(e) => update({ preferences: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={generate} disabled={generating} className="w-full sm:w-auto">
            {generating ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Planning your week… (can take a minute)</>
            ) : state.plan ? (
              <><RefreshCw className="h-4 w-4 mr-2" /> Regenerate 7-day plan</>
            ) : (
              <><ChefHat className="h-4 w-4 mr-2" /> Generate 7-day plan</>
            )}
          </Button>
          {state.plan?.notes && <p className="text-sm text-muted-foreground">{state.plan.notes}</p>}
          {state.plan && (
            <p className="text-sm">
              Estimated new-grocery cost: <span className="font-semibold">${state.plan.totalEstCost.toFixed(2)}</span>{" "}
              of your ${state.weeklyBudget} budget
              {state.plan.totalEstCost <= state.weeklyBudget ? " ✅" : " ⚠️ over budget — consider regenerating"}
            </p>
          )}
        </CardContent>
      </Card>

      {state.plan?.days.map((day) => (
        <Card key={day.day}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              {day.day}
              {day.day === todayWeekday() && <Badge className="ml-2">Today</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {day.meals.map((meal) => (
              <MealCard key={`${day.day}-${meal.slot}`} meal={meal} day={day.day} />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
