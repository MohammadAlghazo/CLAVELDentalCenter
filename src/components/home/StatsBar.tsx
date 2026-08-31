"use client";
import { useRef } from "react";
import { Heart } from "lucide-react";
import { useInView } from "framer-motion";

const customStats = [
  { value: "25+", label: "سنة خبرة" },
  { value: "4+", label: "أطباء متخصصون" },
  { value: "12+", label: "خدمة متكاملة" },
  { isIcon: true, icon: Heart, label: "المدينة المنورة" },
];

function StatItem({ 
  item, 
  index 
}: { 
  item: typeof customStats[0]; 
  index: number 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center justify-center p-4 transition-all duration-700 delay-[${index * 100}ms] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {item.isIcon && item.icon ? (
        <item.icon className="w-10 h-10 sm:w-12 sm:h-12 text-[#C9A96E] mb-2 fill-current" />
      ) : (
        <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#C9A96E] font-cairo mb-2">
          {item.value}
        </span>
      )}
      <span className="text-sm sm:text-base text-gray-200 font-cairo font-medium text-center">
        {item.label}
      </span>
    </div>
  );
}

export default function StatsBar() {
  return (
    <div className="bg-[#1B4332] w-full relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {customStats.map((stat, i) => (
            <StatItem key={i} item={stat} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
