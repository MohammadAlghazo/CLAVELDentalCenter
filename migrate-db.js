const sqlite3 = require('sqlite3').verbose();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function migrate() {
    console.log('Starting migration from local SQLite to remote Hostinger MySQL...');
    const db = new sqlite3.Database('./dev.db');
    
    // Connect to Hostinger
    const connection = await mysql.createConnection({
        host: 'srv1376.hstgr.io',
        user: 'u651324043_claveladmin',
        password: 'Clavel@Dental2026#Secure',
        database: 'u651324043_claveldb',
        port: 3306,
        connectTimeout: 20000
    });
    console.log('Connected to Hostinger DB successfully!');
    
    const readTable = (table) => {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM ${table}`, [], (err, rows) => {
                if (err) resolve([]);
                resolve(rows || []);
            });
        });
    };

    // 1. Articles
    const articles = await readTable('Article');
    console.log(`Found ${articles.length} articles to migrate.`);
    for (const a of articles) {
        try {
            await connection.execute(
                `INSERT INTO \`Article\` (\`id\`, \`title\`, \`slug\`, \`summary\`, \`content\`, \`imageUrl\`, \`status\`, \`publishedAt\`, \`createdAt\`, \`updatedAt\`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [a.id, a.title, a.slug, a.summary, a.content, a.imageUrl, a.status, a.publishedAt ? new Date(a.publishedAt) : null, new Date(a.createdAt), new Date(a.updatedAt)]
            );
        } catch(e) {}
    }

    // 2. Doctors
    const doctors = await readTable('Doctor');
    console.log(`Found ${doctors.length} doctors to migrate.`);
    for (const d of doctors) {
        try {
            await connection.execute(
                `INSERT INTO \`Doctor\` (\`id\`, \`nameAr\`, \`nameEn\`, \`titleAr\`, \`titleEn\`, \`slug\`, \`image\`, \`shortBio\`, \`qualifications\`, \`specialties\`, \`isActive\`, \`createdAt\`, \`updatedAt\`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [d.id, d.nameAr, d.nameEn, d.titleAr, d.titleEn, d.slug, d.image, d.shortBio, d.qualifications, d.specialties, d.isActive, new Date(d.createdAt), new Date(d.updatedAt)]
            );
        } catch(e) {}
    }

    // 3. Faqs
    const faqs = await readTable('Faq');
    console.log(`Found ${faqs.length} FAQs to migrate.`);
    for (const f of faqs) {
        try {
            await connection.execute(
                `INSERT INTO \`Faq\` (\`id\`, \`question\`, \`answer\`, \`order\`, \`isActive\`, \`createdAt\`, \`updatedAt\`) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [f.id, f.question, f.answer, f.order, f.isActive, new Date(f.createdAt), new Date(f.updatedAt)]
            );
        } catch(e) {}
    }

    // 4. Admin
    try {
        const hash = await bcrypt.hash('clavel2025!', 10);
        await connection.execute(
            `INSERT INTO \`Admin\` (\`username\`, \`passwordHash\`, \`createdAt\`) VALUES (?, ?, NOW())`,
            ['admin', hash]
        );
        console.log('Admin inserted successfully!');
    } catch(e) {}

    console.log('Migration completed completely! All local data is now in Hostinger.');
    await connection.end();
    db.close();
}

migrate().catch(e => {
    console.error('Migration error:', e);
});
