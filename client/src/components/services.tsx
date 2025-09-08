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
  Briefcase,
  Sparkles,
  CheckCircle
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Services() {
  const services = [
    {
      icon: Calculator,
      title: "Tax Services",
      description: "Individual and business tax preparation, planning, and representation for all industries including healthcare, retail, real estate, and professional services.",
      eventName: "learn_more_tax",
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      features: ["Individual Tax Returns", "Business Tax Planning", "IRS Representation"]
    },
    {
      icon: TrendingUp,
      title: "Bookkeeping & Accounting",
      description: "Full-service bookkeeping, financial reporting, and accounting for individuals, small businesses, and corporations across all industries.",
      eventName: "learn_more_bookkeeping",
      gradient: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      features: ["Monthly Bookkeeping", "Financial Statements", "Payroll Services"]
    },
    {
      icon: Search,
      title: "Audit, Review & Compilation",
      description: "Professional audit, review, compilation services, and financial statement preparation with comprehensive cleanup services.",
      eventName: "learn_more_audit",
      gradient: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      features: ["Financial Audits", "Review Engagements", "Compilation Services"]
    },
    {
      icon: Shield,
      title: "Secure File Sharing",
      description: "Bank-level encrypted file sharing portal for safe transmission of sensitive financial documents and data with clients.",
      eventName: "learn_more_security",
      gradient: "from-red-500 to-rose-600",
      bgColor: "bg-red-50",
      features: ["Encrypted Portal", "Document Security", "Compliance Ready"]
    },
    {
      icon: Lightbulb,
      title: "AI Financial Calculators",
      description: "Custom-built financial calculators using AI technology for investment analysis, loan calculations, depreciation, and business planning scenarios.",
      eventName: "learn_more_calculators",
      gradient: "from-orange-500 to-amber-600",
      bgColor: "bg-orange-50",
      features: ["Investment Analysis", "Loan Calculators", "Business Planning"]
    },
    {
      icon: Briefcase,
      title: "Industry Specialization",
      description: "Specialized accounting services for healthcare, real estate, retail, restaurants, professional services, and emerging technology sectors.",
      eventName: "learn_more_industry",
      gradient: "from-indigo-500 to-blue-600",
      bgColor: "bg-indigo-50",
      features: ["Healthcare CPA", "Real Estate", "Technology Startups"]
    }
  ];

  const handleLearnMore = (eventName: string) => {
    trackEvent('click', eventName, 'services');
    // In a real app, this would navigate to a detailed service page
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-primary rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-success rounded-full opacity-5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-full text-sm font-medium text-neutral-700 mb-6 shadow-modern">
            <Sparkles className="w-4 h-4 text-primary mr-2" />
            Comprehensive Financial Services
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            <span className="font-['Playfair_Display']">Expert Services</span>{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">Tailored</span>{' '}
            <span className="text-neutral-700">for You</span>
          </h2>
          
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            From tax preparation to AI-powered financial insights, we provide comprehensive accounting solutions that drive your business forward.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="group bg-white/80 backdrop-blur-sm border-0 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/30 to-transparent opacity-60"></div>
                <CardContent className="p-8 relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="text-white w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-neutral-700">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="link"
                    onClick={() => handleLearnMore(service.eventName)}
                    className="text-primary font-semibold hover:text-primary-dark transition-colors p-0 text-sm group-hover:translate-x-1 transition-transform duration-300 flex items-center"
                  >
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-modern max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Ready to Transform Your Financial Future?
            </h3>
            <p className="text-neutral-600 mb-6">
              Schedule a free consultation today and discover how our expert services can help your business thrive.
            </p>
            <Button 
              onClick={() => {
                trackEvent('schedule_consultation_click', { section: 'services_bottom' });
                window.open('https://calendly.com/selamcpa25', '_blank');
              }}
              className="bg-gradient-primary hover:shadow-primary text-white px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Schedule Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
