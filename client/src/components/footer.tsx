import { Link } from "wouter";
import { useBusinessConfig } from "@/hooks/use-business-config";
import { Phone, Mail, MapPin, ShieldCheck, Lock, Award } from "lucide-react";

export default function Footer() {
  const { data: businessConfig } = useBusinessConfig();
  const calendlyUrl = businessConfig?.links.calendly || 'https://calendly.com/yber2001/30min';

  return (
    <footer className="bg-slate-900 text-slate-300" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="text-white font-bold text-xl tracking-tight mb-4">Selam CPA</div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Maryland-licensed CPA firm providing tax, bookkeeping, audit, and advisory services to businesses and nonprofits in all 50 states.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>IRS e-File</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Lock className="w-4 h-4 text-emerald-500" />
                <span>256-bit SSL</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Award className="w-4 h-4 text-emerald-500" />
                <span>Licensed CPA</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2.5">
              <li><Link href="/tax" className="text-sm text-slate-400 hover:text-white transition-colors">Tax Preparation & Planning</Link></li>
              <li><Link href="/bookkeeping" className="text-sm text-slate-400 hover:text-white transition-colors">Bookkeeping & Accounting</Link></li>
              <li><Link href="/audit" className="text-sm text-slate-400 hover:text-white transition-colors">Audit & Assurance</Link></li>
              <li><Link href="/advisory" className="text-sm text-slate-400 hover:text-white transition-colors">Advisory & Fractional CFO</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5">
              <li><Link href="/blog" className="text-sm text-slate-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/testimonials" className="text-sm text-slate-400 hover:text-white transition-colors">Client Testimonials</Link></li>
              <li><Link href="/agent" className="text-sm text-slate-400 hover:text-white transition-colors">Financial Agent</Link></li>
              <li><Link href="/ai-resources" className="text-sm text-slate-400 hover:text-white transition-colors">Tools & Resources</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${businessConfig?.phone.e164 || '+12404732623'}`} className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors" data-testid="phone-link">
                  <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  {businessConfig?.phone.display || '(240) 473-2623'}
                </a>
              </li>
              <li>
                <a href="mailto:info@selamcpa.com" className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  info@selamcpa.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-sm text-slate-400">
                  <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Maryland, USA<br />Serving all 50 states</span>
                </div>
              </li>
            </ul>
            <a 
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center w-full bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors"
              data-testid="consultation-link"
            >
              Book Free Consultation
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Selam CPA PLLC. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Maryland-Licensed CPA &middot; Virtual Firm &middot; Encrypted Client Portal
          </p>
        </div>
      </div>
    </footer>
  );
}
