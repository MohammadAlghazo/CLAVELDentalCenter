import { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata = {
  title: "لوحة تحكم كلافيل - الإدارة",
  description: "لوحة تحكم إدارة مجمع كلافيل لطب الأسنان",
  robots: {
    index: false,
    follow: false,
  }, // Prevent search engines from indexing the admin dashboard
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="min-h-screen bg-[#F5F0E8] font-cairo" dir="rtl">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] font-cairo" dir="rtl">
      
      <AdminSidebar />

      <main className="pr-64">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
