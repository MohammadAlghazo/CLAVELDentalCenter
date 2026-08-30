import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { PrismaClient } from "@prisma/client";

export const metadata: Metadata = {
  title: "مدونة طب الأسنان | مجمع كلافيل",
  description: "مقالات وموضوعات متخصصة في صحة الأسنان من فريق مجمع كلافيل لطب الأسنان في المدينة المنورة.",
  alternates: { canonical: "https://clavel.dental/blog" },
};

const prisma = new PrismaClient();

export const revalidate = 60; // Cache for 1 minute (allows dynamic searchParams to work well)

export default async function BlogPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Number(searchParams?.page) || 1;
  const limit = 9; // 9 articles per page
  const skip = (page - 1) * limit;

  const [blogPosts, totalCount] = await Promise.all([
    prisma.article.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.article.count({ where: { status: "published" } }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="font-cairo" dir="rtl">
      <section className="page-hero">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-cairo mb-4">مدونة <span className="text-[#C9A96E]">كلافيل</span></h1>
          <div className="w-14 h-1 bg-[#C9A96E] rounded-full mx-auto mb-4" />
          <p className="text-gray-200 font-cairo">مقالات وموضوعات متخصصة في صحة وجمال الأسنان</p>
        </div>
      </section>

      <section className="py-20 bg-[#F5F0E8] min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogPosts.length === 0 ? (
             <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
               <h3 className="text-xl font-bold text-gray-500 font-cairo">سيتم نشر مقالات قريباً</h3>
             </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {blogPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(27,67,50,0.06)] hover:shadow-[0_12px_40px_rgba(27,67,50,0.14)] transition-all duration-300 hover:-translate-y-2 flex flex-col">
                    {post.imageUrl && (
                      <div className="relative h-52 overflow-hidden bg-gray-100">
                        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-gray-400 text-xs font-cairo mb-3">
                        <Calendar size={12} />
                        <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("ar-SA") : ""}</span>
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-16">
                  {page > 1 && (
                    <Link href={`/blog?page=${page - 1}`} className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#1B4332] hover:bg-[#C9A96E] hover:text-white transition-colors border border-gray-200 shadow-sm" aria-label="الصفحة السابقة">
                      <ArrowRight size={18} />
                    </Link>
                  )}
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <Link 
                        key={i} 
                        href={`/blog?page=${i + 1}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                          page === i + 1 
                            ? "bg-[#1B4332] text-white shadow-[0_4px_15px_rgba(27,67,50,0.3)] scale-110" 
                            : "bg-white text-gray-600 hover:bg-[#C9A96E] hover:text-white border border-gray-200"
                        }`}
                      >
                        {i + 1}
                      </Link>
                    ))}
                  </div>

                  {page < totalPages && (
                    <Link href={`/blog?page=${page + 1}`} className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#1B4332] hover:bg-[#C9A96E] hover:text-white transition-colors border border-gray-200 shadow-sm" aria-label="الصفحة التالية">
                      <ArrowLeft size={18} />
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
