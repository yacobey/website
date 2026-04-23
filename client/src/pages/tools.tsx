import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";

const CALENDLY = "https://calendly.com/yber2001/30min";

const accountingTools = [
  {
    name: "QuickBooks Online",
    badge: "Most Popular",
    desc: "The industry standard for small business accounting. Connects to your bank, tracks expenses, runs payroll, and integrates with more third-party tools than any other platform. We recommend QuickBooks Online for most of our bookkeeping clients.",
    bestFor: "Small businesses with $100K–$5M in revenue, multiple employees, inventory, or complex reporting needs",
    pros: [
      "Bank feed automation reduces manual entry",
      "Connects with 750+ apps including payroll and point-of-sale",
      "Your CPA can access your books directly",
      "Excellent reporting and financial statement generation",
    ],
    link: "https://quickbooks.intuit.com",
    linkText: "Try QuickBooks Online →",
    disclosure: "Affiliate link — we may earn a commission at no cost to you",
  },
  {
    name: "Xero",
    badge: null,
    desc: "A strong QuickBooks alternative with a cleaner interface and excellent multi-currency support. Popular with technology companies and businesses with international operations.",
    bestFor: "Tech companies, international businesses, firms that want a modern interface",
    pros: [
      "Unlimited users on all plans (unlike QuickBooks)",
      "Excellent bank reconciliation workflow",
      "Strong multi-currency support",
      "Good API for custom integrations",
    ],
    link: "https://www.xero.com",
    linkText: "Try Xero →",
    disclosure: "Affiliate link",
  },
  {
    name: "FreshBooks",
    badge: null,
    desc: "Built specifically for service businesses and freelancers. Simpler than QuickBooks with excellent invoicing, time tracking, and client portal features.",
    bestFor: "Solo service providers, consultants, freelancers, and businesses that invoice clients for time",
    pros: [
      "Best-in-class invoicing and payment collection",
      "Built-in time tracking",
      "Simple enough to use without accounting knowledge",
      "Client portal for estimates and approvals",
    ],
    link: "https://www.freshbooks.com",
    linkText: "Try FreshBooks →",
    disclosure: "Affiliate link",
  },
];

const payrollTools = [
  {
    name: "Gusto",
    badge: "Our Top Pick",
    desc: "Full-service payroll with automatic federal and state tax filings, W-2 and 1099 generation, benefits administration, and excellent onboarding. We recommend Gusto to most of our S-Corp and small business clients.",
    bestFor: "S-Corps, LLCs with employees, businesses that want full-service payroll with benefits",
    pros: [
      "Automatic federal, state, and local tax filings",
      "W-2s and 1099s generated automatically",
      "Employee self-service portal",
      "Integrates directly with QuickBooks and Xero",
      "Benefits administration available",
    ],
    link: "https://gusto.com",
    linkText: "Try Gusto →",
    disclosure: "Affiliate link",
  },
  {
    name: "Rippling",
    badge: null,
    desc: "Enterprise-grade HR and payroll in one platform. More powerful than Gusto for businesses that need HR automation, device management, and workforce analytics alongside payroll.",
    bestFor: "Growing companies with 10+ employees, multi-state payroll, tech-forward teams",
    pros: [
      "Payroll, HR, and IT management in one platform",
      "Best multi-state payroll automation",
      "Strong reporting and compliance tools",
      "Scales well as you hire",
    ],
    link: "https://www.rippling.com",
    linkText: "Learn about Rippling →",
    disclosure: "Affiliate link",
  },
];

const bankingTools = [
  {
    name: "Relay",
    badge: "CPA Recommended",
    desc: "Online business banking built for small businesses and their accountants. No fees, no minimums, multiple checking accounts for different purposes (operating, tax reserves, payroll), and direct QuickBooks integration. Our top recommendation for new business owners.",
    bestFor: "New businesses, S-Corps, businesses that want to separate tax reserves from operating funds",
    pros: [
      "No monthly fees or minimum balances",
      "Up to 20 checking accounts — separate operating, tax, payroll",
      "Direct QuickBooks and Xero integration",
      "Accountant access for your CPA",
      "FDIC insured through Thread Bank",
    ],
    link: "https://relayfi.com",
    linkText: "Open a Relay Account →",
    disclosure: "Affiliate link",
  },
  {
    name: "Mercury",
    badge: null,
    desc: "Clean, modern business banking popular with startups and tech companies. Excellent API, virtual cards, and treasury management features.",
    bestFor: "Startups, tech companies, businesses that need treasury management or high cash balances",
    pros: [
      "No fees, no minimums",
      "Up to $5M FDIC coverage through partner banks",
      "Excellent API and developer tools",
      "Virtual and physical debit cards",
      "Treasury accounts for idle cash",
    ],
    link: "https://mercury.com",
    linkText: "Open a Mercury Account →",
    disclosure: "Affiliate link",
  },
];

