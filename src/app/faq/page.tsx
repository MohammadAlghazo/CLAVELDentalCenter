import type { Metadata } from "next";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { faqData } from "@/data/siteData";
import Link from "next/link";
import { Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة | مجمع كلافيل لطب الأسنان",
  description:
    "إجابات على أشيع أسئلة مرضى مجمع كلافيل لطب الأسنان في المدينة المنورة حول زراعة الأسنان، الزيركون، الفينير، تبييض الأسنان، وأكثر.",
  alternates: { canonical: "https://clavel.dental/faq" },
};

export default function FaqPage() {
  return (
    <div className="font-cairo" dir="rtl">
      {/* Hero */}
      <section className="page-hero">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-cairo mb-4">
            الأسئلة <span className="text-[#C9A96E]">الشائعة</span>
          </h1>
          <div className="w-14 h-1 bg-[#C9A96E] rounded-full mx-auto mb-4" />
          <p className="text-gray-200 font-cairo text-base sm:text-lg max-w-xl mx-auto">
            إجابات صريحة وواضحة على أكثر الأسئلة التي يسألها مرضانا
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion items={faqData} />

          {/* CTA */}
          <div className="mt-14 bg-[#1B4332] rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold font-cairo mb-3">
              لم تجد إجابة سؤالك؟
            </h3>
            <p className="text-gray-300 font-cairo mb-6">
              تواصل معنا مباشرة وسيسعد فريقنا بالإجابة على جميع استفساراتك
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#C9A96E] text-white px-7 py-3 rounded-xl font-bold font-cairo text-sm hover:bg-[#b8935e] transition-all duration-300"
              >
                تواصل معنا
              </Link>
              <a
                href="https://api.whatsapp.com/send?phone=966510626630"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-3 rounded-xl font-bold font-cairo text-sm hover:bg-[#1eb856] transition-all duration-300"
              >
                واتساب
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
