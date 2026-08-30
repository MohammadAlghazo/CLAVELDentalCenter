"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle } from "lucide-react";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/services", label: "خدماتنا" },
  { href: "/doctors", label: "أطباؤنا" },
  { href: "/faq", label: "الأسئلة الشائعة" },
  { href: "/blog", label: "المدونة" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll(); // Check initial position on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#1B4332] shadow-[0_4px_20px_rgba(27,67,50,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Logo - Right side (RTL) */}
            <Link href="/" className="flex items-center gap-3 sm:gap-4 flex-shrink-0 group">
              <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="/images/logo.png" 
                  alt="شعار مجمع كلافيل لطب الأسنان" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span
                  className="font-extrabold text-xl sm:text-2xl leading-tight font-cairo transition-colors duration-300 text-white"
                >
                  كلافيل
                </span>
                <span
                  className={`text-xs sm:text-sm font-bold tracking-wide font-cairo transition-colors duration-300 ${
                    isScrolled ? "text-[#C9A96E]" : "text-[#C9A96E]"
                  }`}
                >
                  لطب الأسنان
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-md text-sm font-semibold font-cairo transition-colors duration-200 hover:text-[#C9A96E] text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                href="/book"
                className="bg-[#C9A96E] text-white px-5 py-2.5 rounded-lg font-semibold text-sm font-cairo hover:bg-[#b8935e] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                <Phone size={15} />
                احجز موعدك
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md transition-colors duration-200 text-white hover:text-[#C9A96E]"
              aria-label="القائمة"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden bg-white border-t border-gray-100 shadow-lg ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-[#4A4A4A] font-semibold text-base font-cairo hover:bg-[#F5F0E8] hover:text-[#1B4332] rounded-lg transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
              <Link
                href="/book"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#1B4332] text-white py-3 rounded-lg font-semibold font-cairo text-base hover:bg-[#2D6A4F] transition-colors"
              >
                <Phone size={17} />
                احجز موعدك
              </Link>
              <a
                href="https://api.whatsapp.com/send?phone=966510626630"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-lg font-semibold font-cairo text-base hover:bg-[#1eb856] transition-colors"
              >
                <MessageCircle size={17} />
                واتساب
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
