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
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 overflow-hidden">
      {/* Animated Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/20 to-green-100/30"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-electric rounded-full opacity-20 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-vibrant rounded-full opacity-20 blur-3xl animate-bounce-gentle"></div>
      <div className="absolute top-40 left-1/4 w-48 h-48 bg-gradient-warm rounded-full opacity-15 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-40 right-1/3 w-56 h-56 bg-gradient-sunset rounded-full opacity-15 blur-3xl animate-float"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Professional tagline */}
          <div className="mb-6 animate-slide-up">
            <div className="inline-block bg-gradient-electric text-white px-6 py-3 rounded-full text-lg font-semibold shadow-electric animate-pulse-slow">
              Advanced Accounting Solutions for Improved Financial Performance
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight animate-scale-in">
            <span className="font-['Playfair_Display'] font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              Professional CPA firm
            </span>{' '}
            <span className="text-neutral-700">
              that provides a team of specialists and cutting-edge technology to keep clients on track toward their financial goals.
            </span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
            <Button 
              onClick={handleGetFreeConsultation}
              size="lg"
              className="bg-gradient-electric hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 text-white px-10 py-4 text-lg font-semibold rounded-xl transition-all duration-500 shadow-electric hover:shadow-colorful transform hover:scale-105 hover-glow"
            >
              Book A Consultation ✨
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="group hover-lift animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="w-20 h-20 bg-gradient-electric rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-electric group-hover:shadow-colorful transition-all duration-500 group-hover:rotate-12">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">CPA Certified 🏆</h3>
              <p className="text-neutral-600 font-medium">Licensed professional with 15+ years experience</p>
            </div>
            <div className="group hover-lift animate-slide-up" style={{animationDelay: '0.4s'}}>
              <div className="w-20 h-20 bg-gradient-vibrant rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-vibrant group-hover:shadow-colorful transition-all duration-500 group-hover:rotate-12">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">Bank-Level Security 🔒</h3>
              <p className="text-neutral-600 font-medium">Your data protected with enterprise-grade encryption</p>
            </div>
            <div className="group hover-lift animate-slide-up" style={{animationDelay: '0.6s'}}>
              <div className="w-20 h-20 bg-gradient-warm rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-warm group-hover:shadow-colorful transition-all duration-500 group-hover:rotate-12">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">Same-Day Response ⚡</h3>
              <p className="text-neutral-600 font-medium">Fast turnaround for urgent financial needs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
