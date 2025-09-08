export default function Testimonials() {
  const testimonials = [
    {
      quote: "Selam CPA transformed our financial management completely. Their AI-powered insights and strategic tax planning helped us save over $25,000 last year while improving our cash flow management.",
      name: "Sarah Chen",
      title: "CEO",
      company: "TechStart Solutions"
    },
    {
      quote: "The expertise and personal attention we receive is outstanding. They handle all our bookkeeping and compliance needs, allowing us to focus entirely on growing our practice.",
      name: "Dr. Michael Rodriguez", 
      title: "Practice Owner",
      company: "Rodriguez Family Medicine"
    },
    {
      quote: "Working with Selam CPA has been game-changing for our construction business. Their industry expertise and proactive approach to tax planning gives us confidence in every financial decision.",
      name: "David Thompson",
      title: "Owner", 
      company: "Thompson Construction"
    },
    {
      quote: "The AI calculator tools and financial automation they implemented revolutionized how we track profitability. We now have real-time insights that drive better business decisions daily.",
      name: "Jennifer Walsh",
      title: "Founder",
      company: "Walsh Consulting Group"
    }
  ];

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Success Stories
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg border border-neutral-200">
              <div className="mb-6">
                <div className="w-16 h-16 bg-neutral-200 rounded-full mb-4"></div>
              </div>
              
              <blockquote className="text-lg text-neutral-700 leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>
              
              <div>
                <div className="font-bold text-neutral-900">
                  {testimonial.name}
                </div>
                <div className="text-neutral-600">
                  {testimonial.title} at <strong>{testimonial.company}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-neutral-700 mb-8">
              Interested in discovering how professional accounting and AI can drive growth in your business?
            </p>
            <p className="text-2xl font-semibold text-neutral-900 mb-8">
              Let's talk.
            </p>
            <a 
              href="#contact"
              className="inline-flex items-center bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-4 text-lg font-medium rounded-lg transition-colors group"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Book Your Free Consultation Today
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}