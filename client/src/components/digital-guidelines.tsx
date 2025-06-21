import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "wouter";
import { Download, CheckCircle, DollarSign, BookOpen, Calculator, FileText, TrendingUp, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const digitalGuides = [
  {
    title: "Small Business Tax Deduction Mastery",
    description: "Complete guide to maximizing tax deductions for small businesses in 2024",
    features: [
      "50+ deduction categories with examples",
      "IRS-compliant documentation templates",
      "Monthly expense tracking worksheets",
      "Quarterly tax planning calendar"
    ],
    icon: Calculator
  },
  {
    title: "QuickBooks Automation Toolkit",
    description: "Step-by-step automation setup to save 10+ hours monthly on bookkeeping",
    features: [
      "Bank connection and reconciliation rules",
      "Automated invoice and payment processing",
      "Custom reporting dashboard setup",
      "Integration with 20+ business apps"
    ],
    icon: TrendingUp
  },
  {
    title: "Financial Statement Analysis for Business Owners",
    description: "Understand your numbers and make data-driven business decisions",
    features: [
      "Key ratio analysis templates",
      "Cash flow forecasting tools",
      "Profitability improvement strategies",
      "Investor-ready financial presentations"
    ],
    icon: FileText
  },
  {
    title: "Digital Security for Financial Data",
    description: "Protect your business from cyber threats and ensure compliance",
    features: [
      "Data backup and recovery protocols",
      "Password management systems",
      "Client communication security",
      "Compliance checklists (SOX, HIPAA, PCI)"
    ],
    icon: Shield
  },
  {
    title: "Tax Planning Strategies for High Earners",
    description: "Advanced tax optimization techniques for individuals and business owners",
    features: [
      "Retirement account optimization",
      "Business structure comparisons",
      "Investment tax strategies",
      "Multi-year tax planning framework"
    ],
    icon: BookOpen
  },
  {
    title: "Audit-Ready Documentation System",
    description: "Organize your records to breeze through any audit or review",
    features: [
      "Digital filing system templates",
      "Audit trail maintenance protocols",
      "Supporting documentation checklists",
      "IRS correspondence templates"
    ],
    icon: CheckCircle
  }
];

export default function DigitalGuidelines() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to receive the digital guidelines.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Store email for delivery after payment
      localStorage.setItem('guidelines_email', email);
      
      // Create payment intent and redirect
      const response = await apiRequest("POST", "/api/create-payment-intent", { 
        amount: 9.99,
        description: "Digital Accounting Guidelines Package"
      });
      const data = await response.json();
      
      // Store client secret and redirect to payment
      localStorage.setItem('guidelines_client_secret', data.clientSecret);
      window.location.href = '/payment';
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Digital CPA Guidelines Package
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Practical, trendy, and applicable solutions for everyday accounting, auditing, tax, and business challenges
          </p>
          
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Download className="w-4 h-4 text-purple-600" />
              Instant Download
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600" />
              CPA Approved
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BookOpen className="w-4 h-4 text-blue-600" />
              6 Complete Guides
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {digitalGuides.map((guide, index) => {
            const IconComponent = guide.icon;
            return (
              <Card key={index} className="border border-purple-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">
                    {guide.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {guide.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-purple-300 bg-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-purple-900">
                Complete Package - Only $9.99
              </CardTitle>
              <CardDescription className="text-lg">
                Get all 6 digital guidelines with templates, worksheets, and actionable strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePurchase} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-base font-medium">
                    Email Address for Digital Delivery
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Your guidelines will be delivered instantly to this email after payment
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">What You Get:</h3>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• 6 comprehensive digital guidebooks (PDF format)</li>
                    <li>• 15+ Excel templates and worksheets</li>
                    <li>• Checklists and action plans</li>
                    <li>• Real-world examples and case studies</li>
                    <li>• 30-day email support for questions</li>
                  </ul>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Buy Now for $9.99 - Instant Access
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            30-day money-back guarantee | Secure payment processing | Instant digital delivery
          </p>
        </div>
      </div>
    </section>
  );
}