import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Home, Refrigerator, ShoppingCart, Users } from "lucide-react";
import { FamilyFuelProvider } from "@/lib/familyfuel/store";
import HomeTab from "@/components/familyfuel/home-tab";
import FamilyTab from "@/components/familyfuel/family-tab";
import KitchenTab from "@/components/familyfuel/kitchen-tab";
import PlanTab from "@/components/familyfuel/plan-tab";
import ShoppingTab from "@/components/familyfuel/shopping-tab";

export default function FamilyFuelPage() {
  const [tab, setTab] = useState("home");

  return (
    <FamilyFuelProvider>
      <Helmet>
        <title>FamilyFuel — Family Meal Planner</title>
        <meta
          name="description"
          content="Plan healthy, budget-friendly breakfasts, lunches and dinners for the whole family using what's already in your kitchen."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold">🍳 FamilyFuel</h1>
            <p className="text-sm text-muted-foreground">
              Healthy, budget-friendly meals planned around your family and your fridge
            </p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-4 pb-24">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="grid grid-cols-5 w-full sticky top-0 z-10">
              <TabsTrigger value="home" className="flex flex-col sm:flex-row gap-1 py-2 text-xs sm:text-sm">
                <Home className="h-4 w-4" /> Home
              </TabsTrigger>
              <TabsTrigger value="family" className="flex flex-col sm:flex-row gap-1 py-2 text-xs sm:text-sm">
                <Users className="h-4 w-4" /> Family
              </TabsTrigger>
              <TabsTrigger value="kitchen" className="flex flex-col sm:flex-row gap-1 py-2 text-xs sm:text-sm">
                <Refrigerator className="h-4 w-4" /> Kitchen
              </TabsTrigger>
              <TabsTrigger value="plan" className="flex flex-col sm:flex-row gap-1 py-2 text-xs sm:text-sm">
                <CalendarDays className="h-4 w-4" /> Plan
              </TabsTrigger>
              <TabsTrigger value="shop" className="flex flex-col sm:flex-row gap-1 py-2 text-xs sm:text-sm">
                <ShoppingCart className="h-4 w-4" /> Shop
              </TabsTrigger>
            </TabsList>

            <div className="mt-4">
              <TabsContent value="home"><HomeTab goToTab={setTab} /></TabsContent>
              <TabsContent value="family"><FamilyTab /></TabsContent>
              <TabsContent value="kitchen"><KitchenTab /></TabsContent>
              <TabsContent value="plan"><PlanTab /></TabsContent>
              <TabsContent value="shop"><ShoppingTab /></TabsContent>
            </div>
          </Tabs>
        </main>
      </div>
    </FamilyFuelProvider>
  );
}
