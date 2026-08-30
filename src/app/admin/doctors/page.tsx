import { PrismaClient } from "@prisma/client";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export default async function AdminDoctorsPage() {
  const doctors = await prisma.doctor.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1B4332] mb-2 font-cairo">
            إدارة الأطباء
          </h1>
          <p className="text-gray-500 font-cairo text-sm">
            إضافة، تعديل، أو حذف الأطباء المعروضين في الموقع.
          </p>
        </div>
        <Link
          href="/admin/doctors/new"
          className="flex items-center gap-2 bg-[#1B4332] text-white px-5 py-2.5 rounded-xl font-bold font-cairo text-sm hover:bg-[#2D6A4F] transition-all duration-300"
        >
          <Plus size={18} />
          إضافة طبيب جديد
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right font-cairo">
            <thead className="bg-gray-50 border-b border-gray-100 text-[#1B4332]">
              <tr>
                <th className="px-6 py-4 font-bold text-sm w-16">الصورة</th>
                <th className="px-6 py-4 font-bold text-sm">الاسم (عربي)</th>
                <th className="px-6 py-4 font-bold text-sm">المسمى (عربي)</th>
                <th className="px-6 py-4 font-bold text-sm">الحالة</th>
                <th className="px-6 py-4 font-bold text-sm text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {doctors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    لا يوجد أطباء مضافين حالياً
                  </td>
                </tr>
              ) : (
                doctors.map((doctor) => (
                  <tr
                    key={doctor.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {doctor.image ? (
                        <img
                          src={doctor.image}
                          alt={doctor.nameAr}
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                          بدون
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#1B4332]">
                      {doctor.nameAr}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {doctor.titleAr}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${
                          doctor.isActive
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {doctor.isActive ? "نشط" : "غير نشط"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/doctors/${doctor.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <Pencil size={18} />
                        </Link>
                        {/* We will implement a client component for delete later if needed, or simply link to an edit page which has delete */}
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
