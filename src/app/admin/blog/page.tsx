import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { FileText, Plus, Edit, Trash2 } from "lucide-react";

const prisma = new PrismaClient();

export default async function AdminBlogPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1B4332] mb-2 font-cairo">
            إدارة المقالات
          </h1>
          <p className="text-gray-500 font-cairo text-sm">
            إضافة، تعديل، وحذف مقالات المدونة.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 bg-[#1B4332] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#2D6A4F] transition-all duration-300 shadow-sm"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">إضافة مقال جديد</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right font-cairo">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-700">عنوان المقال</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-700 hidden sm:table-cell">الحالة</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-700 hidden md:table-cell">تاريخ الإضافة</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-700 text-left">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    لا يوجد مقالات حتى الآن.
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center shrink-0">
                          <FileText size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{article.title}</div>
                          <div className="text-xs text-gray-500 mt-1" dir="ltr">/{article.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${
                          article.status === "published"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {article.status === "published" ? "منشور" : "مسودة"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                      {new Date(article.createdAt).toLocaleDateString("ar-EG")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/blog/${article.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <Edit size={18} />
                        </Link>
                        {/* We will let the user use the edit page to delete, or add a client component for quick delete. 
                            For simplicity, we'll direct them to edit page, or just keep it simple here. */}
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
