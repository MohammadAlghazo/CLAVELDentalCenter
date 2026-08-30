"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Doctor } from "@prisma/client";

export default function DoctorForm({ initialData }: { initialData?: Doctor }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      nameAr: formData.get("nameAr"),
      nameEn: formData.get("nameEn"),
      titleAr: formData.get("titleAr"),
      titleEn: formData.get("titleEn"),
      slug: formData.get("slug"),
      shortBio: formData.get("shortBio"),
      isActive: formData.get("isActive") === "on",
      image: formData.get("image") || null,

      qualifications: initialData?.qualifications || "[]",
      specialties: initialData?.specialties || "[]",
    };

    try {
      const res = await fetch(
        initialData ? `/api/doctors/${initialData.id}` : "/api/doctors",
        {
          method: initialData ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "حدث خطأ ما");
      }

      router.push("/admin/doctors");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-semibold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">الاسم (عربي)</label>
          <input
            name="nameAr"
            defaultValue={initialData?.nameAr || ""}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-all bg-gray-50 focus:bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">الاسم (إنجليزي)</label>
          <input
            name="nameEn"
            defaultValue={initialData?.nameEn || ""}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-all bg-gray-50 focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">المسمى الوظيفي (عربي)</label>
          <input
            name="titleAr"
            defaultValue={initialData?.titleAr || ""}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-all bg-gray-50 focus:bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">المسمى الوظيفي (إنجليزي)</label>
          <input
            name="titleEn"
            defaultValue={initialData?.titleEn || ""}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-all bg-gray-50 focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">الرابط (Slug)</label>
          <input
            name="slug"
            defaultValue={initialData?.slug || ""}
            required
            dir="ltr"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-all bg-gray-50 focus:bg-white text-left"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">رابط الصورة</label>
          <input
            name="image"
            defaultValue={initialData?.image || ""}
            dir="ltr"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-all bg-gray-50 focus:bg-white text-left"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">نبذة مختصرة</label>
          <textarea
            name="shortBio"
            defaultValue={initialData?.shortBio || ""}
            required
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-all bg-gray-50 focus:bg-white resize-none"
          />
        </div>

        <div className="md:col-span-2 flex items-center gap-3">
          <input
            type="checkbox"
            name="isActive"
            id="isActive"
            defaultChecked={initialData ? initialData.isActive : true}
            className="w-5 h-5 text-[#1B4332] rounded border-gray-300 focus:ring-[#1B4332]"
          />
          <label htmlFor="isActive" className="text-sm font-bold text-gray-700 cursor-pointer">
            عرض هذا الطبيب في الموقع (نشط)
          </label>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-end gap-4">
        <Link
          href="/admin/doctors"
          className="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
        >
          إلغاء
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-[#1B4332] text-white px-8 py-2.5 rounded-xl font-bold hover:bg-[#2D6A4F] transition-all duration-300 disabled:opacity-50"
        >
          <Save size={18} />
          {isSubmitting ? "جاري الحفظ..." : "حفظ بيانات الطبيب"}
        </button>
      </div>
    </form>
  );
}
