"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { services } from "@/data/siteData";
import { Phone, CheckCircle, Loader2 } from "lucide-react";

const schema = z.object({
  fullName: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(9, "رقم الجوال مطلوب"),
  service: z.string().min(1, "اختر الخدمة"),
});

type FormData = z.infer<typeof schema>;

export default function BookingCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
      } else {
        alert("حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى أو الاتصال بنا هاتفياً.");
      }
    } catch {
      alert("حدث خطأ في الاتصال بالخادم. يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-[#1B4332]" id="book-quick">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-cairo mb-3">
            احجز موعدك <span className="text-[#C9A96E]">الآن</span>
          </h2>
          <div className="w-14 h-1 bg-[#C9A96E] rounded-full mx-auto mb-4" />
          <p className="text-gray-300 font-cairo text-base">
            أرسل طلب حجزك وسيتواصل معك فريقنا خلال 24 ساعة
          </p>
        </div>

        {submitted ? (
          <div className="bg-white/10 backdrop-blur-sm border border-[#C9A96E]/30 rounded-2xl p-10 text-center">
            <CheckCircle size={56} className="text-[#C9A96E] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white font-cairo mb-2">
              تم استلام طلب حجزك! ✨
            </h3>
            <p className="text-gray-300 font-cairo">
              سيتواصل معك فريقنا خلال 24 ساعة لتأكيد الموعد
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-[#C9A96E] underline font-cairo text-sm hover:no-underline"
            >
              حجز موعد آخر
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Name */}
              <div>
                <label className="block text-white/80 text-sm font-semibold font-cairo mb-1.5">
                  الاسم الكامل *
                </label>
                <input
                  {...register("fullName")}
                  placeholder="أدخل اسمك"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 rounded-xl font-cairo text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1 font-cairo">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-white/80 text-sm font-semibold font-cairo mb-1.5">
                  رقم الجوال *
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="05XXXXXXXX"
                  dir="ltr"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 rounded-xl font-cairo text-sm focus:outline-none focus:border-[#C9A96E] transition-colors text-right"
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1 font-cairo">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Service */}
              <div>
                <label className="block text-white/80 text-sm font-semibold font-cairo mb-1.5">
                  الخدمة المطلوبة *
                </label>
                <select
                  {...register("service")}
                  className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl font-cairo text-sm focus:outline-none focus:border-[#C9A96E] transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="text-gray-800">
                    اختر الخدمة
                  </option>
                  {services.map((s) => (
                    <option key={s.id} value={s.nameAr} className="text-gray-800">
                      {s.nameAr}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-red-400 text-xs mt-1 font-cairo">
                    {errors.service.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 bg-[#C9A96E] text-white px-10 py-3.5 rounded-xl font-bold font-cairo text-base hover:bg-[#b8935e] transition-all duration-300 disabled:opacity-60 hover:shadow-lg hover:-translate-y-0.5 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Phone size={18} />
                )}
                {loading ? "جاري الإرسال..." : "تأكيد الحجز"}
              </button>
              <p className="text-white/40 font-cairo text-xs mt-3">
                للحجز التفصيلي{" "}
                <a
                  href="/book"
                  className="text-[#C9A96E] hover:underline"
                >
                  اضغط هنا
                </a>
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
