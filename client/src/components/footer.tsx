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
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Selam CPA</h3>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Professional accounting and tax services for individuals and businesses nationwide.
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
            <h4 className="text-lg font-medium mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/tax" className="hover:text-white transition-colors">Tax Services</a></li>
              <li><a href="/bookkeeping" className="hover:text-white transition-colors">Bookkeeping</a></li>
              <li><a href="/audit" className="hover:text-white transition-colors">Audit Services</a></li>
              <li><a href="/advisory" className="hover:text-white transition-colors">Advisory</a></li>
              <li><a href="/ai-tools" className="hover:text-white transition-colors">AI Tools</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
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
                info@selamcpa.com
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
              <span>Fellow member of the <a href="https://www.accaglobal.com" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">Association of Chartered Certified Accountants</a></span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Selam CPA. All rights reserved. | 
            <a href="#" className="hover:text-white transition-colors ml-1">Privacy Policy</a> | 
            <a href="#" className="hover:text-white transition-colors ml-1">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
