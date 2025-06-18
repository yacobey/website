import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, DollarSign } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [timeYears, setTimeYears] = useState("");
  const [additionalInvestments, setAdditionalInvestments] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const initial = parseFloat(initialInvestment) || 0;
    const final = parseFloat(finalValue) || 0;
    const years = parseFloat(timeYears) || 0;
    const additional = parseFloat(additionalInvestments) || 0;

    if (initial <= 0) {
      return;
    }

    const totalInvestment = initial + additional;
    const totalGain = final - totalInvestment;
    const roiPercentage = (totalGain / totalInvestment) * 100;
    
    // Calculate annualized return
    const annualizedReturn = years > 0 ? (Math.pow(final / totalInvestment, 1 / years) - 1) * 100 : 0;
    
    // Calculate simple metrics
    const multiplier = final / totalInvestment;
    const dailyReturn = years > 0 ? roiPercentage / (years * 365) : 0;

    setResult({
      initialInvestment: initial,
      finalValue: final,
      additionalInvestments: additional,
      totalInvestment,
      totalGain,
      roiPercentage,
      annualizedReturn,
      multiplier,
      dailyReturn,
      timeYears: years
    });

    trackEvent('calculator_use', 'roi_calculator', `investment_${Math.floor(initial/1000)}k`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          ROI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-charcoal">Investment Details</h3>
            
            <div>
              <Label htmlFor="initial-investment">Initial Investment Amount</Label>
              <Input
                id="initial-investment"
                type="number"
                placeholder="10000"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="final-value">Current/Final Value</Label>
              <Input
                id="final-value"
                type="number"
                placeholder="12000"
                value={finalValue}
                onChange={(e) => setFinalValue(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="time-years">Investment Period (Years)</Label>
              <Input
                id="time-years"
                type="number"
                step="0.1"
                placeholder="2"
                value={timeYears}
                onChange={(e) => setTimeYears(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="additional-investments">Additional Investments (Optional)</Label>
              <Input
                id="additional-investments"
                type="number"
                placeholder="0"
                value={additionalInvestments}
                onChange={(e) => setAdditionalInvestments(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-slate-gray mt-1">
                Any additional money invested during the period
              </p>
            </div>

            <Button 
              onClick={handleCalculate}
              className="w-full bg-primary hover:bg-primary-dark text-white"
              disabled={!initialInvestment || !finalValue}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Calculate ROI
            </Button>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-charcoal">Investment Returns</h3>
            
            {result ? (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Total Investment:</span>
                    <span className="font-bold text-lg">{formatCurrency(result.totalInvestment)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Current Value:</span>
                    <span>{formatCurrency(result.finalValue)}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className={`bg-${result.totalGain >= 0 ? 'green' : 'red'}-50 rounded-lg p-4`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Total Gain/Loss:</span>
                      <span className={`font-bold text-lg ${result.totalGain >= 0 ? 'text-success' : 'text-red-600'}`}>
                        {formatCurrency(result.totalGain)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">ROI Percentage:</span>
                      <span className={`font-bold text-xl ${result.roiPercentage >= 0 ? 'text-success' : 'text-red-600'}`}>
                        {formatPercentage(result.roiPercentage)}
                      </span>
                    </div>
                  </div>

                  {result.timeYears > 0 && (
                    <div className="bg-primary/10 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Annualized Return:</span>
                        <span className="font-bold text-primary">{formatPercentage(result.annualizedReturn)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Investment Multiplier:</span>
                        <span className="font-bold">{result.multiplier.toFixed(2)}x</span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="text-sm text-slate-gray">Time Period</p>
                      <p className="font-bold text-lg">{result.timeYears} years</p>
                    </div>
                    {result.timeYears > 0 && (
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-sm text-slate-gray">Daily Return</p>
                        <p className="font-bold text-lg">{formatPercentage(result.dailyReturn)}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-slate-gray">
                    <strong>Note:</strong> This calculator provides basic ROI calculations. It does not account for 
                    taxes, fees, inflation, or the timing of additional investments. Consider consulting with a 
                    financial advisor for comprehensive investment analysis.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-slate-gray">Enter your investment details and click Calculate to see your ROI.</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
