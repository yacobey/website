import { Building, Stethoscope, ShoppingBag, Users, Cpu, Home } from "lucide-react";

export default function IndustryExpertise() {
  const industries = [
    {
      icon: Stethoscope,
      name: "Healthcare",
      description: "Specialized accounting for medical practices, clinics, and healthcare providers",
      gradient: "bg-gradient-to-br from-red-500 to-pink-500",
      emoji: "🏥"
    },
    {
      icon: Home,
      name: "Real Estate", 
      description: "Expert financial services for real estate professionals and property management",
      gradient: "bg-gradient-to-br from-green-500 to-teal-500",
      emoji: "🏠"
    },
    {
      icon: ShoppingBag,
      name: "Retail & Wholesale",
      description: "Comprehensive accounting solutions for retail businesses and wholesale distributors",
      gradient: "bg-gradient-to-br from-blue-500 to-indigo-500",
      emoji: "🛍️"
    },
    {
      icon: Users,
      name: "Professional Services",
      description: "Tailored financial management for law firms, consultants, and service providers",
      gradient: "bg-gradient-to-br from-purple-500 to-violet-500",
      emoji: "💼"
    },
    {
      icon: Cpu,
      name: "Technology Startups",
      description: "Financial guidance for emerging technology companies and software businesses",
      gradient: "bg-gradient-to-br from-orange-500 to-yellow-500",
      emoji: "🚀"
    },
    {
      icon: Building,
      name: "Construction",
      description: "Specialized accounting for contractors, builders, and construction companies",
      gradient: "bg-gradient-to-br from-gray-600 to-slate-500",
      emoji: "🏗️"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-rainbow rounded-full opacity-5 blur-3xl animate-float"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-electric rounded-full opacity-5 blur-3xl animate-bounce-gentle"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Our Experience Across Industries 🌍
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            With a proven track record of achievement, Selam CPA is proud to have worked with clients in a variety of industries. Due to the experience of our team, we are able to provide specialized solutions that are tailored to the particular requirements of each client company.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <div key={index} className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-card hover:shadow-colorful transition-all duration-500 hover-lift animate-slide-up group" style={{animationDelay: `${index * 0.1}s`}}>
                <div className={`w-20 h-20 ${industry.gradient} rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                  <IconComponent className="text-white w-10 h-10" />
                </div>
                <div className="text-2xl mb-2">{industry.emoji}</div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{industry.name}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{industry.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 rounded-3xl p-8 shadow-colorful animate-scale-in">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Industry-Specific Financial Solutions 🎯
              </span>
            </h3>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              We assist businesses with specialized accounting solutions across all industries. From construction project cost analysis to healthcare practice management, real estate cash flow optimization to technology startup financial planning, we provide the expertise you need. Our inventory and cash management techniques help retail and wholesale enterprises thrive. Regardless of the sector, Selam CPA is committed to assisting with our clients' economic prosperity.
            </p>
            <p className="text-neutral-600 mb-6">
              If you are ready to work with one of the best CPA firms, <a href="/contact" className="text-blue-600 font-semibold hover:text-purple-600 transition-colors duration-300 underline decoration-wavy decoration-blue-300 hover:decoration-purple-300">contact our team</a> right now for your consultation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}