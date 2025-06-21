import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Users, Clock } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Link } from "wouter";

export default function Hero() {
  const handleGetFreeConsultation = () => {
    trackEvent('get_free_consultation_click', { section: 'hero' });
    window.open('https://calendly.com/probalancecpa', '_blank');
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
            Professional CPA Services
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Expert accounting, tax preparation, and business advisory services. Get professional guidance for your financial needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <Button 
              onClick={handleGetFreeConsultation}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-base font-medium rounded-md transition-colors"
            >
              Schedule Free Consultation
            </Button>
            <Link href="/payment">
              <Button 
                variant="outline" 
                size="lg"
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-base font-medium rounded-md transition-colors"
              >
                Pay Online
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">CPA Certified</h3>
              <p className="text-sm text-gray-600">Licensed professional</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Secure Service</h3>
              <p className="text-sm text-gray-600">Confidential & protected</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Quick Response</h3>
              <p className="text-sm text-gray-600">Same-day available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
