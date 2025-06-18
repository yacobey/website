import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  TrendingUp, 
  Users, 
  Building, 
  Lightbulb, 
  Search,
  ArrowRight 
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Services() {
  const services = [
    {
      icon: Calculator,
      title: "Tax Preparation & Planning",
      description: "Expert tax preparation for individuals and businesses with year-round planning to minimize your tax burden.",
      eventName: "learn_more_tax"
    },
    {
      icon: TrendingUp,
      title: "Bookkeeping & Accounting",
      description: "Accurate bookkeeping and financial reporting to keep your business organized and compliant.",
      eventName: "learn_more_bookkeeping"
    },
    {
      icon: Users,
      title: "Payroll Services",
      description: "Complete payroll management including tax calculations, direct deposit, and compliance reporting.",
      eventName: "learn_more_payroll"
    },
    {
      icon: Building,
      title: "Business Formation",
      description: "Help establish your business structure, obtain EIN, and set up proper accounting systems from day one.",
      eventName: "learn_more_formation"
    },
    {
      icon: Lightbulb,
      title: "Financial Planning",
      description: "Strategic financial advice to help you make informed decisions and plan for long-term growth.",
      eventName: "learn_more_planning"
    },
    {
      icon: Search,
      title: "Audit & Review",
      description: "Professional audit and review services to ensure accuracy and compliance with accounting standards.",
      eventName: "learn_more_audit"
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
          <p className="text-xl text-slate-gray max-w-2xl mx-auto">
            From tax preparation to strategic financial planning, we provide the expertise your business needs to thrive.
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
