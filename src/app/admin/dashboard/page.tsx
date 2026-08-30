"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, MessageSquare, FileText, Users, LogOut, LayoutDashboard } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (auth !== "true") {
      router.push("/admin/login");
    } else {
      setIsAuth(true);
    }
  }, [router]);

  const logout = () => {
    sessionStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  if (!isAuth) return null;

  const stats = [
    { icon: <Calendar size={24} className="text-[#C9A96E]" />, label: "الحجوزات الجديدة", value: "—", href: "/admin/bookings", color: "bg-[#1B4332]" },
    { icon: <MessageSquare size={24} className="text-[#C9A96E]" />, label: "رسائل التواصل", value: "—", href: "/admin/messages", color: "bg-[#2D6A4F]" },
    { icon: <FileText size={24} className="text-[#C9A96E]" />, label: "مقالات المدونة", value: "—", href: "/admin/articles", color: "bg-[#1B4332]" },
    { icon: <Users size={24} className="text-[#C9A96E]" />, label: "الأطباء", value: "4", href: "/doctors", color: "bg-[#2D6A4F]" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F0E8] font-cairo" dir="rtl">
      {/* Admin Nav */}
      <nav className="bg-[#1B4332] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#C9A96E] rounded-full flex items-center justify-center">
            <LayoutDashboard size={16} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-sm">لوحة التحكم</div>
            <div className="text-xs text-[#C9A96E]">كلافيل لطب الأسنان</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-white/70 hover:text-white text-sm font-cairo transition-colors" target="_blank">عرض الموقع</Link>
          <button onClick={logout} className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors">
            <LogOut size={16} /> خروج
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-extrabold text-[#1B4332] font-cairo mb-8">لوحة التحكم</h1>

        {/* Stats */}
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

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { href: "/admin/bookings", icon: <Calendar size={20} />, title: "إدارة الحجوزات", desc: "عرض وإدارة طلبات الحجز" },
            { href: "/admin/messages", icon: <MessageSquare size={20} />, title: "رسائل التواصل", desc: "استقبال وقراءة الرسائل الواردة" },
            { href: "/admin/articles", icon: <FileText size={20} />, title: "إدارة المقالات", desc: "إنشاء وتحرير مقالات المدونة" },
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

        <div className="mt-8 bg-[#1B4332]/5 border border-[#1B4332]/10 rounded-xl p-5">
          <p className="text-[#1B4332] font-cairo text-sm font-semibold mb-1">ملاحظة مهمة</p>
          <p className="text-gray-600 font-cairo text-xs leading-relaxed">
            لتفعيل حفظ الحجوزات والرسائل في قاعدة البيانات، يجب إعداد MySQL وملف .env.local.
            راجع الملف <code className="bg-white px-1 rounded text-xs">.env.example</code> للتعليمات.
          </p>
        </div>
      </div>
    </div>
  );
}
