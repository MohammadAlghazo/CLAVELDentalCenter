import FaqForm from "@/components/admin/FaqForm";

export default function NewFaqPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1B4332] mb-2 font-cairo">
          إضافة سؤال جديد
        </h1>
        <p className="text-gray-500 font-cairo text-sm">
          أدخل بيانات السؤال الجديد لعرضه في الموقع.
        </p>
      </div>

      <div className="max-w-3xl">
        <FaqForm />
      </div>
    </div>
  );
}
