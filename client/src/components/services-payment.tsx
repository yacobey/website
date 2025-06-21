import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { DollarSign, Clock, Shield, CheckCircle } from "lucide-react";

const services = [
  {
    name: "Individual Tax Return",
    price: 299,
    description: "Complete tax preparation and filing for individuals",
    features: [
      "All standard forms and schedules",
      "Itemized or standard deduction optimization", 
      "E-filing included",
      "One year of support"
    ]
  },
  {
    name: "Business Tax Return",
    price: 499,
    description: "Comprehensive business tax preparation",
    features: [
      "All business forms (1120, 1120S, 1065, etc.)",
      "Depreciation schedules",
      "Multi-state filing if needed",
      "Tax planning consultation included"
    ]
  },
  {
    name: "Financial Statement Review",
    price: 799,
    description: "Professional compilation or review services",
    features: [
      "Balance sheet and income statement",
      "Cash flow statement",
      "Notes to financial statements",
      "CPA review letter"
    ]
  },
  {
    name: "Tax Planning Session",
    price: 199,
    description: "Strategic tax planning consultation (1 hour)",
    features: [
      "Current year tax projection",
      "Multi-year tax strategies",
      "Deduction optimization",
      "Retirement planning advice"
    ]
  },
  {
    name: "QuickBooks Setup",
    price: 399,
    description: "Complete bookkeeping system setup and training",
    features: [
      "Chart of accounts setup",
      "Bank account connections",
      "Initial data entry",
      "2-hour training session"
    ]
  },
  {
    name: "IRS Representation",
    price: 299,
    description: "Professional representation for IRS matters",
    features: [
      "IRS correspondence handling",
      "Audit representation",
      "Payment plan negotiations",
      "Resolution documentation"
    ]
  }
];

export default function ServicesPayment() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Professional CPA Services
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Transparent pricing with no hidden fees. Pay securely online and get started immediately.
          </p>
          
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-green-600" />
              Secure Payment Processing
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-blue-600" />
              Same-Day Response
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600" />
              CPA Certified
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="relative border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">${service.price}</div>
                    <div className="text-sm text-gray-500">one-time fee</div>
                  </div>
                </div>
                <CardDescription className="text-gray-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link href="/payment" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Pay Now - ${service.price}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="inline-block p-6 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need a Custom Service?
            </h3>
            <p className="text-gray-600 mb-4">
              Have a unique accounting need? We offer custom services tailored to your specific requirements.
            </p>
            <Link href="/payment">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                Get Custom Quote
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}