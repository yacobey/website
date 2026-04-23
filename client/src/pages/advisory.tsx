import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";

const CALENDLY = "https://calendly.com/yber2001/30min";

const cfoServices = [
  { title: "Cash Flow Forecasting", desc: "12-month rolling cash flow model updated monthly. Know what's coming before it arrives — not after." },
  { title: "Budget vs. Actual Analysis", desc: "Monthly comparison of actual results against budget. Variance explained in plain English, action items identified." },
  { title: "KPI Dashboard", desc: "3–6 key performance indicators tracked monthly — specific to your business, not generic accounting metrics." },
  { title: "Management Reports", desc: "Monthly narrative report explaining what happened, why it matters, and what to do about it. Written for a business owner, not an accountant." },
  { title: "Tax Strategy Coordination", desc: "Fractional CFO and tax planning working together — timing of income and expenses, entity structure, distributions, and year-end decisions coordinated proactively." },
  { title: "Strategic Advisory", desc: "Pricing decisions, hiring analysis, expansion planning, loan evaluation — financial clarity on the decisions that matter most." },
];

const triggers = [
  "Revenue above $500K and growing fast",
  "Making major decisions (hiring, expansion, equipment) without financial clarity",
  "Cash flow is unpredictable — good months and bad months with no clear pattern",
  "Preparing to seek a loan, line of credit, or outside investment",
  "Tax bill surprises you every year — no planning, just reaction",
  "Your bookkeeper gives you reports but cannot tell you what they mean",
];

const taxStrategies = [
  { title: "S-Corp Election Analysis", desc: "Is S-Corp status right for your LLC? We run the numbers, assess the administrative cost, and give you a definitive recommendation." },
  { title: "Entity Structure Review", desc: "Sole prop, LLC, S-Corp, C-Corp — the right structure depends on your income, goals, and risk tolerance. We review yours annually." },
  { title: "Retirement Plan Strategy", desc: "SEP-IRA, Solo 401(k), SIMPLE IRA — the right plan depends on your income and whether you have employees. We help you choose and implement." },
  { title: "Year-End Tax Planning", desc: "October through December is when most tax-saving moves must be made. We plan proactively so you're not scrambling in April." },
];

const faqs = [
  { q: "How is a Fractional CFO different from a bookkeeper?", a: "A bookkeeper records what happened. A CFO tells you what it means and what to do about it. Bookkeeping is historical. CFO work is forward-looking — forecasting, planning, and strategic advice." },
  { q: "How much does Fractional CFO service cost?", a: "Fractional CFO engagements are priced based on scope and frequency of deliverables. Most small business engagements range from $800 to $2,500 per month. We provide a fixed-fee proposal before beginning any work." },
  { q: "Do I need bookkeeping in place before starting a CFO engagement?", a: "Yes. CFO work requires accurate financial data. If your books are not current, we will recommend a catch-up bookkeeping engagement first — or we can provide both services together." },
  { q: "Can you help me prepare for a bank loan?", a: "Yes. We prepare loan packages including financial statements, projections, and narrative summaries that lenders require. We also review your financials before submission to identify and address any red flags." },
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

export default function Advisory() {
  return (
    <>
      <Helmet>
        <title>Fractional CFO & Tax Advisory Services | Selam CPA — Maryland Small Business CFO</title>
        <meta name="description" content="Fractional CFO services for small businesses in Maryland and nationwide. Cash flow forecasting, KPI dashboards, tax strategy, and CFO-level advisory at a fraction of the cost." />
        <meta name="keywords" content="fractional CFO Maryland, fractional CFO small business DMV, outsourced CFO Maryland, tax advisory Maryland, tax strategy small business, CFO services Laurel MD" />
        <link rel="canonical" href="https://selamcpa.com/advisory" />
      </Helmet>
      <Header />

      {/* HERO */}
      <section className="bg-[#0a0f1e] pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-6">Fractional CFO &amp; Tax Advisory</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">CFO-level thinking.</span><br />
            <span className="text-emerald-400">Without the CFO salary.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Strategic financial leadership for small businesses that are growing beyond the limits of
            basic bookkeeping but aren't ready — or don't need — a full-time CFO.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">
            Book a Free Consultation →
          </a>
          <p className="text-gray-500 text-sm mt-4">Serving Laurel MD · Columbia MD · Baltimore · DC · Virginia · All 50 States Virtually</p>
        </div>
      </section>

      {/* WHAT A FRACTIONAL CFO DOES */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What we do as your Fractional CFO</h2>
            <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
              A full-time CFO costs $150,000–$300,000 per year. A Fractional CFO gives you the same
              strategic thinking on a part-time basis — typically for a fraction of that cost.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cfoServices.map((item) => (
              <div key={item.title} className="border border-gray-200 rounded-xl p-6 hover:border-emerald-400 hover:shadow-md transition-all">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IS THIS RIGHT FOR YOU */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Is a Fractional CFO right for your business?</h2>
          <p className="text-gray-500 text-lg mb-10">Most small businesses need Fractional CFO services when they hit one of these inflection points:</p>
          <div className="space-y-4">
            {triggers.map((trigger) => (
              <div key={trigger} className="flex gap-3 items-start bg-white border border-gray-200 rounded-xl p-5">
                <span className="text-emerald-500 font-bold flex-shrink-0 mt-0.5">✓</span>
                <p className="text-gray-700">{trigger}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TAX ADVISORY */}
      <section className="py-24 bg-[#0a0f1e] px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Tax Strategy &amp; Advisory</h2>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
              Tax planning is not a once-a-year conversation. It is an ongoing strategy that compounds
              over time — and the earlier in the year you start, the more options you have.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {taxStrategies.map((item) => (
              <div key={item.title} className="border-l-4 border-emerald-500 pl-6 py-2">
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready for a financial strategy, not just a tax return?</h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Book a free 30-minute call. We will tell you whether Fractional CFO services make sense for your stage of growth.
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
