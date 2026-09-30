import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import * as wawoff2 from 'wawoff2';
import opentypeModule from 'opentype.js';

const opentype = opentypeModule.default || opentypeModule;
const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Colors
const COLOR_DARK = '#0A0A0B';
const COLOR_LIGHT = '#F4F1EA';

// Helper to generate pixel-aligned SVG string for the 5x5 monogram "A"
function getMonogramSvgPath(cellSize, originX = 0, originY = 0) {
  const c = cellSize;
  const x = originX;
  const y = originY;
  
  // Coordinates based on the 5x5 grid:
  // . X X X .
  // X . . . X
  // X X X X X
  // X . . . X
  // X . . . X
  return `M${x + c} ${y}h${3 * c}v${c}h${c}v${4 * c}h${-c}v${-2 * c}h${-3 * c}v${2 * c}h${-c}v${-4 * c}h${c}v${-c}zm0 ${c}h${3 * c}v${c}h${-3 * c}z`;
}

// 1. Generate public/logo-mark.svg
function generateLogoMarkSvg() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 5" fill="currentColor" shape-rendering="crispEdges">
  <path fill-rule="evenodd" d="M1 0h3v1h1v4h-1v-2h-3v2h-1v-4h1v-1zm0 1h3v1h-3z"/>
</svg>
`;
  const outPath = path.join(publicDir, 'logo-mark.svg');
  fs.writeFileSync(outPath, svg.trim());
  console.log('Generated public/logo-mark.svg');
}

// 2. Generate public/logo-lockup.svg with outlined font (Mark + "NRIX" as one word)
async function generateLogoLockupSvg() {
  const fontPath = path.join(rootDir, 'fonts', 'GeistPixel-Circle.woff2');
  const buffer = fs.readFileSync(fontPath);
  const ttfBuffer = await wawoff2.decompress(buffer);
  const font = opentype.parse(ttfBuffer.buffer.slice(ttfBuffer.byteOffset, ttfBuffer.byteOffset + ttfBuffer.byteLength));

  // Mark dimensions: height = 50 (10 units per cell)
  const markHeight = 50;
  
  // Font scale: capHeight in font units is 629, unitsPerEm is 1000
  const fontSize = 1000 * (markHeight / 629);
  const letterSpacing = 0.08 * fontSize;
  
  // Measure exact visual gap between consecutive letters in font
  const glyphN0 = font.charToGlyph('N');
  const glyphR0 = font.charToGlyph('R');
  const pathN0 = glyphN0.getPath(0, 50, fontSize);
  const advN0 = (glyphN0.advanceWidth / 1000) * fontSize + letterSpacing;
  const pathR0 = glyphR0.getPath(advN0, 50, fontSize);
  const letterGap = pathR0.getBoundingBox().x1 - pathN0.getBoundingBox().x2; // ~14.63 units

  const text = 'NRIX';
  const glyphs = font.stringToGlyphs(text);
  
  // Gap between mark 'A' (x: 0..50) and 'N' matches exact visual letter-spacing
  const nLeftBearing = glyphs[0].getMetrics().xMin * (fontSize / 1000);
  let currentX = markHeight + letterGap - nLeftBearing;
  
  let wordmarkPathData = '';
  let maxWordmarkX = 0;
  for (let i = 0; i < glyphs.length; i++) {
    const glyph = glyphs[i];
    const pathObj = glyph.getPath(currentX, 50, fontSize);
    wordmarkPathData += pathObj.toPathData(2) + ' ';
    const box = pathObj.getBoundingBox();
    if (box.x2 > maxWordmarkX) maxWordmarkX = box.x2;
    currentX += (glyph.advanceWidth / 1000) * fontSize + (i < glyphs.length - 1 ? letterSpacing : 0);
  }
  
  const markPath = getMonogramSvgPath(10, 0, 0);
  const totalWidth = Math.ceil(maxWordmarkX);
  const totalHeight = 50;
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}" fill="${COLOR_LIGHT}" shape-rendering="crispEdges">
  <path fill-rule="evenodd" d="${markPath}"/>
  <path d="${wordmarkPathData.trim()}"/>
</svg>
`;

  const outPath = path.join(publicDir, 'logo-lockup.svg');
  fs.writeFileSync(outPath, svg.trim());
  console.log(`Generated public/logo-lockup.svg (${totalWidth}x${totalHeight})`);
  return { markPath, wordmarkPathData, totalWidth, totalHeight };
}

