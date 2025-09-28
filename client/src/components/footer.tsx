import { useBusinessConfig } from "@/hooks/use-business-config";

export default function Footer() {
  const { data: businessConfig } = useBusinessConfig();
  return (
    <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-4 border-t border-gray-200">
      <div className="space-y-3 text-center text-gray-600">
        <p className="text-base">
          Selam CPA — Virtual firm based in Maryland. Licensed CPA. Secure payments. Documents handled securely.
        </p>
        <p className="text-base">
          📞 <a href={`tel:${businessConfig?.phone.e164}`} className="text-blue-600 hover:text-blue-800 transition-colors" data-testid="phone-link">
            {businessConfig?.phone.display}
          </a> — Virtual Receptionist (24/7) ·{" "}
          <a href={businessConfig?.links.calendly} target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800 transition-colors" data-testid="consultation-link">
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
