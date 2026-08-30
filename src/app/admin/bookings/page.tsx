import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1B4332] mb-2 font-cairo">
          إدارة الحجوزات
        </h1>
        <p className="text-gray-500 font-cairo text-sm">
          عرض جميع حجوزات المرضى الواردة من الموقع الإلكتروني.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right font-cairo">
            <thead className="bg-gray-50 border-b border-gray-100 text-[#1B4332]">
              <tr>
                <th className="px-6 py-4 font-bold text-sm">رقم الحجز</th>
                <th className="px-6 py-4 font-bold text-sm">اسم المريض</th>
                <th className="px-6 py-4 font-bold text-sm">رقم الجوال</th>
                <th className="px-6 py-4 font-bold text-sm">الخدمة المطلوبة</th>
                <th className="px-6 py-4 font-bold text-sm">التاريخ المفضل</th>
                <th className="px-6 py-4 font-bold text-sm">تاريخ الطلب</th>
                <th className="px-6 py-4 font-bold text-sm">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    لا يوجد حجوزات حالياً
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-gray-600">
                      #{booking.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#1B4332]">
                      {booking.fullName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600" dir="ltr">
                      {booking.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {booking.service}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {booking.preferDate ? booking.preferDate : "غير محدد"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {format(new Date(booking.createdAt), "dd MMM yyyy", {
                        locale: ar,
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${
                          booking.status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : booking.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {booking.status === "pending" && "قيد الانتظار"}
                        {booking.status === "confirmed" && "تم التأكيد"}
                        {booking.status === "cancelled" && "ملغي"}
                      </span>
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
