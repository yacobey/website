import { Link } from "wouter";

const calendly = import.meta.env.VITE_CALENDLY_URL as string;

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" aria-label="Selam CPA" className="flex-shrink-0">
            <div className="flex items-center space-x-4 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Selam CPA
                </h1>
                <p className="text-sm font-medium text-blue-600 -mt-1">
                  Professional Accounting Services
                </p>
              </div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-1" aria-label="Primary">
            <Link href="/tax" data-testid="link-tax" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200">
              Tax
            </Link>
            <Link href="/bookkeeping" data-testid="link-bookkeeping" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200">
              Bookkeeping
            </Link>
            <Link href="/advisory" data-testid="link-advisory" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200">
              Advisory
            </Link>
            <Link href="/audit" data-testid="link-audit" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200">
              Audit
            </Link>
            <Link href="/blog" data-testid="link-blog" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200">
              Blog
            </Link>
            <Link href="/agent" data-testid="link-agent" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200">
              Agent
            </Link>
            <a 
              href={calendly} 
              target="_blank" 
              rel="noopener" 
              data-testid="button-consultation"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-6 py-3 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ml-4"
            >
              Free Consultation
            </a>
            {/* Example one-time checkout button lives on service pages */}
          </nav>
        </div>
      </div>
    </header>
  );
}