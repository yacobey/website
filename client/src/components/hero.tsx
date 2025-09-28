import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useBusinessConfig } from "@/hooks/use-business-config";
import officeImage from "@assets/stock_images/modern_office_worksp_c2ea0fcd.jpg";

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
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div className="lg:pr-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-8 leading-tight">
              Professional Bookkeeping, Accounting & Tax Services to{" "}
              <span className="text-neutral-700">
                Drive Strategic Growth
              </span>{" "}
              and{" "}
              <span className="text-neutral-700">
                Financial Success
              </span>
            </h1>
            <p className="text-xl text-neutral-600 mb-12 leading-relaxed">
              Empower your business with professional accounting, tax planning, and AI-powered financial solutions that drive growth, streamline processes, and create competitive advantages.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleScheduleConsultation}
                className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-4 text-lg font-medium rounded-lg flex items-center gap-2 group shadow-lg"
                data-testid="button-schedule-consultation"
              >
                Book Your Free Consultation Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                onClick={handleGetInTouch}
                variant="outline"
                className="border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-50 px-8 py-4 text-lg font-medium rounded-lg"
                data-testid="button-get-in-touch"
              >
                Get in Touch
              </Button>
            </div>
          </div>

          {/* Right Side - Professional Office Image */}
          <div className="lg:pl-8">
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <img 
                  src={officeImage}
                  alt="Professional accounting office with modern workspace and financial documents"
                  className="w-full h-96 lg:h-[500px] object-cover rounded-xl"
                  data-testid="img-office"
                />
                
                {/* Simple professional overlay */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="text-sm font-semibold text-neutral-900">Expert Financial Services</div>
                  <div className="text-xs text-neutral-600">Professional accounting solutions for your business</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}