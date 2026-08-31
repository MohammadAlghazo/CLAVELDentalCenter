"use client";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const highlights = [
  "تقنيات حديثة ومعتمدة عالمياً",
  "فريق طبي متخصص وذو خبرة",
  "رعاية متكاملة من التشخيص حتى المتابعة",
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-white" id="about" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative order-1 lg:order-1"
          >
            <div className="relative h-[400px] sm:h-[450px] lg:h-[550px] w-full rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(27,67,50,0.15)]">
              <Image
                src="/images/about-clinic.jpg"
                alt="الدكتور في مجمع كلافيل يعالج مريضاً"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/30 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="order-2 lg:order-2"
          >
            
            <div className="inline-flex items-center gap-2 bg-[#F5F0E8] text-[#1B4332] px-4 py-1.5 rounded-full text-sm font-semibold font-cairo mb-4">
              من نحن
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B4332] font-cairo leading-tight mb-4">
              مجمع كلافيل
              <br />
              <span className="text-[#C9A96E]">لطب الأسنان</span>
            </h2>

            <div className="w-16 h-1 bg-gradient-to-l from-transparent via-[#C9A96E] to-[#C9A96E] rounded-full mb-6" />

            <p className="text-gray-600 leading-relaxed font-cairo text-base mb-6">
              في مجمع كلافيل لطب الأسنان بالمدينة المنورة، نقدم رعاية
              متكاملة لصحة وجمال ابتسامتك، من خلال نخبة من الأطباء
              والاستشاريين، وخدمات علاجية وتجميلية باستخدام تقنيات ومواد
              عالية الجودة.
            </p>

            <p className="text-gray-600 leading-relaxed font-cairo text-base mb-8">
              نؤمن بأن الابتسامة الجميلة والصحية تبدأ بثقة مريحة بين
              المريض والطبيب، لذلك نحرص على توفير بيئة علاجية دافئة
              واحترافية في آنٍ واحد.
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle
                    size={20}
                    className="text-[#1B4332] flex-shrink-0"
                  />
                  <span className="text-gray-700 font-cairo font-medium text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-[#1B4332] text-white px-7 py-3.5 rounded-xl font-bold font-cairo hover:bg-[#2D6A4F] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              تعرف علينا أكثر
              <ArrowLeft size={17} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
