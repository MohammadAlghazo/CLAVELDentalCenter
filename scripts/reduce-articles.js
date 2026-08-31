const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
    console.log("Reducing to 4 unique articles...");
    
    // Get all articles
    const articles = await prisma.article.findMany({
        orderBy: { publishedAt: 'desc' }
    });
    
    // We only keep the top 4
    const toKeep = articles.slice(0, 4);
    const toDelete = articles.slice(4);
    
    // Delete the rest
    for (const a of toDelete) {
        await prisma.article.delete({ where: { id: a.id } });
    }
    
    // Unique images
    const uniqueImages = [
        "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
        "/images/blog/1.jpg",
        "/images/blog/2.jpg",
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
    ];
    
    // Update the 4 kept articles
    for (let i = 0; i < toKeep.length; i++) {
        await prisma.article.update({
            where: { id: toKeep[i].id },
            data: { imageUrl: uniqueImages[i] }
        });
    }
    
    console.log(`Successfully reduced to 4 unique articles with 0 repetition!`);
}

fix()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
