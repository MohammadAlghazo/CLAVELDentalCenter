const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
    console.log("Fixing image URLs...");
    const urls = [
        "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1598256989800-fea5ce5146f1?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
    ];
    
    const articles = await prisma.article.findMany();
    let updated = 0;
    for (let i = 0; i < articles.length; i++) {
        await prisma.article.update({
            where: { id: articles[i].id },
            data: { imageUrl: urls[i % urls.length] }
        });
        updated++;
    }
    console.log(`Updated ${updated} articles with valid image URLs.`);
}

fix()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
