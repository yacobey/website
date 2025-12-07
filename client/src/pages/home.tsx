import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useBusinessConfig } from "@/hooks/use-business-config";
import StructuredData from "@/components/structured-data";
import { 
  ShieldCheck, 
  Calculator, 
  TrendingUp, 
  Building2, 
  Users, 
  Heart, 
  Briefcase,
  FileCheck,
  BarChart3,
  Sparkles,
  Lock,
  DollarSign,
  Upload,
  Headphones,
  Calendar,
  Star,
  Quote,
  ArrowRight,
  CheckCircle,
  MapPin,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Chatbot from "@/components/cpa-chatbot";
import heroImage from "@assets/generated_images/sophisticated_professional_workspace_scene.png";

export default function Home() {
  const { data: businessConfig } = useBusinessConfig();
  const calendlyUrl = businessConfig?.links.calendly || 'https://calendly.com/yber2001/30min';

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        type="Organization"
        data={{
          "@type": ["AccountingService", "LocalBusiness"],
          "name": "Selam CPA PLLC",
          "alternateName": "Selam CPA",
          "description": "Virtual CPA firm providing AI-powered tax preparation, bookkeeping, advisory, and audit services. Maryland-based, serving all 50 US states.",
          "slogan": "Your Financial Success Partner",
          "foundingDate": "2020",
          "url": "https://selamcpa.com",
          "areaServed": "United States",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "CPA Services",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tax Preparation & Planning" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bookkeeping & Accounting" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Audit & Assurance" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Advisory" } }
            ]
          }
        }}
      />
      <Header />
      
      <main>
        {/* Hero Section - Two Column Layout */}
        <section className="relative hero-gradient hero-pattern text-white overflow-hidden min-h-[90vh] flex items-center">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Left Column - Content */}
              <div className="animate-fade-up">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-white/90 text-sm font-medium">AI-Powered Virtual CPA Firm</span>
                </div>
                
                <h1 className="heading-display text-white mb-6">
                  Proactive Tax Savings,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Powered by AI
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed mb-8 max-w-xl">
                  AI-driven tax strategies and year-round support for businesses and professionals. 
                  100% virtual. Serving all 50 states from Maryland.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <a 
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-lg group"
                    data-testid="hero-cta-primary"
                  >
                    Book a Tax Strategy Call
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  
                  <Link 
                    href="/tax"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-200"
                    data-testid="hero-cta-secondary"
                  >
                    See Pricing & Services
                  </Link>
                </div>
                
                {/* Trust Bar */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>Maryland-Licensed CPA</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-white/30"></div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Secure Online Portal</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-white/30"></div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>20+ Years Experience</span>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Professional Image */}
              <div className="hidden lg:block animate-fade-up-delay">
                <div className="relative">
                  {/* Professional image with subtle frame */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="Professional financial analytics and accounting services" 
                      className="w-full h-auto object-cover"
                    />
                    {/* Subtle overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                  </div>
                  
                  {/* Floating stats card */}
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-5 border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-slate-900">$15K+</div>
                        <div className="text-sm text-slate-500">Avg. Client Savings</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating trust badge */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl px-4 py-3 border border-slate-100">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-semibold text-slate-700">500+ Clients Trust Us</span>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          
          {/* Decorative bottom wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <path d="M0 100V60C240 20 480 0 720 0C960 0 1200 20 1440 60V100H0Z" fill="hsl(210 40% 98%)" />
            </svg>
          </div>
        </section>

        {/* Who We Serve Section */}
        <section className="py-20 bg-slate-50" aria-labelledby="who-we-serve">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="who-we-serve" className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Who We Serve
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Specialized expertise for your unique financial situation
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Small Businesses */}
              <Card className="group bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-md" data-testid="card-small-business">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                    <Building2 className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Small Businesses</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    S-Corps, LLCs, and growing companies needing strategic tax planning and clean financials
                  </p>
                </CardContent>
              </Card>
              
              {/* Self-Employed / 1099 */}
              <Card className="group bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-md" data-testid="card-self-employed">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors">
                    <Briefcase className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Self-Employed & 1099</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Freelancers, contractors, and gig workers maximizing deductions and staying compliant
                  </p>
                </CardContent>
              </Card>
              
              {/* Nonprofits */}
              <Card className="group bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-md" data-testid="card-nonprofit">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 transition-colors">
                    <Heart className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Nonprofits</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    501(c)(3) organizations needing compliance, Form 990, and financial transparency
                  </p>
                </CardContent>
              </Card>
              
              {/* High-Earning Professionals */}
              <Card className="group bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-md" data-testid="card-high-earners">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-600 transition-colors">
                    <Users className="w-8 h-8 text-amber-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">High-Earning Professionals</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Doctors, lawyers, and executives seeking advanced tax strategies and wealth planning
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Services Section */}
        <section className="py-20 bg-white" aria-labelledby="core-services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="core-services" className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Core Services
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Comprehensive financial solutions tailored to your needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Tax */}
              <div className="group text-center" data-testid="service-tax">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Calculator className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Tax Preparation & Planning</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Strategic tax planning, preparation, and filing for individuals and businesses. Maximize deductions, minimize liability.
                </p>
                <Link href="/tax" className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center gap-1">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              {/* Bookkeeping */}
              <div className="group text-center" data-testid="service-bookkeeping">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <FileCheck className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Bookkeeping & Accounting</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Monthly bookkeeping, financial statements, and accounts management. Clean books, clear insights.
                </p>
                <Link href="/bookkeeping" className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center gap-1">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              {/* Audit & Assurance */}
              <div className="group text-center" data-testid="service-audit">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Audit & Assurance</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Independent audits, reviews, and compilations. Build stakeholder confidence with reliable financials.
                </p>
                <Link href="/audit" className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center gap-1">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              {/* Advisory */}
              <div className="group text-center" data-testid="service-advisory">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Advisory & Consulting</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  CFO-level insights, business strategy, and financial planning. Make decisions with confidence.
                </p>
                <Link href="/advisory" className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center gap-1">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Selam CPA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-900 to-slate-900 text-white" aria-labelledby="why-us">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 id="why-us" className="text-3xl lg:text-4xl font-bold mb-6">
                  Why Choose Selam CPA?
                </h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  We're not just accountants—we're your strategic financial partners, 
                  combining modern technology with proven expertise.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4" data-testid="benefit-proactive">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Proactive Tax Planning</h3>
                      <p className="text-slate-300 text-sm">
                        We don't just file—we strategize year-round to minimize your tax burden and maximize savings.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4" data-testid="benefit-ai">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">AI-Powered Analysis</h3>
                      <p className="text-slate-300 text-sm">
                        Cutting-edge AI tools help identify opportunities and automate routine tasks for faster, smarter insights.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4" data-testid="benefit-secure">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Lock className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Secure Virtual Workflows</h3>
                      <p className="text-slate-300 text-sm">
                        Bank-level encryption and secure document portals. Work with us from anywhere, anytime.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4" data-testid="benefit-pricing">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Transparent Fixed Pricing</h3>
                      <p className="text-slate-300 text-sm">
                        Clear, upfront pricing with no surprises. Know exactly what you're paying before we start.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-400 mb-2">$10K+</div>
                  <p className="text-slate-300 mb-6">Average client tax savings per year</p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <div className="text-3xl font-bold text-white">500+</div>
                      <p className="text-slate-400 text-sm">Happy Clients</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">50</div>
                      <p className="text-slate-400 text-sm">States Served</p>
                    </div>
                  </div>
                  
                  <a 
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 w-full"
                    data-testid="why-us-cta"
                  >
                    Start Saving Today
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-slate-50" aria-labelledby="testimonials">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="testimonials" className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Trusted by businesses and professionals across the country
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <Card className="bg-white border-0 shadow-md" data-testid="testimonial-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-200 mb-4" />
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    "Selam CPA transformed our tax strategy. We saved over $15,000 in our first year working with them. 
                    Their proactive approach and AI tools are game-changers."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">JD</span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">James D.</div>
                      <div className="text-sm text-slate-500">Tech Startup Founder</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Testimonial 2 */}
              <Card className="bg-white border-0 shadow-md" data-testid="testimonial-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-200 mb-4" />
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    "As a nonprofit, we needed someone who understood our unique requirements. 
                    Selam CPA made our Form 990 process seamless and keeps us compliant."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">MR</span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Maria R.</div>
                      <div className="text-sm text-slate-500">Nonprofit Executive Director</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Testimonial 3 */}
              <Card className="bg-white border-0 shadow-md" data-testid="testimonial-3">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-200 mb-4" />
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    "I'm a freelancer working across multiple states. Selam CPA handles all my complex 
                    tax situations and I don't have to worry about compliance anymore."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">SK</span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Sarah K.</div>
                      <div className="text-sm text-slate-500">Independent Consultant</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-10">
              <Link href="/testimonials" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-2">
                Read more client stories <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 3-Step Process Section */}
        <section className="py-20 bg-white" aria-labelledby="process">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="process" className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Getting Started is Easy
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Three simple steps to financial peace of mind
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"></div>
              
              {/* Step 1 */}
              <div className="text-center relative" data-testid="step-1">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10">
                  <Calendar className="w-14 h-14 text-white" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                  Step 1
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Book Your Call</h3>
                <p className="text-slate-600 leading-relaxed">
                  Schedule a free strategy call. We'll discuss your situation, goals, and how we can help.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="text-center relative" data-testid="step-2">
                <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10">
                  <Upload className="w-14 h-14 text-white" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                  Step 2
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Upload Docs Securely</h3>
                <p className="text-slate-600 leading-relaxed">
                  Use our encrypted portal to share documents safely. No email attachments needed.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="text-center relative" data-testid="step-3">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10">
                  <Headphones className="w-14 h-14 text-white" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                  Step 3
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Get Ongoing Support</h3>
                <p className="text-slate-600 leading-relaxed">
                  Receive year-round guidance, proactive tax planning, and responsive support when you need it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700" aria-labelledby="final-cta">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="final-cta" className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Don't wait until tax season. Start planning now and maximize your savings with expert guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-lg text-lg transition-all duration-200 shadow-lg"
                data-testid="final-cta-button"
              >
                Book a Tax Strategy Call
                <ArrowRight className="w-5 h-5" />
              </a>
              
              <a 
                href={`tel:${businessConfig?.phone.e164}`}
                className="text-white hover:text-blue-100 font-medium transition-colors"
                data-testid="final-cta-phone"
              >
                or call {businessConfig?.phone.display}
              </a>
            </div>
            
            <p className="text-blue-200 text-sm mt-6">
              <CheckCircle className="w-4 h-4 inline mr-1" />
              Free consultation • No obligation • Serving all 50 states
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
