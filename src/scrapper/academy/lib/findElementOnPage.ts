import { Page } from "puppeteer";

export async function findElementOnPage(selector: string, page: Page) {
  console.log("TRYING TO FIND" + selector);
  await page.screenshot({path: "find.png"});
  return await page.evaluate(() => {
    return Boolean(document.querySelector(selector));
  });
}
