import Header from "@/components/header";
import Footer from "@/components/footer";
import { Download, Star, DollarSign, FileText, Calculator, CheckCircle } from "lucide-react";

interface DigitalProduct {
  title: string;
  description: string;
  price: number;
  features: string[];
  gumroadId: string;
  popular?: boolean;
}

const digitalProducts: DigitalProduct[] = [
  {
    title: "Monthly Bookkeeping Spreadsheet",
    description: "Complete Excel template for tracking income, expenses, and generating monthly financial reports",
    price: 9,
    features: [
      "Income & expense tracking",
      "Automatic calculations",
      "Monthly P&L generation",
      "Bank reconciliation template",
      "Tax category organization"
    ],
    gumroadId: "YOUR_PRODUCT_ID", // Replace with actual Gumroad product ID
  },
  {
    title: "SBA Loan Application Package Template",
    description: "Professional loan application package with all required documents and financial projections",
    price: 19,
    features: [
      "Complete SBA application forms",
      "3-year financial projections",
      "Business plan template",
      "Personal financial statement",
      "Loan request summary"
    ],
    gumroadId: "YOUR_PRODUCT_ID", // Replace with actual Gumroad product ID
    popular: true,
  },
  {
    title: "Cash Flow Projection Tool (Excel)",
    description: "Dynamic Excel model for 12-month cash flow forecasting with scenario analysis",
    price: 14,
    features: [
      "12-month cash flow forecast",
      "Scenario planning tools",
      "Automated calculations",
      "Visual charts & graphs",
      "Sensitivity analysis"
    ],
    gumroadId: "YOUR_PRODUCT_ID", // Replace with actual Gumroad product ID
  },
  {
    title: "Year-End Tax Planning Checklist",
    description: "Comprehensive checklist for individual and business tax planning strategies",
    price: 12,
    features: [
      "Individual tax strategies",
      "Business deduction checklist",
      "Retirement planning guide",
      "Document organization list",
      "Tax calendar"
    ],
    gumroadId: "YOUR_PRODUCT_ID", // Replace with actual Gumroad product ID
  },
  {
    title: "Audit-Readiness Toolkit",
    description: "Complete audit preparation package with checklists, templates, and best practices",
    price: 25,
    features: [
      "Audit preparation checklist",
      "Document organization guide",
      "Internal control templates",
      "Management representation letter",
      "Audit response templates"
    ],
    gumroadId: "YOUR_PRODUCT_ID", // Replace with actual Gumroad product ID
    popular: true,
  },
];

const benefits = [
  {
    title: "Instant Download",
    description: "Get immediate access to all templates and tools",
    icon: <Download className="w-6 h-6 text-green-600" />,
  },
  {
    title: "Professional Quality",
    description: "CPA-designed templates used in real practice",
    icon: <Star className="w-6 h-6 text-green-600" />,
  },
  {
    title: "Money-Back Guarantee",
    description: "30-day satisfaction guarantee on all products",
    icon: <CheckCircle className="w-6 h-6 text-green-600" />,
  },
];

export default function AIResources() {
  const formatPrice = (price: number) => `$${price}`;

  const getGumroadButton = (product: DigitalProduct) => {
    return (
      <div className="gumroad-embed">
        <a 
          className="gumroad-button bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block text-center w-full"
          href={`https://gum.co/${product.gumroadId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy {product.title} - {formatPrice(product.price)}
        </a>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Load Gumroad Script */}
      <script src="https://gumroad.com/js/gumroad.js" async></script>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Professional AI Resources & Digital Templates
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              CPA-designed templates, calculators, and guides to streamline your business operations. 
              Instant download, professional quality, and money-back guarantee.
            </p>
            <div className="flex justify-center items-center gap-6 mb-8">
              <div className="bg-white px-4 py-2 rounded-full text-blue-600 font-semibold">
                ⚡ Instant Download
              </div>
              <div className="bg-white px-4 py-2 rounded-full text-blue-600 font-semibold">
                💰 30-Day Guarantee
              </div>
              <div className="bg-white px-4 py-2 rounded-full text-blue-600 font-semibold">
                🏆 CPA-Designed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Digital Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Professional Templates & Tools
              </h2>
              <p className="text-xl text-gray-600">
                Save time and ensure accuracy with our CPA-designed digital resources
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {digitalProducts.map((product, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-lg border ${
                    product.popular ? 'border-blue-200 ring-2 ring-blue-100' : 'border-gray-200'
                  } p-6 hover:shadow-xl transition-all duration-300`}
                >
                  {product.popular && (
                    <div className="flex justify-center mb-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="text-3xl font-bold text-blue-600 mb-4">
                      {formatPrice(product.price)}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {getGumroadButton(product)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Free Resource Download */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-xl p-8 border-l-4 border-green-600">
              <div className="flex justify-center mb-4">
                <Download className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                FREE: CPA Resources Pack
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Get our complete starter pack with AI tool guides, setup checklists, and professional templates. 
                Perfect for accounting firms and business owners getting started.
              </p>
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-green-900 mb-2">Includes:</h4>
                <ul className="text-sm text-green-800 space-y-1 text-left max-w-md mx-auto">
                  <li>• AI tool comparison spreadsheet</li>
                  <li>• Setup and implementation guides</li>
                  <li>• CPA-specific prompt templates</li>
                  <li>• ROI calculation worksheets</li>
                  <li>• Client communication templates</li>
                  <li>• Month-end checklist template</li>
                </ul>
              </div>
              <a
                href="/ai-resources"
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Free Pack
              </a>
              <p className="text-sm text-gray-500 mt-4">
                Instant download. No spam, ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gumroad Custom CSS */}
      <style jsx>{`
        .gumroad-button {
          display: inline-block !important;
          background-color: #2563eb !important;
          color: white !important;
          padding: 12px 24px !important;
          margin: 10px 0 !important;
          border-radius: 8px !important;
          font-weight: bold !important;
          text-decoration: none !important;
          transition: background 0.3s !important;
          text-align: center !important;
          width: 100% !important;
        }
        .gumroad-button:hover {
          background-color: #1d4ed8 !important;
          color: white !important;
        }
      `}</style>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "The SBA loan package template saved me weeks of work. Everything was perfectly organized and professional."
                </p>
                <p className="font-semibold text-gray-900">- Sarah M., Restaurant Owner</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "The cash flow projection tool helped us secure funding and plan our expansion perfectly."
                </p>
                <p className="font-semibold text-gray-900">- Mike R., Tech Startup</p>
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
              Need Custom Templates or Consulting?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Looking for something specific? Our team can create custom templates or provide one-on-one consulting 
              to help you optimize your financial processes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/yber2001/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Schedule Custom Consultation
              </a>
              <a
                href="/advisory"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Explore Advisory Services
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}