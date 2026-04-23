import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";

const CALENDLY = "https://calendly.com/yber2001/30min";

const keyIssues = [
  { title: "Form 990 Preparation", desc: "Form 990 is a public document that donors, watchdog organizations, and regulators review. Accuracy and completeness matter — a poorly prepared 990 raises questions about organizational management." },
  { title: "Fund Accounting", desc: "Restricted and unrestricted funds must be tracked separately. Spending restricted grants on unallowed purposes creates compliance violations and potential payback obligations." },
  { title: "Grant Compliance", desc: "Federal grants trigger Uniform Guidance (2 CFR Part 200) requirements — including a single audit if you expend $750,000 or more in federal awards annually." },
  { title: "Unrelated Business Income", desc: "Nonprofits that generate income from activities unrelated to their exempt purpose may owe Unrelated Business Income Tax (UBIT). We identify potential UBIT exposure." },
];

const services = [
  { title: "Form 990 Preparation", desc: "Accurate, complete Form 990 preparation — including all schedules required for your organization type, size, and activities." },
  { title: "Fund Accounting & Bookkeeping", desc: "Monthly bookkeeping with proper fund tracking — restricted, unrestricted, and temporarily restricted net assets all properly classified." },
  { title: "Audit & Review", desc: "Independent audit and review engagements for nonprofits required by state law, grant agreements, or board policy. Single audits under Uniform Guidance available." },
  { title: "Grant Compliance Support", desc: "Assistance with grant budget tracking, allowable cost analysis, and financial reporting to grantors — federal and private foundation." },
];

const faqs = [
  { q: "Is our Form 990 public?", a: "Yes. Form 990 is a public document. It is available on GuideStar (Candid) and must be provided to anyone who requests it. This is why accuracy and completeness matter — donors and watchdog groups review it." },
  { q: "We received a federal grant. Do we need a single audit?", a: "If you expend $750,000 or more in federal awards in a fiscal year, you are required to have a single audit under Uniform Guidance (2 CFR Part 200). We perform single audits and can help you understand your obligations." },
  { q: "What is fund accounting?", a: "Fund accounting tracks resources by their intended purpose — separating restricted grants from unrestricted operating funds, for example. It is required for nonprofits to demonstrate that restricted funds were spent as intended by donors and grantors." },
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

export default function Nonprofit() {
  return (
    <>
      <Helmet>
        <title>CPA for Nonprofits & 501(c)(3) Organizations | Selam CPA — Maryland Nonprofit CPA</title>
        <meta name="description" content="Tax preparation, bookkeeping, and audit services for nonprofits and 501(c)(3) organizations in Maryland, DC, Virginia, and nationwide. Form 990, Uniform Guidance, and fund accounting." />
        <meta name="keywords" content="CPA nonprofit Maryland, 501c3 accounting Maryland, Form 990 Maryland, nonprofit audit Maryland, Uniform Guidance audit DMV, nonprofit bookkeeping DC Virginia" />
        <link rel="canonical" href="https://selamcpa.com/industries/nonprofit" />
      </Helmet>
      <Header />

      <section className="bg-[#0a0f1e] pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-6">Nonprofits &amp; Associations</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Mission-driven.</span><br />
            <span className="text-emerald-400">Financially accountable.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Tax compliance, fund accounting, and financial oversight for nonprofits, associations,
            and grant-funded organizations that need to demonstrate accountability to donors and regulators.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">
            Book a Free Consultation →
          </a>
        </div>
      </section>

      <section className="py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">Financial requirements unique to nonprofits</h2>
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
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Services for nonprofits and associations</h2>
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
          <h2 className="text-4xl font-bold text-white mb-6">Let's support your mission with strong financial management.</h2>
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
