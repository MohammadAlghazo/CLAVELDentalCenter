import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex h-[70vh] w-full items-center justify-center bg-[#F5F0E8]/30 rounded-2xl">
      <div className="flex flex-col items-center gap-4 text-[#1B4332]">
        <Loader2 className="h-12 w-12 animate-spin text-[#C9A96E]" />
        <p className="font-bold text-lg animate-pulse">جاري تحميل البيانات بسرعة...</p>
      </div>
    </div>
  );
}
