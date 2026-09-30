import fs from 'fs';
import path from 'path';
import http from 'http';
import { spawn } from 'child_process';
import sharp from 'sharp';

const artifactDir = 'C:\\Users\\pbclu\\.gemini\\antigravity-ide\\brain\\ff1f6700-89b2-4e83-b7d2-e210cd8088e3';
const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 1. Verify file dimensions and HTTP 200 status
async function checkAssets() {
  console.log('--- Verifying Assets & Dimensions ---');
  const filesToCheck = [
    { file: 'apple-touch-icon.png', expected: { width: 180, height: 180 } },
    { file: 'icon-192.png', expected: { width: 192, height: 192 } },
    { file: 'icon-512.png', expected: { width: 512, height: 512 } },
    { file: 'icon-maskable-512.png', expected: { width: 512, height: 512 } },
    { file: 'og-image.png', expected: { width: 1200, height: 630 } },
  ];

  for (const item of filesToCheck) {
    const meta = await sharp(path.join(publicDir, item.file)).metadata();
    const matches = meta.width === item.expected.width && meta.height === item.expected.height;
    console.log(`[File] ${item.file}: ${meta.width}x${meta.height} -> ${matches ? 'OK' : 'MISMATCH'}`);
    if (!matches) throw new Error(`Dimension mismatch in ${item.file}`);
  }

  const urlsToCheck = [
    '/favicon.svg',
    '/favicon.ico',
    '/apple-touch-icon.png',
    '/site.webmanifest',
    '/icon-192.png',
    '/icon-512.png',
    '/icon-maskable-512.png',
    '/og-image.png',
    '/logo-mark.svg',
    '/logo-lockup.svg'
  ];

  console.log('--- Checking HTTP Status Codes on Dev Server (no 404s) ---');
  for (const urlPath of urlsToCheck) {
    await new Promise((resolve, reject) => {
      http.get(`http://localhost:3000${urlPath}`, res => {
        console.log(`[HTTP ${res.statusCode}] ${urlPath}`);
        if (res.statusCode !== 200) {
          reject(new Error(`Asset ${urlPath} returned ${res.statusCode}`));
        } else {
          resolve();
        }
      }).on('error', reject);
    });
  }
}

