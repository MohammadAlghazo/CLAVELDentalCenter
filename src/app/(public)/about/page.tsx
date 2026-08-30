import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Target, Eye, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "من نحن | مجمع كلافيل لطب الأسنان",
  description:
    "تعرّف على مجمع كلافيل لطب الأسنان في المدينة المنورة — قصتنا، رؤيتنا، رسالتنا، وقيمنا في تقديم أفضل رعاية طبية لأسنانك.",
  alternates: { canonical: "https://clavel.dental/about" },
};

const values = [
  {
    icon: <CheckCircle size={28} className="text-[#C9A96E]" />,
    title: "الجودة",
    desc: "نستخدم أفضل المواد والتقنيات الطبية العالمية لضمان أعلى مستوى من الرعاية",
  },
  {
    icon: <Target size={28} className="text-[#C9A96E]" />,
    title: "الأمانة",
    desc: "نقدم الرأي الطبي الصادق والشفاف دائماً، ونضع مصلحة المريض فوق كل اعتبار",
  },
  {
    icon: <Eye size={28} className="text-[#C9A96E]" />,
    title: "الراحة",
    desc: "نحرص على توفير تجربة مريحة وخالية من القلق لكل مريض في كل زيارة",
  },
  {
    icon: <Phone size={28} className="text-[#C9A96E]" />,
    title: "الاستمرارية",
    desc: "نتابع حالتك ما بعد العلاج ونبقى بجانبك في كل مرحلة من مراحل الشفاء",
  },
];

export default function AboutPage() {
  return (
    <div className="font-cairo" dir="rtl">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-cairo mb-4">
            من <span className="text-[#C9A96E]">نحن</span>
          </h1>
          <div className="w-14 h-1 bg-[#C9A96E] rounded-full mx-auto mb-4" />
          <p className="text-gray-200 font-cairo text-base sm:text-lg max-w-xl mx-auto">
            قصتنا، رؤيتنا، وقيمنا في خدمة ابتسامتك
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#F5F0E8] text-[#1B4332] px-4 py-1.5 rounded-full text-sm font-semibold font-cairo mb-4">
                قصتنا
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B4332] font-cairo mb-4">
                رحلة بدأت بشغف
                <br />
                <span className="text-[#C9A96E]">وتواصلت بثقة</span>
              </h2>
              <div className="w-14 h-1 bg-[#C9A96E] rounded-full mb-6" />
              <p className="text-gray-600 leading-relaxed font-cairo mb-5">
                أُسِّس مجمع كلافيل لطب الأسنان في المدينة المنورة بهدف تقديم
                رعاية طبية راقية للأسنان تجمع بين الخبرة الطبية العالية والتقنيات
                الحديثة والرعاية الإنسانية الحقيقية.
              </p>
              <p className="text-gray-600 leading-relaxed font-cairo mb-5">
                على مدار السنوات، حرصنا على بناء فريق طبي متخصص يضم نخبة من
                الأطباء والاستشاريين الذين يؤمنون بأن ابتسامة كل مريض قصة
                فريدة تستحق اهتماماً خاصاً.
              </p>
              <p className="text-gray-600 leading-relaxed font-cairo">
                اليوم، نفخر بثقة آلاف المرضى الذين اختاروا كلافيل وجهةً
                لصحة أسنانهم وجمال ابتسامتهم في المدينة المنورة والمناطق
                المجاورة.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(27,67,50,0.12)]">
              <img
                src="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&q=80"
                alt="مجمع كلافيل لطب الأسنان"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B4332] font-cairo mb-3">
              رؤيتنا <span className="text-[#C9A96E]">ورسالتنا</span>
            </h2>
            <div className="w-14 h-1 bg-[#C9A96E] rounded-full mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1B4332] rounded-2xl p-8 text-white">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                <Eye size={28} className="text-[#C9A96E]" />
              </div>
              <h3 className="text-2xl font-bold font-cairo mb-4">رؤيتنا</h3>
              <p className="text-gray-200 font-cairo leading-relaxed">
                أن نكون المرجع الأول والأموثق في طب الأسنان التجميلي والعلاجي
                في المدينة المنورة، من خلال تقديم خدمات طبية تُبهج المرضى
                وتفوق توقعاتهم.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(27,67,50,0.08)]">
              <div className="w-14 h-14 bg-[#F5F0E8] rounded-xl flex items-center justify-center mb-5">
                <Target size={28} className="text-[#C9A96E]" />
              </div>
              <h3 className="text-2xl font-bold font-cairo text-[#1B4332] mb-4">
                رسالتنا
              </h3>
              <p className="text-gray-600 font-cairo leading-relaxed">
                تقديم رعاية أسنان متكاملة وعالية الجودة في بيئة طبية آمنة
                ومريحة، تجمع بين أحدث التقنيات العالمية وأصدق الرعاية الإنسانية،
                لنمنح كل مريض ابتسامة تليق به.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B4332] font-cairo mb-3">
              قيمنا <span className="text-[#C9A96E]">الأساسية</span>
            </h2>
            <div className="w-14 h-1 bg-[#C9A96E] rounded-full mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                className="bg-[#F5F0E8] rounded-2xl p-7 text-center hover:shadow-[0_8px_30px_rgba(27,67,50,0.12)] transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  {value.icon}
                </div>
                <h3 className="font-bold text-[#1B4332] font-cairo text-lg mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-500 font-cairo text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1B4332]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white font-cairo mb-4">
            هل أنت مستعد لابتسامة
            <br />
            <span className="text-[#C9A96E]">تليق بك؟</span>
          </h2>
          <p className="text-gray-300 font-cairo mb-8">
            احجز استشارتك المجانية الآن وابدأ رحلتك نحو ابتسامة مثالية
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#C9A96E] text-white px-10 py-4 rounded-xl font-bold font-cairo text-lg hover:bg-[#b8935e] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <Phone size={20} />
            احجز استشارتك المجانية
          </Link>
        </div>
      </section>
    </div>
  );
}
