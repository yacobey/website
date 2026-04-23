import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";

const CALENDLY = "https://calendly.com/yber2001/30min";

const levels = [
  {
    tier: "Compilation",
    badge: "Lowest Cost",
    body: "We present your financial information in the form of financial statements based on data you provide — without verifying it or providing any assurance. Required by some lenders and most SBA loan applications.",
    bestFor: "SBA loans, internal reporting, small lender requirements",
    whatWeDo: "Format your financial data into GAAP-compliant statements, issue a compilation report under SSARS No. 21",
    featured: false,
  },
  {
    tier: "Review",
    badge: "Most Common",
    body: "We perform analytical procedures and make inquiries of management to provide limited assurance that no material modifications are needed. More credible than a compilation — required by most conventional lenders.",
    bestFor: "Bank loans, lines of credit, SBA 7(a), investor reporting",
    whatWeDo: "Analytical procedures, management inquiries, limited assurance report under SSARS No. 21",
    featured: true,
  },
  {
    tier: "Audit",
    badge: "Highest Assurance",
    body: "We independently verify your financial statements through testing, confirmation, and evidence-gathering to provide reasonable assurance that statements are free from material misstatement.",
    bestFor: "Government contracts, grant compliance, large lenders, private equity",
    whatWeDo: "Full audit procedures, internal controls assessment, audit opinion under GAAS",
    featured: false,
  },
];

const steps = [
  { n: "01", title: "Initial Consultation", desc: "We discuss your purpose — why you need the engagement, who will rely on the statements, and what level of assurance is required." },
  { n: "02", title: "Engagement Letter", desc: "We issue a formal engagement letter defining scope, timeline, fees, and responsibilities before any work begins." },
  { n: "03", title: "Fieldwork", desc: "We gather information, review your records, and perform the procedures required for the engagement level." },
  { n: "04", title: "Report Issuance", desc: "We issue the appropriate report — compilation, review, or audit opinion — along with your financial statements." },
];

const importantNotes = [
  "Independence is required for review and audit engagements. We cannot perform a review or audit on financials we prepared as part of a bookkeeping engagement without appropriate safeguards. We will discuss this during your consultation.",
  "Peer review. Selam CPA is subject to peer review requirements for firms that perform attest services. Our peer review status is available upon request.",
  "Timing matters. Audit and review engagements take time. If you have a lender deadline, contact us as early as possible — rush engagements may not be possible.",
];

const faqs = [
  { q: "What is the difference between a review and a compilation?", a: "A compilation presents your financial data in statement form without any verification or assurance. A review goes further — we perform analytical procedures and inquiries and provide limited assurance that no material modifications are needed. Most lenders require at minimum a review." },
  { q: "My lender is asking for reviewed financial statements. How long will this take?", a: "A review engagement for a small business typically takes two to four weeks from the time we receive all necessary information. If you have a deadline, tell us upfront and we will let you know if it is achievable." },
  { q: "Can you audit a nonprofit organization?", a: "Yes. We perform audits for nonprofit organizations including 501(c)(3) public charities, associations, and grant-funded organizations. Nonprofit audits have specific requirements under Uniform Guidance if you receive federal funding — we are familiar with those requirements." },
  { q: "Do I need an audit or will a review suffice?", a: "This depends entirely on what the requesting party requires. Audits are generally required for government contracts, federal grant compliance (Uniform Guidance), and some larger lender relationships. For most small business bank loans and lines of credit, a review is sufficient. Ask your lender what they require before contacting us." },
  { q: "What does a compilation or review cost?", a: "Compilations for small businesses typically range from $500 to $1,500. Reviews range from $1,500 to $4,000. Audits start at $4,000 and increase with complexity. We provide a fixed-fee quote after an initial consultation." },
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

export default function Audit() {
  return (
    <>
      <Helmet>
        <title>Audit, Review & Compilation Services | Selam CPA — Maryland CPA SSARS</title>
        <meta name="description" content="SSARS-compliant audit, review, and compilation engagements for small businesses in Maryland, DC, Virginia, and nationwide. Yacob Tewelde, CPA, FCCA." />
        <meta name="keywords" content="audit CPA Maryland, financial statement review Maryland, compilation engagement Maryland CPA, SSARS Maryland, audit small business DMV, review engagement Maryland" />
        <link rel="canonical" href="https://selamcpa.com/audit" />
      </Helmet>
      <Header />

      {/* HERO */}
      <section className="bg-[#0a0f1e] pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-6">Audit, Review &amp; Compilation</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Financial statements your</span><br />
            <span className="text-emerald-400">lenders and investors trust.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            SSARS-compliant audit, review, and compilation engagements for small businesses that need
            credible financial statements — for lenders, investors, regulators, or internal purposes.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">
            Book a Free Consultation →
          </a>
          <p className="text-gray-500 text-sm mt-4">Serving Laurel MD · Columbia MD · Baltimore · DC · Virginia · All 50 States Virtually</p>
        </div>
      </section>

      {/* THREE LEVELS */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Three levels of assurance — which do you need?</h2>
            <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
              The right engagement depends on what your lender, investor, or regulator requires.
              Here is a plain-English explanation of each.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {levels.map((level) => (
              <div key={level.tier} className={`rounded-2xl p-8 flex flex-col ${level.featured ? "border-2 border-emerald-500 shadow-lg" : "border border-gray-200"}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-bold ${level.featured ? "text-emerald-600" : "text-gray-900"}`}>{level.tier}</h3>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${level.featured ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>{level.badge}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{level.body}</p>
                <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
                  <p className="text-xs text-gray-500"><span className="font-semibold text-gray-700">Best for:</span> {level.bestFor}</p>
                  <p className="text-xs text-gray-500"><span className="font-semibold text-gray-700">What we do:</span> {level.whatWeDo}</p>
                </div>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={`mt-6 inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm transition-colors ${level.featured ? "bg-emerald-500 hover:bg-emerald-400 text-white" : "border border-gray-300 text-gray-700 hover:border-emerald-400 hover:text-emerald-600"}`}>
                  Get a Quote →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">What to expect from an engagement</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.n}>
                <p className="text-6xl font-bold text-emerald-100 mb-4 leading-none">{step.n}</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPORTANT NOTES */}
      <section className="py-24 bg-[#0a0f1e] px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">Important notes about attest engagements</h2>
          <div className="space-y-6">
            {importantNotes.map((note, i) => (
              <div key={i} className="border-l-4 border-emerald-500 pl-6">
                <p className="text-gray-300 leading-relaxed">{note}</p>
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Need credible financial statements?</h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Book a free consultation. We will tell you exactly which engagement you need,
            what it will cost, and how long it will take.
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
