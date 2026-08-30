import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import DoctorsSection from "@/components/home/DoctorsSection";
import WhyClavel from "@/components/home/WhyClavel";
import BookingCTA from "@/components/home/BookingCTA";
import FaqPreview from "@/components/home/FaqPreview";
import BlogPreview from "@/components/home/BlogPreview";
import type { Metadata } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "مجمع كلافيل لطب الأسنان - المدينة المنورة | ابتسامتك تستحق عناية تليق بها",
  description:
    "مجمع كلافيل لطب الأسنان في المدينة المنورة. خدمات طب الأسنان التجميلي والعلاجي: زراعة الأسنان، الزيركون، الفينير، تبييض الأسنان. احجز موعدك الآن.",
  alternates: { canonical: "https://clavel.dental" },
};

export default async function HomePage() {
  const [doctors, faqs] = await Promise.all([
    prisma.doctor.findMany({
      where: { isActive: true },
      take: 4,
    }),
    prisma.faq.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      take: 4,
    }),
  ]);

  return (
    <>
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <ServicesSection />
      <DoctorsSection doctors={doctors} />
      <WhyClavel />
      <BookingCTA />
      <FaqPreview faqs={faqs} />
      <BlogPreview />
    </>
  );
}