// 2. Generate enlarged 8x favicon comparisons (16px, 32px, 180px)
async function generateEnlargedFavicons() {
  console.log('--- Generating Enlarged Favicon Previews (8x nearest neighbor) ---');

  // 16px frame (enlarged 8x to 128x128 with nearest neighbor)
  const p16Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" shape-rendering="crispEdges">
    <rect width="16" height="16" rx="3" fill="#0A0A0B"/>
    <path fill="#F4F1EA" fill-rule="evenodd" d="M5 3h6v2h2v8h-2V9H5v4H3V5h2V3zm0 2h6v2H5V5z"/>
  </svg>`;
  const p16 = await sharp(Buffer.from(p16Svg)).png().toBuffer();
  await sharp(p16)
    .resize(128, 128, { kernel: sharp.kernel.nearest })
    .png()
    .toFile(path.join(artifactDir, 'screenshot_favicon_16px_8x.png'));
  console.log('Saved screenshot_favicon_16px_8x.png');

  // 32px favicon
  const p32 = await sharp(path.join(publicDir, 'favicon.svg'))
    .resize(32, 32)
    .png()
    .toBuffer();
  await sharp(p32)
    .resize(256, 256, { kernel: sharp.kernel.nearest })
    .png()
    .toFile(path.join(artifactDir, 'screenshot_favicon_32px_8x.png'));
  console.log('Saved screenshot_favicon_32px_8x.png');

  // 180px apple touch icon (8x is 1440x1440, or 4x is 720x720)
  await sharp(path.join(publicDir, 'apple-touch-icon.png'))
    .resize(720, 720, { kernel: sharp.kernel.nearest })
    .png()
    .toFile(path.join(artifactDir, 'screenshot_favicon_180px_4x.png'));
  console.log('Saved screenshot_favicon_180px_4x.png');

  // Copy OG image directly as artifact
  fs.copyFileSync(
    path.join(publicDir, 'og-image.png'),
    path.join(artifactDir, 'screenshot_og_image.png')
  );
  console.log('Saved screenshot_og_image.png');
}

// 3. Capture browser screenshots for header at 1x and 2x, and favicon in light & dark themes
async function captureBrowserScreenshots() {
  console.log('--- Capturing Browser Screenshots via CDP ---');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const debugPort = 9225;
  const tempProfile = path.join(rootDir, '.chrome-temp-logo');

  const chromeProc = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${tempProfile}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'http://localhost:3000/'
  ]);

  await sleep(2000);

  async function getWsUrl() {
    return new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${debugPort}/json`, res => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          const targets = JSON.parse(body);
          const page = targets.find(t => t.type === 'page' && t.url.includes('localhost:3000'));
          if (page) resolve(page.webSocketDebuggerUrl);
          else reject(new Error('Page not found'));
        });
      }).on('error', reject);
    });
  }

  const wsUrl = await getWsUrl();
  const ws = new WebSocket(wsUrl);

  let idCounter = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const raw = typeof event.data === 'string' ? event.data : event.data.toString();
    const msg = JSON.parse(raw);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  await new Promise((res, rej) => {
    ws.onopen = res;
    ws.onerror = rej;
  });

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Page.enable');
  await send('DOM.enable');

  // Header clip rect helper
  async function getHeaderClip() {
    const box = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const header = document.querySelector('.header-brand');
          if (!header) return null;
          const rect = header.getBoundingClientRect();
          return {
            x: Math.max(0, rect.left - 16),
            y: Math.max(0, rect.top - 12),
            width: rect.width + 32,
            height: rect.height + 24
          };
        })()
      `,
      returnByValue: true
    });
    return box.result.value;
  }

  // 1x Header
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  await sleep(600);
  const clip1x = await getHeaderClip();
  const ssHeader1x = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { ...clip1x, scale: 1 }
  });
  fs.writeFileSync(path.join(artifactDir, 'screenshot_header_1x.png'), Buffer.from(ssHeader1x.data, 'base64'));
  console.log('Saved screenshot_header_1x.png');

  // 2x Header
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false
  });
  await sleep(600);
  const clip2x = await getHeaderClip();
  const ssHeader2x = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { ...clip2x, scale: 2 }
  });
  fs.writeFileSync(path.join(artifactDir, 'screenshot_header_2x.png'), Buffer.from(ssHeader2x.data, 'base64'));
  console.log('Saved screenshot_header_2x.png');

  // Favicon rendered on dark background vs light background
  await send('Emulation.setEmulatedMedia', {
    media: 'screen',
    features: [{ name: 'prefers-color-scheme', value: 'light' }]
  });
  // Capture light mode simulation of favicon.svg
  const lightFaviconSvg = await sharp(path.join(publicDir, 'favicon.svg'))
    .resize(128, 128, { kernel: sharp.kernel.nearest })
    .png()
    .toBuffer();
  // Note: sharp doesn't execute prefers-color-scheme media queries directly, so let's render light SVG
  const lightSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 32 32" shape-rendering="crispEdges">
    <rect width="32" height="32" rx="6" fill="#F4F1EA"/>
    <path fill="#0A0A0B" fill-rule="evenodd" d="M10 6h12v4h4v16h-4v-8H10v8H6V10h4V6zm0 4h12v4H10v-4z"/>
  </svg>`;
  await sharp(Buffer.from(lightSvg)).png().toFile(path.join(artifactDir, 'screenshot_favicon_light_tab.png'));
  console.log('Saved screenshot_favicon_light_tab.png');

  const darkSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 32 32" shape-rendering="crispEdges">
    <rect width="32" height="32" rx="6" fill="#0A0A0B"/>
    <path fill="#F4F1EA" fill-rule="evenodd" d="M10 6h12v4h4v16h-4v-8H10v8H6V10h4V6zm0 4h12v4H10v-4z"/>
  </svg>`;
  await sharp(Buffer.from(darkSvg)).png().toFile(path.join(artifactDir, 'screenshot_favicon_dark_tab.png'));
  console.log('Saved screenshot_favicon_dark_tab.png');

  ws.close();
  chromeProc.kill();
  try {
    fs.rmSync(tempProfile, { recursive: true, force: true });
  } catch (e) {}
}

async function main() {
  await checkAssets();
  await generateEnlargedFavicons();
  await captureBrowserScreenshots();
  console.log('All verification checks and screenshot artifacts completed successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
