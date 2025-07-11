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
    window.open('https://calendly.com/lenoxcpa', '_blank');
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
  ];

  // Show admin link only when on seo-dashboard page
  const showAdminLink = location === "/seo-dashboard";

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-xl font-semibold text-gray-900 cursor-pointer">
                  Lenox CPA
                </h1>
              </Link>
            </div>
          </div>
          
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                  {item.label}
                </a>
              ))}
              {showAdminLink && (
                <Link href="/seo-dashboard">
                  <span className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium cursor-pointer">
                    SEO Admin
                  </span>
                </Link>
              )}
            </div>
          </nav>
          
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              onClick={handleScheduleConsultation}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Schedule Consultation
            </Button>
            <Link href="/payment">
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Pay Online
              </Button>
            </Link>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMobileMenuToggle}
              className="text-slate-gray hover:text-primary"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-slate-gray hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button 
                onClick={() => {
                  handleScheduleConsultation();
                  setMobileMenuOpen(false);
                }}
                className="bg-primary hover:bg-primary-dark text-white font-semibold transition-colors w-full"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
