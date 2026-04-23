import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";

const CALENDLY = "https://calendly.com/yber2001/30min";

const stats = [
  {
    number: "5",
    label: "Custom skills built",
    desc: "Engagement letters, tax organizers, IRS notice responses, CFO reports, consulting proposals",
  },
  {
    number: "3,777",
    label: "Knowledge vectors",
    desc: "IRS publications + 40 state tax guidance documents in Pinecone vector database",
  },
  {
    number: "40+",
    label: "States covered",
    desc: "State tax guidance ingested and searchable — federal + all income-tax states",
  },
  {
    number: "0",
    label: "Lines of code written by the CPA",
    desc: "Built entirely through natural language direction — no technical background required",
  },
];

const capabilities = [
  {
    title: "Engagement Letter Generator",
    desc: "Drafts professionally formatted engagement letters for any service type — tax prep, bookkeeping, fractional CFO, audit — in under 2 minutes. Auto-syncs to HubSpot CRM.",
  },
  {
    title: "Client Tax Organizer",
    desc: "Generates a customized tax document checklist based on the client's entity type and situation. Includes IRS publication citations and CPA review flags.",
  },
  {
    title: "IRS Notice Response Drafter",
    desc: "10 notice playbooks covering CP2000, CP14, CP90, Letter 525, Letter 531, and more. Hard stops on dangerous notices. [NEEDS VERIFICATION] flags on uncertain positions.",
  },
  {
    title: "Monthly CFO Report Generator",
    desc: "Takes financial data and generates a professional management report with executive summary, variance analysis, KPI dashboard, and action items. Plain English throughout.",
  },
  {
    title: "Knowledge Base with Real Citations",
    desc: "Every document output includes real IRS publication citations with page numbers and tax year. Pub 17, 334, 463, 502, 587, 946, and more — all searchable via Pinecone.",
  },
];

const steps = [
  {
    n: "01",
    title: "Assessment",
    desc: "We spend 2 hours mapping your current workflow, identifying your biggest time-wasters, and building your AI readiness report.",
  },
  {
    n: "02",
    title: "Architecture",
    desc: "We design your two-Claude system — Claude Web as strategist, Claude Code as workhorse — and write your CLAUDE.md firm brain.",
  },
  {
    n: "03",
    title: "Build",
    desc: "We build your custom skills one by one, starting with the highest-value workflows. Each skill is tested on real scenarios before delivery.",
  },
  {
    n: "04",
    title: "Train & Support",
    desc: "We train you to direct the system — no coding required. You learn to get production-quality outputs from day one.",
  },
];

const plans = [
  {
    tier: "Assessment",
    price: "$500",
    duration: "One-time",
    desc: "For firms that want to understand their AI opportunity before committing.",
    includes: [
      "2-hour workflow audit",
      "AI readiness report",
      "Top 5 workflow opportunities identified",
      "Recommended skill build order",
      "30-day email Q&A",
    ],
    featured: false,
    cta: "Book Assessment →",
  },
  {
    tier: "Foundation",
    price: "$2,500",
    duration: "One-time",
    desc: "For firms ready to build their first real AI system.",
    includes: [
      "Everything in Assessment",
      "CLAUDE.md firm brain built and installed",
      "3 custom skills built and tested",
      "Knowledge base setup (federal IRS publications)",
      "HubSpot or CRM integration",
      "90-day support via email",
    ],
    featured: true,
    badge: "Most Popular",
    cta: "Get Started →",
  },
  {
    tier: "Full Build",
    price: "$5,000",
    duration: "One-time",
    desc: "For firms that want the complete AI-native infrastructure.",
    includes: [
      "Everything in Foundation",
      "8–10 custom skills built",
      "Full knowledge base — IRS + all 50 states",
      "Complete workflow automation",
      "HubSpot CRM full integration",
      "90-day support + 2 live training sessions",
    ],
    featured: false,
    cta: "Get Started →",
  },
];

const audiences = [
  {
    title: "Solo CPAs & Bookkeepers",
    desc: "You're doing everything yourself. AI gives you the leverage of a full back office without the headcount.",
  },
  {
    title: "Small Firms (2–10 staff)",
    desc: "Your team spends hours on repetitive document work. Custom skills eliminate the work that shouldn't require a licensed professional.",
  },
  {
    title: "Firms Exploring AI",
    desc: "You've tried ChatGPT. You know there's something here. You need someone to show you how to build real systems, not just experiment with prompts.",
  },
];

