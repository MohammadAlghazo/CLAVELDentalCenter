import type { Metadata } from "next";
import DoctorsGrid from "./DoctorsGrid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const revalidate = 3600; // Cache for 1 hour

export const metadata: Metadata = {
  title: "كوادرنا الطبية | مجمع كلافيل لطب الأسنان",
  description:
    "نخبة من أطباء الأسنان والاستشاريين في مجمع كلافيل بالمدينة المنورة — خبرات متميزة وتدريب دولي لخدمة ابتسامتك.",
  alternates: { canonical: "https://clavel.dental/doctors" },
};

export default async function DoctorsPage() {
  const doctors = await prisma.doctor.findMany({
    where: { isActive: true },
  });

  return (
    <div className="font-cairo" dir="rtl">
      
      <section className="page-hero">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-cairo mb-4">
            كوادر كلافيل <span className="text-[#C9A96E]">الطبية</span>
          </h1>
          <div className="w-14 h-1 bg-[#C9A96E] rounded-full mx-auto mb-4" />
          <p className="text-gray-200 font-cairo text-base sm:text-lg max-w-xl mx-auto">
            نخبة من الأطباء والاستشاريين ذوي الخبرات المتخصصة والتدريب الدولي
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DoctorsGrid doctors={doctors} />
        </div>
      </section>
    </div>
  );
}
