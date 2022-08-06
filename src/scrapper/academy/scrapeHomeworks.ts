import { homeworkConfig } from "./config";
import { createPuppeteerInstance } from "scrapper/createPuppeteerInstance";
import { IScrapeResult } from "types";

async function scrapeCourse(link: string): Promise<IScrapeResult> {
  const browser = await createPuppeteerInstance();
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
      const amountElement = document.querySelectorAll(".card__item--new");

      return {
        isCheckAvailable: Boolean(amountElement),
        amountOfProjects: amountElement && amountElement.length,
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

export async function scrapeHomeworks(): Promise<string> {
  let result = "Scrape result \n";

  for (let i = 0; i < homeworkConfig.length; i++) {
    const course = homeworkConfig[i];
    const courseInfo = await scrapeCourse(course.link);
    result += `\n ${course.name}`;
    const { amountOfProjects } = courseInfo;

    result += amountOfProjects > 0
      ? `\nAmount of available homeworks - ${amountOfProjects}`
      : "\n No homeworks";

    if (courseInfo.isCheckAvailable) {
      result += `
      Link
      ${course.link}
      `;

      result = `••• ${result}`;
    }
  }

  console.log("RETURNING RESULT");
  return result;
}
