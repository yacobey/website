import { Link } from "wouter";
import { Phone, Mail, MapPin, Award, Lock, ShieldCheck } from "lucide-react";

const CALENDLY = "https://calendly.com/yber2001/30min";

export default function Footer() {
  return (
    <footer className="bg-[#060b14] text-slate-400" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-white font-bold text-xl tracking-tight mb-1">Selam CPA</div>
            <div className="text-slate-500 text-xs mb-5">Yacob Tewelde, CPA, FCCA</div>
            <p className="text-sm text-slate-500 leading-relaxed mb-7">
              Fractional controller and financial advisory for healthcare practice owners in the DMV — DC, Maryland, and Virginia.
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                { icon: <Award className="w-3.5 h-3.5 text-emerald-500" />, label: "CPA, FCCA Certified" },
                { icon: <Lock className="w-3.5 h-3.5 text-emerald-500" />, label: "256-bit SSL Encryption" },
                { icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />, label: "IRS Authorized e-File Provider" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-slate-500">
                  {icon}
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5">Services</h3>
            <ul className="space-y-3">
              {[
                "Fractional Controller Advisory",
                "Financial Diagnostic",
                "Tax Strategy Coordination",
              ].map((s) => (
                <li key={s}>
                  <a href="/#services" className="text-sm text-slate-500 hover:text-white transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5 mt-8">Specialties</h3>
            <ul className="space-y-3">
              {[
                "Behavioral Health Clinics",
                "Physical Therapy Practices",
                "Dental Practices",
              ].map((s) => (
                <li key={s}>
                  <a href="/#industries" className="text-sm text-slate-500 hover:text-white transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5">Company</h3>
            <ul className="space-y-3">
              {[
                { label: "About Yacob", href: "/#about" },
                { label: "FAQ", href: "/#faq" },
                { label: "Blog", href: "/blog" },
                { label: "Privacy Policy", href: "/privacy-policy" },
              ].map(({ label, href }) => (
                <li key={label}>
                  {href.startsWith("/") && !href.startsWith("/#") ? (
                    <Link href={href} className="text-sm text-slate-500 hover:text-white transition-colors">
                      {label}
                    </Link>
                  ) : (
                    <a href={href} className="text-sm text-slate-500 hover:text-white transition-colors">
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5">Contact</h3>
            <ul className="space-y-4 mb-7">
              <li>
                <a
                  href="tel:+12404732623"
                  className="flex items-center gap-3 text-sm text-slate-500 hover:text-white transition-colors"
                  data-testid="phone-link"
                >
                  <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  (240) 473-2623
                </a>
              </li>
              <li>
                <a
                  href="mailto:yber2001@gmail.com"
                  className="flex items-center gap-3 text-sm text-slate-500 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  yber2001@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-slate-500">
                  <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>DC, Maryland &amp; Virginia</span>
                </div>
              </li>
            </ul>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold px-4 py-3 rounded-lg transition-colors"
              data-testid="consultation-link"
            >
              Book a Discovery Call
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Selam CPA. All rights reserved. Yacob Tewelde, CPA, FCCA.
          </p>
          <p className="text-xs text-slate-700 text-center sm:text-right max-w-sm">
            For informational purposes only. Not accounting, legal, or tax advice specific to your situation.
          </p>
        </div>
      </div>
    </footer>
  );
}
