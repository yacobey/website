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
  { q: "Which retirement plan is best for a self-employed person with no employees?", a: "For most self-employed individuals with no employees, the Solo 401(k) allows the highest contribution — especially at income levels below $150,000. The employee elective deferral component lets you contribute up to $23,500 regardless of business income, while the employer contribution adds up to 20% of net SE income on top of that." },
  { q: "What is the deadline to open and fund a Solo 401(k)?", a: "The plan must be established by December 31 of the tax year. Contributions can be made up to the tax filing deadline including extensions — April 15 with an October 15 extension. The establishment deadline is critical — you cannot open a new Solo 401(k) for 2025 after December 31, 2025." },
  { q: "Can I have both a SEP-IRA and a Solo 401(k)?", a: "No — you cannot contribute to both a SEP-IRA and a Solo 401(k) for the same year if they are for the same self-employment activity. You choose one. If you have a W-2 job with a 401(k) and also have self-employment income, different rules apply — consult a CPA." },
  { q: "What is the SEP-IRA contribution limit for 2025?", a: "The SEP-IRA limit for 2025 is the lesser of 25% of compensation or $70,000. For self-employed individuals, the effective rate is approximately 20% of net self-employment income after the SE tax deduction. The SEP is simple to set up and has no annual filing requirement until the balance exceeds $250,000." },
  { q: "Does my retirement contribution reduce my self-employment tax?", a: "No. Retirement contributions reduce your income tax but do not reduce your self-employment tax. SE tax is calculated on net self-employment income before retirement contributions. Only the SE deduction (half of SE tax) and the health insurance deduction reduce the SE tax base." },
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

