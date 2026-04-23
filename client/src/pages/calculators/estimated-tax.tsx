import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

const CALENDLY = "https://calendly.com/yber2001/30min";

function fmt(n: number) { return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }); }

function federalTax(taxable: number, mfj: boolean): number {
  const brackets = mfj
    ? [[23850, 0.10], [96950, 0.12], [206700, 0.22], [394600, 0.24], [501050, 0.32], [751600, 0.35], [Infinity, 0.37]]
    : [[11925, 0.10], [48475, 0.12], [103350, 0.22], [197300, 0.24], [250525, 0.32], [626350, 0.35], [Infinity, 0.37]];
  let tax = 0, prev = 0;
  for (const [limit, rate] of brackets as [number, number][]) {
    if (taxable <= prev) break;
    tax += (Math.min(taxable, limit) - prev) * rate;
    prev = limit;
  }
  return Math.max(0, tax);
}

function marylandTax(taxable: number): number {
  const brackets: [number, number][] = [[1000, 0.02], [2000, 0.03], [3000, 0.04], [100000, 0.0475], [125000, 0.05], [150000, 0.0525], [250000, 0.055], [Infinity, 0.0575]];
  let tax = 0, prev = 0;
  for (const [limit, rate] of brackets) {
    if (taxable <= prev) break;
    tax += (Math.min(taxable, limit) - prev) * rate;
    prev = limit;
  }
  return Math.max(0, tax);
}

function Slider({ label, value, min, max, step, format, onChange }: { label: string; value: number; min: number; max: number; step: number; format?: (n: number) => string; onChange: (n: number) => void }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-emerald-600 font-semibold">{format ? format(value) : value.toLocaleString()}</span>
      </div>
      <div className="relative">
        <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}
          className="w-full h-2 appearance-none rounded-full cursor-pointer"
          style={{ background: `linear-gradient(to right, #10b981 ${pct}%, #e5e7eb ${pct}%)` }} />
      </div>
    </div>
  );
}

