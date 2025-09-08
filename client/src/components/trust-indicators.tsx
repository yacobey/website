import { Award, Users, TrendingUp, Shield } from "lucide-react";

export default function TrustIndicators() {
  const indicators = [
    {
      icon: Award,
      title: "Expertise and Experience",
      description: "Proven track record of delivering exceptional financial services to a diverse range of businesses and industries."
    },
    {
      icon: Users,
      title: "Client Satisfaction", 
      description: "Regular communication and collaboration with clients to ensure their financial goals are being met."
    },
    {
      icon: TrendingUp,
      title: "Innovative Solutions",
      description: "Use of advanced financial analytics to identify opportunities for cost savings and increased efficiency."
    }
  ];

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Maximizing Your Financial Growth
            </h2>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              Our financial accounting and consulting services can assist both individuals and businesses in reaching their financial objectives. Our qualified staff members excel at providing each of our clients with customized financial solutions.
            </p>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              We have the knowledge and tools to support you in achieving your objectives, whether you're a professional trying to safeguard your financial future or a company owner hoping to grow your enterprise.
            </p>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              To achieve financial success, we at Selam CPA believe you must develop a complete plan that considers both your short- and long-term financial goals. As a result, we closely collaborate with our clients to create specific financial plans that advance their goals while lowering risk and boosting profitability.
            </p>
            <a
              href="https://calendly.com/selamcpa25"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300"
            >
              Book A Consultation
            </a>
          </div>
          
          <div className="space-y-6">
            {indicators.map((indicator, index) => {
              const IconComponent = indicator.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-card">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <IconComponent className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-2">{indicator.title}</h3>
                      <p className="text-neutral-600 text-sm leading-relaxed">{indicator.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}