"use client";
import Link from "next/link";
import { Phone, UserRound, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import type { Doctor } from "@prisma/client";

export default function DoctorsSection({ doctors }: { doctors: Doctor[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-white" id="doctors" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-[#F5F0E8] text-[#1B4332] px-4 py-1.5 rounded-full text-sm font-semibold font-cairo mb-4">
            فريقنا الطبي
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B4332] font-cairo mb-3">
            كوادر كلافيل <span className="text-[#C9A96E]">الطبية</span>
          </h2>
          <div className="w-14 h-1 bg-[#C9A96E] rounded-full mx-auto mb-4" />
          <p className="text-gray-600 font-cairo max-w-xl mx-auto text-base">
            نخبة من الأطباء والاستشاريين المتخصصين ذوي الخبرات الطويلة
            والتدريب الدولي
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, i) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(27,67,50,0.07)] hover:shadow-[0_12px_40px_rgba(27,67,50,0.15)] transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              
              <div className="relative bg-[#F5F0E8] aspect-[4/5] flex items-center justify-center overflow-hidden">
                {doctor.image ? (
                  <img
                    src={doctor.image}
                    alt={doctor.nameAr}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-24 h-24 bg-[#1B4332]/10 rounded-full flex items-center justify-center">
                    <UserRound size={48} className="text-[#1B4332]/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-5">
                <h3 className="font-bold text-[#1B4332] font-cairo text-base leading-snug mb-1">
                  {doctor.nameAr}
                </h3>
                <p className="text-[#C9A96E] font-semibold font-cairo text-sm mb-2">
                  {doctor.titleAr}
                </p>
                <p className="text-gray-500 font-cairo text-xs leading-relaxed mb-4">
                  {doctor.shortBio}
                </p>

                <div className="flex flex-col gap-2">
                  <Link
                    href={`/doctors/${doctor.slug}`}
                    className="flex items-center justify-center gap-1.5 bg-[#F5F0E8] text-[#1B4332] py-2 rounded-lg font-semibold font-cairo text-sm hover:bg-[#1B4332] hover:text-white transition-all duration-300"
                  >
                    <UserRound size={14} />
                    عرض الملف الطبي
                  </Link>
                  <Link
                    href={`/book?doctor=${encodeURIComponent(doctor.nameAr)}`}
                    className="flex items-center justify-center gap-1.5 bg-[#1B4332] text-white py-2 rounded-lg font-semibold font-cairo text-sm hover:bg-[#2D6A4F] transition-all duration-300"
                  >
                    <Phone size={14} />
                    احجز موعداً
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-center mt-12"
        >
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 border-2 border-[#1B4332] text-[#1B4332] px-8 py-3.5 rounded-xl font-bold font-cairo hover:bg-[#1B4332] hover:text-white transition-all duration-300"
          >
            تعرف على فريقنا
            <ArrowLeft size={17} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
