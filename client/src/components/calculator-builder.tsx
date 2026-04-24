import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calculator, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

interface GeneratedField {
  name: string;
  label: string;
  type: 'number' | 'text' | 'select';
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

interface GeneratedCalculator {
  name: string;
  description: string;
  fields: GeneratedField[];
  formula: string;
  resultLabel: string;
}

export default function CalculatorBuilder() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCalculator, setGeneratedCalculator] = useState<GeneratedCalculator | null>(null);
  const [calculatorValues, setCalculatorValues] = useState<Record<string, any>>({});
  const [result, setResult] = useState<number | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please describe your calculator",
        description: "Enter a description of what you want to calculate.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    trackEvent('click', { action: 'generate_calculator', section: 'calculator_builder' });

    // Simulate AI generation with realistic calculator examples
    setTimeout(() => {
      const calculator = generateCalculatorFromPrompt(prompt);
      setGeneratedCalculator(calculator);
      setCalculatorValues({});
      setResult(null);
      setIsGenerating(false);
      
      toast({
        title: "Calculator Generated!",
        description: "Your custom calculator is ready to use.",
      });
    }, 2000);
  };

  const generateCalculatorFromPrompt = (prompt: string): GeneratedCalculator => {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('loan') || lowerPrompt.includes('payment') || lowerPrompt.includes('mortgage')) {
      return {
        name: "Loan Payment Calculator",
        description: "Calculate monthly loan payments based on principal, interest rate, and term.",
        fields: [
          { name: 'principal', label: 'Loan Amount ($)', type: 'number', placeholder: '50000', required: true },
          { name: 'rate', label: 'Annual Interest Rate (%)', type: 'number', placeholder: '5.5', required: true },
          { name: 'term', label: 'Loan Term (Years)', type: 'number', placeholder: '30', required: true }
        ],
        formula: 'P * (r * (1 + r)^n) / ((1 + r)^n - 1)',
        resultLabel: 'Monthly Payment'
      };
    }
    
    if (lowerPrompt.includes('roi') || lowerPrompt.includes('return') || lowerPrompt.includes('investment')) {
      return {
        name: "ROI Calculator",
        description: "Calculate return on investment percentage and total returns.",
        fields: [
          { name: 'initialInvestment', label: 'Initial Investment ($)', type: 'number', placeholder: '10000', required: true },
          { name: 'finalValue', label: 'Final Value ($)', type: 'number', placeholder: '12000', required: true },
          { name: 'timeYears', label: 'Investment Period (Years)', type: 'number', placeholder: '2', required: true }
        ],
        formula: '((Final Value - Initial Investment) / Initial Investment) * 100',
        resultLabel: 'ROI Percentage'
      };
    }
    
    if (lowerPrompt.includes('break') || lowerPrompt.includes('even')) {
      return {
        name: "Break-Even Calculator",
        description: "Calculate the break-even point for your business.",
        fields: [
          { name: 'fixedCosts', label: 'Fixed Costs ($)', type: 'number', placeholder: '5000', required: true },
          { name: 'pricePerUnit', label: 'Price per Unit ($)', type: 'number', placeholder: '50', required: true },
          { name: 'variableCostPerUnit', label: 'Variable Cost per Unit ($)', type: 'number', placeholder: '20', required: true }
        ],
        formula: 'Fixed Costs / (Price per Unit - Variable Cost per Unit)',
        resultLabel: 'Break-Even Units'
      };
    }
    
    // Default calculator
    return {
      name: "Custom Financial Calculator",
      description: "A custom calculator based on your requirements.",
      fields: [
        { name: 'value1', label: 'Value 1', type: 'number', placeholder: '1000', required: true },
        { name: 'value2', label: 'Value 2', type: 'number', placeholder: '500', required: true },
        { name: 'percentage', label: 'Percentage (%)', type: 'number', placeholder: '10', required: true }
      ],
      formula: '(Value1 + Value2) * (Percentage / 100)',
      resultLabel: 'Result'
    };
  };

  const handleCalculate = () => {
    if (!generatedCalculator) return;

    try {
      let calculatedResult = 0;

      // Calculate based on calculator type
      if (generatedCalculator.name.includes('Loan')) {
        const P = parseFloat(calculatorValues.principal) || 0;
        const r = (parseFloat(calculatorValues.rate) || 0) / 100 / 12; // Monthly rate
        const n = (parseFloat(calculatorValues.term) || 0) * 12; // Total payments
        
        if (P > 0 && r > 0 && n > 0) {
          calculatedResult = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        }
      } else if (generatedCalculator.name.includes('ROI')) {
        const initial = parseFloat(calculatorValues.initialInvestment) || 0;
        const final = parseFloat(calculatorValues.finalValue) || 0;
        
        if (initial > 0) {
          calculatedResult = ((final - initial) / initial) * 100;
        }
      } else if (generatedCalculator.name.includes('Break-Even')) {
        const fixed = parseFloat(calculatorValues.fixedCosts) || 0;
        const price = parseFloat(calculatorValues.pricePerUnit) || 0;
        const variable = parseFloat(calculatorValues.variableCostPerUnit) || 0;
        
        if (price > variable && price > 0) {
          calculatedResult = fixed / (price - variable);
        }
      } else {
        // Default calculation
        const val1 = parseFloat(calculatorValues.value1) || 0;
        const val2 = parseFloat(calculatorValues.value2) || 0;
        const pct = parseFloat(calculatorValues.percentage) || 0;
        calculatedResult = (val1 + val2) * (pct / 100);
      }

      setResult(calculatedResult);
      trackEvent('calculator_use', { action: 'custom_calculator', name: generatedCalculator.name });
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "Please check your input values and try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setCalculatorValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
    setResult(null); // Clear result when inputs change
  };

  const formatResult = (value: number) => {
    if (generatedCalculator?.resultLabel.includes('Payment') || generatedCalculator?.resultLabel.includes('$')) {
      return `$${value.toFixed(2)}`;
    } else if (generatedCalculator?.resultLabel.includes('Percentage') || generatedCalculator?.resultLabel.includes('%')) {
      return `${value.toFixed(2)}%`;
    } else {
      return value.toFixed(2);
    }
  };

  return (
    <div className="space-y-8">
      {/* AI Builder Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            AI Calculator Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-slate-gray mb-2 block">
                Describe the calculator you need:
              </Label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:border-primary focus:ring-1 focus:ring-primary"
                rows={3}
                placeholder="Example: I need a loan payment calculator that calculates monthly payments based on loan amount, interest rate, and term..."
              />
            </div>
            <Button 
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-medium transition-colors"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Generating Calculator...
                </>
              ) : (
                <>
                  <Calculator className="w-4 h-4 mr-2" />
                  Generate Calculator
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Calculator */}
      {generatedCalculator && (
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">Generated</Badge>
                  {generatedCalculator.name}
                </CardTitle>
                <p className="text-sm text-slate-gray mt-2">{generatedCalculator.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Input Fields */}
              <div className="space-y-4">
                <h4 className="font-semibold text-charcoal">Calculator Inputs</h4>
                {generatedCalculator.fields.map((field) => (
                  <div key={field.name}>
                    <Label className="block text-sm font-medium text-slate-gray mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={calculatorValues[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full p-2 border rounded focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                ))}
                
                <Button 
                  onClick={handleCalculate}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg font-medium transition-colors"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate
                </Button>
              </div>

              {/* Result Display */}
              <div className="space-y-4">
                <h4 className="font-semibold text-charcoal">Result</h4>
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <Label className="block text-sm font-medium text-slate-gray mb-2">
                    {generatedCalculator.resultLabel}
                  </Label>
                  <div className="text-3xl font-bold text-primary">
                    {result !== null ? formatResult(result) : '--'}
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-medium text-charcoal mb-2">Formula Used:</h5>
                  <code className="text-sm text-slate-gray bg-white px-2 py-1 rounded">
                    {generatedCalculator.formula}
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
