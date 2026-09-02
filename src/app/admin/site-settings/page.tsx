"use client";
import { useState, useEffect } from "react";
import { Loader2, CheckCircle, Save } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";

type Shift = {
  id: string;
  label: string;
};

type SettingsForm = {
  workingDays: string;
  workingHoursGeneral: string;
  bookingShifts: Shift[];
};

export default function SiteSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, control, handleSubmit, reset } = useForm<SettingsForm>({
    defaultValues: {
      workingDays: "",
      workingHoursGeneral: "",
      bookingShifts: [],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "bookingShifts",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        const shifts = data.bookingShifts ? JSON.parse(data.bookingShifts) : [];
        reset({
          workingDays: data.workingDays || "",
          workingHoursGeneral: data.workingHoursGeneral || "",
          bookingShifts: shifts,
        });
        setLoading(false);
      });
  }, [reset]);

  const onSubmit = async (data: SettingsForm) => {
    setSaving(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("حدث خطأ أثناء حفظ الإعدادات");
      }
    } catch (err) {
      alert("حدث خطأ في الاتصال");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-[#1B4332]" size={32} /></div>;
  }

  return (
    <div className="font-cairo space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#1B4332]">إعدادات الموقع (أوقات الدوام)</h1>
          <p className="text-gray-500 mt-1 text-sm">تعديل أوقات العمل والفترات المتاحة للحجز في الموقع بالكامل.</p>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={saving}
          className="bg-[#C9A96E] hover:bg-[#b8935e] text-white px-6 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          حفظ التغييرات
        </button>
      </div>

      {success && (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 border border-green-200">
          <CheckCircle size={20} />
          <span className="font-semibold">تم حفظ الإعدادات بنجاح!</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#1B4332] mb-6 border-b pb-4">النصوص العامة (تظهر في الفوتر وصفحة التواصل)</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">أيام العمل</label>
              <input
                {...register("workingDays")}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none transition-all"
                placeholder="مثال: طوال أيام الأسبوع"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ساعات العمل (تظهر للزوار)</label>
              <textarea
                {...register("workingHoursGeneral")}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none transition-all resize-none"
                placeholder="من 9 صباحاً إلى 12 ظهراً..."
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#1B4332] mb-6 border-b pb-4">فترات الحجز (تظهر في نموذج حجز موعد)</h2>
          
          <div className="space-y-4">
            {fields.map((item, index) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-4 sm:items-end">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">المعرف (للنظام الداخلي)</label>
                  <input
                    {...register(`bookingShifts.${index}.id` as const)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none"
                    placeholder="مثال: morning"
                    dir="ltr"
                  />
                </div>
                <div className="flex-[2]">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">النص الظاهر للمريض (عربي)</label>
                  <input
                    {...register(`bookingShifts.${index}.label` as const)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none"
                    placeholder="مثال: صباحاً (9ص - 12م)"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="px-4 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 sm:w-auto w-full"
                >
                  حذف
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => append({ id: "", label: "" })}
              className="mt-4 px-6 py-2 border-2 border-dashed border-[#C9A96E] text-[#C9A96E] font-bold rounded-xl hover:bg-[#C9A96E]/5 w-full transition-colors"
            >
              + إضافة فترة حجز جديدة
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
