import DynamicSEO from "@/components/dynamic-seo";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CalculatorBuilder from "@/components/calculator-builder";
import TaxCalculator from "@/components/calculators/tax-calculator";
import ROICalculator from "@/components/calculators/roi-calculator";
import CashFlowTracker from "@/components/calculators/cash-flow-tracker";
import LoanCalculator from "@/components/calculators/loan-calculator";
import DepreciationCalculator from "@/components/calculators/depreciation-calculator";
import BreakEvenCalculator from "@/components/calculators/break-even-calculator";
import FinancialCalendar from "@/components/calculators/financial-calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Target, Calendar } from "lucide-react";

export default function AITools() {
  return (
    <div className="min-h-screen bg-white">
      <DynamicSEO page="ai-tools" />
      <Header />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-5xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                AI-Powered Financial Tools & Calculators
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Create custom financial calculators with our AI Builder or use our comprehensive suite of pre-built tools for tax planning, investment analysis, and business decisions.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/10 p-6 rounded-lg">
                  <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">AI Builder</h3>
                  <p className="text-sm text-blue-100">Create custom calculators instantly using natural language</p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <Zap className="w-8 h-8 text-green-300 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Pre-Built Tools</h3>
                  <p className="text-sm text-blue-100">Professional calculators for common financial scenarios</p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <Calendar className="w-8 h-8 text-blue-300 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Financial Calendar</h3>
                  <p className="text-sm text-blue-100">Track important deadlines and tax dates</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Builder Explanation */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-blue-100 text-blue-800">AI Technology</Badge>
                <h2 className="text-3xl font-bold mb-4">How Our AI Builder Works</h2>
                <p className="text-xl text-gray-600">
                  Transform your ideas into powerful financial calculators using simple, natural language
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-blue-500" />
                        What You Can Create
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Investment performance calculators</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Custom loan and financing tools</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Business valuation models</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Tax scenario planners</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Retirement planning tools</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Industry-specific calculators</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">1</div>
                      <h3 className="font-semibold">Describe Your Need</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Simply type what you want: "Create a calculator for comparing investment options with compound interest"
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">2</div>
                      <h3 className="font-semibold">AI Generates Calculator</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Our AI creates input fields, formulas, and results display automatically based on your description
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">3</div>
                      <h3 className="font-semibold">Use & Customize</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Start using your calculator immediately or request modifications to perfect it for your needs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="builder" className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
                <TabsTrigger value="builder">AI Builder</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="tax">Tax</TabsTrigger>
                <TabsTrigger value="loan">Loan</TabsTrigger>
                <TabsTrigger value="depreciation">Depreciation</TabsTrigger>
                <TabsTrigger value="breakeven">Break-Even</TabsTrigger>
                <TabsTrigger value="roi">ROI</TabsTrigger>
                <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
              </TabsList>
              
              <TabsContent value="builder" className="mt-8">
                <CalculatorBuilder />
              </TabsContent>
              
              <TabsContent value="calendar" className="mt-8">
                <FinancialCalendar />
              </TabsContent>
              
              <TabsContent value="tax" className="mt-8">
                <TaxCalculator />
              </TabsContent>
              
              <TabsContent value="loan" className="mt-8">
                <LoanCalculator />
              </TabsContent>
              
              <TabsContent value="depreciation" className="mt-8">
                <DepreciationCalculator />
              </TabsContent>
              
              <TabsContent value="breakeven" className="mt-8">
                <BreakEvenCalculator />
              </TabsContent>
              
              <TabsContent value="roi" className="mt-8">
                <ROICalculator />
              </TabsContent>
              
              <TabsContent value="cashflow" className="mt-8">
                <CashFlowTracker />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}
