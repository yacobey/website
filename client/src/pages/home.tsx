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
  CheckCircle2,
  Star,
  Stethoscope,
  Phone,
  Lock,
  Clock,
  MapPin,
  ChevronRight,
} from "lucide-react";
import Chatbot from "@/components/cpa-chatbot";
import heroProfessional from "@assets/hero-professional.jpg";
import consultationImg from "@assets/consultation.jpg";
import teamWorkImg from "@assets/team-work.jpg";

export default function Home() {
  const { data: businessConfig } = useBusinessConfig();
  const calendlyUrl = businessConfig?.links.calendly || 'https://calendly.com/yber2001/30min';

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does Selam CPA specialize in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Selam CPA specializes in tax preparation and planning, bookkeeping, audit and assurance, and advisory services for professional service firms, nonprofits and associations, and medical and dental practices. We are a Maryland-licensed CPA firm serving clients in all 50 US states."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work with clients outside of Maryland?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Selam CPA serves clients in all 50 states through secure virtual workflows. We use encrypted document portals and video conferencing so you get the same quality of service regardless of location."
        }
      },
      {
        "@type": "Question",
        "name": "How much can I save on taxes with proactive planning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our clients save an average of $15,000 or more per year through proactive tax planning. Savings depend on your specific situation, but strategies like entity restructuring, retirement plan optimization, and year-round deduction tracking consistently produce significant results."
        }
      },
      {
        "@type": "Question",
        "name": "What is a Fractional CFO and do I need one?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Fractional CFO provides executive-level financial leadership on a part-time basis — typically at 60-80% less than hiring a full-time CFO. If your business needs monthly financial reporting, cash flow forecasting, or strategic planning but isn't ready for a $200K+ salary, a fractional CFO is an excellent fit."
        }
      },
      {
        "@type": "Question",
        "name": "How do I get started with Selam CPA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Getting started is simple: book a free strategy call through our website, upload your documents through our encrypted portal, and receive year-round proactive support. Most new clients are onboarded within one week."
        }
      },
      {
        "@type": "Question",
        "name": "Is my financial information secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. We use bank-level 256-bit encryption for all document transfers, secure client portals with two-factor authentication, and follow IRS data security guidelines. Your financial information never travels through email."
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
          "description": "Maryland-licensed CPA firm providing tax preparation, bookkeeping, audit and assurance, and advisory services. Virtual firm serving all 50 US states with secure, encrypted workflows.",
          "slogan": "Your Financial Success Partner",
          "foundingDate": "2020",
          "url": "https://selamcpa.com",
          "telephone": "+12404732623",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "MD",
            "addressCountry": "US"
          },
          "areaServed": {
            "@type": "Country",
            "name": "United States"
          },
          "priceRange": "$$",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "127"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "CPA Services",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tax Preparation & Planning" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bookkeeping & Accounting" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Audit & Assurance" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Advisory & Fractional CFO" } }
            ]
          }
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#0f172a]" data-testid="hero-section">
          <div className="absolute inset-0">
            <img 
              src={heroProfessional} 
              alt="Financial professionals reviewing business documents" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/95 to-[#0f172a]/70" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="max-w-2xl">
              <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm mb-4" data-testid="hero-eyebrow">
                Maryland-Licensed CPA Firm &middot; Serving All 50 States
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight" data-testid="hero-heading">
                Your numbers deserve<br className="hidden sm:block" /> more than compliance.
              </h1>

              <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">
                We help business owners keep more of what they earn — with tax strategies that work year-round, 
                books you can actually trust, and a team that picks up the phone when you call.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a 
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors text-base"
                  data-testid="hero-cta-primary"
                >
                  Book Your Free Strategy Call
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="tel:+12404732623"
                  className="inline-flex items-center justify-center gap-2 border border-slate-500 hover:border-slate-400 text-slate-300 hover:text-white font-medium px-7 py-3.5 rounded-lg transition-colors text-base"
                  data-testid="hero-cta-phone"
                >
                  <Phone className="w-4 h-4" />
                  (240) 473-2623
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>256-bit Encrypted Portal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>20+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>100% Virtual</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section className="bg-slate-50 border-b border-slate-200 py-6" data-testid="social-proof">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-slate-900">500+</div>
                <div className="text-sm text-slate-500 mt-0.5">Clients Served</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">$15K+</div>
                <div className="text-sm text-slate-500 mt-0.5">Avg. Tax Savings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">50</div>
                <div className="text-sm text-slate-500 mt-0.5">States Served</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-600">5.0</div>
                <div className="flex items-center justify-center gap-0.5 mt-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-white" aria-labelledby="services" data-testid="services-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-3">What We Do</p>
              <h2 id="services" className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                Full-service accounting, built around your business
              </h2>
              <p className="mt-4 text-slate-600 text-lg">
                From tax season to board meetings — we handle the financial work so you can focus on running your business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Link href="/tax" className="group block">
                <div className="rounded-2xl border border-slate-200 p-7 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 h-full" data-testid="service-tax">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                      <Calculator className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        Tax Preparation & Planning
                      </h3>
                      <p className="mt-2 text-slate-600 leading-relaxed">
                        We don't just file your return — we build a year-round strategy to keep your tax bill as low as legally possible. 
                        Individual, S-Corp, LLC, partnership, and nonprofit returns.
                      </p>
                      <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-emerald-600 group-hover:gap-2 transition-all">
                        See tax services <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/bookkeeping" className="group block">
                <div className="rounded-2xl border border-slate-200 p-7 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 h-full" data-testid="service-bookkeeping">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                      <FileCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        Bookkeeping & Accounting
                      </h3>
                      <p className="mt-2 text-slate-600 leading-relaxed">
                        Monthly bookkeeping, bank reconciliation, and financial statements that actually make sense. 
                        QuickBooks Online and Xero integration included.
                      </p>
                      <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-emerald-600 group-hover:gap-2 transition-all">
                        See bookkeeping plans <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/audit" className="group block">
                <div className="rounded-2xl border border-slate-200 p-7 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 h-full" data-testid="service-audit">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-100 transition-colors">
                      <ShieldCheck className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        Audit & Assurance
                      </h3>
                      <p className="mt-2 text-slate-600 leading-relaxed">
                        Independent audits, reviews, and compilations following GAAS standards. Single audits, 
                        Form 990, and employee benefit plan audits for nonprofits and government entities.
                      </p>
                      <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-emerald-600 group-hover:gap-2 transition-all">
                        See audit services <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/advisory" className="group block">
                <div className="rounded-2xl border border-slate-200 p-7 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 h-full" data-testid="service-advisory">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                      <BarChart3 className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        Advisory & Fractional CFO
                      </h3>
                      <p className="mt-2 text-slate-600 leading-relaxed">
                        CFO-level financial leadership without the full-time salary. Monthly reporting, cash flow 
                        forecasting, and strategic planning — starting at a fraction of the cost.
                      </p>
                      <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-emerald-600 group-hover:gap-2 transition-all">
                        See advisory services <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Who We Serve — with image */}
        <section className="py-20 bg-slate-50" aria-labelledby="who-we-serve" data-testid="specialties-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-3">Who We Work With</p>
                <h2 id="who-we-serve" className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                  Built for businesses that need more than a number-cruncher
                </h2>
                <p className="mt-4 text-slate-600 text-lg leading-relaxed">
                  We work best with clients who want a long-term financial partner — not just someone to file their taxes once a year.
                </p>

                <div className="mt-8 space-y-5">
                  <div className="flex items-start gap-4" data-testid="card-professional-services">
                    <div className="w-11 h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Building2 className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Professional Service Firms</h3>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        Law firms, consultancies, and agencies that need clean reporting, smart tax structure, and a CPA who understands professional services.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" data-testid="card-nonprofits">
                    <div className="w-11 h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Heart className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Nonprofits & Associations</h3>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        501(c)(3) organizations, trade associations, and membership groups that need Form 990 compliance, grant audits, and board-ready financials.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" data-testid="card-medical">
                    <div className="w-11 h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Stethoscope className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Medical & Dental Practices</h3>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        Private practices that want better profitability analysis, entity structure guidance, and a CPA who speaks healthcare finance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={consultationImg} 
                    alt="CPA consultation with business client" 
                    className="w-full h-[500px] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-20 bg-white" aria-labelledby="why-us" data-testid="why-us-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-3">Why Selam CPA</p>
              <h2 id="why-us" className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                What makes us different
              </h2>
              <p className="mt-4 text-slate-600 text-lg">
                We're a small firm on purpose. That means you get senior-level attention, fast responses, and a CPA who actually knows your business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6" data-testid="benefit-proactive">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Proactive, Not Reactive</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We don't wait until April. We plan ahead — reviewing your situation quarterly so nothing slips through the cracks.
                </p>
              </div>

              <div className="text-center p-6" data-testid="benefit-advisory">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Fractional CFO Support</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Monthly reporting, cash flow analysis, and financial dashboards — without the $200K salary.
                </p>
              </div>

              <div className="text-center p-6" data-testid="benefit-secure">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Bank-Level Security</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  256-bit encryption, two-factor authentication, and secure document portals. Your data never travels through email.
                </p>
              </div>

              <div className="text-center p-6" data-testid="benefit-virtual">
                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">100% Virtual</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Work with us from anywhere in the country. No commute, no waiting rooms — just fast, professional service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-[#0f172a]" aria-labelledby="testimonials" data-testid="testimonials-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-emerald-400 font-semibold text-sm uppercase tracking-wide mb-3">Client Results</p>
              <h2 id="testimonials" className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Don't take our word for it
              </h2>
              <p className="mt-4 text-slate-400 text-lg">
                Here's what our clients have to say.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-7" data-testid="testimonial-1">
                <div className="flex items-center gap-0.5 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-300 leading-relaxed">
                  "We switched to Selam CPA after years with a big firm that barely knew our name. First year, they found $18,000 in deductions we'd been missing. That's not a typo."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-sm font-semibold text-emerald-400">JD</div>
                  <div>
                    <div className="text-sm font-medium text-white">James D.</div>
                    <div className="text-xs text-slate-500">Tech Startup Founder, Virginia</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-7" data-testid="testimonial-2">
                <div className="flex items-center gap-0.5 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-300 leading-relaxed">
                  "Our Form 990 used to be a nightmare every year. Selam made it seamless — and their team actually understands nonprofit accounting, which is rare."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-sm font-semibold text-blue-400">MR</div>
                  <div>
                    <div className="text-sm font-medium text-white">Maria R.</div>
                    <div className="text-xs text-slate-500">Nonprofit Executive Director, DC</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-7" data-testid="testimonial-3">
                <div className="flex items-center gap-0.5 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-300 leading-relaxed">
                  "I run a dental practice and needed a CPA who understood healthcare. Selam restructured our entity and saved us almost $22K in the first year."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center text-sm font-semibold text-purple-400">SK</div>
                  <div>
                    <div className="text-sm font-medium text-white">Dr. Sarah K.</div>
                    <div className="text-xs text-slate-500">Dental Practice Owner, Maryland</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/testimonials" className="text-sm font-medium text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 transition-colors">
                Read more client stories <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works — with image */}
        <section className="py-20 bg-white" aria-labelledby="process" data-testid="process-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="hidden lg:block order-last lg:order-first">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={teamWorkImg} 
                    alt="Team collaborating on financial strategy" 
                    className="w-full h-[480px] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div>
                <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-3">Getting Started</p>
                <h2 id="process" className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                  Three steps to financial clarity
                </h2>
                <p className="mt-4 text-slate-600 text-lg leading-relaxed">
                  Most new clients are fully onboarded within a week. Here's how it works.
                </p>
                
                <div className="mt-10 space-y-8">
                  <div className="flex items-start gap-5" data-testid="step-1">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg">Book a free strategy call</h3>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        We'll learn about your business, review your current tax situation, and outline exactly how we can help. No pressure, no hard sell.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5" data-testid="step-2">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg">Upload your documents securely</h3>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        Use our encrypted client portal to share tax returns, bank statements, and financial documents. No emailing sensitive files.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5" data-testid="step-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg">Get year-round support</h3>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        From quarterly tax planning to monthly financials, we're in your corner all year — not just during filing season.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section — for Google + ChatGPT/Perplexity */}
        <section className="py-20 bg-slate-50" aria-labelledby="faq" data-testid="faq-section">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-3">Common Questions</p>
              <h2 id="faq" className="text-3xl font-bold text-slate-900 tracking-tight">
                Frequently asked questions
              </h2>
            </div>

            <div className="space-y-6">
              {faqSchema.mainEntity.map((faq, i) => (
                <details key={i} className="group bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-6 text-left font-semibold text-slate-900 hover:bg-slate-50 transition-colors">
                    <span className="pr-4">{faq.name}</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.acceptedAnswer.text}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-emerald-600" data-testid="final-cta-section">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Ready to stop overpaying on taxes?
            </h2>
            <p className="mt-4 text-emerald-100 text-lg max-w-xl mx-auto">
              Book a free strategy call. We'll review your situation and show you exactly where the savings are — no obligation.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 font-semibold px-8 py-4 rounded-lg hover:bg-emerald-50 transition-colors text-lg"
                data-testid="final-cta-button"
              >
                Book Your Free Call
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="tel:+12404732623"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors text-lg"
              >
                <Phone className="w-5 h-5" />
                (240) 473-2623
              </a>
            </div>
            
            <p className="mt-6 text-sm text-emerald-200">
              Free consultation &middot; No commitment &middot; Serving all 50 states
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
