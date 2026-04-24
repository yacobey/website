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
  Sparkles
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Link } from "wouter";

export default function AIToolsSection() {
  const [calculatorPrompt, setCalculatorPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTryAIBuilder = () => {
    trackEvent('click', { action: 'try_ai_builder', section: 'ai_tools' });
    // In a real app, this would navigate to the AI builder page
    window.location.href = '/ai-tools';
  };

  const handleGenerateCalculator = async () => {
    if (!calculatorPrompt.trim()) return;
    
    setIsGenerating(true);
    trackEvent('click', { action: 'generate_calculator', section: 'ai_tools' });
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const handleUseCalculator = (type: string) => {
    trackEvent('click', { action: `use_${type}_calculator`, section: 'ai_tools' });
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
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold mb-6">Custom Calculator Builder</h3>
            <p className="text-lg text-slate-gray mb-8">
              Our AI-powered tool creates personalized financial calculators for your business. Simply describe what you need, and our AI will generate a fully functional calculator tailored to your requirements.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-success w-6 h-6" />
                <span className="text-lg">ROI & Investment Calculators</span>
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
          <div>
            <Card className="bg-gray-50 rounded-xl p-8 shadow-lg">
              <Card className="bg-white rounded-lg p-6 mb-6">
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
              
              {/* Sample Generated Calculator Preview */}
              <Card className="bg-white rounded-lg p-6 border-2 border-primary/20">
                <h5 className="font-semibold mb-4">Generated: Loan Payment Calculator</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="block text-slate-gray mb-1">Loan Amount</Label>
                    <Input type="text" className="w-full p-2 border rounded" placeholder="$50,000" />
                  </div>
                  <div>
                    <Label className="block text-slate-gray mb-1">Interest Rate</Label>
                    <Input type="text" className="w-full p-2 border rounded" placeholder="5.5%" />
                  </div>
                  <div>
                    <Label className="block text-slate-gray mb-1">Term (Years)</Label>
                    <Input type="text" className="w-full p-2 border rounded" placeholder="30" />
                  </div>
                  <div>
                    <Label className="block text-slate-gray mb-1">Monthly Payment</Label>
                    <Input 
                      type="text" 
                      className="w-full p-2 border rounded bg-gray-50" 
                      placeholder="$284.09" 
                      readOnly 
                    />
                  </div>
                </div>
              </Card>
            </Card>
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
                onClick={() => handleUseCalculator('tax')}
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
                onClick={() => handleUseCalculator('roi')}
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
                onClick={() => handleUseCalculator('cash_flow')}
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
