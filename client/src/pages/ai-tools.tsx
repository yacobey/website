import Header from "@/components/header";
import Footer from "@/components/footer";
import CalculatorBuilder from "@/components/calculator-builder";
import TaxCalculator from "@/components/calculators/tax-calculator";
import ROICalculator from "@/components/calculators/roi-calculator";
import CashFlowTracker from "@/components/calculators/cash-flow-tracker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AITools() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                AI-Powered Financial Tools
              </h1>
              <p className="text-xl text-blue-100">
                Generate custom financial calculators and use our pre-built tools to make informed business decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="builder" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="builder">AI Builder</TabsTrigger>
                <TabsTrigger value="tax">Tax Calculator</TabsTrigger>
                <TabsTrigger value="roi">ROI Calculator</TabsTrigger>
                <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
              </TabsList>
              
              <TabsContent value="builder" className="mt-8">
                <CalculatorBuilder />
              </TabsContent>
              
              <TabsContent value="tax" className="mt-8">
                <TaxCalculator />
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
