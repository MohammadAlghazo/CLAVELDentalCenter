import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | مجمع كلافيل لطب الأسنان",
  description: "سياسة الخصوصية لمجمع كلافيل لطب الأسنان — كيف نجمع بياناتك ونحميها.",
  alternates: { canonical: "https://clavel.dental/privacy" },
};

const sections = [
  { title: "المعلومات التي نجمعها", content: "نجمع المعلومات التي تقدمها طوعاً عند حجز موعد أو التواصل معنا، وتشمل: الاسم، رقم الجوال، وتفاصيل الاستفسار. قد نجمع أيضاً بيانات تقنية مجهولة الهوية مثل نوع المتصفح وعنوان IP لأغراض تحسين الموقع." },
  { title: "كيف نستخدم بياناتك", content: "تُستخدم بياناتك حصرياً لأغراض: تأكيد المواعيد والتواصل بشأنها، الرد على استفساراتك، تحسين خدماتنا وتجربة الموقع. لا نبيع بياناتك أو نشاركها مع أطراف ثالثة للأغراض التجارية." },
  { title: "حماية بياناتك", content: "نلتزم باتخاذ إجراءات أمنية مناسبة لحماية بياناتك الشخصية من الوصول غير المصرح به أو الإفصاح غير المشروع. يتم تخزين البيانات على خوادم آمنة ومشفرة." },
  { title: "مدة الاحتفاظ بالبيانات", content: "نحتفظ ببياناتك للمدة اللازمة لتقديم الخدمة وأغراض التتبع الطبي القانوني وفق المعايير الصحية السعودية، أو حتى تطلب أنت حذفها." },
  { title: "حقوقك", content: "يحق لك طلب الاطلاع على بياناتك الشخصية المحفوظة لدينا، تصحيح أي معلومات غير دقيقة، أو طلب حذف بياناتك. يمكنك التواصل معنا عبر واتساب أو الهاتف لممارسة هذه الحقوق." },
  { title: "ملفات تعريف الارتباط (Cookies)", content: "يستخدم الموقع ملفات تعريف ارتباط بسيطة لتحسين تجربة التصفح. يمكنك تعطيلها من إعدادات متصفحك، لكن ذلك قد يؤثر على بعض وظائف الموقع." },
  { title: "التعديلات على هذه السياسة", content: "قد نُحدِّث هذه السياسة من وقت لآخر. سيُشار إلى تاريخ آخر تحديث في أسفل هذه الصفحة. ننصحك بمراجعة السياسة بصفة دورية." },
  { title: "التواصل معنا", content: "لأي استفسارات بخصوص سياسة الخصوصية أو بياناتك الشخصية، يمكنك التواصل معنا عبر: واتساب 0510626630 أو هاتف 0148610552." },
];

export default function PrivacyPage() {
  return (
    <div className="font-cairo" dir="rtl">
      <section className="page-hero">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-10">
          <h1 className="text-4xl font-extrabold text-white font-cairo mb-4">سياسة <span className="text-[#C9A96E]">الخصوصية</span></h1>
          <div className="w-14 h-1 bg-[#C9A96E] rounded-full mx-auto" />
        </div>
      </section>

      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-10">
            <p className="text-gray-600 font-cairo text-sm leading-relaxed mb-8 pb-6 border-b border-gray-100">
              آخر تحديث: يناير 2025 | مجمع كلافيل لطب الأسنان، المدينة المنورة، المملكة العربية السعودية.
              نلتزم بحماية خصوصيتك ونتعامل مع بياناتك بالمسؤولية الكاملة.
            </p>
            <div className="space-y-8">
              {sections.map((section, i) => (
                <div key={i}>
                  <h2 className="text-lg font-bold text-[#1B4332] font-cairo mb-3 flex items-center gap-2">
                    <span className="w-7 h-7 bg-[#C9A96E] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                    {section.title}
                  </h2>
                  <p className="text-gray-600 font-cairo text-sm leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
