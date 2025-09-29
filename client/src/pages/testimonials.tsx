import DynamicSEO from "@/components/dynamic-seo";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      business: "Johnson Consulting LLC",
      industry: "Professional Services",
      rating: 5,
      text: "Selam CPA transformed our accounting processes. Their AI-powered insights helped us identify cost savings we never knew existed. The team is responsive, professional, and truly understands our business needs.",
      date: "2024"
    },
    {
      name: "Michael Chen",
      business: "TechStart Innovations",
      industry: "Technology Startup",
      rating: 5,
      text: "As a growing startup, we needed accounting partners who could scale with us. Selam CPA's remote service model and technology integration made the transition seamless. Highly recommend their tax planning services.",
      date: "2024"
    },
    {
      name: "Maria Rodriguez",
      business: "Rosa's Bakery & Cafe",
      industry: "Retail & Food Service",
      rating: 5,
      text: "Working with Selam CPA has been a game-changer for our family business. They helped us organize our books, reduce our tax liability, and understand our financials better. Truly professional service.",
      date: "2024"
    },
    {
      name: "David Thompson",
      business: "Thompson Construction",
      industry: "Construction",
      rating: 5,
      text: "The team at Selam CPA handles all our construction accounting needs expertly. Their understanding of industry-specific requirements and clean-up services saved us months of work. Excellent communication throughout.",
      date: "2024"
    },
    {
      name: "Jennifer Park",
      business: "Wellness Center MD",
      industry: "Healthcare",
      rating: 5,
      text: "Selam CPA's expertise in healthcare accounting is outstanding. They helped us navigate compliance requirements while optimizing our financial processes. Their Maryland-based team serves us excellently despite being located in different states.",
      date: "2024"
    },
    {
      name: "Robert Davis",
      business: "Metro Real Estate Group",
      industry: "Real Estate",
      rating: 5,
      text: "Working with Selam CPA for our real estate portfolio has been exceptional. Their AI tools and traditional expertise combination provides insights we never had before. Truly innovative approach to accounting.",
      date: "2024"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <>
      <DynamicSEO page="testimonials" />
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Client Testimonials
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-medium max-w-3xl mx-auto">
              Discover how Selam CPA has helped businesses across all 50 states achieve their financial goals with expert accounting services and innovative AI-powered solutions.
            </p>
          </div>

          {/* Statistics Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-600 dark:text-gray-300">Happy Clients</div>
            </div>
            <div className="text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">50</div>
              <div className="text-gray-600 dark:text-gray-300">States Served</div>
            </div>
            <div className="text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
              <div className="text-gray-600 dark:text-gray-300">Average Rating</div>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 hover:shadow-lg transition-shadow duration-300"
                data-testid={`testimonial-${index}`}
              >
                <div className="flex items-start mb-4">
                  <Quote className="w-8 h-8 text-blue-600 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      "{testimonial.text}"
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-blue-600 dark:text-blue-400 font-medium">
                    {testimonial.business}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.industry} • {testimonial.date}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Why Clients Choose Selam CPA
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Expert CPA Team
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Licensed professionals with 20+ years of experience across multiple states
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Quote className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  AI-Powered Solutions
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Innovative technology integration for better insights and efficiency
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Remote Excellence
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Maryland-based firm serving clients seamlessly across all 50 US states
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-semibold mb-4">
                Ready to Join Our Happy Clients?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Experience the same professional service and innovative solutions that our clients rave about. Get started with a free consultation today.
              </p>
              <a
                href="https://calendly.com/selamcpa25"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors"
                data-testid="testimonials-cta-btn"
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