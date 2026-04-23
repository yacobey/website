import { Helmet } from "react-helmet";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

const calculators = [
  {
    category: "Business Structure",
    tools: [
      {
        name: "S-Corp Tax Savings Calculator",
        desc: "Compare sole proprietor vs. S-Corp tax liability side by side. See your exact savings using 2025 federal rates.",
        href: "/calculators/scorp-savings",
        badge: "Most Popular",
      },
      {
        name: "Self-Employment Tax Calculator",
        desc: "Calculate your SE tax liability (15.3%) and the above-the-line deduction you can take on Form 1040.",
        href: "/calculators/self-employment-tax",
        badge: null,
      },
    ],
  },
  {
    category: "Tax Planning",
    tools: [
      {
        name: "Quarterly Estimated Tax Calculator",
        desc: "Calculate your Q1–Q4 federal and Maryland estimated tax payments. Avoid underpayment penalties.",
        href: "/calculators/estimated-tax",
        badge: null,
      },
      {
        name: "Home Office Deduction Calculator",
        desc: "Actual vs. simplified method comparison. See which saves more based on your home size and expenses.",
        href: "/calculators/home-office",
        badge: null,
      },
      {
        name: "Mileage Deduction Calculator",
        desc: "2025 standard mileage rate: $0.70/mile. Calculate your business mileage deduction for the year.",
        href: "/calculators/mileage",
        badge: null,
      },
      {
        name: "Section 179 Expensing Calculator",
        desc: "First-year equipment and asset deduction. See how much of your 2025 purchases you can deduct immediately.",
        href: "/calculators/section-179",
        badge: null,
      },
    ],
  },
  {
    category: "Business Finance",
    tools: [
      {
        name: "Fractional CFO ROI Calculator",
        desc: "See how quickly a fractional CFO engagement pays for itself based on your revenue and current pain points.",
        href: "/calculators/fractional-cfo-roi",
        badge: null,
      },
      {
        name: "Break-Even Analysis Calculator",
        desc: "How many units or client engagements do you need to cover your fixed costs? Know your number.",
        href: "/calculators/break-even",
        badge: null,
      },
      {
        name: "Cash Flow Forecast Calculator",
        desc: "Project your monthly cash position for the next 12 months based on revenue and expense assumptions.",
        href: "/calculators/cash-flow",
        badge: null,
      },
      {
        name: "Retirement Contribution Calculator",
        desc: "SEP-IRA, Solo 401(k), SIMPLE IRA — compare contribution limits and tax savings for self-employed.",
        href: "/calculators/retirement",
        badge: null,
      },
    ],
  },
];

export default function CalculatorsHub() {
  return (
    <>
      <Helmet>
        <title>Free Tax & Finance Calculators for Small Business | Selam CPA</title>
        <meta name="description" content="Free tax and financial calculators for small business owners — S-Corp savings, quarterly estimated tax, home office deduction, mileage, Section 179, and more. Built by Selam CPA, Maryland CPA firm." />
        <link rel="canonical" href="https://selamcpa.com/calculators" />
      </Helmet>

      <Header />

      <div className="bg-gray-50 border-b border-gray-200 py-3">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <nav className="text-sm text-gray-500">
            <Link href="/"><span className="hover:text-emerald-600 cursor-pointer">Home</span></Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900">Calculators</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="mb-12">
          <p className="text-emerald-600 text-sm font-medium tracking-widest uppercase mb-3">Free Tools · No Email Required</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Tax & Finance Calculators</h1>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
            Built for small business owners. Free to use. Real numbers based on 2025 federal and Maryland tax rates.
          </p>
        </div>

        <div className="space-y-12">
          {calculators.map((cat) => (
            <div key={cat.category}>
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">{cat.category}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {cat.tools.map((tool) => (
                  <Link key={tool.name} href={tool.href}>
                    <div className="group border border-gray-200 rounded-xl p-6 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer h-full">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">{tool.name}</h3>
                        {tool.badge && (
                          <span className="ml-2 flex-shrink-0 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">{tool.badge}</span>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#0a0f1e] rounded-2xl p-10 text-center">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-3">Need more than a calculator?</p>
          <h2 className="text-3xl font-bold text-white mb-4">Talk to a CPA who knows your numbers.</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">Calculators give you estimates. A CPA gives you a strategy. Book a free 30-minute call.</p>
          <a href="https://calendly.com/yber2001/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">
            Book a Free Discovery Call →
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
