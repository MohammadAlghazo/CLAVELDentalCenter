"use client";
import { useState } from "react";
import { markAsContacted } from "./actions";
import { Check, Loader2 } from "lucide-react";

export default function StatusButton({ bookingId, status }: { bookingId: number; status: string }) {
  const [loading, setLoading] = useState(false);

  if (status === "confirmed") {
    return (
      <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700">
        تم التواصل
      </span>
    );
  }

  if (status === "cancelled") {
    return (
      <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700">
        ملغي
      </span>
    );
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-700">
        قيد الانتظار
      </span>
      <button
        onClick={async () => {
          setLoading(true);
          await markAsContacted(bookingId);
          setLoading(false);
        }}
        disabled={loading}
        className="text-xs bg-[#1B4332] text-white px-3 py-1 rounded-full hover:bg-[#2D6A4F] transition-colors flex items-center gap-1 disabled:opacity-50"
        title="تحديد كـ (تم التواصل)"
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
        تواصلنا معه
      </button>
    </div>
  );
}
