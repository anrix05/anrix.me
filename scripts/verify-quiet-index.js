import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\pbclu\\.gemini\\antigravity-ide\\brain\\ff1f6700-89b2-4e83-b7d2-e210cd8088e3';
const tempDir = path.join(process.cwd(), '.chrome-temp');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log('Starting headless Chrome for quiet index verification...');
  const port = 9669;
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    `--user-data-dir=${tempDir}`,
    '--window-size=1440,1100',
    'http://localhost:3000'
  ]);

  await sleep(2500);

  const versionRes = await fetch(`http://127.0.0.1:${port}/json/list`);
  const pages = await versionRes.json();
  const page = pages.find((p) => p.type === 'page');
  if (!page || !page.webSocketDebuggerUrl) {
    throw new Error('No page found or webSocketDebuggerUrl missing');
  }

  console.log('Connecting to page:', page.url);
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let messageId = 1;
  const pendingRequests = new Map();

  ws.onmessage = (event) => {
    const raw = typeof event.data === 'string' ? event.data : event.data.toString();
    const data = JSON.parse(raw);
    if (data.id && pendingRequests.has(data.id)) {
      const { resolve, reject } = pendingRequests.get(data.id);
      pendingRequests.delete(data.id);
      if (data.error) {
        reject(data.error);
      } else {
        resolve(data.result);
      }
    }
  };

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = messageId++;
      pendingRequests.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Page.enable');
  await send('DOM.enable');
  await send('Runtime.enable');

  console.log('Connected to CDP.');

  // ==========================================
  // 1. DESKTOP VIEWPORT (1440px)
  // ==========================================
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1050,
    deviceScaleFactor: 1,
    mobile: false
  });

  await sleep(1500);

  // Scroll to index section to view rows clearly
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 240, behavior: "instant" })' });
  await sleep(600);

  // 1a. Desktop Default (no hover, resting state)
  const ssDesktopDefault = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'screenshot_quiet_desktop_default.png'), Buffer.from(ssDesktopDefault.data, 'base64'));
  console.log('Saved screenshot_quiet_desktop_default.png');

  async function hoverRow(index) {
    const coords = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const rows = document.querySelectorAll('.subdomain-row');
          const row = rows[${index}];
          if (!row) return null;
          const rect = row.getBoundingClientRect();
          return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        })()
      `,
      returnByValue: true
    });

    if (coords && coords.result && coords.result.value) {
      const { x, y } = coords.result.value;
      await send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: Math.round(x),
        y: Math.round(y)
      });
    }

    await sleep(550);
  }

  async function clearMouse() {
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 0, y: 0 });
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          if (document.activeElement && document.activeElement.blur) {
            document.activeElement.blur();
          }
        })()
      `
    });
    await sleep(400);
  }

  // 1b. Desktop Hovering Row 01: Portfolio (#38bdf8)
  await hoverRow(0);
  const ssHoverPortfolio = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'screenshot_quiet_hover_portfolio.png'), Buffer.from(ssHoverPortfolio.data, 'base64'));
  console.log('Saved screenshot_quiet_hover_portfolio.png');
  await clearMouse();

  // 1c. Desktop Hovering Row 02: Graveyard (#34d399)
  await hoverRow(1);
  const ssHoverGraveyard = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'screenshot_quiet_hover_graveyard.png'), Buffer.from(ssHoverGraveyard.data, 'base64'));
  console.log('Saved screenshot_quiet_hover_graveyard.png');
  await clearMouse();

  // 1d. Desktop Hovering Row 03: Zeroblur (#a855f7)
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 500, behavior: "instant" })' });
  await sleep(300);
  await hoverRow(2);
  const ssHoverZeroblur = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'screenshot_quiet_hover_zeroblur.png'), Buffer.from(ssHoverZeroblur.data, 'base64'));
  console.log('Saved screenshot_quiet_hover_zeroblur.png');
  await clearMouse();
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 240, behavior: "instant" })' });

  // ==========================================
  // 2. MOBILE VIEWPORT (390px)
  // ==========================================
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 0, behavior: "instant" })' });
  await sleep(800);

  const ssMobile390 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'screenshot_quiet_mobile_390.png'), Buffer.from(ssMobile390.data, 'base64'));
  console.log('Saved screenshot_quiet_mobile_390.png');

  // Scroll mobile down to see all 3 rows and footer
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 380, behavior: "instant" })' });
  await sleep(600);
  const ssMobile390Rows = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'screenshot_quiet_mobile_390_rows.png'), Buffer.from(ssMobile390Rows.data, 'base64'));
  console.log('Saved screenshot_quiet_mobile_390_rows.png');

  // ==========================================
  // 3. RESPONSIVE CHECK: 360px
  // ==========================================
  await send('Emulation.setDeviceMetricsOverride', {
    width: 360,
    height: 780,
    deviceScaleFactor: 2,
    mobile: true
  });
  await sleep(600);
  const ssMobile360 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'screenshot_quiet_mobile_360.png'), Buffer.from(ssMobile360.data, 'base64'));
  console.log('Saved screenshot_quiet_mobile_360.png');

  // ==========================================
  // 4. RESPONSIVE CHECK: 1920px (Ultra-wide)
  // ==========================================
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    mobile: false
  });
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 180, behavior: "instant" })' });
  await sleep(600);

  const ssDesktop1920 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'screenshot_quiet_desktop_1920.png'), Buffer.from(ssDesktop1920.data, 'base64'));
  console.log('Saved screenshot_quiet_desktop_1920.png');

  console.log('All verification screenshots captured successfully!');

  ws.close();
  chromeProc.kill('SIGINT');
  await sleep(1000);
  process.exit(0);
}

run().catch((err) => {
  console.error('Screenshot verification failed:', err);
  process.exit(1);
});
