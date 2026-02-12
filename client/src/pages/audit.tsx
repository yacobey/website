import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Shield, FileCheck, Search, Award, Users, Building } from "lucide-react";
import { CPAServiceStructuredData, WebPageStructuredData } from "@/components/structured-data";

const services = [
  {
    title: "GAAP-Based Financial Statement Audits",
    description: "Independent audits following Generally Accepted Auditing Standards for maximum credibility",
    icon: <Shield className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Single Audits (2 CFR Part 200 / Uniform Guidance)",
    description: "Federal grant compliance audits for organizations receiving federal funding",
    icon: <FileCheck className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Nonprofit & Government Audit Engagements",
    description: "Specialized audit services for nonprofits, municipalities, and government entities",
    icon: <Building className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Reviews & Compilations",
    description: "Limited assurance engagements for smaller organizations and specific requirements",
    icon: <Search className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Audit Readiness Assessment",
    description: "Internal controls review and general ledger assessment to prepare for audits",
    icon: <Award className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Employee Benefit Plan Audits",
    description: "401(k), 403(b), and other employee benefit plan audit services",
    icon: <Users className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Risk Assessment & Internal Audit Support",
    description: "Internal control evaluation and risk management advisory services",
    icon: <Shield className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Yellow Book & Program-Specific Performance Audits",
    description: "Government auditing standards compliance and program effectiveness audits",
    icon: <FileCheck className="w-6 h-6 text-blue-600" />,
  },
];

const auditTypes = [
  {
    type: "Financial Statement Audits",
    description: "Independent examination of financial statements",
    when: "Required by lenders, investors, or regulatory bodies",
  },
  {
    type: "Compliance Audits",
    description: "Verification of adherence to laws and regulations",
    when: "Federal grants, government contracts, or industry requirements",
  },
  {
    type: "Internal Control Audits",
    description: "Assessment of internal control effectiveness",
    when: "Risk management and operational improvement needs",
  },
];

