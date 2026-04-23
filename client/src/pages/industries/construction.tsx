import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";

const CALENDLY = "https://calendly.com/yber2001/30min";

const keyIssues = [
  { title: "Job Costing", desc: "Do you know which jobs made money and which ones didn't? Job costing tracks labor, materials, and overhead by project — the foundation of profitable construction management." },
  { title: "Percentage-of-Completion", desc: "Long-term contracts require revenue recognition based on completion percentage. Improper method can misstate income and create IRS issues." },
  { title: "Equipment Depreciation", desc: "Heavy equipment, vehicles, and tools are major capital assets. Section 179 and bonus depreciation can provide significant first-year deductions." },
  { title: "Subcontractor Classification", desc: "Construction companies commonly use subcontractors. Misclassifying employees as subs creates significant payroll tax exposure — we review your worker classification." },
  { title: "Retainage Accounting", desc: "Retainage withheld by general contractors affects your cash flow and revenue recognition. Proper accounting prevents overstated income." },
  { title: "Bonding & Financial Statements", desc: "Surety bonds require reviewed or audited financial statements showing adequate working capital. We prepare the statements bonding companies require." },
];

const services = [
  { title: "Tax Preparation", desc: "Contractor returns with proper method of accounting, equipment depreciation schedules, and subcontractor 1099 reconciliation." },
  { title: "Job Cost Bookkeeping", desc: "Project-level tracking of labor, materials, subcontractors, and overhead. Monthly job cost reports showing estimated vs. actual on every active project." },
  { title: "Equipment & Asset Management", desc: "Full depreciation schedules for all equipment. Section 179 and bonus depreciation analysis annually to optimize first-year deductions." },
  { title: "Bonding Financial Statements", desc: "Reviewed financial statements prepared to meet surety bonding requirements — working capital ratios, backlog schedules, and WIP schedules." },
];

const faqs = [
  { q: "What is job costing and why does it matter?", a: "Job costing tracks the actual cost of each project — labor, materials, subcontractors, and allocated overhead — against the estimated cost. Without job costing, you cannot know which jobs were profitable and which ones lost money. It is the most important financial tool in construction." },
  { q: "I use QuickBooks. Can you set up job costing in it?", a: "Yes. QuickBooks has job costing functionality that we can configure for your specific workflow. We set up your cost codes, link expenses to jobs, and produce job cost reports monthly." },
  { q: "Do I need reviewed financial statements for bonding?", a: "Most surety companies require at minimum compiled financial statements for smaller bonds, and reviewed statements for bonds above a certain threshold. The specific requirement depends on the bonding company and bond amount. We prepare both compilations and reviews." },
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

export default function Construction() {
  return (
    <>
      <Helmet>
        <title>CPA for Construction & Contractors | Selam CPA — Maryland Construction CPA</title>
        <meta name="description" content="Tax preparation, bookkeeping, and job costing for construction companies, contractors, and tradespeople in Maryland, DC, Virginia, and nationwide." />
        <meta name="keywords" content="CPA construction Maryland, contractor accounting DMV, job costing CPA Maryland, construction company tax Maryland, contractor bookkeeping DC Virginia, builder CPA Maryland" />
        <link rel="canonical" href="https://selamcpa.com/industries/construction" />
      </Helmet>
      <Header />

      <section className="bg-[#0a0f1e] pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-6">Construction &amp; Contractors</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Know your job costs.</span><br />
            <span className="text-emerald-400">Know your profit.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Job costing, percentage-of-completion accounting, and tax strategy for construction
            companies, contractors, and tradespeople who need to know which jobs actually made money.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">
            Book a Free Consultation →
          </a>
        </div>
      </section>

      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">Financial challenges in construction</h2>
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
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Services for construction businesses</h2>
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
          <h2 className="text-4xl font-bold text-white mb-6">Let's talk about your construction business.</h2>
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
