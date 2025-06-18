import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calculator, Target } from "lucide-react";

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState<string>("");
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<string>("");
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState<string>("");
  const [result, setResult] = useState<{
    breakEvenUnits: number;
    breakEvenRevenue: number;
    contributionMargin: number;
    contributionMarginRatio: number;
  } | null>(null);

  const calculateBreakEven = () => {
    const fixed = parseFloat(fixedCosts);
    const variableCost = parseFloat(variableCostPerUnit);
    const sellingPrice = parseFloat(sellingPricePerUnit);

    if (!fixed || !sellingPrice || variableCost < 0) return;

    const contributionMargin = sellingPrice - variableCost;
    
    if (contributionMargin <= 0) {
      alert("Selling price must be greater than variable cost per unit");
      return;
    }

    const breakEvenUnits = fixed / contributionMargin;
    const breakEvenRevenue = breakEvenUnits * sellingPrice;
    const contributionMarginRatio = (contributionMargin / sellingPrice) * 100;

    setResult({
      breakEvenUnits,
      breakEvenRevenue,
      contributionMargin,
      contributionMarginRatio
    });
  };

  const resetCalculator = () => {
    setFixedCosts("");
    setVariableCostPerUnit("");
    setSellingPricePerUnit("");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Break-Even Analysis Calculator</h2>
        <p className="text-gray-600">
          Determine how many units you need to sell to break even and start generating profit.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Business Costs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="fixedCosts">Fixed Costs per Month ($)</Label>
              <Input
                id="fixedCosts"
                type="number"
                value={fixedCosts}
                onChange={(e) => setFixedCosts(e.target.value)}
                placeholder="Rent, salaries, insurance, etc."
              />
              <p className="text-xs text-gray-500 mt-1">
                Costs that don't change with production volume
              </p>
            </div>

            <div>
              <Label htmlFor="variableCostPerUnit">Variable Cost per Unit ($)</Label>
              <Input
                id="variableCostPerUnit"
                type="number"
                step="0.01"
                value={variableCostPerUnit}
                onChange={(e) => setVariableCostPerUnit(e.target.value)}
                placeholder="Materials, direct labor, etc."
              />
              <p className="text-xs text-gray-500 mt-1">
                Costs that change with each unit produced
              </p>
            </div>

            <div>
              <Label htmlFor="sellingPricePerUnit">Selling Price per Unit ($)</Label>
              <Input
                id="sellingPricePerUnit"
                type="number"
                step="0.01"
                value={sellingPricePerUnit}
                onChange={(e) => setSellingPricePerUnit(e.target.value)}
                placeholder="Price you charge customers"
              />
            </div>

            <div className="flex gap-4">
              <Button onClick={calculateBreakEven} className="flex-1">
                Calculate Break-Even
              </Button>
              <Button onClick={resetCalculator} variant="outline">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Break-Even Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Break-Even Units</span>
                      <Badge variant="default" className="text-lg">
                        {Math.ceil(result.breakEvenUnits).toLocaleString()} units
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">
                      You must sell at least this many units to break even
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Break-Even Revenue</span>
                      <span className="font-semibold text-green-700">
                        ${result.breakEvenRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Monthly revenue needed to cover all costs
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Contribution Margin</span>
                      <span className="font-semibold text-blue-700">
                        ${result.contributionMargin.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
                        ({result.contributionMarginRatio.toFixed(1)}%)
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Profit per unit after variable costs
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-yellow-900">💡 Business Insights</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Every unit sold above {Math.ceil(result.breakEvenUnits)} generates ${result.contributionMargin.toFixed(2)} profit</li>
                    <li>• Higher prices or lower costs reduce break-even point</li>
                    <li>• Focus on increasing contribution margin for better profitability</li>
                    <li>• Monitor your actual vs. break-even performance monthly</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Enter your cost structure to analyze break-even point</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}