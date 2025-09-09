import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import consultationImage from "@assets/generated_images/Professional_business_consultation_meeting_dd13ce9b.png";

export default function Hero() {
  const handleScheduleConsultation = () => {
    trackEvent('schedule_consultation_click', { section: 'hero' });
    window.open('https://calendly.com/selamcpa25', '_blank');
  };

  const handleGetInTouch = () => {
    trackEvent('get_in_touch_click', { section: 'hero' });
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div className="lg:pr-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-8 leading-tight">
              Professional Bookkeeping, Accounting & Tax Services to{" "}
              <span className="shimmer">
                Drive Strategic Growth
              </span>{" "}
              and{" "}
              <span className="shimmer">
                Financial Success
              </span>
            </h1>
            <p className="text-xl text-neutral-600 mb-12 leading-relaxed max-w-2xl">
              Empower your business with professional accounting, tax planning, and AI-powered financial solutions that drive growth, streamline processes, and create competitive advantages.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleScheduleConsultation}
                className="bg-purple-gradient hover:bg-purple-dark text-white px-8 py-4 text-lg font-medium rounded-lg flex items-center gap-2 group shadow-lg"
              >
                Book Your Free Consultation Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                onClick={handleGetInTouch}
                variant="outline"
                className="border-2 border-purple-primary text-purple-primary hover:bg-purple-light px-8 py-4 text-lg font-medium rounded-lg"
              >
                Get in Touch
              </Button>
            </div>
          </div>

          {/* Right Side - Professional Business Consultation */}
          <div className="lg:pl-8 flex items-stretch">
            <div className="relative w-full">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-3 shadow-xl h-full">
                <div className="relative h-full overflow-hidden rounded-2xl">
                  <img 
                    src={consultationImage}
                    alt="Professional business consultation - financial experts discussing reports in modern office"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  
                  {/* Overlay for branding */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="text-sm font-semibold text-neutral-900">Expert Financial Consultation</div>
                    <div className="text-xs text-neutral-600">Personalized strategies for your success</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}