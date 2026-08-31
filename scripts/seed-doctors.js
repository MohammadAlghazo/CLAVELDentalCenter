const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Clear existing doctors
  await prisma.doctor.deleteMany();

  // Create new doctors
  await prisma.doctor.createMany({
    data: [
        {
          nameAr: "د. وليد",
          nameEn: "Dr. Waleed",
          titleAr: "طبيب أسنان",
          titleEn: "Dentist",
          slug: "dr-waleed",
          image: "/images/doctors/waleed.jpg",
          shortBio: "خبرة واسعة في علاجات الأسنان وتجميلها.",
          qualifications: JSON.stringify(["بكالوريوس طب وجراحة الفم والأسنان"]),
          specialties: JSON.stringify(["طب الأسنان العام", "تجميل الأسنان"]),
          isActive: true
        },
        {
          nameAr: "د. منتصر",
          nameEn: "Dr. Montaser",
          titleAr: "استشاري طب الأسنان",
          titleEn: "Dental Consultant",
          slug: "dr-montaser",
          image: "/images/doctors/montaser.jpg",
          shortBio: "متخصص في الحالات المعقدة وزراعة الأسنان بخبرة تزيد عن 20 عاماً.",
          qualifications: JSON.stringify(["البورد في زراعة الأسنان", "بكالوريوس طب وجراحة الفم والأسنان"]),
          specialties: JSON.stringify(["زراعة الأسنان", "جراحة الفم"]),
          isActive: true
        },
        {
          nameAr: "د. عمار",
          nameEn: "Dr. Ammar",
          titleAr: "أخصائي تقويم الأسنان",
          titleEn: "Orthodontist",
          slug: "dr-ammar",
          image: "/images/doctors/ammar.jpg",
          shortBio: "متخصص في تقويم الأسنان للأطفال والبالغين باستخدام أحدث التقنيات.",
          qualifications: JSON.stringify(["ماجستير في تقويم الأسنان", "بكالوريوس طب الأسنان"]),
          specialties: JSON.stringify(["تقويم الأسنان الشفاف", "التقويم المعدني"]),
          isActive: true
        },
        {
          nameAr: "د. دعاء",
          nameEn: "Dr. Doaa",
          titleAr: "أخصائية تجميل الأسنان",
          titleEn: "Cosmetic Dentist",
          slug: "dr-doaa",
          image: "/images/doctors/doaa.jpg",
          shortBio: "شغف كبير في تجميل الأسنان وتصميم الابتسامة (ابتسامة هوليود).",
          qualifications: JSON.stringify(["دبلوم في تجميل الأسنان", "بكالوريوس طب الأسنان"]),
          specialties: JSON.stringify(["تصميم الابتسامة", "الفينير واللومينير"]),
          isActive: true
        }
    ],
  });

  console.log("Doctors seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
