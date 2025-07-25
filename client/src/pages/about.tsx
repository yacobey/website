import DynamicSEO from "@/components/dynamic-seo";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";

export default function About() {
  return (
    <>
      <DynamicSEO page="about" />
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About Selam CPA
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
              Grow with clarity.
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 md:p-12">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                Whether you're managing day-to-day operations, expanding your team, or just trying to make sense of your numbers — we're here to help you stay organized, plan ahead, and move forward with report based decision making.
              </p>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Our Founder
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Founded by <strong>Yacob Tewelde</strong>, a licensed CPA (Maryland & California) and a fellow member of the Association of Chartered Certified Accountants (ACCA) with over 20 years of experience, Selam CPA brings together clarity, deep technical expertise and real-world insight into your day to day business journey.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Professional Credentials
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      Licensed CPA - Maryland
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      Licensed CPA - California
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      ACCA Fellow Member
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      20+ Years Experience
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Client Experience
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Startups & Private Firms
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Global Organizations
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Mission-Driven Initiatives
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Cross-Industry Expertise
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                Yacob has served clients across industries — from startups and private firms to global organizations and mission-driven initiatives — always with a focus on precision, practicality, and long-term value.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-3">
                  Our Mission
                </h3>
                <p className="text-blue-800 dark:text-blue-300 leading-relaxed">
                  At Selam CPA, we help our clients make smart decisions, move forward with clarity and confidence.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Ready to Grow with Clarity?
              </h3>
              <p className="text-gray-300 mb-6">
                Let's discuss how we can help your business make informed decisions and achieve sustainable growth.
              </p>
              <a
                href="https://calendly.com/selamcpa25"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Schedule Free Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Chatbot />
    </>
  );
}