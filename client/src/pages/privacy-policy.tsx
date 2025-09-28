import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Shield, Lock, Eye, Users, Mail, Phone } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Privacy Policy - Data Protection & GDPR Compliance | Selam CPA</title>
        <meta name="description" content="Learn how Selam CPA collects, uses, and protects your personal information. Our comprehensive privacy policy ensures GDPR compliance and transparency." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://selamcpa.com/privacy-policy" />
        <meta property="og:title" content="Privacy Policy - Data Protection & GDPR Compliance | Selam CPA" />
        <meta property="og:description" content="Transparent privacy practices and data protection policies for Selam CPA clients and website visitors." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://selamcpa.com/privacy-policy" />
      </Helmet>
      <Header />
      
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
              <p className="text-xl text-gray-600">
                Your privacy is our priority. Learn how we protect and handle your personal information.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Quick Overview */}
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start">
                  <Lock className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Data Security</h3>
                    <p className="text-sm text-gray-600">Enterprise-grade encryption and security measures</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Eye className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Transparency</h3>
                    <p className="text-sm text-gray-600">Clear information about data collection and use</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Your Rights</h3>
                    <p className="text-sm text-gray-600">Full control over your personal information</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
              
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information You Provide</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address</li>
                  <li><strong>Business Information:</strong> Company name, tax ID, business structure, industry</li>
                  <li><strong>Financial Information:</strong> Financial statements, tax documents, banking information</li>
                  <li><strong>Communication Records:</strong> Chat messages, consultation notes, correspondence</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Information Automatically Collected</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li><strong>Usage Data:</strong> Pages visited, time spent, click patterns</li>
                  <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                  <li><strong>Cookies:</strong> Session cookies, preference cookies, analytics cookies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>Service Delivery:</strong> Providing accounting, tax, and advisory services</li>
                  <li><strong>Communication:</strong> Responding to inquiries and providing updates</li>
                  <li><strong>Legal Compliance:</strong> Meeting regulatory and tax reporting requirements</li>
                  <li><strong>Website Improvement:</strong> Analytics to enhance user experience</li>
                  <li><strong>Security:</strong> Protecting against fraud and unauthorized access</li>
                  <li><strong>Marketing:</strong> Sending relevant service updates (with consent)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Legal Basis for Processing (GDPR)</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li><strong>Contract Performance:</strong> Providing requested accounting services</li>
                    <li><strong>Legitimate Interest:</strong> Website analytics and security measures</li>
                    <li><strong>Legal Obligation:</strong> Tax reporting and regulatory compliance</li>
                    <li><strong>Consent:</strong> Marketing communications and non-essential cookies</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
                <p className="text-gray-600 mb-4">We do not sell your personal information. We may share information with:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>Service Providers:</strong> Secure cloud storage, payment processors, email services</li>
                  <li><strong>Professional Partners:</strong> Attorneys, other CPAs, business advisors (with permission)</li>
                  <li><strong>Regulatory Authorities:</strong> Tax agencies, licensing boards (when required by law)</li>
                  <li><strong>Business Transfers:</strong> In case of merger or acquisition (with notice)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                <div className="bg-green-50 p-4 rounded-lg">
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li><strong>Encryption:</strong> AES-256 encryption for data at rest and in transit</li>
                    <li><strong>Access Controls:</strong> Multi-factor authentication and role-based access</li>
                    <li><strong>Regular Audits:</strong> Security assessments and vulnerability testing</li>
                    <li><strong>Staff Training:</strong> Ongoing cybersecurity and privacy training</li>
                    <li><strong>Incident Response:</strong> Rapid response plan for security incidents</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Privacy Rights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Under GDPR (EU residents):</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Right to access your data</li>
                      <li>Right to rectification</li>
                      <li>Right to erasure (right to be forgotten)</li>
                      <li>Right to restrict processing</li>
                      <li>Right to data portability</li>
                      <li>Right to object to processing</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Under CCPA (California residents):</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Right to know what information is collected</li>
                      <li>Right to delete personal information</li>
                      <li>Right to opt-out of sale (we don't sell data)</li>
                      <li>Right to non-discrimination</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Essential Cookies (Always Active)</h3>
                    <p className="text-gray-600">Required for website functionality and security</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Analytics Cookies (Optional)</h3>
                    <p className="text-gray-600">Google Analytics to understand website usage and improve experience</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Marketing Cookies (Optional)</h3>
                    <p className="text-gray-600">Personalized content and relevant service recommendations</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>Client Records:</strong> 7 years after service completion (IRS requirement)</li>
                  <li><strong>Marketing Data:</strong> Until consent is withdrawn</li>
                  <li><strong>Website Analytics:</strong> 26 months (Google Analytics default)</li>
                  <li><strong>Chat Logs:</strong> 3 years for quality and training purposes</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
                <p className="text-gray-600">
                  Our services are not directed to children under 13. We do not knowingly collect personal information 
                  from children under 13. If we learn we have collected such information, we will delete it immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Transfers</h2>
                <p className="text-gray-600">
                  Your data may be processed in the United States. We ensure adequate protection through:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
                  <li>Standard Contractual Clauses approved by the European Commission</li>
                  <li>Data Processing Agreements with all service providers</li>
                  <li>Regular privacy impact assessments</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Updates to This Policy</h2>
                <p className="text-gray-600">
                  We may update this privacy policy to reflect changes in our practices or legal requirements. 
                  We will notify you of material changes via email or website notice at least 30 days in advance.
                </p>
              </section>

              <section className="mb-8 bg-blue-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  For questions about this privacy policy or to exercise your privacy rights, contact us:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-900">Email: privacy@selamcpa.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-900">Phone: (301) 640-8549</span>
                  </div>
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <p className="text-gray-900 font-semibold">Data Protection Officer</p>
                      <p className="text-gray-600">Selam CPA PLLC<br />Privacy Department<br />MD, VA, DC Metro Area</p>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}