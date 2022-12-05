import { academyScrapeConfig } from "types";
import { HOSTNAME } from "const";
import { IScrapeResult } from "types";
import { createPuppeteerInstance } from "scrapper/createPuppeteerInstance";
import { getEnvVariable } from "utils/getEnvVariable";

const ACADEMY_EMAIL = getEnvVariable("ACADEMY_EMAIL");
const ACADEMY_PWD = getEnvVariable("ACADEMY_PWD");

async function scrapeCourse(link: string): Promise<IScrapeResult> {
  const browser = await createPuppeteerInstance();
  const page = await browser.newPage();

  await page.goto(link);
  await page.waitForTimeout(5000);
  console.log("CHECK FOR AUTH");
  await page.type("#login-email", ACADEMY_EMAIL);
  await page.type("#login-password", ACADEMY_PWD);
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
      const isActiveProtect = document.querySelector(".badge--yellow");
      let protectText = "";
      if (Boolean(isActiveProtect)) {
        const protectActiveElement = document.querySelector(".up-protect .project__status");

        if (protectActiveElement) {
          protectText = protectActiveElement.textContent;
        }
      }


      return {
        isCheckAvailable: Boolean(document.querySelector(".up-info--check .button--green")),
        protectActiveText: protectText,
        amountOfProjects: Number(amountElement.textContent.split("").filter(Number).join("")),
      };
    });

    await browser.close();
    return scrapeResult;
  }
}

export async function scrapeProjectInfo(): Promise<string | null> {
  let result = "Scrape result \n";

  if (!academyScrapeConfig.some(course => course.protectActive)) {
    return null;
  }

  for (let i = 0; i < academyScrapeConfig.length; i++) {
    if (!academyScrapeConfig[i].protectActive) {
      console.log(academyScrapeConfig[i].name);
      break;
    }

    const course = academyScrapeConfig[i];
    const courseInfo = await scrapeCourse(course.additional.projects);
    result += `\n ${course.name}`;
    const { amountOfProjects } = courseInfo;

    result += amountOfProjects > 0
      ? `\nAmount of available projects - ${amountOfProjects}`
      : "\n No projects";

    if (courseInfo.isCheckAvailable) {
      const orderLink = course.additional.order || `${HOSTNAME}/academy/order/${course.name}`;

      result += `
      Link
      ${course.link}

      Order
      ${orderLink}

      Guides
      ${course.additional.guides || "In progress"}`;

      result = `!!! ${result}`;
    } else if (courseInfo.protectActiveText.length) {
      result = `??? ${result} ${courseInfo.protectActiveText}`;
    }
  }

  return result;
}
