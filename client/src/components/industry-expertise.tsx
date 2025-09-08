import { Building, Stethoscope, ShoppingBag, Users, Cpu, Home } from "lucide-react";

export default function IndustryExpertise() {
  const industries = [
    {
      icon: Stethoscope,
      name: "Healthcare",
      description: "Specialized accounting for medical practices, clinics, and healthcare providers"
    },
    {
      icon: Home,
      name: "Real Estate", 
      description: "Expert financial services for real estate professionals and property management"
    },
    {
      icon: ShoppingBag,
      name: "Retail & Wholesale",
      description: "Comprehensive accounting solutions for retail businesses and wholesale distributors"
    },
    {
      icon: Users,
      name: "Professional Services",
      description: "Tailored financial management for law firms, consultants, and service providers"
    },
    {
      icon: Cpu,
      name: "Technology Startups",
      description: "Financial guidance for emerging technology companies and software businesses"
    },
    {
      icon: Building,
      name: "Construction",
      description: "Specialized accounting for contractors, builders, and construction companies"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-6">
            Our Experience Across Industries
          </h2>
          <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            With a proven track record of achievement, Selam CPA is proud to have worked with clients in a variety of industries. Due to the experience of our team, we are able to provide specialized solutions that are tailored to the particular requirements of each client company.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <div key={index} className="text-center p-6 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors duration-300">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="text-white w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">{industry.name}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{industry.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-neutral-50 rounded-lg p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Industry-Specific Financial Solutions
            </h3>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              We assist businesses with specialized accounting solutions across all industries. From construction project cost analysis to healthcare practice management, real estate cash flow optimization to technology startup financial planning, we provide the expertise you need. Our inventory and cash management techniques help retail and wholesale enterprises thrive. Regardless of the sector, Selam CPA is committed to assisting with our clients' economic prosperity.
            </p>
            <p className="text-neutral-600 mb-6">
              If you are ready to work with one of the best CPA firms, <a href="/contact" className="text-primary font-semibold hover:text-primary-dark">contact our team</a> right now for your consultation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}