import { useBusinessConfig } from "@/hooks/use-business-config";

export default function Footer() {
  const { data: businessConfig } = useBusinessConfig();
  return (
    <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-200">
      <div className="space-y-4 text-center text-gray-600">
        <div className="text-base space-y-2">
          <p className="font-semibold text-gray-900">
            Selam CPA — Your Trusted Virtual Accounting Partner
          </p>
          <p>
            Maryland-based CPA firm providing remote services across all 50 US states. Licensed CPA. Secure payments. Documents handled securely.
          </p>
          <p className="text-sm text-gray-500">
            Specializing in AI-powered accounting solutions, bookkeeping, tax preparation, and financial consultancy for businesses of all sizes.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-base">
          <div className="flex items-center">
            📞 <a href={`tel:${businessConfig?.phone.e164}`} className="text-blue-600 hover:text-blue-800 transition-colors ml-1" data-testid="phone-link">
              {businessConfig?.phone.display}
            </a>
            <span className="ml-2 text-sm text-gray-500">Virtual Receptionist (24/7)</span>
          </div>
          <div className="hidden sm:block text-gray-400">·</div>
          <a href={businessConfig?.links.calendly} target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800 transition-colors font-medium" data-testid="consultation-link">
            📅 Book Free Consultation
          </a>
        </div>

        <div className="flex justify-center space-x-6 text-sm">
          <a href="/privacy-policy" className="text-gray-500 hover:text-gray-700 transition-colors" data-testid="privacy-link">
            Privacy Policy
          </a>
          <span className="text-gray-400">·</span>
          <a href="/blog" className="text-gray-500 hover:text-gray-700 transition-colors" data-testid="blog-link">
            Blog
          </a>
          <span className="text-gray-400">·</span>
          <a href="/ai-tools" className="text-gray-500 hover:text-gray-700 transition-colors" data-testid="tools-link">
            AI Tools
          </a>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Selam CPA. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Empowering businesses with modern accounting solutions and AI-driven financial insights.
          </p>
        </div>
      </div>
    </footer>
  );
}
