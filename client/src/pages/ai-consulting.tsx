import { Helmet } from "react-helmet";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ArrowRight, Bot, BarChart3, FileText, Users, CheckCircle } from "lucide-react";

const CALENDLY = "https://calendly.com/yber2001/30min";

const services = [
  {
    icon: Bot,
    title: "AI Workflow Automation",
    desc: "Automate reconciliations, data entry, and client onboarding using AI tools that integrate with QuickBooks, Xero, and your existing stack.",
  },
  {
    icon: BarChart3,
    title: "AI-Powered Financial Analysis",
    desc: "Deploy large language models and GPT-based tools to surface anomalies, generate management reports, and speed up month-end close.",
  },
  {
    icon: FileText,
    title: "Document Intelligence",
    desc: "Extract, classify, and process invoices, contracts, and tax documents automatically — reducing manual review time by 60–80%.",
  },
  {
    icon: Users,
    title: "Staff & Training",
    desc: "Train your team on AI tools specific to accounting and finance — prompt engineering, AI audit trails, and compliance guardrails.",
  },
];

const outcomes = [
  "Month-end close time reduced from days to hours",
  "Automated client bookkeeping review and exception flagging",
  "AI-drafted tax memos and engagement letters",
  "Real-time cash flow dashboards powered by AI",
  "Scalable firm operations without adding headcount",
];

export default function AIConsulting() {
  return (
    <>
      <Helmet>
        <title>AI Consulting for Accounting Firms | Selam CPA — DMV Region</title>
        <meta
          name="description"
          content="AI consulting for CPA firms and accounting practices. Automate workflows, speed up month-end close, and scale your firm without adding headcount. Serving DMV and all 50 states."
        />
        <link rel="canonical" href="https://selamcpa.com/ai-consulting" />
      </Helmet>

      <Header />

      <main className="bg-[#0a0f1e] min-h-screen">
        {/* Hero */}
        <section className="pt-24 pb-20 px-6 sm:px-10 lg:px-16 border-b border-white/10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-6">
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-xs font-semibold tracking-widest uppercase">
                AI for Accounting Firms
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
              Your Firm Is Leaving Money on the Table.
              <span className="block text-emerald-400 mt-2">AI Can Fix That.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
              Selam CPA helps accounting firms implement AI workflows that cut manual work, accelerate close cycles,
              and let your team focus on high-value advisory work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 text-base"
              >
                Book a Free Strategy Call
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/calculators">
                <a className="inline-flex items-center justify-center gap-2 text-slate-300 hover:text-white font-medium px-8 py-4 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-200 text-base">
                  Try Our Calculators
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-6 sm:px-10 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-4">What We Do</p>
            <h2 className="text-3xl font-bold text-white mb-12">
              AI Implementation Services for CPA Firms
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((s) => (
                <div key={s.title} className="bg-white/5 border border-white/10 rounded-xl p-7 hover:border-emerald-500/30 transition-colors">
                  <s.icon className="w-7 h-7 text-emerald-400 mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="py-20 px-6 sm:px-10 lg:px-16 border-t border-white/10 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-4">Outcomes</p>
            <h2 className="text-3xl font-bold text-white mb-10">What Firms Gain</h2>
            <ul className="space-y-4">
              {outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Who it's for */}
        <section className="py-20 px-6 sm:px-10 lg:px-16 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-4">Ideal Clients</p>
            <h2 className="text-3xl font-bold text-white mb-6">Built for Firms That Are Serious About Scale</h2>
            <p className="text-slate-400 leading-relaxed mb-8 text-lg">
              We work with small-to-mid-size CPA firms, bookkeeping practices, and fractional CFO firms that
              want to implement AI without the learning curve — and without hiring a full-time tech team.
            </p>
            <div className="grid sm:grid-cols-3 gap-5">
              {["Solo & Small Firms (1–10 staff)", "Mid-Size Practices (10–50 staff)", "Fractional CFO & Advisory Firms"].map((t) => (
                <div key={t} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                  <p className="text-white font-medium text-sm">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 sm:px-10 lg:px-16 border-t border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-slate-400 text-sm mb-2 uppercase tracking-widest font-semibold">
              Ready to modernize your firm?
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">
              Let's talk about what AI can do for your practice
            </h2>
            <p className="text-slate-400 mb-8">
              30 minutes. No obligation. We'll identify the highest-ROI AI implementation for your current workflow.
            </p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
            >
              Book a Free Strategy Call
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-slate-500 text-sm mt-4">
              Serving Laurel MD · DMV Region · All 50 States (Virtual)
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
