const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const base = process.env.QA_URL || 'http://localhost:3107';
const out = process.env.QA_OUTPUT || path.join(process.env.TEMP || process.cwd(), 'svjetlost-graf-qa');
const framesOnly = process.argv.includes('--frames-only');
fs.mkdirSync(out, { recursive: true });

async function main() {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe' });
  const report = { base, frames: {}, responsive: [], errors: [], checks: {} };
  try {
    for (const [label, width, height] of [['mobile', 375, 812], ['desktop', 1440, 900]]) {
      const page = await browser.newPage({ viewport: { width, height } });
      page.on('pageerror', error => report.errors.push(`${label}: ${error.message}`));
      const response = await page.goto(base, { waitUntil: 'domcontentloaded' });
      report.checks[`${label}Http`] = response.status();
      await page.locator('.printer-controls button').click();
      const shots = [];
      for (const [name, millis] of [['start', 0], ['25', 1300], ['50', 2600], ['75', 3900], ['end', 5200]]) {
        await page.evaluate((time) => {
          for (const animation of document.querySelector('.printer-scene').getAnimations({ subtree: true })) {
            animation.pause(); animation.currentTime = time;
          }
        }, millis);
        const file = path.join(out, `${label}-${name}.png`);
        await page.locator('.printer-assembly').screenshot({ path: file });
        const state = await page.evaluate(() => {
          const p = document.querySelector('.paper'), title = document.querySelector('.paper-title');
          const body = document.querySelector('.printer-body'), track = document.querySelector('.paper-track');
          return { paperTop: Math.round(p.getBoundingClientRect().top), titleTop: Math.round(title.getBoundingClientRect().top), bodyTop: Math.round(body.getBoundingClientRect().top), trackOverflow: getComputedStyle(track).overflow, inkClip: getComputedStyle(document.querySelector('.paper-ink')).clipPath };
        });
        shots.push({ name, file, ...state });
      }
      report.frames[label] = shots;
      await page.close();
    }
    if (!framesOnly) {
      for (const width of [280,320,360,375,390,430,600,768,1024,1440,1920]) {
        const page = await browser.newPage({ viewport: { width, height: width < 600 ? 640 : 900 } });
        await page.goto(base, { waitUntil: 'domcontentloaded' });
        const state = await page.evaluate(() => {
          const footer = document.querySelector('.hero-foot').getBoundingClientRect();
          const controls = document.querySelector('.printer-controls').getBoundingClientRect();
          const paper = document.querySelector('.paper').getBoundingClientRect();
          return { overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth, controlsGap: Math.round(footer.top - controls.bottom), paperGap: Math.round(footer.top - paper.bottom), anchorTargets: [...document.querySelectorAll('a[href^="#"]')].every(a => document.querySelector(a.getAttribute('href'))) };
        });
        report.responsive.push({ width, ...state });
        await page.close();
      }
    }
    fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report));
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
