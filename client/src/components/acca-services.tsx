import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Globe, Users, TrendingUp, Award, CheckCircle, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const fccaServices = [
  {
    title: "International Financial Reporting",
    description: "IFRS compliance and global financial reporting standards for multinational operations",
    features: [
      "IFRS financial statement preparation",
      "Cross-border taxation guidance",
      "Multi-currency consolidation",
      "Global compliance reporting"
    ],
    icon: Globe,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Corporate Finance & Advisory",
    description: "Strategic financial consulting for business expansion and international ventures",
    features: [
      "Business valuation and due diligence",
      "Merger & acquisition support",
      "Capital structure optimization",
      "Investment analysis and planning"
    ],
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "International Tax Planning",
    description: "Complex tax strategies for individuals and businesses with global operations",
    features: [
      "Transfer pricing documentation",
      "Tax treaty optimization",
      "Foreign income reporting",
      "International tax compliance"
    ],
    icon: Award,
    color: "from-purple-500 to-violet-500"
  },
  {
    title: "Multi-National Business Setup",
    description: "End-to-end support for establishing business operations across multiple countries",
    features: [
      "Corporate structure planning",
      "Regulatory compliance guidance",
      "International banking setup",
      "Cross-border payroll solutions"
    ],
    icon: Users,
    color: "from-orange-500 to-red-500"
  }
];

export default function ACCAServices() {
  const handleLearnMore = (service: string) => {
    trackEvent('acca_service_click', { service_name: service, section: 'acca_services' });
  };

  const handleConsultation = () => {
    trackEvent('acca_consultation_click', { section: 'acca_services' });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              ACCA Qualified Professional Services
            </h2>
          </div>
          <p className="text-lg text-gray-600 mb-6">
            Fellow member of the <a href="https://www.accaglobal.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Association of Chartered Certified Accountants</a> - Global expertise for complex financial needs
          </p>
          
          <div className="max-w-4xl mx-auto mb-8">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">What is ACCA with Fellow Status?</h3>
                <p className="text-blue-100 leading-relaxed">
                  ACCA (Association of Chartered Certified Accountants) is a globally recognized professional accounting qualification. 
                  Fellow status (FCCA) represents the highest level of achievement, demonstrating advanced expertise in international 
                  accounting standards, complex financial reporting, and global business practices for multinational corporations and complex financial structures.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Globe className="w-4 h-4 text-blue-600" />
              International Standards
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Award className="w-4 h-4 text-purple-600" />
              Advanced Qualification
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Global Recognition
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {fccaServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 text-base">
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
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 group hover:bg-gray-50"
                    onClick={() => handleLearnMore(service.title.toLowerCase().replace(/\s+/g, '_'))}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Card className="inline-block p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need International Financial Expertise?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl">
              Whether you're expanding globally, need IFRS compliance, or require complex international tax planning, 
              ProBalance CPA ensures you receive world-class professional guidance.
            </p>
            <div className="space-y-3">
              <Link href="/payment">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
                  onClick={handleConsultation}
                >
                  International Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <p className="text-sm text-gray-500">
                Free 30-minute consultation to discuss your international financial needs
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}