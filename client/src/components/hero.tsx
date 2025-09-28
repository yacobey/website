import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useBusinessConfig } from "@/hooks/use-business-config";

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Vibrant Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
        {/* Dynamic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-transparent to-cyan-500/30 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full blur-3xl animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-40 right-32 w-48 h-48 bg-gradient-to-br from-green-400/30 to-blue-500/30 rounded-full blur-2xl animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-32 left-40 w-56 h-56 bg-gradient-to-br from-purple-400/30 to-pink-500/30 rounded-full blur-3xl animate-bounce" style={{animationDuration: '5s'}}></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-full blur-2xl animate-pulse" style={{animationDuration: '2s'}}></div>
        
        {/* Moving particles */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-white/40 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-yellow-300/60 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-pink-300/50 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-cyan-300/60 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
        
        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/20 via-transparent to-blue-600/20 transform rotate-12"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-pink-500/15 via-transparent to-cyan-500/15 transform -rotate-12"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center space-y-8">
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
            Professional Bookkeeping, Accounting & Tax Services to{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent drop-shadow-lg">
              Drive Strategic Growth
            </span>{" "}
            and{" "}
            <span className="bg-gradient-to-r from-green-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-lg">
              Financial Success
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto drop-shadow-md">
            Empower your business with professional accounting, tax planning, and AI-powered financial solutions that drive growth, streamline processes, and create competitive advantages.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button 
              onClick={handleScheduleConsultation}
              className="bg-white/95 hover:bg-white text-purple-700 px-10 py-5 text-xl font-bold rounded-2xl flex items-center gap-3 group shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 border-2 border-white/30"
              data-testid="button-schedule-consultation"
            >
              Book Your Free Consultation Today
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              onClick={handleGetInTouch}
              variant="outline"
              className="border-3 border-white/80 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-5 text-xl font-semibold rounded-2xl transition-all duration-300 hover:shadow-2xl hover:border-white"
              data-testid="button-get-in-touch"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}