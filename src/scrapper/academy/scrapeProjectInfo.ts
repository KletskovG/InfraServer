import puppeteer from "puppeteer";
import { ESelector, scrapeConfig } from "./config";
import { HOSTNAME } from "const";
import { isCurrentUserRoot } from "utils/isCurrentUserRoot";
import { IScrapeResult } from "types";

async function scrapeCourse(link: string, collectHomeworks = false): Promise<IScrapeResult> {
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
        homeworks: collectHomeworks && Boolean(document.querySelector(ESelector.HOMEWORK)),
      };
    });

    if (scrapeResult.isCheckAvailable || scrapeResult.homeworks) {
      await browser.close();
      return scrapeResult;
    }
    await browser.close();
    return scrapeResult;
  }
}

export async function scrapeProjectInfo(collectHomework = false): Promise<string> {
  let result = "Scrape result \n";

  for (let i = 0; i < scrapeConfig.length; i++) {
    const course = scrapeConfig[i];
    const courseInfo = await scrapeCourse(course.link, collectHomework);
    result += `\n ${course.name}`;
    const { amountOfProjects, homeworks } = courseInfo;

    result += amountOfProjects > 0
      ? `\nAmount of available projects - ${amountOfProjects}`
      : "\n No projects";

    result += `Homeworks: ${homeworks ? "available" : "not available"}`;

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

    if (courseInfo.homeworks) {
      result = `••• ${result}`;
    }
  }

  return result;
}
