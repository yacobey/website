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
            <div className="flex items-center space-x-3">
              {navItems.map((item, index) => {
                const colors = [
                  "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200",
                  "bg-green-100 text-green-700 hover:bg-green-200 border-green-200", 
                  "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200",
                  "bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200",
                  "bg-pink-100 text-pink-700 hover:bg-pink-200 border-pink-200",
                  "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200"
                ];
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`${colors[index]} px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-medium hover:scale-105 hover:shadow-md`}
                  >
                    {item.label}
                  </a>
                );
              })}
              {showAdminLink && (
                <Link href="/seo-dashboard">
                  <span className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200 px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-medium hover:scale-105 hover:shadow-md cursor-pointer">
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
            <div className="flex flex-col space-y-3">
              {navItems.map((item, index) => {
                const colors = [
                  "bg-blue-100 text-blue-700 hover:bg-blue-200",
                  "bg-green-100 text-green-700 hover:bg-green-200", 
                  "bg-purple-100 text-purple-700 hover:bg-purple-200",
                  "bg-orange-100 text-orange-700 hover:bg-orange-200",
                  "bg-pink-100 text-pink-700 hover:bg-pink-200",
                  "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                ];
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`${colors[index]} px-4 py-3 rounded-lg transition-colors font-medium text-center`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                );
              })}
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