import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calculator, TrendingUp } from "lucide-react";

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTerm, setLoanTerm] = useState<string>("");
  const [termUnit, setTermUnit] = useState<string>("years");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalAmount: number;
  } | null>(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100;
    const term = parseFloat(loanTerm);

    if (!principal || !rate || !term) return;

    const months = termUnit === "years" ? term * 12 : term;
    const monthlyRate = rate / 12;
    
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                          (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalAmount = monthlyPayment * months;
    const totalInterest = totalAmount - principal;

    setResult({
      monthlyPayment,
      totalInterest,
      totalAmount
    });
  };

  const resetCalculator = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTerm("");
    setTermUnit("years");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Loan Calculator</h2>
        <p className="text-gray-600">
          Calculate monthly payments, total interest, and loan costs for business or personal loans.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Loan Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="loanAmount">Loan Amount ($)</Label>
              <Input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter loan amount"
              />
            </div>

            <div>
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Enter annual interest rate"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="loanTerm">Loan Term</Label>
                <Input
                  id="loanTerm"
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  placeholder="Enter term"
                />
              </div>
              <div>
                <Label htmlFor="termUnit">Term Unit</Label>
                <Select value={termUnit} onValueChange={setTermUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="years">Years</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={calculateLoan} className="flex-1">
                Calculate Payment
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
              <TrendingUp className="w-5 h-5" />
              Loan Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Monthly Payment</span>
                      <Badge variant="default" className="text-lg">
                        ${result.monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Total Interest Paid</span>
                      <span className="font-semibold">
                        ${result.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Amount Paid</span>
                      <span className="font-semibold">
                        ${result.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-900">💡 Financial Insights</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Interest represents {((result.totalInterest / result.totalAmount) * 100).toFixed(1)}% of total payments</li>
                    <li>• Consider making extra principal payments to reduce total interest</li>
                    <li>• Shop around for better rates to save thousands in interest</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Enter loan details to see payment calculations</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}