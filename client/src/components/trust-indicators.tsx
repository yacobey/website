export default function TrustIndicators() {
  const services = [
    "QuickBooks Professional",
    "Xero Certified",
    "Stripe Integration",
    "Gusto Payroll",
    "TaxWise Certified",
    "Shopify Partner",
    "Bill.com Expert",
    "AI Technology",
    "QuickBooks Professional",
    "Xero Certified",
    "Stripe Integration",
    "Gusto Payroll",
    "TaxWise Certified",
    "Shopify Partner"
  ];

  return (
    <section className="py-16 bg-white border-b border-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h6 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
            TRUSTED SOLUTIONS & INTEGRATIONS
          </h6>
        </div>
        
        <div className="overflow-hidden">
          <div className="flex animate-scroll whitespace-nowrap">
            {services.map((service, index) => (
              <div
                key={index}
                className="inline-flex items-center mx-8 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <span className="font-medium text-lg">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}