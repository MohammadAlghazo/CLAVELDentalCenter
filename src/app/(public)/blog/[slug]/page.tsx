import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Share2, Phone } from "lucide-react";

interface Props { params: Promise<{ slug: string }> }

const blogPosts: Record<string, { title: string; content: string; imageUrl: string; publishedAt: string; summary: string }> = {
  "importance-of-dental-checkups": {
    title: "أهمية الفحص الدوري لأسنانك وكيف يحمي صحتك",
    summary: "يعتقد كثيرون أن زيارة طبيب الأسنان ضرورية فقط عند وجود الألم. الحقيقة مختلفة تماماً.",
    imageUrl: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200&q=80",
    publishedAt: "2025-01-15",
    content: `يُعدّ الفحص الدوري لطبيب الأسنان من أهم الممارسات الصحية التي يهملها كثير من الناس، ظناً منهم أن الزيارة ضرورية فقط عند الشعور بألم أو مشكلة واضحة.

**لماذا الفحص الدوري ضروري؟**

الواقع أن كثيراً من مشكلات الأسنان تبدأ بشكل خفي ولا يشعر بها المريض إلا حين تتطور إلى مرحلة متقدمة. الفحص الدوري يساعد الطبيب على اكتشاف التسوس المبكر، التهابات اللثة في بدايتها، وحتى علامات تدل على مشكلات صحية عامة.

**ماذا يحدث في الفحص الدوري؟**

يشمل الفحص الدوري عادةً فحص الأسنان واللثة والأنسجة المحيطة بها، وقد يشمل أشعة سينية لرؤية ما لا تراه العين المجردة. كما يتضمن تنظيفاً احترافياً لإزالة الجير والترسبات.

**كم مرة يجب زيارة طبيب الأسنان؟**

يوصي معظم الأطباء بزيارة مرتين في السنة (كل 6 أشهر) للمرضى الذين تكون صحة أسنانهم جيدة. أما من يعانون من مشكلات متكررة، فقد يحتاجون لزيارات أكثر.

**الفائدة الاقتصادية**

الكشف المبكر يعني علاجاً أبسط وأقل تكلفة. حشوة بسيطة أفضل بكثير من علاج عصب أو خلع وزراعة لاحقة.`,
  },
  "zircon-vs-porcelain": {
    title: "الفرق بين الزيركون والبورسلين: أيهما الأنسب لك؟",
    summary: "مقارنة شاملة بين خياري طب الأسنان التجميلي الأكثر شيوعاً.",
    imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&q=80",
    publishedAt: "2025-01-22",
    content: `عند الحديث عن تيجان وجسور الأسنان، يأتي الزيركون والبورسلين كأبرز الخيارين المتاحين. كل منهما له مميزاته وعيوبه، والاختيار بينهما يعتمد على حالتك وتوقعاتك.

**الزيركون**

الزيركون (أو أكسيد الزيركونيوم) هو مادة خزفية عالية الجودة تتميز بصلابة استثنائية وشفافية تجعلها تُحاكي مظهر الأسنان الطبيعية. من أبرز مميزاته: لا يسبب تحسساً، لا يحتاج لقاعدة معدنية، متين جداً، وله مظهر طبيعي جميل.

**البورسلين المدعوم بالمعدن**

كان البورسلين على قاعدة معدنية الخيار الأكثر شيوعاً لعقود. هو أقل تكلفة من الزيركون، لكن قد يظهر خط داكن عند خط اللثة مع مرور الوقت، وقد يسبب تحسساً لدى بعض المرضى.

**متى تختار الزيركون؟**

إذا كنت تبحث عن الأفضل جمالياً ومن حيث الجودة والمتانة، فالزيركون هو الخيار الأمثل. مناسب بشكل خاص للأسنان الأمامية الظاهرة.

**توصية الطبيب**

القرار النهائي يعتمد على تقييم طبيبك لحالتك، وصحة عظام الأسنان، وميزانيتك. في مجمع كلافيل، يرشدك طبيبنا للخيار المناسب لك بعد الفحص الدقيق.`,
  },
  "dental-implants-guide": {
    title: "كل ما تريد معرفته عن زراعة الأسنان قبل القرار",
    summary: "دليل شامل لزراعة الأسنان: المراحل، المدة، الألم، والتعافي.",
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffbb172ef7b?w=1200&q=80",
    publishedAt: "2025-02-05",
    content: `زراعة الأسنان هي الحل الأمثل لاستعادة الأسنان المفقودة بشكل دائم وطبيعي. قبل اتخاذ قرارك، إليك كل ما تحتاج معرفته.

**ما هي زراعة الأسنان؟**

زراعة الأسنان هي عملية يُثبَّت فيها برغي تيتانيوم صغير في عظام الفك ليحل محل جذر السن المفقودة، ثم يُركَّب عليه تاج يشبه السن الطبيعية.

**المراحل الأساسية**

1. تقييم الحالة والأشعة التشخيصية
2. زرع التيتانيوم في الفك
3. فترة التكامل (3-6 أشهر)
4. تركيب التاج النهائي

**هل يؤلم؟**

العملية تتم تحت تأثير التخدير الموضعي ولا يشعر المريض بألم أثناءها. بعد العملية قد يكون هناك ألم خفيف وتورم لأيام قليلة يمكن التحكم فيه بمسكنات الألم.

**من يناسبه الزرع؟**

يناسب معظم البالغين الأصحاء الذين فقدوا سناً أو أكثر. يشترط وجود عظام فك كافية وصحة عامة جيدة.

**كم تدوم الزراعة؟**

مع العناية الجيدة، يمكن أن تدوم زراعة الأسنان مدى الحياة.`,
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) return { title: "مقال | كلافيل" };
  return {
    title: `${post.title} | مجمع كلافيل`,
    description: post.summary,
    alternates: { canonical: `https://clavel.dental/blog/${slug}` },
    openGraph: { title: post.title, description: post.summary, images: [post.imageUrl], type: "article" },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts[slug] || {
    title: "مقال طب الأسنان",
    summary: "مقال من مجمع كلافيل لطب الأسنان",
    imageUrl: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200&q=80",
    publishedAt: "2025-01-01",
    content: "المحتوى قيد الإعداد...",
  };

  const formattedContent = post.content.split("\n\n").map((para, i) => {
    if (para.startsWith("**")) {
      return <h3 key={i} className="text-lg font-bold text-[#1B4332] font-cairo mt-6 mb-2">{para.replace(/\*\*/g, "")}</h3>;
    }
    if (para.match(/^\d\./)) {
      const items = para.split("\n");
      return <ol key={i} className="list-decimal list-inside space-y-1 my-3">{items.map((item, j) => <li key={j} className="text-gray-600 font-cairo text-sm">{item.replace(/^\d\. /, "")}</li>)}</ol>;
    }
    return <p key={i} className="text-gray-600 font-cairo leading-relaxed mb-4 text-sm sm:text-base">{para}</p>;
  });

  return (
    <div className="font-cairo" dir="rtl">
      <section className="page-hero">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-10">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-cairo mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center justify-center gap-3 text-white/60 text-sm font-cairo">
            <Calendar size={14} />
            <span>{new Date(post.publishedAt).toLocaleDateString("ar-SA")}</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <img src={post.imageUrl} alt={post.title} className="w-full h-64 sm:h-80 object-cover rounded-2xl mb-10 shadow-lg" />
          <article className="prose max-w-none">{formattedContent}</article>

          {/* Share */}
          <div className="mt-10 pt-8 border-t border-gray-100">
            <p className="font-bold text-[#1B4332] font-cairo text-sm mb-4">شارك المقال</p>
            <div className="flex gap-3">
              <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " - https://clavel.dental/blog/" + slug)}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg text-xs font-cairo font-semibold hover:bg-[#1eb856] transition-colors">
                <Share2 size={14} /> واتساب
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=https://clavel.dental/blog/${slug}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#1877F2] text-white px-4 py-2 rounded-lg text-xs font-cairo font-semibold hover:bg-blue-700 transition-colors">
                <Share2 size={14} /> فيسبوك
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 bg-[#1B4332] rounded-2xl p-7 text-white text-center">
            <h3 className="text-xl font-bold font-cairo mb-2">هل تحتاج استشارة؟</h3>
            <p className="text-gray-300 font-cairo text-sm mb-5">احجز موعدك الآن في مجمع كلافيل لطب الأسنان</p>
            <Link href="/book" className="inline-flex items-center gap-2 bg-[#C9A96E] text-white px-7 py-3 rounded-xl font-bold font-cairo text-sm hover:bg-[#b8935e] transition-all duration-300">
              <Phone size={16} /> احجز موعدك الآن
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
