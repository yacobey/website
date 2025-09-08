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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h6 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
            HOW WE BRING VALUE
          </h6>
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Services We Provide
          </h2>
        </div>

        <div className="space-y-12">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col lg:flex-row lg:items-start gap-8 py-8">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-neutral-900 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-lg text-neutral-600 leading-relaxed mb-6 max-w-3xl">
                  {service.description}
                </p>
                
                <Button 
                  onClick={() => handleBookCall(service.title)}
                  variant="ghost"
                  className="text-neutral-900 hover:text-neutral-600 font-medium flex items-center gap-2 group p-0 h-auto"
                >
                  Book a call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}