import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";

const CALENDLY = "https://calendly.com/yber2001/30min";

const keyIssues = [
  { title: "Food Cost Tracking", desc: "Food cost percentage is the most critical metric in restaurant operations. We track COGS against revenue weekly so you catch variance before it destroys your margins." },
  { title: "Tip Reporting & FICA", desc: "Tipped employees create complex payroll tax obligations — allocated tips, FICA tip credit, and Form 8027. Errors here attract IRS scrutiny." },
  { title: "FICA Tip Credit", desc: "The Section 45B FICA tip credit allows restaurant employers to claim a tax credit for the employer share of FICA on tips above the minimum wage. Most restaurant owners leave this credit unclaimed." },
  { title: "Cash Handling & Controls", desc: "Cash-intensive businesses require strong internal controls and daily reconciliation. Inconsistent cash handling creates both tax risk and theft exposure." },
  { title: "Sales Tax on Food", desc: "Maryland taxes food differently depending on whether it is sold for immediate consumption or for home preparation. Misclassification creates sales tax exposure." },
  { title: "Multi-Location Management", desc: "Operating multiple locations requires location-level profitability tracking so you know which locations are carrying the others — and which ones to close." },
];

const services = [
  { title: "Tax Preparation", desc: "Restaurant returns with FICA tip credit, proper COGS calculation, equipment depreciation, and all hospitality-specific deductions captured." },
  { title: "Bookkeeping", desc: "Daily sales reconciliation, food and labor cost tracking, and monthly financial statements showing your actual food cost and labor percentages." },
  { title: "Payroll Tax Compliance", desc: "Tip reporting, FICA calculations, Form 8027 preparation, and FICA tip credit documentation — handled correctly from the start." },
  { title: "Cash Flow Management", desc: "Restaurant cash flow is volatile. We build weekly cash flow models that account for food purchasing cycles, payroll timing, and seasonal revenue patterns." },
];

const faqs = [
  { q: "What is the FICA tip credit and do I qualify?", a: "The Section 45B FICA tip credit gives restaurant employers a dollar-for-dollar tax credit for the employer share of Social Security and Medicare taxes paid on tips above the federal minimum wage. Most full-service restaurants qualify and this credit can be worth thousands of dollars annually. Many restaurant owners are unaware of it." },
  { q: "We have high cash sales. How do we handle this?", a: "Cash-intensive businesses require daily cash reconciliation — comparing register totals against actual cash deposits. We establish the reconciliation procedure and review it monthly. Consistent records are your best protection in the event of an audit." },
  { q: "How do you track food cost?", a: "We work with your point-of-sale system exports and invoice data to calculate your food cost percentage monthly. We compare actual food cost against theoretical food cost to identify variance — which may signal waste, theft, or portioning issues." },
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

export default function Hospitality() {
  return (
    <>
      <Helmet>
        <title>CPA for Restaurants & Hospitality | Selam CPA — Maryland Restaurant CPA</title>
        <meta name="description" content="Tax preparation, bookkeeping, and financial advisory for restaurants, cafes, and hospitality businesses in Maryland, DC, Virginia, and nationwide. Tips, FICA, and food cost accounting." />
        <meta name="keywords" content="CPA restaurant Maryland, restaurant accounting DMV, hospitality CPA Maryland, food service accounting DC Virginia, restaurant bookkeeping Maryland, cafe CPA" />
        <link rel="canonical" href="https://selamcpa.com/industries/hospitality" />
      </Helmet>
      <Header />

      <section className="bg-[#0a0f1e] pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-6">Restaurants &amp; Hospitality</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Thin margins need</span><br />
            <span className="text-emerald-400">precise accounting.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Bookkeeping, tax preparation, and cash flow management for restaurants, cafes, and
            hospitality businesses where every percentage point of food cost or labor cost matters.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">
            Book a Free Consultation →
          </a>
        </div>
      </section>

      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">Financial challenges in restaurants and hospitality</h2>
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
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Services for restaurants and hospitality businesses</h2>
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
          <h2 className="text-4xl font-bold text-white mb-6">Let's talk about your restaurant's finances.</h2>
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
