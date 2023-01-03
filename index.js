import puppeteer from "puppeteer";

(async () => {
  const products = [
    "https://shop.critrole.eu/collections/dice-and-bags/products/vox-machina-dice-set-grog",
    "https://shop.critrole.eu/collections/dice-and-bags/products/vox-machina-dice-set-gm",
    "https://shop.critrole.eu/collections/dice-and-bags/products/vox-machina-dice-set-keyleth",
  ];

  products.forEach(async (product) => {
    const browser = await puppeteer.launch({
      executablePath: "google-chrome-stable",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    try {
      const page = await browser.newPage();

      await page.goto(product);

      const element = await page.evaluate(() => window.find("ADD TO CART"));
      const title = await page.title();
      console.log(`Product: ${title}, inStock: ${element}`);
    } catch (error) {
      console.error(error);
    } finally {
      await browser.close();
    }
  });
})();
