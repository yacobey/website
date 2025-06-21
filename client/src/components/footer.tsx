import { 
  IdCard, 
  Shield, 
  Award, 
  GraduationCap,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">ProBalance CPA & FCCA</h3>
            <p className="text-gray-300 mb-6">
              Professional CPA and FCCA qualified accounting services for businesses worldwide. International expertise for your financial success.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaFacebookF className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaLinkedinIn className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaTwitter className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#services" className="hover:text-white transition-colors">Tax Preparation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Bookkeeping</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Payroll Services</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Business Formation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Financial Planning</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/ai-tools" className="hover:text-white transition-colors">AI Calculator Builder</a></li>
              <li><a href="/ai-tools" className="hover:text-white transition-colors">Tax Calculators</a></li>
              <li><a href="/ai-tools" className="hover:text-white transition-colors">Financial Tools</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                (301) 640-8549
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                info@probalancecpa.com
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Virtual Office & Remote Services<br />
                Serving clients nationwide</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Certifications and Trust Elements */}
        <div className="border-t border-gray-600 pt-8 mb-8">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-2 text-gray-300">
              <IdCard className="text-success w-5 h-5" />
              <span>CPA Certified</span>
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              <Award className="text-success w-5 h-5" />
              <span>QuickBooks ProAdvisor</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <GraduationCap className="text-success w-5 h-5" />
              <span>AICPA Member</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Award className="text-success w-5 h-5" />
              <span>FCCA Qualified</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} ProBalance CPA. All rights reserved. | 
            <a href="#" className="hover:text-white transition-colors ml-1">Privacy Policy</a> | 
            <a href="#" className="hover:text-white transition-colors ml-1">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
