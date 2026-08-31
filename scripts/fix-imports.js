const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}
const files = walk('./src');
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('auth/[...nextauth]/route')) {
    const updated = content.replace(/import\s+\{\s*authOptions\s*\}\s+from\s+[\"'].*?auth\/\[\.\.\.nextauth\]\/route[\"'];?/g, 'import { authOptions } from "@/lib/auth";');
    if (updated !== content) {
      fs.writeFileSync(file, updated);
      console.log('Updated', file);
    }
  }
});
