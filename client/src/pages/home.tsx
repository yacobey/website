import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import ServicesPayment from "@/components/services-payment";
import AIToolsSection from "@/components/ai-tools-section";
import Testimonials from "@/components/testimonials";
import BlogPreview from "@/components/blog-preview";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Lenox CPA - Expert Accounting, Tax & Business Advisory Services</title>
        <meta name="description" content="Professional CPA services including bookkeeping, tax preparation, audits, compilations, and business advisory. ACCA-qualified with comprehensive financial solutions for individuals and businesses." />
        <meta name="keywords" content="CPA, accounting, tax preparation, bookkeeping, audit, business advisory, ACCA, financial services" />
        <meta property="og:title" content="Lenox CPA - Expert Accounting & Tax Services" />
        <meta property="og:description" content="Professional CPA services with expert bookkeeping, tax preparation, audits, and business advisory for individuals and businesses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lenoxcpa.com" />
        <meta property="og:site_name" content="Lenox CPA" />
        <meta property="og:image" content="https://lenoxcpa.com/og-image.jpg" />
        <meta property="og:image:alt" content="Lenox CPA - Professional Accounting Services" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lenox CPA - Expert Accounting & Tax Services" />
        <meta name="twitter:description" content="Professional CPA services with expert bookkeeping, tax preparation, audits, and business advisory." />
        <meta name="twitter:image" content="https://lenoxcpa.com/og-image.jpg" />
        <link rel="canonical" href="https://lenoxcpa.com" />
      </Helmet>
      <Header />
      <Hero />
      <Services />
      <ServicesPayment />
      <AIToolsSection />
      <Testimonials />
      <BlogPreview />
      <ContactForm />
      <Footer />
      <Chatbot />
    </div>
  );
}
