import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div className="lg:pr-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-neutral-900 mb-8 leading-tight">
              Accounting & Tax Services to Drive Strategic Growth and Financial Success
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

          {/* Right Side - Professional Image */}
          <div className="lg:pl-8">
            <div className="relative">
              <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl p-8 lg:p-12">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-neutral-900 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">S</span>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">Selam CPA Team</h3>
                    <p className="text-neutral-600 mb-4">Professional Accounting & Tax Services</p>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      Our passion is helping businesses harness the power of professional accounting and innovative AI solutions to tackle complex financial challenges and uncover new opportunities for growth and efficiency.
                    </p>
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