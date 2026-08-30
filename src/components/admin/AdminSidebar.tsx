"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  MessageSquare, 
  Users, 
  HelpCircle, 
  FileText,
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";
import Image from "next/image";

const menuItems = [
  { href: "/admin", label: "الرئيسية", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "الحجوزات", icon: CalendarCheck },
  { href: "/admin/messages", label: "الرسائل", icon: MessageSquare },
  { href: "/admin/doctors", label: "الأطباء", icon: Users },
  { href: "/admin/faqs", label: "الأسئلة الشائعة", icon: HelpCircle },
  { href: "/admin/blog", label: "المدونة", icon: FileText },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1B4332] text-white min-h-screen flex flex-col fixed right-0 top-0 bottom-0 z-50 transition-all duration-300">
      {/* Logo Area */}
      <div className="p-6 border-b border-white/10 flex flex-col items-center justify-center">
        <Link href="/" target="_blank" className="bg-white/10 p-3 rounded-full mb-3 hover:bg-white/20 transition-colors">
          <Image src="/images/logo.png" alt="Logo" width={50} height={50} className="filter brightness-0 invert" />
        </Link>
        <h2 className="font-bold text-lg font-cairo text-center">لوحة تحكم كلافيل</h2>
        <a href="/" target="_blank" className="text-xs text-[#C9A96E] hover:text-white transition-colors mt-1 font-cairo flex items-center gap-1">
          عرض الموقع <ChevronRight size={12} />
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-cairo transition-all duration-200 ${
                isActive 
                  ? "bg-[#C9A96E] text-white shadow-lg shadow-[#C9A96E]/20 font-bold" 
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={20} className={isActive ? "text-white" : "text-gray-400"} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-cairo text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all duration-200"
        >
          <LogOut size={20} />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}
