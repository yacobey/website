import DynamicSEO from "@/components/dynamic-seo";
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
      <DynamicSEO page="home" />
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
