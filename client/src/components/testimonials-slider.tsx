import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "CEO",
    company: "TechStart Solutions",
    content: "ProBalance CPA transformed our financial management. Their AI-powered tools and strategic advisory helped us secure $2M in funding. The team's expertise in tech startups is unmatched.",
    rating: 5,
  },
  {
    id: 2,
    name: "Dr. Michael Rodriguez",
    title: "Practice Owner",
    company: "Rodriguez Family Medicine",
    content: "As a healthcare practice, we needed specialized accounting expertise. ProBalance CPA's industry knowledge and proactive tax planning saved us over $50K last year.",
    rating: 5,
  },
  {
    id: 3,
    name: "Jennifer Walsh",
    title: "Founder",
    company: "Walsh Consulting Group",
    content: "The audit-ready financial statements and CFO-level insights from ProBalance CPA gave us the confidence to expand into three new markets. Their advisory services are exceptional.",
    rating: 5,
  },
  {
    id: 4,
    name: "Robert Kim",
    title: "Director",
    company: "Kim & Associates",
    content: "ProBalance CPA's loan assistance program was instrumental in securing our SBA loan. They handled all documentation and projections professionally, making the process seamless.",
    rating: 5,
  },
];

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Hear from Clients Who Trust ProBalance CPA
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how we've helped businesses achieve financial clarity and growth
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg">
            <div className="text-center">
              <div className="mb-4">
                {renderStars(testimonials[currentIndex].rating)}
              </div>
              
              <blockquote className="text-xl text-gray-700 mb-6 italic leading-relaxed">
                "{testimonials[currentIndex].content}"
              </blockquote>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">
                    {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 text-lg">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-600">
                  {testimonials[currentIndex].title}, {testimonials[currentIndex].company}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-blue-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}