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

const faqs = [
  { q: "What is the exclusive use requirement for the home office deduction?", a: "Your home office must be used regularly and exclusively for business. A dedicated room is ideal. A corner of a room shared with personal use does not qualify — the IRS has been clear on this. Occasional personal use disqualifies the deduction." },
  { q: "Is the simplified method always worse than the actual method?", a: "Not always. For small offices in expensive homes, the simplified method ($5 per sq ft, max $1,500) can occasionally exceed the actual method. But for most home offices, the actual method produces a larger deduction — especially when rent or mortgage interest is high." },
  { q: "Can I use the home office deduction as an employee working from home?", a: "No. The Tax Cuts and Jobs Act of 2017 suspended the employee home office deduction through 2025. Only self-employed individuals and independent contractors can currently deduct home office expenses." },
  { q: "Does the home office deduction trigger an audit?", a: "It used to be considered a red flag, but home office deductions have become much more common — especially post-pandemic. The key is that the space must genuinely meet the exclusive and regular use requirements. Document the square footage and take photos." },
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

export default function HomeOffice() {
  const [officeSqft, setOfficeSqft] = useState(150);
  const [totalSqft, setTotalSqft] = useState(1500);
  const [mortgageRent, setMortgageRent] = useState(18000);
  const [propertyTax, setPropertyTax] = useState(5000);
  const [insurance, setInsurance] = useState(1500);
  const [utilities, setUtilities] = useState(3600);
  const [netIncome, setNetIncome] = useState(80000);

  const businessPct = totalSqft > 0 ? officeSqft / totalSqft : 0;
  const actualDeduction = (mortgageRent + propertyTax + insurance + utilities) * businessPct;

  const simplifiedSqft = Math.min(officeSqft, 300);
  const simplifiedRaw = simplifiedSqft * 5;
  const simplifiedDeduction = Math.min(simplifiedRaw, netIncome, 1500);

  const actualBetter = actualDeduction >= simplifiedDeduction;

  return (
    <>
      <Helmet>
        <title>Home Office Deduction Calculator 2025 | Selam CPA — Actual vs Simplified</title>
        <meta name="description" content="Calculate your 2025 home office deduction — actual expense method vs. simplified method. See which saves more. Free calculator by Selam CPA, Maryland." />
        <meta name="keywords" content="home office deduction calculator 2025, Form 8829 calculator, simplified method home office, home office actual vs simplified, self employed home office deduction" />
        <link rel="canonical" href="https://selamcpa.com/calculators/home-office" />
      </Helmet>
      <Header />

      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-emerald-600">Home</Link> › <Link href="/calculators" className="hover:text-emerald-600">Calculators</Link> › Home Office Deduction
          </div>

          <div className="mb-10">
            <p className="text-emerald-600 text-xs font-semibold tracking-widest uppercase mb-3">FREE CALCULATOR · 2025 TAX YEAR</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Home Office Deduction Calculator</h1>
            <p className="text-gray-500 text-lg max-w-2xl">Compare the actual expense method and simplified method — and see which produces a larger deduction for your situation.</p>
            <p className="text-xs text-gray-400 mt-3">For estimation purposes only. Consult a CPA for personalized advice.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Your Home &amp; Office</h2>
              <Slider label="Home Office Square Footage" value={officeSqft} min={50} max={800} step={10} onChange={setOfficeSqft} />
              <Slider label="Total Home Square Footage" value={totalSqft} min={500} max={5000} step={100} onChange={setTotalSqft} />
              <div className="mb-5 p-3 bg-emerald-50 rounded-lg text-sm">
                <span className="text-emerald-700 font-medium">Business use: {(businessPct * 100).toFixed(1)}%</span>
              </div>
              <Slider label="Annual Mortgage Interest or Rent" value={mortgageRent} min={0} max={60000} step={500} format={fmt} onChange={setMortgageRent} />
              <Slider label="Annual Property Tax" value={propertyTax} min={0} max={20000} step={250} format={fmt} onChange={setPropertyTax} />
              <Slider label="Annual Insurance" value={insurance} min={0} max={5000} step={100} format={fmt} onChange={setInsurance} />
              <Slider label="Annual Utilities" value={utilities} min={0} max={10000} step={200} format={fmt} onChange={setUtilities} />
              <Slider label="Annual Net Business Income" value={netIncome} min={0} max={500000} step={5000} format={fmt} onChange={setNetIncome} />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className={`rounded-2xl p-6 border-2 transition-all ${actualBetter ? "border-emerald-500 bg-emerald-50" : "border-gray-200 bg-white"}`}>
                  {actualBetter && <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">✓ Recommended</p>}
                  <h3 className="font-semibold text-gray-900 mb-1">Actual Expense Method</h3>
                  <p className="text-3xl font-bold text-emerald-600 mt-2">{fmt(actualDeduction)}</p>
                  <p className="text-xs text-gray-500 mt-2">Requires Form 8829</p>
                  <div className="mt-4 text-xs text-gray-600 space-y-1">
                    <p>Mortgage/Rent: {fmt(mortgageRent * businessPct)}</p>
                    <p>Property Tax: {fmt(propertyTax * businessPct)}</p>
                    <p>Insurance: {fmt(insurance * businessPct)}</p>
                    <p>Utilities: {fmt(utilities * businessPct)}</p>
                  </div>
                </div>

                <div className={`rounded-2xl p-6 border-2 transition-all ${!actualBetter ? "border-emerald-500 bg-emerald-50" : "border-gray-200 bg-white"}`}>
                  {!actualBetter && <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">✓ Recommended</p>}
                  <h3 className="font-semibold text-gray-900 mb-1">Simplified Method</h3>
                  <p className="text-3xl font-bold text-emerald-600 mt-2">{fmt(simplifiedDeduction)}</p>
                  <p className="text-xs text-gray-500 mt-2">{Math.min(officeSqft, 300)} sq ft × $5 per sq ft</p>
                  <div className="mt-4 text-xs text-gray-600 space-y-1">
                    <p>Max: $1,500 (300 sq ft)</p>
                    <p>No Form 8829 required</p>
                    <p>Capped at net income</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-5 text-sm space-y-2 text-gray-600">
                <p className="font-semibold text-gray-900">Important Notes</p>
                <p>• The simplified method maximum is $1,500 (300 sq ft × $5)</p>
                <p>• The actual method requires Form 8829 and a more detailed calculation</p>
                <p>• The space must be used regularly and exclusively for business — no personal use allowed</p>
                <p>• Mortgage interest deductible as home office expense does not reduce your Schedule A deduction — it adds to it</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">{faqs.map(faq => <FAQ key={faq.q} q={faq.q} a={faq.a} />)}</div>
          </div>

          <div className="mt-12 bg-[#0a0f1e] rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Let's maximize your home office deduction.</h2>
            <p className="text-gray-400 mb-6">We'll review your actual expenses and determine the best method for your return.</p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">Book a Free Consultation →</a>
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-gray-700 mb-4">Related Calculators</p>
            <div className="flex flex-wrap gap-3">
              {[["Mileage Deduction", "/calculators/mileage"], ["Self-Employment Tax", "/calculators/self-employment-tax"], ["Quarterly Estimated Tax", "/calculators/estimated-tax"]].map(([name, href]) => (
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
