import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";

const CALENDLY = "https://calendly.com/yber2001/30min";

const strategies = [
  { title: "Depreciation & Cost Segregation", desc: "Residential property depreciates over 27.5 years. Cost segregation studies accelerate deductions on components that qualify for shorter lives — generating significant first-year tax savings." },
  { title: "1031 Like-Kind Exchange", desc: "Defer capital gains taxes indefinitely by exchanging investment properties under Section 1031. Strict timelines apply — 45 days to identify, 180 days to close." },
  { title: "Passive Activity Loss Rules", desc: "Rental losses are generally passive — deductible only against passive income. Real estate professional status can unlock full deductibility. We analyze your eligibility." },
  { title: "Short-Term Rental Strategy", desc: "Airbnb and VRBO properties may qualify as active business income if you meet material participation requirements. The tax treatment is significantly different from long-term rentals." },
  { title: "Entity Structure for Investors", desc: "LLCs for liability protection, S-Corps for active real estate businesses, land trusts for privacy — the right structure depends on your portfolio and strategy." },
  { title: "QBI Deduction for Rental Activities", desc: "Rental activities may qualify for the 20% QBI deduction if they meet the safe harbor requirements. We evaluate your eligibility annually." },
];

const propertyTypes = [
  { title: "Long-Term Rentals", desc: "Single-family, multi-family, and small apartment buildings — Schedule E reporting, depreciation tracking, and expense categorization." },
  { title: "Short-Term Rentals", desc: "Airbnb, VRBO, and vacation rentals — occupancy tracking, mixed-use rules, and self-employment tax analysis." },
  { title: "Fix & Flip", desc: "Dealer vs. investor classification, ordinary income vs. capital gain treatment, and project-level profitability tracking." },
  { title: "Real Estate Agents & Brokers", desc: "Schedule C or S-Corp for active agents — commission income, auto expenses, home office, marketing, and MLS fees all tracked." },
];

const faqs = [
  { q: "I own several rental properties. How do you track depreciation?", a: "We maintain a depreciation schedule for every property — purchase date, cost basis, depreciation method, and accumulated depreciation. This is essential for accurate tax returns and for calculating gain on sale." },
  { q: "What is a 1031 exchange and how does it work?", a: "A 1031 exchange lets you sell an investment property and defer capital gains taxes by reinvesting the proceeds in a like-kind property. You have 45 days to identify replacement properties and 180 days to close. A qualified intermediary must hold the funds. We coordinate the tax reporting." },
  { q: "Should I put my rental properties in an LLC?", a: "LLCs provide liability protection but have limited direct tax benefits for rental properties. The decision depends on your risk tolerance, lender requirements, and how many properties you own. We walk through the trade-offs with every new real estate client." },
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

export default function RealEstate() {
  return (
    <>
      <Helmet>
        <title>CPA for Real Estate Investors & Agents | Selam CPA — Maryland Real Estate CPA</title>
        <meta name="description" content="Tax preparation and accounting for real estate investors, landlords, and agents in Maryland, DC, Virginia, and nationwide. Depreciation, 1031 exchanges, and rental income." />
        <meta name="keywords" content="CPA real estate Maryland, real estate investor tax Maryland, landlord accounting DMV, 1031 exchange CPA Maryland, rental property tax Maryland, real estate agent CPA" />
        <link rel="canonical" href="https://selamcpa.com/industries/real-estate" />
      </Helmet>
      <Header />

      <section className="bg-[#0a0f1e] pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-6">Real Estate &amp; Property Management</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Real estate tax strategy</span><br />
            <span className="text-emerald-400">that actually saves money.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Depreciation schedules, 1031 exchanges, passive activity rules, and rental income —
            real estate has the most tax planning opportunities of any asset class. We make sure you capture them.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">
            Book a Free Consultation →
          </a>
        </div>
      </section>

      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">Real estate tax strategies we implement</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategies.map((item) => (
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
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">Property types we work with</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertyTypes.map((item) => (
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
          <h2 className="text-4xl font-bold text-white mb-6">Let's talk about your real estate portfolio.</h2>
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