function Toggle({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (s: string) => void }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex gap-2">
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

const quarters = [
  { label: "Q1 2025", due: "April 15, 2025" },
  { label: "Q2 2025", due: "June 16, 2025" },
  { label: "Q3 2025", due: "September 15, 2025" },
  { label: "Q4 2025", due: "January 15, 2026" },
];

const faqs = [
  { q: "When are estimated tax payments due in 2025?", a: "Q1: April 15, 2025. Q2: June 16, 2025. Q3: September 15, 2025. Q4: January 15, 2026. Note that Q2 is only about 2 months after Q1 — not a full quarter." },
  { q: "What happens if I underpay estimated taxes?", a: "The IRS charges an underpayment penalty — currently around 8% annualized on the underpaid amount. Maryland also charges a penalty. You can avoid penalties by meeting the safe harbor thresholds: paying 100% of last year's tax liability (110% if prior year AGI exceeded $150,000) or 90% of this year's actual liability." },
  { q: "Do I need to pay Maryland estimated taxes separately?", a: "Yes. Maryland estimated taxes are paid separately from federal — to the Maryland Comptroller. Maryland uses Form PV for individual estimated payments. Payments can be made online at marylandtaxes.gov." },
  { q: "I just became self-employed. When should I start paying estimated taxes?", a: "Immediately. If you expect to owe $1,000 or more in federal tax after withholding and credits, you are required to make estimated payments. Missing the first payment creates a penalty even if you pay in full later." },
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

export default function EstimatedTax() {
  const [seIncome, setSeIncome] = useState(80000);
  const [w2Income, setW2Income] = useState(0);
  const [filing, setFiling] = useState("Single");
  const [withholding, setWithholding] = useState(0);
  const [isSE, setIsSE] = useState("Yes");

  const mfj = filing === "Married Filing Jointly";
  const stdDeductFed = mfj ? 30000 : 15000;
  const stdDeductMD = mfj ? 4850 : 2400;

  const netEarnings = seIncome * 0.9235;
  const ssTaxBase = isSE === "Yes" ? Math.max(0, Math.min(netEarnings, Math.max(0, 176100 - w2Income))) : 0;
  const ssTax = ssTaxBase * 0.124;
  const medicareTax = isSE === "Yes" ? netEarnings * 0.029 : 0;
  const seTax = ssTax + medicareTax;
  const seDeduction = seTax / 2;

  const totalGross = seIncome + w2Income;
  const qbiBase = Math.max(0, seIncome - seDeduction);
  const qbiPhaseout = mfj ? 383900 : 191950;
  const qbiDeduction = totalGross <= qbiPhaseout ? qbiBase * 0.20 : 0;
  const fedTaxable = Math.max(0, totalGross - seDeduction - qbiDeduction - stdDeductFed);
  const annualFedTax = federalTax(fedTaxable, mfj) + seTax;
  const remainingFed = Math.max(0, annualFedTax - withholding);
  const qtrFed = remainingFed / 4;

  const mdTaxable = Math.max(0, seIncome + w2Income - stdDeductMD);
  const annualMDTax = marylandTax(mdTaxable);
  const qtrMD = annualMDTax / 4;
  const qtrTotal = qtrFed + qtrMD;

  return (
    <>
      <Helmet>
        <title>Quarterly Estimated Tax Calculator 2025 | Selam CPA — Maryland</title>
        <meta name="description" content="Calculate your 2025 quarterly estimated tax payments — Q1 through Q4. Federal and Maryland. Avoid underpayment penalties. Free calculator by Selam CPA." />
        <meta name="keywords" content="quarterly estimated tax calculator 2025, estimated tax payments Maryland, Q1 Q2 Q3 Q4 estimated tax, self employed estimated tax 2025" />
        <link rel="canonical" href="https://selamcpa.com/calculators/estimated-tax" />
      </Helmet>
      <Header />

      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-emerald-600">Home</Link> › <Link href="/calculators" className="hover:text-emerald-600">Calculators</Link> › Quarterly Estimated Tax
          </div>

          <div className="mb-10">
            <p className="text-emerald-600 text-xs font-semibold tracking-widest uppercase mb-3">FREE CALCULATOR · 2025 TAX YEAR</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Quarterly Estimated Tax Calculator</h1>
            <p className="text-gray-500 text-lg max-w-2xl">Calculate your federal and Maryland estimated tax payments for each quarter of 2025 — and avoid the underpayment penalty.</p>
            <p className="text-xs text-gray-400 mt-3">For estimation purposes only. Consult a CPA for personalized advice.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Your Information</h2>
              <Slider label="Expected Annual Net Income (Self-Employment)" value={seIncome} min={0} max={500000} step={5000} format={fmt} onChange={setSeIncome} />
              <Slider label="Other W-2 Income (you or spouse)" value={w2Income} min={0} max={300000} step={5000} format={fmt} onChange={setW2Income} />
              <Toggle label="Filing Status" options={["Single", "Married Filing Jointly"]} value={filing} onChange={setFiling} />
              <Slider label="Federal Tax Already Withheld (W-2)" value={withholding} min={0} max={100000} step={1000} format={fmt} onChange={setWithholding} />
              <Toggle label="Self-employed?" options={["Yes", "No"]} value={isSE} onChange={setIsSE} />
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quarterly Payment Schedule</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 text-gray-500 font-medium">Quarter</th>
                        <th className="text-left py-2 text-gray-500 font-medium">Due</th>
                        <th className="text-right py-2 text-gray-500 font-medium">Federal</th>
                        <th className="text-right py-2 text-gray-500 font-medium">Maryland</th>
                        <th className="text-right py-2 text-gray-500 font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quarters.map((q) => (
                        <tr key={q.label} className="border-b border-gray-50">
                          <td className="py-3 font-medium text-gray-900">{q.label}</td>
                          <td className="py-3 text-gray-500 text-xs">{q.due}</td>
                          <td className="py-3 text-right text-gray-700">{fmt(qtrFed)}</td>
                          <td className="py-3 text-right text-gray-700">{fmt(qtrMD)}</td>
                          <td className="py-3 text-right font-semibold text-emerald-600">{fmt(qtrTotal)}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td className="py-3 font-bold text-gray-900" colSpan={2}>Annual Total</td>
                        <td className="py-3 text-right font-bold text-gray-900">{fmt(remainingFed)}</td>
                        <td className="py-3 text-right font-bold text-gray-900">{fmt(annualMDTax)}</td>
                        <td className="py-3 text-right font-bold text-emerald-600">{fmt(remainingFed + annualMDTax)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm">
                <p className="font-semibold text-amber-800 mb-1">Safe Harbor Rule</p>
                <p className="text-amber-700">To avoid penalties, pay the lesser of 100% of last year's tax liability or 90% of this year's actual tax. If last year's AGI exceeded $150,000, the prior-year safe harbor is 110%.</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm">
                <p className="font-semibold text-blue-800 mb-1">Maryland County Tax</p>
                <p className="text-blue-700">These are federal and Maryland state estimates only. If you live in a Maryland county, add county income tax (2.25%–3.2% of Maryland taxable income).</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">{faqs.map(faq => <FAQ key={faq.q} q={faq.q} a={faq.a} />)}</div>
          </div>

          <div className="mt-12 bg-[#0a0f1e] rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Want a precise estimate?</h2>
            <p className="text-gray-400 mb-6">We'll review your actual situation and build a payment plan that keeps you safe from penalties.</p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">
              Book a Free Consultation →
            </a>
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-gray-700 mb-4">Related Calculators</p>
            <div className="flex flex-wrap gap-3">
              {[["S-Corp Tax Savings", "/calculators/scorp-savings"], ["Self-Employment Tax", "/calculators/self-employment-tax"], ["Home Office Deduction", "/calculators/home-office"]].map(([name, href]) => (
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
