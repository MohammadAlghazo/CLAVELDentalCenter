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
    
    // Fetch existing article to preserve original publishedAt date if it was already published
    const existingArticle = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!existingArticle) {
      return NextResponse.json({ error: "المقال غير موجود" }, { status: 404 });
    }

    const article = await prisma.article.update({
      where: { id: parseInt(params.id) },
      data: {
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        content: data.content,
        imageUrl: data.imageUrl,
        status: data.status,
        // Keep existing publishedAt if published, otherwise set to new Date if moving from draft to published
        publishedAt: data.status === "published" ? (existingArticle.publishedAt || new Date()) : null,
      },
    });

    return NextResponse.json({ article });
  } catch (error) {
    console.error("Update article error:", error);
    if ((error as any).code === "P2002") {
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
