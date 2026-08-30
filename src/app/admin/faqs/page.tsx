import { PrismaClient } from "@prisma/client";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  const faqs = await prisma.faq.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1B4332] mb-2 font-cairo">
            الأسئلة الشائعة
          </h1>
          <p className="text-gray-500 font-cairo text-sm">
            إدارة الأسئلة والأجوبة المعروضة في صفحة الأسئلة الشائعة.
          </p>
        </div>
        <Link
          href="/admin/faqs/new"
          className="flex items-center gap-2 bg-[#1B4332] text-white px-5 py-2.5 rounded-xl font-bold font-cairo text-sm hover:bg-[#2D6A4F] transition-all duration-300"
        >
          <Plus size={18} />
          إضافة سؤال جديد
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right font-cairo">
            <thead className="bg-gray-50 border-b border-gray-100 text-[#1B4332]">
              <tr>
                <th className="px-6 py-4 font-bold text-sm w-16 text-center">الترتيب</th>
                <th className="px-6 py-4 font-bold text-sm">السؤال</th>
                <th className="px-6 py-4 font-bold text-sm">الحالة</th>
                <th className="px-6 py-4 font-bold text-sm text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {faqs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    لا يوجد أسئلة مضافة حالياً
                  </td>
                </tr>
              ) : (
                faqs.map((faq) => (
                  <tr
                    key={faq.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-bold text-gray-500 text-center">
                      {faq.order}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#1B4332]">
                      {faq.question}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${
                          faq.isActive
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {faq.isActive ? "ظاهر" : "مخفي"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/faqs/${faq.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <Pencil size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
