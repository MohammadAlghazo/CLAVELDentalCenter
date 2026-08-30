"use client";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export default function FloatingButtons() {
  return (
    <>
      
      <a
        href="https://api.whatsapp.com/send?phone=966510626630"
        target="_blank"
        rel="noopener noreferrer"
        className="lg:hidden fixed bottom-6 right-4 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.5)] transition-all duration-300"
        aria-label="تواصل عبر واتساب"
      >
        <MessageCircle size={26} color="white" strokeWidth={2} />
      </a>

      <Link
        href="/contact"
        className="lg:hidden fixed bottom-6 left-4 z-50 w-14 h-14 bg-[#1B4332] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(27,67,50,0.4)] hover:scale-110 hover:bg-[#2D6A4F] transition-all duration-300"
        aria-label="تواصل معنا"
      >
        <Phone size={24} color="white" strokeWidth={2} />
      </Link>
    </>
  );
}
