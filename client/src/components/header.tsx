import { Link } from "wouter";

const calendly = import.meta.env.VITE_CALENDLY_URL as string;

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" aria-label="Selam CPA" className="flex-shrink-0">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-8 h-8 bg-neutral-900 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-neutral-900">
                  Selam CPA
                </h1>
              </div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-8" aria-label="Primary">
            <Link href="/tax" data-testid="link-tax" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Tax
            </Link>
            <Link href="/bookkeeping" data-testid="link-bookkeeping" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Bookkeeping
            </Link>
            <Link href="/advisory" data-testid="link-advisory" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Advisory
            </Link>
            <Link href="/audit" data-testid="link-audit" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Audit
            </Link>
            <Link href="/blog" data-testid="link-blog" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Blog
            </Link>
            <Link href="/ai-tools" data-testid="link-agent" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Agent
            </Link>
            <a 
              href={calendly} 
              target="_blank" 
              rel="noopener" 
              data-testid="button-consultation"
              className="bg-transparent text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 text-sm font-medium border border-gray-300 rounded-md transition-colors"
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