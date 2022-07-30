import puppeteer from "puppeteer";
import { config } from "./config";
import { isCurrentUserRoot } from "utils/isCurrentUserRoot";

export async function getMIRCurrencyCourse(): Promise<string | undefined> {
  console.info("LAUNCHING PUPETEER");
  const browser = await puppeteer.launch({
    headless: true,
    args: isCurrentUserRoot() ? ["--no-sandbox"] : undefined
  });
  console.info("LAUNCHED PUPETEER");
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
