import puppeteer from "puppeteer";
import * as config from "./config";
import { HOSTNAME } from "const";
import { isCurrentUserRoot } from "utils/isCurrentUserRoot";
import { IScrapeResult } from "types";

async function scrapeCourse(link: string): Promise<IScrapeResult> {
  console.info("LAUNCHING PUPETEER");
  const browser = await puppeteer.launch({
    headless: true,
    args: isCurrentUserRoot() ? ["--no-sandbox"] : undefined
  });
  console.info("LAUNCHED PUPETEER");
  const page = await browser.newPage();

  await page.goto(link);
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
      const amountElement = document.querySelector(".up-info__columns p");

      return {
        isCheckAvailable: Boolean(document.querySelector(".up-info--check .button--green")),
        amountOfProjects: Number(amountElement.textContent.split("").filter(Number).join("")),
      };
    });

    if (scrapeResult.isCheckAvailable) {
      await browser.close();
      return scrapeResult;
    }
    await browser.close();
    return scrapeResult;
  }
}

export async function scrapeProjectInfo(): Promise<string> {
  let result = "Scrape result \n";

  for (let i = 0; i < config.scrapeConfig.length; i++) {
    const course = config.scrapeConfig[i];
    const courseInfo = await scrapeCourse(course.link);
    result += `\n ${course.name}`;
    const { amountOfProjects } = courseInfo;

    result += amountOfProjects > 0
      ? `\nAmount of available projects - ${amountOfProjects}`
      : "\n No projects";

    if (courseInfo.isCheckAvailable) {
      result += `
      Link
      ${course.link}

      Order
      ${HOSTNAME}/academy/order/${course.name}

      Guides
      ${course.guides}`;

      result = `!!! ${result}`;
    }
  }

  return result;
}
