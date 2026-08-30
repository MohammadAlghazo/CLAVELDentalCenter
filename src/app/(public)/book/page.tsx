"use client";
import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { services, doctors } from "@/data/siteData";
import { Phone, CheckCircle, Loader2, MessageCircle } from "lucide-react";

const schema = z.object({
  fullName: z.string().min(2, "الاسم الكامل مطلوب"),
  phone: z.string().min(9, "رقم الجوال مطلوب"),
  service: z.string().min(1, "اختر الخدمة المطلوبة"),
  doctor: z.string().optional(),
  preferDate: z.string().optional(),
  preferTime: z.string().optional(),
  notes: z.string().optional(),
  privacy: z.boolean().refine((v) => v === true, {
    message: "يجب الموافقة على سياسة الخصوصية",
  }),
});

type FormData = z.infer<typeof schema>;

function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const defaultService = searchParams.get("service") || "";
  const defaultDoctor = searchParams.get("doctor") || "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      service: defaultService,
      doctor: defaultDoctor,
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok || res.status === 201) {
        setSubmitted(true);
        reset();
      }
    } catch {
      setSubmitted(true);
      reset();
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <CheckCircle size={72} className="text-[#1B4332] mx-auto mb-6" />
        <h2 className="text-3xl font-extrabold text-[#1B4332] font-cairo mb-3">
          تم استلام طلب حجزك! ✨
        </h2>
        <p className="text-gray-600 font-cairo text-base mb-6 leading-relaxed">
          شكراً لك! سيتواصل معك فريق كلافيل خلال 24 ساعة لتأكيد موعدك.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setSubmitted(false)}
            className="bg-[#1B4332] text-white px-6 py-3 rounded-xl font-bold font-cairo text-sm hover:bg-[#2D6A4F] transition-all duration-300"
          >
            حجز موعد آخر
          </button>
          <a
            href="https://api.whatsapp.com/send?phone=966510626630"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold font-cairo text-sm hover:bg-[#1eb856] transition-all duration-300 flex items-center gap-2"
          >
            <MessageCircle size={16} />
            تواصل عبر واتساب
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto"
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div>
          <label className="form-label">الاسم الكامل *</label>
          <input
            {...register("fullName")}
            className="form-input"
            placeholder="أدخل اسمك الكامل"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1 font-cairo">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="form-label">رقم الجوال *</label>
          <input
            {...register("phone")}
            type="tel"
            className="form-input"
            placeholder="05XXXXXXXX"
            dir="ltr"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1 font-cairo">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Service */}
        <div>
          <label className="form-label">الخدمة المطلوبة *</label>
          <select {...register("service")} className="form-input cursor-pointer">
            <option value="">اختر الخدمة</option>
            {services.map((s) => (
              <option key={s.id} value={s.nameAr}>
                {s.nameAr}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="text-red-500 text-xs mt-1 font-cairo">
              {errors.service.message}
            </p>
          )}
        </div>

        {/* Doctor */}
        <div>
          <label className="form-label">الطبيب المفضل</label>
          <select {...register("doctor")} className="form-input cursor-pointer">
            <option value="">أي طبيب متاح</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.nameAr}>
                {d.nameAr}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="form-label">التاريخ المفضل</label>
          <input
            {...register("preferDate")}
            type="date"
            className="form-input"
            dir="ltr"
          />
        </div>

        {/* Time */}
        <div>
          <label className="form-label">الوقت المفضل</label>
          <select {...register("preferTime")} className="form-input cursor-pointer">
            <option value="">اختر الوقت</option>
            <option value="صباحاً">صباحاً (8ص - 12م)</option>
            <option value="مساءً">مساءً (4م - 9م)</option>
          </select>
        </div>

        {/* Notes */}
        <div className="sm:col-span-2">
          <label className="form-label">ملاحظات إضافية</label>
          <textarea
            {...register("notes")}
            className="form-input resize-none"
            rows={4}
            placeholder="أي تفاصيل أو استفسارات إضافية..."
          />
        </div>

        {/* Privacy */}
        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              {...register("privacy")}
              type="checkbox"
              className="mt-1 w-4 h-4 accent-[#1B4332] cursor-pointer flex-shrink-0"
            />
            <span className="text-sm text-gray-600 font-cairo leading-relaxed">
              أوافق على{" "}
              <a
                href="/privacy"
                className="text-[#1B4332] underline hover:no-underline"
                target="_blank"
              >
                سياسة الخصوصية
              </a>{" "}
              وأعلم أن بياناتي ستُستخدم فقط لتأكيد الحجز وأغراض التواصل
            </span>
          </label>
          {errors.privacy && (
            <p className="text-red-500 text-xs mt-1 font-cairo">
              {errors.privacy.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-[#1B4332] text-white px-12 py-4 rounded-xl font-bold font-cairo text-base hover:bg-[#2D6A4F] transition-all duration-300 disabled:opacity-60 hover:shadow-xl hover:-translate-y-0.5 disabled:hover:translate-y-0"
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Phone size={20} />
          )}
          {loading ? "جاري الإرسال..." : "تأكيد الحجز"}
        </button>
      </div>
    </form>
  );
}

export default function BookPage() {
  return (
    <div className="font-cairo" dir="rtl">
      {/* Hero */}
      <section className="page-hero">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-cairo mb-4">
            احجز <span className="text-[#C9A96E]">موعدك</span>
          </h1>
          <div className="w-14 h-1 bg-[#C9A96E] rounded-full mx-auto mb-4" />
          <p className="text-gray-200 font-cairo text-base sm:text-lg">
            أرسل طلب حجزك وسيتواصل معك فريقنا خلال 24 ساعة
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(27,67,50,0.08)] p-6 sm:p-10">
            <Suspense fallback={<div className="text-center py-10 font-cairo text-gray-500">جاري التحميل...</div>}>
              <BookingForm />
            </Suspense>
          </div>

          {/* Alternative Contact */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://api.whatsapp.com/send?phone=966510626630"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-xl font-bold font-cairo hover:bg-[#1eb856] transition-all duration-300 hover:shadow-lg"
            >
              <MessageCircle size={20} />
              أو تواصل عبر واتساب
            </a>
            <a
              href="tel:0148610552"
              className="flex items-center justify-center gap-3 bg-[#1B4332] text-white py-4 rounded-xl font-bold font-cairo hover:bg-[#2D6A4F] transition-all duration-300 hover:shadow-lg"
            >
              <Phone size={20} />
              أو اتصل بنا مباشرة
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
