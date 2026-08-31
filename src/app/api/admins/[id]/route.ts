import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "غير مصرح لك" }, { status: 401 });
  }

  try {
    const adminId = parseInt(params.id);

    const totalAdmins = await prisma.admin.count();
    if (totalAdmins <= 1) {
      return NextResponse.json(
        { error: "لا يمكن حذف المشرف الوحيد في النظام" },
        { status: 400 }
      );
    }

    const adminToDelete = await prisma.admin.findUnique({
      where: { id: adminId }
    });

    if (adminToDelete?.username === session.user?.name) {
      return NextResponse.json(
        { error: "لا يمكنك حذف حسابك الحالي أثناء تسجيل الدخول" },
        { status: 400 }
      );
    }

    await prisma.admin.delete({
      where: { id: adminId },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ أثناء الحذف" }, { status: 500 });
  }
}
