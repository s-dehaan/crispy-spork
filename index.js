import puppeteer from "puppeteer";
import express from "express";

const app = express();

app.get("/", async (request, response) => {
  const result = await getResult();
  response.json(result);
});

const getResult = async () => {
  const products = [
    "https://shop.critrole.eu/collections/dice-and-bags/products/vox-machina-dice-set-grog",
    "https://shop.critrole.eu/collections/dice-and-bags/products/vox-machina-dice-set-gm",
    "https://shop.critrole.eu/collections/dice-and-bags/products/vox-machina-dice-set-keyleth",
  ];

  const result = [];

  for (let i = 0; i < products.length; i++) {
    const browser = await puppeteer.launch({
      executablePath: "google-chrome-stable",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    try {
      const page = await browser.newPage();

      await page.goto(products[i]);

      const element = await page.evaluate(() => window.find("ADD TO CART"));
      const title = await page.title();
      result.push({
        product: title,
        inStock: element,
      });
    } catch (error) {
      console.error(error);
    } finally {
      await browser.close();
    }
  }

  return result;
};

app.listen(5000);
