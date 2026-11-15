const { chromium } = require('playwright');
const base = process.env.QA_URL || 'http://localhost:3107';
(async () => {
  const browser = await chromium.launch({executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'});
  const page = await browser.newPage({viewport:{width:375,height:667}});
  const errors=[]; page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if(m.type()==='error' && !/fonts\.googleapis|fonts\.gstatic|google\.com\/maps/.test(m.text())) errors.push(m.text()); });
  await page.goto(base,{waitUntil:'domcontentloaded'});
  const widths=[];
  for (const width of [280,320,360,375,390,430,600,768,1024,1440,1920]) {
    await page.setViewportSize({width,height:width<=430?667:900});
    widths.push(await page.evaluate(() => {
      const rect = s => document.querySelector(s).getBoundingClientRect();
      const title = rect('.paper-title'), paper = rect('.paper'), controls=rect('.printer-controls'), map=rect('.location-map'), viewport=innerWidth;
      return {width:viewport,overflow:document.documentElement.scrollWidth>viewport,heroTitle:Math.round(rect('.hero h1').width),printerWidth:Math.round(rect('.printer-body').width),mapWidth:Math.round(map.width),controlsInViewport:controls.left>=0&&controls.right<=viewport,footerOverlap:rect('.hero-foot').top<controls.bottom,paperInViewport:paper.left>=0&&paper.right<=viewport,titleInViewport:title.left>=0&&title.right<=viewport};
    }));
  }
  await page.setViewportSize({width:375,height:667});
  const menu=page.locator('.menu-toggle'); await menu.click();
  const opened=await menu.getAttribute('aria-expanded'); await page.keyboard.press('Escape');
  const escaped=await menu.getAttribute('aria-expanded'); const focus=await menu.evaluate(e=>document.activeElement===e);
  await menu.click(); await page.locator('.nav a[href="#usluge"]').click(); const linkClosed=await menu.getAttribute('aria-expanded');
  await menu.click(); await page.setViewportSize({width:1024,height:768}); const desktopClosed=await menu.getAttribute('aria-expanded');
  const button=page.locator('.printer-controls button');
  const start=await page.locator('.paper').evaluate(e=>getComputedStyle(e).transform);
  for(let i=0;i<3;i++){await button.click();await page.waitForTimeout(5300)}
  const fullCycles=await page.locator('.paper').evaluate(e=>({transform:getComputedStyle(e).transform,clip:getComputedStyle(e.querySelector('.paper-ink')).clipPath}));
  for(let i=0;i<6;i++) await button.click();
  await page.setViewportSize({width:390,height:700});
  await page.waitForTimeout(5300);
  const rapid=await page.locator('.paper').evaluate(e=>getComputedStyle(e).transform);
  await page.emulateMedia({reducedMotion:'reduce'});
  const reduced=await page.locator('.paper').evaluate(e=>({transform:getComputedStyle(e).transform,clip:getComputedStyle(e.querySelector('.paper-ink')).clipPath}));
  const anchors=await page.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].every(e=>document.querySelector(e.getAttribute('href'))));
  const contact=await page.locator('a[href^="tel:"]').first().getAttribute('href');
  const mapLink=await page.locator('.location-map a').getAttribute('href');
  const iframe=await page.locator('.location-map iframe').evaluate(e=>({src:e.src,width:e.clientWidth,height:e.clientHeight,title:e.title}));
  const font=await page.evaluate(()=>({space:document.fonts.check('16px "Space Grotesk"'),serif:document.fonts.check('16px "Instrument Serif"')}));
  console.log(JSON.stringify({widths,menu:{opened,escaped,focus,linkClosed,desktopClosed},start,fullCycles,rapid,reduced,anchors,contact,mapLink,iframe,font,errors}));
  await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
