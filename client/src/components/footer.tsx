const phone = import.meta.env.VITE_PUBLIC_PHONE_DISPLAY as string;
const calendly = import.meta.env.VITE_CALENDLY_URL as string;

export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-4 border-t border-gray-200">
      <div className="space-y-3 text-center text-gray-600">
        <p className="text-base">
          Selam CPA — Virtual firm based in Maryland. Licensed CPA. Secure payments. Documents handled securely.
        </p>
        <p className="text-base">
          📞 <a href={`tel:${phone?.replace(/[^\d+]/g, "")}`} className="text-blue-600 hover:text-blue-800 transition-colors" data-testid="phone-link">
            {phone}
          </a> — Virtual Receptionist (24/7) ·{" "}
          <a href={calendly} target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800 transition-colors" data-testid="consultation-link">
            Book Free Consultation
          </a>
        </p>
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Selam CPA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
