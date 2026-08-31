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
    const doctor = await prisma.doctor.create({
      data: {
        nameAr: data.nameAr,
        nameEn: data.nameEn,
        titleAr: data.titleAr,
        titleEn: data.titleEn,
        slug: data.slug,
        image: data.image,
        shortBio: data.shortBio,
        qualifications: data.qualifications,
        specialties: data.specialties,
        isActive: data.isActive,
      },
    });

    return NextResponse.json({ doctor }, { status: 201 });
  } catch (error: any) {
    console.error("Create doctor error:", error);
    if (error.code === "P2002") {
      return NextResponse.json({ error: "الرابط (Slug) مستخدم بالفعل لطبيب آخر" }, { status: 400 });
    }
    return NextResponse.json({ error: "حدث خطأ أثناء الحفظ" }, { status: 500 });
  }
}
