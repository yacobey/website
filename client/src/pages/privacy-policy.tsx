import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Privacy Policy | Selam CPA</title>
        <meta name="description" content="Privacy policy for Selam CPA — how we collect, use, and protect your information." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://selamcpa.com/privacy-policy" />
      </Helmet>
      <Header />

      <main id="main-content" className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-12">Effective date: April 2026</p>

          <div className="space-y-10 text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
              <p>
                Selam Tax Inc., doing business as Selam CPA ("we", "our", "us") operates selamcpa.com.
                This Privacy Policy explains how we collect, use, and protect your information when you
                visit our website or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Contact information you provide — name, email address, and phone number</li>
                <li>Information submitted through our contact forms and tax calculators</li>
                <li>Usage data collected automatically through Google Analytics (pages visited, time on site, device type)</li>
                <li>Payment information processed through Stripe — we never store card numbers or full payment data on our servers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>To respond to your inquiries and provide requested services</li>
                <li>To send you information you have requested, such as consultation confirmations</li>
                <li>To improve our website and services based on how visitors use them</li>
                <li>To comply with legal and tax reporting obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Information Sharing</h2>
              <p className="mb-3">We do not sell your personal information. We share information only as follows:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>With service providers who help us operate — Google Analytics, Stripe (payments), and SendGrid (email) — only as necessary to deliver their services</li>
                <li>We may disclose information as required by law, legal process, or government request</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Cookies</h2>
              <p className="mb-3">
                We use Google Analytics cookies to understand how visitors use our website. These cookies
                collect anonymized data such as pages viewed and time spent on the site.
              </p>
              <p>
                You can opt out of Google Analytics tracking by installing the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 underline hover:text-emerald-700"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Security</h2>
              <p className="mb-3">
                We use industry-standard security measures to protect your information, including
                encrypted connections (HTTPS) on all pages of our website.
              </p>
              <p>
                Payment processing is handled entirely by Stripe, which is PCI DSS compliant. We do not
                handle or store your payment card data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Your Rights</h2>
              <p className="mb-3">
                You may request access to or deletion of any personal information we hold about you.
                To exercise your rights, contact us at{" "}
                <a href="mailto:info@selamcpa.com" className="text-emerald-600 underline hover:text-emerald-700">
                  info@selamcpa.com
                </a>.
              </p>
              <p>We will respond to all requests within 30 days.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Updates to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. When we do, we will revise the
                effective date at the top of this page. We encourage you to review this policy periodically.
              </p>
            </section>

            <section className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact Us</h2>
              <p className="mb-4">For questions about this privacy policy or to exercise your privacy rights:</p>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">Selam Tax Inc. DBA Selam CPA</p>
                <p>8593 Light Moon Way, Laurel, MD 20723</p>
                <p>
                  <a href="mailto:info@selamcpa.com" className="text-emerald-600 hover:text-emerald-700">
                    info@selamcpa.com
                  </a>
                </p>
                <p>
                  <a href="tel:+13016408549" className="text-emerald-600 hover:text-emerald-700">
                    (301) 640-8549
                  </a>
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
