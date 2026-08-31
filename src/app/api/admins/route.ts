import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "غير مصرح لك" }, { status: 401 });
  }

  try {
    const data = await request.json();

    const existingAdmin = await prisma.admin.findUnique({
      where: { username: data.username },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: "اسم المستخدم هذا موجود مسبقاً" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const admin = await prisma.admin.create({
      data: {
        username: data.username,
        passwordHash,
      },
    });

    return NextResponse.json(
      { message: "تم إضافة المشرف بنجاح", admin: { id: admin.id, username: admin.username } },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create admin error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إضافة المشرف" },
      { status: 500 }
    );
  }
}
