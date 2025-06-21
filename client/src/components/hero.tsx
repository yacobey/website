import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Users, Clock } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Link } from "wouter";

export default function Hero() {
  const handleGetFreeConsultation = () => {
    trackEvent('get_free_consultation_click', { section: 'hero' });
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Professional CPA Services
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Expert accounting, tax preparation, and business advisory services with global expertise through our Fellow member of the <a href="https://www.accaglobal.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Association of Chartered Certified Accountants</a>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link href="/payment">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-10 py-4 text-lg font-semibold rounded-lg shadow-sm hover:shadow-md transition-all">
                Pay Online Now
              </Button>
            </Link>
            <Button 
              onClick={handleGetFreeConsultation}
              variant="outline" 
              size="lg"
              className="border-2 border-gray-200 text-gray-700 hover:border-primary hover:text-primary px-10 py-4 text-lg font-semibold rounded-lg transition-all"
            >
              Free Consultation
            </Button>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">CPA Certified</h3>
              <p className="text-sm text-gray-600">Licensed professional expertise</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Platform</h3>
              <p className="text-sm text-gray-600">Bank-level security</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Personal Service</h3>
              <p className="text-sm text-gray-600">Dedicated support</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Always Available</h3>
              <p className="text-sm text-gray-600">Year-round support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