export default function RetirementCalculator() {
  const [netIncome, setNetIncome] = useState(100000);
  const [age, setAge] = useState(40);
  const [filing, setFiling] = useState("Single");
  const [hasEmployees, setHasEmployees] = useState("No");
  const [marginalRate, setMarginalRate] = useState(24);

  const catchUp50 = age >= 50;

  const seTax = netIncome * 0.9235 * 0.153;
  const seDeduction = seTax / 2;
  const netForSep = netIncome - seDeduction;

  const sepMax = Math.min(netForSep * 0.20, 70000);

  const solo401kEmployee = Math.min(netIncome, 23500 + (catchUp50 ? 7500 : 0));
  const solo401kEmployer = Math.min(netForSep * 0.20, 70000 - solo401kEmployee);
  const solo401kTotal = Math.min(solo401kEmployee + solo401kEmployer, 70000 + (catchUp50 ? 7500 : 0));

  const simpleEmployee = Math.min(netIncome, 16500 + (catchUp50 ? 3500 : 0));
  const simpleEmployer = netIncome * 0.03;
  const simpleTotal = simpleEmployee + simpleEmployer;

  const sepSavings = sepMax * (marginalRate / 100);
  const soloSavings = solo401kTotal * (marginalRate / 100);
  const simpleSavings = simpleTotal * (marginalRate / 100);

  const maxPlan = solo401kTotal >= sepMax && solo401kTotal >= simpleTotal ? "Solo 401(k)" : sepMax >= simpleTotal ? "SEP-IRA" : "SIMPLE IRA";
  const soloBetterBySep = solo401kTotal - sepMax;

  return (
    <>
      <Helmet>
        <title>Self-Employed Retirement Calculator 2025 | SEP-IRA vs Solo 401k | Selam CPA</title>
        <meta name="description" content="Compare SEP-IRA, Solo 401(k), and SIMPLE IRA contribution limits and tax savings for self-employed individuals in 2025. Free calculator by Selam CPA." />
        <meta name="keywords" content="SEP IRA calculator 2025, Solo 401k calculator 2025, self employed retirement calculator, SEP IRA vs Solo 401k, SIMPLE IRA 2025 limits, retirement contribution tax savings" />
        <link rel="canonical" href="https://selamcpa.com/calculators/retirement" />
      </Helmet>
      <Header />

      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-emerald-600">Home</Link> › <Link href="/calculators" className="hover:text-emerald-600">Calculators</Link> › Self-Employed Retirement
          </div>

          <div className="mb-10">
            <p className="text-emerald-600 text-xs font-semibold tracking-widest uppercase mb-3">FREE CALCULATOR · 2025 TAX YEAR</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Self-Employed Retirement Calculator</h1>
            <p className="text-gray-500 text-lg max-w-2xl">Compare SEP-IRA, Solo 401(k), and SIMPLE IRA — see which plan lets you contribute the most and save the most in taxes for 2025.</p>
            <p className="text-xs text-gray-400 mt-3">For estimation purposes only. Consult a CPA for personalized advice.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Your Information</h2>
              <Slider label="Net Self-Employment Income" value={netIncome} min={0} max={500000} step={5000} format={fmt} onChange={setNetIncome} />
              <Slider label="Age" value={age} min={18} max={75} step={1} onChange={setAge} />
              {catchUp50 && <div className="mb-5 p-3 bg-emerald-50 rounded-lg text-sm text-emerald-700 font-medium">Catch-up contributions available (age 50+)</div>}
              <Toggle label="Filing Status" options={["Single", "Married Filing Jointly"]} value={filing} onChange={setFiling} />
              <Toggle label="Do you have employees?" options={["Yes", "No"]} value={hasEmployees} onChange={setHasEmployees} />
              <Slider label="Estimated Marginal Tax Rate" value={marginalRate} min={10} max={37} step={1} format={(n) => `${n}%`} onChange={setMarginalRate} />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: "SEP-IRA", contrib: sepMax, savings: sepSavings, note: "Simple to set up. No annual filing under $250K balance.", deadline: "Tax filing deadline + extensions" },
                  { name: "Solo 401(k)", contrib: solo401kTotal, savings: soloSavings, note: catchUp50 ? `$${(23500+7500).toLocaleString()} employee + ${fmt(solo401kEmployer)} employer` : `$${(23500).toLocaleString()} employee + ${fmt(solo401kEmployer)} employer`, deadline: "Dec 31 to open, tax deadline to fund" },
                  { name: "SIMPLE IRA", contrib: simpleTotal, savings: simpleSavings, note: "For businesses with employees. Simpler than 401(k).", deadline: "Oct 1 to establish" },
                ].map((plan) => {
                  const isBest = plan.name === maxPlan;
                  return (
                    <div key={plan.name} className={`rounded-2xl p-4 border-2 transition-all ${isBest ? "border-emerald-500 bg-emerald-50" : "border-gray-200 bg-white"}`}>
                      {isBest && <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">✓ Highest</p>}
                      <h3 className="font-semibold text-gray-900 text-sm mb-2">{plan.name}</h3>
                      <p className="text-2xl font-bold text-emerald-600">{fmt(plan.contrib)}</p>
                      <p className="text-xs text-gray-500 mt-1">max contribution</p>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500">Tax savings</p>
                        <p className="font-semibold text-gray-900 text-sm">{fmt(plan.savings)}</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">{plan.note}</p>
                      <p className="text-xs text-gray-400 mt-1 font-medium">Deadline: {plan.deadline}</p>
                    </div>
                  );
                })}
              </div>

              {soloBetterBySep > 0 && (
                <div className="bg-[#0a0f1e] rounded-2xl p-5 text-white">
                  <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wide mb-2">Key Insight</p>
                  <p className="text-sm leading-relaxed">
                    At {fmt(netIncome)} income, a Solo 401(k) allows you to contribute{" "}
                    <span className="font-bold text-emerald-400">{fmt(soloBetterBySep)} more</span> than a SEP-IRA —
                    saving an additional <span className="font-bold text-emerald-400">{fmt(soloBetterBySep * marginalRate / 100)}</span> in taxes.
                  </p>
                </div>
              )}

              {hasEmployees === "Yes" && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
                  <p className="font-semibold text-amber-800 mb-1">Note: Solo 401(k) Limitation</p>
                  <p className="text-amber-700">Solo 401(k) plans are only available to self-employed individuals with no full-time employees (other than a spouse). If you have employees, the SEP-IRA or SIMPLE IRA are your primary options.</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">{faqs.map(faq => <FAQ key={faq.q} q={faq.q} a={faq.a} />)}</div>
          </div>

          <div className="mt-12 bg-[#0a0f1e] rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to open a retirement plan?</h2>
            <p className="text-gray-400 mb-6">We'll walk you through the plan options and help you maximize your contribution for 2025.</p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">Book a Free Consultation →</a>
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-gray-700 mb-4">Related Calculators</p>
            <div className="flex flex-wrap gap-3">
              {[["Self-Employment Tax", "/calculators/self-employment-tax"], ["S-Corp Tax Savings", "/calculators/scorp-savings"], ["Quarterly Estimated Tax", "/calculators/estimated-tax"]].map(([name, href]) => (
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
