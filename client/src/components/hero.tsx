import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useBusinessConfig } from "@/hooks/use-business-config";
import consultationImage from "@assets/generated_images/Professional_business_consultation_meeting_dd13ce9b.png";

export default function Hero() {
  const { data: businessConfig } = useBusinessConfig();

  const handleScheduleConsultation = () => {
    trackEvent('schedule_consultation_click', { section: 'hero' });
    const calendlyUrl = businessConfig?.links.calendly || 'https://calendly.com/selamcpa25';
    window.open(calendlyUrl, '_blank');
  };

  const handleGetInTouch = () => {
    trackEvent('get_in_touch_click', { section: 'hero' });
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 leading-tight">
              Professional Bookkeeping, Accounting & Tax Services to{" "}
              <span className="shimmer bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Drive Strategic Growth
              </span>{" "}
              and{" "}
              <span className="shimmer bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Financial Success
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-neutral-600 leading-relaxed max-w-2xl">
              Empower your business with professional accounting, tax planning, and AI-powered financial solutions that drive growth, streamline processes, and create competitive advantages.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={handleScheduleConsultation}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-medium rounded-xl flex items-center gap-3 group shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                data-testid="button-schedule-consultation"
              >
                Book Your Free Consultation Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                onClick={handleGetInTouch}
                variant="outline"
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 hover:shadow-lg"
                data-testid="button-get-in-touch"
              >
                Get in Touch
              </Button>
            </div>
          </div>

          {/* Right Side - Professional Business Consultation */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-3xl blur-xl"></div>
              
              {/* Main image container */}
              <div className="relative bg-gradient-to-br from-white to-purple-50/50 rounded-2xl p-4 shadow-2xl backdrop-blur-sm border border-white/20">
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src={consultationImage}
                    alt="Professional business consultation - financial experts discussing reports in modern office"
                    className="w-full h-auto object-cover rounded-xl transform hover:scale-105 transition-transform duration-700"
                    data-testid="img-consultation"
                  />
                  
                  {/* Floating elements for visual appeal */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full shadow-lg animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full shadow-md"></div>
                  
                  {/* Enhanced overlay for branding */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-white/30">
                    <div className="text-sm font-semibold text-neutral-900 mb-1">Expert Financial Consultation</div>
                    <div className="text-xs text-neutral-600">Personalized strategies for your success</div>
                    <div className="mt-2 flex gap-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                    </div>
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