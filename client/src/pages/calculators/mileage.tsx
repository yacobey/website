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
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${value === opt ? "bg-emerald-500 text-white border-emerald-500" : "bg-white text-gray-700 border-gray-300 hover:border-emerald-400"}`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

const faqs = [
  { q: "What is the IRS standard mileage rate for 2025?", a: "The IRS standard mileage rate for business use of a vehicle is $0.70 per mile for 2025. This rate covers the average cost of gas, insurance, depreciation, and maintenance — you do not deduct those separately if you use the standard rate." },
  { q: "Do I need to keep a mileage log?", a: "Yes. The IRS requires a contemporaneous mileage log — meaning you record each trip at or near the time it occurs, not reconstructed later. The log must show the date, destination, business purpose, and miles for each business trip. Apps like MileIQ or Everlance make this easy." },
  { q: "When should I use the actual expense method instead of standard mileage?", a: "The actual expense method tends to produce a larger deduction when your vehicle is expensive to operate (high gas, insurance, or repair costs), when you drive relatively few business miles, or when you placed the vehicle in service in 2025 and want to claim bonus depreciation. You must choose your method in the first year you use the vehicle for business." },
  { q: "Can I deduct mileage to and from my office?", a: "No. Commuting miles — from your home to your regular place of business — are never deductible. However, if you have a qualifying home office, your home becomes your principal place of business and trips from home to client locations are deductible business miles." },
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

export default function Mileage() {
  const [bizMiles, setBizMiles] = useState(10000);
  const [totalMiles, setTotalMiles] = useState(20000);
  const [expenses, setExpenses] = useState(8000);
  const [purchasePrice, setPurchasePrice] = useState(35000);
  const [vehicleType, setVehicleType] = useState("Standard (under 6,000 lbs)");

  const bizPct = totalMiles > 0 ? bizMiles / totalMiles : 0;
  const standardDeduction = bizMiles * 0.70;

  const bizExpenses = expenses * bizPct;
  const depreciationCap = vehicleType.includes("Heavy") ? bizPct * purchasePrice : Math.min(bizPct * purchasePrice, 12200);
  const actualDeduction = bizExpenses + depreciationCap;

  const standardBetter = standardDeduction >= actualDeduction;

  return (
    <>
      <Helmet>
        <title>Mileage Deduction Calculator 2025 | Selam CPA — $0.70 Per Mile</title>
        <meta name="description" content="Calculate your 2025 business mileage deduction at $0.70 per mile. Standard mileage vs. actual expense method comparison. Free calculator by Selam CPA." />
        <meta name="keywords" content="mileage deduction calculator 2025, business mileage 2025, IRS mileage rate 2025, standard mileage rate 2025, vehicle deduction calculator" />
        <link rel="canonical" href="https://selamcpa.com/calculators/mileage" />
      </Helmet>
      <Header />

      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-emerald-600">Home</Link> › <Link href="/calculators" className="hover:text-emerald-600">Calculators</Link> › Mileage Deduction
          </div>

          <div className="mb-10">
            <p className="text-emerald-600 text-xs font-semibold tracking-widest uppercase mb-3">FREE CALCULATOR · 2025 TAX YEAR</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Business Mileage Deduction Calculator</h1>
            <p className="text-gray-500 text-lg max-w-2xl">Compare the standard mileage method ($0.70/mile in 2025) against the actual expense method — and see which produces a larger deduction.</p>
            <p className="text-xs text-gray-400 mt-3">For estimation purposes only. Consult a CPA for personalized advice.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Your Vehicle &amp; Mileage</h2>
              <Slider label="Business Miles Driven in 2025" value={bizMiles} min={0} max={50000} step={500} onChange={setBizMiles} />
              <Slider label="Total Miles Driven in 2025" value={totalMiles} min={0} max={80000} step={500} onChange={setTotalMiles} />
              <div className="mb-5 p-3 bg-emerald-50 rounded-lg text-sm">
                <span className="text-emerald-700 font-medium">Business use: {(bizPct * 100).toFixed(1)}%</span>
              </div>
              <Slider label="Annual Vehicle Expenses (gas, insurance, repairs)" value={expenses} min={0} max={20000} step={250} format={fmt} onChange={setExpenses} />
              <Slider label="Vehicle Purchase Price (if owned)" value={purchasePrice} min={0} max={80000} step={1000} format={fmt} onChange={setPurchasePrice} />
              <Toggle label="Vehicle Type" options={["Standard (under 6,000 lbs)", "Heavy SUV/Truck (over 6,000 lbs)"]} value={vehicleType} onChange={setVehicleType} />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className={`rounded-2xl p-6 border-2 transition-all ${standardBetter ? "border-emerald-500 bg-emerald-50" : "border-gray-200 bg-white"}`}>
                  {standardBetter && <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">✓ Larger Deduction</p>}
                  <h3 className="font-semibold text-gray-900 mb-1">Standard Mileage</h3>
                  <p className="text-3xl font-bold text-emerald-600 mt-2">{fmt(standardDeduction)}</p>
                  <p className="text-xs text-gray-500 mt-2">{bizMiles.toLocaleString()} mi × $0.70</p>
                  <p className="text-xs text-gray-500 mt-1">No Form 4562 required</p>
                </div>

                <div className={`rounded-2xl p-6 border-2 transition-all ${!standardBetter ? "border-emerald-500 bg-emerald-50" : "border-gray-200 bg-white"}`}>
                  {!standardBetter && <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">✓ Larger Deduction</p>}
                  <h3 className="font-semibold text-gray-900 mb-1">Actual Expense</h3>
                  <p className="text-3xl font-bold text-emerald-600 mt-2">{fmt(actualDeduction)}</p>
                  <p className="text-xs text-gray-500 mt-2">Expenses + Depreciation</p>
                  <p className="text-xs text-gray-500 mt-1">Requires Form 4562</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-5 text-sm">
                <p className="font-semibold text-gray-900 mb-3">2025 IRS Mileage Rates</p>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between"><span>Business</span><span className="font-semibold text-gray-900">$0.70 per mile</span></div>
                  <div className="flex justify-between"><span>Medical / Moving</span><span>$0.21 per mile</span></div>
                  <div className="flex justify-between"><span>Charitable</span><span>$0.14 per mile</span></div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm">
                <p className="font-semibold text-amber-800 mb-1">Method Lock-In Rule</p>
                <p className="text-amber-700">Once you use the actual method for a vehicle, you generally cannot switch to standard mileage for that vehicle in a later year. Choose carefully.</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm">
                <p className="font-semibold text-blue-800 mb-1">Mileage Log Required</p>
                <p className="text-blue-700">A contemporaneous mileage log is required for either method — date, destination, business purpose, and miles for every business trip.</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">{faqs.map(faq => <FAQ key={faq.q} q={faq.q} a={faq.a} />)}</div>
          </div>

          <div className="mt-12 bg-[#0a0f1e] rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Want to make sure you're capturing every vehicle deduction?</h2>
            <p className="text-gray-400 mb-6">We'll review your vehicle use and determine the optimal method for your situation.</p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">Book a Free Consultation →</a>
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-gray-700 mb-4">Related Calculators</p>
            <div className="flex flex-wrap gap-3">
              {[["Home Office Deduction", "/calculators/home-office"], ["Section 179 & Bonus Depreciation", "/calculators/section-179"], ["Self-Employment Tax", "/calculators/self-employment-tax"]].map(([name, href]) => (
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
