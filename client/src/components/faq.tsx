import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqs = [
    {
      question: "Which tools do you support?",
      answer: "QuickBooks, Xero, Gusto, Stripe, Shopify, Bill, and more. We work with over 50+ popular business software platforms to ensure seamless integration with your existing workflows."
    },
    {
      question: "Do you do clean‑ups?",
      answer: "Yes. We start with a cleanup to get you current and accurate. Our comprehensive cleanup process includes reconciling accounts, categorizing transactions, fixing errors, and ensuring your books are ready for strategic decision-making."
    },
    {
      question: "Can you work with nonprofits?",
      answer: "Absolutely—grant tracking, functional expenses, and board reporting. We specialize in nonprofit accounting requirements including Form 990 preparation, donor management, and compliance with charitable organization regulations."
    },
    {
      question: "How do we get started?",
      answer: "Book a call, we'll scope your needs, and start onboarding within a week. Our streamlined process includes a discovery call, custom proposal, signed agreement, and immediate setup of your accounting systems."
    },
    {
      question: "What's included in your monthly bookkeeping service?",
      answer: "Full-service bookkeeping includes transaction categorization, bank reconciliation, financial statement preparation, monthly reports, accounts payable/receivable management, and unlimited email support. Plus quarterly check-ins to review performance."
    },
    {
      question: "Do you handle payroll and taxes?",
      answer: "Yes, we provide complete payroll processing, tax withholding calculations, quarterly filing, year-end W-2 preparation, and both business and personal tax preparation. We're your one-stop solution for all financial needs."
    },
    {
      question: "How quickly can you catch up my books?",
      answer: "Most catch-up projects are completed within 2-4 weeks, depending on complexity and data availability. We'll provide a clear timeline during your consultation and keep you updated throughout the process."
    },
    {
      question: "What makes your AI consultancy different?",
      answer: "Our AI consultancy combines traditional accounting expertise with cutting-edge technology. We create custom financial calculators, automate reporting, and provide AI-powered insights that help you make smarter business decisions faster."
    },
    {
      question: "Do you work with businesses outside my state?",
      answer: "Yes, we serve clients nationwide. With secure cloud-based systems and virtual meeting capabilities, we provide the same high-quality service regardless of your location. We're licensed in multiple states."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with our work quality, we'll make it right or provide a full refund. Your success is our priority, and we stand behind our commitment to excellence."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      <div className="absolute top-10 right-20 w-72 h-72 bg-gradient-electric rounded-full opacity-10 blur-3xl animate-float"></div>
      <div className="absolute bottom-10 left-20 w-64 h-64 bg-gradient-vibrant rounded-full opacity-10 blur-3xl animate-bounce-gentle"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              Frequently Asked Questions 💭
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Get instant answers to common questions about our accounting services, AI consultancy, and how we can help your business thrive.
          </p>
        </div>

        <div className="space-y-4 animate-slide-up">
          {faqs.map((faq, index) => {
            const isOpen = openItems.has(index);
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card hover:shadow-colorful transition-all duration-500 overflow-hidden group hover-lift"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-2xl"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-neutral-900 group-hover:text-blue-600 transition-colors duration-300 pr-4">
                      {faq.question}
                    </h3>
                    <div className={`w-8 h-8 bg-gradient-electric rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-180' : ''} group-hover:scale-110`}>
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-white" />
                      ) : (
                        <Plus className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </button>
                
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="px-6 pb-6">
                    <p className="text-neutral-600 leading-relaxed border-t border-neutral-200 pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16 animate-scale-in">
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 rounded-3xl p-8 shadow-colorful">
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Still Have Questions? 🤔
              </span>
            </h3>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              Our team is here to help! Get personalized answers and discover how we can streamline your accounting and boost your business growth.
            </p>
            <a
              href="https://calendly.com/selamcpa25"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-electric hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 text-white px-10 py-4 text-lg font-bold rounded-2xl transition-all duration-500 shadow-electric hover:shadow-colorful transform hover:scale-105 animate-pulse-slow"
            >
              Book Your Free Consultation 📞
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}