import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import FaqForm from "@/components/admin/FaqForm";

const prisma = new PrismaClient();

export default async function EditFaqPage({
  params,
}: {
  params: { id: string };
}) {
  const faq = await prisma.faq.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!faq) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1B4332] mb-2 font-cairo">
          تعديل السؤال
        </h1>
        <p className="text-gray-500 font-cairo text-sm">
          تعديل تفاصيل السؤال والجواب
        </p>
      </div>

      <div className="max-w-3xl">
        <FaqForm initialData={faq} />
      </div>
    </div>
  );
}
