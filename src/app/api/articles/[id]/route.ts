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
    const article = await prisma.article.update({
      where: { id: parseInt(params.id) },
      data: {
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        content: data.content,
        imageUrl: data.imageUrl,
        status: data.status,
        publishedAt: data.status === "published" ? new Date() : null, // Simplistic approach, might reset date if already published
      },
    });

    return NextResponse.json({ article });
  } catch (error: any) {
    console.error("Update article error:", error);
    if (error.code === "P2002") {
      return NextResponse.json({ error: "الرابط (Slug) مستخدم بالفعل لمقال آخر" }, { status: 400 });
    }
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
    await prisma.article.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ أثناء الحذف" }, { status: 500 });
  }
}
