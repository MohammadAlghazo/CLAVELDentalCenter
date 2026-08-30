import DoctorForm from "@/components/admin/DoctorForm";

export default function NewDoctorPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1B4332] mb-2 font-cairo">
          إضافة طبيب جديد
        </h1>
        <p className="text-gray-500 font-cairo text-sm">
          أدخل بيانات الطبيب الجديد لعرضه في الموقع.
        </p>
      </div>

      <div className="max-w-3xl">
        <DoctorForm />
      </div>
    </div>
  );
}
