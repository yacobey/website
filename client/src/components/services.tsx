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
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-64 h-64 bg-gradient-electric rounded-full opacity-10 blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-20 w-48 h-48 bg-gradient-vibrant rounded-full opacity-10 blur-3xl animate-bounce-gentle"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {mainServices.map((service, index) => {
              const IconComponent = service.icon;
              const gradients = [
                'bg-gradient-electric shadow-electric',
                'bg-gradient-vibrant shadow-vibrant', 
                'bg-gradient-warm shadow-warm'
              ];
              const textGradients = [
                'from-blue-600 to-purple-600',
                'from-green-600 to-teal-600',
                'from-orange-600 to-red-600'
              ];
              return (
                <div key={index} className="text-center group hover-lift animate-slide-up" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className={`w-20 h-20 ${gradients[index]} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-colorful transition-all duration-500 group-hover:rotate-12 group-hover:scale-110`}>
                    <IconComponent className="text-white w-10 h-10" />
                  </div>
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${textGradients[index]} bg-clip-text text-transparent mb-4`}>{service.title}</h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">{service.description}</p>
                  <a
                    href={service.href}
                    className="inline-flex items-center bg-white/80 backdrop-blur-sm border-2 border-transparent hover:border-blue-300 text-neutral-700 hover:text-blue-600 font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-card hover:shadow-card-hover transform hover:scale-105"
                    onClick={() => trackEvent(service.eventName, { section: 'main_services' })}
                  >
                    Learn More ✨ <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expert Services Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-50/30 via-purple-50/30 to-green-50/30"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-rainbow bg-clip-text text-transparent">
                Expert Accounting Services & Financial Consulting
              </span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              Welcome to Selam CPA, a professional consulting and accounting firm whose goal is to support both businesses and professionals in realizing their full potential. We take pleasure in giving each of our client's individualized attention and assistance, making sure they have access to the resources and services they require to stay motivated and succeed financially. We are devoted to being a trusted partner for our clients and have a team of professionals with expertise in a range of sectors.
            </p>
          </div>

          <div className="text-center mb-12 animate-scale-in">
            <div className="inline-flex items-center bg-gradient-to-r from-white via-blue-50 to-white border-2 border-blue-200 rounded-2xl p-6 shadow-colorful hover-glow">
              <div className="w-16 h-16 bg-gradient-electric rounded-2xl flex items-center justify-center mr-6 animate-pulse-slow">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Trust & Integrity 🏆</h3>
                <p className="text-neutral-600">Our firm operates on a foundation of trust and integrity, with a commitment to always putting our clients' interests first.</p>
              </div>
              <Button 
                onClick={() => {
                  trackEvent('speak_to_expert_click', { section: 'trust_section' });
                  window.open('https://calendly.com/selamcpa25', '_blank');
                }}
                className="ml-6 bg-gradient-electric hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-electric hover:shadow-colorful transition-all duration-500 transform hover:scale-105"
              >
                Speak To An Expert 💬
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-sunset rounded-full opacity-10 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-vibrant rounded-full opacity-10 blur-3xl animate-bounce-gentle"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                Our Services 🎆
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {detailedServices.map((service, index) => {
              const IconComponent = service.icon;
              const cardGradients = [
                'from-blue-500/10 to-purple-500/10 border-blue-200',
                'from-green-500/10 to-teal-500/10 border-green-200',
                'from-orange-500/10 to-red-500/10 border-orange-200',
                'from-purple-500/10 to-pink-500/10 border-purple-200',
                'from-yellow-500/10 to-orange-500/10 border-yellow-200'
              ];
              const iconGradients = [
                'bg-gradient-electric',
                'bg-gradient-vibrant',
                'bg-gradient-warm',
                'bg-gradient-to-br from-purple-500 to-pink-500',
                'bg-gradient-sunset'
              ];
              return (
                <Card key={index} className={`bg-gradient-to-br ${cardGradients[index % cardGradients.length]} border-2 rounded-2xl shadow-card hover:shadow-colorful transition-all duration-500 hover-lift animate-slide-up group`} style={{animationDelay: `${index * 0.1}s`}}>
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 ${iconGradients[index % iconGradients.length]} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}>
                      <IconComponent className="text-white w-8 h-8" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
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
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20"></div>
        <div className="absolute top-10 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-20 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-bounce-gentle"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center relative z-10 animate-fade-in">
          <h2 className="text-4xl font-bold text-white mb-6 animate-scale-in">
            Accounting Services Crafted to Your Specifications ✨
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed animate-slide-up">
            As a leading CPA firm, Selam CPA is dedicated to providing exceptional financial services to professionals and businesses of all sizes and industries. We always strive for innovation and development to maintain our position at the top of our industry. Selam CPA functions on the foundations of trust, transparency, and quality of service.
          </p>
          <Button 
            onClick={() => {
              trackEvent('book_consultation_click', { section: 'bottom_cta' });
              window.open('https://calendly.com/selamcpa25', '_blank');
            }}
            className="bg-white text-blue-600 hover:bg-blue-50 hover:text-purple-600 px-10 py-4 text-xl font-bold rounded-2xl transition-all duration-500 shadow-colorful hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transform hover:scale-110 animate-pulse-slow"
          >
            Book A Consultation 🚀
          </Button>
        </div>
      </section>
    </>
  );
}
