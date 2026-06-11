import { Bell, Flame, Home, Wallet } from "lucide-react";
import { Badge, Card, CardContent, CardHeader, CardTitle, Progress } from "./ui";
import { calculateTargets, daysUntil, todayKey, todayWeekday } from "../lib/nutrition";
import { useFamilyFuel } from "../lib/store";

export default function HomeTab({ goToTab }: { goToTab: (tab: string) => void }) {
  const { state } = useFamilyFuel();
  const weekday = todayWeekday();
  const today = todayKey();
  const todayPlan = state.plan?.days.find((d) => d.day === weekday);

  const expiringSoon = state.inventory
    .filter((i) => i.expiresOn && daysUntil(i.expiresOn) <= 3)
    .sort((a, b) => daysUntil(a.expiresOn!) - daysUntil(b.expiresOn!));

  const reminders: string[] = [];
  // Tomorrow's prep reminders surface the evening before; today's show all day.
  todayPlan?.meals.forEach((m) => {
    if (m.prepReminder) reminders.push(`${m.slot}: ${m.prepReminder}`);
  });
  const weekdayOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const tomorrowName = weekdayOrder[(weekdayOrder.indexOf(weekday) + 1) % 7];
  state.plan?.days
    .find((d) => d.day === tomorrowName)
    ?.meals.forEach((m) => {
      if (m.prepReminder) reminders.push(`For tomorrow's ${m.slot}: ${m.prepReminder}`);
    });
  expiringSoon.forEach((i) => {
    const d = daysUntil(i.expiresOn!);
    reminders.push(d < 0 ? `${i.name} has expired — check before using` : `Use ${i.name} soon (expires in ${d} day${d === 1 ? "" : "s"})`);
  });

  const listTotal = state.plan?.totalEstCost ?? 0;

  return (
    <div className="space-y-4">
      {state.members.length === 0 && (
        <Card className="border-primary/50">
          <CardContent className="py-6 pt-6 text-center space-y-2">
            <p className="font-medium">Welcome to FamilyFuel! 👋</p>
            <p className="text-sm text-muted-foreground">
              Start by adding your family in the{" "}
              <button className="underline font-medium" onClick={() => goToTab("family")}>Family tab</button>,
              then scan your fridge in the{" "}
              <button className="underline font-medium" onClick={() => goToTab("kitchen")}>Kitchen tab</button>,
              and generate your week in the{" "}
              <button className="underline font-medium" onClick={() => goToTab("plan")}>Plan tab</button>.
            </p>
          </CardContent>
        </Card>
      )}

      {reminders.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4" /> Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1.5">
              {reminders.map((r, i) => (
                <li key={i} className="flex gap-2">
                  <span>⏰</span>
                  <span className="capitalize">{r}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Home className="h-4 w-4" /> Today — {weekday}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todayPlan ? (
            <div className="grid gap-2 sm:grid-cols-3">
              {todayPlan.meals.map((m) => (
                <button
                  key={m.slot}
                  className="text-left rounded-lg border p-3 hover:bg-muted transition-colors"
                  onClick={() => goToTab("plan")}
                >
                  <div className="text-xs uppercase text-muted-foreground">{m.slot}</div>
                  <div className="font-medium text-sm">{m.name}</div>
                  <div className="text-xs text-muted-foreground">{m.prepMinutes + m.cookMinutes} min</div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No plan for this week yet —{" "}
              <button className="underline" onClick={() => goToTab("plan")}>generate one</button>.
            </p>
          )}
        </CardContent>
      </Card>

      {state.members.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Flame className="h-4 w-4" /> Today's nutrition
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {state.members.map((m) => {
              const targets = calculateTargets(m);
              const entries = state.eatenLog[today]?.[m.id] ?? [];
              const eaten = entries.reduce((s, e) => s + e.calories, 0);
              const protein = entries.reduce((s, e) => s + e.proteinG, 0);
              const pct = Math.min(100, (eaten / targets.calories) * 100);
              return (
                <div key={m.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{m.name}</span>
                    <span className="text-muted-foreground">
                      {eaten} / {targets.calories} kcal · {protein}g / {targets.proteinG}g protein
                    </span>
                  </div>
                  <Progress value={pct} />
                </div>
              );
            })}
            <p className="text-xs text-muted-foreground">
              Log meals from the Plan tab ("Log eaten" on each portion) to track everyone's day.
            </p>
          </CardContent>
        </Card>
      )}

      {state.plan && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Wallet className="h-4 w-4" /> Budget
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <div className="flex justify-between">
              <span>This week's groceries (est.)</span>
              <span className="font-medium">${listTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Weekly budget</span>
              <span className="font-medium">${state.weeklyBudget.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{listTotal <= state.weeklyBudget ? "Headroom" : "Over budget"}</span>
              <Badge variant={listTotal <= state.weeklyBudget ? "secondary" : "destructive"}>
                ${Math.abs(state.weeklyBudget - listTotal).toFixed(2)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
