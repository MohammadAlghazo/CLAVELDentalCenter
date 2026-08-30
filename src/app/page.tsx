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

export const metadata: Metadata = {
  title: "مجمع كلافيل لطب الأسنان - المدينة المنورة | ابتسامتك تستحق عناية تليق بها",
  description:
    "مجمع كلافيل لطب الأسنان في المدينة المنورة. خدمات طب الأسنان التجميلي والعلاجي: زراعة الأسنان، الزيركون، الفينير، تبييض الأسنان. احجز موعدك الآن.",
  alternates: { canonical: "https://clavel.dental" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <ServicesSection />
      <DoctorsSection />
      <WhyClavel />
      <BookingCTA />
      <FaqPreview />
      <BlogPreview />
    </>
  );
}
