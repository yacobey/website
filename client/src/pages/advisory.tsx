import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { TrendingUp, BarChart3, DollarSign, Target, Zap, Users } from "lucide-react";

const services = [
  {
    title: "Fractional CFO & Controller Services",
    description: "Executive-level financial leadership without the full-time overhead",
    icon: <Users className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Budgeting, Forecasting, and Financial Modeling",
    description: "Strategic financial planning with scenario analysis and cash flow projections",
    icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Financial KPI Dashboards & Custom Reports",
    description: "Real-time financial visibility with customized reporting and analytics",
    icon: <Target className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Accounting Workflow Optimization",
    description: "SOPs, process improvement, and AI tools implementation for efficiency",
    icon: <Zap className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "M&A Due Diligence & Deal Support",
    description: "Financial due diligence, valuation support, and transaction advisory",
    icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Tax Structure Optimization for Scaling",
    description: "Strategic tax planning for growth-stage businesses and expanding operations",
    icon: <DollarSign className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "AI-Powered Advisory Tools & Automation",
    description: "Leverage cutting-edge AI tools to automate financial processes and insights",
    icon: <Zap className="w-6 h-6 text-blue-600" />,
  },
];

const cfoServices = [
  {
    service: "Strategic Planning",
    description: "Long-term financial strategy aligned with business goals",
  },
  {
    service: "Capital Management",
    description: "Optimize cash flow, credit facilities, and capital structure",
  },
  {
    service: "Performance Management",
    description: "KPI development, variance analysis, and operational insights",
  },
  {
    service: "Risk Management",
    description: "Financial risk assessment and mitigation strategies",
  },
];

export default function Advisory() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Business Advisory & Fractional CFO Services | Lenox CPA</title>
        <meta name="description" content="Strategic business advisory services including fractional CFO, financial planning, M&A support, and workflow optimization. Get CFO-level insights without the overhead." />
        <meta name="keywords" content="fractional CFO, business advisory, financial planning, M&A due diligence, strategic planning, CFO services" />
        <meta property="og:title" content="Business Advisory & Fractional CFO Services | Lenox CPA" />
        <meta property="og:description" content="Strategic business advisory services and fractional CFO solutions to accelerate growth and optimize operations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lenoxcpa.com/advisory" />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              CFO-Level Strategic Insights Without the Overhead
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Get the strategic financial guidance of a seasoned CFO without the full-time cost. 
              Our advisory services help you make informed decisions, optimize operations, and accelerate growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Schedule Strategic Consultation
              </a>
              <a
                href="#capital-access"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Explore Capital Access
              </a>
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
                Strategic Advisory Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From fractional CFO services to operational optimization, we provide the strategic guidance 
                that accelerates business growth and improves financial performance.
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

      {/* Fractional CFO Deep Dive */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Fractional CFO Services
              </h2>
              <p className="text-xl text-gray-600">
                Executive-level financial leadership tailored to your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  What You Get with Our Fractional CFO
                </h3>
                <div className="space-y-4">
                  {cfoServices.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.service}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  CFO vs. Fractional CFO
                </h3>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h4 className="font-semibold text-gray-900">Full-Time CFO</h4>
                    <p className="text-gray-600">$200K+ annually + benefits</p>
                    <p className="text-sm text-gray-500">Fixed cost regardless of need</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600">Fractional CFO</h4>
                    <p className="text-blue-600">$3K-$8K monthly</p>
                    <p className="text-sm text-gray-500">Scalable based on your requirements</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-green-800 font-semibold">Save 60-80% vs. full-time CFO</p>
                  <p className="text-green-700 text-sm">Same expertise, flexible engagement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capital Access Section */}
      <section id="capital-access" className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Capital Access Support
              </h2>
              <p className="text-xl text-gray-600">
                We help you secure the right funding at the right time
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Evaluate Needs</h3>
                  <p className="text-gray-600">
                    Comprehensive analysis of your funding requirements and growth plans
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Prepare Documentation</h3>
                  <p className="text-gray-600">
                    SBA-compliant financial packages, projections, and business plans
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Lender Matching</h3>
                  <p className="text-gray-600">
                    Connect with vetted lenders who understand your industry and needs
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Funding Options We Help With:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white rounded">
                    <p className="font-semibold text-gray-900">SBA Loans</p>
                    <p className="text-sm text-gray-600">7(a), 504, Express</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded">
                    <p className="font-semibold text-gray-900">Lines of Credit</p>
                    <p className="text-sm text-gray-600">Working capital</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded">
                    <p className="font-semibold text-gray-900">Equipment Loans</p>
                    <p className="text-sm text-gray-600">Asset financing</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded">
                    <p className="font-semibold text-gray-900">Real Estate</p>
                    <p className="text-sm text-gray-600">Commercial mortgages</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Advisory */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              AI-Powered Advisory Tools
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We leverage cutting-edge AI technology to provide deeper insights and automate routine financial analysis
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <Zap className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Automated Analysis</h3>
                <p className="text-gray-600 text-sm">AI-powered financial ratio analysis and trend identification</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Predictive Modeling</h3>
                <p className="text-gray-600 text-sm">Cash flow forecasting and scenario planning with AI</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Smart Reporting</h3>
                <p className="text-gray-600 text-sm">Automated insights and executive summary generation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Advisory Results That Matter
              </h2>
              <p className="text-xl text-blue-100">
                Our clients see measurable improvements in financial performance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">25%</div>
                <p className="text-blue-100">Average cost reduction through process optimization</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">90%</div>
                <p className="text-blue-100">Client loan approval rate with our capital access support</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">40%</div>
                <p className="text-blue-100">Faster month-end close with our workflow optimization</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">$2M+</div>
                <p className="text-blue-100">Average funding secured for growing businesses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Scale Your Business?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get the strategic financial guidance you need to accelerate growth and optimize performance. 
              Schedule a consultation to discuss your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Schedule Strategic Consultation
              </a>
              <a
                href="/ai-tools"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
              >
                Try Our Advisory Tools
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}