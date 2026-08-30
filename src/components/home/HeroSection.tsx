"use client";
import Link from "next/link";
import { Phone, MessageCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Background gradient overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(27,67,50,0.92) 0%, rgba(27,67,50,0.75) 50%, rgba(45,106,79,0.85) 100%)",
        }}
      />

      {/* Background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A96E' fill-opacity='0.15'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Background image */}
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        {/* Elegant Location Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#C9A96E] font-bold text-lg md:text-xl tracking-wide font-cairo mb-4 flex items-center justify-center gap-2"
        >
          <span className="w-8 h-[1px] bg-[#C9A96E]"></span>
          المدينة المنورة، المملكة العربية السعودية
          <span className="w-8 h-[1px] bg-[#C9A96E]"></span>
        </motion.h2>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight font-cairo mb-6"
        >
          ابتسامتك تستحق
          <br />
          <span className="text-[#C9A96E]">عناية تليق بها</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed font-cairo max-w-3xl mx-auto mb-10"
        >
          في مجمع كلافيل لطب الأسنان بالمدينة المنورة، نقدم رعاية متكاملة
          لصحة وجمال ابتسامتك، من خلال نخبة من الأطباء والاستشاريين،
          وخدمات علاجية وتجميلية باستخدام تقنيات ومواد عالية الجودة.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mt-8"
        >
          <Link
            href="/book"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1B4332] text-white px-8 py-4 rounded-xl font-bold text-base font-cairo hover:bg-[#2D6A4F] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(27,67,50,0.4)] hover:-translate-y-1"
          >
            <Phone size={18} />
            احجز موعدك
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-base font-cairo hover:bg-[#1eb856] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(37,211,102,0.35)] hover:-translate-y-1"
          >
            <MessageCircle size={18} />
            تواصل معنا
          </Link>

          <a
            href="tel:0148610552"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl font-bold text-base font-cairo hover:bg-white hover:text-[#1B4332] transition-all duration-300 hover:-translate-y-1"
          >
            <Phone size={18} />
            اتصل الآن
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        >
          <span className="text-white/50 text-xs font-cairo">تمرير للأسفل</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
