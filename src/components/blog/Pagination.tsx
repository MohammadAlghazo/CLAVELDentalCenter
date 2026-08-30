"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Pagination({ totalPages, currentPage }: { totalPages: number; currentPage: number }) {
  const searchParams = useSearchParams();

  const getUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `/blog?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-16">
      {currentPage > 1 && (
        <Link
          href={getUrl(currentPage - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#1B4332] hover:bg-[#C9A96E] hover:text-white transition-colors border border-gray-200 shadow-sm"
          aria-label="الصفحة السابقة"
        >
          <ArrowRight size={18} />
        </Link>
      )}

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <Link
            key={i}
            href={getUrl(i + 1)}
            className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
              currentPage === i + 1
                ? "bg-[#1B4332] text-white shadow-[0_4px_15px_rgba(27,67,50,0.3)] scale-110"
                : "bg-white text-gray-600 hover:bg-[#C9A96E] hover:text-white border border-gray-200"
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>

      {currentPage < totalPages && (
        <Link
          href={getUrl(currentPage + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#1B4332] hover:bg-[#C9A96E] hover:text-white transition-colors border border-gray-200 shadow-sm"
          aria-label="الصفحة التالية"
        >
          <ArrowLeft size={18} />
        </Link>
      )}
    </div>
  );
}
