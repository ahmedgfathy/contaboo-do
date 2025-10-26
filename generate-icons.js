import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a simple SVG icon that can be converted to different sizes
const createSVGIcon = (size) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" rx="${size * 0.1}" fill="url(#grad)"/>
  <text x="50%" y="35%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size * 0.2}" font-weight="bold" fill="white">C</text>
  <text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size * 0.1}" fill="white">CRM</text>
</svg>`;
};

// Generate HTML files for converting SVG to PNG (for manual conversion)
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, 'public', 'pwa-icons');

// Create the directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG icons for each size
iconSizes.forEach(size => {
  const svgContent = createSVGIcon(size);
  const svgPath = path.join(iconsDir, `icon-${size}x${size}.svg`);
  fs.writeFileSync(svgPath, svgContent);
  console.log(`Generated: icon-${size}x${size}.svg`);
});

// Create a simple HTML file to help convert SVGs to PNGs
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>PWA Icon Generator</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .icon-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin-top: 20px; }
        .icon-item { text-align: center; padding: 10px; border: 1px solid #ddd; border-radius: 8px; }
        .icon-item img { max-width: 100%; height: auto; }
        .instructions { background: #f0f8ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <h1>PWA Icons for Contaboo CRM</h1>
    
    <div class="instructions">
        <h3>Instructions:</h3>
        <p>1. Right-click on each SVG icon below and "Save image as" to save as PNG</p>
        <p>2. Make sure to save with the correct filename (e.g., icon-72x72.png)</p>
        <p>3. Or use an online SVG to PNG converter for batch conversion</p>
    </div>
    
    <div class="icon-grid">
        ${iconSizes.map(size => `
            <div class="icon-item">
                <h4>icon-${size}x${size}.png</h4>
                <img src="icon-${size}x${size}.svg" alt="Icon ${size}x${size}">
            </div>
        `).join('')}
    </div>
    
    <script>
        // Auto-download function (modern browsers may block this)
        function downloadAllIcons() {
            ${iconSizes.map(size => `
            setTimeout(() => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.onload = function() {
                    canvas.width = ${size};
                    canvas.height = ${size};
                    ctx.drawImage(img, 0, 0, ${size}, ${size});
                    canvas.toBlob(function(blob) {
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'icon-${size}x${size}.png';
                        a.click();
                        URL.revokeObjectURL(url);
                    });
                };
                img.src = 'icon-${size}x${size}.svg';
            }, ${iconSizes.indexOf(size) * 500});
            `).join('')}
        }
    </script>
    
    <button onclick="downloadAllIcons()" style="margin-top: 20px; padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Auto-Generate PNG Icons (may be blocked by browser)
    </button>
</body>
</html>
`;

fs.writeFileSync(path.join(iconsDir, 'icon-generator.html'), htmlContent);
console.log('Generated: icon-generator.html');
console.log('\\nTo generate PNG icons:');
console.log('1. Open public/pwa-icons/icon-generator.html in your browser');
console.log('2. Right-click and save each icon as PNG with the correct filename');
console.log('3. Or use the auto-generate button (may be blocked by browser security)');