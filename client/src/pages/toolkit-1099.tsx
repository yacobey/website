import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";

// REPLACE WITH YOUR REAL STRIPE PAYMENT LINK AFTER STRIPE SETUP.
// Instructions in STRIPE_DELIVERY_SETUP.md at repo root.
const STRIPE_CHECKOUT = "https://buy.stripe.com/REPLACE_AFTER_STRIPE_SETUP";

const insideTheKit = [
  {
    title: "Quarterly Estimated Tax Calculator",
    desc: "Type in your monthly 1099 income. The sheet tells you exactly what to pay the IRS and your state each quarter, and flags safe-harbor thresholds so you never get hit with an underpayment penalty.",
    format: "Google Sheet",
  },
  {
    title: "Deductible Expense Tracker",
    desc: "Pre-categorized for 1099 earners — Schedule C line numbers built in. Running deduction total updates every time you log a purchase.",
    format: "Google Sheet",
  },
  {
    title: "IRS-Compliant Mileage Log",
    desc: "Every trip logged with date, route, business purpose, and miles. Year-end deduction calculated at the current standard mileage rate.",
    format: "Google Sheet",
  },
  {
    title: "\"What Can I Actually Deduct?\" Cheat Sheet",
    desc: "1-page guide to the deductions freelancers leave on the table — and the ones they wrongly claim that trigger audits.",
    format: "PDF",
  },
  {
    title: "Quarterly Action Checklist",
    desc: "Exactly what to do in January, April, June, September, and December so the IRS never surprises you.",
    format: "PDF",
  },
];

const pains = [
  {
    pain: "You finished your taxes and owed thousands you didn't see coming.",
    fix: "The Quarterly Calculator shows you what to set aside every month, in advance.",
  },
  {
    pain: "You skipped a quarterly payment and the IRS sent a penalty notice.",
    fix: "The Quarterly Checklist puts every deadline on your calendar with a clear action.",
  },
  {
    pain: "You're guessing what's deductible and probably leaving money on the table.",
    fix: "The Expense Tracker uses real Schedule C categories — no more \"Misc.\"",
  },
  {
    pain: "You can't find your receipts when tax season hits.",
    fix: "Everything lives in one Google Drive folder, organized as you spend.",
  },
  {
    pain: "You don't trust generic templates from people without a CPA license.",
    fix: "Built by a CPA + FCCA who actually files returns for freelancers. My name is on it.",
  },
];

