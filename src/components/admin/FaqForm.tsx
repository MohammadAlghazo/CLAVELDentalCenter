"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Faq } from "@prisma/client";

export default function FaqForm({ initialData }: { initialData?: Faq }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      question: formData.get("question"),
      answer: formData.get("answer"),
      order: parseInt(formData.get("order") as string) || 0,
      isActive: formData.get("isActive") === "on",
    };

    try {
      const res = await fetch(
        initialData ? `/api/faqs/${initialData.id}` : "/api/faqs",
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

      router.push("/admin/faqs");
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

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">السؤال</label>
          <input
            name="question"
            defaultValue={initialData?.question || ""}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] transition-all bg-gray-50 focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">الجواب</label>
          <textarea
            name="answer"
            defaultValue={initialData?.answer || ""}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] transition-all bg-gray-50 focus:bg-white resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">الترتيب</label>
          <input
            type="number"
            name="order"
            defaultValue={initialData?.order || 0}
            required
            className="w-full sm:w-1/3 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] transition-all bg-gray-50 focus:bg-white text-left"
            dir="ltr"
          />
          <p className="text-xs text-gray-500 mt-2">الأرقام الأقل تظهر أولاً</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isActive"
            id="isActive"
            defaultChecked={initialData ? initialData.isActive : true}
            className="w-5 h-5 text-[#1B4332] rounded border-gray-300 focus:ring-[#1B4332]"
          />
          <label htmlFor="isActive" className="text-sm font-bold text-gray-700 cursor-pointer">
            عرض هذا السؤال في الموقع (نشط)
          </label>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-end gap-4">
        <Link
          href="/admin/faqs"
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
          {isSubmitting ? "جاري الحفظ..." : "حفظ السؤال"}
        </button>
      </div>
    </form>
  );
}
