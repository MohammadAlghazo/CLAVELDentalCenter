import { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "لوحة تحكم كلافيل - الإدارة",
  description: "لوحة تحكم إدارة مجمع كلافيل لطب الأسنان",
  robots: {
    index: false,
    follow: false,
  }, // Prevent search engines from indexing the admin dashboard
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F0E8] font-cairo" dir="rtl">
      {/* Sidebar - fixed on the right */}
      <AdminSidebar />
      
      {/* Main Content Area - padded to the right to avoid sidebar */}
      <main className="pr-64">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
