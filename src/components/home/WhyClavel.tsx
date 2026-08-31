"use client";
import { features } from "@/data/siteData";
import { Globe, Users, Shield, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const iconMap: Record<string, React.ReactNode> = {
  globe: <Globe size={32} className="text-[#C9A96E]" />,
  users: <Users size={32} className="text-[#C9A96E]" />,
  shield: <Shield size={32} className="text-[#C9A96E]" />,
  heart: <Heart size={32} className="text-[#C9A96E]" />,
};

export default function WhyClavel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-[#F5F0E8]" id="why-us" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-white text-[#1B4332] px-4 py-1.5 rounded-full text-sm font-semibold font-cairo mb-4 shadow-sm">
            مميزاتنا
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B4332] font-cairo mb-3">
            لماذا <span className="text-[#C9A96E]">كلافيل؟</span>
          </h2>
          <div className="w-14 h-1 bg-[#C9A96E] rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white rounded-2xl p-4 sm:p-7 text-center shadow-[0_4px_20px_rgba(27,67,50,0.06)] hover:shadow-[0_12px_40px_rgba(27,67,50,0.14)] transition-all duration-300 hover:-translate-y-2 flex flex-col"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#F5F0E8] group-hover:bg-[#1B4332] rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-5 transition-colors duration-300">
                <span className="group-hover:[&>svg]:text-[#C9A96E] transition-colors scale-75 sm:scale-100">
                  {iconMap[feature.icon]}
                </span>
              </div>
              <h3 className="font-bold text-[#1B4332] font-cairo text-sm sm:text-lg mb-2 sm:mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 font-cairo text-[10px] sm:text-sm leading-relaxed flex-1">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
