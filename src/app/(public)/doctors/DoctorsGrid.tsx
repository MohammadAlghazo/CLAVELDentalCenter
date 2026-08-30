"use client";
import Link from "next/link";
import { Phone, UserRound } from "lucide-react";
import type { Doctor } from "@prisma/client";

export default function DoctorsGrid({ doctors }: { doctors: Doctor[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(27,67,50,0.07)] hover:shadow-[0_16px_50px_rgba(27,67,50,0.15)] transition-all duration-300 hover:-translate-y-3"
        >
          {/* Photo */}
          <div className="relative bg-gradient-to-br from-[#F5F0E8] to-[#e8e0d0] h-64 flex items-center justify-center overflow-hidden">
            {doctor.image ? (
              <img
                src={doctor.image}
                alt={doctor.nameAr}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="absolute inset-0 items-center justify-center hidden"
              aria-hidden="true"
            >
              <UserRound size={64} className="text-[#1B4332]/20" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Info */}
          <div className="p-6">
            <h2 className="font-extrabold text-[#1B4332] font-cairo text-base leading-snug mb-1">
              {doctor.nameAr}
            </h2>
            <p className="text-sm font-medium text-gray-500 font-cairo mb-1">
              {doctor.nameEn}
            </p>
            <p className="text-[#C9A96E] font-semibold font-cairo text-sm mb-3">
              {doctor.titleAr}
            </p>
            <p className="text-gray-500 font-cairo text-xs leading-relaxed mb-5">
              {doctor.shortBio}
            </p>

            <div className="flex flex-col gap-2">
              <Link
                href={`/doctors/${doctor.slug}`}
                className="flex items-center justify-center gap-1.5 border border-[#1B4332] text-[#1B4332] py-2.5 rounded-xl font-semibold font-cairo text-sm hover:bg-[#1B4332] hover:text-white transition-all duration-300"
              >
                <UserRound size={14} />
                الملف الطبي
              </Link>
              <Link
                href={`/book?doctor=${encodeURIComponent(doctor.nameAr)}`}
                className="flex items-center justify-center gap-1.5 bg-[#1B4332] text-white py-2.5 rounded-xl font-semibold font-cairo text-sm hover:bg-[#2D6A4F] transition-all duration-300"
              >
                <Phone size={14} />
                احجز موعداً
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
