import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";

const CALENDLY = "https://calendly.com/yber2001/30min";

const keyIssues = [
  { title: "Trust Account Management", desc: "IOLTA and client trust accounts have strict bar rules. We ensure your books properly separate client funds from operating funds — critical for bar compliance." },
  { title: "Contingency Fee Timing", desc: "Contingency fees create irregular, large income events. Tax planning around settlement years prevents unexpected tax bills." },
  { title: "Partner & Associate Compensation", desc: "Equity partner draws, associate salaries, and profit distributions all have different tax treatment. Structure matters." },
  { title: "Business Development Costs", desc: "Meals, entertainment, bar dues, CLE, and marketing all have specific deductibility rules. We track them correctly." },
];

const services = [
  { title: "Tax Preparation", desc: "Individual returns for solo attorneys, S-Corp and partnership returns for firms. All legal-specific deductions — bar dues, CLE, malpractice insurance — captured." },
  { title: "Bookkeeping", desc: "Operating and trust account reconciliation. Monthly reports that show profitability by practice area or timekeeper." },
  { title: "Fractional CFO", desc: "Realization rate, revenue per attorney, overhead per matter — financial metrics that tell you how your practice is actually performing." },
  { title: "Tax Planning", desc: "Contingency fee planning, retirement contributions, and entity structure — proactive strategy for the income patterns unique to legal practice." },
];

const faqs = [
  { q: "Do you handle IOLTA trust account bookkeeping?", a: "We handle the accounting side of trust account management — ensuring your books properly reflect client funds held in trust separately from operating funds. Bar compliance rules vary by state; we work alongside your bar counsel guidance." },
  { q: "I had a large contingency fee settlement this year. What should I do?", a: "Contact us immediately. Large, irregular income events require proactive planning — retirement contributions, estimated tax payments, and potentially income averaging strategies. The earlier we engage, the more options you have." },
  { q: "Do you work with law firms outside Maryland?", a: "Yes. We serve solo attorneys and small firms in multiple states virtually. Multi-state practice creates multi-state tax obligations — we handle those regularly." },
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

export default function Legal() {
  return (
    <>
      <Helmet>
        <title>CPA for Law Firms & Legal Professionals | Selam CPA — Maryland Attorney CPA</title>
        <meta name="description" content="Tax preparation, bookkeeping, and financial advisory for law firms, solo attorneys, and legal professionals in Maryland, DC, Virginia, and nationwide." />
        <meta name="keywords" content="CPA law firm Maryland, attorney tax preparation DMV, law firm bookkeeping Maryland, legal professional CPA DC Virginia, solo attorney accounting Maryland" />
        <link rel="canonical" href="https://selamcpa.com/industries/legal" />
      </Helmet>
      <Header />

      <section className="bg-[#0a0f1e] pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-6">Legal &amp; Professional Services</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Your practice deserves</span><br />
            <span className="text-emerald-400">financial precision.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Tax and financial services for law firms, solo attorneys, consultants, and professional
            services firms who understand that getting the details right matters.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">
            Book a Free Consultation →
          </a>
        </div>
      </section>

      <section className="py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">What makes legal practice finances different</h2>
          <div className="grid sm:grid-cols-2 gap-6">
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
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Services for legal professionals</h2>
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
          <h2 className="text-4xl font-bold text-white mb-6">Let's talk about your firm's finances.</h2>
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
