import { useEffect, useState } from "react";
import { useBusinessConfig } from "@/hooks/use-business-config";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            SelamTax CPA Agent
          </h1>

          {loading ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8" data-testid="loading-status">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                <span className="text-blue-800">Checking subscription…</span>
              </div>
            </div>
          ) : !pro ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8" data-testid="free-mode-alert">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Free Mode</h3>
                  <p className="text-yellow-700">Brief summaries only. Subscribe for full, actionable answers.</p>
                </div>
                <button 
                  onClick={subscribe} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                  data-testid="subscribe-btn"
                >
                  Subscribe to Agent Pro
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8" data-testid="pro-mode-alert">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Agent Pro</h3>
                  <p className="text-green-700">Full, actionable answers unlocked.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={openBilling} 
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    data-testid="billing-btn"
                  >
                    Manage Subscription
                  </button>
                  <button 
                    onClick={logoutPro} 
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    data-testid="logout-btn"
                  >
                    Sign out
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
  );
}