import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, doctors } from "@/data/siteData";
import { CheckCircle, Phone, MessageCircle, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.nameAr} | مجمع كلافيل لطب الأسنان`,
    description: service.shortDesc,
    alternates: { canonical: `https://clavel.dental/services/${slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <div className="font-cairo" dir="rtl">
      
      <section className="page-hero">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-10">
          
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm font-cairo mb-4">
            <Link href="/" className="hover:text-[#C9A96E] transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#C9A96E] transition-colors">الخدمات</Link>
            <span>/</span>
            <span className="text-white">{service.nameAr}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-cairo mb-4">
            {service.nameAr}
          </h1>
          <div className="w-14 h-1 bg-[#C9A96E] rounded-full mx-auto" />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#1B4332] font-cairo mb-4">
                عن هذه الخدمة
              </h2>
              <div className="w-12 h-1 bg-[#C9A96E] rounded-full mb-6" />
              <p className="text-gray-600 leading-relaxed font-cairo text-base mb-8">
                {service.description}
              </p>

              <div className="bg-[#F5F0E8] rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-[#1B4332] font-cairo text-lg mb-3">
                  متى تحتاج هذا العلاج؟
                </h3>
                <p className="text-gray-600 font-cairo text-sm leading-relaxed">
                  {service.whenNeeded}
                </p>
              </div>

              <h3 className="text-xl font-bold text-[#1B4332] font-cairo mb-4">
                مميزات الخدمة
              </h3>
              <ul className="space-y-3 mb-10">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-[#C9A96E] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-cairo text-sm leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-[#1B4332] font-cairo mb-5">
                أطباؤنا المتخصصون
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {doctors.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/doctors/${doc.slug}`}
                    className="flex items-center gap-4 bg-[#F5F0E8] rounded-xl p-4 hover:bg-[#1B4332]/5 transition-colors duration-200 group"
                  >
                    <div className="w-12 h-12 bg-[#1B4332]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#1B4332] font-bold font-cairo text-sm">
                        {doc.nameAr.charAt(3)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-[#1B4332] font-cairo text-sm group-hover:text-[#C9A96E] transition-colors">
                        {doc.nameAr}
                      </p>
                      <p className="text-gray-500 font-cairo text-xs">
                        {doc.titleAr}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-4">
                <div className="bg-[#1B4332] rounded-2xl p-6 text-white text-center">
                  <h3 className="text-xl font-bold font-cairo mb-2">
                    احجز استشارتك الآن
                  </h3>
                  <p className="text-gray-300 text-sm font-cairo mb-5 leading-relaxed">
                    تواصل معنا وسيستقبل فريقنا طلبك خلال 24 ساعة
                  </p>
                  <Link
                    href={`/book?service=${encodeURIComponent(service.nameAr)}`}
                    className="flex items-center justify-center gap-2 bg-[#C9A96E] text-white py-3 rounded-xl font-bold font-cairo text-sm hover:bg-[#b8935e] transition-all duration-300 w-full mb-3"
                  >
                    <Phone size={16} />
                    احجز موعد
                  </Link>
                  <a
                    href="https://api.whatsapp.com/send?phone=966510626630"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-bold font-cairo text-sm hover:bg-[#1eb856] transition-all duration-300 w-full"
                  >
                    <MessageCircle size={16} />
                    واتساب
                  </a>
                </div>

                <div className="bg-[#F5F0E8] rounded-2xl p-5">
                  <p className="font-bold text-[#1B4332] font-cairo text-sm mb-3">
                    خدمات أخرى
                  </p>
                  <div className="space-y-2">
                    {services
                      .filter((s) => s.slug !== service.slug)
                      .slice(0, 5)
                      .map((s) => (
                        <Link
                          key={s.id}
                          href={`/services/${s.slug}`}
                          className="flex items-center gap-2 text-gray-600 hover:text-[#C9A96E] font-cairo text-xs transition-colors"
                        >
                          <ArrowRight size={12} className="text-[#C9A96E]" />
                          {s.nameAr}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
