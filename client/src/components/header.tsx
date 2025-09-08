import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const handleGetInTouch = () => {
    trackEvent('get_in_touch_click', { section: 'header' });
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic button styling based on scroll position
  // Assuming services section (purple background) starts around 600px
  const isOnPurpleSection = scrollY > 600 && scrollY < 1200;
  const buttonVariant = isOnPurpleSection ? "secondary" : "ghost";
  const buttonClasses = isOnPurpleSection 
    ? "bg-white text-purple-primary hover:bg-neutral-100 font-medium flex items-center gap-2 group border border-white/20"
    : "text-neutral-900 hover:text-neutral-600 font-medium flex items-center gap-2 group";

  const navItems = [
    { href: "/bookkeeping", label: "Bookkeeping" },
    { href: "/tax", label: "Tax" },
    { href: "/audit", label: "Audit" },
    { href: "/advisory", label: "Advisory" },
    { href: "/ai-tools", label: "AI Consultancy" },
    { href: "/blog", label: "Blog" },
  ];

  // Show admin link only when on seo-dashboard page
  const showAdminLink = location === "/seo-dashboard";

  return (
    <header className="bg-white/95 backdrop-blur-lg border-b border-neutral-200/50 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
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
            </div>
          </div>
          
          <nav className="hidden lg:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm font-medium"
                >
                  {item.label}
                </a>
              ))}
              {showAdminLink && (
                <Link href="/seo-dashboard">
                  <span className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm font-medium cursor-pointer">
                    SEO Admin
                  </span>
                </Link>
              )}
            </div>
          </nav>
          
          <div className="hidden lg:flex items-center">
            <Button 
              onClick={handleGetInTouch}
              variant={buttonVariant}
              className={`${buttonClasses} transition-all duration-300`}
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMobileMenuToggle}
              className="text-neutral-600 hover:text-neutral-900 p-2"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-neutral-200 bg-white/95 backdrop-blur-lg">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-neutral-700 hover:text-neutral-900 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4">
                <Button 
                  onClick={() => {
                    handleGetInTouch();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-neutral-900 text-white hover:bg-neutral-800 font-medium py-2 px-4 rounded w-full"
                >
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}