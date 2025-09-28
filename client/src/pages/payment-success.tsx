import { useBusinessConfig } from "@/hooks/use-business-config";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CheckCircle, FileText, Upload, Calendar } from "lucide-react";

export default function PaymentSuccess() {
  const { data: businessConfig } = useBusinessConfig();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ✅ Payment received — let's get started
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Please complete the three quick steps below. This helps us begin immediately.
            </p>
          </header>

          <section className="grid md:grid-cols-3 gap-8" aria-label="Next steps">
            <article className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">1) Complete Intake Form</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Tell us about your situation so we can tailor your workplan and confirm required documents.
              </p>
              <a 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-block w-full text-center" 
                href={businessConfig?.links.intakeForm} 
                target="_blank" 
                rel="noopener"
                data-testid="intake-form-btn"
              >
                Open Intake Form
              </a>
            </article>

            <article className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Upload className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">2) Upload Documents Securely</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Use our secure file-request link to send prior returns, W-2/1099s, statements, and bookkeeping exports.
              </p>
              <a 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-block w-full text-center" 
                href={businessConfig?.links.secureUpload} 
                target="_blank" 
                rel="noopener"
                data-testid="upload-docs-btn"
              >
                Upload Documents
              </a>
            </article>

            <article className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">3) Book a Free Consultation</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Meet briefly to confirm scope, timelines, and any open questions. (Virtual meeting.)
              </p>
              <a 
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-block w-full text-center" 
                href={businessConfig?.links.calendly} 
                target="_blank" 
                rel="noopener"
                data-testid="consultation-btn"
              >
                Book Free Consultation
              </a>
            </article>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}