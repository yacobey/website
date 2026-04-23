import { Helmet } from "react-helmet";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ArrowRight, Calculator } from "lucide-react";

const calculators = [
  {
    category: "Business Structure",
    tools: [
      {
        name: "S-Corp Tax Savings Calculator",
        desc: "Compare sole proprietor vs. S-Corp tax liability side by side. See your exact savings using 2025 federal rates.",
        href: "/ai-tools",
        badge: "Most Popular",
      },
      {
        name: "Self-Employment Tax Calculator",
        desc: "Calculate your SE tax liability (15.3%) and the above-the-line deduction you can take on Form 1040.",
        href: "/ai-tools",
        badge: null,
      },
    ],
  },
  {
    category: "Tax Planning",
    tools: [
      {
        name: "Quarterly Estimated Tax Calculator",
        desc: "Calculate your Q1–Q4 federal and Maryland estimated tax payments. Avoid underpayment penalties.",
        href: "/ai-tools",
        badge: null,
      },
      {
        name: "Home Office Deduction Calculator",
        desc: "Actual vs. simplified method comparison. See which saves more based on your home size and expenses.",
        href: "/ai-tools",
        badge: null,
      },
      {
        name: "Mileage Deduction Calculator",
        desc: "2025 standard mileage rate: $0.70/mile. Calculate your business mileage deduction for the year.",
        href: "/ai-tools",
        badge: null,
      },
      {
        name: "Section 179 Expensing Calculator",
        desc: "First-year equipment and asset deduction. See how much of your 2025 purchases you can deduct immediately.",
        href: "/ai-tools",
        badge: null,
      },
    ],
  },
  {
    category: "Business Finance",
    tools: [
      {
        name: "Fractional CFO ROI Calculator",
        desc: "See how quickly a fractional CFO engagement pays for itself based on your revenue and current pain points.",
        href: "/ai-tools",
        badge: null,
      },
      {
        name: "Break-Even Analysis Calculator",
        desc: "How many units or client engagements do you need to cover your fixed costs? Know your number.",
        href: "/ai-tools",
        badge: null,
      },
      {
        name: "Cash Flow Forecast Calculator",
        desc: "Project your monthly cash position for the next 12 months based on revenue and expense assumptions.",
        href: "/ai-tools",
        badge: null,
      },
      {
        name: "Retirement Contribution Calculator",
        desc: "SEP-IRA, Solo 401(k), SIMPLE IRA — compare contribution limits and tax savings for self-employed.",
        href: "/ai-tools",
        badge: null,
      },
    ],
  },
];

const CALENDLY = "https://calendly.com/yber2001/30min";

export default function CalculatorsHub() {
  return (
    <>
      <Helmet>
        <title>Free Tax & Finance Calculators for Small Business | Selam CPA</title>
        <meta
          name="description"
          content="Free tax and financial calculators for small business owners — S-Corp savings, quarterly estimated tax, home office deduction, mileage, Section 179, and more. Built by Selam CPA, Maryland CPA firm."
        />
        <link rel="canonical" href="https://selamcpa.com/calculators" />
      </Helmet>

      <Header />

      <main className="bg-[#0a0f1e] min-h-screen">
        {/* Hero */}
        <section className="pt-24 pb-16 px-6 sm:px-10 lg:px-16 border-b border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-6">
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-xs font-semibold tracking-widest uppercase">
                Free Tools
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5">
              Tax & Finance Calculators
              <span className="block text-emerald-400 mt-1">Built for Business Owners</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Run the numbers before your next financial decision. No email required — just
              straight answers built on current federal and Maryland tax law.
            </p>
          </div>
        </section>

        {/* Calculator categories */}
        <section className="py-16 px-6 sm:px-10 lg:px-16">
          <div className="max-w-6xl mx-auto space-y-16">
            {calculators.map((group) => (
              <div key={group.category}>
                <h2 className="text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-6 border-b border-white/10 pb-3">
                  {group.category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {group.tools.map((tool) => (
                    <Link key={tool.name} href={tool.href}>
                      <div className="group relative bg-white/5 hover:bg-white/8 border border-white/10 hover:border-emerald-500/40 rounded-xl p-6 cursor-pointer transition-all duration-200">
                        {tool.badge && (
                          <span className="absolute top-4 right-4 text-[10px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full px-2 py-0.5">
                            {tool.badge}
                          </span>
                        )}
                        <h3 className="text-white font-semibold text-sm mb-2 pr-20 group-hover:text-emerald-300 transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{tool.desc}</p>
                        <div className="mt-4 flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                          Open calculator
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 sm:px-10 lg:px-16 border-t border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-slate-400 text-sm mb-2 uppercase tracking-widest font-semibold">
              Ready to act on the numbers?
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">
              Talk to a CPA about your results
            </h2>
            <p className="text-slate-400 mb-8">
              The calculator shows what's possible. A 30-minute call with Yacob shows you exactly
              how to get there — for your specific situation, entity, and state.
            </p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
            >
              Schedule a Free Discovery Call
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
