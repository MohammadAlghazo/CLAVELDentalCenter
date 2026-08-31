import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "غير مصرح لك" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        content: data.content,
        imageUrl: data.imageUrl,
        status: data.status,
        publishedAt: data.status === "published" ? new Date() : null,
      },
    });

    return NextResponse.json({ article }, { status: 201 });
  } catch (error: any) {
    console.error("Create article error:", error);
    if (error.code === "P2002") {
      return NextResponse.json({ error: "الرابط (Slug) مستخدم بالفعل لمقال آخر" }, { status: 400 });
    }
    return NextResponse.json({ error: "حدث خطأ أثناء حفظ المقال" }, { status: 500 });
  }
}
