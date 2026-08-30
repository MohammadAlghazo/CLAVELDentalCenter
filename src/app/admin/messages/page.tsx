import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1B4332] mb-2 font-cairo">
          رسائل تواصل معنا
        </h1>
        <p className="text-gray-500 font-cairo text-sm">
          عرض جميع الرسائل والاستفسارات الواردة من صفحة اتصل بنا.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right font-cairo">
            <thead className="bg-gray-50 border-b border-gray-100 text-[#1B4332]">
              <tr>
                <th className="px-6 py-4 font-bold text-sm w-48">اسم المرسل</th>
                <th className="px-6 py-4 font-bold text-sm w-32">رقم الجوال</th>
                <th className="px-6 py-4 font-bold text-sm">نص الرسالة</th>
                <th className="px-6 py-4 font-bold text-sm w-32">التاريخ</th>
                <th className="px-6 py-4 font-bold text-sm w-32">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    لا يوجد رسائل حالياً
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className={`transition-colors ${
                      msg.isRead ? "bg-white" : "bg-blue-50/30 font-bold"
                    } hover:bg-gray-50`}
                  >
                    <td className="px-6 py-4 text-sm text-[#1B4332]">
                      {msg.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600" dir="ltr">
                      {msg.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 leading-relaxed max-w-md">
                      {msg.message}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {format(new Date(msg.createdAt), "dd MMM yyyy", {
                        locale: ar,
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          msg.isRead
                            ? "bg-gray-100 text-gray-600"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {msg.isRead ? "مقروءة" : "جديدة"}
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
