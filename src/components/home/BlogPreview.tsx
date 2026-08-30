import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function BlogPreview() {
  const articles = await prisma.article.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-[#F5F0E8]" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white text-[#1B4332] px-4 py-1.5 rounded-full text-sm font-semibold font-cairo mb-4 shadow-sm">
            مدونتنا
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B4332] font-cairo mb-3">
            آخر <span className="text-[#C9A96E]">مقالاتنا</span>
          </h2>
          <div className="w-14 h-1 bg-[#C9A96E] rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(27,67,50,0.06)] hover:shadow-[0_12px_40px_rgba(27,67,50,0.14)] transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-gray-400 font-cairo text-sm">لا توجد صورة</span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-cairo mb-3">
                  <Calendar size={13} />
                  <span>
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("ar-SA")
                      : new Date(post.createdAt).toLocaleDateString("ar-SA")}
                  </span>
                </div>
                <h3 className="font-bold text-[#1B4332] font-cairo text-base leading-snug mb-2 group-hover:text-[#C9A96E] transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="text-gray-500 font-cairo text-sm leading-relaxed line-clamp-2">
                  {post.summary}
                </p>
                <div className="mt-4 flex items-center gap-1 text-[#C9A96E] text-sm font-semibold font-cairo">
                  <span>اقرأ المزيد</span>
                  <ArrowLeft size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#1B4332] text-white px-8 py-3.5 rounded-xl font-bold font-cairo hover:bg-[#2D6A4F] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            زيارة المدونة
            <ArrowLeft size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
