import { Page } from "puppeteer";
import { findElementOnPage } from "./findElementOnPage";
import { auth } from "./auth";
import * as config from "../config";

async function checkForProjects(page: Page) {
  return await findElementOnPage(config.PROJECTS_PRESENTED_SELECTOR, page);
}

export async function processCourse(page: Page) {
  console.info("PROCESSING COURSE");
  const isAuthRequired = await findElementOnPage(config.EMAIL_INPUT_SELECTOR, page);

  if (isAuthRequired) {
    await auth(page);
    return checkForProjects(page);
  } else {
    return checkForProjects(page);
  }
}
