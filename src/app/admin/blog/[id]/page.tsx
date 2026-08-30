import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import ArticleForm from "@/components/admin/ArticleForm";

const prisma = new PrismaClient();

export default async function EditArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const article = await prisma.article.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!article) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1B4332] mb-2 font-cairo">
          تعديل المقال
        </h1>
        <p className="text-gray-500 font-cairo text-sm">
          تعديل محتوى المقال وحالته
        </p>
      </div>

      <div className="max-w-4xl">
        <ArticleForm initialData={article} />
      </div>
    </div>
  );
}
