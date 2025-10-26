import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate PNG icons using canvas
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, 'public', 'pwa-icons');

// Create the directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate PNG icons for each size
iconSizes.forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#3b82f6');
  gradient.addColorStop(1, '#1d4ed8');

  // Draw rounded rectangle background
  const radius = size * 0.1;
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, radius);
  ctx.fill();

  // Draw "C" letter
  ctx.fillStyle = 'white';
  ctx.font = `bold ${size * 0.2}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('C', size / 2, size * 0.35);

  // Draw "CRM" text
  ctx.font = `${size * 0.1}px Arial, sans-serif`;
  ctx.fillText('CRM', size / 2, size * 0.65);

  // Save as PNG
  const buffer = canvas.toBuffer('image/png');
  const filePath = path.join(iconsDir, `icon-${size}x${size}.png`);
  fs.writeFileSync(filePath, buffer);
  console.log(`Generated: icon-${size}x${size}.png`);
});

// Create simple screenshot placeholders
const createScreenshot = (width, height, filename, label) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, width, height);

  // Header
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(0, 0, width, 80);

  // Logo/Title
  ctx.fillStyle = 'white';
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('Contaboo CRM', 20, 40);

  // Content area
  ctx.fillStyle = 'white';
  ctx.fillRect(20, 100, width - 40, height - 140);

  // Sample content
  ctx.fillStyle = '#374151';
  ctx.font = '16px Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Dashboard Overview', 40, 140);
  
  // Sample cards/content blocks
  for (let i = 0; i < 3; i++) {
    const cardY = 160 + (i * 80);
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(40, cardY, width - 80, 60);
    
    ctx.fillStyle = '#6b7280';
    ctx.font = '14px Arial, sans-serif';
    ctx.fillText(`Sample Content Block ${i + 1}`, 60, cardY + 30);
  }

  // Label
  ctx.fillStyle = '#9ca3af';
  ctx.font = '12px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(label, width / 2, height - 20);

  const buffer = canvas.toBuffer('image/png');
  const filePath = path.join(iconsDir, filename);
  fs.writeFileSync(filePath, buffer);
  console.log(`Generated: ${filename}`);
};

// Generate screenshots
createScreenshot(1280, 720, 'screenshot-desktop.png', 'Desktop view of Contaboo CRM');
createScreenshot(390, 844, 'screenshot-mobile.png', 'Mobile view of Contaboo CRM');

console.log('\nAll PWA icons and screenshots generated successfully!');
console.log('Icons location: public/pwa-icons/');
console.log('You can now use these icons for your PWA.');