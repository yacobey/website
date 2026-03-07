import { Link } from "wouter";
import { Phone, Mail, MapPin, Award, Lock, ShieldCheck } from "lucide-react";

const CALENDLY = "https://calendly.com/yber2001/30min";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="text-white font-bold text-xl tracking-tight mb-1">Selam CPA</div>
            <div className="text-slate-400 text-xs mb-4">Yacob Tewelde, CPA, FCCA</div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Fractional controller and financial advisory for healthcare practice owners in the DMV.
              Serving DC, Maryland, and Virginia.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Award className="w-4 h-4 text-emerald-500" />
                <span>CPA, FCCA</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Lock className="w-4 h-4 text-emerald-500" />
                <span>256-bit SSL</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>IRS e-File</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="/#services" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Fractional Controller Advisory
                </a>
              </li>
              <li>
                <a href="/#services" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Financial Diagnostic
                </a>
              </li>
              <li>
                <a href="/#services" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Tax Strategy Coordination
                </a>
              </li>
            </ul>

            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 mt-8">Specialties</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="/#industries" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Behavioral Health Clinics
                </a>
              </li>
              <li>
                <a href="/#industries" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Physical Therapy Practices
                </a>
              </li>
              <li>
                <a href="/#industries" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Dental Practices
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="/#about" className="text-sm text-slate-400 hover:text-white transition-colors">
                  About Yacob Tewelde
                </a>
              </li>
              <li>
                <a href="/#faq" className="text-sm text-slate-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3 mb-5">
              <li>
                <a
                  href="tel:+12404732623"
                  className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors"
                  data-testid="phone-link"
                >
                  <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  (240) 473-2623
                </a>
              </li>
              <li>
                <a
                  href="mailto:yber2001@gmail.com"
                  className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  yber2001@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-sm text-slate-400">
                  <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>
                    Serving healthcare practices across the DMV —<br />
                    Washington DC, Maryland, and Virginia
                  </span>
                </div>
              </li>
            </ul>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors"
              data-testid="consultation-link"
            >
              Book a Discovery Call
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Selam CPA. All rights reserved. Yacob Tewelde, CPA, FCCA.
          </p>
          <p className="text-xs text-slate-600 text-center sm:text-right max-w-md">
            This website is for informational purposes only and does not constitute accounting, legal,
            or tax advice specific to your situation.
          </p>
        </div>
      </div>
    </footer>
  );
}
