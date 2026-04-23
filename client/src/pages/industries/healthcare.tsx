import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";

const CALENDLY = "https://calendly.com/yber2001/30min";

const practiceTypes = [
  { title: "Behavioral Health", desc: "Therapists, psychologists, counselors, and group practices — including insurance reimbursement reconciliation and credentialing expense tracking." },
  { title: "Physical Therapy", desc: "PT clinics, sports medicine, and rehabilitation practices — equipment depreciation, Medicare/Medicaid billing reconciliation." },
  { title: "Dental Offices", desc: "General and specialty dental practices — production vs. collection tracking, equipment financing, and associate compensation structures." },
  { title: "Medical Practices", desc: "Primary care and specialty practices — provider compensation models, malpractice insurance deductibility, and practice overhead analysis." },
  { title: "Mental Health Groups", desc: "Group practices with multiple providers — profit distribution, contractor vs. employee classification, and per-provider profitability." },
  { title: "Allied Health", desc: "Occupational therapy, speech pathology, chiropractic — similar financial structure to PT with specialty-specific considerations." },
];

const commonIssues = [
  { title: "Insurance Reimbursement Lag", desc: "Collections often trail services by 30–90 days. Cash flow management requires forecasting based on expected collections, not billed amounts." },
  { title: "Provider Compensation Structure", desc: "Salary vs. production-based compensation, associate agreements, and partnership buy-ins all have significant tax implications that require proactive planning." },
  { title: "Equipment & Technology Costs", desc: "Medical equipment, EHR systems, and facility improvements are major capital expenditures. Depreciation strategy — Section 179, bonus depreciation, or MACRS — affects your tax bill significantly." },
  { title: "Entity Structure", desc: "Many practices operate as S-Corps or professional LLCs. The right structure depends on your ownership model, number of providers, and state licensing requirements." },
];

const services = [
  { title: "Tax Preparation", desc: "Form 1040, Schedule C, Form 1120-S, or Form 1065 depending on your entity. All healthcare-specific deductions captured." },
  { title: "Bookkeeping", desc: "Monthly reconciliation of practice management software against bank accounts. Collections, refunds, and insurance adjustments all tracked." },
  { title: "Fractional CFO", desc: "Monthly financial reports with provider-level profitability, overhead ratio, and collections performance. Decisions made with data." },
  { title: "Entity & Compensation Planning", desc: "S-Corp election analysis, reasonable compensation review, and practice ownership structure — planned proactively, not reactively." },
];

const faqs = [
  { q: "Can you work with my practice management software?", a: "We work with the financial data exported from most practice management systems — Jane, TherapyNotes, SimplePractice, Kareo, and others. We reconcile that data against your bank accounts monthly." },
  { q: "Do you understand insurance reimbursement accounting?", a: "Yes. We understand the difference between billed charges, contractual adjustments, and net collections — and we make sure your books reflect actual revenue, not billed amounts." },
  { q: "I am a solo practitioner. Is Selam CPA the right fit?", a: "Yes. Many of our healthcare clients are solo practitioners — therapists, dentists, and physicians who want accurate books and proactive tax planning without paying for more than they need." },
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

export default function Healthcare() {
  return (
    <>
      <Helmet>
        <title>CPA for Healthcare Practices | Selam CPA — Maryland & DMV Medical CPA</title>
        <meta name="description" content="Tax preparation, bookkeeping, and fractional CFO services for medical practices, behavioral health, physical therapy, and dental offices in Maryland, DC, Virginia, and nationwide." />
        <meta name="keywords" content="CPA healthcare practice Maryland, medical practice accounting DMV, behavioral health CPA Maryland, dental office CPA, physical therapy accounting Maryland" />
        <link rel="canonical" href="https://selamcpa.com/industries/healthcare" />
      </Helmet>
      <Header />

      <section className="bg-[#0a0f1e] pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-6">Healthcare &amp; Medical Practices</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Financial clarity for</span><br />
            <span className="text-emerald-400">practice owners.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Tax preparation, bookkeeping, and fractional CFO services built around the unique financial
            structure of healthcare practices — from solo practitioners to multi-provider groups.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">
            Book a Free Consultation →
          </a>
        </div>
      </section>

      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">We work with all healthcare practice types</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceTypes.map((item) => (
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
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Financial challenges we see in healthcare practices</h2>
          <div className="space-y-6">
            {commonIssues.map((item) => (
              <div key={item.title} className="border-l-4 border-emerald-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0a0f1e] px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">Services for healthcare practices</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((item) => (
              <div key={item.title} className="border border-white/10 rounded-xl p-6 hover:border-emerald-500/40 transition-colors">
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
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
          <h2 className="text-4xl font-bold text-white mb-6">Let's talk about your practice finances.</h2>
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
