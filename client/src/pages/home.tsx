import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useBusinessConfig } from "@/hooks/use-business-config";
import StructuredData from "@/components/structured-data";
import { ShieldCheck, Calculator, TrendingUp } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();
  const { data: businessConfig } = useBusinessConfig();

  async function startTaxPrep() {
    const price_id = "price_TAX_PREP_123"; // TODO: replace
    const r = await fetch(`${businessConfig?.api.baseUrl || '/api'}/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ price_id })
    });
    const data = await r.json();
    if (data.url) window.location.href = data.url;
  }

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        type="Organization"
        data={{
          "@type": ["AccountingService", "LocalBusiness"],
          "name": "Selam CPA PLLC",
          "alternateName": "Selam CPA",
          "description": "Professional CPA firm providing tax preparation, bookkeeping, advisory, and audit services for individuals and businesses in MD, VA, DC Metro Area.",
          "slogan": "CPA-Led Tax Strategy & Done-For-You Filing",
          "foundingDate": "2020",
          "url": "https://selamcpa.com",
          "mainEntityOfPage": "https://selamcpa.com",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "CPA Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Tax Preparation & Planning",
                  "description": "Professional tax preparation and strategic tax planning services"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Bookkeeping Services",
                  "description": "Complete bookkeeping solutions for businesses of all sizes"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Business Advisory",
                  "description": "CFO-level strategic insights and business advisory services"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Audit & Assurance",
                  "description": "Independent audit and assurance services following GAAS standards"
                }
              }
            ]
          }
        }}
      />
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center py-16 lg:py-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            CPA-Led Tax Strategy & Done-For-You Filing
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Virtual firm based in Maryland. Proactive planning, precise compliance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a 
              href={businessConfig?.links.calendly} 
              target="_blank" 
              rel="noopener" 
              className="bg-transparent text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-8 py-4 text-lg font-semibold border border-blue-300 rounded-lg transition-all duration-200"
              data-testid="consultation-btn"
            >
              Book Free Consultation
            </a>
            <button 
              onClick={startTaxPrep} 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-8 py-4 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              data-testid="tax-prep-btn"
            >
              Start Tax Prep
            </button>
          </div>
          <p className="text-gray-500 text-lg">
            📞 <a href={`tel:${businessConfig?.phone.e164}`} className="text-blue-600 hover:text-blue-800 transition-colors" data-testid="phone-link-hero">
              {businessConfig?.phone.display}
            </a> — Virtual Receptionist (24/7)
          </p>
        </section>

        <section className="py-16 bg-gray-50 rounded-xl mb-16" aria-labelledby="tax-strategy">
          <div className="max-w-4xl mx-auto px-6">
            <h2 id="tax-strategy" className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Proactive Tax Strategy
            </h2>
            <p className="text-xl text-gray-600 mb-8 text-center max-w-3xl mx-auto">
              We don't just file—we plan. We design a customized, compliant strategy mapped to your entity, income mix, and goals.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">•</span>
                  Entity & compensation optimization
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">•</span>
                  Accountable plan & reimbursements
                </li>
              </ul>
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">•</span>
                  Home rental (280A(g)) considerations
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">•</span>
                  Timing, retirement, and credits planning
                </li>
              </ul>
            </div>
            <div className="text-center">
              <a 
                href={businessConfig?.links.calendly} 
                target="_blank" 
                rel="noopener" 
                className="bg-transparent text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-8 py-3 text-lg font-semibold border border-blue-300 rounded-lg transition-all duration-200 inline-block"
                data-testid="consultation-btn-strategy"
              >
                Book Free Consultation
              </a>
            </div>
          </div>
        </section>

        {/* Professional Services Section - Targeting Finance Professionals */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl mb-16" aria-labelledby="professional-services">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 id="professional-services" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Professional Services for Finance Experts
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Whether you're an auditor needing compliance expertise, an accountant seeking specialized support, or a finance professional managing complex transactions—we provide the professional-grade solutions you need.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Auditors Card */}
              <div className="professional-card hover-expandable bg-white rounded-lg shadow-md p-6 border border-gray-200" data-testid="auditors-card">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">For Auditors</h3>
                  <p className="text-gray-600 mt-2">GAAS-compliant audit support and specialized expertise</p>
                </div>
                
                <div className="hover-expandable-content mt-4 pt-4 border-t border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-2">Pain Points We Solve:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Complex entity audits requiring specialized knowledge</li>
                    <li>• Tight deadline pressures with quality expectations</li>
                    <li>• Industry-specific compliance and regulatory requirements</li>
                    <li>• Second opinions on challenging accounting treatments</li>
                  </ul>
                  <div className="mt-3">
                    <a href="/audit" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Audit Services →
                    </a>
                  </div>
                </div>
              </div>

              {/* Accountants Card */}
              <div className="professional-card hover-expandable bg-white rounded-lg shadow-md p-6 border border-gray-200" data-testid="accountants-card">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Calculator className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">For Accountants</h3>
                  <p className="text-gray-600 mt-2">Overflow support and specialized accounting expertise</p>
                </div>
                
                <div className="hover-expandable-content mt-4 pt-4 border-t border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-2">Pain Points We Solve:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Seasonal workload overflows during busy periods</li>
                    <li>• Complex technical accounting questions</li>
                    <li>• Client demands exceeding current capacity</li>
                    <li>• Need for specialized industry expertise</li>
                  </ul>
                  <div className="mt-3">
                    <a href="/bookkeeping" className="text-green-600 hover:text-green-800 text-sm font-medium">
                      View Accounting Services →
                    </a>
                  </div>
                </div>
              </div>

              {/* Finance Professionals Card */}
              <div className="professional-card hover-expandable bg-white rounded-lg shadow-md p-6 border border-gray-200" data-testid="finance-professionals-card">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">For Finance Teams</h3>
                  <p className="text-gray-600 mt-2">Strategic CFO-level insights and advanced analytics</p>
                </div>
                
                <div className="hover-expandable-content mt-4 pt-4 border-t border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-2">Pain Points We Solve:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• M&A due diligence requiring CPA-level analysis</li>
                    <li>• Financial modeling for investment decisions</li>
                    <li>• Regulatory compliance in complex transactions</li>
                    <li>• Need for independent financial opinions</li>
                  </ul>
                  <div className="mt-3">
                    <a href="/advisory" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                      View Advisory Services →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                <strong>Professional credentials you can trust:</strong> CPA-led team with 15+ years in public accounting, Big 4 experience, and specialized industry expertise.
              </p>
              <a 
                href={businessConfig?.links.calendly} 
                target="_blank" 
                rel="noopener" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-8 py-3 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 inline-block"
                data-testid="professional-consultation-btn"
              >
                Schedule Professional Consultation
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl mb-16" aria-labelledby="agent">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 id="agent" className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                SelamTax CPA Agent (Beta)
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                AI-powered expertise for finance professionals. Ask complex tax & accounting questions and get step-by-step guidance from our specialized CPA agent.
              </p>
            </div>

            {/* Professional Use Cases */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* For Auditors */}
              <div className="professional-card hover-expandable bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 border border-white/50" data-testid="agent-auditors-card">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">For Auditors</h3>
                  <p className="text-gray-600 mt-2">AI guidance on complex audit procedures</p>
                </div>
                
                <div className="hover-expandable-content mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">AI Solves These Challenges:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Quick GAAS reference and application guidance</li>
                    <li>• Draft audit procedures for unusual transactions</li>
                    <li>• Explain complex accounting standards (ASC 606, 842)</li>
                    <li>• Generate sample testing documentation</li>
                    <li>• Industry-specific audit considerations</li>
                  </ul>
                  <div className="mt-3 text-center">
                    <span className="text-xs text-blue-600 font-medium">Try: "Draft audit procedures for cryptocurrency holdings"</span>
                  </div>
                </div>
              </div>

              {/* For Accountants */}
              <div className="professional-card hover-expandable bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 border border-white/50" data-testid="agent-accountants-card">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Calculator className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">For Accountants</h3>
                  <p className="text-gray-600 mt-2">Technical accounting AI assistant</p>
                </div>
                
                <div className="hover-expandable-content mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Professional Capabilities:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Complex journal entry analysis and explanation</li>
                    <li>• Tax code interpretation and compliance guidance</li>
                    <li>• QuickBooks troubleshooting and setup help</li>
                    <li>• Monthly close checklist generation</li>
                    <li>• Client communication templates</li>
                  </ul>
                  <div className="mt-3 text-center">
                    <span className="text-xs text-green-600 font-medium">Try: "Explain ASC 842 lease accounting treatment"</span>
                  </div>
                </div>
              </div>

              {/* For Finance Professionals */}
              <div className="professional-card hover-expandable bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 border border-white/50" data-testid="agent-finance-card">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">For Finance Teams</h3>
                  <p className="text-gray-600 mt-2">Strategic financial analysis assistance</p>
                </div>
                
                <div className="hover-expandable-content mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Advanced Analytics Support:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Financial model validation and error checking</li>
                    <li>• M&A due diligence checklist creation</li>
                    <li>• Cash flow forecasting methodology</li>
                    <li>• KPI dashboard design recommendations</li>
                    <li>• Investment analysis frameworks</li>
                  </ul>
                  <div className="mt-3 text-center">
                    <span className="text-xs text-purple-600 font-medium">Try: "Create DCF model validation checklist"</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <p className="text-gray-700 mb-6">
                <strong>Powered by OpenAI GPT-4 with CPA expertise:</strong> Get professional-grade answers backed by 15+ years of accounting experience and continuous learning from latest tax codes and standards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-8 py-4 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200" 
                  onClick={() => setLocation("/ai-tools")}
                  data-testid="agent-btn"
                >
                  Open SelamTax CPA Agent
                </button>
                <p className="text-sm text-gray-600 self-center">
                  Free to try • Professional insights • Real-time guidance
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
