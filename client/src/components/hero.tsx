import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Award } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  const handleGetFreeConsultation = () => {
    trackEvent('click', 'get_free_consultation', 'hero');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewServices = () => {
    trackEvent('click', 'view_services', 'hero');
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Expert CPA Services for Individuals, Businesses & Industries
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Comprehensive accounting, tax preparation, and financial services for individuals, small businesses, corporations, and specialized industries. Enhanced with AI-powered tools and secure file sharing solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleGetFreeConsultation}
                className="bg-white text-primary hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Get Free Consultation
              </Button>
              <Button 
                onClick={handleViewServices}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                View Services
              </Button>
            </div>
            <div className="flex items-center gap-6 mt-8 text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>CPA Certified</span>
              </div>

              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-success" />
                <span>20+ Years Experience</span>
              </div>
            </div>
          </div>
          <div className="lg:pl-8">
            <img 
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Professional CPA working with financial documents" 
              className="rounded-xl shadow-2xl w-full h-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
