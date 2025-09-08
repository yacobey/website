import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Services() {
  const handleBookCall = (service: string) => {
    trackEvent('book_call_click', { section: 'services', service });
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    {
      title: "Bookkeeping & Accounting",
      description: "Complete monthly bookkeeping, financial statements, and accounts management. Designed for businesses who want accurate, up-to-date financial records without the complexity.",
    },
    {
      title: "Tax Planning & Strategy", 
      description: "Business & personal returns, entity selection, quarterly estimates, and customized tax‑planning strategies. Discover hidden deductions, structure your business smarter, and keep more of what you earn.",
    },
    {
      title: "AI Consultancy & Financial Tools",
      description: "Get hands-on assistance to integrate Artificial Intelligence into your financial processes. From automating reporting to intelligent data analysis, we work alongside you to implement solutions that actually work.",
    }
  ];

  return (
    <section className="py-20 bg-purple-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="text-white text-sm font-medium">HOW WE BRING VALUE</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Services We Provide
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-accent rounded-full flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed mb-8">
                  {service.description}
                </p>
              </div>
              
              <Button 
                onClick={() => handleBookCall(service.title)}
                className="w-full bg-purple-dark hover:bg-purple-primary text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 group transition-all duration-300"
              >
                Book a call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}