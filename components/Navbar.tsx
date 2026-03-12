"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About WBCA", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Admission", href: "/admission" },
  { name: "Download", href: "/download" },
  { name: "Franchisee", href: "/franchisee" },
  { name: "Check Result", href: "/result" },
  { name: "Contact Info", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === "/";
  // Always show glassy navbar on other pages, or when scrolled on home page
  const showGlassy = scrolled || !isHomePage;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        showGlassy
          ? "bg-white/80 backdrop-blur-xl shadow-lg py-2"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className={`relative transition-all duration-500 ${!showGlassy ? "brightness-0 invert" : ""}`}>
              <img src="/images/wbca-logo.png" alt="WBCA Logo" className="h-10 w-auto transform group-hover:scale-110 transition-transform" />
            </div>
            <span className={`text-2xl font-black transition-colors duration-500 ${
              showGlassy 
                ? "bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent" 
                : "text-white"
            }`}>
              WBCA
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-bold transition-all duration-300 hover:scale-105 ${
                  showGlassy ? "text-slate-700 hover:text-blue-600" : "text-white/90 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/login"
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 ${
                showGlassy 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-white text-blue-600 hover:bg-blue-50"
              }`}
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              showGlassy ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xl font-bold text-blue-600">WBCA</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all group"
                    >
                      <span className="font-medium text-lg">{item.name}</span>
                      <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                  <div className="pt-6">
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full bg-blue-600 text-white text-center py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
