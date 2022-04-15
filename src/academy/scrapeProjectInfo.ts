import puppeteer from "puppeteer";
import * as config from "./config";
import { IScrapeResult } from "types";

function isCurrentUserRoot() {
  return process.getuid() == 0; // UID 0 is always root
}

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
  await page.type("#login-email", "kletskovhtmlacademy@gmail.com");
  await page.type("#login-password", "8463fb7");
  await page.click("input.button");
  await page.waitForNavigation();

  const isAuthFail = await page.evaluate(() => {
    return Boolean(document.querySelector("#login-email"));
  });

  if (isAuthFail) {
    await page.screenshot({ path: "dist/auth-error.png" });
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
  let result = "";

  for (let i = 0; i < config.scrapeConfig.length; i++) {
    const course = config.scrapeConfig[i];
    const courseInfo = await scrapeCourse(course.link);
    result += `${course.name}`;
    const { amountOfProjects } = courseInfo;

    if (amountOfProjects > 0) {
      result += `\nAmount of available projects - ${amountOfProjects}`;
    } else {
      result += "\n No projects";
    }

    if (courseInfo.isCheckAvailable) {
      result += `
      Link
      ${course.link}

      Guides
      ${course.guides}`;
    }
  }

  return result;
}
