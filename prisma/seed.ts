import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { doctors, faqData } from '../src/data/siteData'

const prisma = new PrismaClient()

async function main() {
  // 1. Seed Admin
  const passwordHash = await bcrypt.hash('admin123', 10)
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash,
    },
  })
  console.log('Admin seeded:', admin.username)

  // 2. Seed Doctors
  for (const doc of doctors) {
    const existingDoctor = await prisma.doctor.findUnique({
      where: { slug: doc.slug },
    })

    if (!existingDoctor) {
      await prisma.doctor.create({
        data: {
          nameAr: doc.nameAr,
          nameEn: doc.nameEn,
          titleAr: doc.titleAr,
          titleEn: doc.titleEn,
          slug: doc.slug,
          image: doc.image,
          shortBio: doc.shortBio,
          qualifications: JSON.stringify(doc.qualifications),
          specialties: JSON.stringify(doc.specialties),
        },
      })
      console.log('Doctor seeded:', doc.nameAr)
    }
  }

  // 3. Seed FAQs
  const existingFaqs = await prisma.faq.count()
  if (existingFaqs === 0) {
    for (const faq of faqData) {
      await prisma.faq.create({
        data: {
          question: faq.question,
          answer: faq.answer,
          order: faq.id,
        },
      })
      console.log('FAQ seeded:', faq.question)
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
