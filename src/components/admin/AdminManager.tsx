"use client";
import { useState } from "react";
import { Users, UserPlus, Trash2, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

type AdminUser = {
  id: number;
  username: string;
  createdAt: Date;
};

export default function AdminManager({ admins, currentUsername }: { admins: AdminUser[], currentUsername: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "حدث خطأ ما");
      }

      setSuccess("تم إضافة المشرف بنجاح");
      (e.target as HTMLFormElement).reset();
      router.refresh(); // Refresh to update list
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا المشرف؟ لا يمكن التراجع عن هذا الإجراء.")) return;

    try {
      const res = await fetch(`/api/admins/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "حدث خطأ أثناء الحذف");
      }

      router.refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Users size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1B4332] font-cairo">إدارة مدراء النظام</h2>
            <p className="text-sm text-gray-500 font-cairo mt-1">إضافة وحذف حسابات الإدارة</p>
          </div>
        </div>

        <form onSubmit={handleAddAdmin} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-md font-bold text-gray-800 mb-4 flex items-center gap-2">
            <UserPlus size={18} />
            إضافة مشرف جديد
          </h3>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-semibold">{error}</div>}
          {success && <div className="mb-4 p-3 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-semibold">{success}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">اسم المستخدم</label>
              <input
                type="text"
                name="username"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] transition-all text-left"
                dir="ltr"
                placeholder="admin2"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">كلمة المرور</label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] transition-all text-left"
                dir="ltr"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full sm:w-auto bg-[#1B4332] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#2D6A4F] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "جاري الإضافة..." : "إضافة مشرف"}
          </button>
        </form>
      </div>

      <div className="p-0">
        <table className="w-full text-right font-cairo">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-gray-700">المشرف</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-700 hidden sm:table-cell">تاريخ الإضافة</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-700">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {admins.map((admin) => {
              const isCurrentUser = admin.username === currentUsername;
              
              return (
                <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center font-bold text-sm">
                        {admin.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="font-bold text-gray-800">
                        {admin.username}
                        {isCurrentUser && (
                          <span className="mr-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            أنت
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                    {new Date(admin.createdAt).toLocaleDateString("ar-EG")}
                  </td>
                  <td className="px-6 py-4">
                    {isCurrentUser ? (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <ShieldAlert size={14} />
                        لا يمكن حذف حسابك
                      </span>
                    ) : (
                      <button
                        onClick={() => handleDelete(admin.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center gap-1 text-sm font-bold"
                      >
                        <Trash2 size={16} />
                        حذف
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
