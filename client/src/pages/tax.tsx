import Header from "@/components/header";
import Footer from "@/components/footer";
import { Calculator, TrendingUp, Shield, FileCheck, Lightbulb, Users } from "lucide-react";

const services = [
  {
    title: "Individual & Corporate Tax Preparation",
    description: "Comprehensive tax return preparation for individuals, partnerships, S-Corps, and C-Corps",
    icon: <FileCheck className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Strategic Tax Planning & Forecast Modeling",
    description: "Proactive tax strategies to minimize liability and optimize cash flow",
    icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Estimated Tax Management",
    description: "Quarterly estimated tax calculations and payment coordination",
    icon: <Calculator className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "IRS Notice Response & Representation",
    description: "Professional representation for audits, notices, and tax disputes",
    icon: <Shield className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Year-End Tax Optimization Consults",
    description: "Strategic year-end planning to maximize deductions and minimize tax burden",
    icon: <Lightbulb className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Retirement Plan Tax Structuring",
    description: "Solo 401(k), SEP-IRA, and other retirement plan optimization strategies",
    icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "1099 & Contractor Compliance",
    description: "Independent contractor classification and compliance management",
    icon: <FileCheck className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Augusta Rule Consultation",
    description: "Tax-free rental income strategies using the Augusta Rule for business owners",
    icon: <Lightbulb className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Real Estate & Asset Depreciation Planning",
    description: "Advanced depreciation strategies including cost segregation and bonus depreciation",
    icon: <Calculator className="w-6 h-6 text-blue-600" />,
  },
];

const taxTips = [
  {
    tip: "The Augusta Rule allows you to earn tax-free rental income up to 14 days per year",
    icon: "💡",
  },
  {
    tip: "Cost segregation studies can accelerate depreciation and create immediate tax savings",
    icon: "🏢",
  },
  {
    tip: "Strategic retirement contributions can reduce current year tax liability significantly",
    icon: "📈",
  },
];

export default function Tax() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Proactive Tax Strategies to Optimize Your Bottom Line
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Beyond compliance—we focus on strategic tax planning that saves you money year-round. 
              Our proactive approach identifies opportunities to minimize tax liability and maximize cash flow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Tax Planning Consultation
              </a>
              <a
                href="/payment"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                File Your Taxes Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Tips Callouts */}
      <section className="py-12 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Did You Know?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {taxTips.map((tip, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-400">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{tip.icon}</span>
                    <p className="text-gray-700 font-medium">{tip.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Comprehensive Tax Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From individual returns to complex corporate structures, our tax professionals 
                provide strategic guidance that goes beyond compliance to optimize your tax position.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    {service.icon}
                    <h3 className="text-lg font-semibold text-gray-900 ml-3">{service.title}</h3>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tax Planning Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Strategic Tax Planning Process
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Analysis</h3>
                <p className="text-gray-600">
                  Comprehensive review of your financial situation and tax history
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Strategy</h3>
                <p className="text-gray-600">
                  Custom tax planning strategy development with multiple scenarios
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Implementation</h3>
                <p className="text-gray-600">
                  Execute tax-saving strategies throughout the year
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Monitoring</h3>
                <p className="text-gray-600">
                  Ongoing review and adjustments to maximize tax efficiency
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Expertise */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Specialized Tax Expertise by Industry
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-900">Healthcare</h4>
                <p className="text-sm text-gray-600">Medical practice tax strategies</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-gray-900">Real Estate</h4>
                <p className="text-sm text-gray-600">1031 exchanges & depreciation</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-gray-900">Technology</h4>
                <p className="text-sm text-gray-600">R&D credits & equity compensation</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-gray-900">Professional Services</h4>
                <p className="text-sm text-gray-600">Partnership & LLC structures</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Don't Wait Until Tax Season
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Strategic tax planning happens year-round. Start optimizing your tax position today with our proactive approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Schedule Tax Planning Session
              </a>
              <a
                href="/ai-tools"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Try Our Tax Calculators
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}