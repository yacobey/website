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
                AI Consultancy & Financial Intelligence
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Transform your business with AI-powered financial insights, automated reporting, and intelligent decision-making tools. Our AI consultancy combines cutting-edge technology with CPA expertise to accelerate your growth.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/10 p-6 rounded-lg">
                  <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">AI Strategy Consulting</h3>
                  <p className="text-sm text-blue-100">Custom AI solutions for financial automation and intelligent reporting</p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <Zap className="w-8 h-8 text-green-300 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Intelligent Analytics</h3>
                  <p className="text-sm text-blue-100">AI-powered insights that reveal hidden opportunities and risks</p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <Calendar className="w-8 h-8 text-blue-300 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Automated Workflows</h3>
                  <p className="text-sm text-blue-100">Streamline processes with AI-driven automation and monitoring</p>
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
                <Badge className="mb-4 bg-blue-100 text-blue-800">AI Consultancy</Badge>
                <h2 className="text-3xl font-bold mb-4">How Our AI Consultancy Transforms Your Business</h2>
                <p className="text-xl text-gray-600">
                  Leverage artificial intelligence to automate accounting processes, generate intelligent insights, and make data-driven decisions that accelerate growth
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-blue-500" />
                        AI Solutions We Implement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Automated financial reporting and dashboards</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Predictive cash flow analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Intelligent expense categorization</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Risk assessment and fraud detection</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Tax optimization strategies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Performance benchmarking and KPI tracking</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">1</div>
                      <h3 className="font-semibold">Business Assessment</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      We analyze your current processes and identify opportunities for AI automation and intelligence
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">2</div>
                      <h3 className="font-semibold">Custom AI Implementation</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Our team develops and deploys tailored AI solutions that integrate seamlessly with your existing systems
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">3</div>
                      <h3 className="font-semibold">Ongoing Optimization</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Continuous monitoring and refinement ensure your AI solutions evolve with your business needs
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
