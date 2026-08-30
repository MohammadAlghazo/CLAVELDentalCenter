"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, MessageCircle, MapPin, CheckCircle, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(9, "رقم الجوال مطلوب"),
  message: z.string().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setSubmitted(true);
      reset();
    } catch { setSubmitted(true); reset(); }
    finally { setLoading(false); }
  };

  return (
    <div className="font-cairo" dir="rtl">
      <section className="page-hero">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-cairo mb-4">تواصل <span className="text-[#C9A96E]">معنا</span></h1>
          <div className="w-14 h-1 bg-[#C9A96E] rounded-full mx-auto mb-4" />
          <p className="text-gray-200 font-cairo">نسعد بالإجابة على استفساراتك في أي وقت</p>
        </div>
      </section>

      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-[#1B4332] font-cairo">معلومات التواصل</h2>
              <div className="w-12 h-1 bg-[#C9A96E] rounded-full mb-6" />

              {[
                { icon: <MessageCircle size={20} className="text-[#C9A96E]" />, label: "واتساب", value: "0510626630", href: "https://api.whatsapp.com/send?phone=966510626630", target: "_blank" },
                { icon: <Phone size={20} className="text-[#C9A96E]" />, label: "الهاتف", value: "0148610552", href: "tel:0148610552" },
                { icon: <MapPin size={20} className="text-[#C9A96E]" />, label: "الموقع", value: "المدينة المنورة، المملكة العربية السعودية", href: undefined },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm">
                  <div className="w-11 h-11 bg-[#F5F0E8] rounded-xl flex items-center justify-center flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-xs text-gray-400 font-cairo mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.target} rel={item.target ? "noopener noreferrer" : undefined} className="font-semibold text-[#1B4332] font-cairo text-sm hover:text-[#C9A96E] transition-colors" dir="ltr">{item.value}</a>
                    ) : (
                      <p className="font-semibold text-[#1B4332] font-cairo text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Social */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="font-bold text-[#1B4332] font-cairo text-sm mb-4">تابعنا على السوشيال</p>
                <div className="flex items-center gap-3">
                  {[
                    { href: "https://www.instagram.com/clavel.dental", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>, label: "Instagram" },
                    { href: "https://www.facebook.com/clavel.dental", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>, label: "Facebook" },
                    { href: "https://api.whatsapp.com/send?phone=966510626630", icon: <MessageCircle size={18} />, label: "WhatsApp" },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                      className="w-10 h-10 bg-[#F5F0E8] text-[#1B4332] rounded-full flex items-center justify-center hover:bg-[#1B4332] hover:text-white transition-all duration-300">
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Map block removed as per user request */}
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(27,67,50,0.08)] p-7">
              <h2 className="text-xl font-bold text-[#1B4332] font-cairo mb-6">أرسل لنا رسالة</h2>
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={56} className="text-[#1B4332] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#1B4332] font-cairo mb-2">تم إرسال رسالتك!</h3>
                  <p className="text-gray-500 font-cairo text-sm">سنرد عليك قريباً إن شاء الله</p>
                  <button onClick={() => setSubmitted(false)} className="mt-5 text-[#1B4332] underline font-cairo text-sm">إرسال رسالة أخرى</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  <div>
                    <label className="form-label">الاسم *</label>
                    <input {...register("name")} className="form-input" placeholder="اسمك" />
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-cairo">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="form-label">رقم الجوال *</label>
                    <input {...register("phone")} type="tel" className="form-input" placeholder="05XXXXXXXX" dir="ltr" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1 font-cairo">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="form-label">رسالتك *</label>
                    <textarea {...register("message")} className="form-input resize-none" rows={5} placeholder="اكتب رسالتك أو استفسارك هنا..." />
                    {errors.message && <p className="text-red-500 text-xs mt-1 font-cairo">{errors.message.message}</p>}
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#1B4332] text-white py-3.5 rounded-xl font-bold font-cairo text-sm hover:bg-[#2D6A4F] transition-all duration-300 disabled:opacity-60">
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Phone size={18} />}
                    {loading ? "جاري الإرسال..." : "إرسال الرسالة"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
