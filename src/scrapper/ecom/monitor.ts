import { createPuppeteerInstance } from "scrapper/createPuppeteerInstance";

const link = "https://ux.mediamarkt.com.tr/stok-takip/index.html?id=1218695";

export async function scrapeStoreAvailability(): Promise<string[] | undefined> {
  const browser = await createPuppeteerInstance();
  const page = await browser.newPage();

  await page.goto(link);
  await page.waitForTimeout(5000);

  console.log("ON IFRAME PAGE");

  await page.type(".store-filter", "Antalya");

  const result = await page.evaluate(() => {
    const list = document.querySelectorAll(".store-item");

    return [...list].map(el => el.textContent);
  });

  await browser.close();
  return result;
}
