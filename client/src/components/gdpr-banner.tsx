import { useState, useEffect } from "react";
import { X, Shield, Cookie, Eye } from "lucide-react";

export default function GDPRBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("gdpr-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("gdpr-consent", JSON.stringify(consent));
    setIsVisible(false);
    
    // Initialize Google Analytics if accepted
    if (consent.analytics && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  const handleAcceptNecessary = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("gdpr-consent", JSON.stringify(consent));
    setIsVisible(false);
  };

  const handleCustomize = () => {
    const consent = {
      ...cookiePreferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("gdpr-consent", JSON.stringify(consent));
    setIsVisible(false);

    // Update analytics consent
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': consent.analytics ? 'granted' : 'denied'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-4">
            <div className="flex items-center mb-3">
              <Shield className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Your Privacy Matters</h3>
            </div>
            <p className="text-gray-600 mb-4">
              We use cookies to enhance your browsing experience, provide personalized content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies in accordance with our{" "}
              <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>
            
            {/* Cookie Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="mr-2"
                    data-testid="cookie-necessary"
                  />
                  <Cookie className="w-4 h-4 text-green-600 mr-2" />
                  <span className="font-medium text-gray-900">Necessary</span>
                </div>
                <p className="text-sm text-gray-600">Essential for website functionality</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={cookiePreferences.analytics}
                    onChange={(e) => setCookiePreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                    className="mr-2"
                    data-testid="cookie-analytics"
                  />
                  <Eye className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="font-medium text-gray-900">Analytics</span>
                </div>
                <p className="text-sm text-gray-600">Help us improve our website</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={cookiePreferences.marketing}
                    onChange={(e) => setCookiePreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                    className="mr-2"
                    data-testid="cookie-marketing"
                  />
                  <Shield className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="font-medium text-gray-900">Marketing</span>
                </div>
                <p className="text-sm text-gray-600">Personalized content and ads</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptAll}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                data-testid="accept-all-cookies"
              >
                Accept All
              </button>
              <button
                onClick={handleAcceptNecessary}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                data-testid="accept-necessary-cookies"
              >
                Necessary Only
              </button>
              <button
                onClick={handleCustomize}
                className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                data-testid="customize-cookies"
              >
                Save Preferences
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600 p-1"
            data-testid="close-gdpr-banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}