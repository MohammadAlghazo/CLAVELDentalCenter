import ArticleForm from "@/components/admin/ArticleForm";

export default function NewArticlePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1B4332] mb-2 font-cairo">
          إضافة مقال جديد
        </h1>
        <p className="text-gray-500 font-cairo text-sm">
          أدخل بيانات المقال الجديد لعرضه في المدونة.
        </p>
      </div>

      <div className="max-w-4xl">
        <ArticleForm />
      </div>
    </div>
  );
}
