import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle, 
  Percent, 
  PieChart, 
  DollarSign,
  ExternalLink,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Link } from "wouter";

type CalculatorField = { label: string; placeholder: string; readOnly?: boolean };

type GeneratedCalculator = {
  title: string;
  fields: CalculatorField[];
  tab: string;
};

function detectCalculatorType(prompt: string): GeneratedCalculator {
  const lower = prompt.toLowerCase();

  if (lower.includes("loan") || lower.includes("mortgage") || lower.includes("payment") || lower.includes("amortiz")) {
    return {
      title: "Loan Payment Calculator",
      fields: [
        { label: "Loan Amount", placeholder: "$50,000" },
        { label: "Interest Rate", placeholder: "5.5%" },
        { label: "Term (Years)", placeholder: "30" },
        { label: "Monthly Payment", placeholder: "$284.09", readOnly: true },
      ],
      tab: "loan",
    };
  }

  if (lower.includes("tax") || lower.includes("income tax") || lower.includes("deduct")) {
    return {
      title: "Tax Estimation Calculator",
      fields: [
        { label: "Annual Income", placeholder: "$120,000" },
        { label: "Filing Status", placeholder: "Single" },
        { label: "Deductions", placeholder: "$14,600" },
        { label: "Estimated Tax", placeholder: "$22,500", readOnly: true },
      ],
      tab: "tax",
    };
  }

  if (lower.includes("roi") || lower.includes("return on invest") || lower.includes("invest")) {
    return {
      title: "ROI Calculator",
      fields: [
        { label: "Initial Investment", placeholder: "$10,000" },
        { label: "Net Profit", placeholder: "$3,500" },
        { label: "Time Period (Months)", placeholder: "12" },
        { label: "ROI", placeholder: "35%", readOnly: true },
      ],
      tab: "roi",
    };
  }

  if (lower.includes("cash flow") || lower.includes("cashflow") || lower.includes("revenue") || lower.includes("expense")) {
    return {
      title: "Cash Flow Tracker",
      fields: [
        { label: "Monthly Revenue", placeholder: "$45,000" },
        { label: "Operating Expenses", placeholder: "$28,000" },
        { label: "Other Outflows", placeholder: "$5,000" },
        { label: "Net Cash Flow", placeholder: "$12,000", readOnly: true },
      ],
      tab: "cashflow",
    };
  }

  if (lower.includes("break") || lower.includes("breakeven") || lower.includes("break-even") || lower.includes("profit")) {
    return {
      title: "Break-Even Analysis Calculator",
      fields: [
        { label: "Fixed Costs", placeholder: "$15,000" },
        { label: "Variable Cost / Unit", placeholder: "$12" },
        { label: "Selling Price / Unit", placeholder: "$25" },
        { label: "Break-Even Units", placeholder: "1,154", readOnly: true },
      ],
      tab: "breakeven",
    };
  }

  if (lower.includes("deprecia")) {
    return {
      title: "Depreciation Calculator",
      fields: [
        { label: "Asset Value", placeholder: "$50,000" },
        { label: "Salvage Value", placeholder: "$5,000" },
        { label: "Useful Life (Years)", placeholder: "10" },
        { label: "Annual Depreciation", placeholder: "$4,500", readOnly: true },
      ],
      tab: "depreciation",
    };
  }

  const words = prompt.trim().split(/\s+/).slice(0, 5).join(" ");
  return {
    title: `${words.charAt(0).toUpperCase() + words.slice(1)} Calculator`,
    fields: [
      { label: "Input 1", placeholder: "Enter value" },
      { label: "Input 2", placeholder: "Enter value" },
      { label: "Input 3", placeholder: "Enter value" },
      { label: "Result", placeholder: "Calculated", readOnly: true },
    ],
    tab: "builder",
  };
}

