import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Users, Clock } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Link } from "wouter";

export default function Hero() {
  const handleGetFreeConsultation = () => {
    trackEvent('get_free_consultation_click', { section: 'hero' });
    window.open('https://calendly.com/selamcpa25', '_blank');
  };

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-neutral-50 via-white to-blue-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-green-50/20"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-primary rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-success rounded-full opacity-5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Professional tagline */}
          <div className="mb-6">
            <p className="text-lg font-semibold text-primary mb-2">Advanced Accounting Solutions for Improved Financial Performance</p>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            <span className="font-['Playfair_Display'] font-bold">
              Professional CPA firm
            </span>{' '}
            <span className="text-neutral-700">
              that provides a team of specialists and cutting-edge technology to keep clients on track toward their financial goals.
            </span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={handleGetFreeConsultation}
              size="lg"
              className="bg-primary hover:bg-primary-dark text-white px-10 py-4 text-lg font-semibold rounded-lg transition-all duration-300 shadow-modern"
            >
              Book A Consultation
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="group">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-primary group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">CPA Certified</h3>
              <p className="text-neutral-600 font-medium">Licensed professional with 15+ years experience</p>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-success group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Bank-Level Security</h3>
              <p className="text-neutral-600 font-medium">Your data protected with enterprise-grade encryption</p>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_4px_14px_0_rgb(249_115_22_/_0.15)] group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Same-Day Response</h3>
              <p className="text-neutral-600 font-medium">Fast turnaround for urgent financial needs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
