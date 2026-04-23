import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";

const CALENDLY = "https://calendly.com/yber2001/30min";

const whatWeDo = [
  { title: "Transaction Categorization", desc: "Every transaction coded correctly to your chart of accounts — expenses, income, assets, and liabilities all in their proper place." },
  { title: "Bank & Credit Card Reconciliation", desc: "Monthly reconciliation of all accounts. Nothing falls through the cracks, no phantom transactions, no unexplained variances." },
  { title: "Monthly Financial Reports", desc: "Income statement, balance sheet, and cash flow statement — delivered monthly in plain English with a brief narrative explaining what changed and why." },
  { title: "QuickBooks & Xero Management", desc: "We work in your existing software or set it up from scratch. QuickBooks Online, QuickBooks Desktop, and Xero all supported." },
];

const plans = [
  {
    tier: "Monthly Bookkeeping",
    bestFor: "Active businesses with regular transactions",
    includes: ["Transaction coding", "Reconciliation", "Monthly P&L and balance sheet", "CPA review of entries"],
    turnaround: "Reports delivered by the 15th of each month",
    featured: false,
  },
  {
    tier: "Quarterly Bookkeeping",
    bestFor: "Businesses with lower transaction volume or seasonal activity",
    includes: ["Everything in monthly, delivered quarterly", "Year-end prep included"],
    turnaround: "Reports within 2 weeks of quarter end",
    featured: true,
  },
  {
    tier: "Annual / Catch-Up",
    bestFor: "Getting current before tax season or a new engagement",
    includes: ["Full-year transaction coding", "Reconciliation", "Financial statements"],
    turnaround: "Quoted per project",
    featured: false,
  },
];

const whyItMatters = [
  { icon: "⬡", title: "Loan & Credit Applications", desc: "Lenders require accurate financial statements. Messy books mean delayed approvals or worse — declined applications." },
  { icon: "⬡", title: "Tax Preparation", desc: "Clean books make tax prep faster and cheaper. Disorganized records mean more CPA time — which means higher fees." },
  { icon: "⬡", title: "Business Decisions", desc: "You cannot make good decisions about hiring, pricing, or expansion without knowing your actual numbers. Clean books give you clarity." },
];

const faqs = [
  { q: "What software do you use for bookkeeping?", a: "We primarily work in QuickBooks Online and Xero. If you use a different platform, let us know and we will discuss compatibility. We can also set up a new QuickBooks account if you are starting fresh." },
  { q: "Do I need to send you documents every month?", a: "Most clients connect their bank and credit card accounts to QuickBooks, which automatically imports transactions. We then categorize and reconcile from there. For clients who prefer not to connect accounts, we work from monthly statements you upload to our secure portal." },
  { q: "What if my books are a mess?", a: "That is exactly what our catch-up bookkeeping service is for. We have cleaned up books that were two or three years behind. We will give you a fixed-fee quote for the catch-up work before we begin." },
  { q: "Do you provide bookkeeping for clients outside Maryland?", a: "Yes. All of our bookkeeping engagements are available virtually. We work with clients across all 50 states entirely through secure online collaboration." },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center p-6 text-left font-semibold text-gray-900 hover:text-emerald-600 transition-colors">
        <span>{q}</span>
        <span className={`text-emerald-500 ml-4 flex-shrink-0 text-xl transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && <div className="px-6 pb-6"><p className="text-gray-500 leading-relaxed">{a}</p></div>}
    </div>
  );
}

export default function Bookkeeping() {
  return (
    <>
      <Helmet>
        <title>Bookkeeping & Accounting Services | Selam CPA — Maryland Small Business CPA</title>
        <meta name="description" content="Monthly, quarterly, and annual bookkeeping for small businesses in Laurel MD, DMV region, and all 50 states virtually. Clean books, clear decisions. Yacob Tewelde, CPA, FCCA." />
        <meta name="keywords" content="bookkeeping Laurel Maryland, small business bookkeeping DMV, monthly bookkeeping CPA Maryland, QuickBooks bookkeeping Maryland, accounting services small business DC Virginia" />
        <link rel="canonical" href="https://selamcpa.com/bookkeeping" />
      </Helmet>
      <Header />

      {/* HERO */}
      <section className="bg-[#0a0f1e] pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-6">Bookkeeping &amp; Accounting</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Clean books.</span><br />
            <span className="text-emerald-400">Clear decisions.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Monthly, quarterly, or annual bookkeeping for small businesses that want accurate records,
            timely reports, and a CPA who actually understands what the numbers mean.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">
            Book a Free Consultation →
          </a>
          <p className="text-gray-500 text-sm mt-4">Serving Laurel MD · Columbia MD · Baltimore · DC · Virginia · All 50 States Virtually</p>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Bookkeeping that goes beyond data entry</h2>
            <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
              Most bookkeeping services categorize transactions and call it done.
              We treat your books as the foundation for every financial decision you make —
              which means accuracy matters, but so does context.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {whatWeDo.map((item) => (
              <div key={item.title} className="border border-gray-200 rounded-xl p-6 hover:border-emerald-400 hover:shadow-md transition-all">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT OPTIONS */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">Choose the level of support you need</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.tier} className={`rounded-2xl p-8 flex flex-col ${plan.featured ? "border-2 border-emerald-500 bg-white shadow-lg" : "border border-gray-200 bg-white"}`}>
                <h3 className={`text-xl font-bold mb-2 ${plan.featured ? "text-emerald-600" : "text-gray-900"}`}>{plan.tier}</h3>
                <p className="text-gray-500 text-sm mb-4"><span className="font-medium text-gray-700">Best for:</span> {plan.bestFor}</p>
                <ul className="space-y-2 mb-4 flex-1">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-gray-600">
                      <span className="text-emerald-500 flex-shrink-0">✓</span>{item}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-400 text-xs mb-6"><span className="font-medium">Turnaround:</span> {plan.turnaround}</p>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm transition-colors ${plan.featured ? "bg-emerald-500 hover:bg-emerald-400 text-white" : "border border-gray-300 text-gray-700 hover:border-emerald-400 hover:text-emerald-600"}`}>
                  Get a Quote →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="py-24 bg-[#0a0f1e] px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-16">Why your books matter beyond tax season</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyItMatters.map((item) => (
              <div key={item.title}>
                <div className="w-8 h-8 rounded-full border border-emerald-500/40 flex items-center justify-center mb-4">
                  <span className="text-emerald-400 text-xs">✓</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
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
            {faqs.map((faq) => <FAQ key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-[#0a0f1e] px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's get your books in order.</h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Book a free 30-minute call. We will review your current situation and give you a fixed-fee quote.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-lg rounded-lg transition-colors">
            Book a Free Consultation →
          </a>
          <p className="text-gray-500 text-sm mt-6">Serving Laurel MD · Columbia MD · Baltimore · Washington DC · Northern Virginia · All 50 States Virtually</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