const faqs = [
  {
    q: "Do I need any coding skills to use this system?",
    a: "No. The entire Selam CPA AI system was built by a CPA with no coding background. You direct the system in plain English — Claude Code handles all the technical execution. If we can build it, so can you.",
  },
  {
    q: "What AI tools are used?",
    a: "The system is built on Anthropic's Claude — specifically Claude Code for building and executing, and Claude Web for strategy and review. We also use Pinecone for the vector knowledge base and HubSpot for CRM integration. All tools have free or low-cost tiers to start.",
  },
  {
    q: "How long does the build take?",
    a: "The Assessment takes one week. The Foundation build takes two to three weeks. The Full Build takes four to six weeks depending on complexity and how quickly you can review and approve each component.",
  },
  {
    q: "Will this work for my practice area?",
    a: "Yes. The system is built around your specific services, clients, and workflows — not a generic template. Whether you focus on tax, bookkeeping, audit, or advisory, the skills are built for your actual work.",
  },
  {
    q: "What happens after the build is complete?",
    a: "You own everything. The code, the skills, the knowledge base, the CLAUDE.md. We provide 90-day support to fix issues and answer questions. After that, you can maintain and expand the system yourself — or hire us for additional builds.",
  },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-6 text-left font-semibold text-gray-900 hover:text-emerald-600 transition-colors"
      >
        <span>{q}</span>
        <span className={`text-emerald-500 ml-4 flex-shrink-0 text-xl transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && (
        <div className="px-6 pb-6">
          <p className="text-gray-500 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function AIConsulting() {
  return (
    <>
      <Helmet>
        <title>AI Consulting for Accounting Firms | Selam CPA — Build Your AI-Native Practice</title>
        <meta
          name="description"
          content="Selam CPA helps accounting firms and bookkeepers build custom AI systems using Claude — workflow automation, custom skills, knowledge bases, and CRM integration. No coding required. Starting at $500."
        />
        <meta
          name="keywords"
          content="AI consulting accounting firms, Claude AI accounting, AI workflow automation CPA firm, accounting AI implementation, bookkeeper AI tools"
        />
        <link rel="canonical" href="https://selamcpa.com/ai-consulting" />
      </Helmet>

      <Header />

      {/* HERO */}
      <section className="bg-[#0a0f1e] pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-6">
            For Accounting Firms &amp; Bookkeepers
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">You Built a Great Practice.</span>
            <br />
            <span className="text-white">Now Build the Infrastructure</span>
            <br />
            <span className="text-emerald-400">Behind It.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Selam CPA runs on a custom AI system built from scratch — no coding required.
            We help other accounting firms and bookkeepers build the same infrastructure:
            custom workflows, automated document generation, knowledge bases, and CRM integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors"
            >
              Book a Free Assessment →
            </a>
            <a
              href="#proof"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white hover:bg-white/10 font-semibold rounded-lg transition-colors"
            >
              See What We Built →
            </a>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section id="proof" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-emerald-600 text-sm font-medium tracking-widest uppercase mb-3">The Proof</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              We didn't just learn about AI. We built with it.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl">
              Selam CPA is an AI-native accounting firm built from day one on a custom Claude system.
              Here is exactly what we built — and what we can build for you.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#0a0f1e] rounded-xl p-6">
                <p className="text-5xl font-bold text-emerald-400 mb-2">{s.number}</p>
                <p className="text-white font-semibold mb-2">{s.label}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Capability cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((c) => (
              <div key={c.title} className="border border-gray-200 rounded-xl p-6 hover:border-emerald-400 hover:shadow-md transition-all">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-emerald-600 text-sm font-medium tracking-widest uppercase mb-3">The Process</p>
            <h2 className="text-4xl font-bold text-gray-900">How we build your AI system</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.n} className="relative">
                <p className="text-6xl font-bold text-emerald-100 mb-4 leading-none">{step.n}</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-emerald-600 text-sm font-medium tracking-widest uppercase mb-3">Investment</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Three ways to get started</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Every engagement starts with a conversation. Book a free call and we'll tell you
              honestly which tier makes sense.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => (
              <div
                key={plan.tier}
                className={`rounded-2xl p-8 flex flex-col ${
                  plan.featured
                    ? "border-2 border-emerald-500 relative shadow-lg"
                    : "border border-gray-200"
                }`}
              >
                {plan.featured && plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-emerald-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-500 mb-1">{plan.tier}</p>
                  <p className="text-4xl font-bold text-gray-900">{plan.price}</p>
                  <p className="text-gray-400 text-sm">{plan.duration}</p>
                </div>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{plan.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-gray-600">
                      <span className="text-emerald-500 flex-shrink-0 font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-colors text-sm ${
                    plan.featured
                      ? "bg-emerald-500 hover:bg-emerald-400 text-white"
                      : "border border-gray-300 text-gray-700 hover:border-emerald-400 hover:text-emerald-600"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm">
            All engagements include a discovery call before any work begins.
            If we're not the right fit, we'll tell you.
          </p>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="py-24 bg-[#0a0f1e] px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-3">Who This Is For</p>
            <h2 className="text-4xl font-bold text-white">
              Built for practitioners who are serious about efficiency.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {audiences.map((a) => (
              <div key={a.title} className="border border-white/10 rounded-xl p-8 hover:border-emerald-500/40 transition-colors">
                <h3 className="text-white font-semibold text-lg mb-3">{a.title}</h3>
                <p className="text-gray-400 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-emerald-600 text-sm font-medium tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-4xl font-bold text-gray-900">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <FAQ key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-[#0a0f1e] px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to build your AI-native practice?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Book a free 30-minute call. We'll walk through your current workflow, show you what's
            possible, and tell you honestly whether this is the right move for your firm.
          </p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-lg rounded-lg transition-colors"
          >
            Book a Free Discovery Call →
          </a>
          <p className="text-gray-500 text-sm mt-6">
            No commitment. No pitch. We'll tell you if it's not the right fit.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
