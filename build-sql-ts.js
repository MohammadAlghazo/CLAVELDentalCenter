const fs = require('fs');
const sql = fs.readFileSync('database-import.sql', 'utf8');
const escapedSql = sql.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
fs.writeFileSync('src/lib/seed-data.ts', `export const seedSql = \`${escapedSql}\`;\n`);
console.log('Created src/lib/seed-data.ts');
