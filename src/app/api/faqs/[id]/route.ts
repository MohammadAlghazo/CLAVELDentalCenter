import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "غير مصرح لك" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const faq = await prisma.faq.update({
      where: { id: parseInt(params.id) },
      data: {
        question: data.question,
        answer: data.answer,
        order: data.order,
        isActive: data.isActive,
      },
    });

    return NextResponse.json({ faq });
  } catch (error: any) {
    console.error("Update faq error:", error);
    return NextResponse.json({ error: "حدث خطأ أثناء التحديث" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "غير مصرح لك" }, { status: 401 });
  }

  try {
    await prisma.faq.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ أثناء الحذف" }, { status: 500 });
  }
}
