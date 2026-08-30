import { PrismaClient } from "@prisma/client";
import MessagesClient from "@/components/admin/MessagesClient";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1B4332] mb-2 font-cairo">
          رسائل تواصل معنا
        </h1>
        <p className="text-gray-500 font-cairo text-sm">
          عرض جميع الرسائل والاستفسارات الواردة من صفحة اتصل بنا.
        </p>
      </div>

      <MessagesClient initialMessages={messages} />
    </div>
  );
}
