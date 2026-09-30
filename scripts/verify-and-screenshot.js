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
  console.log('Starting isolated headless Chrome for verification & screenshot capture...');
  const port = 9667;
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    `--user-data-dir=${tempDir}`,
    '--window-size=1440,900',
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

  console.log('Connected to Chrome DevTools Protocol.');

  // ==========================================
  // 1. DESKTOP VIEWPORT (1440px)
  // ==========================================
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  await sleep(1500);

  // 1a. Direct Subdomain Routing Rows at 1440
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 500, behavior: "instant" })' });
  await sleep(700);
  const ssRows1440 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'screenshot_index_rows_1440.png'), Buffer.from(ssRows1440.data, 'base64'));
  console.log('Saved screenshot_index_rows_1440.png');

  // 1b. Open Explore Subdomains Modal (Graveyard active by default)
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 0, behavior: "instant" }); window.openSubdomainsModal();' });
  await sleep(800);
  const ssModalGraveyard1440 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'screenshot_overlay_graveyard_1440.png'), Buffer.from(ssModalGraveyard1440.data, 'base64'));
  console.log('Saved screenshot_overlay_graveyard_1440.png');

  // Navigate to Slide 0: Portfolio (ArrowLeft)
  await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'ArrowLeft', code: 'ArrowLeft' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowLeft', code: 'ArrowLeft' });
  await sleep(600);
  const ssModalPortfolio1440 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'screenshot_overlay_portfolio_1440.png'), Buffer.from(ssModalPortfolio1440.data, 'base64'));
  console.log('Saved screenshot_overlay_portfolio_1440.png');

  // Navigate to Slide 2: ZeroBlur (ArrowRight twice)
  await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'ArrowRight', code: 'ArrowRight' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowRight', code: 'ArrowRight' });
  await sleep(400);
  await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'ArrowRight', code: 'ArrowRight' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowRight', code: 'ArrowRight' });
  await sleep(600);
  const ssModalZeroblur1440 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'screenshot_overlay_zeroblur_1440.png'), Buffer.from(ssModalZeroblur1440.data, 'base64'));
  console.log('Saved screenshot_overlay_zeroblur_1440.png');

  // Close modal via Escape
  await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', code: 'Escape' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' });
  await sleep(500);

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

  // 2a. Mobile Rows (stacked visual under description)
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 480, behavior: "instant" })' });
  await sleep(700);
  const ssMobileRows = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'screenshot_rows_mobile_390.png'), Buffer.from(ssMobileRows.data, 'base64'));
  console.log('Saved screenshot_rows_mobile_390.png');

  // 2b. Open Mobile Modal (Graveyard active)
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 0, behavior: "instant" }); window.openSubdomainsModal();' });
  await sleep(800);
  const ssMobileGraveyard = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'screenshot_overlay_graveyard_390.png'), Buffer.from(ssMobileGraveyard.data, 'base64'));
  console.log('Saved screenshot_overlay_graveyard_390.png');

  // Navigate to Mobile Portfolio
  await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'ArrowLeft', code: 'ArrowLeft' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowLeft', code: 'ArrowLeft' });
  await sleep(600);
  const ssMobilePortfolio = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'screenshot_overlay_portfolio_390.png'), Buffer.from(ssMobilePortfolio.data, 'base64'));
  console.log('Saved screenshot_overlay_portfolio_390.png');

  // Navigate to Mobile ZeroBlur
  await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'ArrowRight', code: 'ArrowRight' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowRight', code: 'ArrowRight' });
  await sleep(400);
  await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'ArrowRight', code: 'ArrowRight' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowRight', code: 'ArrowRight' });
  await sleep(600);
  const ssMobileZeroblur = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'screenshot_overlay_zeroblur_390.png'), Buffer.from(ssMobileZeroblur.data, 'base64'));
  console.log('Saved screenshot_overlay_zeroblur_390.png');

  console.log('All 1440px and 390px screenshots captured successfully for all 3 slides!');

  ws.close();
  chromeProc.kill('SIGINT');
  await sleep(1000);
  process.exit(0);
}

run().catch((err) => {
  console.error('Screenshot verification failed:', err);
  process.exit(1);
});
