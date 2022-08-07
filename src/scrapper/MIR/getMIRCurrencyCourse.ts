import { config } from "./config";
import { createPuppeteerInstance } from "scrapper/createPuppeteerInstance";

export async function getMIRCurrencyCourse(): Promise<string | undefined> {
  const browser = await createPuppeteerInstance();
  const page = await browser.newPage();

  await page.goto(config.MIRCurrencyLink);
  await page.waitForTimeout(5000);

  const result = await page.evaluate(() => {
    const course = document.querySelector(".sf-text tbody tr:nth-child(10)");

    if (!course) {
      return;
    }

    return course.textContent.replaceAll("\n", "").replaceAll("\t", "");
  });

  await browser.close();

  return result;
}
