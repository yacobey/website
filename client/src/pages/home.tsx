import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useBusinessConfig } from "@/hooks/use-business-config";
import StructuredData from "@/components/structured-data";
import { ShieldCheck, Calculator, TrendingUp, Heart, Home as HomeIcon, ShoppingBag, Users, Laptop, Wrench, ChevronDown, MessageCircle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export default function Home() {
  const [, setLocation] = useLocation();
  const { data: businessConfig } = useBusinessConfig();

  async function startTaxPrep() {
    const price_id = "price_TAX_PREP_123"; // TODO: replace
    const r = await fetch(`${businessConfig?.api.baseUrl || '/api'}/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ price_id })
    });
    const data = await r.json();
    if (data.url) window.location.href = data.url;
  }

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        type="Organization"
        data={{
          "@type": ["AccountingService", "LocalBusiness"],
          "name": "Selam CPA PLLC",
          "alternateName": "Selam CPA",
          "description": "Professional CPA firm providing tax preparation, bookkeeping, advisory, and audit services for individuals and businesses in MD, VA, DC Metro Area.",
          "slogan": "CPA-Led Tax Strategy & Done-For-You Filing",
          "foundingDate": "2020",
          "url": "https://selamcpa.com",
          "mainEntityOfPage": "https://selamcpa.com",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "CPA Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Tax Preparation & Planning",
                  "description": "Professional tax preparation and strategic tax planning services"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Bookkeeping Services",
                  "description": "Complete bookkeeping solutions for businesses of all sizes"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Business Advisory",
                  "description": "CFO-level strategic insights and business advisory services"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Audit & Assurance",
                  "description": "Independent audit and assurance services following GAAS standards"
                }
              }
            ]
          }
        }}
      />
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center py-16 lg:py-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            CPA-Led Tax Strategy & Done-For-You Filing
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Virtual firm based in Maryland. Proactive planning, precise compliance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a 
              href={businessConfig?.links.calendly} 
              target="_blank" 
              rel="noopener" 
              className="bg-transparent text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-8 py-4 text-lg font-semibold border border-blue-300 rounded-lg transition-all duration-200"
              data-testid="consultation-btn"
            >
              Book Free Consultation
            </a>
            <button 
              onClick={startTaxPrep} 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-8 py-4 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              data-testid="tax-prep-btn"
            >
              Start Tax Prep
            </button>
          </div>
          <p className="text-gray-500 text-lg">
            📞 <a href={`tel:${businessConfig?.phone.e164}`} className="text-blue-600 hover:text-blue-800 transition-colors" data-testid="phone-link-hero">
              {businessConfig?.phone.display}
            </a> — Virtual Receptionist (24/7)
          </p>
        </section>

        <section className="py-16 bg-gray-50 rounded-xl mb-16" aria-labelledby="tax-strategy">
          <div className="max-w-4xl mx-auto px-6">
            <h2 id="tax-strategy" className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Proactive Tax Strategy
            </h2>
            <p className="text-xl text-gray-600 mb-8 text-center max-w-3xl mx-auto">
              We don't just file—we plan. We design a customized, compliant strategy mapped to your entity, income mix, and goals.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">•</span>
                  Entity & compensation optimization
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">•</span>
                  Accountable plan & reimbursements
                </li>
              </ul>
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">•</span>
                  Home rental (280A(g)) considerations
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">•</span>
                  Timing, retirement, and credits planning
                </li>
              </ul>
            </div>
            <div className="text-center">
              <a 
                href={businessConfig?.links.calendly} 
                target="_blank" 
                rel="noopener" 
                className="bg-transparent text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-8 py-3 text-lg font-semibold border border-blue-300 rounded-lg transition-all duration-200 inline-block"
                data-testid="consultation-btn-strategy"
              >
                Book Free Consultation
              </a>
            </div>
          </div>
        </section>

        {/* Services We Provide Section */}
        <section className="py-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl mb-16" aria-labelledby="services">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-block bg-purple-500/30 text-purple-100 px-4 py-2 rounded-full text-sm font-medium mb-4">
                HOW WE BRING VALUE
              </div>
              <h2 id="services" className="text-3xl md:text-4xl font-bold text-white mb-6">
                Services We Provide
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Bookkeeping & Accounting */}
              <div className="service-card bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300" data-testid="bookkeeping-service">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">✓</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  Bookkeeping & Accounting
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  Complete monthly bookkeeping, financial statements, and accounts management. Designed for businesses who want accurate, up-to-date financial records without the complexity.
                </p>
                <div className="text-center">
                  <a 
                    href={businessConfig?.links.calendly} 
                    target="_blank" 
                    rel="noopener"
                    className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                    data-testid="book-call-bookkeeping"
                  >
                    Book a call →
                  </a>
                </div>
              </div>

              {/* Tax Planning & Strategy */}
              <div className="service-card bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300" data-testid="tax-service">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">✓</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  Tax Planning & Strategy
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  Business & personal returns, entity selection, quarterly estimates, and customized tax-planning strategies. Discover hidden deductions, structure your business smarter, and keep more of what you earn.
                </p>
                <div className="text-center">
                  <a 
                    href={businessConfig?.links.calendly} 
                    target="_blank" 
                    rel="noopener"
                    className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                    data-testid="book-call-tax"
                  >
                    Book a call →
                  </a>
                </div>
              </div>

              {/* AI Consultancy & Financial Tools */}
              <div className="service-card bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300" data-testid="ai-service">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">✓</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  AI Consultancy & Financial Tools
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  Get hands-on assistance to integrate Artificial Intelligence into your financial processes. From automating reporting to intelligent data analysis, we work alongside you to implement solutions that actually work.
                </p>
                <div className="text-center">
                  <a 
                    href={businessConfig?.links.calendly} 
                    target="_blank" 
                    rel="noopener"
                    className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                    data-testid="book-call-ai"
                  >
                    Book a call →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Experience Across Industries Section */}
        <section className="py-16 bg-white mb-16" aria-labelledby="industries">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 id="industries" className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Experience Across Industries
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                With a proven track record of achievement, Selam CPA is proud to have worked with clients in 
                a variety of industries. Due to the experience of our team, we are able to provide specialized 
                solutions that are tailored to the particular requirements of each client company.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Healthcare */}
              <div className="industry-card bg-white rounded-lg shadow-md p-6 border border-gray-200 transform hover:scale-105 hover:shadow-lg transition-all duration-300 text-center" data-testid="healthcare-industry">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Healthcare</h3>
                <p className="text-gray-600 text-sm">
                  Specialized accounting for medical practices, clinics, and healthcare providers
                </p>
              </div>

              {/* Real Estate */}
              <div className="industry-card bg-white rounded-lg shadow-md p-6 border border-gray-200 transform hover:scale-105 hover:shadow-lg transition-all duration-300 text-center" data-testid="realestate-industry">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HomeIcon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Real Estate</h3>
                <p className="text-gray-600 text-sm">
                  Expert financial services for real estate professionals and property management
                </p>
              </div>

              {/* Retail & Wholesale */}
              <div className="industry-card bg-white rounded-lg shadow-md p-6 border border-gray-200 transform hover:scale-105 hover:shadow-lg transition-all duration-300 text-center" data-testid="retail-industry">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Retail & Wholesale</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive accounting solutions for retail businesses and wholesale distributors
                </p>
              </div>

              {/* Professional Services */}
              <div className="industry-card bg-white rounded-lg shadow-md p-6 border border-gray-200 transform hover:scale-105 hover:shadow-lg transition-all duration-300 text-center" data-testid="professional-industry">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Services</h3>
                <p className="text-gray-600 text-sm">
                  Tailored financial management for law firms, consultants, and service providers
                </p>
              </div>

              {/* Technology Startups */}
              <div className="industry-card bg-white rounded-lg shadow-md p-6 border border-gray-200 transform hover:scale-105 hover:shadow-lg transition-all duration-300 text-center" data-testid="tech-industry">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Laptop className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Technology Startups</h3>
                <p className="text-gray-600 text-sm">
                  Financial guidance for emerging technology companies and software businesses
                </p>
              </div>

              {/* Construction */}
              <div className="industry-card bg-white rounded-lg shadow-md p-6 border border-gray-200 transform hover:scale-105 hover:shadow-lg transition-all duration-300 text-center" data-testid="construction-industry">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Construction</h3>
                <p className="text-gray-600 text-sm">
                  Specialized accounting for contractors, builders, and construction companies
                </p>
              </div>
            </div>

            {/* Industry-Specific Financial Solutions */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Industry-Specific Financial Solutions
              </h3>
              <p className="text-gray-600 max-w-4xl mx-auto mb-6">
                We assist businesses with specialized accounting solutions across all industries. From construction project cost 
                analysis to healthcare practice management, real estate cash flow optimization to technology startup financial 
                planning, we provide the expertise you need. Our inventory and cash management techniques help retail and 
                wholesale enterprises thrive. Regardless of the sector, Selam CPA is committed to assisting with our clients' economic 
                prosperity.
              </p>
              <p className="text-gray-700">
                If you are ready to work with one of the best CPA firms, 
                <a 
                  href={businessConfig?.links.calendly} 
                  target="_blank" 
                  rel="noopener"
                  className="text-blue-600 hover:text-blue-800 font-medium ml-1"
                  data-testid="contact-team-link"
                >
                  contact our team
                </a> 
                {" "}right now for your consultation.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl mb-16" aria-labelledby="agent">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 id="agent" className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              SelamTax CPA Agent (Beta)
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Ask tax & bookkeeping questions and get step-by-step guidance. Try it free—subscribe to unlock full, actionable answers.
            </p>
            <button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-8 py-4 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200" 
              onClick={() => setLocation("/ai-tools")}
              data-testid="agent-btn"
            >
              Open SelamTax CPA Agent
            </button>
          </div>
        </section>

        {/* Trusted Solutions & Integrations Section */}
        <section className="py-16 bg-gray-50 mb-16" aria-labelledby="integrations">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 id="integrations" className="text-2xl font-bold text-gray-900 mb-8">
              TRUSTED SOLUTIONS & INTEGRATIONS
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              <div className="text-gray-600 font-medium" data-testid="xero-certified">
                Xero Certified
              </div>
              <div className="text-gray-600 font-medium" data-testid="stripe-integration">
                Stripe Integration
              </div>
              <div className="text-gray-600 font-medium" data-testid="gusto-payroll">
                Gusto Payroll
              </div>
              <div className="text-gray-600 font-medium" data-testid="taxwise-certified">
                TaxWise Certified
              </div>
              <div className="text-gray-600 font-medium" data-testid="shopify-partner">
                Shopify Partner
              </div>
              <div className="text-gray-600 font-medium" data-testid="bill-expert">
                Bill.com Expert
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white mb-16" aria-labelledby="faqs">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-blue-600 mr-2" />
                <h2 id="faqs" className="text-3xl md:text-4xl font-bold text-blue-600">
                  Frequently Asked Questions
                </h2>
              </div>
              <p className="text-xl text-gray-600">
                Get instant answers to common questions about our accounting services, AI consultancy, and how we can help your business thrive.
              </p>
            </div>

            <div className="space-y-4">
              {/* FAQ 1 */}
              <Collapsible>
                <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors" data-testid="faq-tools">
                  <span className="font-semibold text-gray-900">Which tools do you support?</span>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 text-gray-600">
                  We work with all major accounting software including QuickBooks Online, Xero, Wave, and FreshBooks. We're also certified in specialized tools like Bill.com for AP automation, Gusto for payroll, and various industry-specific platforms. If you're using something different, we can likely accommodate or help you transition to a better solution.
                </CollapsibleContent>
              </Collapsible>

              {/* FAQ 2 */}
              <Collapsible>
                <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors" data-testid="faq-cleanups">
                  <span className="font-semibold text-gray-900">Do you do clean-ups?</span>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 text-gray-600">
                  Yes! We specialize in cleaning up messy books. Whether you're months behind, have categorization issues, or need multi-year catch-up work, we can get your financials accurate and current. We'll also set up proper systems to prevent future issues.
                </CollapsibleContent>
              </Collapsible>

              {/* FAQ 3 */}
              <Collapsible>
                <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors" data-testid="faq-nonprofits">
                  <span className="font-semibold text-gray-900">Can you work with nonprofits?</span>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 text-gray-600">
                  Absolutely! We have extensive experience with nonprofit accounting, including fund accounting, grant tracking, Form 990 preparation, and compliance requirements. We understand the unique needs of nonprofits and can help with donor management and restricted fund reporting.
                </CollapsibleContent>
              </Collapsible>

              {/* FAQ 4 */}
              <Collapsible>
                <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors" data-testid="faq-get-started">
                  <span className="font-semibold text-gray-900">How do we get started?</span>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 text-gray-600">
                  Simple! Book a free consultation where we'll discuss your needs, current situation, and goals. We'll then provide a custom proposal with transparent pricing. Once you're ready to move forward, we'll handle the setup and transition process for you.
                </CollapsibleContent>
              </Collapsible>

              {/* FAQ 5 */}
              <Collapsible>
                <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors" data-testid="faq-monthly-service">
                  <span className="font-semibold text-gray-900">What's included in your monthly bookkeeping service?</span>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 text-gray-600">
                  Our monthly service includes transaction categorization, bank reconciliation, financial statement preparation (P&L, Balance Sheet, Cash Flow), accounts payable/receivable management, and monthly close procedures. You'll also get a monthly financial review call and access to real-time reports.
                </CollapsibleContent>
              </Collapsible>

              {/* FAQ 6 */}
              <Collapsible>
                <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors" data-testid="faq-payroll-taxes">
                  <span className="font-semibold text-gray-900">Do you handle payroll and taxes?</span>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 text-gray-600">
                  Yes! We handle business and personal tax preparation, quarterly estimated payments, and payroll processing through our Gusto partnership. We also provide tax planning throughout the year to minimize your liability and ensure compliance.
                </CollapsibleContent>
              </Collapsible>

              {/* FAQ 7 */}
              <Collapsible>
                <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors" data-testid="faq-catch-up">
                  <span className="font-semibold text-gray-900">How quickly can you catch up my books?</span>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 text-gray-600">
                  Timeline depends on complexity and how far behind you are. Most clean-up projects take 2-4 weeks for a full year of transactions. We prioritize getting you current quickly so you can make informed business decisions. We'll provide a realistic timeline during our consultation.
                </CollapsibleContent>
              </Collapsible>

              {/* FAQ 8 */}
              <Collapsible>
                <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors" data-testid="faq-ai-consultancy">
                  <span className="font-semibold text-gray-900">What makes your AI consultancy different?</span>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 text-gray-600">
                  We combine deep accounting expertise with practical AI implementation. Rather than just talking about AI, we actually implement solutions that work in real businesses. We focus on automating repetitive tasks, improving accuracy, and providing better financial insights through intelligent data analysis.
                </CollapsibleContent>
              </Collapsible>

              {/* FAQ 9 */}
              <Collapsible>
                <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors" data-testid="faq-remote-work">
                  <span className="font-semibold text-gray-900">Do you work with businesses outside my state?</span>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 text-gray-600">
                  Yes! While we're based in Maryland, we provide remote services to businesses across all 50 states. Our cloud-based approach means we can work with you anywhere in the US. We're experienced with multi-state tax requirements and compliance.
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Still Have Questions */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Still Have Questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Our team is here to help! Get personalized answers and discover how we can streamline your accounting and boost your business growth.
              </p>
              <a 
                href={businessConfig?.links.calendly} 
                target="_blank" 
                rel="noopener"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-8 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center"
                data-testid="faq-contact-btn"
              >
                Contact Our Team
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
