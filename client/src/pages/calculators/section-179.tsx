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
    <div className="mb-5">
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

function Toggle({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (s: string) => void }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button key={opt} onClick={() => onChange(opt)}
            className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${value === opt ? "bg-emerald-500 text-white border-emerald-500" : "bg-white text-gray-700 border-gray-300 hover:border-emerald-400"}`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

const faqs = [
  { q: "What is the Section 179 deduction limit for 2025?", a: "The Section 179 limit for 2025 is $1,220,000. This begins to phase out when total asset purchases exceed $3,050,000. Section 179 cannot exceed your net business income — it cannot be used to create a loss." },
  { q: "What is bonus depreciation and how is it different from Section 179?", a: "Bonus depreciation allows you to immediately deduct a percentage of the cost of qualifying new and used assets in the year placed in service. Unlike Section 179, bonus depreciation has no income limitation and can create or increase a net operating loss. The bonus rate is 40% in 2025, decreasing to 20% in 2026 and 0% in 2027 under current law unless Congress acts." },
  { q: "What assets qualify for Section 179?", a: "Qualifying property includes tangible personal property used in business (equipment, machinery, computers), off-the-shelf computer software, and certain qualified improvement property. Real property generally does not qualify. Vehicles have special limitations — passenger vehicles are capped at $12,200 in year one, and SUVs over 6,000 lbs are capped at $28,900 for Section 179." },
  { q: "Should I take Section 179 or bonus depreciation?", a: "If your income is high enough to absorb the full deduction, Section 179 and bonus depreciation produce the same result in year one. Section 179 is preferable when you want to control the exact amount deducted. Bonus depreciation is preferable when you want to create a loss or when your purchases exceed the Section 179 limit." },
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

const SEC179_LIMIT = 1220000;
const SEC179_PHASEOUT = 3050000;
const BONUS_RATE = 0.40;

export default function Section179() {
  const [assetCost, setAssetCost] = useState(50000);
  const [netIncome, setNetIncome] = useState(150000);
  const [assetType, setAssetType] = useState("Equipment/Software");
  const [timing, setTiming] = useState("Before 10/1/2025");

  const eligible = timing === "Before 10/1/2025";

  let sec179Cap = SEC179_LIMIT;
  if (assetCost > SEC179_PHASEOUT) sec179Cap = Math.max(0, SEC179_LIMIT - (assetCost - SEC179_PHASEOUT));

  let sec179Limit = sec179Cap;
  if (assetType === "SUV over 6,000 lbs") sec179Limit = Math.min(sec179Limit, 28900);
  if (assetType === "Passenger Vehicle") sec179Limit = Math.min(sec179Limit, 12200);

  const sec179 = eligible ? Math.min(assetCost, sec179Limit, netIncome) : 0;
  const remainingBasis = assetCost - sec179;
  const bonusDepreciation = eligible ? remainingBasis * BONUS_RATE : 0;
  const macrsYear1 = (remainingBasis - bonusDepreciation) * 0.20;
  const totalFirstYear = sec179 + bonusDepreciation + macrsYear1;
  const remainingDepreciable = assetCost - sec179 - bonusDepreciation;
  const taxSavings = totalFirstYear * 0.25;

  return (
    <>
      <Helmet>
        <title>Section 179 Deduction Calculator 2025 | Selam CPA — First-Year Expensing</title>
        <meta name="description" content="Calculate your 2025 Section 179 deduction and bonus depreciation. Deduct equipment, software, and vehicles in the first year. Free calculator by Selam CPA." />
        <meta name="keywords" content="Section 179 calculator 2025, bonus depreciation 2025, equipment deduction calculator, first year expensing 2025, Section 179 limit 2025" />
        <link rel="canonical" href="https://selamcpa.com/calculators/section-179" />
      </Helmet>
      <Header />

      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-emerald-600">Home</Link> › <Link href="/calculators" className="hover:text-emerald-600">Calculators</Link> › Section 179 &amp; Bonus Depreciation
          </div>

          <div className="mb-10">
            <p className="text-emerald-600 text-xs font-semibold tracking-widest uppercase mb-3">FREE CALCULATOR · 2025 TAX YEAR</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Section 179 &amp; Bonus Depreciation Calculator</h1>
            <p className="text-gray-500 text-lg max-w-2xl">Calculate your first-year deduction for equipment, software, and vehicles placed in service in 2025. Section 179 limit: $1,220,000. Bonus rate: 40%.</p>
            <p className="text-xs text-gray-400 mt-3">For estimation purposes only. Consult a CPA for personalized advice.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Your Asset &amp; Income</h2>
              <Slider label="Cost of Equipment/Assets Purchased" value={assetCost} min={0} max={2000000} step={5000} format={fmt} onChange={setAssetCost} />
              <Slider label="Business Net Income (before this deduction)" value={netIncome} min={0} max={1000000} step={5000} format={fmt} onChange={setNetIncome} />
              <Toggle label="Asset Type" options={["Equipment/Software", "SUV over 6,000 lbs", "Passenger Vehicle"]} value={assetType} onChange={setAssetType} />
              <Toggle label="Placed in Service" options={["Before 10/1/2025", "After 10/1/2025"]} value={timing} onChange={setTiming} />
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-5">First-Year Deduction Breakdown</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Section 179 deduction</span>
                    <span className="font-semibold text-gray-900">{fmt(sec179)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Bonus depreciation (40% of remaining)</span>
                    <span className="font-semibold text-gray-900">{fmt(bonusDepreciation)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">MACRS Year 1 (20% of remaining basis)</span>
                    <span className="font-semibold text-gray-900">{fmt(macrsYear1)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-bold text-gray-900">Total First-Year Deduction</span>
                    <span className="font-bold text-emerald-600 text-xl">{fmt(totalFirstYear)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-900 rounded-2xl p-6 text-white">
                <p className="text-emerald-300 text-sm mb-1">Estimated Tax Savings</p>
                <p className="text-4xl font-bold">{fmt(taxSavings)}</p>
                <p className="text-emerald-300 text-xs mt-1">At assumed 25% marginal rate</p>
                <div className="mt-4 pt-4 border-t border-emerald-700 text-sm">
                  <div className="flex justify-between"><span className="text-emerald-300">Remaining depreciable basis</span><span>{fmt(remainingDepreciable)}</span></div>
                  <div className="flex justify-between mt-1"><span className="text-emerald-300">% of cost deducted in year 1</span><span>{assetCost > 0 ? ((totalFirstYear / assetCost) * 100).toFixed(0) : 0}%</span></div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-5 text-sm space-y-2 text-gray-600">
                <p className="font-semibold text-gray-900">Key Facts for 2025</p>
                <p>• Section 179 is limited to your net business income — it cannot create a loss</p>
                <p>• Bonus depreciation has no income limitation and can create a loss</p>
                <p>• Bonus depreciation rate is 40% in 2025, dropping to 20% in 2026, then 0% in 2027</p>
                <p>• Assets must be placed in service by December 31, 2025 to qualify</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">{faqs.map(faq => <FAQ key={faq.q} q={faq.q} a={faq.a} />)}</div>
          </div>

          <div className="mt-12 bg-[#0a0f1e] rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Planning a major equipment purchase?</h2>
            <p className="text-gray-400 mb-6">We'll model the exact deduction and tax savings for your situation before you buy.</p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">Book a Free Consultation →</a>
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-gray-700 mb-4">Related Calculators</p>
            <div className="flex flex-wrap gap-3">
              {[["Mileage Deduction", "/calculators/mileage"], ["S-Corp Tax Savings", "/calculators/scorp-savings"], ["Self-Employment Tax", "/calculators/self-employment-tax"]].map(([name, href]) => (
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
