import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, TrendingDown, Plus, Trash2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface CashFlowItem {
  id: string;
  name: string;
  amount: number;
  type: 'income' | 'expense';
  frequency: 'monthly' | 'quarterly' | 'annually';
}

export default function CashFlowTracker() {
  const [items, setItems] = useState<CashFlowItem[]>([]);
  const [newItem, setNewItem] = useState({
    name: "",
    amount: "",
    type: "income" as 'income' | 'expense',
    frequency: "monthly" as 'monthly' | 'quarterly' | 'annually'
  });
  const [projectionMonths, setProjectionMonths] = useState("12");

  const addItem = () => {
    if (!newItem.name.trim() || !newItem.amount || parseFloat(newItem.amount) <= 0) {
      return;
    }

    const item: CashFlowItem = {
      id: Date.now().toString(),
      name: newItem.name.trim(),
      amount: parseFloat(newItem.amount),
      type: newItem.type,
      frequency: newItem.frequency
    };

    setItems(prev => [...prev, item]);
    setNewItem({
      name: "",
      amount: "",
      type: "income",
      frequency: "monthly"
    });

    trackEvent('action', 'cash_flow_add_item', newItem.type);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    trackEvent('action', 'cash_flow_remove_item', 'removed');
  };

  const getMonthlyAmount = (item: CashFlowItem) => {
    switch (item.frequency) {
      case 'monthly':
        return item.amount;
      case 'quarterly':
        return item.amount / 3;
      case 'annually':
        return item.amount / 12;
      default:
        return item.amount;
    }
  };

  const calculateCashFlow = () => {
    const months = parseInt(projectionMonths) || 12;
    
    const monthlyIncome = items
      .filter(item => item.type === 'income')
      .reduce((sum, item) => sum + getMonthlyAmount(item), 0);
    
    const monthlyExpenses = items
      .filter(item => item.type === 'expense')
      .reduce((sum, item) => sum + getMonthlyAmount(item), 0);
    
    const monthlyNetFlow = monthlyIncome - monthlyExpenses;
    const totalProjectedFlow = monthlyNetFlow * months;
    
    // Generate monthly projections
    const monthlyProjections = [];
    let cumulativeFlow = 0;
    
    for (let i = 1; i <= Math.min(months, 24); i++) {
      cumulativeFlow += monthlyNetFlow;
      monthlyProjections.push({
        month: i,
        monthlyFlow: monthlyNetFlow,
        cumulativeFlow
      });
    }

    return {
      monthlyIncome,
      monthlyExpenses,
      monthlyNetFlow,
      totalProjectedFlow,
      monthlyProjections,
      projectionPeriod: months
    };
  };

  const cashFlow = calculateCashFlow();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getFrequencyMultiplier = (frequency: string) => {
    switch (frequency) {
      case 'monthly': return 1;
      case 'quarterly': return 4;
      case 'annually': return 12;
      default: return 1;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-primary" />
          Cash Flow Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-charcoal mb-4">Add Income/Expense Item</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="item-name">Item Name</Label>
                  <Input
                    id="item-name"
                    placeholder="e.g., Monthly Revenue, Office Rent"
                    value={newItem.name}
                    onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="item-amount">Amount</Label>
                    <Input
                      id="item-amount"
                      type="number"
                      placeholder="5000"
                      value={newItem.amount}
                      onChange={(e) => setNewItem(prev => ({ ...prev, amount: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="item-frequency">Frequency</Label>
                    <select
                      id="item-frequency"
                      value={newItem.frequency}
                      onChange={(e) => setNewItem(prev => ({ ...prev, frequency: e.target.value as any }))}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="annually">Annually</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label>Type</Label>
                  <div className="flex gap-4 mt-2">
                    <button
                      type="button"
                      onClick={() => setNewItem(prev => ({ ...prev, type: 'income' }))}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        newItem.type === 'income'
                          ? 'bg-success text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <TrendingUp className="w-4 h-4 inline mr-1" />
                      Income
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewItem(prev => ({ ...prev, type: 'expense' }))}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        newItem.type === 'expense'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <TrendingDown className="w-4 h-4 inline mr-1" />
                      Expense
                    </button>
                  </div>
                </div>

                <Button 
                  onClick={addItem}
                  className="w-full bg-primary hover:bg-primary-dark text-white"
                  disabled={!newItem.name.trim() || !newItem.amount}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </div>

            {/* Current Items */}
            <div>
              <h3 className="text-lg font-semibold text-charcoal mb-4">Current Items</h3>
              
              {items.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <p className="text-slate-gray">No items added yet. Add your income and expense items above.</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.name}</span>
                          <Badge variant={item.type === 'income' ? 'default' : 'destructive'}>
                            {item.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-gray">
                          {formatCurrency(item.amount)} / {item.frequency}
                          <span className="ml-2 text-xs">
                            ({formatCurrency(getMonthlyAmount(item))}/month)
                          </span>
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-charcoal">Cash Flow Analysis</h3>
              <div className="flex items-center gap-2">
                <Label htmlFor="projection-months" className="text-sm">Projection:</Label>
                <Input
                  id="projection-months"
                  type="number"
                  min="1"
                  max="60"
                  value={projectionMonths}
                  onChange={(e) => setProjectionMonths(e.target.value)}
                  className="w-20 h-8 text-sm"
                />
                <span className="text-sm text-slate-gray">months</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Monthly Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Monthly Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-success">Total Income:</span>
                    <span className="font-medium text-success">{formatCurrency(cashFlow.monthlyIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-600">Total Expenses:</span>
                    <span className="font-medium text-red-600">{formatCurrency(cashFlow.monthlyExpenses)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-semibold">Net Cash Flow:</span>
                    <span className={`font-bold text-lg ${
                      cashFlow.monthlyNetFlow >= 0 ? 'text-success' : 'text-red-600'
                    }`}>
                      {formatCurrency(cashFlow.monthlyNetFlow)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Projection Summary */}
              <div className={`rounded-lg p-4 ${
                cashFlow.totalProjectedFlow >= 0 ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <h4 className="font-semibold mb-2">
                  {cashFlow.projectionPeriod}-Month Projection
                </h4>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Projected Flow:</span>
                  <span className={`font-bold text-xl ${
                    cashFlow.totalProjectedFlow >= 0 ? 'text-success' : 'text-red-600'
                  }`}>
                    {formatCurrency(cashFlow.totalProjectedFlow)}
                  </span>
                </div>
              </div>

              {/* Monthly Breakdown */}
              {cashFlow.monthlyProjections.length > 0 && (
                <div className="bg-white border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Monthly Breakdown</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {cashFlow.monthlyProjections.slice(0, 12).map((projection) => (
                      <div key={projection.month} className="flex justify-between text-sm">
                        <span>Month {projection.month}:</span>
                        <div className="text-right">
                          <span className={`font-medium ${
                            projection.cumulativeFlow >= 0 ? 'text-success' : 'text-red-600'
                          }`}>
                            {formatCurrency(projection.cumulativeFlow)}
                          </span>
                          <span className="text-slate-gray ml-2">cumulative</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-slate-gray">
                  <strong>Note:</strong> This tracker provides basic cash flow projections based on your input. 
                  Consider seasonal variations, one-time expenses, and growth factors for more accurate planning. 
                  Consult with a financial advisor for comprehensive cash flow management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
