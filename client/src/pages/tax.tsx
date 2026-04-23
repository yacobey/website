import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";

const CALENDLY = "https://calendly.com/yber2001/30min";

const included = [
  { title: "Individual Returns (Form 1040)", desc: "Federal and state returns for W-2 employees, self-employed individuals, investors, and retirees. All schedules included." },
  { title: "S-Corporation (Form 1120-S)", desc: "S-Corp returns with Schedule K-1 preparation for all shareholders. Reasonable compensation review included." },
  { title: "LLC & Partnership (Form 1065)", desc: "Multi-member LLC and partnership returns with K-1s for all partners. Basis tracking available." },
  { title: "C-Corporation (Form 1120)", desc: "Corporate returns for C-Corps of all sizes. Dividends, retained earnings, and NOL carryforward management." },
  { title: "Tax Planning & Strategy", desc: "Year-round planning — S-Corp elections, entity selection, retirement contributions, estimated taxes, and multi-year projections." },
  { title: "IRS & State Notice Response", desc: "Received a notice? We draft responses to CP2000, audit letters, balance-due notices, and more. Representation available separately." },
];

const whoWeServe = [
  { title: "Individuals & Families", desc: "W-2 earners, retirees, investors, rental property owners, and anyone with a complex return." },
  { title: "Small Business Owners", desc: "Sole proprietors, single-member LLCs, S-Corps, and partnerships — we know your forms." },
  { title: "Self-Employed & Freelancers", desc: "Schedule C, SE tax, quarterly estimates, home office, vehicle — we handle it all." },
  { title: "Multi-State Filers", desc: "Work in multiple states? Live in Maryland but work in DC? We handle multi-state returns regularly." },
];

const deadlines = [
  { form: "Individual (Form 1040)", original: "April 15, 2026", extended: "October 15, 2026" },
  { form: "S-Corporation (Form 1120-S)", original: "March 15, 2026", extended: "September 15, 2026" },
  { form: "Partnership (Form 1065)", original: "March 15, 2026", extended: "September 15, 2026" },
  { form: "C-Corporation (Form 1120)", original: "April 15, 2026", extended: "October 15, 2026" },
  { form: "Estimated Tax (Q1 2026)", original: "April 15, 2026", extended: "—" },
];

const faqs = [
  { q: "How do I send you my tax documents?", a: "We use a secure client portal for document exchange. Once your engagement is confirmed, you will receive a link to upload your documents. We also accept documents via encrypted email or in person at our Laurel, MD office." },
  { q: "Do you prepare taxes for clients outside Maryland?", a: "Yes. We prepare federal and state returns for clients in all 50 states virtually. Most of our workflow is designed for remote collaboration — document upload, secure review, and e-signature — so location is not a barrier." },
  { q: "What if I receive an IRS notice after my return is filed?", a: "If we prepared your return and you receive a notice related to our work, we will respond at no additional charge for simple correspondence. Complex audit representation is available as a separate engagement." },
  { q: "Can you help me reduce what I owe next year?", a: "Yes — that is what tax planning is for. We offer year-round planning engagements that focus on reducing your tax liability through legal strategies: entity structure, retirement contributions, timing of income and deductions, and more." },
  { q: "What is your fee for tax preparation?", a: "Fees depend on the complexity of your return. Individual returns start at $350. S-Corp returns (Form 1120-S) start at $800. We provide a fixed-fee quote before beginning any work — no surprises." },
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

export default function Tax() {
  return (
    <>
      <Helmet>
        <title>Tax Preparation & Tax Planning | Selam CPA — Maryland CPA Serving DMV & Nationwide</title>
        <meta name="description" content="Professional tax preparation for individuals, S-Corps, LLCs, and partnerships in Laurel MD, DMV region, and all 50 states virtually. Yacob Tewelde, CPA, FCCA." />
        <meta name="keywords" content="tax preparation Laurel Maryland, CPA tax preparation DMV, S-Corp tax Maryland, LLC tax preparation DC Virginia, tax planning small business Maryland" />
        <link rel="canonical" href="https://selamcpa.com/tax" />
      </Helmet>
      <Header />

      {/* HERO */}
      <section className="bg-[#0a0f1e] pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-6">Tax Preparation &amp; Planning</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Your taxes done right.</span><br />
            <span className="text-emerald-400">Your tax burden reduced.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Federal and state returns for individuals, S-Corps, LLCs, partnerships, and C-Corps —
            prepared accurately, filed on time, and planned strategically so next year is better than this one.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">
            Book a Free Consultation →
          </a>
          <p className="text-gray-500 text-sm mt-4">Serving Laurel MD · Columbia MD · Baltimore · DC · Virginia · All 50 States Virtually</p>
        </div>
      </section>

      {/* SERVICES INCLUDED */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">What's included in every tax engagement</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {included.map((item) => (
              <div key={item.title} className="border border-gray-200 rounded-xl p-6 hover:border-emerald-400 hover:shadow-md transition-all">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">Who we prepare taxes for</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoWeServe.map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-400 transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KEY DATES */}
      <section className="py-24 bg-[#0a0f1e] px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">2025 Tax Filing Deadlines</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-emerald-400 text-sm font-medium pb-4 pr-8">Form</th>
                  <th className="text-left text-emerald-400 text-sm font-medium pb-4 pr-8">Original Deadline</th>
                  <th className="text-left text-emerald-400 text-sm font-medium pb-4">Extended Deadline</th>
                </tr>
              </thead>
              <tbody>
                {deadlines.map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="text-white py-4 pr-8 text-sm">{row.form}</td>
                    <td className="text-gray-300 py-4 pr-8 text-sm">{row.original}</td>
                    <td className="text-gray-300 py-4 text-sm">{row.extended}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-sm mt-8 leading-relaxed">
            Extensions extend the filing deadline, not the payment deadline.
            Taxes owed are due by the original deadline regardless of extension.
          </p>
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to get your taxes off your plate?</h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Book a free 30-minute call. We'll review your situation and give you a fixed-fee quote before any work begins.
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
