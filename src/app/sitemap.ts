import { MetadataRoute } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://clavel.dental";
  const now = new Date();

  const doctors = await prisma.doctor.findMany({
    where: { isActive: true },
    select: { slug: true, updatedAt: true },
  });

  const articles = await prisma.article.findMany({
    where: { status: "published" },
    select: { slug: true, updatedAt: true },
  });

  const servicesSlugs = [
    "american-implant", "german-implant", "italian-implant",
    "german-zircon", "emax-veneer", "composite-filling",
    "snap-on-smile", "teeth-cleaning", "scaling-polishing",
    "root-canal", "direct-veneer", "teeth-whitening",
  ];

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/doctors`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/book`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const servicePages = servicesSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const doctorPages = doctors.map((doctor) => ({
    url: `${baseUrl}/doctors/${doctor.slug}`,
    lastModified: doctor.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...doctorPages, ...articlePages];
}
