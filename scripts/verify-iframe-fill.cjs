const { chromium, devices } = require('playwright');

const URL = process.argv[2] || 'http://localhost:3000/free-trial';

async function verifyViewport(browser, label, contextOpts) {
  console.log(`\n=== ${label} (${URL}) ===`);
  const ctx = await browser.newContext(contextOpts);
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(8000);
  await page.locator('section#book').scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);

  const m = await page.evaluate(() => {
    const section = document.querySelector('section#book');
    const card = section?.querySelector('.relative.w-full');
    const host = section?.querySelector('.cedar-calendly-host');
    const iframe = section?.querySelector('iframe');
    if (!section || !card || !host || !iframe) return null;
    const r = (el) => el.getBoundingClientRect();
    return {
      cardH: r(card).height,
      hostH: r(host).height,
      iframeH: r(iframe).height,
      iframeW: r(iframe).width,
      vw: window.innerWidth,
    };
  });
  console.log('   measurements:', JSON.stringify(m));

  const safePath = `/tmp/verify-${label.toLowerCase().replace(/\s+/g, '-')}.png`;
  await page.screenshot({ path: safePath, fullPage: false });
  console.log(`   saved ${safePath}`);

  await ctx.close();

  if (!m) return { label, ok: false, why: 'measurement failed' };

  const iframeFillsCard = Math.abs(m.iframeH - m.cardH) < 8; // allow 8px slop for borders
  const iframeIsTall = m.iframeH >= 600;
  const iframeIsFullWidth = m.iframeW >= m.vw * 0.6;

  const ok = iframeFillsCard && iframeIsTall && iframeIsFullWidth;
  console.log(
    `   iframeFillsCard=${iframeFillsCard} iframeIsTall=${iframeIsTall} iframeIsFullWidth=${iframeIsFullWidth} → ${ok ? '✅ OK' : '❌ BAD'}`,
  );
  return { label, ok, m };
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  results.push(await verifyViewport(browser, 'Mobile (iPhone 13)', { ...devices['iPhone 13'] }));
  results.push(await verifyViewport(browser, 'Tablet (iPad Pro 11)', { ...devices['iPad Pro 11'] }));
  results.push(await verifyViewport(browser, 'Desktop 1440', { viewport: { width: 1440, height: 900 } }));
  results.push(await verifyViewport(browser, 'Small Desktop 1024', { viewport: { width: 1024, height: 768 } }));

  await browser.close();

  console.log('\n=== SUMMARY ===');
  for (const r of results) {
    console.log(`${r.ok ? '✅' : '❌'} ${r.label}`, r.m ? `iframe=${Math.round(r.m.iframeH)}x${Math.round(r.m.iframeW)} card=${Math.round(r.m.cardH)}` : '');
  }
  process.exit(results.every(r => r.ok) ? 0 : 1);
})();
