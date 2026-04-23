import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { businessConfig } from "@/lib/business-config";
import yacobHeadshot from "@assets/yacob-headshot.png";

const services = [
  {
    title: "Tax Preparation & Planning",
    desc: "Federal and state returns for individuals, S-Corps, LLCs, partnerships, and C-Corps. Strategic planning year-round — not just at filing time.",
    icon: "📋",
    href: "/tax",
    keywords: "tax preparation Maryland DC Virginia",
  },
  {
    title: "Bookkeeping & Accounting",
    desc: "Monthly, quarterly, or annual bookkeeping. Clean books mean clear decisions. We keep your records accurate so you always know where you stand.",
    icon: "📊",
    href: "/bookkeeping",
    keywords: "bookkeeping small business DMV",
  },
  {
    title: "Fractional CFO Services",
    desc: "CFO-level financial strategy without the CFO salary. Cash flow forecasting, KPI dashboards, budget vs. actual analysis, and management reports.",
    icon: "📈",
    href: "/advisory",
    keywords: "fractional CFO Maryland small business",
  },
  {
    title: "Audit, Review & Compilation",
    desc: "SSARS-compliant financial statement services. Compilations, reviews, and audits prepared to the standards lenders, investors, and regulators require.",
    icon: "🔍",
    href: "/audit",
    keywords: "audit review compilation SSARS Maryland",
  },
  {
    title: "Tax Strategy & Advisory",
    desc: "Entity selection, S-Corp elections, retirement planning, and multi-year tax reduction strategies. Proactive advice that compounds over time.",
    icon: "💡",
    href: "/advisory",
    keywords: "tax strategy advisory planning",
  },
  {
    title: "AI Consulting for Firms",
    desc: "We built an AI-native accounting firm from scratch. Now we help other firms do the same — custom Claude systems, workflow automation, and knowledge bases.",
    icon: "🤖",
    href: "/ai-consulting",
    keywords: "AI consulting accounting firms Claude",
  },
];

const industries = [
  { name: "Healthcare & Medical", desc: "Practices, clinics, therapists", href: "/industries/healthcare" },
  { name: "Legal & Professional", desc: "Law firms, consultants, agencies", href: "/industries/legal" },
  { name: "Real Estate", desc: "Investors, agents, property managers", href: "/industries/real-estate" },
  { name: "Technology & SaaS", desc: "Startups, software companies", href: "/industries/technology" },
  { name: "Retail & E-Commerce", desc: "Stores, online sellers, DTC brands", href: "/industries/retail" },
  { name: "Construction", desc: "Contractors, builders, trades", href: "/industries/construction" },
  { name: "Nonprofits", desc: "501(c)(3) organizations, associations", href: "/industries/nonprofit" },
  { name: "Restaurants & Hospitality", desc: "Restaurants, cafes, event venues", href: "/industries/hospitality" },
];

const faqs = [
  {
    q: "Do you work with clients outside Maryland?",
    a: "Yes. While we are based in Laurel, Maryland and serve clients throughout the DMV region in person, we work with small businesses and individuals across all 50 states virtually. Our systems are built for remote collaboration.",
  },
  {
    q: "What is a Fractional CFO and does my business need one?",
    a: "A Fractional CFO provides part-time CFO-level financial leadership — cash flow forecasting, KPI tracking, budget management, and strategic advice — at a fraction of the cost of a full-time hire. If your business has revenue above $500K and you are making major financial decisions without a financial advisor, a Fractional CFO engagement pays for itself quickly.",
  },
  {
    q: "What is the difference between an audit, a review, and a compilation?",
    a: "A compilation presents financial information without verification. A review provides limited assurance through analytical procedures and inquiry. An audit provides the highest level of assurance through independent verification. The right engagement depends on what your lender, investor, or regulator requires.",
  },
  {
    q: "What does CPA, FCCA mean?",
    a: "CPA stands for Certified Public Accountant — the US standard for licensed accounting professionals. FCCA stands for Fellow of the Association of Chartered Certified Accountants, a senior designation from the global ACCA body. Holding both credentials signals competency in both US and international accounting standards — rare among solo practitioners.",
  },
  {
    q: "How does the AI consulting service work?",
    a: "We help accounting firms and small businesses build custom AI systems using Claude — the same system powering our own practice. Engagements start with a workflow assessment, then move to building custom skills, knowledge bases, and automation pipelines. You do not need any coding experience.",
  },
  {
    q: "How do I get started?",
    a: "Book a free 30-minute discovery call through our calendar. No commitment, no pitch — just a direct conversation about your situation and whether we are the right fit.",
  },
];

