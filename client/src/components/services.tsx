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
  const mainServices = [
    {
      icon: TrendingUp,
      title: "Bookkeeping & Accounting",
      description: "Our full-service accounting firm is committed to offering innovative business solutions that are suited to your specific demands.",
      href: "/bookkeeping",
      eventName: "learn_more_accounting"
    },
    {
      icon: Calculator,
      title: "Tax Planning & Preparation",
      description: "Comprehensive tax services including individual and business tax preparation, planning, and representation to minimize your tax burden.",
      href: "/tax",
      eventName: "learn_more_tax"
    },
    {
      icon: Search,
      title: "Audit & Assurance Services",
      description: "Comprehensive assurance and attestation services that will help you make informed decisions for the growth and success of your business.",
      href: "/audit",
      eventName: "learn_more_audit"
    }
  ];

  const detailedServices = [
    {
      icon: TrendingUp,
      title: "Accounting",
      description: "As a leading CPA firm we cater to both simple and complex financial needs, ranging from bookkeeping, payroll, tax returns, accounts receivable, and much more. With our team of skilled professionals, you can trust that your financial records are in capable hands.",
      href: "/bookkeeping"
    },
    {
      icon: Users,
      title: "Business Advisory Services",
      description: "Selam CPA advisory services let you manage your finances and improve your company. We work directly with you to build specialized solutions that enable businesses to cut expenses and increase earnings.",
      href: "/advisory"
    },
    {
      icon: Calculator,
      title: "Tax Compliance",
      description: "Planning your taxes and keeping track of your compliance can help you stay in compliance with the most recent tax rules and regulations while lowering your tax burden.",
      href: "/tax"
    },
    {
      icon: Search,
      title: "Audit & Assurance",
      description: "Our audit and assurance services thoroughly examine your income reports and internal controls to guarantee compliance with industry standards and laws.",
      href: "/audit"
    },
    {
      icon: Lightbulb,
      title: "AI Financial Tools",
      description: "You can expand your business and increase your financial success with our AI-powered calculators and innovative financial technology solutions.",
      href: "/ai-tools"
    }
  ];

  const handleLearnMore = (eventName: string) => {
    trackEvent(eventName, { section: 'services' });
    // In a real app, this would navigate to a detailed service page
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Main Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {mainServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">{service.title}</h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">{service.description}</p>
                  <a
                    href={service.href}
                    className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors"
                    onClick={() => trackEvent(service.eventName, { section: 'main_services' })}
                  >
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expert Services Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Expert Accounting Services & Financial Consulting
            </h2>
            <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              Welcome to Selam CPA, a professional consulting and accounting firm whose goal is to support both businesses and professionals in realizing their full potential. We take pleasure in giving each of our client's individualized attention and assistance, making sure they have access to the resources and services they require to stay motivated and succeed financially. We are devoted to being a trusted partner for our clients and have a team of professionals with expertise in a range of sectors.
            </p>
          </div>

          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-white border border-neutral-200 rounded-lg p-6 shadow-card">
              <Shield className="w-12 h-12 text-primary mr-4" />
              <div className="text-left">
                <h3 className="text-lg font-bold text-neutral-900">Trust & Integrity</h3>
                <p className="text-neutral-600">Our firm operates on a foundation of trust and integrity, with a commitment to always putting our clients' interests first.</p>
              </div>
              <Button 
                onClick={() => {
                  trackEvent('speak_to_expert_click', { section: 'trust_section' });
                  window.open('https://calendly.com/selamcpa25', '_blank');
                }}
                className="ml-6 bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-semibold"
              >
                Speak To An Expert
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">Our Services</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {detailedServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="bg-white border border-neutral-200 rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="text-primary w-6 h-6" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-neutral-900 mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="text-neutral-600 mb-4 leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-neutral-900 mb-6">
            Accounting Services Crafted to Your Specifications
          </h2>
          <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
            As a leading CPA firm, Selam CPA is dedicated to providing exceptional financial services to professionals and businesses of all sizes and industries. We always strive for innovation and development to maintain our position at the top of our industry. Selam CPA functions on the foundations of trust, transparency, and quality of service.
          </p>
          <Button 
            onClick={() => {
              trackEvent('book_consultation_click', { section: 'bottom_cta' });
              window.open('https://calendly.com/selamcpa25', '_blank');
            }}
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300"
          >
            Book A Consultation
          </Button>
        </div>
      </section>
    </>
  );
}
