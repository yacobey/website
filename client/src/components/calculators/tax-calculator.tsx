import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calculator, DollarSign } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function TaxCalculator() {
  const [income, setIncome] = useState("");
  const [filingStatus, setFilingStatus] = useState("");
  const [deductions, setDeductions] = useState("");
  const [state, setState] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const grossIncome = parseFloat(income) || 0;
    const totalDeductions = parseFloat(deductions) || 0;
    const taxableIncome = Math.max(0, grossIncome - totalDeductions);

    // Simplified 2024 tax brackets (single filer)
    let federalTax = 0;
    if (filingStatus === "single") {
      if (taxableIncome > 609350) federalTax += (taxableIncome - 609350) * 0.37;
      if (taxableIncome > 243725) federalTax += Math.min(taxableIncome - 243725, 609350 - 243725) * 0.35;
      if (taxableIncome > 191050) federalTax += Math.min(taxableIncome - 191050, 243725 - 191050) * 0.32;
      if (taxableIncome > 100525) federalTax += Math.min(taxableIncome - 100525, 191050 - 100525) * 0.24;
      if (taxableIncome > 47150) federalTax += Math.min(taxableIncome - 47150, 100525 - 47150) * 0.22;
      if (taxableIncome > 11000) federalTax += Math.min(taxableIncome - 11000, 47150 - 11000) * 0.12;
      if (taxableIncome > 0) federalTax += Math.min(taxableIncome, 11000) * 0.10;
    } else {
      // Simplified calculation for other filing statuses
      federalTax = taxableIncome * 0.22; // Approximate average rate
    }

    // State tax (simplified - using 5% for states with income tax)
    const stateTax = state && state !== "no-tax" ? taxableIncome * 0.05 : 0;
    
    // FICA taxes
    const socialSecurityTax = Math.min(grossIncome, 160200) * 0.062; // 2024 limit
    const medicareTax = grossIncome * 0.0145;
    const additionalMedicareTax = grossIncome > 200000 ? (grossIncome - 200000) * 0.009 : 0;

    const totalTax = federalTax + stateTax + socialSecurityTax + medicareTax + additionalMedicareTax;
    const afterTaxIncome = grossIncome - totalTax;
    const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;

    setResult({
      grossIncome,
      taxableIncome,
      federalTax,
      stateTax,
      socialSecurityTax,
      medicareTax: medicareTax + additionalMedicareTax,
      totalTax,
      afterTaxIncome,
      effectiveRate
    });

    trackEvent('calculator_use', 'tax_calculator', `income_${Math.floor(grossIncome/10000)*10}k`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-6 h-6 text-primary" />
          Tax Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-charcoal">Tax Information</h3>
            
            <div>
              <Label htmlFor="income">Annual Gross Income</Label>
              <Input
                id="income"
                type="number"
                placeholder="75000"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="filing-status">Filing Status</Label>
              <Select value={filingStatus} onValueChange={setFilingStatus}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select filing status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married-joint">Married Filing Jointly</SelectItem>
                  <SelectItem value="married-separate">Married Filing Separately</SelectItem>
                  <SelectItem value="head-household">Head of Household</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="deductions">Total Deductions</Label>
              <Input
                id="deductions"
                type="number"
                placeholder="13850"
                value={deductions}
                onChange={(e) => setDeductions(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-slate-gray mt-1">
                Standard deduction for 2024: Single $13,850, MFJ $27,700
              </p>
            </div>

            <div>
              <Label htmlFor="state">State</Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-tax">No State Income Tax</SelectItem>
                  <SelectItem value="ca">California</SelectItem>
                  <SelectItem value="ny">New York</SelectItem>
                  <SelectItem value="tx">Texas</SelectItem>
                  <SelectItem value="fl">Florida</SelectItem>
                  <SelectItem value="other">Other State</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleCalculate}
              className="w-full bg-primary hover:bg-primary-dark text-white"
              disabled={!income || !filingStatus}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Calculate Taxes
            </Button>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-charcoal">Tax Breakdown</h3>
            
            {result ? (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Gross Income:</span>
                    <span className="font-bold text-lg">{formatCurrency(result.grossIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Taxable Income:</span>
                    <span>{formatCurrency(result.taxableIncome)}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Federal Income Tax:</span>
                    <span>{formatCurrency(result.federalTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>State Income Tax:</span>
                    <span>{formatCurrency(result.stateTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Social Security Tax:</span>
                    <span>{formatCurrency(result.socialSecurityTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Medicare Tax:</span>
                    <span>{formatCurrency(result.medicareTax)}</span>
                  </div>
                </div>

                <Separator />

                <div className="bg-primary/10 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Total Taxes:</span>
                    <span className="font-bold text-lg text-primary">{formatCurrency(result.totalTax)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">After-Tax Income:</span>
                    <span className="font-bold text-lg text-success">{formatCurrency(result.afterTaxIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Effective Tax Rate:</span>
                    <span className="font-bold">{result.effectiveRate.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-slate-gray">
                    <strong>Disclaimer:</strong> This is a simplified tax calculator for estimation purposes only. 
                    Actual tax calculations may vary based on additional factors. Consult with a tax professional 
                    for accurate tax planning.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-slate-gray">Enter your information and click Calculate to see your tax breakdown.</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
