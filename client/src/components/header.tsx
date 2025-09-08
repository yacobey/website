import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScheduleConsultation = () => {
    trackEvent('schedule_consultation_click', { section: 'header' });
    window.open('https://calendly.com/selamcpa25', '_blank');
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { href: "/bookkeeping", label: "Bookkeeping" },
    { href: "/tax", label: "Tax" },
    { href: "/audit", label: "Audit" },
    { href: "/advisory", label: "Advisory" },
    { href: "/ai-tools", label: "AI Tools" },
    { href: "/ai-resources", label: "AI Resources" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  // Show admin link only when on seo-dashboard page
  const showAdminLink = location === "/seo-dashboard";

  return (
    <header className="bg-white/95 backdrop-blur-lg border-b border-neutral-200/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="flex items-center space-x-3 cursor-pointer group">
                  <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    <span className="text-white font-bold text-lg">S</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-neutral-900 font-['Playfair_Display']">
                      Selam CPA
                    </h1>
                    <p className="text-xs text-neutral-500 font-medium -mt-1">Professional Services</p>
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
                  className="text-neutral-600 hover:text-primary transition-all duration-200 text-sm font-semibold relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-200 group-hover:w-full"></span>
                </a>
              ))}
              {showAdminLink && (
                <Link href="/seo-dashboard">
                  <span className="text-primary hover:text-primary-dark transition-colors text-sm font-semibold cursor-pointer">
                    SEO Admin
                  </span>
                </Link>
              )}
            </div>
          </nav>
          
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              onClick={handleScheduleConsultation}
              size="default"
              className="bg-gradient-primary hover:shadow-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Book Consultation
            </Button>
            <Link href="/payment">
              <Button 
                variant="outline" 
                size="default"
                className="border-2 border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 hover:border-primary hover:text-primary px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
              >
                Pay Online
              </Button>
            </Link>
          </div>
          
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMobileMenuToggle}
              className="text-neutral-600 hover:text-primary hover:bg-neutral-100 p-2 rounded-lg"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-neutral-200 bg-white/95 backdrop-blur-lg">
            <div className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-neutral-700 hover:text-primary transition-colors font-semibold text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col space-y-3 pt-4">
                <Button 
                  onClick={() => {
                    handleScheduleConsultation();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-gradient-primary text-white font-semibold py-3 rounded-xl transition-all duration-300 w-full"
                >
                  Book Consultation
                </Button>
                <Link href="/payment">
                  <Button 
                    variant="outline"
                    className="border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-semibold py-3 rounded-xl transition-all duration-300 w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pay Online
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
