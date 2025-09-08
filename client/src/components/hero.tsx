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
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div className="lg:pr-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-8 leading-tight">
              Professional Accounting & Tax Services to{" "}
              <span className="text-purple-primary">
                Drive Strategic Growth
              </span>{" "}
              and{" "}
              <span className="text-purple-primary">
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

          {/* Right Side - Professional Accounting Image */}
          <div className="lg:pl-8">
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-8 lg:p-12 shadow-lg">
                <div className="relative h-96 bg-white rounded-2xl p-8 shadow-inner overflow-hidden">
                  {/* Accounting Visual Elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      {/* Calculator Icon */}
                      <div className="w-24 h-24 bg-purple-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      
                      {/* Financial Charts */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm text-neutral-600">
                          <span>Revenue Growth</span>
                          <span className="text-green-600 font-semibold">+24%</span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-2">
                          <div className="bg-purple-gradient h-2 rounded-full w-3/4"></div>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm text-neutral-600">
                          <span>Tax Savings</span>
                          <span className="text-blue-600 font-semibold">$25,000</span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-2">
                          <div className="bg-blue-accent h-2 rounded-full w-5/6"></div>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm text-neutral-600">
                          <span>Process Efficiency</span>
                          <span className="text-purple-primary font-semibold">+40%</span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-2">
                          <div className="bg-purple-primary h-2 rounded-full w-4/5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-purple-primary rounded-full opacity-20"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 bg-blue-accent rounded-full opacity-30"></div>
                  <div className="absolute top-1/2 right-8 w-4 h-4 bg-purple-gradient rounded-full opacity-40"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}