export default function Audit() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Professional Audit Services - Financial Statement Audits | Selam CPA</title>
        <meta name="description" content="Independent audit and assurance services following GAAS standards. Financial statement audits, compliance audits, reviews, and compilations for businesses and nonprofits." />
        <meta name="keywords" content="audit services, financial statement audit, GAAS, compliance audit, review and compilation, nonprofit audit, government audit" />
        <link rel="canonical" href="https://selamcpa.com/audit" />
        <meta property="og:title" content="Professional Audit Services - Financial Statement Audits | Selam CPA" />
        <meta property="og:description" content="Independent audit and assurance services following GAAS standards. Providing stakeholders confidence in financial reporting." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://selamcpa.com/audit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Professional Audit Services | Selam CPA" />
        <meta name="twitter:description" content="Independent audit and assurance services following GAAS standards for businesses and nonprofits." />
      </Helmet>
      
      <CPAServiceStructuredData
        serviceName="Professional Audit & Assurance Services"
        description="Independent audit and assurance services following GAAS standards. Professional audit services that provide stakeholders with confidence in your financial reporting."
        url="https://selamcpa.com/audit"
        additionalData={{
          "serviceType": ["Financial Statement Audits", "Compliance Audits", "Nonprofit Audits", "Government Audits"],
          "audience": ["Nonprofits", "Government Entities", "Businesses", "Employee Benefit Plans"],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Audit Services",
            "itemListElement": services.map(service => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": service.title,
                "description": service.description
              }
            }))
          }
        }}
      />
      
      <WebPageStructuredData
        name="Professional Audit & Assurance Services | Selam CPA"
        description="Independent audit and assurance services following GAAS standards. Providing stakeholders confidence in financial reporting."
        url="https://selamcpa.com/audit"
        breadcrumbs={[
          { name: "Home", url: "https://selamcpa.com" },
          { name: "Audit Services", url: "https://selamcpa.com/audit" }
        ]}
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Independent Audit & Assurance Services Built on GAAS & Trust
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Professional audit services that provide stakeholders with confidence in your financial reporting. 
              Our experienced team follows the highest standards of independence and professional skepticism.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/yber2001/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Schedule Audit Consultation
              </a>
              <a
                href="#audit-readiness"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Audit Readiness Assessment
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Audit Types Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Types of Audit Engagements
              </h2>
              <p className="text-xl text-gray-600">
                Understanding which audit service you need and when
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {auditTypes.map((audit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{audit.type}</h3>
                  <p className="text-gray-600 mb-4">{audit.description}</p>
                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-blue-600">When you need it:</p>
                    <p className="text-sm text-gray-700">{audit.when}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Use Cases Section */}
      <section className="py-16 bg-gray-50" aria-labelledby="professional-use-cases">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="professional-use-cases" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              For Audit Professionals & Finance Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're a practicing auditor needing specialized expertise, a finance team preparing for audit, or seeking independent assurance opinions—our CPA-led audit practice provides the professional-grade support you need.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* For Auditors */}
            <div className="professional-card hover-expandable bg-white rounded-lg shadow-md p-6 border border-gray-200" data-testid="auditor-use-cases">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Auditor Collaboration</h3>
                <p className="text-gray-600 mt-2">Partner expertise for complex engagements</p>
              </div>
              
              <div className="hover-expandable-content mt-4 pt-4 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 mb-2">We Support Your Practice With:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Second opinions on complex accounting treatments</li>
                  <li>• Industry-specific expertise (nonprofit, government)</li>
                  <li>• Overflow capacity during busy seasons</li>
                  <li>• Documentation review and quality control</li>
                  <li>• Technical consultation on GAAS applications</li>
                </ul>
              </div>
            </div>

            {/* For CFOs */}
            <div className="professional-card hover-expandable bg-white rounded-lg shadow-md p-6 border border-gray-200" data-testid="cfo-use-cases">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Building className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">CFO & Finance Teams</h3>
                <p className="text-gray-600 mt-2">Audit readiness and compliance assurance</p>
              </div>
              
              <div className="hover-expandable-content mt-4 pt-4 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 mb-2">We Solve These Pain Points:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Audit readiness assessments and preparation</li>
                  <li>• Internal control design and testing</li>
                  <li>• SOX compliance for emerging growth companies</li>
                  <li>• Pre-audit financial statement reviews</li>
                  <li>• Management representation guidance</li>
                </ul>
              </div>
            </div>

            {/* For Controllers */}
            <div className="professional-card hover-expandable bg-white rounded-lg shadow-md p-6 border border-gray-200" data-testid="controller-use-cases">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FileCheck className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Controllers & Accounting</h3>
                <p className="text-gray-600 mt-2">Technical accounting and compliance expertise</p>
              </div>
              
              <div className="hover-expandable-content mt-4 pt-4 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 mb-2">Professional Capabilities:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Complex revenue recognition (ASC 606)</li>
                  <li>• Lease accounting (ASC 842) implementation</li>
                  <li>• Financial instruments and derivatives</li>
                  <li>• Business combinations and M&A accounting</li>
                  <li>• Technical accounting memorandums</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Comprehensive Audit & Assurance Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From financial statement audits to specialized compliance engagements, 
                we provide the assurance services your organization needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    {service.icon}
                    <h3 className="text-lg font-semibold text-gray-900 ml-3">{service.title}</h3>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Audit Process */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Audit Process
              </h2>
              <p className="text-xl text-gray-600">
                Systematic approach ensuring thorough examination and reliable results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Planning</h3>
                <p className="text-gray-600 text-sm">
                  Risk assessment and audit strategy development
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Controls Testing</h3>
                <p className="text-gray-600 text-sm">
                  Internal control evaluation and testing
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Substantive Testing</h3>
                <p className="text-gray-600 text-sm">
                  Detailed examination of transactions and balances
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Review</h3>
                <p className="text-gray-600 text-sm">
                  Quality review and evidence evaluation
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">5</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Reporting</h3>
                <p className="text-gray-600 text-sm">
                  Independent auditor's report and recommendations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Expertise */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Industry-Specific Audit Expertise
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Nonprofit Organizations</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Grant compliance audits</li>
                  <li>• Donor restriction testing</li>
                  <li>• Form 990 preparation</li>
                  <li>• Board governance review</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Employee Benefit Plans</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• ERISA compliance</li>
                  <li>• DOL filing requirements</li>
                  <li>• Investment testing</li>
                  <li>• Participant data verification</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Government Entities</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Yellow Book standards</li>
                  <li>• Federal program testing</li>
                  <li>• Compliance requirements</li>
                  <li>• Public accountability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audit Readiness Section */}
      <section id="audit-readiness" className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Audit Readiness Assessment
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Prepare your organization for a smooth audit process with our comprehensive readiness assessment. 
                We'll identify potential issues and help you implement solutions before the audit begins.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 mb-2">What we review:</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Internal control design</li>
                    <li>• Documentation completeness</li>
                    <li>• Account reconciliations</li>
                    <li>• Supporting documentation</li>
                  </ul>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 mb-2">What you get:</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Detailed assessment report</li>
                    <li>• Remediation recommendations</li>
                    <li>• Timeline for improvements</li>
                    <li>• Ongoing support options</li>
                  </ul>
                </div>
              </div>
              <a
                href="https://calendly.com/yber2001/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Schedule Readiness Assessment
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Need an Independent Audit?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Our experienced audit team provides the independent perspective and professional skepticism 
              your stakeholders expect. Contact us to discuss your audit requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/yber2001/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Schedule Audit Consultation
              </a>
              <a
                href="/payment"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Request Audit Proposal
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}