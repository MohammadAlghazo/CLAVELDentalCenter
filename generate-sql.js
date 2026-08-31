const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

async function exportSql() {
    console.log('Exporting SQLite data to MySQL format...');
    const db = new sqlite3.Database('./dev.db');
    let sqlStr = "SET NAMES utf8mb4;\nSET FOREIGN_KEY_CHECKS = 0;\n\n";

    const readTable = (table) => {
        return new Promise((resolve) => {
            db.all(`SELECT * FROM ${table}`, [], (err, rows) => {
                if (err) resolve([]);
                resolve(rows || []);
            });
        });
    };

    const escape = (val) => {
        if (val === null) return 'NULL';
        if (typeof val === 'number') return val;
        if (typeof val === 'boolean') return val ? 1 : 0;
        let str = String(val).replace(/\\/g, "\\\\").replace(/'/g, "''").replace(/\n/g, '\\n').replace(/\r/g, '\\r');
        return `'${str}'`;
    };

    const tables = ['Article', 'Doctor', 'Faq', 'Booking', 'ContactMessage'];
    for (const t of tables) {
        const rows = await readTable(t);
        if (rows.length > 0) {
            const columns = Object.keys(rows[0]).map(c => `\`${c}\``).join(', ');
            for (const r of rows) {
                // Ensure datetime fields are properly formatted for MySQL
                for (let key in r) {
                    if ((key === 'createdAt' || key === 'updatedAt' || key === 'publishedAt') && r[key]) {
                        try {
                            const d = new Date(r[key]);
                            r[key] = d.toISOString().slice(0, 19).replace('T', ' ');
                        } catch(e) {}
                    }
                }
                const values = Object.values(r).map(escape).join(', ');
                sqlStr += `INSERT IGNORE INTO \`${t}\` (${columns}) VALUES (${values});\n`;
            }
            sqlStr += `\n`;
        }
    }

    // Add Admin (since it might be empty)
    sqlStr += `INSERT IGNORE INTO \`Admin\` (\`username\`, \`passwordHash\`, \`createdAt\`) VALUES ('admin', '$2b$10$IypQouxyFjSjM74WD3D6gu7ECm2usndQjQM2vwBanQA9ir3gdWOP2', NOW());\n`;

    sqlStr += "SET FOREIGN_KEY_CHECKS = 1;\n";
    fs.writeFileSync('database-import.sql', sqlStr, 'utf-8');
    console.log('Exported database-import.sql successfully!');
    db.close();
}

exportSql();
