const { chromium } = require('playwright');

const seeds = [24,25,26,27,28,29,30,31,32,33];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`; // replace this
    await page.goto(url, { waitUntil: 'networkidle' });

    await page.waitForSelector('table');

    const numbers = await page.$$eval('table td', cells =>
      cells
        .map(td => td.innerText.trim())
        .filter(text => !isNaN(text))
        .map(Number)
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    grandTotal += pageSum;

    console.log(`Seed ${seed} sum: ${pageSum}`);
  }

  console.log(`FINAL TOTAL: ${grandTotal}`);

  await browser.close();
})();