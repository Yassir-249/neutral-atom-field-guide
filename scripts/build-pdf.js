// Rebuild neutral-atom-field-guide.pdf from index.html with headless Chrome.
// Usage (from the repo root):
//   npm install --no-save puppeteer-core@23.11.1
//   node scripts/build-pdf.js
// Set CHROME_PATH if Chrome is not at the default Windows location.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'index.html');
const out = path.join(root, 'neutral-atom-field-guide.pdf');
const chrome = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

(async () => {
  // Print copy: open every quiz answer so it appears in the PDF
  const html = fs.readFileSync(src, 'utf8').replace(/<details>/g, '<details open>');
  const tmp = path.join(os.tmpdir(), 'naf-print.html');
  fs.writeFileSync(tmp, html);

  const browser = await puppeteer.launch({ executablePath: chrome, headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });
  await page.emulateMediaFeatures([
    { name: 'prefers-color-scheme', value: 'light' },
    { name: 'prefers-reduced-motion', value: 'reduce' },
  ]);
  await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.emulateMediaType('print');

  const footer =
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:7.5px;color:#5d7479;width:100%;padding:0 15mm;display:flex;justify-content:space-between">' +
    '<span>Neutral-Atom Field Guide · an independent learning guide to the Pasqal platform · October 2026</span>' +
    '<span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>';

  await page.pdf({
    path: out, format: 'A4', printBackground: true, preferCSSPageSize: true,
    displayHeaderFooter: true, headerTemplate: '<div></div>', footerTemplate: footer,
    outline: true, tagged: true, scale: 0.72, timeout: 180000,
  });
  await browser.close();
  fs.unlinkSync(tmp);
  console.log('Wrote', out);
})().catch((e) => { console.error(e); process.exit(1); });
