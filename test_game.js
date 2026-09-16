const fs = require('fs');

const files = ['game.js', 'motion.js', 'challenge.js', 'certificate.js', 'style.css'];
let errors = false;

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    if (file.endsWith('.js')) {
        const code = fs.readFileSync(file, 'utf8');
        try {
            new Function(code);
            console.log(`${file} is OK`);
        } catch(e) {
            console.error(`Syntax Error in ${file}:`, e.message);
            errors = true;
        }
    }
}

if (errors) process.exit(1);
