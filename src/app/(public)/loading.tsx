import { Loader2 } from "lucide-react";

export default function PublicLoading() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-[#1B4332]">
        <Loader2 className="h-12 w-12 animate-spin text-[#C9A96E]" />
        <p className="font-bold text-lg animate-pulse font-cairo">جاري التحميل...</p>
      </div>
    </div>
  );
}
