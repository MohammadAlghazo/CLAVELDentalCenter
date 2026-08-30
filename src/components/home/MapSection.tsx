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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <div className="bg-[#F5F0E8] rounded-2xl p-6 flex items-start gap-4">
              <div className="w-11 h-11 bg-[#1B4332] rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin size={20} className="text-[#C9A96E]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1B4332] font-cairo text-sm mb-1">
                  العنوان
                </h3>
                <p className="text-gray-600 font-cairo text-sm">
                  المدينة المنورة، المملكة العربية السعودية
                </p>
              </div>
            </div>

            <div className="bg-[#F5F0E8] rounded-2xl p-6 flex items-start gap-4">
              <div className="w-11 h-11 bg-[#1B4332] rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-[#C9A96E]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1B4332] font-cairo text-sm mb-1">
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

            <div className="bg-[#F5F0E8] rounded-2xl p-6 flex items-start gap-4">
              <div className="w-11 h-11 bg-[#25D366] rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#1B4332] font-cairo text-sm mb-1">
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

            <div className="bg-[#F5F0E8] rounded-2xl p-6 flex items-start gap-4">
              <div className="w-11 h-11 bg-[#1B4332] rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-[#C9A96E]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1B4332] font-cairo text-sm mb-1">
                  ساعات العمل
                </h3>
                <p className="text-gray-600 font-cairo text-sm">
                  يومياً — تواصل معنا للاستفسار
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 bg-[#1B4332] text-white py-3.5 rounded-xl font-bold font-cairo text-sm hover:bg-[#2D6A4F] transition-all duration-300 hover:shadow-lg"
            >
              <Phone size={16} />
              تواصل معنا
            </Link>
          </div>

          {/* Map */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(27,67,50,0.1)] h-80 lg:h-auto min-h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233611.98591799588!2d39.46664705!3d24.46863745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15bdbf50b2c5e1bd%3A0x5cdef59e8605e5bd!2z2KfZhNmF2K_ZitmG2Kkg2KfZhNmF2YbZiNix2Kk!5e0!3m2!1sar!2ssa!4v1700000000000!5m2!1sar!2ssa"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع مجمع كلافيل لطب الأسنان - المدينة المنورة"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
