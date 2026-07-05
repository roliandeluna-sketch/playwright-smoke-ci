const { chromium } = require('playwright');

const URL = "https://www.ysycompany.com/claim-benefits";

// 🌐 SOCKS5 PROXY
const proxy = {
  server: "socks5://change4.owlproxy.com:7778",
  username: "93Rblfxfj020_custom_zone_US_st__city_sid_96590445_time_30",
  password: "4837065"
};

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function runTest() {
  const browser = await chromium.launch({
    headless: true
  });

  const context = await browser.newContext({
    proxy,
    viewport: { width: 1366, height: 768 },
    locale: "en-US"
  });

  const page = await context.newPage();

  console.log("📍 Opening page...");
  await page.goto(URL, { waitUntil: "domcontentloaded" });

  await sleep(1500);

  console.log("👉 Clicking CTA...");

  const cta = page.locator('text=Get Access');

  if (await cta.count() > 0) {
    await cta.click();
  }

  await sleep(3000);

  console.log("✅ Test completed");

  await browser.close();
}

runTest();
