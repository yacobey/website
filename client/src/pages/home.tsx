import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StructuredData from "@/components/structured-data";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Lock,
  MapPin,
  Phone,
  Star,
  TrendingUp,
  BarChart3,
  FileSearch,
  Receipt,
  AlertCircle,
} from "lucide-react";
import Chatbot from "@/components/cpa-chatbot";
import heroProfessional from "@assets/hero-professional.jpg";
import consultationImg from "@assets/consultation.jpg";
import teamWorkImg from "@assets/team-work.jpg";

const CALENDLY = "https://calendly.com/yber2001/30min";

const faqs = [
  {
    q: "What exactly is a fractional controller?",
    a: "A fractional controller is a senior-level financial professional who handles the financial management functions of your business — monthly close, reporting, cash flow forecasting, KPI tracking, and financial analysis — on a part-time or retainer basis. You get the expertise of a full-time controller without the $120,000+ annual salary. For most growing healthcare practices in the $1M–$5M revenue range, a fractional controller is exactly the right level of support: more strategic than a bookkeeper, more operationally focused than a CFO.",
  },
  {
    q: "How is this different from what my bookkeeper does?",
    a: "Your bookkeeper records transactions and reconciles accounts. That's essential — but it's backward-looking, and it stops well short of financial management. A fractional controller takes that foundation and builds on it: interpreting the numbers, identifying margin problems, building cash flow forecasts, producing meaningful reports, and advising on financial decisions. Most practice owners I work with have a bookkeeper already. I work alongside them or assess whether the current bookkeeping infrastructure is fit for purpose before we build anything on top of it.",
  },
  {
    q: "What does onboarding look like?",
    a: "Onboarding typically takes 30 days. We start with a thorough review of your existing books, accounting systems, chart of accounts, and any existing reports. I assess the accuracy of your current financials, identify gaps, and build the reporting framework we'll use going forward. By the end of month one, you'll have a clean close, a baseline financial picture, and a clear view of what we're tracking and why. Most clients tell me the onboarding alone surfaces insights they hadn't seen in years.",
  },
  {
    q: "How quickly will I see results?",
    a: "You'll have more financial clarity within the first month — that's guaranteed by the onboarding process. Meaningful operational insights typically emerge in months two and three, once we have a clean baseline and have completed the first full close cycle together. Cash flow forecasting becomes reliable around month three as we establish patterns in your revenue and expense cycles. The practices that see the fastest results are the ones where the owner is willing to act on what the numbers reveal — and most do, because the picture becomes hard to ignore.",
  },
  {
    q: "What size practice do you work with?",
    a: "I work with healthcare practices in the DMV area — typically generating between $800,000 and $6 million in annual revenue. You might be a solo practitioner who has grown a solid practice and finally wants real financial infrastructure. You might be a group practice with multiple providers and increasing complexity. The common denominator is that you've outgrown the \"check the bank balance\" approach to financial management and you're ready to run your practice like the business it is. If you're significantly below or above that revenue range, I'll tell you honestly on our first call whether this engagement makes sense for you.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        className="flex w-full items-start justify-between py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-900 text-base leading-snug">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-5 text-slate-600 leading-relaxed text-sm">
          {a}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        type="Organization"
        data={{
          "@type": ["AccountingService", "LocalBusiness"],
          name: "Selam CPA",
          description:
            "Fractional controller and financial advisory services for healthcare practice owners in the DMV — DC, Maryland, and Virginia. Specializing in behavioral health clinics, physical therapy practices, and dental practices.",
          url: "https://selamcpa.com",
          telephone: "+12404732623",
          email: "yber2001@gmail.com",
          address: {
            "@type": "PostalAddress",
            addressRegion: "MD",
            addressCountry: "US",
          },
          areaServed: [
            { "@type": "State", name: "Maryland" },
            { "@type": "State", name: "Virginia" },
            { "@type": "City", name: "Washington DC" },
          ],
          priceRange: "$$$",
          founder: {
            "@type": "Person",
            name: "Yacob Tewelde",
            jobTitle: "CPA, FCCA — Fractional Controller & Financial Advisor",
          },
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden bg-[#0f172a]"
          data-testid="hero-section"
        >
          <div className="absolute inset-0">
            <img
              src={heroProfessional}
              alt="Healthcare practice owner reviewing financial reports"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/95 to-[#0f172a]/60" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="max-w-2xl">
              <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm mb-5">
                Fractional Controller &amp; Financial Advisory &mdash; DC, Maryland, Virginia
              </p>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
                data-testid="hero-heading"
              >
                Your Practice Is Growing. Your Financials Should Reflect That.
              </h1>

              <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">
                Fractional controller and financial advisory services for healthcare practice owners
                in the DMV who are done flying blind and ready for real financial clarity.
              </p>

              <p className="mt-4 text-slate-400 leading-relaxed max-w-xl">
                You built a practice worth running well. But if you're still relying on your
                bookkeeper for financial decisions — or making calls based on your bank balance —
                you're leaving margin on the table and taking on risk you can't see. That changes here.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors text-base"
                  data-testid="hero-cta-primary"
                >
                  Book a 15-Minute Discovery Call
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

              <p className="mt-4 text-sm text-slate-500">
                No commitment. No pitch. Just a direct conversation about your practice financials.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>Encrypted Client Portal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>20+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>DMV Region Only</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUE PROPOSITIONS ───────────────────────────────────────── */}
        <section className="py-20 bg-white" aria-labelledby="value-props" data-testid="value-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-3">
                What You Get
              </p>
              <h2
                id="value-props"
                className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight"
              >
                What Working With a Fractional Controller Actually Gives You
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="rounded-2xl bg-slate-50 p-8 border border-slate-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-5">
                  <BarChart3 className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Financial Clarity — Finally</h3>
                <p className="text-slate-600 leading-relaxed">
                  Most practice owners are making major decisions — hiring, adding a location, investing in
                  equipment — based on a gut feel and a bank balance. I build the financial reporting
                  infrastructure that shows you exactly where your practice stands: clean monthly
                  financials, a dashboard you can actually read, and a controller who explains what the
                  numbers mean and what to do about them. No more flying blind at the end of the month.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-8 border border-slate-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                  <TrendingUp className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Cash Flow Visibility You Can Plan Around</h3>
                <p className="text-slate-600 leading-relaxed">
                  Revenue and cash are not the same thing — and in healthcare, the gap between them can be
                  brutal. Insurance reimbursement lags, payer mix shifts, and uneven collections create
                  cash flow patterns that are hard to predict without a disciplined forecasting process. I
                  build rolling cash flow projections for your practice so you always know what's coming
                  in, what's going out, and where the pressure points are before they become problems.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-8 border border-slate-100">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-5">
                  <FileSearch className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Margin Analysis That Tells You the Truth</h3>
                <p className="text-slate-600 leading-relaxed">
                  Not all revenue is created equal. Some services, payers, and providers are driving your
                  profitability — and some are subsidizing your worst margins without you knowing it. I
                  break down your practice economics at the service line and provider level, so you can
                  see where you're actually making money and make smarter decisions about pricing,
                  scheduling, staffing, and contracting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────────────── */}
        <section className="py-20 bg-slate-50" aria-labelledby="services" data-testid="services-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-3">
                Engagements
              </p>
              <h2
                id="services"
                className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight"
              >
                Three Ways to Engage — One Standard of Work
              </h2>
              <p className="mt-4 text-slate-600 text-lg">
                Every engagement is built around one goal: giving you financial clarity you can
                actually act on.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-7">
              {/* Card 1 */}
              <div
                className="bg-white rounded-2xl border-2 border-emerald-200 p-8 flex flex-col shadow-sm"
                data-testid="service-fractional"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    Core Engagement
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Ongoing Retainer</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-1">
                  Fractional Controller Advisory
                </h3>
                <p className="text-3xl font-bold text-emerald-600 mb-4">
                  $3,500<span className="text-base font-medium text-slate-500"> / month</span>
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  This is financial leadership for your practice — without the cost of a full-time hire.
                  I function as your embedded controller: closing your books, building your reporting
                  infrastructure, and delivering the financial intelligence you need to make confident
                  operational decisions every month.
                </p>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {[
                    "Monthly close and financial reporting (P&L, balance sheet, cash flow)",
                    "Cash flow forecasting — rolling 13-week and monthly projections",
                    "KPI dashboard built for your practice type",
                    "Provider-level profitability analysis",
                    "Vendor and payer contract review",
                    "Monthly advisory call — I explain what the numbers mean",
                    "Direct access for questions between calls",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 mb-5 italic">
                  For practice owners generating $800K+ in annual revenue who want real financial
                  visibility and a trusted partner to help them grow profitably.
                </p>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
                >
                  Book a Discovery Call
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Card 2 */}
              <div
                className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col shadow-sm"
                data-testid="service-diagnostic"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                    Entry Point
                  </span>
                  <span className="text-xs text-slate-500 font-medium">One-Time Engagement</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-1">Financial Diagnostic</h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">
                  $1,500<span className="text-base font-medium text-slate-500"> one-time</span>
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Before you can fix your financials, you need to know exactly what's broken. The
                  Financial Diagnostic is a comprehensive assessment of your practice's financial health
                  — delivered as a clear, prioritized action plan. It's where most new clients start, and
                  it's designed to be immediately useful regardless of whether we work together afterward.
                </p>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {[
                    "Full review of current books and accounting setup",
                    "Cash flow analysis — where it's going and why",
                    "Margin breakdown by service line or revenue stream",
                    "Identification of the top 3–5 financial risks or inefficiencies",
                    "A written action plan with prioritized recommendations",
                    "60-minute review call to walk through findings together",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 mb-5 italic">
                  For practice owners who suspect their financials aren't telling them the full story, or
                  who want an independent opinion before a major financial decision.
                </p>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
                >
                  Book a Discovery Call
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Card 3 */}
              <div
                className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col shadow-sm"
                data-testid="service-tax"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                    Add-On
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Annual Engagement</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-1">
                  Tax Strategy Coordination
                </h3>
                <p className="text-base font-semibold text-amber-700 mb-4">
                  Pricing discussed on engagement
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Tax planning that's actually integrated with how your practice performs financially —
                  not a once-a-year conversation in February when it's already too late to act. This
                  add-on layers annual tax strategy directly onto the financial advisory engagement, so
                  your tax position reflects your real business decisions throughout the year.
                </p>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {[
                    "Annual tax planning review — aligned with your P&L and cash flow",
                    "Entity structure optimization",
                    "Retirement plan strategy — SEP-IRA, Solo 401(k), defined benefit analysis",
                    "Estimated tax planning and quarterly payment coordination",
                    "Year-end financial positioning recommendations",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 mb-5 italic">
                  For Fractional Controller Advisory clients who want tax strategy informed by the same
                  advisor who knows their financials inside and out.
                </p>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold py-3 rounded-lg transition-colors text-sm"
                >
                  Book a Discovery Call
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── MID-PAGE CTA ─────────────────────────────────────────────── */}
        <section className="py-16 bg-emerald-600" data-testid="mid-cta-section">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Not Sure Which Engagement Is Right for You?
            </h2>
            <p className="text-emerald-100 text-lg leading-relaxed mb-8">
              Most practice owners start with the Financial Diagnostic — a one-time deep dive into your
              books, cash flow, and margins. It gives you a clear picture of where you stand and a
              prioritized plan to fix what's broken. We can talk through whether that's the right entry
              point on a quick call.
            </p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold px-8 py-3.5 rounded-lg hover:bg-emerald-50 transition-colors text-base"
            >
              Book a 15-Minute Call
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* ── INDUSTRIES ───────────────────────────────────────────────── */}
        <section className="py-20 bg-white" aria-labelledby="industries" data-testid="industries-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-3">
                Specialization
              </p>
              <h2
                id="industries"
                className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight"
              >
                Built for Your Practice Type — Not Generic Business Accounting
              </h2>
              <p className="mt-4 text-slate-600 text-lg leading-relaxed">
                Healthcare practices have financial dynamics that general accountants misread constantly.
                Insurance reimbursement lags. Provider-level productivity. Payer mix shifts.
                Visit-based revenue models. I work inside these dynamics every day.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Behavioral Health Clinics",
                  testId: "industry-behavioral",
                  problem:
                    "You're running multiple providers billing through multiple insurance payers — and you have almost no visibility into which providers are profitable, which payers are worth the administrative burden, and how no-show rates are quietly destroying your revenue predictability. Your monthly revenue looks inconsistent and you can't tell why.",
                  fix:
                    "I build provider-level P&Ls that show exactly what each clinician is generating net of their cost. I model the real impact of your no-show rate on monthly revenue and help you quantify it in dollars, not percentages. Payer contract reviews tell you which insurance relationships are worth keeping and which ones are subsidizing your worst margins. You stop guessing and start making informed staffing, scheduling, and contracting decisions.",
                },
                {
                  title: "Physical Therapy Practices",
                  testId: "industry-pt",
                  problem:
                    "Visit-based revenue sounds simple until you account for authorization gaps, payer-specific reimbursement rates, and the reality that not every therapist on your payroll is generating what you think they are. You may be billing consistently but collecting inconsistently — and without clean productivity reporting, you can't identify the problem until it's already affected your cash flow.",
                  fix:
                    "I build cash flow models that account for authorization approval timelines and reimbursement lag by payer. Therapist productivity dashboards make performance visible — visit volume, revenue per visit, and collection rates — by individual and by location. You get the financial infrastructure to make compensation, hiring, and scheduling decisions based on real numbers, not gut feel.",
                },
                {
                  title: "Dental Practices",
                  testId: "industry-dental",
                  problem:
                    "Your procedure mix is shifting but you're not sure which services are actually driving margin and which ones are filling the schedule without moving the needle. The insurance versus cash-pay split affects your revenue differently than most practice owners realize. And if you have an associate dentist, you may be paying them more than their production justifies.",
                  fix:
                    "I build procedure-level profitability analysis so you know exactly which services are worth promoting and scheduling more of. Cash-pay versus insurance revenue modeling gives you a clear picture of your optimal payer mix. Associate compensation modeling — whether percentage of collections, flat salary, or hybrid — gets structured to protect your margins while staying competitive.",
                },
              ].map(({ title, testId, problem, fix }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200 p-8 hover:border-emerald-200 hover:shadow-md transition-all duration-300"
                  data-testid={testId}
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-5">{title}</h3>
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wide">The Problem</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{problem}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">How We Fix It</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{fix}</p>
                  </div>
                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold text-emerald-600 hover:text-emerald-800 transition-colors"
                  >
                    Talk about your practice <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT / CREDIBILITY ──────────────────────────────────────── */}
        <section className="py-20 bg-slate-50" aria-labelledby="about" data-testid="about-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div className="hidden lg:block">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={consultationImg}
                    alt="Yacob Tewelde, CPA FCCA, reviewing practice financials with a client"
                    className="w-full h-[520px] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div>
                <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-3">
                  About
                </p>
                <h2
                  id="about"
                  className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-2"
                >
                  You Don't Need Another Accountant. You Need Someone Who's Seen This Before.
                </h2>
                <p className="text-slate-500 text-lg mb-6">
                  After 20+ years working inside the financials of healthcare practices, I know exactly
                  where the money goes — and why it doesn't show up in your bank account.
                </p>

                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    I've reviewed hundreds of practice P&Ls. The pattern is almost always the same:
                    revenue looks fine on paper, but cash is tight, margins are unclear, and the owner
                    has no real visibility into which services, providers, or payers are actually
                    profitable.
                  </p>
                  <p>
                    That's not a bookkeeping problem. That's a financial leadership problem — and it's
                    what I fix.
                  </p>
                  <p>
                    I'm Yacob Tewelde, CPA, FCCA. I work exclusively with healthcare practice owners in
                    the DMV area — DC, Maryland, and Virginia — as a fractional controller and financial
                    advisor. My dual credentials (CPA and FCCA) reflect rigorous training on both sides
                    of the Atlantic, but what matters more to my clients is that I speak their language:
                    visit-based revenue, insurance reimbursement cycles, provider productivity, and payer
                    mix.
                  </p>
                  <p>
                    I don't run a high-volume tax shop. I work with a small number of practice owners who
                    want a trusted financial partner — someone who closes their books with precision,
                    builds dashboards that actually mean something, and tells them the truth about where
                    their margins are leaking.
                  </p>
                  <p className="font-medium text-slate-700">
                    If you've outgrown your bookkeeper and you're not ready for a full-time CFO, this is
                    exactly where I operate.
                  </p>
                </div>

                <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                  {[
                    "Certified Public Accountant (CPA)",
                    "Fellow of the Association of Chartered Certified Accountants (FCCA)",
                    "20+ Years in Financial Advisory and Practice Accounting",
                    "Deep specialization in healthcare practice economics — DMV region",
                    "Fractional Controller | Financial Advisor | Tax Strategist",
                  ].map((c) => (
                    <div key={c} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
        <section className="py-20 bg-white" aria-labelledby="how-it-works" data-testid="process-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-3">
                  Getting Started
                </p>
                <h2
                  id="how-it-works"
                  className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-10"
                >
                  Find Out Exactly Where Your Practice Stands Financially
                </h2>
                <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                  Book a 15-minute discovery call. We'll talk about your current financials, what's
                  unclear, and whether fractional controller support is the right fit for your practice
                  right now. No pitch. No pressure.
                </p>

                <div className="space-y-8">
                  {[
                    {
                      n: "1",
                      title: "Book a 15-Minute Discovery Call",
                      desc:
                        "We talk about your practice — current revenue, how you're managing your financials, and what's not working. I'll tell you honestly whether this engagement makes sense for you right now.",
                    },
                    {
                      n: "2",
                      title: "I Review Your Books and Assess the Gaps",
                      desc:
                        "During onboarding, I do a thorough review of your existing financials, accounting systems, and reporting. Most clients see their first real insights within the first 30 days.",
                    },
                    {
                      n: "3",
                      title: "You Get Real Financial Clarity — Every Month",
                      desc:
                        "Clean books, a dashboard built for your practice, rolling cash flow projections, and a controller who reviews everything with you and tells you what the numbers mean.",
                    },
                  ].map(({ n, title, desc }) => (
                    <div key={n} className="flex gap-5">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {n}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-10 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors"
                >
                  Schedule My Discovery Call
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="hidden lg:block">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={teamWorkImg}
                    alt="Financial team working through practice analytics"
                    className="w-full h-[520px] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section className="py-20 bg-slate-50" aria-labelledby="faq" data-testid="faq-section">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-3">FAQ</p>
              <h2 id="faq" className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                Fractional Controller FAQ
              </h2>
              <p className="mt-3 text-slate-600">
                Straight answers to the questions practice owners ask before engaging.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 px-8 divide-y divide-slate-100">
              {faqs.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────────── */}
        <section className="py-24 bg-[#0f172a]" data-testid="final-cta-section">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-5">
              You've Built a Successful Practice. Now Build the Financial Infrastructure to Match.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              You shouldn't be running a growing healthcare practice without real financial visibility.
              If your books are behind, your cash flow is unpredictable, or you genuinely don't know
              which services or providers are driving your margins — that's fixable. Let's talk.
            </p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-lg transition-colors text-lg"
              data-testid="final-cta-button"
            >
              Schedule Your Discovery Call
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="mt-4 text-slate-500 text-sm">
              No commitment. No pitch. Just a direct conversation about your practice financials.
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
