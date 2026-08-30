import Link from "next/link";
import { Home, Phone, MessageCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="font-cairo min-h-screen bg-[#F5F0E8] flex items-center justify-center px-4" dir="rtl">
      <div className="text-center max-w-lg">
        {/* Big 404 */}
        <div className="text-9xl font-extrabold text-[#1B4332] opacity-10 leading-none mb-6 select-none">
          404
        </div>
        <div className="w-20 h-20 bg-[#1B4332] rounded-full flex items-center justify-center mx-auto mb-6 -mt-12">
          <span className="text-[#C9A96E] font-extrabold text-2xl font-cairo">C</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#1B4332] font-cairo mb-3">
          الصفحة غير موجودة
        </h1>
        <p className="text-gray-500 font-cairo text-base leading-relaxed mb-8">
          يبدو أن الصفحة التي تبحث عنها لا تتوفر. قد تكون قد نُقلت أو حُذفت.
          لا تقلق، يمكنك الانطلاق من الصفحة الرئيسية.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 bg-[#1B4332] text-white px-6 py-3 rounded-xl font-bold font-cairo text-sm hover:bg-[#2D6A4F] transition-all duration-300 hover:shadow-lg"
          >
            <Home size={17} />
            الصفحة الرئيسية
          </Link>
          <a
            href="https://api.whatsapp.com/send?phone=966510626630"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold font-cairo text-sm hover:bg-[#1eb856] transition-all duration-300"
          >
            <MessageCircle size={17} />
            تواصل معنا
          </a>
          <a
            href="tel:0148610552"
            className="flex items-center gap-2 border-2 border-[#1B4332] text-[#1B4332] px-6 py-3 rounded-xl font-bold font-cairo text-sm hover:bg-[#1B4332] hover:text-white transition-all duration-300"
          >
            <Phone size={17} />
            اتصل بنا
          </a>
        </div>
      </div>
    </div>
  );
}
