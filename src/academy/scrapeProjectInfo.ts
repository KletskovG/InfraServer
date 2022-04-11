import puppeteer from "puppeteer";

// import { processCourse } from "./lib/processCourse";
// import {auth} from "./lib/auth";
// import {getEnvVariable} from "utils/getEnvVariable";
import * as config from "./config";

function isCurrentUserRoot() {
  return process.getuid() == 0; // UID 0 is always root
}

export async function scrapeProjectInfo(): Promise<string> {
  let result = "";
  console.info("LAUNCHING PUPETEER");
  const browser = await puppeteer.launch({
    headless: true,
    args: isCurrentUserRoot() ? ["--no-sandbox"] : undefined
  });
  const page = await browser.newPage();
  // const email = await getEnvVariable("ACADEMY_EMAIL");
  // const pwd = await getEnvVariable("ACADEMY_PWD");
  
  
  console.info("LAUNCHED PUPETEER");

  const courses = Object.keys(config.scrapeConfig);


  const courseName = courses[0];
  const courseLink = config.scrapeConfig[courses[0]];
  await page.goto(courseLink);
  await page.waitForTimeout(5000);

  console.log("CHECK FOR AUTH");  
  // const isAuthRequired = await page.evaluate(() => {
  //   return Boolean(document.querySelector("#login-email"));
  // });

  // if (isAuthRequired) {
    
  // }

  await page.screenshot({path: "auth-start.png"});
  await page.type("#login-email", process.env.ACADEMY_EMAIL);
  await page.type("#login-password", process.env.PWD);
  await page.screenshot({path: "before-click.png"});
  await page.click("input.button");
  await page.waitForNavigation();
  await page.waitForTimeout(5000);

  await page.screenshot({path: "auth-end.png"});
      
  const isAuthFail = await page.evaluate(() => {
    return Boolean(document.querySelector("#login-email"));
  });
      
  if (isAuthFail) {
    throw new Error("Academy scrape: AUTH ERROR");
  } else {
    const isProjectsPresented = await page.evaluate(() => {
      return Boolean(document.querySelector(".up-info--check .button--green"));
    });

    if (isProjectsPresented) {
      result += `\n\n ${courseName} \n ${courseLink}`;
    }
  }
  await browser.close();

  return result;
}