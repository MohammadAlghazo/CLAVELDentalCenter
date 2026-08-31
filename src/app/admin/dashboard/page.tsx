import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Calendar, MessageSquare, FileText, Users, LayoutDashboard } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const stats = [
    { icon: <Calendar size={24} className="text-[#C9A96E]" />, label: "الحجوزات", value: "—", href: "/admin/bookings", color: "bg-[#1B4332]" },
    { icon: <MessageSquare size={24} className="text-[#C9A96E]" />, label: "الرسائل", value: "—", href: "/admin/messages", color: "bg-[#2D6A4F]" },
    { icon: <FileText size={24} className="text-[#C9A96E]" />, label: "المقالات", value: "—", href: "/admin/blog", color: "bg-[#1B4332]" },
    { icon: <Users size={24} className="text-[#C9A96E]" />, label: "الأطباء", value: "4", href: "/admin/doctors", color: "bg-[#2D6A4F]" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F0E8] font-cairo" dir="rtl">
      <AdminSidebar />
      <div className="mr-64 p-8">
        <h1 className="text-3xl font-extrabold text-[#1B4332] font-cairo mb-8">لوحة تحكم النظام</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map((stat, i) => (
            <Link key={i} href={stat.href}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-[0_8px_25px_rgba(27,67,50,0.12)] transition-all duration-300 hover:-translate-y-1">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>{stat.icon}</div>
              <div className="text-3xl font-extrabold text-[#1B4332] mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm font-cairo">{stat.label}</div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { href: "/admin/bookings", icon: <Calendar size={20} />, title: "إدارة الحجوزات", desc: "عرض وإدارة طلبات الحجز" },
            { href: "/admin/messages", icon: <MessageSquare size={20} />, title: "رسائل التواصل", desc: "استقبال وقراءة الرسائل الواردة" },
            { href: "/admin/blog", icon: <FileText size={20} />, title: "إدارة المقالات", desc: "إنشاء وتحرير مقالات المدونة" },
          ].map((item, i) => (
            <Link key={i} href={item.href}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-[0_8px_25px_rgba(27,67,50,0.12)] transition-all duration-300 hover:-translate-y-1 flex items-start gap-4">
              <div className="w-10 h-10 bg-[#F5F0E8] rounded-xl flex items-center justify-center text-[#1B4332] flex-shrink-0">{item.icon}</div>
              <div>
                <h3 className="font-bold text-[#1B4332] font-cairo text-sm mb-1">{item.title}</h3>
                <p className="text-gray-500 font-cairo text-xs">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
