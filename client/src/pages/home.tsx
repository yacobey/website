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
  Heart, 
  FileCheck,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Star,
  Quote,
  Stethoscope,
  Upload,
  Headphones,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Chatbot from "@/components/cpa-chatbot";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-semibold tracking-tight text-slate-900">{value}</div>
      <div className="mt-0.5 text-sm text-slate-500">{label}</div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
      <span className="text-sm text-slate-600 leading-relaxed">{children}</span>
    </div>
  );
}

export default function Home() {
  const { data: businessConfig } = useBusinessConfig();
  const calendlyUrl = businessConfig?.links.calendly || 'https://calendly.com/yber2001/30min';

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do you work with clients virtually?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Selam CPA is 100% virtual and serves clients in all 50 states from Maryland using secure portals and modern workflows."
        }
      },
      {
        "@type": "Question",
        "name": "What type of clients do you specialize in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We specialize in Professional Service Firms, Nonprofits & Associations, and Medical & Dental Practices—providing audit-level expertise and Fractional CFO-level support."
        }
      },
      {
        "@type": "Question",
        "name": "What does Fractional CFO-level support include?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Financial clarity and monthly reporting, cash flow and profitability insights, scalable advisory guidance, and a long-term, high-trust financial partnership."
        }
      }
    ]
  };

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden" data-testid="hero-section">
          <div className="absolute inset-0 -z-10">
            <div className="h-full w-full bg-gradient-to-b from-slate-50 to-white" />
            <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-slate-200/40 blur-3xl" />
            <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-slate-200/35 blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200" data-testid="badge-cpa">
                    Maryland-Licensed CPA
                  </span>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200" data-testid="badge-portal">
                    Secure Online Portal
                  </span>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200" data-testid="badge-experience">
                    20+ Years Experience
                  </span>
                </div>

                <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl" data-testid="hero-heading">
                  Savings, Powered by AI
                </h1>

                <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                  AI-driven tax strategies and year-round support for businesses and professionals. 100% virtual. Serving all 50 states from Maryland.
                </p>

                <p className="mt-4 text-slate-600 leading-relaxed">
                  At Selam CPA, we combine audit-level expertise with modern advisory systems and automation to help clients move beyond compliance into strategic financial decision-making.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a 
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                    data-testid="hero-cta-primary"
                  >
                    Book a Tax Strategy Call
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link 
                    href="/tax"
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 transition-all hover:bg-slate-50"
                    data-testid="hero-cta-secondary"
                  >
                    See Pricing & Services
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4" data-testid="hero-stats">
                  <Stat label="Avg. Client Savings" value="$15K+" />
                  <Stat label="Clients Trust Us" value="500+" />
                  <Stat label="States Served" value="50" />
                </div>

                <p className="mt-4 text-xs text-slate-400">
                  *Savings vary by client circumstances and compliance requirements.
                </p>
              </div>

              <Card className="bg-white/80 border border-slate-200 shadow-sm" data-testid="hero-card">
                <CardContent className="p-6">
                  <div className="text-sm font-semibold text-slate-900">
                    Professional financial analytics and accounting services
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    Built for clarity, speed, and confidence—with secure workflows and modern tools.
                  </p>

                  <div className="mt-5 grid gap-3">
                    <Bullet>Proactive tax planning (not just filing)</Bullet>
                    <Bullet>Fractional CFO-style reporting and insights</Bullet>
                    <Bullet>Audit-ready documentation and process discipline</Bullet>
                    <Bullet>Secure virtual workflows and fast communication</Bullet>
                  </div>

                  <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-xs font-semibold text-slate-700">Quick start</div>
                    <div className="mt-2 text-sm text-slate-600">
                      Book a call → Upload docs securely → Get year-round support.
                    </div>
                    <div className="mt-3 text-xs text-slate-500">
                      Prefer phone? Call{" "}
                      <a className="text-slate-700 no-underline hover:underline" href="tel:+12404732623">
                        (240) 473-2623
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Specialties */}
        <section className="py-14" aria-labelledby="who-we-serve" data-testid="specialties-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 id="who-we-serve" className="text-2xl font-semibold tracking-tight text-slate-900">Who We Serve</h2>
              <p className="mt-2 text-slate-600">
                We specialize in serving clients who need high-trust financial partnership and strategic clarity.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow" data-testid="card-professional-services">
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    <Building2 className="w-5 h-5 text-slate-600" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">Professional Service Firms</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Advisory-driven support for firms that need clean reporting, smart tax strategy, and scalable systems.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow" data-testid="card-nonprofits">
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    <Heart className="w-5 h-5 text-slate-600" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">Nonprofits & Associations</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Compliance + transparency with strong reporting, governance-ready financials, and sustainable operations.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow" data-testid="card-medical">
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    <Stethoscope className="w-5 h-5 text-slate-600" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">Medical & Dental Practices</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Profitability and cash-flow insights, entity/tax strategy, and reporting that supports better decisions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Services */}
        <section className="py-14 bg-slate-50" aria-labelledby="core-services" data-testid="services-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 id="core-services" className="text-2xl font-semibold tracking-tight text-slate-900">Core Services</h2>
              <p className="mt-2 text-slate-600">
                Comprehensive financial solutions designed to be clear, secure, and decision-useful.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow" data-testid="service-tax">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calculator className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">Tax Preparation & Planning</h3>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                        Strategic tax planning, preparation, and filing for individuals and businesses. Maximize deductions, minimize liability.
                      </p>
                      <Link href="/tax" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow" data-testid="service-bookkeeping">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">Bookkeeping & Accounting</h3>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                        Monthly bookkeeping, financial statements, and accounts management. Clean books, clear insights.
                      </p>
                      <Link href="/bookkeeping" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow" data-testid="service-audit">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">Audit & Assurance</h3>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                        Independent audits, reviews, and compilations. Build stakeholder confidence with reliable financials.
                      </p>
                      <Link href="/audit" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow" data-testid="service-advisory">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">Advisory & Consulting</h3>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                        CFO-level insights, business strategy, and financial planning. Make decisions with confidence.
                      </p>
                      <Link href="/advisory" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Selam CPA */}
        <section className="py-14" aria-labelledby="why-us" data-testid="why-us-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 id="why-us" className="text-2xl font-semibold tracking-tight text-slate-900">
                Why Choose Selam CPA?
              </h2>
              <p className="mt-2 text-slate-600">
                We're not just accountants—we're your strategic financial partners, combining modern technology with proven expertise.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm" data-testid="benefit-proactive">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5 text-slate-600" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">Proactive Tax Planning</h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                  We strategize year-round to minimize your tax burden and maximize savings.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm" data-testid="benefit-advisory">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-3">
                  <BarChart3 className="w-5 h-5 text-slate-600" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">Fractional CFO Support</h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                  Monthly reporting, cash flow insights, and scalable advisory guidance.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm" data-testid="benefit-audit">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5 text-slate-600" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">Audit-Ready Processes</h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                  Documentation discipline and reliable financials that build stakeholder confidence.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm" data-testid="benefit-secure">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-3">
                  <CheckCircle className="w-5 h-5 text-slate-600" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">Secure & Virtual</h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                  100% virtual workflows with encrypted portals. Work with us from anywhere.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-14 bg-slate-50" aria-labelledby="testimonials" data-testid="testimonials-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 id="testimonials" className="text-2xl font-semibold tracking-tight text-slate-900">
                What Our Clients Say
              </h2>
              <p className="mt-2 text-slate-600">
                Trusted by businesses and professionals across the country.
              </p>
            </div>
            
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Card className="border border-slate-200 bg-white shadow-sm" data-testid="testimonial-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    "Selam CPA transformed our tax strategy. We saved over $15,000 in our first year. Their proactive approach is a game-changer."
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-xs font-semibold text-slate-600">JD</div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">James D.</div>
                      <div className="text-xs text-slate-500">Tech Startup Founder</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-slate-200 bg-white shadow-sm" data-testid="testimonial-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    "As a nonprofit, we needed someone who understood our unique requirements. Selam made our Form 990 process seamless."
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-xs font-semibold text-slate-600">MR</div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">Maria R.</div>
                      <div className="text-xs text-slate-500">Nonprofit Executive Director</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-slate-200 bg-white shadow-sm" data-testid="testimonial-3">
                <CardContent className="p-6">
                  <div className="flex items-center gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    "The virtual workflow is incredibly efficient. Secure document sharing, fast turnaround, and year-round availability."
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-xs font-semibold text-slate-600">SK</div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">Sarah K.</div>
                      <div className="text-xs text-slate-500">Medical Practice Owner</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Link href="/testimonials" className="text-sm font-medium text-slate-700 hover:text-slate-900 inline-flex items-center gap-1 transition-colors">
                Read more client stories <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-14" aria-labelledby="process" data-testid="process-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 id="process" className="text-2xl font-semibold tracking-tight text-slate-900">
                Getting Started
              </h2>
              <p className="mt-2 text-slate-600">
                Three simple steps to financial clarity and year-round support.
              </p>
            </div>
            
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="relative" data-testid="step-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white text-sm font-semibold">1</div>
                  <h3 className="text-base font-semibold text-slate-900">Book a Call</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pl-11">
                  Schedule a free strategy call. We'll discuss your situation, goals, and how we can help you save.
                </p>
              </div>

              <div className="relative" data-testid="step-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white text-sm font-semibold">2</div>
                  <h3 className="text-base font-semibold text-slate-900">Upload Docs Securely</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pl-11">
                  Use our encrypted portal to share documents safely. No email attachments needed.
                </p>
              </div>

              <div className="relative" data-testid="step-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white text-sm font-semibold">3</div>
                  <h3 className="text-base font-semibold text-slate-900">Get Year-Round Support</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pl-11">
                  Receive proactive tax planning, monthly reporting, and responsive support when you need it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-14 bg-slate-50 border-t border-slate-200" data-testid="final-cta-section">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Ready to take control of your finances?
            </h2>
            <p className="mt-3 text-slate-600">
              Book a free strategy call to discuss your goals and see how we can help you save.
            </p>
            
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <a 
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800"
                data-testid="final-cta-button"
              >
                Book a Tax Strategy Call
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="tel:+12404732623"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 transition-all hover:bg-slate-50"
              >
                Call (240) 473-2623
              </a>
            </div>
            
            <p className="mt-4 text-xs text-slate-400">
              Free consultation · No obligation · Serving all 50 states
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
