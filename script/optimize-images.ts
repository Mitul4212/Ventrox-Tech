
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target directory: client/public
const publicDir = path.resolve(__dirname, '../client/public');

console.log(`Scanning directory: ${publicDir}`);

if (!fs.existsSync(publicDir)) {
    console.error(`Directory not found: ${publicDir}`);
    process.exit(1);
}

function processDirectory(directory: string) {
    fs.readdirSync(directory).forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (file.match(/\.(png|jpg|jpeg)$/i)) {
            const name = file.replace(/\.[^/.]+$/, "");
            const webpPath = path.join(directory, `${name}.webp`);

            if (!fs.existsSync(webpPath)) {
                console.log(`Converting: ${file} -> ${name}.webp`);
                sharp(fullPath)
                    .webp({ quality: 80 })
                    .toFile(webpPath)
                    .then(() => console.log(`Done: ${name}.webp`))
                    .catch(err => console.error(`Error converting ${file}:`, err));
            } else {
                console.log(`Skipping (already exists): ${name}.webp`);
            }
        }
    });
}

processDirectory(publicDir);
