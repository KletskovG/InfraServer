import puppeteer from "puppeteer";
import { isCurrentUserRoot } from "utils/isCurrentUserRoot";
import * as config from "academy/config";

export async function orderProject(courseName: string): Promise<string> {
  const course = config.scrapeConfig.find(({ name }) => name === courseName);

  if (!course) {
    return Promise.reject("Course not found in config");
  }

  console.info("LAUNCHING PUPETEER");
  const browser = await puppeteer.launch({
    headless: true,
    args: isCurrentUserRoot() ? ["--no-sandbox"] : undefined
  });
  console.info("LAUNCHED PUPETEER");
  const page = await browser.newPage();

  await page.goto(course.link);
  await page.waitForTimeout(5000);
  console.log("CHECK FOR AUTH");
  await page.type("#login-email", process.env.ACADEMY_EMAIL);
  await page.type("#login-password", process.env.ACADEMY_PWD);
  await page.click("input.button");
  await page.waitForNavigation();

  const isAuthFail = await page.evaluate(() => {
    return Boolean(document.querySelector("#login-email"));
  });

  if (isAuthFail) {
    await page.screenshot({ path: "dist/auth-error.png" });
    await browser.close();
    throw new Error("Academy scrape: AUTH ERROR");
  } else {
    const scrapeResult = await page.evaluate(() => {
      return {
        isCheckAvailable: Boolean(document.querySelector(".up-info--check .button--green")),
      };
    });

    if (scrapeResult.isCheckAvailable) {
      await page.click(".up-info--check .button--green");
      await page.waitForNavigation();
      const orderedLink = page.url();
      await browser.close();
      return orderedLink;
    }

    await browser.close();
    return `Order failed, try manually: ${course.link}`;
  }
}