// 3. Generate public/favicon.svg
function generateFaviconSvg() {
  const markPath = getMonogramSvgPath(4, 6, 6);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <style>
    .bg { fill: ${COLOR_DARK}; }
    .mark { fill: ${COLOR_LIGHT}; }
    @media (prefers-color-scheme: light) {
      .bg { fill: ${COLOR_LIGHT}; }
      .mark { fill: ${COLOR_DARK}; }
    }
  </style>
  <rect width="32" height="32" rx="6" class="bg"/>
  <path class="mark" fill-rule="evenodd" d="${markPath}"/>
</svg>
`;
  const outPath = path.join(publicDir, 'favicon.svg');
  fs.writeFileSync(outPath, svg.trim());
  console.log('Generated public/favicon.svg');
}

// 4. Generate multi-size favicon.ico
async function generateFaviconIco() {
  // 16x16: 2px per cell (10x10), centered at (3, 3), rx=3
  const p16Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" shape-rendering="crispEdges">
    <rect width="16" height="16" rx="3" fill="${COLOR_DARK}"/>
    <path fill="${COLOR_LIGHT}" fill-rule="evenodd" d="${getMonogramSvgPath(2, 3, 3)}"/>
  </svg>`;
  
  // 32x32: 4px per cell (20x20), centered at (6, 6), rx=6
  const p32Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" shape-rendering="crispEdges">
    <rect width="32" height="32" rx="6" fill="${COLOR_DARK}"/>
    <path fill="${COLOR_LIGHT}" fill-rule="evenodd" d="${getMonogramSvgPath(4, 6, 6)}"/>
  </svg>`;
  
  // 48x48: 6px per cell (30x30), centered at (9, 9), rx=9
  const p48Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" shape-rendering="crispEdges">
    <rect width="48" height="48" rx="9" fill="${COLOR_DARK}"/>
    <path fill="${COLOR_LIGHT}" fill-rule="evenodd" d="${getMonogramSvgPath(6, 9, 9)}"/>
  </svg>`;

  const buf16 = await sharp(Buffer.from(p16Svg)).png().toBuffer();
  const buf32 = await sharp(Buffer.from(p32Svg)).png().toBuffer();
  const buf48 = await sharp(Buffer.from(p48Svg)).png().toBuffer();

  const icoBuf = await pngToIco([buf16, buf32, buf48]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);
  console.log('Generated public/favicon.ico (16, 32, 48)');
}

// 5. Generate apple-touch-icon.png (180x180, solid #0A0A0B, 20px per cell = 100px mark, centered at 40,40)
async function generateAppleTouchIcon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180" shape-rendering="crispEdges">
    <rect width="180" height="180" fill="${COLOR_DARK}"/>
    <path fill="${COLOR_LIGHT}" fill-rule="evenodd" d="${getMonogramSvgPath(20, 40, 40)}"/>
  </svg>`;
  
  await sharp(Buffer.from(svg)).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated public/apple-touch-icon.png');
}

// 6. Generate icon-192.png, icon-512.png, and icon-maskable-512.png
async function generatePwaIcons() {
  // 192x192: 22px per cell = 110px mark, centered at 41, 41
  const svg192 = `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192" shape-rendering="crispEdges">
    <rect width="192" height="192" fill="${COLOR_DARK}"/>
    <path fill="${COLOR_LIGHT}" fill-rule="evenodd" d="${getMonogramSvgPath(22, 41, 41)}"/>
  </svg>`;
  await sharp(Buffer.from(svg192)).png().toFile(path.join(publicDir, 'icon-192.png'));
  console.log('Generated public/icon-192.png');

  // 512x512 standard: 58px per cell = 290px mark (56.6%), centered at 111, 111
  const svg512 = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" shape-rendering="crispEdges">
    <rect width="512" height="512" fill="${COLOR_DARK}"/>
    <path fill="${COLOR_LIGHT}" fill-rule="evenodd" d="${getMonogramSvgPath(58, 111, 111)}"/>
  </svg>`;
  await sharp(Buffer.from(svg512)).png().toFile(path.join(publicDir, 'icon-512.png'));
  console.log('Generated public/icon-512.png');

  // 512x512 maskable: 46px per cell = 230px mark (44.9% ≈ 44%), centered at 141, 141
  const svgMaskable = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" shape-rendering="crispEdges">
    <rect width="512" height="512" fill="${COLOR_DARK}"/>
    <path fill="${COLOR_LIGHT}" fill-rule="evenodd" d="${getMonogramSvgPath(46, 141, 141)}"/>
  </svg>`;
  await sharp(Buffer.from(svgMaskable)).png().toFile(path.join(publicDir, 'icon-maskable-512.png'));
  console.log('Generated public/icon-maskable-512.png');
}

// 7. Generate og-image.png (1200x630)
async function generateOgImage(lockupData) {
  // Scale lockup to height = 80 (scale = 80 / 50 = 1.6)
  const scale = 1.6;
  const lockupWidth = lockupData.totalWidth * scale;
  const startX = (1200 - lockupWidth) / 2;
  const startY = 236; // vertically centered grouping with text

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="${COLOR_DARK}"/>
    <g transform="translate(${startX}, ${startY}) scale(${scale})" fill="${COLOR_LIGHT}">
      <path fill-rule="evenodd" d="${lockupData.markPath}" shape-rendering="crispEdges"/>
      <path d="${lockupData.wordmarkPathData}"/>
    </g>
    <text x="600" y="380" text-anchor="middle" font-family="'JetBrains Mono', 'Courier New', monospace" font-size="24" font-weight="400" letter-spacing="0.1em" fill="rgba(244, 241, 234, 0.55)">anrix.me</text>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(path.join(publicDir, 'og-image.png'));
  console.log('Generated public/og-image.png');
}

// 8. Generate site.webmanifest
function generateWebManifest() {
  const manifest = {
    name: "Anrix Network",
    short_name: "Anrix",
    start_url: "/",
    display: "standalone",
    background_color: COLOR_DARK,
    theme_color: COLOR_DARK,
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };

  const outPath = path.join(publicDir, 'site.webmanifest');
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log('Generated public/site.webmanifest');
}

async function main() {
  console.log('Generating minimal pixel monogram assets...');
  generateLogoMarkSvg();
  const lockupData = await generateLogoLockupSvg();
  generateFaviconSvg();
  await generateFaviconIco();
  await generateAppleTouchIcon();
  await generatePwaIcons();
  await generateOgImage(lockupData);
  generateWebManifest();
  console.log('All assets generated successfully!');
}

main().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
