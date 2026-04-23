import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const CALENDLY = "https://calendly.com/yber2001/30min";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "Calculators", href: "/calculators" },
  { label: "AI for Firms", href: "/ai-consulting" },
  { label: "Tools", href: "/tools" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="bg-[#0a0f1e]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex justify-between items-center h-16">
          <Link href="/" aria-label="Selam CPA" className="flex-shrink-0">
            <div className="cursor-pointer">
              <div className="text-lg font-bold text-white tracking-tight leading-none">
                Selam CPA
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-testid={`link-${link.label.toLowerCase()}`}
                className="px-3 py-2 text-sm font-medium rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="ml-4 flex items-center gap-3">
              <a
                href="tel:+13016408549"
                className="hidden xl:flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                (301) 640-8549
              </a>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-consultation"
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-2 text-sm font-semibold rounded-lg transition-colors"
              >
                Book a Call
              </a>
            </div>
          </nav>

          <button
            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#0a0f1e] pb-4">
            <nav className="pt-2 space-y-0.5" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2.5 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                  data-testid={`mobile-link-${link.label.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 px-4 space-y-2 border-t border-white/10 mt-2">
                <a
                  href="tel:+13016408549"
                  className="flex items-center justify-center gap-2 text-sm text-slate-400 font-medium py-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Phone className="w-4 h-4" />
                  (301) 640-8549
                </a>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors text-center"
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
