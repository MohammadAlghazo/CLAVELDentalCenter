import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/siteData";
import {
  Activity, Shield, Star, Gem, Sparkles, Droplets,
  Smile, Zap, Sun, Wand2, PaintBucket, Phone, ArrowLeft,
} from "lucide-react";

export const metadata: Metadata = {
  title: "خدماتنا المتكاملة | مجمع كلافيل لطب الأسنان",
  description:
    "12 خدمة طب أسنان علاجية وتجميلية في المدينة المنورة: زراعة الأسنان الأمريكية والألمانية والإيطالية، الزيركون، الفينير، تبييض الأسنان، وأكثر.",
  alternates: { canonical: "https://clavel.dental/services" },
};

const iconMap: Record<string, React.ReactNode> = {
  "tooth-implant": <Activity size={32} className="text-[#C9A96E]" />,
  "shield-check": <Shield size={32} className="text-[#C9A96E]" />,
  star: <Star size={32} className="text-[#C9A96E]" />,
  gem: <Gem size={32} className="text-[#C9A96E]" />,
  sparkles: <Sparkles size={32} className="text-[#C9A96E]" />,
  "paint-bucket": <PaintBucket size={32} className="text-[#C9A96E]" />,
  smile: <Smile size={32} className="text-[#C9A96E]" />,
  droplets: <Droplets size={32} className="text-[#C9A96E]" />,
  zap: <Zap size={32} className="text-[#C9A96E]" />,
  activity: <Activity size={32} className="text-[#C9A96E]" />,
  "wand-sparkles": <Wand2 size={32} className="text-[#C9A96E]" />,
  sun: <Sun size={32} className="text-[#C9A96E]" />,
};

export default function ServicesPage() {
  return (
    <div className="font-cairo" dir="rtl">
      {/* Hero */}
      <section className="page-hero">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-cairo mb-4">
            خدماتنا <span className="text-[#C9A96E]">المتكاملة</span>
          </h1>
          <div className="w-14 h-1 bg-[#C9A96E] rounded-full mx-auto mb-4" />
          <p className="text-gray-200 font-cairo text-base sm:text-lg max-w-2xl mx-auto">
            12 خدمة طبية علاجية وتجميلية بأعلى معايير الجودة العالمية
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(27,67,50,0.06)] hover:shadow-[0_12px_40px_rgba(27,67,50,0.14)] transition-all duration-300 hover:-translate-y-2 flex flex-col"
              >
                <div className="p-7 flex-1">
                  {/* Number + Icon */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 bg-[#F5F0E8] group-hover:bg-[#1B4332]/5 rounded-xl flex items-center justify-center transition-colors duration-300">
                      {iconMap[service.icon] || <Activity size={32} className="text-[#C9A96E]" />}
                    </div>
                    <span className="text-4xl font-extrabold text-gray-100 font-cairo leading-none">
                      {String(service.id).padStart(2, "0")}
                    </span>
                  </div>

                  <h2 className="font-bold text-[#1B4332] font-cairo text-xl mb-3 group-hover:text-[#C9A96E] transition-colors duration-200">
                    {service.nameAr}
                  </h2>
                  <p className="text-gray-500 font-cairo text-sm leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  {/* When needed */}
                  <div className="bg-[#F5F0E8] rounded-lg p-3 mb-5">
                    <p className="text-xs font-semibold text-[#1B4332] font-cairo mb-1">
                      متى تحتاج هذا العلاج؟
                    </p>
                    <p className="text-xs text-gray-600 font-cairo leading-relaxed">
                      {service.whenNeeded}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-7 pb-7">
                  <Link
                    href={`/book?service=${encodeURIComponent(service.nameAr)}`}
                    className="flex items-center justify-center gap-2 bg-[#1B4332] text-white py-3 rounded-xl font-bold font-cairo text-sm hover:bg-[#2D6A4F] transition-all duration-300 w-full"
                  >
                    <Phone size={15} />
                    احجز استشارتك
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#1B4332]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white font-cairo mb-4">
            لا تتردد في{" "}
            <span className="text-[#C9A96E]">التواصل معنا</span>
          </h2>
          <p className="text-gray-300 font-cairo mb-8">
            فريقنا جاهز للإجابة على جميع استفساراتك واستقبال حجوزاتك
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[#C9A96E] text-white px-8 py-3.5 rounded-xl font-bold font-cairo hover:bg-[#b8935e] transition-all duration-300 hover:-translate-y-0.5"
            >
              <Phone size={17} />
              احجز موعدك
            </Link>
            <a
              href="https://api.whatsapp.com/send?phone=966510626630"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3.5 rounded-xl font-bold font-cairo hover:bg-[#1eb856] transition-all duration-300 hover:-translate-y-0.5"
            >
              تواصل عبر واتساب
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
