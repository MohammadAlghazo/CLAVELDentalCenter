import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Phone, MessageCircle, Award, Stethoscope } from "lucide-react";

const prisma = new PrismaClient();

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const doctors = await prisma.doctor.findMany({ select: { slug: true } });
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<import("next").Metadata> {
  const { slug } = await params;
  const doctor = await prisma.doctor.findUnique({ where: { slug } });
  if (!doctor) return {};
  return {
    title: `${doctor.nameAr} | مجمع كلافيل لطب الأسنان`,
    description: `${doctor.nameAr} — ${doctor.titleAr} في مجمع كلافيل لطب الأسنان بالمدينة المنورة. ${doctor.shortBio}`,
    alternates: { canonical: `https://clavel.dental/doctors/${slug}` },
  };
}

export default async function DoctorPage({ params }: Props) {
  const { slug } = await params;
  const doctor = await prisma.doctor.findUnique({ where: { slug } });
  if (!doctor || !doctor.isActive) notFound();

  const qualifications = JSON.parse(doctor.qualifications) as string[];
  const specialties = JSON.parse(doctor.specialties) as string[];

  return (
    <div className="font-cairo" dir="rtl">
      
      <section className="page-hero">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-10">
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm font-cairo mb-4">
            <Link href="/" className="hover:text-[#C9A96E] transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link href="/doctors" className="hover:text-[#C9A96E] transition-colors">الأطباء</Link>
            <span>/</span>
            <span className="text-white">{doctor.nameAr}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-cairo mb-2">
            {doctor.nameAr}
          </h1>
          <p className="text-[#C9A96E] font-semibold font-cairo text-lg mb-1">
            {doctor.titleAr}
          </p>
          <p className="text-gray-300 font-cairo text-sm">{doctor.nameEn}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-gradient-to-br from-[#F5F0E8] to-[#e8e0d0] rounded-2xl overflow-hidden mb-5 aspect-square flex items-center justify-center shadow-[0_8px_30px_rgba(27,67,50,0.12)]">
                  <img
                    src={doctor.image || ""}
                    alt={doctor.nameAr}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="space-y-3">
                  <Link
                    href={`/book?doctor=${encodeURIComponent(doctor.nameAr)}`}
                    className="flex items-center justify-center gap-2 bg-[#1B4332] text-white py-3.5 rounded-xl font-bold font-cairo text-sm hover:bg-[#2D6A4F] transition-all duration-300 w-full"
                  >
                    <Phone size={16} />
                    احجز موعداً مع {doctor.nameAr.split(" ")[1]}
                  </Link>
                  <a
                    href="https://api.whatsapp.com/send?phone=966510626630"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-xl font-bold font-cairo text-sm hover:bg-[#1eb856] transition-all duration-300 w-full"
                  >
                    <MessageCircle size={16} />
                    تواصل عبر واتساب
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              
              <div>
                <h2 className="text-2xl font-bold text-[#1B4332] font-cairo mb-2">
                  نبذة مختصرة
                </h2>
                <div className="w-12 h-1 bg-[#C9A96E] rounded-full mb-5" />
                <p className="text-gray-600 leading-relaxed font-cairo">
                  {doctor.shortBio}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Award size={22} className="text-[#C9A96E]" />
                  <h3 className="text-xl font-bold text-[#1B4332] font-cairo">
                    المؤهلات والخبرات
                  </h3>
                </div>
                <ul className="space-y-3">
                  {qualifications.map((q, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-[#C9A96E] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-cairo text-sm leading-relaxed">
                        {q}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Stethoscope size={22} className="text-[#C9A96E]" />
                  <h3 className="text-xl font-bold text-[#1B4332] font-cairo">
                    مجالات التخصص
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="bg-[#F5F0E8] text-[#1B4332] px-4 py-2 rounded-full text-sm font-semibold font-cairo border border-[#C9A96E]/20"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#F5F0E8] rounded-2xl p-6">
                <h3 className="font-bold text-[#1B4332] font-cairo text-lg mb-2">
                  هل تريد الاستشارة مع {doctor.nameAr.split(" ")[1]}؟
                </h3>
                <p className="text-gray-600 font-cairo text-sm mb-4">
                  احجز موعدك الآن وسيتواصل معك فريقنا لتأكيد الحجز
                </p>
                <Link
                  href={`/book?doctor=${encodeURIComponent(doctor.nameAr)}`}
                  className="inline-flex items-center gap-2 bg-[#1B4332] text-white px-6 py-3 rounded-xl font-bold font-cairo text-sm hover:bg-[#2D6A4F] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Phone size={15} />
                  احجز موعداً الآن
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
