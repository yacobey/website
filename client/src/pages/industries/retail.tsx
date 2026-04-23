import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";

const CALENDLY = "https://calendly.com/yber2001/30min";

const keyIssues = [
  { title: "Inventory Accounting", desc: "FIFO, LIFO, or weighted average — the inventory method you choose affects your cost of goods sold and taxable income. We help you choose and maintain it consistently." },
  { title: "Sales Tax Nexus", desc: "Selling online? You may have sales tax obligations in states where you have no physical presence. Post-Wayfair nexus rules apply to most e-commerce sellers above certain thresholds." },
  { title: "COGS vs. Operating Expenses", desc: "Correctly separating cost of goods sold from operating expenses is critical for accurate gross margin reporting and tax return preparation." },
  { title: "Platform Fee Reconciliation", desc: "Shopify, Amazon, Etsy, and other platforms deduct fees before remitting. We reconcile platform deposits against gross sales and properly account for fees." },
  { title: "Returns & Refunds", desc: "High return rates create accounting complexity. We track returns, restock costs, and net revenue accurately." },
  { title: "Shrinkage & Write-offs", desc: "Inventory loss from theft, damage, or obsolescence must be tracked and written off properly. We maintain the records needed to support these deductions." },
];

const services = [
  { title: "Tax Preparation", desc: "Schedule C or corporate returns with proper COGS calculation, inventory valuation, and platform income reconciliation." },
  { title: "Bookkeeping", desc: "Monthly reconciliation of Shopify, Amazon, Square, or other platforms against bank deposits. Inventory and COGS tracked throughout the year." },
  { title: "Sales Tax Compliance", desc: "Nexus analysis, registration in required states, and ongoing sales tax filing support — or referral to a sales tax specialist for complex multi-state situations." },
  { title: "Cash Flow Management", desc: "Retail cash flow is seasonal. We build 12-month forecasts that account for your peak seasons, inventory purchasing cycles, and payment terms." },
];

const faqs = [
  { q: "I sell on Amazon, Shopify, and Etsy. Can you handle all three?", a: "Yes. We reconcile all three platforms against your bank accounts and produce a single, accurate set of financials. Each platform has different fee structures and payout timing — we handle the complexity." },
  { q: "Do I need to collect sales tax in other states?", a: "After the Supreme Court's South Dakota v. Wayfair decision, most states can require out-of-state sellers to collect sales tax once they exceed an economic nexus threshold — typically $100,000 in sales or 200 transactions. We perform a nexus analysis to identify your obligations." },
  { q: "How do I value my inventory at year end?", a: "Inventory is valued at cost — typically using FIFO or weighted average cost. If you have slow-moving or obsolete inventory, a lower of cost or net realizable value adjustment may be appropriate. We help you perform the year-end count and valuation." },
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

export default function Retail() {
  return (
    <>
      <Helmet>
        <title>CPA for Retail & E-Commerce Businesses | Selam CPA — Maryland Retail CPA</title>
        <meta name="description" content="Tax preparation, bookkeeping, and accounting for retail stores and e-commerce businesses in Maryland, DC, Virginia, and nationwide. Inventory, sales tax, and Shopify accounting." />
        <meta name="keywords" content="CPA retail Maryland, e-commerce accounting Maryland, Shopify CPA Maryland, Amazon seller CPA DMV, sales tax nexus Maryland, inventory accounting small business" />
        <link rel="canonical" href="https://selamcpa.com/industries/retail" />
      </Helmet>
      <Header />

      <section className="bg-[#0a0f1e] pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-6">Retail &amp; E-Commerce</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Your margins are tight.</span><br />
            <span className="text-emerald-400">Your accounting should be tighter.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Inventory tracking, sales tax compliance, and accurate bookkeeping for retail stores and
            e-commerce businesses that need to know exactly where every dollar goes.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">
            Book a Free Consultation →
          </a>
        </div>
      </section>

      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">Financial challenges in retail and e-commerce</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyIssues.map((item) => (
              <div key={item.title} className="border border-gray-200 rounded-xl p-6 hover:border-emerald-400 hover:shadow-md transition-all">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Services for retail and e-commerce businesses</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-400 transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-emerald-600 text-sm font-medium tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-4xl font-bold text-gray-900">Common Questions</h2>
          </div>
          <div className="space-y-4">{faqs.map((faq) => <FAQ key={faq.q} q={faq.q} a={faq.a} />)}</div>
        </div>
      </section>

      <section className="py-24 bg-[#0a0f1e] px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Let's get your retail finances in order.</h2>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-lg rounded-lg transition-colors">
            Book a Free Consultation →
          </a>
          <p className="text-gray-500 text-sm mt-6">Serving Laurel MD · Columbia MD · Baltimore · DC · Virginia · All 50 States Virtually</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
