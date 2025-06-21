import Header from "@/components/header";
import Footer from "@/components/footer";
import { CheckCircle, FileText, BarChart3, Users, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Monthly Bookkeeping & Reconciliation",
    description: "Complete monthly financial record maintenance with bank reconciliation",
    icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Chart of Accounts Design & Cleanup",
    description: "Structured account organization tailored to your business needs",
    icon: <FileText className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "General Ledger Maintenance",
    description: "Accurate transaction recording and categorization",
    icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Month-End Closing & Financial Reporting",
    description: "Professional financial statements and management reports",
    icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Accounts Payable & Receivable Tracking",
    description: "Cash flow management and vendor/customer tracking",
    icon: <FileText className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Payroll Journal Entries",
    description: "Accurate payroll recording and tax compliance",
    icon: <Users className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Client Portal Access for Uploads",
    description: "Secure document sharing and collaboration platform",
    icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Catch-Up Bookkeeping for Prior Years",
    description: "Historical record cleanup and organization",
    icon: <FileText className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "QuickBooks Online / Xero Integration",
    description: "Modern cloud-based accounting system setup and management",
    icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Payroll Setup & Sync (via ADP)",
    description: "Professional payroll system integration and management",
    icon: <Users className="w-6 h-6 text-blue-600" />,
  },
];

export default function Bookkeeping() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Complete Bookkeeping Solutions for Every Stage of Your Business
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Professional bookkeeping services that grow with your business. From startups to established companies, 
              we maintain accurate financial records so you can focus on what you do best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Free Bookkeeping Consultation
              </a>
              <a
                href="/payment"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Start Monthly Service
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
                Comprehensive Bookkeeping Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our full-service bookkeeping solutions ensure your financial records are accurate, 
                compliant, and provide the insights you need to make informed business decisions.
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

      {/* Partner Integration */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Seamless Payroll Integration
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                We partner with ADP to provide comprehensive payroll solutions that integrate 
                seamlessly with your bookkeeping. From setup to ongoing management, we handle it all.
              </p>
              <a
                href="#"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
              >
                Partner with ADP Payroll
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose ProBalance CPA for Bookkeeping?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">CPA-Quality Standards</h3>
                <p className="text-gray-600">
                  Every transaction reviewed by certified professionals with 20+ years of experience
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-Time Insights</h3>
                <p className="text-gray-600">
                  Monthly reports and dashboard access for up-to-date financial visibility
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Dedicated Support</h3>
                <p className="text-gray-600">
                  Direct access to your bookkeeping team with responsive communication
                </p>
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
              Ready to Streamline Your Bookkeeping?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Let our experienced team handle your financial records while you focus on growing your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Schedule Free Consultation
              </a>
              <a
                href="/payment"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Start Service Today
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}