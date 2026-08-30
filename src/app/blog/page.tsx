import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "مدونة طب الأسنان | مجمع كلافيل",
  description: "مقالات وموضوعات متخصصة في صحة الأسنان من فريق مجمع كلافيل لطب الأسنان في المدينة المنورة.",
  alternates: { canonical: "https://clavel.dental/blog" },
};

const blogPosts = [
  { id: 1, title: "أهمية الفحص الدوري لأسنانك وكيف يحمي صحتك", slug: "importance-of-dental-checkups", summary: "يعتقد كثيرون أن زيارة طبيب الأسنان ضرورية فقط عند وجود الألم، لكن الحقيقة عكس ذلك. الكشف المبكر يوفر عليك الكثير ويحميك من علاجات معقدة.", imageUrl: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&q=80", publishedAt: "2025-01-15" },
  { id: 2, title: "الفرق بين الزيركون والبورسلين: أيهما الأنسب لك؟", slug: "zircon-vs-porcelain", summary: "مع تطور تقنيات طب الأسنان التجميلي، أصبح لديك خيارات عديدة. نستعرض الفروق الجوهرية لمساعدتك في اختيار ما يناسب حالتك.", imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80", publishedAt: "2025-01-22" },
  { id: 3, title: "كل ما تريد معرفته عن زراعة الأسنان قبل القرار", slug: "dental-implants-guide", summary: "زراعة الأسنان أصبحت من أكثر إجراءات طب الأسنان شيوعاً وأماناً. نجيب في هذا المقال على كل أسئلتك.", imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffbb172ef7b?w=600&q=80", publishedAt: "2025-02-05" },
  { id: 4, title: "تبييض الأسنان: الحقائق والأساطير التي يجب أن تعرفها", slug: "teeth-whitening-facts", summary: "هناك معلومات كثيرة متداولة عن تبييض الأسنان، بعضها صحيح وبعضها مبالغ فيه. نكشف الحقائق العلمية.", imageUrl: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80", publishedAt: "2025-02-18" },
  { id: 5, title: "الفينير: كيف يغيّر شكل ابتسامتك في جلسات معدودة", slug: "veneer-smile-transformation", summary: "الفينير هو الحل السحري لكثيرين يرغبون في تحسين مظهر ابتسامتهم. نشرح كيف يعمل وما الذي يمكن توقعه.", imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80", publishedAt: "2025-03-01" },
  { id: 6, title: "نصائح ذهبية للحفاظ على صحة أسنانك بعد العلاج", slug: "post-treatment-dental-care", summary: "الحفاظ على نتائج العلاج يتطلب عادات يومية صحيحة. إليك أهم النصائح من أطباء مجمع كلافيل.", imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80", publishedAt: "2025-03-15" },
];

export default function BlogPage() {
  return (
    <div className="font-cairo" dir="rtl">
      <section className="page-hero">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-cairo mb-4">مدونة <span className="text-[#C9A96E]">كلافيل</span></h1>
          <div className="w-14 h-1 bg-[#C9A96E] rounded-full mx-auto mb-4" />
          <p className="text-gray-200 font-cairo">مقالات وموضوعات متخصصة في صحة وجمال الأسنان</p>
        </div>
      </section>

      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(27,67,50,0.06)] hover:shadow-[0_12px_40px_rgba(27,67,50,0.14)] transition-all duration-300 hover:-translate-y-2 flex flex-col">
                <div className="relative h-52 overflow-hidden">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-cairo mb-3">
                    <Calendar size={12} />
                    <span>{new Date(post.publishedAt).toLocaleDateString("ar-SA")}</span>
                  </div>
                  <h2 className="font-bold text-[#1B4332] font-cairo text-base leading-snug mb-2 group-hover:text-[#C9A96E] transition-colors flex-1">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 font-cairo text-sm leading-relaxed line-clamp-2 mb-4">{post.summary}</p>
                  <div className="flex items-center gap-1 text-[#C9A96E] text-sm font-semibold font-cairo">
                    <span>اقرأ المزيد</span>
                    <ArrowLeft size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
