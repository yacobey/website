import { useState } from "react";
import { CalendarDays, Home, Refrigerator, ShoppingCart, Users } from "lucide-react";
import { FamilyFuelProvider } from "./lib/store";
import { ToastProvider } from "./components/toast";
import HomeTab from "./components/home-tab";
import FamilyTab from "./components/family-tab";
import KitchenTab from "./components/kitchen-tab";
import PlanTab from "./components/plan-tab";
import ShoppingTab from "./components/shopping-tab";

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "family", label: "Family", icon: Users },
  { id: "kitchen", label: "Kitchen", icon: Refrigerator },
  { id: "plan", label: "Plan", icon: CalendarDays },
  { id: "shop", label: "Shop", icon: ShoppingCart },
] as const;

export default function App() {
  const [tab, setTab] = useState<string>("home");

  return (
    <FamilyFuelProvider>
      <ToastProvider>
        <div className="min-h-screen">
          <header className="border-b bg-card">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold">🍳 FamilyFuel</h1>
              <p className="text-sm text-muted-foreground">
                Healthy, budget-friendly meals planned around your family and your fridge
              </p>
            </div>
          </header>

          <nav className="sticky top-0 z-40 bg-card border-b">
            <div className="max-w-4xl mx-auto grid grid-cols-5" role="tablist">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={tab === id}
                  onClick={() => setTab(id)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
                    tab === id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {label}
                </button>
              ))}
            </div>
          </nav>

          <main className="max-w-4xl mx-auto px-4 py-4 pb-16">
            {tab === "home" && <HomeTab goToTab={setTab} />}
            {tab === "family" && <FamilyTab />}
            {tab === "kitchen" && <KitchenTab />}
            {tab === "plan" && <PlanTab />}
            {tab === "shop" && <ShoppingTab />}
          </main>
        </div>
      </ToastProvider>
    </FamilyFuelProvider>
  );
}
