import { Link } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const calendly = import.meta.env.VITE_CALENDLY_URL as string;

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="bg-white/95 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" aria-label="Selam CPA" className="flex-shrink-0">
            <div className="flex items-center cursor-pointer">
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
          {/* Desktop Navigation */}
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
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-lg">
            <nav className="px-4 py-4 space-y-1" aria-label="Mobile navigation">
              <Link 
                href="/tax" 
                className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200"
                data-testid="mobile-link-tax"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tax
              </Link>
              <Link 
                href="/bookkeeping" 
                className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200"
                data-testid="mobile-link-bookkeeping"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Bookkeeping
              </Link>
              <Link 
                href="/advisory" 
                className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200"
                data-testid="mobile-link-advisory"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Advisory
              </Link>
              <Link 
                href="/audit" 
                className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200"
                data-testid="mobile-link-audit"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Audit
              </Link>
              <Link 
                href="/blog" 
                className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200"
                data-testid="mobile-link-blog"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/agent" 
                className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200"
                data-testid="mobile-link-agent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Agent
              </Link>
              <Link 
                href="/testimonials" 
                className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200"
                data-testid="mobile-link-testimonials"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <div className="pt-2 border-t border-gray-200 mt-4">
                <a 
                  href={calendly} 
                  target="_blank" 
                  rel="noopener" 
                  className="block bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-4 py-3 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-center"
                  data-testid="mobile-button-consultation"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Free Consultation
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}