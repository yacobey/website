import { ShoppingCart } from "lucide-react";
import { inventoryCategories } from "../../shared/schemas";
import { Card, CardContent, CardHeader, CardTitle, Checkbox, Progress } from "./ui";
import { newId, useFamilyFuel, type FamilyFuelState } from "../lib/store";

export default function ShoppingTab() {
  const { state, update } = useFamilyFuel();
  const list = state.plan?.shoppingList ?? [];

  const toggle = (name: string, checked: boolean) => {
    const item = list.find((i) => i.name === name);
    if (checked) {
      const patch: Partial<FamilyFuelState> = {
        checkedShoppingItems: [...state.checkedShoppingItems, name],
      };
      // Bought items become available in the kitchen inventory
      if (item && !state.inventory.some((inv) => inv.name.toLowerCase() === name.toLowerCase())) {
        patch.inventory = [
          ...state.inventory,
          { id: newId(), name: item.name, category: item.category, quantity: item.quantity },
        ];
      }
      update(patch);
    } else {
      update({ checkedShoppingItems: state.checkedShoppingItems.filter((n) => n !== name) });
    }
  };

  const total = list.reduce((sum, i) => sum + i.estCost, 0);
  const spent = list
    .filter((i) => state.checkedShoppingItems.includes(i.name))
    .reduce((sum, i) => sum + i.estCost, 0);
  const budgetPct = state.weeklyBudget > 0 ? Math.min(100, (spent / state.weeklyBudget) * 100) : 0;

  const grouped = inventoryCategories
    .map((cat) => ({ cat, items: list.filter((i) => i.category === cat) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShoppingCart className="h-5 w-5" /> Shopping list
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {list.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              Generate a meal plan first — the shopping list is built from what the
              plan needs minus what's already in your kitchen.
            </p>
          ) : (
            <>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Checked off: ${spent.toFixed(2)}</span>
                  <span className="text-muted-foreground">
                    List total ~${total.toFixed(2)} / budget ${state.weeklyBudget}
                  </span>
                </div>
                <Progress value={budgetPct} />
              </div>

              {grouped.map(({ cat, items }) => (
                <div key={cat}>
                  <p className="text-sm font-semibold capitalize mt-3 mb-1">{cat}</p>
                  <div className="space-y-1">
                    {items.map((item) => {
                      const checked = state.checkedShoppingItems.includes(item.name);
                      return (
                        <label
                          key={item.name}
                          className="flex items-center gap-3 text-sm rounded-md px-2 py-1.5 hover:bg-muted cursor-pointer"
                        >
                          <Checkbox checked={checked} onChange={(e) => toggle(item.name, e.target.checked)} />
                          <span className={checked ? "line-through text-muted-foreground" : ""}>
                            {item.name} <span className="text-muted-foreground">({item.quantity})</span>
                          </span>
                          <span className="ml-auto text-muted-foreground">${item.estCost.toFixed(2)}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
