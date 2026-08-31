const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src'));
let totalModified = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Remove JSX comments: {/* ... */}
    content = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

    // Remove standalone line comments: // ...
    content = content.replace(/^\s*\/\/.*$/gm, '');

    // Cleanup multiple blank lines resulting from deleted comments
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Stripped comments from', file);
        totalModified++;
    }
});

console.log('Done. Modified files:', totalModified);
