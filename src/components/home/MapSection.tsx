import { MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import Link from "next/link";

export default function MapSection() {
  return (
    <section className="py-20 bg-white" id="location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F5F0E8] text-[#1B4332] px-4 py-1.5 rounded-full text-sm font-semibold font-cairo mb-4">
            موقعنا
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B4332] font-cairo mb-3">
            زيارتنا في <span className="text-[#C9A96E]">المدينة المنورة</span>
          </h2>
          <div className="w-14 h-1 bg-[#C9A96E] rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-[#F5F0E8] rounded-2xl p-6 flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 bg-[#1B4332] rounded-xl flex items-center justify-center">
              <MapPin size={24} className="text-[#C9A96E]" />
            </div>
            <div>
              <h3 className="font-bold text-[#1B4332] font-cairo text-base mb-1">
                العنوان
              </h3>
              <p className="text-gray-600 font-cairo text-sm">
                المدينة المنورة، المملكة العربية السعودية
              </p>
            </div>
          </div>

          <div className="bg-[#F5F0E8] rounded-2xl p-6 flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 bg-[#1B4332] rounded-xl flex items-center justify-center">
              <Phone size={24} className="text-[#C9A96E]" />
            </div>
            <div>
              <h3 className="font-bold text-[#1B4332] font-cairo text-base mb-1">
                الهاتف
              </h3>
              <a
                href="tel:0148610552"
                className="text-gray-600 font-cairo text-sm hover:text-[#1B4332] transition-colors"
                dir="ltr"
              >
                0148610552
              </a>
            </div>
          </div>

          <div className="bg-[#F5F0E8] rounded-2xl p-6 flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 bg-[#25D366] rounded-xl flex items-center justify-center">
              <MessageCircle size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-[#1B4332] font-cairo text-base mb-1">
                واتساب
              </h3>
              <a
                href="https://api.whatsapp.com/send?phone=966510626630"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 font-cairo text-sm hover:text-[#25D366] transition-colors"
                dir="ltr"
              >
                0510626630
              </a>
            </div>
          </div>

          <div className="bg-[#F5F0E8] rounded-2xl p-6 flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 bg-[#1B4332] rounded-xl flex items-center justify-center">
              <Clock size={24} className="text-[#C9A96E]" />
            </div>
            <div>
              <h3 className="font-bold text-[#1B4332] font-cairo text-base mb-1">
                ساعات العمل
              </h3>
              <p className="text-gray-600 font-cairo text-sm">
                يومياً — تواصل معنا للاستفسار
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 bg-[#1B4332] text-white px-8 py-3.5 rounded-xl font-bold font-cairo text-sm hover:bg-[#2D6A4F] transition-all duration-300 hover:shadow-lg"
          >
            <Phone size={16} />
            تواصل معنا الآن
          </Link>
        </div>
      </div>
    </section>
  );
}
