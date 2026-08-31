"use client";
import Link from "next/link";
import { services } from "@/data/siteData";
import {
  Smile,
  Shield,
  Star,
  Gem,
  Sparkles,
  Droplets,
  Zap,
  Activity,
  Sun,
  Wand2,
  PaintBucket,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const iconMap: Record<string, React.ReactNode> = {
  "tooth-implant": <Activity size={28} className="text-[#C9A96E]" />,
  "shield-check": <Shield size={28} className="text-[#C9A96E]" />,
  star: <Star size={28} className="text-[#C9A96E]" />,
  gem: <Gem size={28} className="text-[#C9A96E]" />,
  sparkles: <Sparkles size={28} className="text-[#C9A96E]" />,
  "paint-bucket": <PaintBucket size={28} className="text-[#C9A96E]" />,
  smile: <Smile size={28} className="text-[#C9A96E]" />,
  droplets: <Droplets size={28} className="text-[#C9A96E]" />,
  zap: <Zap size={28} className="text-[#C9A96E]" />,
  activity: <Activity size={28} className="text-[#C9A96E]" />,
  "wand-sparkles": <Wand2 size={28} className="text-[#C9A96E]" />,
  sun: <Sun size={28} className="text-[#C9A96E]" />,
};

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const displayServices = services.slice(0, 6);

  return (
    <section className="py-20 bg-[#F5F0E8]" id="services" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-white text-[#1B4332] px-4 py-1.5 rounded-full text-sm font-semibold font-cairo mb-4 shadow-sm">
            خدماتنا
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B4332] font-cairo mb-3">
            خدماتنا <span className="text-[#C9A96E]">المتكاملة</span>
          </h2>
          <div className="w-14 h-1 bg-[#C9A96E] rounded-full mx-auto mb-4" />
          <p className="text-gray-600 font-cairo max-w-xl mx-auto text-base">
            نقدم طيفاً واسعاً من خدمات طب الأسنان العلاجية والتجميلية
            باستخدام أحدث التقنيات العالمية
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group block bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(27,67,50,0.06)] hover:shadow-[0_12px_40px_rgba(27,67,50,0.14)] transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-[#C9A96E]/20 h-full"
              >
                <div className="w-14 h-14 bg-[#F5F0E8] group-hover:bg-[#1B4332]/5 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                  {iconMap[service.icon] || <Activity size={28} className="text-[#C9A96E]" />}
                </div>
                <h3 className="font-bold text-[#1B4332] font-cairo text-lg mb-2 group-hover:text-[#C9A96E] transition-colors duration-200">
                  {service.nameAr}
                </h3>
                <p className="text-gray-500 font-cairo text-sm leading-relaxed line-clamp-3">
                  {service.shortDesc}
                </p>
                <div className="mt-4 flex items-center gap-1 text-[#C9A96E] text-sm font-semibold font-cairo">
                  <span>اعرف أكثر</span>
                  <ArrowLeft size={14} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-[#1B4332] text-white px-8 py-3.5 rounded-xl font-bold font-cairo hover:bg-[#2D6A4F] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            عرض جميع خدماتنا
            <ArrowLeft size={17} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
