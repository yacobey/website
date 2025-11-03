import { useEffect, useState } from "react";
import { useBusinessConfig } from "@/hooks/use-business-config";
import Header from "@/components/header";
import Footer from "@/components/footer";
import DynamicSEO from "@/components/dynamic-seo";
import { Calculator, FileText, Users, TrendingUp, Shield, CheckCircle, Lightbulb } from "lucide-react";

export default function Agent() {
  const [pro, setPro] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: businessConfig } = useBusinessConfig();

  async function fetchStatus() {
    setLoading(true);
    try {
      const r = await fetch(`${businessConfig?.api.baseUrl || '/api'}/agent/status`, { 
        credentials: "include" 
      });
      const data = await r.json();
      setPro(!!data.pro);
    } catch (error) {
      console.error('Failed to fetch agent status:', error);
    }
    setLoading(false);
  }

  useEffect(() => { 
    if (businessConfig?.api.baseUrl) {
      fetchStatus(); 
    }
  }, [businessConfig]);

  async function subscribe() {
    try {
      const r = await fetch(`${businessConfig?.api.baseUrl || '/api'}/subscribe-agent`, { 
        method: "POST", 
        credentials: "include" 
      });
      const data = await r.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error('Failed to subscribe:', error);
    }
  }

  async function openBilling() { 
    window.location.href = `${businessConfig?.api.baseUrl || '/api'}/agent/billing`; 
  }

  async function logoutPro() {
    try {
      await fetch(`${businessConfig?.api.baseUrl || '/api'}/agent/logout`, { 
        method: "POST", 
        credentials: "include" 
      });
      fetchStatus();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }

  return (
    <>
      <DynamicSEO page="agent" />
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Selam CPA Agent
            </h1>
            <p className="text-2xl text-gray-700 mb-4">
              Your AI-Powered Financial Expert
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get instant, expert answers to accounting, tax, personal financial planning, and any finance-related questions. 
              Lifetime access for just <span className="font-bold text-blue-600">$29.99</span> one-time payment.
            </p>
          </div>

          {/* Who It Helps Section */}
          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Who Benefits from Our Agent?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <Users className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Business Owners & Entrepreneurs</h3>
                <p className="text-gray-600">
                  Small business owners seeking guidance on bookkeeping, tax planning, and financial strategy.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <TrendingUp className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Finance Professionals</h3>
                <p className="text-gray-600">
                  CFOs, Controllers, and Accountants looking for quick references, best practices, and technical guidance.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <Shield className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Auditors & Compliance Teams</h3>
                <p className="text-gray-600">
                  External auditors (from partners to interns) needing assistance with procedures, risk assessments, and audit planning.
                </p>
              </div>
            </div>
          </div>

          {/* What It Provides Section */}
          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Our Agent Provides</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Guidance</h3>
                    <p className="text-gray-600">Detailed answers to accounting, tax, and financial planning questions</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Audit Procedures</h3>
                    <p className="text-gray-600">Step-by-step audit procedures, testing strategies, and documentation templates</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Risk Assessment Templates</h3>
                    <p className="text-gray-600">Comprehensive risk assessment frameworks and audit planning strategies</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Financial Analysis</h3>
                    <p className="text-gray-600">Cash flow analysis, budgeting guidance, and financial modeling assistance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Example Questions Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Example Questions You Can Ask</h2>
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Lightbulb className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">"What are the tax implications of forming an LLC vs. S-Corp for my business?"</p>
                </div>
                <div className="flex items-start">
                  <Lightbulb className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">"Can you provide a risk assessment template for a manufacturing company audit?"</p>
                </div>
                <div className="flex items-start">
                  <Lightbulb className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">"How do I properly account for inventory using FIFO method?"</p>
                </div>
                <div className="flex items-start">
                  <Lightbulb className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">"What audit procedures should I perform for accounts receivable confirmation?"</p>
                </div>
                <div className="flex items-start">
                  <Lightbulb className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">"Help me create a cash flow forecast for the next 6 months"</p>
                </div>
                <div className="flex items-start">
                  <Lightbulb className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">"What documentation do I need for an IRS audit?"</p>
                </div>
                <div className="flex items-start">
                  <Lightbulb className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">"Provide me an audit strategy for testing revenue recognition compliance"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Access Status */}
          <div className="max-w-4xl mx-auto">

          {loading ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8" data-testid="loading-status">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                <span className="text-blue-800">Checking access status…</span>
              </div>
            </div>
          ) : !pro ? (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-lg p-8 mb-8" data-testid="free-mode-alert">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">🔒 Limited Access Mode</h3>
                <p className="text-gray-700 text-lg mb-4">
                  You're currently in free mode with limited responses. Unlock full access to detailed, actionable answers.
                </p>
                <div className="bg-white rounded-lg p-6 mb-6 inline-block shadow-md">
                  <div className="text-4xl font-bold text-blue-600 mb-2">$29.99</div>
                  <div className="text-gray-600 font-medium">One-Time Payment</div>
                  <div className="text-sm text-gray-500 mt-1">Lifetime Full Access • No Recurring Fees</div>
                </div>
              </div>
              <div className="flex justify-center">
                <button 
                  onClick={subscribe} 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  data-testid="subscribe-btn"
                >
                  Unlock Lifetime Access - $29.99
                </button>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  ✓ Unlimited Questions • ✓ Full Detailed Answers • ✓ Templates & Procedures • ✓ Lifetime Updates
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-6 mb-8" data-testid="pro-mode-alert">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-2xl font-bold text-green-800 mb-2">✅ Full Access Activated</h3>
                  <p className="text-green-700 text-lg">Lifetime access unlocked. Ask anything!</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={logoutPro} 
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    data-testid="logout-btn"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <p className="text-gray-600 text-center">
              If the agent doesn't load,{" "}
              <a 
                href={businessConfig?.links.agentPublic} 
                target="_blank" 
                rel="noopener" 
                className="text-blue-600 hover:text-blue-800 underline"
                data-testid="external-agent-link"
              >
                open it in a new tab
              </a>
              .
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
            <iframe 
              className="w-full h-[600px] border-0" 
              src={businessConfig?.links.agentPublic} 
              title="SelamTax CPA Agent"
              data-testid="agent-iframe"
            />
          </div>

          <section className="mt-12 bg-gray-50 rounded-lg p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy Notice</h3>
              <p className="text-gray-600 text-sm">
                <strong>Important:</strong> Don't upload sensitive documents here. Use our secure upload link after checkout for confidential materials.
              </p>
            </div>
          </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}