const calculators = [
  { name: "S-Corp Tax Savings", desc: "See how much you could save by electing S-Corp status", href: "/calculators/scorp-savings" },
  { name: "Quarterly Estimated Tax", desc: "Calculate your Q1–Q4 estimated payments", href: "/calculators/estimated-tax" },
  { name: "Home Office Deduction", desc: "Actual vs. simplified method comparison", href: "/calculators/home-office" },
];

export default function Home() {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AccountingService",
        "name": "Selam CPA",
        "legalName": "Selam Tax Inc.",
        "url": "https://selamcpa.com",
        "telephone": "+13016408549",
        "email": "info@selamcpa.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8593 Light Moon Way",
          "addressLocality": "Laurel",
          "addressRegion": "MD",
          "postalCode": "20723",
          "addressCountry": "US",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 39.0993,
          "longitude": -76.8483,
        },
        "areaServed": [
          "Laurel, MD", "Columbia, MD", "Baltimore, MD",
          "Washington, DC", "Northern Virginia", "United States"
        ],
        "priceRange": "$$",
        "openingHours": "Mo-Fr 09:00-17:00",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Accounting & Advisory Services",
          "itemListElement": services.map(s => ({
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": s.title }
          }))
        }
      },
      {
        "@type": "Person",
        "name": "Yacob Tewelde",
        "jobTitle": "CPA, FCCA",
        "worksFor": { "@type": "Organization", "name": "Selam CPA" },
        "hasCredential": [
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "CPA", "recognizedBy": { "@type": "Organization", "name": "Maryland Board of Public Accountancy" }},
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "FCCA", "recognizedBy": { "@type": "Organization", "name": "Association of Chartered Certified Accountants" }}
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Selam CPA | Tax, Bookkeeping & Fractional CFO | Laurel MD & Virtual Nationwide</title>
        <meta name="description" content="Selam CPA — led by Yacob Tewelde, CPA, FCCA. Tax preparation, bookkeeping, fractional CFO, audit, review & compilation for small businesses in Laurel MD, DMV region, and all 50 states virtually." />
        <meta name="keywords" content="CPA Laurel Maryland, CPA Columbia MD, CPA Baltimore, CPA Washington DC, fractional CFO Maryland, bookkeeping DMV, tax preparation Maryland, S-Corp tax, audit review compilation Maryland, AI consulting accounting firms" />
        <meta property="og:title" content="Selam CPA | Tax, Bookkeeping & Fractional CFO" />
        <meta property="og:description" content="Full-service CPA firm serving small businesses in the DMV and virtually nationwide. Tax, bookkeeping, fractional CFO, audit, and AI consulting." />
        <meta property="og:url" content="https://selamcpa.com" />
        <link rel="canonical" href="https://selamcpa.com" />
        <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
      </Helmet>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-start overflow-hidden">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero-video.mp4"
        />
        <div className="absolute inset-0 bg-[#0a0f1e]/70" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-32">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-6">
            Laurel, MD · Columbia · Baltimore · DC · Virginia · All 50 States Virtual
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Your Business Is Growing.<br />
            <span className="text-emerald-400">Your Finances Should Keep Up.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            Full-service CPA firm for small business owners who want more than a tax return.
            Tax preparation, bookkeeping, fractional CFO, audit, review &amp; compilation —
            all under one roof, built for how you actually work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={businessConfig.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors"
            >
              Book a Free Discovery Call →
            </a>
            <a
              href={`tel:${businessConfig.phoneE164}`}
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white hover:bg-white/10 font-semibold rounded-lg transition-colors"
            >
              {businessConfig.phone}
            </a>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            No commitment. No pitch. Just a direct conversation about your business.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16">
            <p className="text-emerald-600 text-sm font-medium tracking-widest uppercase mb-3">What We Do</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Every service your business needs.<br />One firm that knows your numbers.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl">
              From day-to-day bookkeeping to CFO-level strategy, from annual tax returns
              to audit-ready financial statements — we handle it all so you can focus on building.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s.title} href={s.href}>
                <div className="group border border-gray-200 rounded-xl p-6 hover:border-emerald-400 hover:shadow-lg transition-all cursor-pointer h-full">
                  <div className="text-3xl mb-4">{s.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16">
            <p className="text-emerald-600 text-sm font-medium tracking-widest uppercase mb-3">Who We Serve</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for small business owners.<br />Across every industry.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl">
              Whether you run a medical practice, a law firm, a construction company, or an
              e-commerce store — the financial challenges are similar and we know them well.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((ind) => (
              <Link key={ind.name} href={ind.href}>
                <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer">
                  <h3 className="font-semibold text-gray-900 mb-1">{ind.name}</h3>
                  <p className="text-gray-400 text-sm">{ind.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-[#0a0f1e]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src={yacobHeadshot}
                alt="Yacob Tewelde, CPA, FCCA — Selam CPA"
                className="rounded-2xl w-full object-cover max-h-[500px]"
              />
            </div>
            <div>
              <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-4">About</p>
              <h2 className="text-4xl font-bold text-white mb-6">
                You don't need another accountant.<br />
                <span className="text-emerald-400">You need someone who's seen this before.</span>
              </h2>
              <blockquote className="border-l-4 border-emerald-400 pl-6 mb-8">
                <p className="text-gray-300 text-lg italic leading-relaxed">
                  "I work with a small number of business owners at a time — by design.
                  That's how I give each client the attention their business actually requires."
                </p>
              </blockquote>
              <p className="text-gray-400 leading-relaxed mb-8">
                Selam CPA is led by Yacob Tewelde, a licensed CPA in Maryland and a Fellow of the
                Association of Chartered Certified Accountants — one of the few professionals in the
                DMV holding both credentials. This dual qualification means fluency in both US and
                international accounting standards, making Selam CPA uniquely equipped for businesses
                with cross-border operations, international owners, or complex structures.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Beyond traditional accounting, Selam CPA operates as an AI-native practice —
                meaning your work is supported by purpose-built systems, not just spreadsheets and
                email. Every engagement benefits from faster turnaround, more consistent outputs,
                and a layer of analytical depth that simply wasn't available to solo practitioners
                before now.
              </p>
              <div className="flex flex-wrap gap-2">
                {["CPA — Maryland", "FCCA — ACCA Global", "AI-Native Practice", "DMV + Nationwide Virtual"].map(c => (
                  <span key={c} className="px-3 py-1 border border-emerald-500/40 text-emerald-400 rounded-full text-sm">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATORS TEASER */}
      <section id="calculators" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16">
            <p className="text-emerald-600 text-sm font-medium tracking-widest uppercase mb-3">Free Tools</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Know your numbers before the call.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl">
              Free tax and financial calculators built for small business owners.
              No email required — just real numbers you can use.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {calculators.map((calc) => (
              <Link key={calc.name} href={calc.href}>
                <div className="border border-gray-200 rounded-xl p-5 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                    {calc.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{calc.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/calculators">
            <span className="text-emerald-600 font-medium hover:text-emerald-500 cursor-pointer">
              View all calculators →
            </span>
          </Link>
        </div>
      </section>

      {/* AI CONSULTING TEASER */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-emerald-600 text-sm font-medium tracking-widest uppercase mb-3">For Accounting Firms</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                We built an AI-native firm.<br />
                <span className="text-emerald-600">We can build one for you.</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Selam CPA runs on a custom AI system — purpose-built skills for engagement letters,
                tax organizers, IRS notice responses, CFO reports, and more. A knowledge base with
                3,700+ vectors of IRS and state tax guidance. Automated HubSpot CRM sync.
                All built without writing a single line of code.
              </p>
              <Link href="/ai-consulting">
                <span className="inline-flex items-center px-6 py-3 bg-[#0a0f1e] text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                  Learn about AI consulting →
                </span>
              </Link>
            </div>
            <div className="bg-[#0a0f1e] rounded-2xl p-8">
              <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-6">What We've Built</p>
              {[
                "5 custom skills — engagement letters, tax organizers, IRS responses, CFO reports, consulting proposals",
                "3,777 knowledge vectors — IRS publications + all 40 income-tax states",
                "Automated HubSpot CRM sync on every client engagement",
                "Professional branded DOCX output on every deliverable",
                "Zero coding required — all built by a CPA with no technical background",
              ].map((item, i) => (
                <div key={i} className="flex gap-3 mb-4">
                  <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                  <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="mb-16 text-center">
            <p className="text-emerald-600 text-sm font-medium tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-4xl font-bold text-gray-900">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="border border-gray-200 rounded-xl group">
                <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-gray-900 hover:text-emerald-600 transition-colors list-none">
                  {faq.q}
                  <span className="text-emerald-500 ml-4 flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-[#0a0f1e]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-4">Get Started</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to get your finances working as hard as you do?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Book a free 30-minute call. We'll talk through your situation, answer your questions,
            and tell you honestly whether we're the right fit.
          </p>

          <a
            href={businessConfig.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-lg rounded-lg transition-colors"
          >
            Book a Free Discovery Call →
          </a>
          <p className="text-gray-500 text-sm mt-6">
            Serving Laurel MD · Columbia MD · Baltimore · Washington DC · Northern Virginia · All 50 States Virtually
          </p>
        </div>
      </section>

      {/* SCHEMA FAQ for AEO */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": { "@type": "Answer", "text": faq.a }
        }))
      })}</script>
    </>
  );
}