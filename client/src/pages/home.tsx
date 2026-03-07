import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StructuredData from "@/components/structured-data";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  BarChart3,
  TrendingUp,
  FileSearch,
  AlertTriangle,
} from "lucide-react";
import Chatbot from "@/components/cpa-chatbot";
import yacobHeadshot from "@assets/yacob-headshot.png";

const CALENDLY = "https://calendly.com/yber2001/30min";
const HERO_VIDEO = "/hero-video.mp4";

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
    a: "You'll have more financial clarity within the first month — that's guaranteed by the onboarding process. Meaningful operational insights typically emerge in months two and three, once we have a clean baseline and have completed the first full close cycle together. Cash flow forecasting becomes reliable around month three as we establish patterns in your revenue and expense cycles.",
  },
  {
    q: "What size practice do you work with?",
    a: "I work with healthcare practices in the DMV area — typically generating between $800,000 and $6 million in annual revenue. You might be a solo practitioner who has grown a solid practice and finally wants real financial infrastructure. You might be a group practice with multiple providers and increasing complexity. The common denominator is that you've outgrown the \"check the bank balance\" approach to financial management.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        className="flex w-full items-start justify-between py-6 text-left gap-6"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-medium text-white text-lg leading-snug">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-emerald-400 flex-shrink-0 mt-1 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-6 text-slate-300 leading-relaxed">
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
          description: "Fractional controller and financial advisory services for healthcare practice owners in DC, Maryland, and Virginia.",
          url: "https://selamcpa.com",
          telephone: "+12404732623",
          email: "yber2001@gmail.com",
          address: { "@type": "PostalAddress", addressRegion: "MD", addressCountry: "US" },
          founder: { "@type": "Person", name: "Yacob Tewelde", jobTitle: "CPA, FCCA" },
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Header />

      <main>

        {/* ── HERO: FULL-SCREEN VIDEO ─────────────────────────────────── */}
        <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-center overflow-hidden" data-testid="hero-section">
          {/* Video layer */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1e]/95 via-[#0a0f1e]/80 to-[#0a0f1e]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/60 via-transparent to-transparent" />

          <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
            <div className="max-w-2xl">
              <p className="text-emerald-400 font-medium tracking-[0.2em] uppercase text-xs mb-8">
                DC &nbsp;·&nbsp; Maryland &nbsp;·&nbsp; Virginia
              </p>
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight"
                data-testid="hero-heading"
              >
                Your Practice
                <br />
                Is Growing.
                <br />
                <span className="text-emerald-400">Your Financials</span>
                <br />
                Should Reflect That.
              </h1>
              <p className="mt-8 text-xl text-slate-300 leading-relaxed max-w-lg">
                Fractional controller services for healthcare practice owners in the DMV who are ready for real financial clarity.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 text-base group"
                  data-testid="hero-cta-primary"
                >
                  Book a Discovery Call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="tel:+12404732623"
                  className="inline-flex items-center justify-center gap-2 text-slate-300 hover:text-white font-medium px-8 py-4 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-200 text-base"
                >
                  (240) 473-2623
                </a>
              </div>
              <p className="mt-5 text-sm text-slate-500">
                No commitment. No pitch. Just a direct conversation about your practice financials.
              </p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/30" />
          </div>
        </section>

        {/* ── CREDENTIAL BAR ───────────────────────────────────────────── */}
        <section className="bg-[#0a0f1e] border-b border-white/5 py-5">
          <div className="max-w-5xl mx-auto px-6 sm:px-10">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-sm text-slate-400">
              {[
                "Certified Public Accountant (CPA)",
                "Fellow, ACCA (FCCA)",
                "20+ Years Experience",
                "Healthcare Practice Specialist",
                "DMV Region Only",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VALUE PROPOSITIONS ───────────────────────────────────────── */}
        <section className="py-28 bg-white" data-testid="value-section">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="max-w-2xl mb-20">
              <p className="text-emerald-600 font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                What You Get
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                What Working With a Fractional Controller Actually Gives You
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {[
                {
                  icon: <BarChart3 className="w-7 h-7 text-emerald-600" />,
                  title: "Financial Clarity — Finally",
                  body: "Most practice owners are making major decisions — hiring, adding a location, investing in equipment — based on a gut feel and a bank balance. I build the financial reporting infrastructure that shows you exactly where your practice stands: clean monthly financials, a dashboard you can actually read, and a controller who explains what the numbers mean and what to do about them.",
                },
                {
                  icon: <TrendingUp className="w-7 h-7 text-blue-600" />,
                  title: "Cash Flow Visibility You Can Plan Around",
                  body: "Revenue and cash are not the same thing — and in healthcare, the gap between them can be brutal. Insurance reimbursement lags, payer mix shifts, and uneven collections create cash flow patterns that are hard to predict without a disciplined forecasting process. I build rolling cash flow projections so you always know what's coming in and what's going out.",
                },
                {
                  icon: <FileSearch className="w-7 h-7 text-amber-600" />,
                  title: "Margin Analysis That Tells You the Truth",
                  body: "Not all revenue is created equal. Some services, payers, and providers are driving your profitability — and some are subsidizing your worst margins without you knowing it. I break down your practice economics at the service line and provider level, so you can see where you're actually making money.",
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="group">
                  <div className="mb-6">{icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug">{title}</h3>
                  <p className="text-slate-500 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────────────── */}
        <section className="py-28 bg-[#0a0f1e]" data-testid="services-section" id="services">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="max-w-2xl mb-20">
              <p className="text-emerald-400 font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                Engagements
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                Three Ways to Engage — One Standard of Work
              </h2>
              <p className="mt-5 text-slate-400 text-lg leading-relaxed">
                Every engagement is built around one goal: giving you financial clarity you can actually act on.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {[
                {
                  tag: "Core Engagement",
                  tagColor: "text-emerald-400 bg-emerald-400/10",
                  title: "Fractional Controller Advisory",
                  sub: "Ongoing Retainer",
                  desc: "Financial leadership for your practice — without the cost of a full-time hire. I function as your embedded controller: closing your books, building your reporting infrastructure, and delivering the financial intelligence you need to make confident decisions every month.",
                  items: [
                    "Monthly close and financial reporting",
                    "Rolling cash flow forecasting",
                    "KPI dashboard for your practice type",
                    "Provider-level profitability analysis",
                    "Vendor and payer contract review",
                    "Monthly advisory call + direct access",
                  ],
                  cta: "Start a Conversation",
                  highlight: true,
                  testId: "service-fractional",
                },
                {
                  tag: "Entry Point",
                  tagColor: "text-blue-400 bg-blue-400/10",
                  title: "Financial Diagnostic",
                  sub: "One-Time Engagement",
                  desc: "Before you can fix your financials, you need to know exactly what's broken. A comprehensive assessment of your practice's financial health — delivered as a clear, prioritized action plan. It's where most new clients start.",
                  items: [
                    "Full review of current books and setup",
                    "Cash flow analysis",
                    "Margin breakdown by service line",
                    "Top financial risks identified",
                    "Written action plan",
                    "60-minute review call",
                  ],
                  cta: "Book a Discovery Call",
                  highlight: false,
                  testId: "service-diagnostic",
                },
                {
                  tag: "Add-On",
                  tagColor: "text-amber-400 bg-amber-400/10",
                  title: "Tax Strategy Coordination",
                  sub: "Annual Engagement",
                  desc: "Tax planning integrated with how your practice performs financially — not a once-a-year conversation in February. This layers annual tax strategy directly onto the financial advisory engagement.",
                  items: [
                    "Annual tax planning review",
                    "Entity structure optimization",
                    "Retirement plan strategy",
                    "Estimated tax planning",
                    "Year-end positioning recommendations",
                  ],
                  cta: "Book a Discovery Call",
                  highlight: false,
                  testId: "service-tax",
                },
              ].map(({ tag, tagColor, title, sub, desc, items, cta, highlight, testId }) => (
                <div
                  key={title}
                  data-testid={testId}
                  className={`rounded-2xl p-8 flex flex-col ${
                    highlight
                      ? "bg-emerald-500 text-white ring-1 ring-emerald-400/30"
                      : "bg-white/5 border border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColor}`}>
                      {tag}
                    </span>
                    <span className={`text-xs ${highlight ? "text-emerald-100" : "text-slate-500"}`}>
                      {sub}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${highlight ? "text-white" : "text-white"}`}>
                    {title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-6 flex-1 ${highlight ? "text-emerald-50" : "text-slate-400"}`}>
                    {desc}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {items.map((item) => (
                      <li key={item} className={`flex items-start gap-2.5 text-sm ${highlight ? "text-emerald-50" : "text-slate-400"}`}>
                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${highlight ? "text-white" : "text-emerald-500"}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      highlight
                        ? "bg-white text-emerald-700 hover:bg-emerald-50"
                        : "border border-white/20 text-white hover:bg-white/10"
                    }`}
                  >
                    {cta} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MID-PAGE CTA ─────────────────────────────────────────────── */}
        <section className="py-20 bg-emerald-600">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-5">
              Not Sure Which Engagement Is Right for You?
            </h2>
            <p className="text-emerald-100 text-lg leading-relaxed mb-8">
              Most practice owners start with the Financial Diagnostic — a one-time deep dive into your books, cash flow, and margins. We can talk through whether that's the right entry point on a quick call.
            </p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold px-8 py-4 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Book a 15-Minute Call <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* ── INDUSTRIES ───────────────────────────────────────────────── */}
        <section className="py-28 bg-slate-50" id="industries" data-testid="industries-section">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="max-w-2xl mb-20">
              <p className="text-emerald-600 font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                Specialization
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                Built for Your Practice Type
              </h2>
              <p className="mt-5 text-slate-500 text-lg leading-relaxed">
                Healthcare practices have financial dynamics that general accountants misread constantly. I work inside these dynamics every day.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Behavioral Health Clinics",
                  testId: "industry-behavioral",
                  problem: "You're running multiple providers billing through multiple insurance payers — and you have almost no visibility into which providers are profitable, which payers are worth the administrative burden, and how no-show rates are quietly destroying your revenue predictability.",
                  fix: "I build provider-level P&Ls that show exactly what each clinician is generating net of their cost. I model the real impact of your no-show rate on monthly revenue and help you quantify it in dollars, not percentages. Payer contract reviews tell you which insurance relationships are worth keeping.",
                },
                {
                  title: "Physical Therapy Practices",
                  testId: "industry-pt",
                  problem: "Visit-based revenue sounds simple until you account for authorization gaps, payer-specific reimbursement rates, and the reality that not every therapist on your payroll is generating what you think they are.",
                  fix: "I build cash flow models that account for authorization approval timelines and reimbursement lag by payer. Therapist productivity dashboards make performance visible — visit volume, revenue per visit, and collection rates — by individual and by location.",
                },
                {
                  title: "Dental Practices",
                  testId: "industry-dental",
                  problem: "Your procedure mix is shifting but you're not sure which services are actually driving margin. The insurance versus cash-pay split affects your revenue differently than most practice owners realize.",
                  fix: "I build procedure-level profitability analysis so you know exactly which services are worth promoting. Cash-pay versus insurance revenue modeling gives you a clear picture of your optimal payer mix. Associate compensation modeling protects your margins while staying competitive.",
                },
              ].map(({ title, testId, problem, fix }) => (
                <div
                  key={title}
                  data-testid={testId}
                  className="bg-white rounded-2xl border border-slate-200 p-10 grid md:grid-cols-3 gap-8 items-start hover:border-emerald-200 hover:shadow-sm transition-all"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
                    <a
                      href={CALENDLY}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-800 transition-colors"
                    >
                      Let's talk <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">The Problem</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{problem}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">How We Fix It</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT / YACOB ────────────────────────────────────────────── */}
        <section className="bg-[#0a0f1e] overflow-hidden" id="about" data-testid="about-section">
          <div className="grid lg:grid-cols-2 min-h-[700px]">

            {/* Photo — full bleed, fills entire left column */}
            <div className="relative hidden lg:block">
              <img
                src={yacobHeadshot}
                alt="Yacob Tewelde, CPA FCCA — Fractional Controller and Financial Advisor"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              {/* Gradient fade into dark on the right edge */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0f1e]" />
              {/* Subtle bottom vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/60 via-transparent to-transparent" />

              {/* Name plate floating at bottom-left of photo */}
              <div className="absolute bottom-10 left-10 right-16">
                <p className="text-white font-bold text-xl tracking-tight">Yacob Tewelde</p>
                <p className="text-emerald-400 text-sm font-medium mt-1">CPA, FCCA &nbsp;·&nbsp; Fractional Controller</p>
              </div>
            </div>

            {/* Content — right column */}
            <div className="px-10 py-20 lg:px-16 lg:py-24 flex flex-col justify-center">
              <p className="text-emerald-400 font-semibold text-xs uppercase tracking-[0.2em] mb-8">
                About
              </p>

              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-10">
                You Don't Need Another Accountant. You Need Someone Who's{" "}
                <span className="text-emerald-400">Seen This Before.</span>
              </h2>

              <div className="space-y-5 text-slate-400 leading-relaxed mb-10">
                <p>
                  I've reviewed hundreds of practice P&Ls. The pattern is almost always the same: revenue looks fine on paper, but cash is tight, margins are unclear, and the owner has no real visibility into which services, providers, or payers are actually profitable.
                </p>
                <p>
                  That's not a bookkeeping problem. That's a financial leadership problem — and it's what I fix.
                </p>
                <p>
                  I work exclusively with healthcare practice owners in the DMV area as a fractional controller and financial advisor. My dual credentials (CPA and FCCA) reflect rigorous training on both sides of the Atlantic — but what matters more to my clients is that I speak their language: visit-based revenue, insurance reimbursement cycles, provider productivity, and payer mix.
                </p>
              </div>

              {/* Pull quote — the "high-volume tax shop" line elevated */}
              <blockquote className="border-l-4 border-emerald-500 pl-6 mb-10">
                <p className="text-white text-lg lg:text-xl italic leading-relaxed">
                  "I work with a small number of practice owners who want a trusted financial partner — someone who closes their books with precision and tells them the truth about where their margins are leaking."
                </p>
                <footer className="mt-4 text-emerald-400 text-sm font-semibold not-italic">
                  — Yacob Tewelde, CPA, FCCA
                </footer>
              </blockquote>

              {/* Credential pills */}
              <div className="flex flex-wrap gap-2 mb-10">
                {[
                  "CPA",
                  "FCCA",
                  "20+ Years Experience",
                  "Healthcare Specialist",
                  "DMV Region",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <p className="text-slate-300 font-medium mb-8">
                If you've outgrown your bookkeeper and you're not ready for a full-time CFO, this is exactly where I operate.
              </p>

              <div>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 group"
                >
                  Schedule a Discovery Call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
        <section className="py-28 bg-[#0a0f1e]" id="process" data-testid="process-section">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="max-w-2xl mb-20">
              <p className="text-emerald-400 font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                Getting Started
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                What Happens After You Book a Call
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  n: "01",
                  title: "A Direct Conversation",
                  desc: "We talk about your practice — current revenue, how you're managing your financials, and what's not working. I'll tell you honestly whether this engagement makes sense for you right now.",
                },
                {
                  n: "02",
                  title: "I Review Your Books",
                  desc: "During onboarding, I do a thorough review of your existing financials, accounting systems, and reporting. Most clients see their first real insights within the first 30 days.",
                },
                {
                  n: "03",
                  title: "Real Clarity, Every Month",
                  desc: "Clean books, a dashboard built for your practice, rolling cash flow projections, and a controller who reviews everything with you and tells you what the numbers mean.",
                },
              ].map(({ n, title, desc }) => (
                <div key={n}>
                  <div className="text-5xl font-bold text-white/10 mb-6 font-mono">{n}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                  <p className="text-slate-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section className="py-28 bg-[#0a0f1e]" id="faq" data-testid="faq-section">
          <div className="max-w-3xl mx-auto px-6 sm:px-10">
            <div className="text-center mb-16">
              <p className="text-emerald-400 font-semibold text-xs uppercase tracking-[0.2em] mb-4">FAQ</p>
              <h2 className="text-4xl font-bold text-white leading-tight tracking-tight">
                Questions Practice Owners Ask
              </h2>
            </div>
            <div className="divide-y divide-white/10">
              {faqs.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────────── */}
        <section className="relative py-32 bg-[#0a0f1e] overflow-hidden" data-testid="final-cta-section">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.08)_0%,_transparent_70%)]" />
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
              You've Built a Successful Practice.
              <br />
              <span className="text-emerald-400">Now Build the Financial Infrastructure to Match.</span>
            </h2>
            <p className="text-slate-400 text-xl leading-relaxed mb-10">
              If your books are behind, your cash flow is unpredictable, or you genuinely don't know which services or providers are driving your margins — that's fixable. Let's talk.
            </p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-10 py-5 rounded-lg transition-all duration-200 text-lg group"
              data-testid="final-cta-button"
            >
              Schedule Your Discovery Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="mt-5 text-slate-600 text-sm">
              No commitment. No pitch. Just a direct conversation.
            </p>
          </div>
        </section>

      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