const faqs = [
  {
    q: "Is this just a spreadsheet?",
    a: "It's five things — three Google Sheets and two PDFs. The sheets have working formulas, dropdown menus, and tabbed instructions. The PDFs are reference guides. Together they replace the \"figure it out as I go\" approach with a system.",
  },
  {
    q: "Does this work for any state?",
    a: "Yes. The Quarterly Calculator has a state dropdown for all 50 states and DC. State estimates use simplified effective rates — accurate enough for quarterly planning, not a replacement for a state return.",
  },
  {
    q: "Will this work if I'm on an LLC or S-corp?",
    a: "It's designed for sole proprietors and single-member LLCs filing on Schedule C. If you have an S-corp election, the calculator structure still works for the K-1 distribution piece, but you have W-2 withholding to consider too — message me and I'll walk you through what's different. If you're earning over $80K and not in an S-corp yet, that's a conversation worth having.",
  },
  {
    q: "What if the tax law changes?",
    a: "I update the tax brackets and the standard mileage rate in the Calculator every January. If you bought the toolkit before January and we're in a new tax year, email me at info@selamcpa.com and I'll send the updated sheet. Free, as long as I sell this product.",
  },
  {
    q: "Is this tax advice?",
    a: "It's a planning tool, not a return. For your actual tax filing — especially if you have multi-state income, dependents, retirement contributions, or anything unusual — you should still work with a CPA. If you want me to do your return, the flat-rate price for a self-employed return is $399 and current toolkit customers get $50 off.",
  },
  {
    q: "Can I get a refund?",
    a: "If the toolkit doesn't work for you within 14 days, email me. I'll refund every dollar with no follow-up questions.",
  },
  {
    q: "Who built this?",
    a: "Yacob Tewelde, CPA, FCCA. I run Selam CPA, a solo practice based in Laurel, Maryland, serving freelancers, small business owners, and nonprofits across all 50 states. I built this toolkit because every January I watch new freelance clients arrive panicked about a tax bill they didn't plan for. This is the system I wish they'd had on day one.",
  },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-6 text-left font-semibold text-gray-900 hover:text-emerald-600 transition-colors"
      >
        <span>{q}</span>
        <span className={`text-emerald-500 ml-4 flex-shrink-0 text-xl transition-transform ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      {open && (
        <div className="px-6 pb-6">
          <p className="text-gray-500 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function Toolkit1099() {
  return (
    <>
      <Helmet>
        <title>The 1099 Tax Toolkit | CPA-Built for Freelancers | Selam CPA</title>
        <meta
          name="description"
          content="Stop guessing what to pay the IRS each quarter. A CPA-built toolkit for freelancers and self-employed 1099 earners: quarterly tax calculator, expense tracker, mileage log, deductions cheat sheet. $79. Instant download."
        />
        <meta
          name="keywords"
          content="freelancer tax toolkit, 1099 tax calculator, quarterly estimated tax freelancer, self-employed tax tracker, CPA freelancer guide"
        />
        <link rel="canonical" href="https://selamcpa.com/1099-toolkit" />
      </Helmet>

      <Header />

      {/* HERO */}
      <section className="bg-[#0a0f1e] pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-6">
            For Self-Employed Freelancers &amp; 1099 Earners
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Stop Guessing</span>
            <br />
            <span className="text-white">What You Owe</span>
            <br />
            <span className="text-emerald-400">The IRS.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            A CPA-built toolkit that tells you exactly what to pay each quarter, tracks every
            deduction, and makes tax season a 30-minute job instead of a 3-day panic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={STRIPE_CHECKOUT}
              className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors"
            >
              Get the Toolkit — $79 →
            </a>
            <a
              href="#whats-inside"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white hover:bg-white/10 font-semibold rounded-lg transition-colors"
            >
              See What's Inside →
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            Instant download. 14-day refund if it doesn't work for you.
          </p>
        </div>
      </section>

      {/* PAIN / FIX */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <p className="text-emerald-600 text-sm font-medium tracking-widest uppercase mb-3">
              Why This Exists
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Every January, I meet a new wave of panicked freelancers.
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              They made good money. They didn't set anything aside. They owe four or five figures
              they didn't budget for. By the time they call a CPA, the damage is done.
            </p>
            <p className="text-gray-500 text-lg leading-relaxed mt-4">
              This toolkit is the system I wish every new freelance client had on day one.
            </p>
          </div>

          <div className="space-y-6">
            {pains.map((p) => (
              <div key={p.pain} className="border-l-4 border-emerald-500 pl-6 py-2">
                <p className="text-gray-900 font-semibold mb-1">{p.pain}</p>
                <p className="text-gray-500 leading-relaxed">{p.fix}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section id="whats-inside" className="py-24 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-emerald-600 text-sm font-medium tracking-widest uppercase mb-3">
              What's Inside
            </p>
            <h2 className="text-4xl font-bold text-gray-900">
              Five working files. One system.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {insideTheKit.map((item, idx) => (
              <div
                key={item.title}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-400 hover:shadow-md transition-all"
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-emerald-500 font-bold text-sm">0{idx + 1}</span>
                  <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                    {item.format}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREDIBILITY */}
      <section className="py-24 bg-[#0a0f1e] px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-3">
                Built By
              </p>
              <p className="text-2xl font-bold text-white leading-tight">
                Yacob Tewelde, CPA, FCCA
              </p>
              <p className="text-gray-400 mt-2">Selam CPA</p>
              <p className="text-gray-500 text-sm mt-1">Laurel, MD — serving all 50 states</p>
            </div>
            <div className="md:col-span-2 text-gray-300 leading-relaxed space-y-4">
              <p>
                I'm a licensed CPA and Fellow of the Association of Chartered Certified Accountants.
                Selam CPA is my solo firm — I do tax prep, audits, advisory, and AI consulting for
                freelancers, small businesses, and nonprofits.
              </p>
              <p>
                There's a lot of generic tax content out there written by people without a license.
                This isn't that. Every formula, every category, every disclaimer in this toolkit was
                built by a CPA who files real Schedule C returns every week.
              </p>
              <p>
                If you find an error, I will fix it within 24 hours and update every customer for
                free. My name is on this.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-emerald-600 text-sm font-medium tracking-widest uppercase mb-3">
            Get the Toolkit
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            $79. One-time. Yours forever.
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Five files. Updated each January for the new tax year, free for life. If the toolkit
            doesn't work for you within 14 days, I refund every dollar.
          </p>
          <a
            href={STRIPE_CHECKOUT}
            className="inline-flex items-center justify-center px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-lg rounded-lg transition-colors"
          >
            Buy the 1099 Toolkit — $79 →
          </a>
          <p className="text-gray-400 text-sm mt-6">
            Delivered instantly to your inbox after checkout.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-emerald-600 text-sm font-medium tracking-widest uppercase mb-3">
              FAQ
            </p>
            <h2 className="text-4xl font-bold text-gray-900">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <FAQ key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-[#0a0f1e] px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The next quarterly deadline isn't going to wait.
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Buy it once. Use it every quarter. Sleep through tax season.
          </p>
          <a
            href={STRIPE_CHECKOUT}
            className="inline-flex items-center justify-center px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-lg rounded-lg transition-colors"
          >
            Get the Toolkit — $79 →
          </a>
          <p className="text-gray-500 text-sm mt-6">
            Built by Yacob Tewelde, CPA, FCCA. 14-day refund. Free annual updates.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
