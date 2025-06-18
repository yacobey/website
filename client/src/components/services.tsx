import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  TrendingUp, 
  Users, 
  Building, 
  Lightbulb, 
  Search,
  ArrowRight,
  Shield,
  FileText,
  Link2,
  Briefcase
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Services() {
  const services = [
    {
      icon: Calculator,
      title: "Tax Services",
      description: "Individual and business tax preparation, planning, and representation for all industries including healthcare, retail, real estate, and professional services.",
      eventName: "learn_more_tax"
    },
    {
      icon: TrendingUp,
      title: "Bookkeeping & Accounting",
      description: "Full-service bookkeeping, financial reporting, and accounting for individuals, small businesses, and corporations across all industries.",
      eventName: "learn_more_bookkeeping"
    },
    {
      icon: Search,
      title: "Audit, Review & Compilation",
      description: "Professional audit, review, compilation services, and financial statement preparation with comprehensive cleanup services.",
      eventName: "learn_more_audit"
    },
    {
      icon: Shield,
      title: "Secure File Sharing",
      description: "Bank-level encrypted file sharing portal for safe transmission of sensitive financial documents and data with clients.",
      eventName: "learn_more_security"
    },
    {
      icon: Lightbulb,
      title: "AI Financial Calculators",
      description: "Custom-built financial calculators using AI technology for investment analysis, loan calculations, depreciation, and business planning scenarios.",
      eventName: "learn_more_calculators"
    },
    {
      icon: Briefcase,
      title: "Industry Specialization",
      description: "Specialized accounting services for healthcare, real estate, retail, restaurants, professional services, and emerging technology sectors.",
      eventName: "learn_more_industry"
    },
    {
      icon: Link2,
      title: "Financial Technology Partners",
      description: "Curated affiliate partnerships with leading financial, AI, and SaaS solutions for accounting, process management, security, and business financing.",
      eventName: "learn_more_partners"
    }
  ];

  const handleLearnMore = (eventName: string) => {
    trackEvent('click', eventName, 'services');
    // In a real app, this would navigate to a detailed service page
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Comprehensive CPA Services</h2>
          <p className="text-xl text-slate-gray max-w-3xl mx-auto">
            From individual tax preparation to enterprise-level financial services, we serve clients across all industries with specialized expertise, secure technology, and strategic partnerships.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <IconComponent className="text-primary text-2xl w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-slate-gray mb-6">{service.description}</p>
                  <Button 
                    variant="link"
                    onClick={() => handleLearnMore(service.eventName)}
                    className="text-primary font-semibold hover:text-primary-dark transition-colors p-0"
                  >
                    Learn More <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
