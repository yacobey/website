import { useState } from 'react';

export default function TrustIndicators() {
  const [isPaused, setIsPaused] = useState(false);
  
  const services = [
    "QuickBooks Professional",
    "Xero Certified", 
    "Stripe Integration",
    "Gusto Payroll",
    "TaxWise Certified",
    "Shopify Partner",
    "Bill.com Expert",
    "AI Technology",
    "Remote Services",
    "50-State Coverage",
    "Tax Planning",
    "Bookkeeping Pro"
  ];

  // Duplicate array for seamless infinite scroll
  const duplicatedServices = [...services, ...services];

  return (
    <section className="py-16 bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h6 className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-4">
            TRUSTED SOLUTIONS & INTEGRATIONS
          </h6>
        </div>
        
        {/* Moving Banner Container */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
          
          {/* Moving content */}
          <div className={`flex animate-banner-scroll whitespace-nowrap ${isPaused ? 'animation-paused' : ''}`}>
            {duplicatedServices.map((service, index) => (
              <div
                key={index}
                className="inline-flex items-center px-8 text-gray-500 hover:text-blue-600 transition-colors duration-300 cursor-default"
                data-testid={`trust-indicator-${index}`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full opacity-60" />
                  <span className="font-semibold text-lg whitespace-nowrap">{service}</span>
                  <div className="w-2 h-2 bg-blue-600 rounded-full opacity-60" />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Seamlessly integrated with industry-leading platforms to provide comprehensive financial solutions for your business
          </p>
        </div>
      </div>
    </section>
  );
}