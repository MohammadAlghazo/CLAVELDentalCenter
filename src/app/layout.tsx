import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "مجمع كلافيل لطب الأسنان - المدينة المنورة",
    template: "%s | مجمع كلافيل لطب الأسنان",
  },
  description:
    "مجمع كلافيل لطب الأسنان بالمدينة المنورة — خدمات طب الأسنان العلاجية والتجميلية بأعلى معايير الجودة. زراعة الأسنان، الزيركون، الفينير، تبييض الأسنان، وأكثر.",
  keywords: [
    "مجمع أسنان في المدينة المنورة",
    "طبيب أسنان في المدينة المنورة",
    "زراعة الأسنان في المدينة المنورة",
    "تبييض الأسنان في المدينة المنورة",
    "تركيبات الأسنان والزيركون في المدينة المنورة",
    "كلافيل لطب الأسنان",
    "CLAVEL Dental Center",
  ],
  openGraph: {
    title: "مجمع كلافيل لطب الأسنان - المدينة المنورة",
    description:
      "رعاية متكاملة لصحة وجمال ابتسامتك في المدينة المنورة. نخبة من الأطباء وتقنيات عالمية.",
    url: "https://clavel.dental",
    siteName: "مجمع كلافيل لطب الأسنان",
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "مجمع كلافيل لطب الأسنان",
    description: "رعاية متكاملة لصحة وجمال ابتسامتك في المدينة المنورة",
  },
  alternates: {
    canonical: "https://clavel.dental",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Dentist", "MedicalOrganization"],
              name: "مجمع كلافيل لطب الأسنان",
              alternateName: "CLAVEL Dental Center",
              url: "https://clavel.dental",
              telephone: "+966148610552",
              address: {
                "@type": "PostalAddress",
                addressLocality: "المدينة المنورة",
                addressCountry: "SA",
              },
              sameAs: [
                "https://www.instagram.com/clavel.dental",
                "https://www.facebook.com/clavel.dental",
                "https://www.tiktok.com/@clavel.dental",
              ],
              medicalSpecialty: "Dentistry",
            }),
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
