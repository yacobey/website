import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, Calculator, FileText } from "lucide-react";

export default function DepreciationCalculator() {
  const [assetCost, setAssetCost] = useState<string>("");
  const [salvageValue, setSalvageValue] = useState<string>("");
  const [usefulLife, setUsefulLife] = useState<string>("");
  const [method, setMethod] = useState<string>("straight-line");
  const [result, setResult] = useState<{
    annualDepreciation: number;
    depreciationSchedule: Array<{
      year: number;
      depreciation: number;
      accumulatedDepreciation: number;
      bookValue: number;
    }>;
  } | null>(null);

  const calculateDepreciation = () => {
    const cost = parseFloat(assetCost);
    const salvage = parseFloat(salvageValue) || 0;
    const life = parseFloat(usefulLife);

    if (!cost || !life) return;

    const depreciableAmount = cost - salvage;
    let schedule: Array<{
      year: number;
      depreciation: number;
      accumulatedDepreciation: number;
      bookValue: number;
    }> = [];

    if (method === "straight-line") {
      const annualDepreciation = depreciableAmount / life;
      let accumulatedDepreciation = 0;

      for (let year = 1; year <= life; year++) {
        accumulatedDepreciation += annualDepreciation;
        const bookValue = cost - accumulatedDepreciation;
        
        schedule.push({
          year,
          depreciation: annualDepreciation,
          accumulatedDepreciation,
          bookValue: Math.max(bookValue, salvage)
        });
      }

      setResult({
        annualDepreciation,
        depreciationSchedule: schedule
      });
    } else if (method === "double-declining") {
      const rate = 2 / life;
      let bookValue = cost;
      let accumulatedDepreciation = 0;

      for (let year = 1; year <= life; year++) {
        const depreciation = Math.min(bookValue * rate, bookValue - salvage);
        accumulatedDepreciation += depreciation;
        bookValue -= depreciation;

        schedule.push({
          year,
          depreciation,
          accumulatedDepreciation,
          bookValue: Math.max(bookValue, salvage)
        });

        if (bookValue <= salvage) break;
      }

      setResult({
        annualDepreciation: schedule[0]?.depreciation || 0,
        depreciationSchedule: schedule
      });
    }
  };

  const resetCalculator = () => {
    setAssetCost("");
    setSalvageValue("");
    setUsefulLife("");
    setMethod("straight-line");
    setResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Depreciation Calculator</h2>
        <p className="text-gray-600">
          Calculate asset depreciation using straight-line or double-declining balance methods for tax planning.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Asset Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="assetCost">Asset Cost ($)</Label>
              <Input
                id="assetCost"
                type="number"
                value={assetCost}
                onChange={(e) => setAssetCost(e.target.value)}
                placeholder="Enter asset cost"
              />
            </div>

            <div>
              <Label htmlFor="salvageValue">Salvage Value ($)</Label>
              <Input
                id="salvageValue"
                type="number"
                value={salvageValue}
                onChange={(e) => setSalvageValue(e.target.value)}
                placeholder="Enter salvage value"
              />
            </div>

            <div>
              <Label htmlFor="usefulLife">Useful Life (Years)</Label>
              <Input
                id="usefulLife"
                type="number"
                value={usefulLife}
                onChange={(e) => setUsefulLife(e.target.value)}
                placeholder="Enter useful life"
              />
            </div>

            <div>
              <Label htmlFor="method">Depreciation Method</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="straight-line">Straight-Line</SelectItem>
                  <SelectItem value="double-declining">Double-Declining Balance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4">
              <Button onClick={calculateDepreciation} className="flex-1">
                Calculate
              </Button>
              <Button onClick={resetCalculator} variant="outline">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              Depreciation Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-6">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {method === "straight-line" ? "Annual Depreciation" : "First Year Depreciation"}
                    </span>
                    <Badge variant="default" className="text-lg">
                      ${result.annualDepreciation.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Badge>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Year</th>
                        <th className="text-right p-2">Depreciation</th>
                        <th className="text-right p-2">Accumulated</th>
                        <th className="text-right p-2">Book Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.depreciationSchedule.map((row) => (
                        <tr key={row.year} className="border-b">
                          <td className="p-2">{row.year}</td>
                          <td className="text-right p-2">
                            ${row.depreciation.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className="text-right p-2">
                            ${row.accumulatedDepreciation.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className="text-right p-2">
                            ${row.bookValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-900">💡 Tax Planning Tips</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Double-declining provides larger deductions in early years</li>
                    <li>• Straight-line offers consistent annual deductions</li>
                    <li>• Consider Section 179 or bonus depreciation for immediate expensing</li>
                    <li>• Consult your CPA for optimal depreciation strategy</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Enter asset details to generate depreciation schedule</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}