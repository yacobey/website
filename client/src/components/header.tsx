import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScheduleConsultation = () => {
    trackEvent('click', 'schedule_consultation', 'header');
    // In a real app, this would open a scheduling modal or redirect to scheduling page
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { href: "/#services", label: "Services" },
    { href: "/ai-tools", label: "AI Tools" },
    { href: "/digital-guides", label: "Digital Guides" },
    { href: "/partners", label: "Partners" },
    { href: "/blog", label: "Blog" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-primary cursor-pointer">
                  ProBalance CPA
                </h1>
              </Link>
            </div>
          </div>
          
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-slate-gray hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/payment">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Pay Online
              </Button>
            </Link>
            <Button 
              onClick={handleScheduleConsultation}
              variant="outline"
              className="px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Schedule Consultation
            </Button>
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
