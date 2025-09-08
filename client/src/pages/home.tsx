import DynamicSEO from "@/components/dynamic-seo";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import IndustryExpertise from "@/components/industry-expertise";
import TrustIndicators from "@/components/trust-indicators";
import Testimonials from "@/components/testimonials";
import BlogPreview from "@/components/blog-preview";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <DynamicSEO page="home" />
      <Header />
      <Hero />
      <Services />
      <IndustryExpertise />
      <TrustIndicators />
      <Testimonials />
      <BlogPreview />
      <ContactForm />
      <Footer />
      <Chatbot />
    </div>
  );
}
