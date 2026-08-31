import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";
import AdminManager from "@/components/admin/AdminManager";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.name) {
    redirect("/admin/login");
  }

  const admins = await prisma.admin.findMany({
    select: {
      id: true,
      username: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1B4332] mb-2 font-cairo">
          الإعدادات ومدراء النظام
        </h1>
        <p className="text-gray-500 font-cairo text-sm">
          تغيير كلمة المرور وإدارة صلاحيات دخول مدراء لوحة التحكم.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <ChangePasswordForm />
        <AdminManager admins={admins} currentUsername={session.user.name} />
      </div>
    </div>
  );
}
