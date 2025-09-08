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
              Professional Bookkeeping, Accounting & Tax Services to{" "}
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

          {/* Right Side - Modern Financial Dashboard */}
          <div className="lg:pl-8">
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-6 shadow-xl">
                <div className="relative h-96 bg-white rounded-2xl p-6 overflow-hidden">
                  {/* Modern Dashboard Layout */}
                  <div className="space-y-4">
                    {/* Header with Profile */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-gradient rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-neutral-900">Financial Dashboard</div>
                          <div className="text-xs text-neutral-500">Real-time insights</div>
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    
                    {/* Financial Cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-purple-light rounded-lg p-3">
                        <div className="text-xs text-purple-primary font-medium">Revenue</div>
                        <div className="text-lg font-bold text-neutral-900">$124.5K</div>
                        <div className="text-xs text-green-600">+12.5%</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-xs text-blue-accent font-medium">Expenses</div>
                        <div className="text-lg font-bold text-neutral-900">$87.2K</div>
                        <div className="text-xs text-neutral-500">-3.2%</div>
                      </div>
                    </div>
                    
                    {/* Chart Area */}
                    <div className="bg-neutral-50 rounded-lg p-4 h-32 flex items-end justify-between">
                      <div className="flex items-end space-x-2 h-full">
                        <div className="w-3 bg-purple-primary rounded-t h-1/2"></div>
                        <div className="w-3 bg-purple-primary rounded-t h-3/4"></div>
                        <div className="w-3 bg-purple-primary rounded-t h-full"></div>
                        <div className="w-3 bg-purple-primary rounded-t h-2/3"></div>
                        <div className="w-3 bg-blue-accent rounded-t h-5/6"></div>
                        <div className="w-3 bg-blue-accent rounded-t h-1/2"></div>
                        <div className="w-3 bg-blue-accent rounded-t h-4/5"></div>
                      </div>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex space-x-2">
                      <div className="flex-1 bg-purple-gradient text-white rounded-lg p-2 text-center">
                        <div className="text-xs font-medium">AI Insights</div>
                      </div>
                      <div className="flex-1 bg-neutral-100 text-neutral-700 rounded-lg p-2 text-center">
                        <div className="text-xs font-medium">Reports</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating notification */}
                  <div className="absolute top-4 right-4 bg-green-500 w-3 h-3 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}