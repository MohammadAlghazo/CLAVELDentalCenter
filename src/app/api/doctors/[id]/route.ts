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
    const doctor = await prisma.doctor.update({
      where: { id: parseInt(params.id) },
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

    return NextResponse.json({ doctor });
  } catch (error) {
    console.error("Update doctor error:", error);
    if ((error as any).code === "P2002") {
      return NextResponse.json({ error: "الرابط (Slug) مستخدم بالفعل لطبيب آخر" }, { status: 400 });
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
    await prisma.doctor.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ أثناء الحذف" }, { status: 500 });
  }
}
