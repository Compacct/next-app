import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img src="/images/wbca-logo.png" alt="WBCA Logo" className="h-10 w-auto brightness-0 invert" />
              <h3 className="text-2xl font-bold text-white">WBCA</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering students with quality computer education since its inception. 
              West Bengal Computer Academy is dedicated to excellence in IT training.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="hover:text-blue-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-blue-500 transition-colors">Our Courses</Link>
              </li>
              <li>
                <Link href="/admission" className="hover:text-blue-500 transition-colors">Admission</Link>
              </li>
              <li>
                <Link href="/franchisee" className="hover:text-blue-500 transition-colors">Franchisee Opportunities</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                <span>West Bengal, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <span>info@wbca.in</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Stay Updated</h4>
            <p className="text-sm mb-4">Subscribe to our newsletter for latest updates.</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm">
            © {currentYear} West Bengal Computer Academy. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
