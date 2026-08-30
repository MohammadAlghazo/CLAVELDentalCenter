"use client";
import { useState } from "react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Trash2, CheckCircle, Mail, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ContactMessage } from "@prisma/client";

export default function MessagesClient({ initialMessages }: { initialMessages: ContactMessage[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [isLoading, setIsLoading] = useState<number | null>(null);

  const filteredMessages = initialMessages.filter((msg) => {
    if (filter === "unread") return !msg.isRead;
    if (filter === "read") return msg.isRead;
    return true;
  });

  const toggleStatus = async (id: number, currentStatus: boolean) => {
    setIsLoading(id);
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !currentStatus }),
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(null);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه الرسالة؟")) return;
    
    setIsLoading(id);
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
            filter === "all" ? "bg-[#1B4332] text-white" : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          الكل ({initialMessages.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
            filter === "unread" ? "bg-[#1B4332] text-white" : "bg-white text-blue-600 hover:bg-blue-50"
          }`}
        >
          رسائل جديدة ({initialMessages.filter(m => !m.isRead).length})
        </button>
        <button
          onClick={() => setFilter("read")}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
            filter === "read" ? "bg-[#1B4332] text-white" : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          تم الرد ({initialMessages.filter(m => m.isRead).length})
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredMessages.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-500 border border-gray-100">
            لا توجد رسائل حالياً تطابق الفلتر المحدد
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div 
              key={msg.id} 
              className={`bg-white rounded-2xl p-6 border ${
                msg.isRead ? "border-gray-100 opacity-80" : "border-blue-100 shadow-sm"
              } transition-all`}
            >
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className={`w-2 h-2 rounded-full ${msg.isRead ? "bg-gray-300" : "bg-blue-500"}`} />
                    <h3 className="font-bold text-lg text-gray-900">{msg.name}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mr-5">
                    <a href={`tel:${msg.phone}`} className="hover:text-[#1B4332] transition-colors font-bold" dir="ltr">
                      {msg.phone}
                    </a>
                    <span>•</span>
                    <span>
                      {format(new Date(msg.createdAt), "dd MMM yyyy - hh:mm a", { locale: ar })}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleStatus(msg.id, msg.isRead)}
                    disabled={isLoading === msg.id}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      msg.isRead 
                        ? "bg-gray-100 text-gray-600 hover:bg-gray-200" 
                        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    {msg.isRead ? <CheckCircle size={16} /> : <Mail size={16} />}
                    {msg.isRead ? "تم الرد والإغلاق" : "تعليم كمقروءة"}
                  </button>
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    disabled={isLoading === msg.id}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    title="حذف الرسالة"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-700 leading-relaxed whitespace-pre-wrap flex gap-3 mr-5">
                <MessageSquare size={20} className="text-gray-400 shrink-0 mt-1" />
                <p>{msg.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
