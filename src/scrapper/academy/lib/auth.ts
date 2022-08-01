import { Page } from "puppeteer";
import {getEnvVariable} from "utils/getEnvVariable";
import { findElementOnPage } from "./findElementOnPage";
import * as config from "../config";

export async function auth(page: Page) {
  console.info("AUTH PROCESS");
  await page.type(config.EMAIL_INPUT_SELECTOR, getEnvVariable("ACADEMY_EMAIL"));
  await page.type(config.PWD_INPUT_SELECTOR, getEnvVariable("ACADEMY_PWD"));
  await page.click(config.SUBMIT_BUTTON_SELECTOR);
  await page.waitForTimeout(config.PAGE_TIMEOUT);

  console.info("CHECK FOR RESULT");
  const isStillOnAuthPage = await findElementOnPage(config.EMAIL_INPUT_SELECTOR, page);

  if (isStillOnAuthPage) {
    console.info("AUTH ERROR");
    throw new Error("Academy scrape: AUTH ERROR");
  } 
  console.info("AUTH SUCCESS");
  return true;
}