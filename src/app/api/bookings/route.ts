import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, phone, service, doctor, preferDate, preferTime, notes } =
      body;

    // Validate required fields
    if (!fullName || !phone || !service) {
      return NextResponse.json(
        { error: "الاسم ورقم الجوال والخدمة مطلوبة" },
        { status: 400 }
      );
    }

    // Save to database
    const newBooking = await prisma.booking.create({
      data: {
        fullName,
        phone,
        service,
        doctor: doctor || null,
        preferDate: preferDate || null,
        preferTime: preferTime || null,
        notes: notes || null,
        status: "pending",
      },
    });

    return NextResponse.json(
      { message: "تم استلام طلب حجزك بنجاح", success: true, id: newBooking.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
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
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ bookings });
  } catch (error) {
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب الحجوزات" },
      { status: 500 }
    );
  }
}
