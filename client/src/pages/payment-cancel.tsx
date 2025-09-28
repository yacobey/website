import { useBusinessConfig } from "@/hooks/use-business-config";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { XCircle, Home, Calendar } from "lucide-react";
import { Link } from "wouter";

export default function PaymentCancel() {
  const { data: businessConfig } = useBusinessConfig();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <XCircle className="w-10 h-10 text-gray-600" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Payment canceled
          </h1>
          
          <p className="text-xl text-gray-600 mb-12">
            No worries—you can try again anytime.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2" data-testid="back-home-btn">
                <Home className="w-5 h-5" />
                Back to Home
              </button>
            </Link>
            
            <a 
              href={businessConfig?.links.calendly} 
              className="bg-transparent text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold border border-blue-300 transition-all duration-200 flex items-center justify-center gap-2" 
              target="_blank" 
              rel="noopener"
              data-testid="consultation-btn"
            >
              <Calendar className="w-5 h-5" />
              Book Free Consultation
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}