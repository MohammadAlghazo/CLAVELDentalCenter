"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import Link from "next/link";
import type { Article } from "@prisma/client";

export default function ArticleForm({ initialData }: { initialData?: Article }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      summary: formData.get("summary"),
      content: formData.get("content"),
      imageUrl: formData.get("imageUrl") || null,
      status: formData.get("status"),
    };

    try {
      const res = await fetch(
        initialData ? `/api/articles/${initialData.id}` : "/api/articles",
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

      router.push("/admin/blog");
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
          <label className="block text-sm font-bold text-gray-700 mb-2">عنوان المقال</label>
          <input
            name="title"
            defaultValue={initialData?.title || ""}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] transition-all bg-gray-50 focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">رابط المقال (Slug) بالإنجليزية</label>
          <input
            name="slug"
            defaultValue={initialData?.slug || ""}
            required
            pattern="^[a-z0-9-]+$"
            title="يجب أن يحتوي على أحرف إنجليزية وأرقام وشرطات (-) فقط"
            placeholder="example: teeth-whitening-tips"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] transition-all bg-gray-50 focus:bg-white text-left"
            dir="ltr"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">رابط الصورة (URL)</label>
          <input
            name="imageUrl"
            defaultValue={initialData?.imageUrl || ""}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] transition-all bg-gray-50 focus:bg-white text-left"
            dir="ltr"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">ملخص المقال</label>
          <textarea
            name="summary"
            defaultValue={initialData?.summary || ""}
            required
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] transition-all bg-gray-50 focus:bg-white resize-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">المحتوى (يدعم HTML)</label>
          <textarea
            name="content"
            defaultValue={initialData?.content || ""}
            required
            rows={10}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] transition-all bg-gray-50 focus:bg-white resize-none text-left"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">حالة المقال</label>
          <select
            name="status"
            defaultValue={initialData?.status || "draft"}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] transition-all bg-gray-50 focus:bg-white"
          >
            <option value="draft">مسودة (غير منشور)</option>
            <option value="published">منشور (يظهر للعموم)</option>
          </select>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
        {initialData ? (
          <button
            type="button"
            onClick={async () => {
              if (!confirm("هل أنت متأكد من حذف هذا المقال؟")) return;
              try {
                const res = await fetch(`/api/articles/${initialData.id}`, { method: "DELETE" });
                if (!res.ok) throw new Error("حدث خطأ أثناء الحذف");
                router.push("/admin/blog");
                router.refresh();
              } catch (err: any) {
                alert(err.message);
              }
            }}
            className="px-6 py-2.5 rounded-xl font-bold text-red-600 hover:bg-red-50 transition-colors"
          >
            حذف المقال
          </button>
        ) : (
          <div></div>
        )}
        
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
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
            {isSubmitting ? "جاري الحفظ..." : "حفظ المقال"}
          </button>
        </div>
      </div>
    </form>
  );
}
