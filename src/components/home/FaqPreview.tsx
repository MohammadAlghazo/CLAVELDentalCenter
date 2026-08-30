"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowLeft } from "lucide-react";
import type { Faq } from "@prisma/client";

export default function FaqPreview({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const displayFaqs = faqs.slice(0, 4);

  return (
    <section className="py-20 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F5F0E8] text-[#1B4332] px-4 py-1.5 rounded-full text-sm font-semibold font-cairo mb-4">
            الأسئلة الشائعة
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B4332] font-cairo mb-3">
            أسئلة <span className="text-[#C9A96E]">يسألها مرضانا</span>
          </h2>
          <div className="w-14 h-1 bg-[#C9A96E] rounded-full mx-auto" />
        </div>

        <div className="space-y-3">
          {displayFaqs.map((faq, i) => (
            <div
              key={faq.id}
              className="bg-[#F5F0E8] rounded-xl overflow-hidden border border-transparent hover:border-[#C9A96E]/30 transition-colors duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right"
              >
                <span className="font-bold text-[#1B4332] font-cairo text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-[#C9A96E] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-96 pb-5" : "max-h-0"
                }`}
              >
                <p className="px-6 text-gray-600 font-cairo text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 border-2 border-[#1B4332] text-[#1B4332] px-7 py-3 rounded-xl font-bold font-cairo hover:bg-[#1B4332] hover:text-white transition-all duration-300"
          >
            عرض جميع الأسئلة
            <ArrowLeft size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