const workflowTools = [
  {
    name: "DocuSign",
    desc: "Industry standard for e-signatures. Every engagement letter we send is signed via DocuSign — legally binding, audit trail included, works on any device.",
    bestFor: "Engagement letters, contracts, any document requiring a signature",
    link: "https://www.docusign.com",
    linkText: "Try DocuSign →",
    disclosure: "No affiliate relationship — recommended on merit",
  },
  {
    name: "Loom",
    desc: "Record and share short videos explaining your financial reports, tax return questions, or onboarding instructions. Clients understand visual explanations better than email — we use Loom for client communication regularly.",
    bestFor: "Explaining financial reports to clients, answering questions that are easier to show than tell",
    link: "https://www.loom.com",
    linkText: "Try Loom →",
    disclosure: "No affiliate relationship — recommended on merit",
  },
  {
    name: "Calendly",
    desc: "The scheduling tool we use for all client consultations and discovery calls. Eliminates back-and-forth email, connects to your calendar, and sends automatic reminders.",
    bestFor: "Scheduling client meetings, discovery calls, tax review appointments",
    link: "https://calendly.com",
    linkText: "Try Calendly →",
    disclosure: "No affiliate relationship — recommended on merit",
  },
];

function ToolCard({ tool, dark = false }: { tool: { name: string; badge?: string | null; desc: string; bestFor: string; pros: string[]; link: string; linkText: string; disclosure: string }; dark?: boolean }) {
  return (
    <div className={`rounded-2xl p-6 border ${dark ? "border-emerald-500/30 bg-white/5" : "border-gray-200 bg-white hover:border-emerald-400 hover:shadow-md"} transition-all`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className={`font-semibold text-lg ${dark ? "text-white" : "text-gray-900"}`}>{tool.name}</h3>
        {tool.badge && (
          <span className="ml-3 flex-shrink-0 text-xs font-semibold bg-emerald-500 text-white px-2.5 py-1 rounded-full">{tool.badge}</span>
        )}
      </div>
      <p className={`text-sm leading-relaxed mb-4 ${dark ? "text-gray-300" : "text-gray-500"}`}>{tool.desc}</p>
      <div className="mb-4">
        <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${dark ? "text-emerald-400" : "text-emerald-600"}`}>Best for</p>
        <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>{tool.bestFor}</p>
      </div>
      <ul className="mb-5 space-y-1.5">
        {tool.pros.map((pro) => (
          <li key={pro} className={`flex items-start gap-2 text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
            <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
            {pro}
          </li>
        ))}
      </ul>
      <a href={tool.link} target="_blank" rel="noopener noreferrer"
        className={`inline-flex items-center font-semibold text-sm transition-colors ${dark ? "text-emerald-400 hover:text-emerald-300" : "text-emerald-600 hover:text-emerald-500"}`}>
        {tool.linkText}
      </a>
      <p className={`text-xs mt-2 ${dark ? "text-gray-500" : "text-gray-400"}`}>{tool.disclosure}</p>
    </div>
  );
}

function SimpleToolCard({ tool }: { tool: { name: string; desc: string; bestFor: string; link: string; linkText: string; disclosure: string } }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-emerald-400 hover:shadow-md transition-all">
      <h3 className="font-semibold text-gray-900 text-lg mb-2">{tool.name}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-4">{tool.desc}</p>
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 mb-1">Best for</p>
        <p className="text-sm text-gray-500">{tool.bestFor}</p>
      </div>
      <a href={tool.link} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center font-semibold text-sm text-emerald-600 hover:text-emerald-500 transition-colors">
        {tool.linkText}
      </a>
      <p className="text-xs text-gray-400 mt-2">{tool.disclosure}</p>
    </div>
  );
}

