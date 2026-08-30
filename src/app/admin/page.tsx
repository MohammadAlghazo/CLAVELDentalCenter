import { PrismaClient } from "@prisma/client";
import { Users, CalendarCheck, MessageSquare, FileText } from "lucide-react";

const prisma = new PrismaClient();

// This page is completely server-side rendered (SSR) because we need fresh stats.
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Fetch real-time stats from database
  const [
    totalDoctors,
    totalBookings,
    pendingBookings,
    unreadMessages,
    totalArticles,
  ] = await Promise.all([
    prisma.doctor.count(),
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "pending" } }),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.article.count(),
  ]);

  const stats = [
    {
      label: "الحجوزات الجديدة (قيد الانتظار)",
      value: pendingBookings,
      icon: CalendarCheck,
      color: "text-amber-500",
      bg: "bg-amber-100",
    },
    {
      label: "رسائل غير مقروءة",
      value: unreadMessages,
      icon: MessageSquare,
      color: "text-red-500",
      bg: "bg-red-100",
    },
    {
      label: "إجمالي الحجوزات",
      value: totalBookings,
      icon: CalendarCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      label: "الأطباء المسجلين",
      value: totalDoctors,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "المقالات المنشورة",
      value: totalArticles,
      icon: FileText,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1B4332] mb-2 font-cairo">
          مرحباً بك في لوحة التحكم 👋
        </h1>
        <p className="text-gray-500 font-cairo">
          هنا يمكنك متابعة إحصائيات المجمع وإدارة كافة الأقسام بسهولة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center gap-5 transition-transform hover:-translate-y-1 duration-300"
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.bg}`}
              >
                <Icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-cairo mb-1">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold text-[#1B4332]">
                  {stat.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Placeholder for Quick Actions or Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
          <h2 className="text-lg font-bold text-[#1B4332] mb-4 font-cairo">
            إجراءات سريعة
          </h2>
          <div className="space-y-3">
            <p className="text-sm text-gray-500 font-cairo">
              الرجاء استخدام القائمة الجانبية للتنقل بين الأقسام.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
