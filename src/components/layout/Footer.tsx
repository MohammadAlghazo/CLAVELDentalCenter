import Link from "next/link";
import { Phone, MessageCircle, MapPin, Lock, Clock, CalendarDays } from "lucide-react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const quickLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/services", label: "خدماتنا" },
  { href: "/doctors", label: "أطباؤنا" },
  { href: "/faq", label: "الأسئلة الشائعة" },
  { href: "/blog", label: "المدونة" },
  { href: "/contact", label: "تواصل معنا" },
  { href: "/privacy", label: "سياسة الخصوصية" },
];

const serviceLinks = [
  { href: "/services/american-implant", label: "زراعة الأسنان الأمريكية" },
  { href: "/services/german-zircon", label: "تركيبات الزيركون الألماني" },
  { href: "/services/emax-veneer", label: "فينير إيماكس" },
  { href: "/services/teeth-whitening", label: "تبييض الأسنان" },
  { href: "/services/root-canal", label: "علاج جذور الأسنان" },
  { href: "/services/scaling-polishing", label: "تنظيف وتلميع الأسنان" },
];

export default async function Footer() {
  const settings = await prisma.setting.findMany({
    where: {
      key: {
        in: ["workingDays", "workingHoursGeneral"]
      }
    }
  });

  const workingDays = settings.find((s: any) => s.key === "workingDays")?.value || "طوال أيام الأسبوع";
  const workingHours = settings.find((s: any) => s.key === "workingHoursGeneral")?.value || "من 9 صباحاً إلى 12 ظهراً\nومن 1 ظهراً إلى 12 صباحاً";

  return (
    <footer className="bg-[#1B4332] text-white" dir="rtl">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 sm:gap-4 group">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="/images/logo.png" 
                  alt="شعار مجمع كلافيل لطب الأسنان" 
                  className="w-full h-full object-contain filter brightness-0 invert opacity-90"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-2xl sm:text-3xl text-white font-cairo">
                  كلافيل
                </span>
                <span className="text-sm sm:text-base font-bold text-[#C9A96E] font-cairo tracking-wide">
                  لطب الأسنان
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-300 font-cairo mb-6">
              مجمع كلافيل لطب الأسنان بالمدينة المنورة — رعاية متكاملة
              لصحة وجمال ابتسامتك بأعلى معايير الجودة.
            </p>
            
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/clavel.dental"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-[#C9A96E] rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a
                href="https://www.facebook.com/clavel.dental"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-[#C9A96E] rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://www.tiktok.com/@clavel.dental"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-[#C9A96E] rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="TikTok"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.96a8.24 8.24 0 004.83 1.55V7.04a4.85 4.85 0 01-1.06-.35z" />
                </svg>
              </a>
              <a
                href="https://www.snapchat.com/@clavel.dental"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-[#C9A96E] rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Snapchat"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.206 1c2.568 0 4.637 1.427 5.511 3.738.198.527.27 1.098.26 1.724l-.005.53c.03.143.125.193.274.167.44-.076.878-.195 1.29-.195.356 0 .717.057.995.231.228.14.348.332.348.543 0 .374-.38.703-.903.87-.098.032-.205.058-.315.087-.64.171-1.016.443-1.211.886a.46.46 0 00.01.408c.337.73 1.099 2.018 2.503 2.557.3.114.483.317.483.55 0 .424-.599.77-1.573.964-.11.022-.186.106-.215.233l-.064.288c-.089.382-.375.598-.804.598-.162 0-.354-.027-.577-.082a5.11 5.11 0 00-1.253-.155c-.457 0-.775.122-1.076.282-.477.254-1.01.64-1.988.64-1.076 0-1.63-.434-2.1-.671-.278-.14-.578-.25-.972-.25-.392 0-.759.09-1.084.224-.457.185-.783.337-1.189.337-.376 0-.63-.193-.718-.527l-.063-.289c-.03-.13-.108-.215-.22-.237C5.398 14.008 4.8 13.663 4.8 13.24c0-.233.182-.437.483-.55 1.41-.54 2.17-1.828 2.504-2.557a.46.46 0 00.01-.408c-.196-.443-.572-.715-1.211-.886-.11-.029-.218-.055-.315-.086C5.748 8.587 5.37 8.258 5.37 7.884c0-.211.12-.403.348-.543.279-.174.638-.231.994-.231.378 0 .804.1 1.227.182.133.026.232-.016.272-.154l-.003-.544c-.01-.626.062-1.197.26-1.724C9.343 2.427 11.412 1 12.206 1z" />
                </svg>
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=966510626630"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-[#25D366] rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-base font-cairo mb-5 text-[#C9A96E]">
              روابط سريعة
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-[#C9A96E] font-cairo transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-[#C9A96E] rounded-full flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base font-cairo mb-5 text-[#C9A96E]">
              خدماتنا
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-[#C9A96E] font-cairo transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-[#C9A96E] rounded-full flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base font-cairo mb-5 text-[#C9A96E]">
              تواصل معنا
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=966510626630"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#25D366] font-cairo transition-colors duration-200 group"
                >
                  <span className="w-8 h-8 bg-white/10 group-hover:bg-[#25D366]/20 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                    <MessageCircle size={15} />
                  </span>
                  <span dir="ltr">0510626630</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:0148610552"
                  className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#C9A96E] font-cairo transition-colors duration-200 group"
                >
                  <span className="w-8 h-8 bg-white/10 group-hover:bg-[#C9A96E]/20 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                    <Phone size={15} />
                  </span>
                  <span dir="ltr">0148610552</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-gray-300">
                  <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={15} />
                  </span>
                  <span className="font-cairo">
                    المدينة المنورة، المملكة العربية السعودية
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CalendarDays size={15} />
                  </span>
                  <span className="font-cairo leading-relaxed">
                    أيام العمل: {workingDays}
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-gray-300">
                  <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock size={15} />
                  </span>
                  <span className="font-cairo leading-relaxed whitespace-pre-line">
                    ساعات العمل:<br/>
                    {workingHours}
                  </span>
                </div>
              </li>
              <li className="pt-2">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 bg-[#C9A96E] text-white px-5 py-2.5 rounded-lg font-semibold font-cairo text-sm hover:bg-[#b8935e] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Phone size={15} />
                  احجز موعدك الآن
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-center gap-3">
          <p className="text-xs text-gray-400 font-cairo text-center">
            © 2025 مجمع كلافيل لطب الأسنان. جميع الحقوق محفوظة.
          </p>
          <Link href="/admin/login" className="text-gray-500 hover:text-gray-300 transition-colors" aria-label="تسجيل دخول الإدارة">
            <Lock size={13} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