export default function AIToolsSection() {
  const [calculatorPrompt, setCalculatorPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCalc, setGeneratedCalc] = useState<GeneratedCalculator | null>(null);

  const handleTryAIBuilder = () => {
    trackEvent('click', { action: 'try_ai_builder', section: 'ai_tools' });
    window.location.href = '/ai-tools';
  };

  const handleGenerateCalculator = async () => {
    if (!calculatorPrompt.trim()) return;

    setIsGenerating(true);
    setGeneratedCalc(null);
    trackEvent('click', { action: 'generate_calculator', section: 'ai_tools' });

    setTimeout(() => {
      const result = detectCalculatorType(calculatorPrompt);
      setGeneratedCalc(result);
      setIsGenerating(false);
    }, 1500);
  };

  const handleUseCalculator = (action: 'use_tax_calculator' | 'use_roi_calculator' | 'use_cash_flow_calculator') => {
    trackEvent('click', { action, section: 'ai_tools' });
    window.location.href = '/ai-tools';
  };

  return (
    <section id="tools" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">AI-Powered Financial Tools</h2>
          <p className="text-xl text-slate-gray max-w-2xl mx-auto">
            Generate custom financial calculators and tracking tools tailored to your specific business needs with our AI app builder.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h3 className="text-3xl font-bold mb-6">Custom Calculator Builder</h3>
            <p className="text-lg text-slate-gray mb-8">
              Our AI-powered tool creates personalized financial calculators for your business. Simply describe what you need, and our AI will generate a fully functional calculator tailored to your requirements.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-success w-6 h-6" />
                <span className="text-lg">ROI &amp; Investment Calculators</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-success w-6 h-6" />
                <span className="text-lg">Tax Estimation Tools</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-success w-6 h-6" />
                <span className="text-lg">Cash Flow Projections</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-success w-6 h-6" />
                <span className="text-lg">Break-even Analysis</span>
              </div>
            </div>
            <Button 
              onClick={handleTryAIBuilder}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Try AI Builder
            </Button>
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-50 rounded-xl p-8 shadow-lg">
              <Card className="bg-white rounded-lg p-6">
                <h4 className="text-xl font-semibold mb-4">AI Calculator Builder</h4>
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium text-slate-gray mb-2">
                      Describe your calculator needs:
                    </Label>
                    <Textarea
                      value={calculatorPrompt}
                      onChange={(e) => setCalculatorPrompt(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                      rows={3}
                      placeholder="I need a loan payment calculator that includes principal, interest rate, and term..."
                    />
                  </div>
                  <Button 
                    onClick={handleGenerateCalculator}
                    disabled={!calculatorPrompt.trim() || isGenerating}
                    className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    {isGenerating ? "Generating..." : "Generate Calculator"}
                  </Button>
                </div>
              </Card>
            </Card>

            {/* Generated Preview */}
            {isGenerating && (
              <Card className="bg-white rounded-xl p-6 border-2 border-primary/20 shadow-md animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-1/2 mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i}>
                      <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-8 bg-gray-100 rounded" />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {generatedCalc && !isGenerating && (
              <Card className="bg-white rounded-xl p-6 border-2 border-primary/30 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-semibold text-lg">Generated: {generatedCalc.title}</h5>
                  <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3" /> Ready
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-5">
                  {generatedCalc.fields.map((field) => (
                    <div key={field.label}>
                      <Label className="block text-slate-gray mb-1">{field.label}</Label>
                      <Input
                        type="text"
                        className={`w-full p-2 border rounded ${field.readOnly ? "bg-gray-50 font-medium text-primary" : ""}`}
                        placeholder={field.placeholder}
                        readOnly={field.readOnly}
                      />
                    </div>
                  ))}
                </div>
                <a
                  href={`/ai-tools#${generatedCalc.tab}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                  onClick={() => trackEvent('click', { action: 'open_full_calculator', tab: generatedCalc.tab, section: 'ai_tools' })}
                >
                  Open full interactive version <ArrowRight className="w-4 h-4" />
                </a>
              </Card>
            )}
          </div>
        </div>
        
        {/* Pre-built Calculator Templates */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gray-50 p-6 rounded-xl">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Percent className="text-primary w-6 h-6" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Tax Calculator</h4>
              <p className="text-slate-gray mb-4">Estimate federal and state taxes for individuals and businesses.</p>
              <Button 
                variant="link"
                onClick={() => handleUseCalculator('use_tax_calculator')}
                className="text-primary font-semibold hover:text-primary-dark transition-colors p-0"
              >
                Use Calculator <ExternalLink className="ml-1 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50 p-6 rounded-xl">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <PieChart className="text-primary w-6 h-6" />
              </div>
              <h4 className="text-xl font-semibold mb-3">ROI Calculator</h4>
              <p className="text-slate-gray mb-4">Calculate return on investment for business decisions and projects.</p>
              <Button 
                variant="link"
                onClick={() => handleUseCalculator('use_roi_calculator')}
                className="text-primary font-semibold hover:text-primary-dark transition-colors p-0"
              >
                Use Calculator <ExternalLink className="ml-1 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50 p-6 rounded-xl">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="text-primary w-6 h-6" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Cash Flow Tracker</h4>
              <p className="text-slate-gray mb-4">Monitor and project your business cash flow patterns.</p>
              <Button 
                variant="link"
                onClick={() => handleUseCalculator('use_cash_flow_calculator')}
                className="text-primary font-semibold hover:text-primary-dark transition-colors p-0"
              >
                Use Calculator <ExternalLink className="ml-1 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
