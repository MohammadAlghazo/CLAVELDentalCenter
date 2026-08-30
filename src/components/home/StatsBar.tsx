"use client";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/siteData";

function StatItem({ value, label, index }: { value: string; label: string; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center justify-center p-4 transition-all duration-700 delay-[${index * 100}ms] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <span className="text-4xl sm:text-5xl font-extrabold text-[#1B4332] font-cairo mb-2">
        {value}
      </span>
      <span className="text-sm sm:text-base text-gray-500 font-cairo font-semibold text-center">
        {label}
      </span>
    </div>
  );
}

export default function StatsBar() {
  return (
    <div className="relative z-20 -mt-16 sm:-mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(27,67,50,0.12)] border border-gray-100 p-6 sm:p-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-x divide-x-reverse divide-gray-100">
          {stats.map((stat, i) => (
            <StatItem key={i} value={stat.value} label={stat.label} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