export default function Tools() {
  return (
    <>
      <Helmet>
        <title>Tools & Resources We Recommend | Selam CPA — Maryland CPA</title>
        <meta name="description" content="Software, tools, and professional services recommended by Selam CPA for small business owners. QuickBooks, Gusto, Relay, and more — vetted and used by our clients." />
        <meta name="keywords" content="best accounting software small business, QuickBooks online Maryland, Gusto payroll small business, business banking CPA recommended, tax resolution referral Maryland" />
        <link rel="canonical" href="https://selamcpa.com/tools" />
      </Helmet>
      <Header />

      <section className="bg-[#0a0f1e] pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-6">Tools &amp; Resources</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">Tools we actually recommend.</h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Every tool on this page is one we use with clients or have vetted personally. We only recommend what
            genuinely helps small business owners — and some of these links earn us a small referral fee,
            which helps keep our free calculators running.
          </p>
          <p className="text-gray-500 text-sm">
            We believe in full transparency. Affiliate relationships are disclosed. Our recommendations are never influenced by commission rates.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Accounting &amp; Bookkeeping Software</h2>
            <p className="text-gray-500">The foundation of clean books is the right software. These are the platforms we work in every day.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {accountingTools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Payroll Services</h2>
            <p className="text-gray-500">Payroll is where compliance mistakes are most costly. These platforms handle federal and state filings automatically.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {payrollTools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Business Banking</h2>
            <p className="text-gray-500">Your business bank account is the foundation of clean bookkeeping. These are the accounts we see working best for small businesses.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {bankingTools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0f1e] px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Tax Resolution &amp; IRS Representation</h2>
            <p className="text-gray-300">When a tax problem exceeds routine notice response, these are the specialists we trust.</p>
          </div>
          <div className="border border-emerald-500/30 rounded-2xl p-8 bg-white/5">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-white font-semibold text-xl">Tax Maverick</h3>
              <span className="text-xs font-semibold bg-emerald-500 text-white px-2.5 py-1 rounded-full flex-shrink-0 ml-4">Trusted Referral Partner</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Tax Maverick specializes in IRS tax resolution — offers in compromise, installment agreements, penalty abatement,
              and audit representation for complex cases. When our clients face serious IRS problems that require dedicated
              representation, Tax Maverick is our go-to referral.
            </p>
            <div className="mb-6">
              <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wide mb-2">Best for</p>
              <p className="text-gray-400 text-sm">IRS collections, tax debt over $10,000, audit representation, offers in compromise, wage garnishment release, bank levy release</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                "Offers in Compromise (OIC)",
                "Installment Agreements & Currently Not Collectible status",
                "Penalty Abatement Requests",
                "Audit Representation",
                "Wage Garnishment & Bank Levy Release",
                "Innocent Spouse Relief",
              ].map((svc) => (
                <div key={svc} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                  {svc}
                </div>
              ))}
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6 text-sm text-amber-200">
              <p className="font-semibold mb-1">A note on our scope</p>
              <p>Selam CPA handles routine IRS notice responses (CP2000, balance due notices, math error corrections) as part of our standard service. For serious collection matters, audits requiring full representation, or tax debt resolution, we refer clients to Tax Maverick. We only refer clients to specialists we trust to treat them well.</p>
            </div>
            <a href="https://taxmaverick.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center font-semibold text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
              Learn about Tax Maverick →
            </a>
            <p className="text-gray-600 text-xs mt-2">Referral relationship — we may receive a referral fee</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Document &amp; Workflow Tools</h2>
            <p className="text-gray-500">Tools that make the client experience smoother on both sides.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {workflowTools.map((tool) => (
              <SimpleToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Our Recommendations Policy</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Selam CPA recommends tools based on what works for our clients — not based on commission rates.
            Some links on this page are affiliate links, meaning we may earn a small commission if you sign up
            through our link, at no additional cost to you. Affiliate relationships are always disclosed.
            We never recommend a tool solely because of a commission, and we regularly review our recommendations
            to ensure they remain current.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            If you have questions about any tool or whether it is right for your business, book a free call —
            we are happy to give you an unbiased opinion.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors">
            Book a Free Consultation →
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
