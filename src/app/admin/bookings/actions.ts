"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function markAsContacted(id: number) {
  await prisma.booking.update({
    where: { id },
    data: { status: "confirmed" },
  });
  revalidatePath("/admin/bookings");
}
