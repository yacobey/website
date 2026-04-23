import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

const CALENDLY = "https://calendly.com/yber2001/30min";
function fmt(n: number) { return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }); }

function Slider({ label, value, min, max, step, format, onChange }: { label: string; value: number; min: number; max: number; step: number; format?: (n: number) => string; onChange: (n: number) => void }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-emerald-600 font-semibold">{format ? format(value) : value.toLocaleString()}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 appearance-none rounded-full cursor-pointer"
        style={{ background: `linear-gradient(to right, #10b981 ${pct}%, #e5e7eb ${pct}%)` }} />
    </div>
  );
}

const faqs = [
  { q: "What is the self-employment tax rate for 2025?", a: "The SE tax rate is 15.3% — 12.4% for Social Security (on net earnings up to $176,100) and 2.9% for Medicare (on all net earnings). The SE tax applies to 92.35% of your net self-employment income, not the gross amount." },
  { q: "Why is the SE tax rate 15.3% when employees only pay 7.65%?", a: "Employees pay 7.65% and their employer pays the other 7.65%. Self-employed individuals pay both halves — the full 15.3%. However, you can deduct half of SE tax (the employer equivalent portion) as an above-the-line deduction on Form 1040, which partially offsets the cost." },
  { q: "Does SE tax apply to all self-employment income?", a: "SE tax applies to net profit from a Schedule C business, your distributive share of partnership income from a general partner, and net earnings from self-employment in other contexts. S-Corp distributions are not subject to SE tax — which is the basis of the S-Corp tax savings strategy." },
  { q: "What is the Additional Medicare Tax?", a: "Self-employed individuals with net earnings above $200,000 (single) or $250,000 (MFJ) owe an additional 0.9% Medicare tax on the amount above the threshold. Unlike regular SE tax, there is no deduction for this additional tax." },
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

export default function SelfEmploymentTax() {
  const [seIncome, setSeIncome] = useState(80000);
  const [w2Wages, setW2Wages] = useState(0);

  const netEarnings = seIncome * 0.9235;
  const ssBase = Math.max(0, Math.min(netEarnings, Math.max(0, 176100 - w2Wages)));
  const ssTax = ssBase * 0.124;
  const medicareTax = netEarnings * 0.029;
  const additionalMedicare = Math.max(0, netEarnings - 200000) * 0.009;
  const totalSeTax = ssTax + medicareTax;
  const seDeduction = totalSeTax / 2;

  const ssPct = totalSeTax > 0 ? (ssTax / totalSeTax) * 100 : 0;
  const medPct = totalSeTax > 0 ? (medicareTax / totalSeTax) * 100 : 0;

  return (
    <>
      <Helmet>
        <title>Self-Employment Tax Calculator 2025 | Selam CPA — Maryland</title>
        <meta name="description" content="Calculate your 2025 self-employment tax (SE tax) — Social Security and Medicare — and the above-the-line deduction you can take on Form 1040. Free calculator." />
        <meta name="keywords" content="self employment tax calculator 2025, SE tax calculator, schedule SE calculator, self employed FICA 2025, SE tax deduction calculator" />
        <link rel="canonical" href="https://selamcpa.com/calculators/self-employment-tax" />
      </Helmet>
      <Header />

      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-emerald-600">Home</Link> › <Link href="/calculators" className="hover:text-emerald-600">Calculators</Link> › Self-Employment Tax
          </div>

          <div className="mb-10">
            <p className="text-emerald-600 text-xs font-semibold tracking-widest uppercase mb-3">FREE CALCULATOR · 2025 TAX YEAR</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Self-Employment Tax Calculator</h1>
            <p className="text-gray-500 text-lg max-w-2xl">Calculate your 2025 SE tax — Social Security and Medicare — and the above-the-line deduction you can claim on Form 1040.</p>
            <p className="text-xs text-gray-400 mt-3">For estimation purposes only. Consult a CPA for personalized advice.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Your Information</h2>
              <Slider label="Net Self-Employment Income" value={seIncome} min={0} max={500000} step={5000} format={fmt} onChange={setSeIncome} />
              <Slider label="W-2 Wages (reduces Social Security base)" value={w2Wages} min={0} max={200000} step={5000} format={fmt} onChange={setW2Wages} />

              <div className="mt-6 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
                <p className="font-medium text-gray-800 mb-1">How it's calculated</p>
                <p>Net earnings = {fmt(seIncome)} × 92.35% = {fmt(netEarnings)}</p>
                <p>SS wage base used: {fmt(ssBase)} of ${(176100).toLocaleString()} limit</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Your SE Tax Breakdown</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Social Security tax (12.4% on {fmt(ssBase)})</span>
                    <span className="font-semibold text-gray-900">{fmt(ssTax)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Medicare tax (2.9% on {fmt(netEarnings)})</span>
                    <span className="font-semibold text-gray-900">{fmt(medicareTax)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-900 font-semibold">Total SE Tax</span>
                    <span className="font-bold text-emerald-600 text-lg">{fmt(totalSeTax)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">SE deduction (half of SE tax)</span>
                    <span className="font-semibold text-gray-900 text-emerald-700">−{fmt(seDeduction)}</span>
                  </div>
                  {additionalMedicare > 0 && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Additional Medicare tax (0.9%)</span>
                      <span className="font-semibold text-red-600">{fmt(additionalMedicare)}</span>
                    </div>
                  )}
                </div>

                <div className="mt-5">
                  <p className="text-xs text-gray-500 mb-2">Tax breakdown</p>
                  <div className="h-4 rounded-full overflow-hidden flex">
                    <div className="bg-emerald-500 transition-all" style={{ width: `${ssPct}%` }} title="Social Security" />
                    <div className="bg-emerald-300 transition-all" style={{ width: `${medPct}%` }} title="Medicare" />
                  </div>
                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> Social Security {fmt(ssTax)}</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-emerald-300 inline-block" /> Medicare {fmt(medicareTax)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-sm">
                <p className="font-semibold text-emerald-800 mb-1">SE Deduction Saves You Income Tax Too</p>
                <p className="text-emerald-700">The {fmt(seDeduction)} SE deduction reduces your AGI — saving you income tax in addition to offsetting the SE tax you pay.</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">{faqs.map(faq => <FAQ key={faq.q} q={faq.q} a={faq.a} />)}</div>
          </div>

          <div className="mt-12 bg-[#0a0f1e] rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Reduce your SE tax with an S-Corp election?</h2>
            <p className="text-gray-400 mb-6">We'll analyze whether an S-Corp election makes sense for your income level.</p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">Book a Free Consultation →</a>
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-gray-700 mb-4">Related Calculators</p>
            <div className="flex flex-wrap gap-3">
              {[["S-Corp Tax Savings", "/calculators/scorp-savings"], ["Quarterly Estimated Tax", "/calculators/estimated-tax"], ["Self-Employed Retirement", "/calculators/retirement"]].map(([name, href]) => (
                <Link key={href} href={href} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-emerald-400 hover:text-emerald-600 transition-colors">{name}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
