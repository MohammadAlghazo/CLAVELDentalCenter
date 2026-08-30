import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import DoctorForm from "@/components/admin/DoctorForm";

const prisma = new PrismaClient();

export default async function EditDoctorPage({
  params,
}: {
  params: { id: string };
}) {
  const doctor = await prisma.doctor.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!doctor) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1B4332] mb-2 font-cairo">
          تعديل بيانات الطبيب
        </h1>
        <p className="text-gray-500 font-cairo text-sm">
          تعديل بيانات {doctor.nameAr}
        </p>
      </div>

      <div className="max-w-3xl">
        <DoctorForm initialData={doctor} />
      </div>
    </div>
  );
}
