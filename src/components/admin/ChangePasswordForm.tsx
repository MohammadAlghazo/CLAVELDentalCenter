"use client";
import { useState } from "react";
import { Lock, Save } from "lucide-react";

export default function ChangePasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (newPassword !== confirmPassword) {
      setError("كلمة المرور الجديدة غير متطابقة");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/admins/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "حدث خطأ ما");
      }

      setSuccess("تم تغيير كلمة المرور بنجاح");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
          <Lock size={20} />
        </div>
        <h2 className="text-xl font-bold text-[#1B4332] font-cairo">تغيير كلمة المرور</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-semibold">{error}</div>}
        {success && <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-semibold">{success}</div>}

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">كلمة المرور الحالية</label>
          <input
            type="password"
            name="currentPassword"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] transition-all bg-gray-50 focus:bg-white text-left"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">كلمة المرور الجديدة</label>
          <input
            type="password"
            name="newPassword"
            required
            minLength={6}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] transition-all bg-gray-50 focus:bg-white text-left"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">تأكيد كلمة المرور الجديدة</label>
          <input
            type="password"
            name="confirmPassword"
            required
            minLength={6}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] transition-all bg-gray-50 focus:bg-white text-left"
            dir="ltr"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center gap-2 bg-[#1B4332] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#2D6A4F] transition-all duration-300 disabled:opacity-50 mt-6"
        >
          <Save size={18} />
          {isSubmitting ? "جاري الحفظ..." : "حفظ كلمة المرور"}
        </button>
      </form>
    </div>
  );
}
