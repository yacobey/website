import { Award, Users, TrendingUp, Shield } from "lucide-react";

export default function TrustIndicators() {
  const indicators = [
    {
      icon: Award,
      title: "Expertise and Experience",
      description: "Proven track record of delivering exceptional financial services to a diverse range of businesses and industries.",
      gradient: "bg-gradient-to-br from-yellow-500 to-orange-500",
      emoji: "🏆"
    },
    {
      icon: Users,
      title: "Client Satisfaction", 
      description: "Regular communication and collaboration with clients to ensure their financial goals are being met.",
      gradient: "bg-gradient-to-br from-green-500 to-teal-500",
      emoji: "😊"
    },
    {
      icon: TrendingUp,
      title: "Innovative Solutions",
      description: "Use of advanced financial analytics to identify opportunities for cost savings and increased efficiency.",
      gradient: "bg-gradient-to-br from-blue-500 to-purple-500",
      emoji: "🚀"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-rose-50 via-white to-blue-50 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-warm rounded-full opacity-10 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-vibrant rounded-full opacity-10 blur-3xl animate-bounce-gentle"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Maximizing Your Financial Growth 📈
              </span>
            </h2>
            <div className="space-y-6">
              <p className="text-xl text-neutral-600 leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
                Our financial accounting and consulting services can assist both individuals and businesses in reaching their financial objectives. Our qualified staff members excel at providing each of our clients with customized financial solutions.
              </p>
              <p className="text-neutral-600 leading-relaxed animate-slide-up" style={{animationDelay: '0.4s'}}>
                We have the knowledge and tools to support you in achieving your objectives, whether you're a professional trying to safeguard your financial future or a company owner hoping to grow your enterprise.
              </p>
              <p className="text-neutral-600 leading-relaxed animate-slide-up" style={{animationDelay: '0.6s'}}>
                To achieve financial success, we at Selam CPA believe you must develop a complete plan that considers both your short- and long-term financial goals. As a result, we closely collaborate with our clients to create specific financial plans that advance their goals while lowering risk and boosting profitability.
              </p>
            </div>
            <div className="mt-8 animate-scale-in" style={{animationDelay: '0.8s'}}>
              <a
                href="https://calendly.com/selamcpa25"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-electric hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 text-white px-10 py-4 text-lg font-bold rounded-2xl transition-all duration-500 shadow-electric hover:shadow-colorful transform hover:scale-105 animate-pulse-slow"
              >
                Book A Consultation 💬
              </a>
            </div>
          </div>
          
          <div className="space-y-6">
            {indicators.map((indicator, index) => {
              const IconComponent = indicator.icon;
              return (
                <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-card hover:shadow-colorful transition-all duration-500 hover-lift animate-slide-up group" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="flex items-start">
                    <div className={`w-16 h-16 ${indicator.gradient} rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                      <IconComponent className="text-white w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-bold text-neutral-900 group-hover:text-blue-600 transition-colors duration-300 mr-2">{indicator.title}</h3>
                        <span className="text-xl">{indicator.emoji}</span>
                      </div>
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