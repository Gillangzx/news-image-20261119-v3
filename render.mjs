// Render render.html to entry.png at 1024x1024 with headless Chromium.
// Usage: node render.mjs [out.png]  (default: entry.png)
import { chromium } from 'playwright-core';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dir = path.dirname(fileURLToPath(import.meta.url));
const out = process.argv[2] || path.join(dir, 'entry.png');
const browser = await chromium.launch({
  executablePath: process.env.CHROME || '/home/hatch/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome',
  args: ['--no-sandbox', '--force-device-scale-factor=1'],
});
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
await page.goto('file://' + path.join(dir, 'render.html'), { waitUntil: 'load' });
await page.waitForTimeout(300);
// Measure: does the page fit 1024x1024, and where does each section end?
const m = await page.evaluate(() => {
  const q = (s) => { const el = document.querySelector(s); if (!el) return null; const r = el.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), height: Math.round(r.height) }; };
  return {
    pageScrollHeight: document.querySelector('.page').scrollHeight,
    bodyScrollHeight: document.body.scrollHeight,
    topbar: q('.topbar'), masthead: q('.masthead'), strip: q('.strip'), hours: q('.hours'),
    leads: q('.leads'), tiles: q('.tiles'), bottom: q('.bottom'), datecheck: q('.datecheck'), sources: q('.sources'),
  };
});
console.log(JSON.stringify(m, null, 1));
await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1024, height: 1024 } });
await browser.close();
console.log('wrote', out);
