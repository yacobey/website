import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ExternalLink, Download, Star, Zap, Shield, TrendingUp } from "lucide-react";

interface AITool {
  name: string;
  category: string;
  description: string;
  bestFor: string;
  features: string[];
  pricing: string;
  affiliateLink: string;
  rating: number;
  popular?: boolean;
}

const aiTools: AITool[] = [
  {
    name: "ChatGPT Pro",
    category: "AI Assistant",
    description: "Draft emails, prep audit memos, or explain tax topics in seconds. Create a firm-specific AI assistant with custom GPTs.",
    bestFor: "Client communication, SOP drafting, report writing",
    features: ["Custom GPTs for CPA workflows", "Advanced reasoning", "File uploads", "Priority access"],
    pricing: "$20/month",
    affiliateLink: "#", // Replace with actual affiliate link
    rating: 5,
    popular: true,
  },
  {
    name: "Docyt AI",
    category: "Bookkeeping Automation",
    description: "Automate expense categorization, reconcile transactions, and extract data from receipts with AI-powered accuracy.",
    bestFor: "AI-powered bookkeeping automation",
    features: ["Smart categorization", "Receipt processing", "Bank reconciliation", "Real-time insights"],
    pricing: "Starting at $89/month",
    affiliateLink: "#", // Replace with actual affiliate link
    rating: 4.5,
  },
  {
    name: "MindBridge AI Auditor",
    category: "Audit Analytics",
    description: "Enhance audit effectiveness with anomaly detection and automatic documentation powered by machine learning.",
    bestFor: "AI-assisted audit analytics and fraud detection",
    features: ["Anomaly detection", "Risk assessment", "Audit trail automation", "Fraud detection"],
    pricing: "Contact for pricing",
    affiliateLink: "#", // Replace with actual affiliate link
    rating: 4.8,
  },
  {
    name: "Notion AI",
    category: "Knowledge Management",
    description: "Use AI to write, summarize, and organize your accounting firm's processes and knowledge base efficiently.",
    bestFor: "SOPs, checklists, content creation",
    features: ["AI writing assistant", "Document templates", "Knowledge management", "Team collaboration"],
    pricing: "$10/month per user",
    affiliateLink: "#", // Replace with actual affiliate link
    rating: 4.6,
  },
  {
    name: "Xero + AI Add-ons",
    category: "Accounting Software",
    description: "Modern accounting software with AI-powered automation for growing businesses and their accountants.",
    bestFor: "Smart invoicing, reconciliation, and forecasting",
    features: ["Smart invoicing", "Bank feeds", "AI reconciliation", "Financial reporting"],
    pricing: "Starting at $13/month",
    affiliateLink: "#", // Replace with actual affiliate link
    rating: 4.4,
  },
  {
    name: "QuickBooks Online with AI",
    category: "Accounting Software",
    description: "Full-featured small business accounting with automation, anomaly detection, and cash flow forecasting.",
    bestFor: "Full-featured small business accounting with automation",
    features: ["Automated categorization", "Cash flow forecasting", "Invoice management", "Tax preparation"],
    pricing: "Starting at $30/month",
    affiliateLink: "#", // Replace with actual affiliate link
    rating: 4.3,
    popular: true,
  },
];

const bonusTools = [
  { name: "Grammarly AI", useCase: "Clean up emails, reports, proposals", link: "#" },
  { name: "Jasper AI", useCase: "Write blogs and client-facing content", link: "#" },
  { name: "Zapier", useCase: "Automate tasks between apps", link: "#" },
  { name: "Loom AI", useCase: "Record training videos with AI summaries", link: "#" },
  { name: "Calendar.ly", useCase: "AI-powered scheduling and client booking", link: "#" },
];

export default function AIResources() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>AI Tools for CPAs - Professional Software Recommendations | Selam CPA</title>
        <meta name="description" content="CPA-approved AI tools and software recommendations for accounting firms. Automate workflows, improve accuracy, and save time with professionally-vetted solutions." />
        <meta name="keywords" content="AI tools for CPAs, accounting software, CPA software recommendations, AI accounting tools, automation tools, bookkeeping software" />
        <link rel="canonical" href="https://selamcpa.com/ai-tools-affiliate" />
        <meta property="og:title" content="AI Tools for CPAs - Professional Software Recommendations | Selam CPA" />
        <meta property="og:description" content="Professionally-vetted AI tools and software to automate workflows, improve accuracy, and save time for accounting firms." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://selamcpa.com/ai-tools-affiliate" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Tools for CPAs | Selam CPA" />
        <meta name="twitter:description" content="CPA-approved AI tools and software recommendations for accounting firms and businesses." />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
              <span className="text-lg font-semibold text-blue-600">CPA-Approved AI Tools</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              AI Tools for Accounting Firms & Small Businesses
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Automate your workflow, improve accuracy, and save hours every week with these professionally-vetted AI tools recommended by Selam CPA.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-sm text-yellow-800">
                <strong>Disclosure:</strong> Some links below are affiliate links. We may earn a commission at no extra cost to you, helping us continue providing free resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Top AI Tools for CPA Firms
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {aiTools.map((tool, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-lg border ${
                    tool.popular ? 'border-blue-200 ring-2 ring-blue-100' : 'border-gray-200'
                  } p-6 hover:shadow-xl transition-all duration-300`}
                >
                  {tool.popular && (
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        Popular Choice
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{tool.name}</h3>
                      <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {tool.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(tool.rating)}
                      <span className="text-sm text-gray-600 ml-1">({tool.rating})</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3 text-sm">
                    <strong>Best for:</strong> {tool.bestFor}
                  </p>
                  
                  <p className="text-gray-700 mb-4">{tool.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                    <ul className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <Shield className="w-3 h-3 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">{tool.pricing}</span>
                    <a
                      href={tool.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
                    >
                      Try {tool.name}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bonus Tools */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Bonus Tools for CPA Firms
            </h2>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tool</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Use Case</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bonusTools.map((tool, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{tool.name}</td>
                        <td className="px-6 py-4 text-gray-600">{tool.useCase}</td>
                        <td className="px-6 py-4 text-center">
                          <a
                            href={tool.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1"
                          >
                            Try Now
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-xl p-8 border-l-4 border-green-600">
              <div className="flex justify-center mb-4">
                <Download className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Want My Complete CPA AI Toolkit?
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Download our comprehensive toolkit with setup guides, cheat sheets, implementation checklists, and exclusive templates for accounting firms.
              </p>
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-green-900 mb-2">Includes:</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• AI tool comparison spreadsheet</li>
                  <li>• Setup and implementation guides</li>
                  <li>• CPA-specific prompt templates</li>
                  <li>• ROI calculation worksheets</li>
                  <li>• Client communication templates</li>
                </ul>
              </div>
              <a
                href="/digital-guides"
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Free Toolkit
              </a>
              <p className="text-sm text-gray-500 mt-4">
                Instantly delivered to your email. No spam, ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              Need Help Implementing AI in Your Firm?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Our CPA advisory team can help you select, implement, and optimize AI tools for maximum ROI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Schedule Free AI Consultation
              </a>
              <a
                href="/ai-tools"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Try Our AI Calculators
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}