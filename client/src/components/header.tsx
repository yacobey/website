import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const CALENDLY = "https://calendly.com/yber2001/30min";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#industries", label: "Specialties" },
  { href: "/#about", label: "About" },
  { href: "/#faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" aria-label="Selam CPA" className="flex-shrink-0">
            <div className="cursor-pointer">
              <div className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                Selam CPA
              </div>
              <div className="hidden sm:block text-[10px] font-medium text-slate-400 tracking-wide mt-0.5">
                Yacob Tewelde, CPA, FCCA &middot; Fractional Controller &amp; Advisory
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-testid={`link-${link.label.toLowerCase()}`}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location === link.href
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="ml-3 flex items-center gap-2">
              <a
                href="tel:+12404732623"
                className="text-sm text-slate-500 hover:text-slate-700 transition-colors hidden xl:flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                (240) 473-2623
              </a>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-consultation"
                className="bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 text-sm font-semibold rounded-lg transition-colors"
              >
                Book a Call
              </a>
            </div>
          </nav>

          <button
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white pb-4">
            <nav className="pt-2 space-y-0.5" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2.5 text-sm font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                  data-testid={`mobile-link-${link.label.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 px-4 space-y-2 border-t border-slate-100 mt-2">
                <a
                  href="tel:+12404732623"
                  className="flex items-center justify-center gap-2 text-sm text-slate-600 font-medium py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Phone className="w-4 h-4" />
                  (240) 473-2623
                </a>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-slate-900 text-white hover:bg-slate-800 px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors text-center"
                  data-testid="mobile-button-consultation"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book a Discovery Call
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
