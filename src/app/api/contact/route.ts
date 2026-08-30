import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "الاسم والجوال والرسالة مطلوبة" },
        { status: 400 }
      );
    }

    await prisma.contactMessage.create({
      data: {
        name,
        phone,
        message,
      },
    });

    return NextResponse.json(
      { message: "تم استلام رسالتك بنجاح", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json(
      { error: "حدث خطأ، يرجى المحاولة مجدداً" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "غير مصرح لك بالوصول" }, { status: 401 });
  }

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب الرسائل" },
      { status: 500 }
    );
  }
}
