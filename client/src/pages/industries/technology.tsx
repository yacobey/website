import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";

const CALENDLY = "https://calendly.com/yber2001/30min";

const keyIssues = [
  { title: "R&D Tax Credit", desc: "Section 41 R&D tax credits can significantly offset your tax liability. Software development, new product development, and certain engineering activities qualify. We identify and document eligible activities." },
  { title: "Stock & Equity Compensation", desc: "ISO vs. NSO options, 83(b) elections, RSU vesting, and QSBS exclusion — equity compensation is complex and the timing of elections matters enormously." },
  { title: "Revenue Recognition", desc: "SaaS companies must recognize revenue over the subscription period, not at billing. Proper ASC 606 treatment affects your financial statements and investor reporting." },
  { title: "Contractor Classification", desc: "Tech companies commonly engage international contractors. Misclassifying employees as contractors creates significant tax exposure — we review your worker classification." },
  { title: "Section 174 R&D Capitalization", desc: "Since 2022, domestic R&D costs must be amortized over 5 years rather than expensed immediately. This change significantly increases taxable income for software companies — planning is critical." },
  { title: "Delaware C-Corp vs. Maryland LLC", desc: "Many funded startups are Delaware C-Corps. If you have one, your tax obligations span multiple states. We handle multi-state compliance for both incorporated and pass-through entities." },
];

const services = [
  { title: "Tax Preparation", desc: "C-Corp, S-Corp, and LLC returns with R&D credit documentation, equity compensation reporting, and multi-state apportionment." },
  { title: "Bookkeeping", desc: "Revenue recognition tracking, deferred revenue schedules, SaaS metrics (MRR, ARR, churn) integrated into your monthly reports." },
  { title: "Fractional CFO", desc: "Runway analysis, burn rate tracking, investor reporting packages, and board-ready financial statements. Built for the pace of a startup." },
  { title: "R&D Tax Credit Studies", desc: "Documented R&D credit analysis identifying eligible activities, employee time allocation, and contractor costs — ready for IRS scrutiny." },
];

const faqs = [
  { q: "We are pre-revenue. Do we need a CPA?", a: "Yes — especially if you have taken investment or are planning to. Clean books from day one make future fundraising, due diligence, and tax compliance significantly easier and cheaper." },
  { q: "What is the R&D tax credit and do we qualify?", a: "The R&D tax credit under Section 41 provides a credit of up to 20% of qualified research expenses above a base amount. Software development for a new or improved product or process generally qualifies. We identify eligible activities and document them properly." },
  { q: "We have employees in multiple states. How does that affect our taxes?", a: "Each state where you have employees or significant business activity may create a tax filing obligation — called nexus. We identify your obligations and manage multi-state compliance." },
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

export default function Technology() {
  return (
    <>
      <Helmet>
        <title>CPA for Tech Startups & SaaS Companies | Selam CPA — Maryland Tech CPA</title>
        <meta name="description" content="Tax preparation, bookkeeping, and fractional CFO services for technology companies, SaaS startups, and software businesses in Maryland, DC, Virginia, and nationwide." />
        <meta name="keywords" content="CPA tech startup Maryland, SaaS accounting DMV, technology company CPA Maryland, software startup tax Maryland, R&D tax credit Maryland, startup CPA DC Virginia" />
        <link rel="canonical" href="https://selamcpa.com/industries/technology" />
      </Helmet>
      <Header />

      <section className="bg-[#0a0f1e] pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-6">Technology &amp; SaaS</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Built for founders</span><br />
            <span className="text-emerald-400">who move fast.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Tax strategy, bookkeeping, and CFO-level financial support for technology companies and SaaS
            businesses — from pre-revenue startup to Series A and beyond.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">
            Book a Free Consultation →
          </a>
        </div>
      </section>

      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">Financial issues unique to technology companies</h2>
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
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Services for technology companies</h2>
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
          <h2 className="text-4xl font-bold text-white mb-6">Let's talk about your company's financial infrastructure.</h2>
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
