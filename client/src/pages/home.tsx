import DynamicSEO from "@/components/dynamic-seo";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import IndustryExpertise from "@/components/industry-expertise";
import TrustIndicators from "@/components/trust-indicators";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";
import BlogPreview from "@/components/blog-preview";
import ContactForm from "@/components/contact-form";
import { BusinessLinks } from "@/components/business-links";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <DynamicSEO page="home" />
      <Header />
      <Hero />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Quick Access</h2>
          <BusinessLinks />
        </div>
      </section>
      <Services />
      <IndustryExpertise />
      <TrustIndicators />
      <Testimonials />
      <FAQ />
      <BlogPreview />
      <ContactForm />
      <Footer />
      <Chatbot />
    </div>
  );
}
