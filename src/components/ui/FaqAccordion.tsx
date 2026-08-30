"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={item.id}
          className="bg-white rounded-xl overflow-hidden border border-transparent hover:border-[#C9A96E]/30 transition-all duration-200 shadow-sm"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right"
            aria-expanded={openIndex === i}
          >
            <span className="font-bold text-[#1B4332] font-cairo text-base">
              {item.question}
            </span>
            <ChevronDown
              size={20}
              className={`text-[#C9A96E] flex-shrink-0 transition-transform duration-300 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              openIndex === i ? "max-h-96 pb-5" : "max-h-0"
            }`}
          >
            <p className="px-6 text-gray-600 font-cairo text-sm leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
