import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) return {};

  return {
    title: `${article.title} | مدونة كلافيل`,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article || article.status !== "published") {
    notFound();
  }

  return (
    <div className="font-cairo" dir="rtl">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[40vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#1B4332]/90 z-10" />
          {article.imageUrl ? (
            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#1B4332]" />
          )}
        </div>
        
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#C9A96E] hover:text-white transition-colors mb-6 font-bold text-sm">
            <ArrowRight size={16} />
            العودة للمدونة
          </Link>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            {article.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-gray-300 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#C9A96E]" />
              {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("ar-SA") : ""}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-[#C9A96E]" />
              إدارة كلافيل
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-[#F5F0E8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12">
            <div className="text-xl text-gray-600 font-bold mb-8 leading-relaxed border-r-4 border-[#C9A96E] pr-4 bg-gray-50 p-4 rounded-l-xl">
              {article.summary}
            </div>
            
            <div 
              className="prose prose-lg max-w-none prose-headings:text-[#1B4332] prose-headings:font-bold prose-a:text-[#C9A96E] prose-img:rounded-2xl"
              dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
